#pragma once
#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/name.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;
using std::string;

CONTRACT submanager : public eosio::contract {

  public:
    using contract:: contract;
    submanager(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}

    ACTION version();
    ACTION subscribe();
    ACTION openchannel(name owner, asset minimum_price);
    ACTION rollfunds(name content_creator, name subber);
    ACTION erasesub(name content_creator, name subber);

  private: 
     struct st_transfer {
      name from;
      name to;
      asset quantity;
      string memo;
    };

    TABLE subscriber {
      name key;
      asset quantity_subscribed;
      bool conditional;
      uint64_t primary_key() const { return key.value; }    
    };

    TABLE channel {
      name key;
      string sub_status;
      asset minimum_price;
      uint64_t primary_key() const { return key.value; }
    };

    void send_money(name to, asset quantity, string msg) {
      action(
        permission_level{ _self, "active"_n },
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(get_self(), to, quantity, msg)
      ).send();
    }

    typedef eosio::multi_index<"subs"_n, subscriber> channelsubs_table;
    typedef eosio::multi_index<"channels"_n, channel> channels_table;

};