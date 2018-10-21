#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;

CONTRACT submanager : public eosio::contract {

  public:
    using contract::contract;
    ACTION subscribe(name from, name to, asset quantity, std::string memo) {
      require_auth( from );
      eosio::transaction txn{};
      txn.actions.emplace_back(
        eosio::permission_level(from, "active"_n),
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(from, to, quantity, memo)).send();

      subs_table subs(_self, to.value);
      auto iterator = subs.find( from.value );
      if( iterator == subs.end() ) {
        subs.emplace(_self, [&]( auto& row){
          row.key = from.value;
          row.quantity_subscribed = quantity;
        });
      } else {
        print("========== ALREADY EXISTS =============");
      }

    }

  private:
    TABLE subscriber {
      uint64_t key;
      asset quantity_subscribed;
      uint64_t primary_key() const { return key; }    
    };

    typedef eosio::multi_index<"subs"_n, subscriber> subs_table;
};

EOSIO_DISPATCH( submanager, (subscribe) )