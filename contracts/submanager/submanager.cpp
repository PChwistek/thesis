#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;

class submanager : public contract {

  public:
    using contract::contract;
    submanager(name self): contract(self) {}

    [[eosio::action]]
    void subscribe(name from, name to, std::string memo) {
      require_auth( from );
      
      sub_index subs(_self, _self);
      auto iterator = subs.find( from );
      if(iterator == subs.end() ){
        subs.emplace(from, [&](auto& row){
          row.key = from;
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