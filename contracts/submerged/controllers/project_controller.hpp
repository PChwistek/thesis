class project_controller: public controller {
  private:
    transax_controller the_transax_controller;
    channel_controller the_channel_controller;

  public: 
    project_controller(name self, transax_controller a_transax_controller, channel_controller a_channel_controller): 
      controller(self), 
      the_channel_controller(a_channel_controller),
      the_transax_controller(a_transax_controller) {} 

    void create_project(name creator, string project_name, string content_type, uint32_t seconds_to_deadline, uint64_t month) {
      require_auth(creator);

      projects_table projects(get_self(), creator.value);
      channel the_channel = the_channel_controller.get_channel(creator.value);

      int currently_active = get_active_projects(creator);
      eosio_assert(currently_active < the_channel.num_proj_promised, "already hit limit");

      uint32_t deadline = now() + seconds_to_deadline;
      uint32_t delay =  deadline - now();
      
      uint64_t project_key = projects.available_primary_key();
      
      the_transax_controller.send_self_deferred_action(creator, name("fail"), delay, std::make_tuple(creator, project_key), project_key);
      
      projects.emplace(get_self(), [&]( auto& row ) {
        row.key = project_key;
        row.is_active = true;
        row.fulfilled = false;
        row.status = "in progress";
        row.project_name = project_name;
        row.content_type = content_type;
        row.time_due = block_timestamp(time_point_sec(deadline));
        row.month = month;
      });
      the_channel.total_proj = (the_channel.total_proj + 1) & 0xFF;
      the_channel_controller.set_channel(creator.value, the_channel);
     
    }

    void fulfill_project(name creator, uint64_t project_key) {
      require_auth(creator);
      print("========= FULFILL =========");
      
      project the_project = get_project(creator.value, project_key);
      eosio_assert(the_project.is_active == true, "project is not active");

      // verify content 
      
      the_transax_controller.cancel_deferred_transax(creator, name("fail"), project_key); // cancel fail time action
      the_project.status = "payment pending";
      the_project.fulfilled = true;
      the_project.time_fulfilled = block_timestamp(time_point_sec(now()));
      set_project(creator.value, project_key, the_project);
    
      polls_table votes(get_self(), creator.value);
      uint64_t campaign_key = votes.available_primary_key();
      votes.emplace(get_self(), [&]( auto& row ) {
        row.key = campaign_key;
        row.project_key = project_key;
        row.voting_active = true;
        row.vote_type = "nps";
        row.time_closes = block_timestamp(time_point_sec(now() + 30));
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
      project the_project = get_project(creator.value, project_key);
      channel the_channel = the_channel_controller.get_channel(creator.value);
      eosio_assert(the_project.is_active == true, "project is not active");
      eosio_assert(the_project.fulfilled == false, "project has already been fulfilled");

      the_project.status = "timed out";
      the_project.is_active = false;
      the_project.fulfilled = false;

      set_project(creator.value, project_key, the_project);
      if(the_channel.num_proj_promised == get_active_projects(creator)) {
        the_transax_controller.send_self_deferred_action(
          creator, 
          name("creditsubs"), 
          1, 
          std::make_tuple(creator), 
          project_key
        );
      }
    }

    void erase_all_projects(name creator) {
      projects_table projects(get_self(), creator.value);
      for(auto itr = projects.begin(); itr != projects.end();) {
        itr = projects.erase(itr);
      }
    }

    project get_project(uint64_t creator_key, uint64_t project_key) {
      projects_table projects(get_self(), creator_key);
      auto project_itr = projects.find(project_key);
      eosio_assert(project_itr != projects.end(), "project does not exist");
      auto the_project = *project_itr;
      return the_project;
    }

    void set_project(uint64_t creator_key, uint64_t project_key, project new_project) {
      projects_table projects(get_self(), creator_key);
      auto project_itr = projects.find(project_key);
      eosio_assert(project_itr != projects.end(), "project does not exist");
      projects.modify(project_itr, get_self(), [&](auto& row) {
        row.status = new_project.status;
        row.is_active = new_project.is_active;
        row.fulfilled = new_project.fulfilled;
        row.time_fulfilled = new_project.time_fulfilled;
      });
    }

    int get_active_projects(name creator) {
      projects_table projects(get_self(), creator.value);
      for(project proj: projects) {
        if(proj.is_active) {
          currently_active += 1;
        }
      }
    }
};