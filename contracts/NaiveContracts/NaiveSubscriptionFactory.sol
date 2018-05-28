pragma solidity ^0.4.23;

import "../Subscription.sol";

contract NaiveSubscriptionFactory {
    
    address[] public subscriptionContracts;
    event DeployedSubscription(address contractAddress);
    
    function newSubscription() public returns(address newContract) {
        Subscription sub = new Subscription();
        subscriptionContracts.push(sub);
        emit DeployedSubscription(sub);
        return sub;
    }
    
    function getSubscriptionContractsCount() public constant returns (uint count) {
        return subscriptionContracts.length;
    }
  
}