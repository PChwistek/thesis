#include "projmanager.hpp"
using namespace eosio;
using std::string;

ACTION projmanager::version() {
  print("Version 0.2"); 
};

ACTION projmanager::setproject(name creator, string projectId, string projectName, string contentType, uint32_t secondsToDeadline, uint64_t month) {
  require_auth(creator);
  uint32_t currentTime = current_time();
  print("====== CURRENT TIME", currentTime);
  uint32_t deadline = current_time() + secondsToDeadline;
  print("====== DEADLINE ", deadline);

  projects_table projects(_self, creator.value);
  projects.emplace(_self, [&]( auto& row ) {
    row.key = projects.available_primary_key();
    row.isActive = true;
    row.status = "In Progress";
    row.projectId = projectId;
    row.name = projectName;
    row.contentType = contentType;
    row.due = block_timestamp(deadline);
    row.month = month;
  });
}

ACTION projmanager::fulfill() {

}

ACTION projmanager::vote() {

}

EOSIO_DISPATCH(projmanager, (setproject)(fulfill)(version)(vote))