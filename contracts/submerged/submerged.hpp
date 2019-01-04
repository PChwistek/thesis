#pragma once

CONTRACT submerged : public eosio::contract {

  private:
    //some composition
    transax_controller the_transax_controller;
    sub_controller the_sub_controller;
    channel_controller the_channel_controller;
    project_controller the_project_controller;
    vote_controller the_vote_controller;
    //instance variable
    uint8_t current_month; // 0 to 11 

  public:
    using contract::contract;
    submerged(name receiver, name code, datastream<const char*> ds): 
      contract(receiver, code, ds), 
      the_transax_controller(_self),
      the_channel_controller(_self, the_transax_controller),
      the_sub_controller(_self, the_transax_controller),
      the_project_controller(_self, the_transax_controller),
      the_vote_controller(_self, the_transax_controller) {}  // member initialization list

    ACTION version();

    //channels
    ACTION open(name creator, asset minimum_price);
    ACTION paychannel(name creator);
    ACTION erasechan(name creator);

    //subscriptions
    ACTION transfer();
    ACTION creditsubs(name creator); 
    ACTION rollfunds(name creator, name subber);
    ACTION erasesub(name creator, name subber);

    //projects
    ACTION initproject(name creator, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month);
    ACTION fulfill(name creator, uint64_t projectKey);
    ACTION fail(name creator, uint64_t projectKey);
    ACTION vote(name creator, name voter, uint64_t projectKey, uint64_t campaignKey, bool satisfied);
    ACTION closevoting(name creator, uint64_t projectKey, uint64_t campaignKey);
    ACTION erasevote(name creator);
    ACTION applyforext(name creator, uint64_t projectKey, uint32_t secondsToNewDeadline);
    ACTION eraseprojs(name creator);

};