class channel_controller: public controller {

  private:
    transax_controller the_transax_controller;
    channels_table channels;

  public:
    channel_controller(name self, transax_controller a_transax_controller): 
      controller (self),
      the_transax_controller(a_transax_controller),
      channels(get_self(), get_self().value) {}

    void open_channel(name creator, asset minimum_price) {
      require_auth( creator );
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
        channels.modify(iterator, get_self(), [&]( auto& row ) {
          row.key = creator;
          row.sub_status = "pending";
          row.minimum_price = minimum_price;
        });
      }
    }

    void pay_channel(name creator) {
      require_auth( get_self() );
      auto channel_itr = channels.find(creator.value);
      auto the_channel = *channel_itr;
      eosio_assert(!the_channel.payment_complete, "payment already happened!");
      the_transax_controller.send_funds_from_contract(creator, the_channel.total_raised);
      channels.modify(channel_itr, get_self(),[&](auto& row) {
        row.payment_complete = true; 
      });
    }

    void erase_channel(name creator) {
      require_auth( creator );
      auto itr = channels.find(creator.value);
      channels.erase(itr);
    }
};