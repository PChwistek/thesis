#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;

CONTRACT submanager : public eosio::contract {

  public:
    using contract::contract;
    submanager(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}

    ACTION subscribe() {
      auto transfer_data = eosio::unpack_action_data<st_transfer>();
      name from = transfer_data.from;
      name to = transfer_data.to;
      asset quantity = transfer_data.quantity;
      
      if( _self == from){
        return;
      }

      stores_table stores(_self, _self.value);
      auto storeIterator = stores.find(to.value);
      if( storeIterator != stores.end() ){
        auto theStore = stores.get(to.value);
        // eventually should be built out with assertions.... 
        if(quantity.amount < theStore.minimum_price.amount 
          || quantity.symbol != theStore.minimum_price.symbol) {
          send_money_back(from, quantity, "insufficient amount or wrong token type");
          return;
        }
      } else {
        send_money_back(from, quantity, "store does not exist");
        return;
      }

      subs_table subs(_self, to.value);
      auto iterator = subs.find( from.value );
      if( iterator == subs.end() ) {
        subs.emplace(_self, [&]( auto& row){
          row.key = from;
          row.quantity_subscribed = quantity;
        });
      } else {
        print("============ Subscription Already EXISTS ===============");
        // needs to be a bit more built out
      }
    }

    ACTION openstore(name owner, asset minimum_price) {
      require_auth( owner );
      stores_table stores(_self, _self.value);
      auto iterator = stores.find(owner.value);
      if( iterator == stores.end() ) {
        stores.emplace(owner, [&]( auto& row ) {
          row.key = owner;
          row.minimum_price = minimum_price;
        });
      } else {
        print("Store already exists.");
        stores.modify(iterator, owner, [&]( auto& row ) {
          row.key = owner;
          row.minimum_price = minimum_price;
        });
      }
    }

  private:
    struct st_transfer {
      name from;
      name to;
      asset quantity;
      std::string memo;
    };

    TABLE subscriber {
      name key;
      asset quantity_subscribed;
      uint64_t primary_key() const { return key.value; }    
    };

    TABLE store {
      name key;
      asset minimum_price;
      uint64_t primary_key() const { return key.value; }
    };

    void send_money_back(name sender, asset quantity, std::string error) {
      action(
        permission_level{ _self, "active"_n },
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(_self, sender, quantity, error)
      ).send();
    }

    typedef eosio::multi_index<"subs"_n, subscriber> subs_table;
    typedef eosio::multi_index<"stores"_n, store> stores_table;
};

extern "C" {
  void apply(uint64_t receiver, uint64_t code, uint64_t action) {
    submanager _submanager(name(receiver));
    if(code==name("eosio.token").value && action==name("transfer").value) {
      execute_action(name(receiver), name(code), &submanager::subscribe );
    } else if(code==receiver && action==name("openstore").value) {
      execute_action(name(receiver), name(code), &submanager::openstore );
    } else if(code==receiver && action==name("subscribe").value) {
      execute_action(name(receiver), name(code), &submanager::subscribe );
    }
  }
};