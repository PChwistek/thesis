class credit_controller: public controller {

  private:
    transax_controller the_transax_controller;
    sub_controller the_sub_controller;

  public:
    credit_controller(name self, transax_controller a_transax_controller, sub_controller a_sub_controller): 
      controller(self),
      the_transax_controller(a_transax_controller),
      the_sub_controller(a_sub_controller) {}

    void credit_multiple(std::vector<uint64_t> user_keys, asset to_credit) {
      credit_table credits(get_self(), get_self().value);
      for(uint64_t key: user_keys) {
        auto credit_itr = credits.find(key);
        if(credit_itr != credits.end()) {
            credits.modify(credit_itr, get_self(), [&]( auto& row ){ 
              row.total = row.total + to_credit;
            });
        } else {
          credits.emplace(get_self(), [&]( auto& row ){
            row.key = key;
            row.total = to_credit;
          });
        }
      }
    }

    void charge_credit(name user, asset to_debit) {
      require_auth( get_self() );
      credit_table credits(get_self(), get_self().value);
      auto itr = credits.find(user.value);
      eosio_assert(itr != credits.end(), "does not have credit");
      credit credit_balance = *itr;
      eosio_assert(to_debit.symbol == credit_balance.total.symbol, "not the same symbol");
      eosio_assert(to_debit.amount <= credit_balance.total.amount, "overdrawing");
      credits.modify(itr, get_self(),[&]( auto& row ){
        row.total = row.total - to_debit;
      });
    }

    void withdraw_credit(name user, asset to_debit) {
      require_auth( user );
      credit_table credits(get_self(), get_self().value);
      auto itr = credits.find(user.value);
      eosio_assert(itr != credits.end(), "does not have credit");

      auto credit_balance = *itr;
      eosio_assert(itr != credits.end(), "credit balance does not exist");
      eosio_assert(to_debit.symbol == credit_balance.total.symbol, "not the same symbol");
      eosio_assert(to_debit.amount <= credit_balance.total.amount, "overdrawing");
      the_transax_controller.send_funds_from_contract(user, to_debit);
      credits.modify(itr, get_self(), [&]( auto& row ){
        row.total = row.total - to_debit;
      });
    }

    void deposit_credit(name user, asset to_credit) {
      credit_table credits(get_self(), get_self().value);
      auto credit_itr = credits.find(user.value);
      if(credit_itr != credits.end()) {
          credits.modify(credit_itr, get_self(), [&]( auto& row ){ 
            row.total = row.total + to_credit;
          });
      } else {
        credits.emplace(get_self(), [&]( auto& row ){
          row.key = user.value;
          row.total = to_credit;
        });
      }
    }

    credit get_credit(uint64_t user_key) {
      credit_table credits(get_self(), get_self().value);
      auto itr = credits.find(user_key);
      eosio_assert(itr != credits.end(), "does not have credit");
      return *itr;
    }

    void erasecred(){
      credit_table credit(get_self(), get_self().value);
      for(auto itr = credit.begin(); itr != credit.end();) {
        itr = credit.erase(itr);
      }
    }
};