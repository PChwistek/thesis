class credit_controller: public controller {

  private:
    transax_controller the_transax_controller;

  public:
    credit_controller(name self, transax_controller a_transax_controller): 
      controller(self),
      the_transax_controller(a_transax_controller) {}

    void credit_multiple(std::vector<uint64_t> userKeys, asset to_credit) {
      credit_table credit(get_self(), get_self().value);
      for(uint64_t key: userKeys) {
        auto creditItr = credit.find(key);
        if(creditItr != credit.end()) {
            credit.modify(creditItr, get_self(), [&]( auto& row ){ 
              row.total = row.total + to_credit;
            });
        } else {
          credit.emplace(get_self(), [&]( auto& row ){
            row.key = key;
            row.total = to_credit;
          });
        }
      }
    }

    void charge_credit(name user, asset to_debit) {

    }

    void withdraw_credit(name user, asset to_debit) {
      require_auth( user );
      credit_table credit(get_self(), get_self().value);
      auto credit_itr = credit.find(user.value);
      auto credit_balance = *credit_itr;
      eosio_assert(credit_itr != credit.end(), "credit balance does not exist");
      eosio_assert(to_debit <= credit_balance.total, "overdrawing");
      the_transax_controller.send_funds_from_contract(user, to_debit);
      credit.modify(credit_itr, get_self(),[&]( auto& row ){
        row.total = row.total - to_debit;
      });
    }

    void deposit_credit(name user, asset to_credit) {
      credit_table credit(get_self(), get_self().value);
      auto creditItr = credit.find(user.value);
      if(creditItr != credit.end()) {
          credit.modify(creditItr, get_self(), [&]( auto& row ){ 
            row.total = row.total + to_credit;
          });
      } else {
        credit.emplace(get_self(), [&]( auto& row ){
          row.key = user.value;
          row.total = to_credit;
        });
      }
    }

    void erasecred(){
      credit_table credit(get_self(), get_self().value);
      for(auto itr = credit.begin(); itr != credit.end();) {
        itr = credit.erase(itr);
      }
    }
};