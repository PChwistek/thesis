class channel_controller: public controller {

  public:
    channel_controller(name self): controller (self) {}

    void open_channel(name creator, asset minimum_price) {
      require_auth( creator );
      channels_table channels(get_self(), get_self().value);
      auto iterator = channels.find(creator.value);
      if( iterator == channels.end() ) {
        channels.emplace(creator, [&]( auto& row ) {
          row.key = creator;
          row.sub_status = "pending";
          row.minimum_price = minimum_price;
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
};