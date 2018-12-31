class vote_controller: public controller {
  private:
    transax_controller the_transax_controller;

  public:
    vote_controller(name self, transax_controller a_transax_controller): controller(self), the_transax_controller(a_transax_controller) {}

    void vote(name voter, name creator, uint64_t projectKey, uint64_t campaignKey, bool satisfied) {
      channel_subs_table subs(get_self(), creator.value);
      auto subsItr = subs.find(voter.value);
      eosio_assert(subsItr != subs.end(), "not a subscriber");

      campaigns_table votes(get_self(), creator.value);
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

    void apply_for_extension(name creator, uint64_t projectKey, uint32_t secondsToNewDeadline) {
      require_auth(creator);
      channel_subs_table channels(get_self(), get_self().value);
      auto channelItr = channels.find(creator.value);
      eosio_assert(channelItr != channels.end(), "channel does not exist"); // make sure channel exists 

      projects_table projects(get_self(), creator.value);
      auto theProject = projects.get(projectKey);
      eosio_assert(theProject.isActive == true, "project is not active");
      eosio_assert(theProject.fulfilled == false, "project has already been fulfilled"); //make sure project is active

      campaigns_table votes(get_self(), creator.value);
      uint64_t campaignKey = votes.available_primary_key();
      votes.emplace(get_self(), [&]( auto& row ) {
        row.key = campaignKey;
        row.projectKey = projectKey;
        row.votingActive = true;
        row.voteType = "extension: " + std::to_string(secondsToNewDeadline);
      });

      uint32_t delay = 30;

      the_transax_controller.send_self_deferred_action(
        creator, 
        name("closevoting"), 
        delay, 
        std::make_tuple(creator, projectKey, campaignKey), 
        std::to_string(campaignKey)
      );
    }

    void close_voting(name creator, uint64_t projectKey, uint64_t campaignKey) {
        require_auth(get_self());
        print("============ Voting is now closed! ===============");
        campaigns_table votes(get_self(), creator.value);
        auto voteItr = votes.find(campaignKey);
        eosio_assert(voteItr != votes.end(), "voting campaign doesn't exist!");
        
        votes.modify(voteItr, get_self(), [&]( auto& row ) {
          row.key = campaignKey;
          row.projectKey = projectKey;
          row.votingActive = false;
        }); 
    }
};