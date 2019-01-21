#include <algorithm>
#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/action.hpp>
#include <eosiolib/name.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;
using std::string;

#include "helpers/common_structs.hpp"
#include "tables/tables.hpp"
#include "controllers/controller.hpp"
#include "controllers/transax_controller.hpp"
#include "controllers/channel_controller.hpp"
#include "controllers/user_controller.hpp"
#include "controllers/sub_controller.hpp"
#include "controllers/credit_controller.hpp"
#include "controllers/payment_controller.hpp"
#include "controllers/project_controller.hpp"
#include "controllers/vote_controller.hpp"
#include "submerged.hpp"

ACTION submerged::version() {
  print("Version 0.3");
}

ACTION submerged::transfer() {
  the_payment_controller.handle_payment();
}

ACTION submerged::unsub(name creator, name subscriber) {
  the_sub_controller.unsubscribe(creator, subscriber);
}

ACTION submerged::recur(name user, bool use_credit) {
  print("Yo, in recur");
  the_payment_controller.recur(user, use_credit);
}

ACTION submerged::open(name owner, asset price) {
  the_channel_controller.open_channel(owner, price);
}

ACTION submerged::initproject(name creator, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month) {
  the_project_controller.create_project(creator, projectName, contentType, secondsToDeadline, month);
}

ACTION submerged::fulfill(name creator, uint64_t projectKey) {
  the_project_controller.fulfill_project(creator, projectKey);
}

ACTION submerged::fail(name creator, uint64_t projectKey) {
  the_project_controller.fail_project(creator, projectKey);
}

ACTION submerged::vote(name voter, name creator, uint64_t projectKey, uint64_t campaignKey, bool satisfied) {
  the_vote_controller.vote(voter, creator, projectKey, campaignKey, satisfied);
}

ACTION submerged::applyforext(name creator, uint64_t projectKey, uint32_t secondsToNewDeadline) {
  the_vote_controller.apply_for_extension(creator, secondsToNewDeadline, projectKey);
}

ACTION submerged::closevoting(name creator, uint64_t projectKey, uint64_t campaignKey) {
  the_vote_controller.close_voting(creator, projectKey, campaignKey);
  // modify project accordingly/send off funds  
}

ACTION submerged::paychannel(name creator) {
  the_channel_controller.pay_channel(creator);
}

ACTION submerged::creditsubs(name creator) {
  the_payment_controller.credit_subs(creator);
}

ACTION submerged::withdraw(name user, asset total) {
  the_credit_controller.withdraw_credit(user, total);
}


/* FOR DEBUGGING PURPOSES */
ACTION submerged::erasesub(name creator, name subber) {
  the_sub_controller.erase_sub(creator, subber);
}

ACTION submerged::erasevote(name creator) {
  the_vote_controller.erase_all_polls(creator);
}

ACTION submerged::erasechan(name creator) {
  the_channel_controller.erase_channel(creator);
}

ACTION submerged::eraseprojs(name creator) {
  the_project_controller.erase_all_projects(creator);
}

ACTION submerged::erasecred() {
  the_credit_controller.erasecred();
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
      } else if (code == name("eosio").value && action==name("onerror").value) { \
        eosio::execute_action(eosio::name(receiver), eosio::name(code), &submerged::on_error); \
      } \
   } \
} \

EOSIO_DISPATCH_CUSTOM( submerged, 
  (version)
  (open)
  (transfer)
  (recur)
  (initproject)
  (fulfill)
  (fail)
  (closevoting)
  (applyforext)
  (vote)
  (erasesub)
  (eraseprojs)
  (erasechan)
  (erasevote)
  (erasecred)
  (paychannel)
  (creditsubs)
  (unsub)
  (withdraw)
)