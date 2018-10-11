#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>

using namespace eosio;

class submanager : public contract {

  public:
    using contract::contract;
    submanager(account_name self): contract(self) {}

    [[eosio::action]]
    void subscribe(account_name user, asset quantity) {
      require_auth( user );
      sub_index subs(_self, _self);
      auto iterator = subs.find( user );
      if(iterator == subs.end() ){
        subs.emplace(user, [&](auto& row){
          row.key = user;
          row.quantity = quantity;
        });
      } else {
        print( "============= Already exists ============== ");
      }
    }


  private:
    struct [[eosio::table]] sub {
      account_name key;
      asset quantity;
      uint64_t primary_key() const { return key; }
    };
    typedef eosio::multi_index<N(subs), sub> sub_index;

};

EOSIO_ABI( submanager, (subscribe) )