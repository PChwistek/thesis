class transax_controller: public controller {
  public: 
    transax_controller(name self): controller(self) {}

    void send_funds_from_contract(name creator, name subber) {
      require_auth( get_self() );
      subs_table subs(get_self(), creator.value);
      auto theSub = subs.get(subber.value);
      asset quantity = theSub.quantity_subscribed;
      send_money(creator, quantity, subber.to_string());
    }

    template <class... tuple_values> // allows us to pass any set of values in the tuple
    void send_self_deferred_action(name sender, name action, uint32_t delay, std::tuple<tuple_values...> args, std::string special) {
      eosio::transaction t{};
      t.actions.emplace_back(
          permission_level(get_self(), name("active")),
          get_self(),
          action,
          args);
      t.delay_sec = delay;
      t.send(generate_transax_id(sender, action, special), get_self());
      print("Set action with id of ", generate_transax_id(sender, action, special));
    }

    void cancel_deferred_transax(name action, name sender, string special) {
      cancel_deferred(generate_transax_id(sender, action, special));
    }

  private: 
    // helpers 
    void send_money(name to, asset quantity, string msg) {
      action(
        permission_level{ get_self(), name("active") },
        name("eosio.token"),
        name("transfer"),
        std::make_tuple(get_self(), to, quantity, msg)
      ).send();
    }

    uint64_t generate_transax_id(name sender, name action, string special) {
      std::string transactionName = action.to_string() + sender.to_string() + special;
      return name(transactionName).value;
    }
};