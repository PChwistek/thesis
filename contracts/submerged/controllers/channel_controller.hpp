class channel_controller: public controller {

  private:
    transax_controller the_transax_controller;

  public:
    channel_controller(name self, transax_controller a_transax_controller): 
      controller (self),
      the_transax_controller(a_transax_controller) {}

    void open_channel(name creator, asset minimum_price) {
      require_auth( creator );
      channels_table channels(get_self(), get_self().value);
      auto iterator = channels.find(creator.value);
      if( iterator == channels.end() ) {
        channels.emplace(creator, [&]( auto& row ) {
          row.key = creator;
          row.sub_status = "pending";
          row.month_complete = false;
          row.payment_complete = false;
          row.minimum_price = minimum_price;
          row.total_raised = asset(0, minimum_price.symbol);
          row.mtotal_proj = 0;
          row.mproj_fulfilled = 0;
          row.num_subs = 0;
        });
      } else {
        print("Channel already exists.");
      }
    }

    void pay_channel(name creator) {
      require_auth( get_self() );
      channels_table channels(get_self(), get_self().value);
      channel the_channel = get_channel(creator.value);
      eosio_assert(!the_channel.payment_complete, "payment already happened!");
      the_transax_controller.send_funds_from_contract(creator, the_channel.total_raised);
      the_channel.payment_complete = true;
      set_channel(creator.value, the_channel);
    }

    void erase_channel(name creator) {
      require_auth( creator );
      channels_table channels(get_self(), get_self().value);
      auto itr = channels.find(creator.value);
      channels.erase(itr);
    }

    channel get_channel(uint64_t creator_key) {
      channels_table channels(get_self(), get_self().value);
      auto channel_itr = channels.find(creator_key);
      eosio_assert(channel_itr != channels.end(), "channel does not exist");
      auto the_channel = *channel_itr; 
      return the_channel;
    }

    void set_channel(uint64_t creator_key, channel new_channel) {
      channels_table channels(get_self(), get_self().value);
      auto channel_itr = channels.find(creator_key);
      eosio_assert(channel_itr != channels.end(), "channel does not exist");
      channels.modify(channel_itr, get_self(), [&]( auto& row ) {
        row.sub_status = new_channel.sub_status;
        row.minimum_price = new_channel.minimum_price;
        row.payment_complete = new_channel.payment_complete;
        row.mtotal_proj = new_channel.mtotal_proj;
        row.mproj_fulfilled = new_channel.mproj_fulfilled;
        row.num_subs = new_channel.num_subs;
      });
    }
    
};