class sub_controller: public controller {

  private:
    channel_controller the_channel_controller;
    user_controller the_user_controller;
    block_timestamp billing_day = block_timestamp(time_point_sec(now() + 540)); 

  public:
    sub_controller(name self, channel_controller a_channel_controller, user_controller a_user_controller): 
      controller(self), 
      the_channel_controller(a_channel_controller),
      the_user_controller(a_user_controller) {}

    void set_sub(channel the_channel, name subscriber, asset quantity) {
        channel_subs_table subs(get_self(), the_channel.key.value);
        auto subs_itr = subs.find( subscriber.value );
        if( subs_itr == subs.end() ) {
          subs.emplace(get_self(), [&]( auto& row){
            row.key = subscriber;
            row.conditional = true;
          });
          the_channel.num_subs = the_channel.num_subs + 1;
          the_channel_controller.set_channel(the_channel.key.value, the_channel);
          the_user_controller.add_user_sub(the_channel.key, subscriber, quantity);
          
      } else {
          print("============ Subscription Already EXISTS ===============");
          /*
          auto the_sub = *usubs_itr;
          eosio_assert(block_timestamp(current_time()) < the_sub.valid_until, "Subscription is still valid");
          subs.modify(subs_itr, get_self(), [&](auto& row) {
            // row valid until 
            row.quantity_subscribed = quantity;
            row.conditional = true;
          });
          */
        }
    }

    void renew_subscription(name user) {
      the_user_controller.renew_sub_validity(user, billing_day);
    }

    void unsubscribe(name creator, name subscriber) {
      
    }

    void erase_sub(name creator, name subber) {
  
      channel_subs_table subs(get_self(), creator.value);
      for(auto itr = subs.begin(); itr != subs.end();) {
        itr = subs.erase(itr);
      }

      users_table users(get_self(), get_self().value);
      for(auto itr = users.begin(); itr != users.end();) {
        itr = users.erase(itr);
      }

    }
};