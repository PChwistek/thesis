class sub_controller : public controller {
  private:
    transax_controller the_transax_controller;

  public:
    sub_controller(name self, transax_controller a_transax_controller): 
      controller(self), 
      the_transax_controller(a_transax_controller) {}

    void handle_subscription() {
      auto transfer_data = unpack_action_data<st_transfer>();
      name from = transfer_data.from;
      name to = name(transfer_data.memo);
      asset quantity = transfer_data.quantity;
      
      if( get_self() != from) {
        channels_table channels(get_self(), get_self().value);
        auto channelItr = channels.find(to.value);
        eosio_assert(channelItr != channels.end(), "store does not exist" );
        auto theChannel = channels.get(to.value);
        eosio_assert(quantity.amount >= theChannel.minimum_price.amount, "insufficient funds");
        eosio_assert(quantity.symbol.code() == theChannel.minimum_price.symbol.code(), "incorrect symbol");

        channel_subs_table subs(get_self(), to.value);
        auto subsItr = subs.find( from.value );
        if( subsItr == subs.end() ) {
          subs.emplace(get_self(), [&]( auto& row){
            row.key = from;
            row.conditional = true;
            row.quantity_subscribed = quantity;
          });
          channels.modify(channelItr, get_self(), [&](auto& row) {
            row.num_subs = row.num_subs + 1;
          });

        } else {
          print("============ Subscription Already EXISTS ===============");
          auto theSub = *subsItr;
          eosio_assert(block_timestamp(current_time()) < theSub.valid_until, "Subscription is still valid");
          subs.modify(subsItr, get_self(), [&](auto& row) {
            // row valid until 
            row.quantity_subscribed = quantity;
            row.conditional = true;
          });
        }
      } else if(get_self() == from) {
        name content_creator = transfer_data.to;
        print("============ Crediting Subscribers ===============");
      }
    }

    void unsubscribe(name creator, name subscriber) {

    }
  
    void erase_sub(name creator, name subscriber) {
      print("============ Removing ===============");
      channel_subs_table subs(get_self(), creator.value);
      auto subsItr = subs.find(subscriber.value);
      eosio_assert(subsItr != subs.end(), "Record does not exist");
      subs.modify(subsItr, get_self(), [&](auto& row) {
        row.transfered = true;
      });
      
      channels_table channels(get_self(), get_self().value);
      auto channelItr = channels.find(creator.value);
      channels.modify(channelItr, get_self(), [&](auto& row) {
        row.num_subs = row.num_subs - 1;
      });
      subs.erase(subsItr);
    }



};