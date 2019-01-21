class payment_controller : public controller {
  private:
    transax_controller the_transax_controller;
    credit_controller the_credit_controller;
    channel_controller the_channel_controller;
    user_controller the_user_controller;
    sub_controller the_sub_controller;

  public:
    payment_controller(name self, transax_controller a_transax_controller, credit_controller a_credit_controller, channel_controller a_channel_controller, user_controller a_user_controller, sub_controller a_sub_controller): 
      controller(self), 
      the_transax_controller(a_transax_controller),
      the_channel_controller(a_channel_controller),
      the_credit_controller(a_credit_controller),
      the_user_controller(a_user_controller),
      the_sub_controller(a_sub_controller) {}

    void handle_payment() {
      auto transfer_data = unpack_action_data<st_transfer>();
      name from = transfer_data.from;
      name to = name(transfer_data.memo);
      asset quantity = transfer_data.quantity;
      
      if( get_self() != from) {
        bool is_credit = to == name("credit");
        bool is_recur = to == name("recur");
        if(is_credit) {
          the_credit_controller.deposit_credit(from, quantity);
          print("Credited to account");
          return;
        } 
        
        if(is_recur) {
          print("Recurring subscription.... ");
          return;
        }

        channel the_channel = the_channel_controller.get_channel(to.value);
        eosio_assert(quantity.amount >= the_channel.price.amount, "insufficient funds");
        eosio_assert(quantity.symbol.code() == the_channel.price.symbol.code(), "incorrect symbol");
        the_sub_controller.set_sub(the_channel, from, quantity);

      } else if(get_self() == from) {
        name content_creator = transfer_data.to;
        print("============ MONEY LEAVING ===============");
      }
    }

    void recur(name subscriber, bool use_credit) {

      /* deduct credit, update timestamp */
      user the_user = the_user_controller.get_user(subscriber.value);
      eosio_assert(the_user.valid_until < block_timestamp(time_point_sec(now())), "subs still active");
      asset credit_balance = asset(0, symbol("SYS", 4));
      asset credit_to_charge = credit_balance;
      if(use_credit) {
        credit_balance += the_credit_controller.get_credit(subscriber.value).total;
      }

      asset total = asset(0, symbol("SYS", 4));
      for(sub temp_sub: the_user.channels_subbed) {
        total += temp_sub.quantity; 
      }
      if(credit_balance >= total) {
        credit_to_charge = credit_balance - total;
      } else {
        total = total - credit_balance;
        credit_to_charge = credit_balance;
        the_transax_controller.send_funds_from_user(subscriber, total, "recur");
      }
      

      if(credit_balance.amount > 0) {
        the_credit_controller.charge_credit(subscriber, credit_to_charge);
      }
      
      the_sub_controller.renew_subscription(subscriber);
    }

    void credit_subs(name creator) {
      require_auth( get_self() );
      channel the_channel = the_channel_controller.get_channel(creator.value);
      eosio_assert(!the_channel.payment_complete, "already completed");

      channel_subs_table subs(get_self(), creator.value);
      std::vector<uint64_t> subs_to_credit;
      
      int count = 0;
      while(count < 5) {
        for(auto& item : subs) {
          if (item.conditional && !item.transfered) {
            subs_to_credit.push_back(item.key.value);
            count++;
          }
        }
      }

      the_credit_controller.credit_multiple(subs_to_credit, the_channel.price);

      for(uint64_t key: subs_to_credit) {
        auto sub_itr = subs.find(key);
        subs.modify(sub_itr, get_self(), [&](auto& row) {
          row.transfered = true;
        }); 
      }

      if(count == 0) {
        the_channel.payment_complete = true;
        the_channel_controller.set_channel(creator.value, the_channel);
      } else {
        the_transax_controller.send_self_deferred_action(
          get_self(),
          name("creditsubs"),
          1,
          std::make_tuple(creator),
          1
        );
      }
    }
};