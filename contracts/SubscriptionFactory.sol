pragma solidity 0.4.23;

import "./Subscription.sol";
import "./CloneFactory.sol";


contract SubscriptionFactory is CloneFactory {

  address public libraryAddress;

  event SubscriptionCreated(address newSubAddress, address libraryAddress);

  constructor (address _libraryAddress) public {
    libraryAddress = _libraryAddress;
  }

  function onlyCreate() public {
    createClone(libraryAddress);
  }

  function createThing(string _name, uint _value) public {
    address clone = createClone(libraryAddress);
    Subscription(clone).init(_name, _value);
    emit SubscriptionCreated(clone, libraryAddress);
  }
}
