class user_controller: public controller {
  
  public:

  user_controller(name self): controller(self) {}

  user get_user(uint64_t user_key) {
    users_table users(get_self(), get_self().value);
    auto user_itr = users.find(user_key);
    eosio_assert(user_itr != users.end(), "user does not exist");
    auto the_user = *user_itr;
    return the_user;
  }

  void add_user_sub(name creator, name subscriber, asset quantity) {
    users_table users(get_self(), get_self().value);
    auto user_itr = users.find(subscriber.value);
    sub new_sub = { creator.value, quantity };
    
    if(user_itr == users.end()) {
      users.emplace(get_self(), [&](auto& row) {
        row.key = subscriber;
        row.auto_recur = true;
        row.valid_until = block_timestamp(time_point_sec(now()));
        row.channels_subbed.push_back(new_sub);
      });
    } else {
      users.modify(user_itr, get_self(), [&](auto& row) {
        row.channels_subbed.push_back(new_sub);
      });
    }
  }

  void renew_sub_validity(name subscriber, block_timestamp new_time) {
    users_table users(get_self(), get_self().value);
    auto user_itr = users.find(subscriber.value);
    eosio_assert(user_itr != users.end(), "user does not exist");
    users.modify(user_itr, get_self(), [&](auto& row) {
      row.valid_until = new_time;
    });
  }

};