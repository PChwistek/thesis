#pragma once

TABLE channel {
  name key;
  string sub_status;
  asset minimum_price;
  uint64_t primary_key() const { return key.value; }
};

TABLE subscriber {
  name key;
  asset quantity_subscribed;
  bool conditional;
  uint64_t primary_key() const { return key.value; }
};

TABLE project {
  uint64_t          key; 
  bool              isActive;
  bool              fulfilled;
  string            name; // what is visible
  string            contentLink; 
  string            contentType;
  string            status; // in Progress, fulfilled, not fulfilled, payment pending
  uint64_t          month; 
  block_timestamp   timeDue;
  block_timestamp   timeFulfilled;
  uint64_t primary_key() const { return key; }
};

TABLE votecampaign {
  uint64_t key;
  uint64_t projectKey; 
  string voteType;
  uint64_t agree;
  uint64_t disagree;
  bool votingActive;
  std::vector<uint64_t> voters;
  uint64_t primary_key() const { return key; }
};

typedef multi_index<name("channels"), channel> channels_table;
typedef multi_index<name("subs"), subscriber> subs_table;
typedef multi_index<name("projects"), project> projects_table;
typedef multi_index<name("votes"), votecampaign> campaigns_table;

