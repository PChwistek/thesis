class vote_controller: public controller {
  private:
    transax_controller the_transax_controller;
    channel_controller the_channel_controller;
    project_controller the_project_controller;

  public:
    vote_controller(name self, transax_controller a_transax_controller, channel_controller a_channel_controller, project_controller a_project_controller): 
      controller(self), 
      the_transax_controller(a_transax_controller),
      the_channel_controller(a_channel_controller),
      the_project_controller(a_project_controller) {}

    void vote(name voter, name creator, uint64_t project_key, uint64_t poll_key, bool satisfied) {
      channel_subs_table subs(get_self(), creator.value);
      auto subs_itr = subs.find(voter.value);
      eosio_assert(subs_itr != subs.end(), "not a subscriber");

      polls_table polls(get_self(), creator.value);
      auto poll_itr = polls.find(poll_key);
      eosio_assert(poll_itr != polls.end(), "voting campaign doesn't exist");

      auto campaign = *poll_itr;
      eosio_assert(campaign.voting_active == true, "voting campaign not active");

      auto voters = campaign.voters;

      auto found_voter = std::find(voters.begin(), voters.end(), voter.value);
      eosio_assert(found_voter == voters.end(), "already voted!");
      if (found_voter == voters.end()) { // not found
        if(satisfied) {
          polls.modify(poll_itr, get_self(), [&]( auto& row ) {
            row.voters.push_back(voter.value);
            row.agree = row.agree + 1;
          });
        } else {
          polls.modify(poll_itr, get_self(), [&]( auto& row ) {
            row.voters.push_back(voter.value);
            row.disagree = row.disagree + 1;
          });
        }
      }
    }

    void apply_for_extension(name creator, uint64_t project_key, uint32_t secs_to_deadline) {
      require_auth(creator);
      channel the_channel = the_channel_controller.get_channel(creator.value);
      
      auto the_project = the_project_controller.get_project(creator.value, project_key);
      eosio_assert(the_project.is_active == true, "project is not active");
      eosio_assert(the_project.fulfilled == false, "project has already been fulfilled"); //make sure project is active

      polls_table polls(get_self(), creator.value);
      uint64_t poll_key = polls.available_primary_key();
      polls.emplace(get_self(), [&]( auto& row ) {
        row.key = poll_key;
        row.project_key = project_key;
        row.voting_active = true;
        row.vote_type = "extension: " + std::to_string(secs_to_deadline);
        row.time_closes = block_timestamp(time_point_sec(now() + 30));
      });

      uint32_t delay = 30;

      the_transax_controller.send_self_deferred_action(
        creator, 
        name("closevoting"), 
        delay, 
        std::make_tuple(creator, project_key, poll_key), 
        poll_key
      );
    }

    void close_voting(name creator, uint64_t project_key, uint64_t poll_key) {
        require_auth(get_self());
        print("============ Voting is now closed! ===============");
        polls_table polls(get_self(), creator.value);        
        auto poll_itr = polls.find(poll_key);
        eosio_assert(poll_itr != polls.end(), "voting campaign doesn't exist!");

        // based on NPS (net promotor score) disastisfied, satisfied, passive (non-active subscribers)

        channel the_channel = the_channel_controller.get_channel(creator.value);

        auto the_vote = *poll_itr;
        uint32_t subscribers = the_channel.num_subs;
        print("Num subs", the_channel.num_subs);
        int happy = (int)the_vote.agree - (int)the_vote.disagree;
        double nps = happy / (double)subscribers;
        print("================== NPS ======================", nps);
        //check vote type 
        bool passed = false;
        if(nps > -0.250) {
          passed = true;
        }

        polls.modify(poll_itr, get_self(), [&]( auto& row ) {
          row.key = poll_key;
          row.project_key = project_key;
          row.passed = passed;
          row.voting_active = false;
        }); 
        
        project the_project = the_project_controller.get_project(creator.value, project_key);

        if(the_vote.vote_type == "nps") {
          if(passed) {
            // if month complete
            print("================== PASSED ======================");
            the_transax_controller.send_funds_from_contract(creator, the_channel.total_raised);
            the_channel.mproj_fulfilled = (the_channel.mproj_fulfilled + 1) & 0xFF;
            the_channel_controller.set_channel(creator.value, the_channel);
            the_project.status = "cmplt - pass";
          } else {
            // credit subscribers
            the_project.status = "cmplt - fail";
            the_transax_controller.send_self_deferred_action(
              creator, 
              name("creditsubs"), 
              1, 
              std::make_tuple(creator), 
              project_key
            );
          }
        }
        the_project_controller.set_project(creator.value, project_key, the_project);
    }

    void erase_all_polls(name creator) {
      polls_table polls(get_self(), creator.value);
      for(auto itr = polls.begin(); itr != polls.end();) {
        itr = polls.erase(itr);
      }
    }
};