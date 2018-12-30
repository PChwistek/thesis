#include <algorithm>
#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/action.hpp>
#include <eosiolib/name.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;
using std::string;

#include "submerged.hpp"

ACTION submerged::version() {
  print("Version 0.2");
}

ACTION submerged::transfer() {
  auto transfer_data = eosio::unpack_action_data<st_transfer>();
  name from = transfer_data.from;
  name to = name(transfer_data.memo);
  asset quantity = transfer_data.quantity;
  
  if( _self != from) {
    channels_table channels(_self, _self.value);
    auto channelItr = channels.find(to.value);
    eosio_assert(channelItr != channels.end(), "store does not exist" );
    auto theChannel = channels.get(to.value);
    eosio_assert(quantity.amount >= theChannel.minimum_price.amount, "insufficient funds");
    eosio_assert(quantity.symbol.code() == theChannel.minimum_price.symbol.code(), "incorrect symbol");

    subs_table subs(_self, to.value);
    auto iterator = subs.find( from.value );
    if( iterator == subs.end() ) {
      subs.emplace(_self, [&]( auto& row){
        row.key = from;
        row.conditional = true;
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

ACTION submerged::open(name owner, asset minimum_price) {
  require_auth( owner );
  channels_table channels(_self, _self.value);
  auto iterator = channels.find(owner.value);
  if( iterator == channels.end() ) {
    channels.emplace(owner, [&]( auto& row ) {
      row.key = owner;
      row.sub_status = "pending";
      row.minimum_price = minimum_price;
    });
  } else {
    print("Channel already exists.");
    channels.modify(iterator, get_self(), [&]( auto& row ) {
      row.key = owner;
      row.sub_status = "pending";
      row.minimum_price = minimum_price;
    });
  }
}

ACTION submerged::rollfunds(name content_creator, name subber) {
  require_auth( _self );
  subs_table subs(_self, content_creator.value);
  auto theSub = subs.get(subber.value);
  asset quantity = theSub.quantity_subscribed;
  send_money(content_creator, quantity, subber.to_string());
}

ACTION submerged::setproject(name creator, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month) {
  require_auth(creator);
  
  channels_table channels(_self, _self.value);
  auto channelItr = channels.find(creator.value);
  eosio_assert(channelItr != channels.end(), "channel does not exist"); // make sure channel exists 

  uint32_t currentTime = current_time();
  uint32_t deadline = current_time() + secondsToDeadline;
  uint32_t delay =  deadline - currentTime;
  
  projects_table projects(_self, creator.value);
  uint64_t projectKey = projects.available_primary_key();
  
  eosio::transaction t{};
  t.actions.emplace_back(
      permission_level(_self, "active"_n),
      _self,
      "fail"_n,
      std::make_tuple(creator, projectKey));
  t.delay_sec = delay;
  t.send(creator.value + projectKey, _self);

  print("Scheduled with a delay of ", delay); 
  
  projects.emplace(_self, [&]( auto& row ) {
    row.key = projectKey;
    row.isActive = true;
    row.fulfilled = false;
    row.status = "in progress";
    row.name = projectName;
    row.contentType = contentType;
    row.timeDue = block_timestamp(deadline);
    row.month = month;
  });
}

ACTION submerged::fulfill(name creator, uint64_t projectKey) {
  require_auth(creator);
  print("========= FULFILL =========");
  projects_table projects(_self, creator.value);
  auto projectItr = projects.find(projectKey);
  auto theProject = *projectItr;
  eosio_assert(theProject.isActive == true, "project is not active");

  // verify content 

  cancel_deferred(creator.value + projectKey); // cancel fail time deferred action
  projects.modify(projectItr, get_self(), [&](auto& row) {
    row.status = "payment pending";
    row.fulfilled = true;
    row.timeFulfilled = block_timestamp(current_time());
  });

  campaigns_table votes(_self, creator.value);
  uint64_t campaignKey = votes.available_primary_key();
  votes.emplace(_self, [&]( auto& row ) {
    row.key = campaignKey;
    row.projectKey = projectKey;
    row.votingActive = true;
    row.voteType = "satisfaction";
  });

  eosio::transaction t{};
  t.actions.emplace_back(
      permission_level(_self, "active"_n),
      _self,
      "closevoting"_n,
      std::make_tuple(creator, projectKey, campaignKey));
  t.delay_sec = 300;
  t.send(creator.value + projectKey + campaignKey, _self);

}

ACTION submerged::fail(name creator, uint64_t projectKey) {
  projects_table projects(_self, creator.value);
  auto theProject = projects.get(projectKey);
  
  eosio_assert(theProject.isActive == true, "project is not active");
  eosio_assert(theProject.fulfilled == false, "project has already been fulfilled");

  auto projectItr = projects.find(projectKey);
  projects.modify(projectItr, get_self(), [&](auto& row) {
    row.status = "failed to fulfill on time";
    row.isActive = false;
    row.fulfilled = false;
  });
}

ACTION submerged::vote(name voter, name creator, uint64_t projectKey, uint64_t campaignKey, bool satisfied) {

  subs_table subs(_self, creator.value);
  auto subsItr = subs.find(voter.value);
  eosio_assert(subsItr != subs.end(), "not a subscriber");

  campaigns_table votes(_self, creator.value);
  auto voteItr = votes.find(campaignKey);
  eosio_assert(voteItr != votes.end(), "voting campaign doesn't exist");

  auto campaign = *voteItr;
  eosio_assert(campaign.votingActive == true, "voting campaign not active");

  auto voters = campaign.voters;

  auto foundVoter = std::find(voters.begin(), voters.end(), voter.value);
  if (foundVoter == voters.end()) { // not found
    if(satisfied) {
      votes.modify(voteItr, get_self(), [&]( auto& row ) {
        row.voters.push_back(voter.value);
        row.agree = row.agree + 1;
      });
    } else {
      votes.modify(voteItr, get_self(), [&]( auto& row ) {
        row.voters.push_back(voter.value);
        row.disagree = row.disagree + 1;
      });
    }
  } else {
    print("===== ALREADY VOTED ====");
  }
}

ACTION submerged::applyforext(name creator, uint64_t projectKey, uint32_t secondsToNewDeadline) {
  require_auth(creator);
  channels_table channels(_self, _self.value);
  auto channelItr = channels.find(creator.value);
  eosio_assert(channelItr != channels.end(), "channel does not exist"); // make sure channel exists 

  projects_table projects(_self, creator.value);
  auto theProject = projects.get(projectKey);
  eosio_assert(theProject.isActive == true, "project is not active");
  eosio_assert(theProject.fulfilled == false, "project has already been fulfilled"); //make sure project is active

  campaigns_table votes(_self, creator.value);
  uint64_t campaignKey = votes.available_primary_key();
  votes.emplace(_self, [&]( auto& row ) {
    row.key = campaignKey;
    row.projectKey = projectKey;
    row.votingActive = true;
    row.voteType = "extension: "[secondsToNewDeadline];
  });

  eosio::transaction t{};
  t.actions.emplace_back(
      permission_level(_self, "active"_n),
      _self,
      "closevoting"_n,
      std::make_tuple(creator, projectKey, campaignKey));
  t.delay_sec = 100;
  t.send(creator.value + projectKey + campaignKey, _self);
}

ACTION submerged::closevoting(name creator, uint64_t projectKey, uint64_t campaignKey) {
  require_auth(_self);

  print("============ Voting is now closed! ===============");
  campaigns_table votes(_self, creator.value);
  auto voteItr = votes.find(campaignKey);
  eosio_assert(voteItr != votes.end(), "voting campaign doesn't exist!");
  
  votes.modify(voteItr, get_self(), [&]( auto& row ) {
    row.key = campaignKey;
    row.projectKey = projectKey;
    row.votingActive = false;
  }); 

  // modify project accordingly/send off funds  
}


/* FOR DEBUGGING PURPOSES */
ACTION submerged::erasesub(name content_creator, name subber) {
  print("============ Removing ===============");
  subs_table subs(_self, content_creator.value);
  auto iterator = subs.find(subber.value);
  eosio_assert(iterator != subs.end(), "Record does not exist");
  subs.erase(iterator);
}

ACTION submerged::eraseprojs(name creator) {
  projects_table projects(_self, creator.value);
    for(auto itr = projects.begin(); itr != projects.end();) {
      itr = projects.erase(itr);
    }
}

// ===================== ABI STUFF =========================

#define EOSIO_DISPATCH_CUSTOM( TYPE, MEMBERS ) \
extern "C" { \
   void apply( uint64_t receiver, uint64_t code, uint64_t action ) { \
      if( code == receiver ) { \
         switch( action ) { \
            EOSIO_DISPATCH_HELPER( TYPE, MEMBERS ) \
         } \
         /* does not allow destructor of thiscontract to run: eosio_exit(0); */ \
      } else if (code==name("eosio.token").value && action==name("transfer").value) { \
        execute_action(name(receiver), name(code), &submerged::transfer ); \
      } \
   } \
} \

EOSIO_DISPATCH_CUSTOM( submerged, 
  (version)
  (open)
  (transfer)
  (setproject)
  (fulfill)
  (fail)
  (rollfunds)
  (closevoting)
  (applyforext)
  (vote)
  (erasesub)
)