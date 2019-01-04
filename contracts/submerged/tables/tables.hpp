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
  name                    key;
  std::vector<uint64_t>   channels_subbed;
  std::vector<asset>      total;
};

TABLE project {
  uint64_t          key; 
  bool              isActive;
  bool              fulfilled;
  string            projectName; // what is visible
  string            contentLink; 
  string            contentType;
  string            status; // in Progress, fulfilled, not fulfilled, payment pending
  uint64_t          month; 
  block_timestamp   timeDue;
  block_timestamp   timeFulfilled;
  uint64_t primary_key() const { return key; }
};

TABLE votecampaign {
  uint64_t                key;
  uint64_t                projectKey; 
  string                  voteType;
  uint32_t                agree;
  uint32_t                disagree;
  bool                    votingActive;
  bool                    passed;
  std::vector<uint64_t>   voters;
  uint64_t primary_key() const { return key; }
};

TABLE credit {
  uint64_t  key;
  asset     total;
};

typedef multi_index<name("channels"), channel> channels_table;
typedef multi_index<name("csubs"), channel_sub> channel_subs_table;
typedef multi_index<name("projects"), project> projects_table;
typedef multi_index<name("votes"), votecampaign> campaigns_table;
typedef multi_index<name("usubs"), user_sub> user_subs_table;
typedef multi_index<name("credit"), credit> credit_table;
