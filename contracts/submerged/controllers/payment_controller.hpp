class payment_controller : public controller {
  private:
    transax_controller the_transax_controller;
    credit_controller the_credit_controller;
    channel_controller the_channel_controller;

  public:
    payment_controller(name self, transax_controller a_transax_controller, credit_controller a_credit_controller, channel_controller a_channel_controller): 
      controller(self), 
      the_transax_controller(a_transax_controller),
      the_channel_controller(a_channel_controller),
      the_credit_controller(a_credit_controller) {}

    void handle_subscription() {
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
        eosio_assert(quantity.amount >= the_channel.minimum_price.amount, "insufficient funds");
        eosio_assert(quantity.symbol.code() == the_channel.minimum_price.symbol.code(), "incorrect symbol");

        channel_subs_table subs(get_self(), to.value);
        auto subs_itr = subs.find( from.value );
        if( subs_itr == subs.end() ) {
          subs.emplace(get_self(), [&]( auto& row){
            row.key = from;
            row.conditional = true;
            row.quantity_subscribed = quantity;
          });
          the_channel.num_subs = the_channel.num_subs + 1;
          the_channel_controller.set_channel(to.value, the_channel);
      
          users_table usubs(get_self(), get_self().value);
          auto usubs_itr = usubs.find(from.value);

          sub new_sub = { to.value, quantity };
          
          if(usubs_itr == usubs.end()) {
            usubs.emplace(get_self(), [&](auto& row) {
              row.key = from; 
              row.channels_subbed.push_back(new_sub);
            });
          } else {
            usubs.modify(usubs_itr, get_self(), [&](auto& row) {
              row.channels_subbed.push_back(new_sub);
            });
          }

        } else {
          print("============ Subscription Already EXISTS ===============");
          /*
          auto the_sub = *subs_itr;
          eosio_assert(block_timestamp(current_time()) < the_sub.valid_until, "Subscription is still valid");
          subs.modify(subs_itr, get_self(), [&](auto& row) {
            // row valid until 
            row.quantity_subscribed = quantity;
            row.conditional = true;
          });
          */
        }
      } else if(get_self() == from) {
        name content_creator = transfer_data.to;
        print("============ MONEY LEAVING ===============");
      }
    }

    void unsubscribe(name creator, name subscriber) {
      /* remove from usubs, don't recur */ 
    }

    void pay_with_credit(name subscriber, asset total) {
      /* deduct credit, renew subscription */
    }

    void recur(name subscriber, asset total) {
      /* deduct credit, update timestamp */

      the_transax_controller.send_funds_from_user(subscriber, total, "recur");
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

      the_credit_controller.credit_multiple(subs_to_credit, the_channel.minimum_price);

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
  
    void erase_sub(name creator, name subscriber) {
      print("============ Removing ===============");

      /*
      auto subs_itr = subs.find(subscriber.value);
      eosio_assert(subs_itr != subs.end(), "Record does not exist");
      subs.modify(subs_itr, get_self(), [&](auto& row) {
        row.transfered = true;
      });
      
      channels_table channels(get_self(), get_self().value);
      auto channel_itr = channels.find(creator.value);
      channels.modify(channel_itr, get_self(), [&](auto& row) {
        row.num_subs = row.num_subs - 1;
      });
      */
      channel_subs_table subs(get_self(), creator.value);
      users_table usubs(get_self(), get_self().value);
      auto usubs_itr = usubs.find(subscriber.value);
      auto subs_itr = subs.find(subscriber.value);
      subs.erase(subs_itr);
      usubs.erase(usubs_itr);

    }



};