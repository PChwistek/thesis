struct st_transfer {
  name from;
  name to;
  asset quantity;
  string memo;
};

struct sub {
  uint64_t channel;
  asset    quantity;
};