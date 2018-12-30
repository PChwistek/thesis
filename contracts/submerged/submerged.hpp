#pragma once

CONTRACT submerged : public eosio::contract {

  private:
    //some composition
    sub_controller the_sub_controller;
    transax_controller the_transax_controller;
    channel_controller the_channel_controller;
    project_controller the_project_controller;
    vote_controller the_vote_controller;

  public:
    using contract::contract;
    submerged(name receiver, name code, datastream<const char*> ds): 
      contract(receiver, code, ds), 
      the_transax_controller(_self),
      the_sub_controller(_self),
      the_channel_controller(_self),
      the_project_controller(_self, the_transax_controller),
      the_vote_controller(_self, the_transax_controller) {}  // member initialization list

    ACTION version();

    //subscriptions
    ACTION transfer();
    ACTION open(name owner, asset minimum_price);
    ACTION rollfunds(name content_creator, name subber);
    ACTION erasesub(name content_creator, name subber);

    //projects
    ACTION setproject(name creator, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month);
    ACTION fulfill(name creator, uint64_t projectKey);
    ACTION fail(name creator, uint64_t projectKey);
    ACTION vote(name voter, name creator, uint64_t projectKey, uint64_t campaignKey, bool satisfied);
    ACTION closevoting(name creator, uint64_t projectKey, uint64_t campaignKey);
    ACTION applyforext(name creator, uint64_t projectKey, uint32_t secondsToNewDeadline);
    ACTION eraseprojs(name creator);

};