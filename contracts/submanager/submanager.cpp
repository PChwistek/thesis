#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;

CONTRACT submanager : public eosio::contract {

  public:
    using contract::contract;
    submanager(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}
    ACTION subscribe(name from, name to, asset quantity, std::string memo) {
      require_auth( from );
      subs_table subs(_self, to.value);
      auto iterator = subs.find( from.value );
      if( iterator == subs.end() ) {
        subs.emplace(_self, [&]( auto& row){
          row.key = from;
          row.quantity_subscribed = quantity;
        });
      } else {
        print("============ ALREADY EXISTS ===============");
      }
    }

    ACTION transfer() {
      print(">>>>>>>>>>>>>>>>>>>> SOMETHING SENT >>>>>>>>>>>>>>>>>>>>");
    }

  private:
    TABLE subscriber {
      name key;
      asset quantity_subscribed;
      uint64_t primary_key() const { return key.value; }    
    };

    typedef eosio::multi_index<"subs"_n, subscriber> subs_table;
};

extern "C" {
  void apply(uint64_t receiver, uint64_t code, uint64_t action) {
    submanager _submanager(name(receiver));
    if(code==receiver && action== name("subscribe").value) {
      execute_action(name(receiver), name(code), &submanager::subscribe );
    }
    else if(code==name("eosio.token").value && action== name("transfer").value) {
      print(" FOUND SOMETHING ");
      execute_action(name(receiver), name(code), &submanager::transfer );
    }
  }
};