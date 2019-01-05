class transax_controller: public controller {
  public: 
    transax_controller(name self): controller(self) {}
    /*
    void send_funds_from_contract(name creator, name subber) {
      require_auth( get_self() );
      channel_subs_table subs(get_self(), creator.value);
      auto the_sub = subs.get(subber.value);
      asset quantity = the_sub.quantity_subscribed;
      send_money(get_self(), creator, quantity, subber.to_string());
    } */

    void send_funds_from_contract(name receiver, asset total) {
      send_money(get_self(), receiver, total, "submerged");
    }

    void withdraw(name user) {
      require_auth( user );
    }

    template <class... tuple_values> // allows us to pass any set of values in the tuple
    void send_self_deferred_action(name sender, name action, uint32_t delay, std::tuple<tuple_values...> args, uint64_t special_key) {
      eosio::transaction t{};
      t.actions.emplace_back(
          permission_level(get_self(), name("active")),
          get_self(),
          action,
          args);
      t.delay_sec = delay;
      t.send(generate_transax_id(sender, action, special_key), get_self());
      print("Set action with id of ", generate_transax_id(sender, action, special_key));
    }

    void cancel_deferred_transax(name action, name sender, uint64_t special_key) {
      cancel_deferred(generate_transax_id(sender, action, special_key));
    }

  private: 
    // helpers 
    void send_money(name from, name to, asset quantity, string msg) {
      action(
        permission_level{ from, name("active") },
        name("eosio.token"),
        name("transfer"),
        std::make_tuple(from, to, quantity, msg)
      ).send();
    }

    uint64_t generate_transax_id(name sender, name action, uint64_t special_key) {
      return sender.value + action.value + special_key;
    }
};