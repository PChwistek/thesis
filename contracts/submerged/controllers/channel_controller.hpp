class channel_controller: public controller {

  private:
    transax_controller the_transax_controller;

  public:
    channel_controller(name self, transax_controller a_transax_controller): 
      controller (self),
      the_transax_controller(a_transax_controller) {}

    void open_channel(name creator, uint8_t num_projects, asset price) {
      require_auth( creator );
      channels_table channels(get_self(), get_self().value);
      auto iterator = channels.find(creator.value);
      if( iterator == channels.end() ) {
        channels.emplace(creator, [&]( auto& row ) {
          row.key = creator;
          row.sub_status = "pending";
          row.month_complete = false;
          row.payment_complete = false;
          row.price = price;
          row.total_raised = asset(0, price.symbol);
          row.num_proj_promised = num_projects;
          row.total_proj_fulfilled = 0;
          row.total_proj = 0;
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
        row.price = new_channel.price;
        row.payment_complete = new_channel.payment_complete;
        row.num_proj_promised =  new_channel.num_proj_promised;
        row.total_proj_fulfilled =  new_channel.num_proj_promised;
        row.total_proj = new_channel.total_proj;
        row.num_subs = new_channel.num_subs;
      });
    }
    
};