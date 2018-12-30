#pragma once
#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/action.hpp>
#include <eosiolib/name.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;
using std::string;

CONTRACT submerged : public eosio::contract {
  public:
    using contract::contract;
    submerged(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}

    struct st_transfer {
      name from;
      name to;
      asset quantity;
      string memo;
    };


    // ======================== ACTIONS ===============================
    ACTION version();

    //subscriptions
    ACTION transfer();
    ACTION open(name owner, asset minimum_price);
    ACTION rollfunds(name content_creator, name subber);
    ACTION erasesub(name content_creator, name subber);

    //projects
    ACTION setproject(name creator, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month);
    ACTION fulfill(name creator, uint64_t key);
    ACTION fail(name creator, uint64_t key);
    ACTION vote(name voter, name creator, uint64_t projectKey, uint64_t campaignKey, bool satisfied);
    ACTION closevoting(name creator, uint64_t projectKey, uint64_t campaignKey);
    ACTION applyforext(name creator, uint64_t projectKey, uint32_t secondsToNewDeadline);
    ACTION eraseprojs(name creator);

  private:
    // ======================== HELPERS ===============================
 
    void send_money(name to, asset quantity, string msg) {
      action(
        permission_level{ _self, "active"_n },
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(get_self(), to, quantity, msg)
      ).send();
    }

    void send_deferred();

    void generate_defer_id();



    // ======================== TABLES ===============================
    TABLE channel {
      name key;
      string sub_status;
      asset minimum_price;
      uint64_t primary_key() const { return key.value; }
    };

    TABLE subscriber {
      name key;
      asset quantity_subscribed;
      bool conditional;
      uint64_t primary_key() const { return key.value; }    
    };

    TABLE project {
      uint64_t          key; 
      bool              isActive;
      bool              fulfilled;
      string            name; // what is visible
      string            contentLink; 
      string            contentType;
      string            status; // in Progress, fulfilled, not fulfilled, payment pending
      uint64_t          month; 
      block_timestamp   timeDue;
      block_timestamp   timeFulfilled;
      uint64_t primary_key() const { return key; }
    };

    TABLE votecampaign {
      uint64_t key;
      uint64_t projectKey; 
      string voteType;
      uint64_t agree;
      uint64_t disagree;
      bool votingActive;
      std::vector<uint64_t> voters;
      uint64_t primary_key() const { return key; }
    };

    typedef eosio::multi_index<"channels"_n, channel> channels_table;
    typedef eosio::multi_index<"subs"_n, subscriber> subs_table;
    typedef eosio::multi_index<"projects"_n, project> projects_table;
    typedef eosio::multi_index<"votes"_n, votecampaign> campaigns_table;

};