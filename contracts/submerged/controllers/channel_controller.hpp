class channel_controller: public controller {

  public:
    channel_controller(name self): controller (self) {}

    void open_channel(name owner, asset minimum_price) {
      require_auth( owner );
      channels_table channels(get_self(), get_self().value);
      auto iterator = channels.find(owner.value);
      if( iterator == channels.end() ) {
        channels.emplace(owner, [&]( auto& row ) {
          row.key = owner;
          row.sub_status = "pending";
          row.minimum_price = minimum_price;
        });
      } else {
        print("Channel already exists.");
        channels.modify(iterator, get_self(), [&]( auto& row ) {
          row.key = owner;
          row.sub_status = "pending";
          row.minimum_price = minimum_price;
        });
      }
    }
};