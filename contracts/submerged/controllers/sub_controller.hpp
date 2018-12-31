class sub_controller : public controller {
  public:
    sub_controller(name self): controller(self) {}

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
        auto iterator = subs.find( from.value );
        if( iterator == subs.end() ) {
          subs.emplace(get_self(), [&]( auto& row){
            row.key = from;
            row.conditional = true;
            row.quantity_subscribed = quantity;
          });
        } else {
          print("============ Subscription Already EXISTS ===============");
          // build out reduce/increase/cancel subcription
        }
      }  else if(get_self() == from) {
        name content_creator = transfer_data.to;
        print("============ Removing ===============");
        channel_subs_table subs(get_self(), content_creator.value);
        auto iterator = subs.find(to.value);
        eosio_assert(iterator != subs.end(), "Record does not exist");
        subs.erase(iterator);
      }
    }
  
    void erase_sub(name creator, name subber) {
      print("============ Removing ===============");
      channel_subs_table subs(get_self(), creator.value);
      auto iterator = subs.find(subber.value);
      eosio_assert(iterator != subs.end(), "Record does not exist");
      subs.erase(iterator);
    }

    private: 
};