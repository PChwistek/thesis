class project_controller: public controller {
  private:
    transax_controller the_transax_controller; 

  public: 
    project_controller(name self, transax_controller a_transax_controller): controller(self), the_transax_controller(a_transax_controller) {} 

    void create_project(name creator, string project_name, string content_type, uint32_t seconds_to_deadline, uint64_t month) {
      require_auth(creator);
      
      channels_table channels(get_self(), get_self().value);
      auto channel_itr = channels.find(creator.value);
      eosio_assert(channel_itr != channels.end(), "channel does not exist"); // make sure channel exists 

      uint32_t now = current_time();
      uint32_t deadline = current_time() + seconds_to_deadline;
      uint32_t delay =  deadline - now;
      
      projects_table projects(get_self(), creator.value);
      uint64_t project_key = projects.available_primary_key();
      
      the_transax_controller.send_self_deferred_action(creator, name("fail"), delay, std::make_tuple(creator, project_key), project_key);
      
      projects.emplace(get_self(), [&]( auto& row ) {
        row.key = project_key;
        row.is_active = true;
        row.fulfilled = false;
        row.status = "in progress";
        row.project_name = project_name;
        row.content_type = content_type;
        row.time_due = block_timestamp(deadline);
        row.month = month;
      });
      
      channels.modify(channel_itr, get_self(), [&]( auto& row ) {
        row.mtotal_proj = (row.mtotal_proj + 1) & 0xFF;
      });
    }

    void fulfill_project(name creator, uint64_t project_key) {
      require_auth(creator);
      print("========= FULFILL =========");
      
      projects_table projects(get_self(), creator.value);
      auto project_itr = projects.find(project_key);
      auto the_project = *project_itr;
      eosio_assert(the_project.is_active == true, "project is not active");

      // verify content 
      
      the_transax_controller.cancel_deferred_transax(creator, name("fail"), project_key); // cancel fail time action
      projects.modify(project_itr, get_self(), [&](auto& row) {
        row.status = "payment pending";
        row.fulfilled = true;
        row.time_fulfilled = block_timestamp(current_time());
      });
    
      campaigns_table votes(get_self(), creator.value);
      uint64_t campaign_key = votes.available_primary_key();
      votes.emplace(get_self(), [&]( auto& row ) {
        row.key = campaign_key;
        row.project_key = project_key;
        row.voting_active = true;
        row.vote_type = "nps";
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

    void fail_project(name creator, uint64_t project_key) {
      projects_table projects(get_self(), creator.value);
      auto project_itr = projects.find(project_key);
      eosio_assert(project_itr != projects.end(), "project does not exist");
      auto the_project = *project_itr;
      eosio_assert(the_project.is_active == true, "project is not active");
      eosio_assert(the_project.fulfilled == false, "project has already been fulfilled");

      projects.modify(project_itr, get_self(), [&](auto& row) {
        row.status = "failed to fulfill on time";
        row.is_active = false;
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