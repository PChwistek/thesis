class project_controller: public controller {
  private:
    transax_controller the_transax_controller; 

  public: 
    project_controller(name self, transax_controller a_transax_controller): controller(self), the_transax_controller(a_transax_controller) {} 

    void create_project(name creator, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month) {
      require_auth(creator);
      channels_table channels(get_self(), get_self().value);
      auto channelItr = channels.find(creator.value);
      eosio_assert(channelItr != channels.end(), "channel does not exist"); // make sure channel exists 

      uint32_t currentTime = current_time();
      uint32_t deadline = current_time() + secondsToDeadline;
      uint32_t delay =  deadline - currentTime;
      
      projects_table projects(get_self(), creator.value);
      uint64_t projectKey = projects.available_primary_key();

      the_transax_controller.send_self_deferred_action(creator, name("fail"), delay, std::make_tuple(creator, projectKey), std::to_string(projectKey));
      
      projects.emplace(get_self(), [&]( auto& row ) {
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

    void fulfill_project(name creator, uint64_t projectKey) {
      require_auth(creator);
      print("========= FULFILL =========");
      projects_table projects(get_self(), creator.value);
      auto projectItr = projects.find(projectKey);
      auto theProject = *projectItr;
      eosio_assert(theProject.isActive == true, "project is not active");

      // verify content 

      the_transax_controller.cancel_deferred_transax(creator, name("fail"), std::to_string(projectKey)); // cancel fail time action
      projects.modify(projectItr, get_self(), [&](auto& row) {
        row.status = "payment pending";
        row.fulfilled = true;
        row.timeFulfilled = block_timestamp(current_time());
      });

      campaigns_table votes(get_self(), creator.value);
      uint64_t campaignKey = votes.available_primary_key();
      votes.emplace(get_self(), [&]( auto& row ) {
        row.key = campaignKey;
        row.projectKey = projectKey;
        row.votingActive = true;
        row.voteType = "satisfaction";
      });

      uint32_t delay = 300;
      the_transax_controller.send_self_deferred_action(
        creator, 
        name("closevoting"), 
        delay, 
        std::make_tuple(creator, projectKey, campaignKey), 
        std::to_string(campaignKey)
      );
    }

    void fail_project(name creator, uint64_t projectKey) {
      projects_table projects(get_self(), creator.value);
      auto projectItr = projects.find(projectKey);
      eosio_assert(projectItr != projects.end(), "project does not exist");
      auto theProject = *projectItr;
      eosio_assert(theProject.isActive == true, "project is not active");
      eosio_assert(theProject.fulfilled == false, "project has already been fulfilled");

      projects.modify(projectItr, get_self(), [&](auto& row) {
        row.status = "failed to fulfill on time";
        row.isActive = false;
        row.fulfilled = false;
      });
    }

    void erase_all_projects(name creator) {
      projects_table projects(get_self(), creator.value);
      for(auto itr = projects.begin(); itr != projects.end();) {
        itr = projects.erase(itr);
      }
    }
};