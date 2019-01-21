#pragma once

CONTRACT submerged : public eosio::contract {

  private:
    //some composition
    transax_controller the_transax_controller;
    user_controller the_user_controller;
    channel_controller the_channel_controller;
    sub_controller the_sub_controller;
    credit_controller the_credit_controller;
    payment_controller the_payment_controller;
    project_controller the_project_controller;
    vote_controller the_vote_controller;
    //instance variable
    uint8_t current_month; // 0 to 11 

  public:
    using contract::contract;
    submerged(name receiver, name code, datastream<const char*> ds): 
      contract(receiver, code, ds), 
      the_transax_controller(_self),
      the_user_controller(_self),
      the_channel_controller(_self, the_transax_controller),
      the_sub_controller(_self, the_channel_controller, the_user_controller),
      the_credit_controller(_self, the_transax_controller, the_sub_controller),
      the_payment_controller(_self, the_transax_controller, the_credit_controller, the_channel_controller, the_user_controller, the_sub_controller),
      the_project_controller(_self, the_transax_controller, the_channel_controller),
      the_vote_controller(_self, the_transax_controller, the_channel_controller, the_project_controller) {}  // member initialization list

    ACTION version();

    //channels
    ACTION open(name creator, asset price);
    ACTION paychannel(name creator);
    ACTION erasechan(name creator);

    //subscriptions
    ACTION transfer();
    ACTION creditsubs(name creator);
    ACTION unsub(name creator, name subscriber);
    ACTION erasecred();
    ACTION erasesub(name creator, name subber);
    ACTION recur(name user, bool use_credit);

    //credit
    ACTION withdraw(name user, asset total);

    //projects
    ACTION initproject(name creator, string project_name, string content_type, uint32_t seconds_to_deadline, uint64_t month);
    ACTION fulfill(name creator, uint64_t project_key);
    ACTION fail(name creator, uint64_t project_key);
    ACTION vote(name voter, name creator, uint64_t project_key, uint64_t campaign_key, bool satisfied);
    ACTION closevoting(name creator, uint64_t project_key, uint64_t campaign_key);
    ACTION erasevote(name creator);
    ACTION applyforext(name creator, uint64_t project_key, uint32_t seconds_to_new_deadline);
    ACTION eraseprojs(name creator);

    void on_error(const onerror &error) {
        // this function should have a counter to not retry forever, needs protection in other parts as well
        /*
        print("Resending Transaction: ", error.sender_id);
        transaction dtrx = error.unpack_sent_trx();
        dtrx.delay_sec = 3;
        dtrx.send(now(), get_self());
        */
    }

};