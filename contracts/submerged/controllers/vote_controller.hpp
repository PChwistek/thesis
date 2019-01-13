class vote_controller: public controller {
  private:
    transax_controller the_transax_controller;

  public:
    vote_controller(name self, transax_controller a_transax_controller): 
      controller(self), 
      the_transax_controller(a_transax_controller) {}

    void vote(name voter, name creator, uint64_t project_key, uint64_t campaign_key, bool satisfied) {
      channel_subs_table subs(get_self(), creator.value);
      auto subs_itr = subs.find(voter.value);
      eosio_assert(subs_itr != subs.end(), "not a subscriber");

      campaigns_table votes(get_self(), creator.value);
      auto vote_itr = votes.find(campaign_key);
      eosio_assert(vote_itr != votes.end(), "voting campaign doesn't exist");

      auto campaign = *vote_itr;
      eosio_assert(campaign.voting_active == true, "voting campaign not active");

      auto voters = campaign.voters;

      auto found_voter = std::find(voters.begin(), voters.end(), voter.value);
      eosio_assert(found_voter == voters.end(), "already voted!");
      if (found_voter == voters.end()) { // not found
        if(satisfied) {
          votes.modify(vote_itr, get_self(), [&]( auto& row ) {
            row.voters.push_back(voter.value);
            row.agree = row.agree + 1;
          });
        } else {
          votes.modify(vote_itr, get_self(), [&]( auto& row ) {
            row.voters.push_back(voter.value);
            row.disagree = row.disagree + 1;
          });
        }
      }
    }

    void apply_for_extension(name creator, uint64_t project_key, uint32_t secondsToNewDeadline) {
      require_auth(creator);
      channels_table channels(get_self(), get_self().value);
      auto channelItr = channels.find(creator.value);
      eosio_assert(channelItr != channels.end(), "channel does not exist"); // make sure channel exists 

      projects_table projects(get_self(), creator.value);
      auto the_project_itr = projects.find(project_key);
      auto the_project = *the_project_itr;
      eosio_assert(the_project.is_active == true, "project is not active");
      eosio_assert(the_project.fulfilled == false, "project has already been fulfilled"); //make sure project is active

      campaigns_table votes(get_self(), creator.value);
      uint64_t campaign_key = votes.available_primary_key();
      votes.emplace(get_self(), [&]( auto& row ) {
        row.key = campaign_key;
        row.project_key = project_key;
        row.voting_active = true;
        row.vote_type = "ext" + std::to_string(secondsToNewDeadline);
      });

      uint32_t delay = 30;

      the_transax_controller.send_self_deferred_action(
        creator, 
        name("closevoting"), 
        delay, 
        std::make_tuple(creator, project_key, campaign_key), 
        campaign_key
      );
    }

    void close_voting(name creator, uint64_t project_key, uint64_t campaign_key) {
        require_auth(get_self());
        print("============ Voting is now closed! ===============");
        campaigns_table votes(get_self(), creator.value);        
        auto vote_itr = votes.find(campaign_key);
        eosio_assert(vote_itr != votes.end(), "voting campaign doesn't exist!");

        // based on NPS (net promotor score) disastisfied, satisfied, passive (non-active subscribers)

        channels_table channels(get_self(), get_self().value);
        auto channelItr = channels.find(creator.value);
        auto theChannel = *channelItr; 

        auto the_vote = *vote_itr;
        uint32_t subscribers = theChannel.num_subs;
        print("Num subs", theChannel.num_subs);
        int happy = (int)the_vote.agree - (int)the_vote.disagree;
        double nps = happy / (double)subscribers;
        print("================== NPS ======================", nps);
        //check vote type 
        bool passed = false;
        if(nps > -0.250) {
          passed = true;
        }

        votes.modify(vote_itr, get_self(), [&]( auto& row ) {
          row.key = campaign_key;
          row.project_key = project_key;
          row.passed = passed;
          row.voting_active = false;
        }); 

        if(the_vote.vote_type == "nps") {
          if(passed) {
            // if month complete
            print("================== PASSED ======================");
            the_transax_controller.send_funds_from_contract(creator, theChannel.total_raised);
            channels.modify(channelItr, get_self(), [&]( auto& row ) {
              row.mproj_fulfilled = (row.mproj_fulfilled + 1) & 0xFF;
            });
          } else {
            // credit subscribers
            the_transax_controller.send_self_deferred_action(
              creator, 
              name("creditsubs"), 
              1, 
              std::make_tuple(creator), 
              project_key
            );
          }
        } else if (the_vote.vote_type.find("ext") != std::string::npos) {
          if(passed) {
            uint32_t seconds = std::stoi(the_vote.vote_type.substr(3));
            projects_table projects(get_self(), creator.value);
            auto project_itr = projects.find(project_key);
            auto the_project = *project_itr;
            
            time_point_sec new_deadline_seconds = time_point_sec(time_point_sec(the_project.time_due.to_time_point()).utc_seconds + seconds);
            uint32_t delay = new_deadline_seconds.utc_seconds - now();

            print("THE EXTENSION PLZ ", delay);
            
            projects.modify(project_itr, get_self(), [&]( auto& row ) {
              row.time_due = block_timestamp(new_deadline_seconds);
            });
            
            the_transax_controller.cancel_deferred_transax(creator, name("fail"), project_key);
            the_transax_controller.send_self_deferred_action(
              creator,
              name("fail"),
              delay,
              std::make_tuple(creator, project_key), 
              project_key
            );
          }
        }
    }

    void erase_all_votes(name creator) {
      campaigns_table votes(get_self(), creator.value);
      for(auto itr = votes.begin(); itr != votes.end();) {
        itr = votes.erase(itr);
      }
    }
};