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
          row.mtotal_proj = 0;
          row.mproj_fulfilled = 0;
          row.minimum_price = minimum_price;
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
      channels_table channels(get_self(), get_self().value);
      auto channelItr = channels.find(creator.value);
      auto theChannel = *channelItr;
      the_transax_controller.send_total_channel(creator, theChannel.total_raised);
      channels.modify(channelItr, get_self(),[&](auto& row) {
        row.payment_complete = true; 
      });
    }

    void erase_channel(name creator) {
      require_auth( creator );
      channels_table channels(get_self(), get_self().value);
      auto itr = channels.find(creator.value);
      channels.erase(itr);
    }
};