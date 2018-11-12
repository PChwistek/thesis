#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/transaction.hpp>
#include <eosiolib/name.hpp>

using namespace eosio;

CONTRACT submanager : public eosio::contract {

  public:
    using contract::contract;
    submanager(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}

    ACTION subscribe() {
      auto transfer_data = eosio::unpack_action_data<st_transfer>();
      name from = transfer_data.from;
      name to = name(transfer_data.memo);
      asset quantity = transfer_data.quantity;
      
      if( _self != from) {
        stores_table stores(_self, _self.value);
        auto storeIterator = stores.find(to.value);
        eosio_assert(storeIterator != stores.end(), "store does not exist" );
        auto theStore = stores.get(to.value);
        eosio_assert(quantity.amount >= theStore.minimum_price.amount, "insufficient funds");
        eosio_assert(quantity.symbol.code() == theStore.minimum_price.symbol.code(), "incorrect symbol");

        subs_table subs(_self, to.value);
        auto iterator = subs.find( from.value );
        if( iterator == subs.end() ) {
          subs.emplace(_self, [&]( auto& row){
            row.key = from;
            row.quantity_subscribed = quantity;
          });
        } else {
          print("============ Subscription Already EXISTS ===============");
          // build out reduce/increase/cancel subcription
        }
      }  else if( _self == from) {
        name content_creator = transfer_data.to;
        print("============ Removing ===============");
        subs_table subs(_self, content_creator.value);
        auto iterator = subs.find(to.value);
        eosio_assert(iterator != subs.end(), "Record does not exist");
        subs.erase(iterator);
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

    ACTION rollfunds(name content_creator, name subber) {
      require_auth( _self );
      subs_table subs(_self, content_creator.value);
      auto theSub = subs.get(subber.value);
      asset quantity = theSub.quantity_subscribed;
      send_money(content_creator, quantity, subber.to_string());
    }

    /* FOR DEBUGGING PURPOSES */
    ACTION erasesub(name content_creator, name subber) {
      print("============ Removing ===============");
      subs_table subs(_self, content_creator.value);
      auto iterator = subs.find(subber.value);
      eosio_assert(iterator != subs.end(), "Record does not exist");
      subs.erase(iterator);
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

    void send_money(name to, asset quantity, std::string msg) {
      action(
        permission_level{ _self, "active"_n },
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(get_self(), to, quantity, msg)
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
    } else if(code==receiver && action==name("rollfunds").value) {
      execute_action(name(receiver), name(code), &submanager::rollfunds );
    } else if (code==receiver && action==name("erasesub").value){
      execute_action(name(receiver), name(code), &submanager::erasesub );
    }
  }
};