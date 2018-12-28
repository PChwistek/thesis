#include "submanager.hpp"
using namespace eosio;
using std::string;

ACTION submanager::version() {
  print("Version 0.2");
}

ACTION submanager::subscribe() {
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

    channelsubs_table subs(_self, to.value);
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
    channelsubs_table subs(_self, content_creator.value);
    auto iterator = subs.find(to.value);
    eosio_assert(iterator != subs.end(), "Record does not exist");
    subs.erase(iterator);
  }
}

ACTION submanager::openchannel(name owner, asset minimum_price) {
  require_auth( owner );
  channels_table channels(_self, _self.value);
  auto iterator = channels.find(owner.value);
  if( iterator == channels.end() ) {
    channels.emplace(owner, [&]( auto& row ) {
      row.key = owner;
      row.minimum_price = minimum_price;
    });
  } else {
    print("Store already exists.");
    channels.modify(iterator, owner, [&]( auto& row ) {
      row.key = owner;
      row.minimum_price = minimum_price;
    });
  }
}

ACTION submanager::rollfunds(name content_creator, name subber) {
  require_auth( _self );
  channelsubs_table subs(_self, content_creator.value);
  auto theSub = subs.get(subber.value);
  asset quantity = theSub.quantity_subscribed;
  send_money(content_creator, quantity, subber.to_string());
}

/* FOR DEBUGGING PURPOSES */
ACTION submanager::erasesub(name content_creator, name subber) {
  print("============ Removing ===============");
  channels_table subs(_self, content_creator.value);
  auto iterator = subs.find(subber.value);
  eosio_assert(iterator != subs.end(), "Record does not exist");
  subs.erase(iterator);
}


extern "C" {
  void apply(uint64_t receiver, uint64_t code, uint64_t action) {
    submanager _submanager(name(receiver));
    if(code==name("eosio.token").value && action==name("transfer").value) {
      execute_action(name(receiver), name(code), &submanager::subscribe );
    } else if(code==receiver && action==name("openchannel").value) {
      execute_action(name(receiver), name(code), &submanager::openchannel );
    } else if(code==receiver && action==name("rollfunds").value) {
      execute_action(name(receiver), name(code), &submanager::rollfunds );
    } else if (code==receiver && action==name("erasesub").value){
      execute_action(name(receiver), name(code), &submanager::erasesub );
    }
  }
};