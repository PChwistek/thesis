pragma solidity ^0.4.23;

contract Subscription {
    
    string public owner;
    uint public subscribers;
    uint public totalFunds;

    event confirmedCreation(address sender, string name, uint numSubs, uint funds);
    event someEvent(address sender, string someWords);

    constructor() public {
        //no values, since will be dynamically initialized in factory
    }
    
    function init(string _name) public {
        require(bytes(_name).length == 0); //ensures that the contract has not already been initialized
        owner = _name;
    }

    function doIt() public {
        emit someEvent(address(this), owner);
    }

    function subbed() public returns (string) {
        subscribers++;
        require(false, "Hello world");
        return "Goodbye sweet world!";
    }


}