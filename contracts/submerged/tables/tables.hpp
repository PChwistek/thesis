#pragma once

TABLE channel {
  name        key;
  string      sub_status;
  asset       minimum_price;
  asset       total_raised;
  bool        month_complete;
  bool        payment_complete;
  uint8_t     mtotal_proj;
  uint8_t     mproj_fulfilled;
  uint32_t    num_subs;
  uint64_t primary_key() const { return key.value; }
};

TABLE channel_sub {
  name              key;
  asset             quantity_subscribed;
  block_timestamp   valid_until;
  bool              conditional;
  bool              transfered;
  uint64_t primary_key() const { return key.value; }
};

TABLE user_sub {
  name              key;
  std::vector<sub>  channels_subbed;
  uint64_t primary_key() const { return key.value; }
};

TABLE project {
  uint64_t          key; 
  bool              is_active;
  bool              fulfilled;
  string            project_name; // what is visible
  string            content_link; 
  string            content_type;
  string            status; // in Progress, fulfilled, not fulfilled, payment pending
  uint64_t          month; 
  block_timestamp   time_due;
  block_timestamp   time_fulfilled;
  uint64_t primary_key() const { return key; }
};

TABLE referendum {
  uint64_t                key;
  uint64_t                project_key; 
  string                  vote_type;
  uint32_t                agree;
  uint32_t                disagree;
  bool                    voting_active;
  bool                    passed;
  std::vector<uint64_t>   voters;
  uint64_t primary_key() const { return key; }
};

TABLE credit {
  uint64_t  key;
  asset     total;
  uint64_t primary_key() const { return key; }
};

typedef multi_index<name("channels"), channel> channels_table;
typedef multi_index<name("csubs"), channel_sub> channel_subs_table;
typedef multi_index<name("projects"), project> projects_table;
typedef multi_index<name("votes"), referendum> campaigns_table;
typedef multi_index<name("usubs"), user_sub> user_subs_table;
typedef multi_index<name("credit"), credit> credit_table;
