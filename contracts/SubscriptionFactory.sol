/* This implements clone factory 
https://github.com/optionality/clone-factory
*/

pragma solidity 0.4.23;

import "./Subscription.sol";
import "./Ownable.sol";
import "./CloneFactory.sol";

contract SubscriptionFactory is CloneFactory {
    address public libraryAddress;

    event SubscriptionCreated(address newThingAddress, address libraryAddress);

    constructor(address _libraryAddress) public {
        libraryAddress = _libraryAddress;
    }

    function onlyCreate() public {
        createClone(libraryAddress);
    }

    function createSubscription(string _name) public {
        address clone = createClone(libraryAddress);
        Subscription(clone).init(_name);
        emit SubscriptionCreated(clone, libraryAddress);
    }
}