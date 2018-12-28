#pragma once
#include <eosiolib/eosio.hpp>
#include <eosiolib/name.hpp>
#include <eosiolib/time.hpp>

using namespace eosio;
using std::string;

CONTRACT projmanager : public eosio::contract {

  public:
    using contract::contract;
    projmanager(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}
    
    ACTION version();
    ACTION setproject(name creator, string projectId, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month);
    ACTION fulfill();
    ACTION vote();
  
  private:
    TABLE project {
      uint64_t          key; 
      bool              isActive;
      string            projectId; // what is unique to the creators table, generated by app
      string            name; // what is visible
      string            contentLink; 
      string            contentType;
      string            status; // in Progress, fulfilled, not fulfilled, payment pending
      uint64_t          month; 
      block_timestamp   due;
      block_timestamp   fulfilled;
      uint64_t primary_key() const { return key; }
    };
    typedef eosio::multi_index<"projects"_n, project> projects_table;
};