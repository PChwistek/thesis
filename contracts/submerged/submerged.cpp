#include "submerged.hpp"
using namespace eosio;
using std::string;

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
    auto storeIterator = channels.find(to.value);
    eosio_assert(storeIterator != channels.end(), "store does not exist" );
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
    print("Store already exists.");
    channels.modify(iterator, owner, [&]( auto& row ) {
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

ACTION submerged::setproject(name creator, string projectId, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month) {
  require_auth(creator);
  uint32_t currentTime = current_time();
  uint32_t deadline = current_time() + secondsToDeadline;
  uint32_t delay =  deadline - currentTime;
  projects_table projects(_self, creator.value);
  uint64_t primaryKey = projects.available_primary_key();
  // check if store exists, add transaction
    eosio::transaction t{};
      // always double check the action name as it will fail silently
      // in the deferred transaction
    t.actions.emplace_back(
        permission_level(_self, "active"_n),
        _self,
        "fail"_n,
        std::make_tuple(creator, primaryKey));

    t.delay_sec = delay;
    t.send(creator.value + primaryKey, _self);

    print("Scheduled with a delay of ", delay);

  projects.emplace(_self, [&]( auto& row ) {
    row.key = primaryKey;
    row.isActive = true;
    row.status = "In Progress";
    row.projectId = projectId;
    row.name = projectName;
    row.contentType = contentType;
    row.due = block_timestamp(deadline);
    row.month = month;
  });
}

ACTION submerged::fulfill(name creator, uint64_t projectKey) {
  print("========= FULFILL =========");
  projects_table projects(_self, creator.value);
  auto projectItr = projects.find(projectKey);

  //check whether really fulfilled and if active
  cancel_deferred(creator.value + projectKey);
  projects.modify(projectItr, get_self(), [&](auto& row) {
    row.status = "payment pending";
    row.isActive = false;
  });

}

ACTION submerged::fail(name creator, uint64_t projectKey) {
  projects_table projects(_self, creator.value);
  print("========= FAILURE!!! =========");
  auto projectItr = projects.find(projectKey);
  projects.modify(projectItr, get_self(), [&](auto& row) {
    row.status = "failed to fulfill";
    row.isActive = false;
  });
}

/* FOR DEBUGGING PURPOSES */
ACTION submerged::erasesub(name content_creator, name subber) {
  print("============ Removing ===============");
  channels_table subs(_self, content_creator.value);
  auto iterator = subs.find(subber.value);
  eosio_assert(iterator != subs.end(), "Record does not exist");
  subs.erase(iterator);
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

EOSIO_DISPATCH_CUSTOM( submerged, (version)(open)(transfer)(fulfill)(fail)(rollfunds)(erasesub)(setproject) )