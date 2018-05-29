pragma solidity 0.4.23;

//solhint-disable max-line-length
//solhint-disable no-inline-assembly

contract Subscription {

  string public name;
  uint public funds;

  event CreateSubscription(address sender, string name, uint funds);

  constructor() public {
    name = "master"; // force default deployment to be init'd
  }

  function init(string _name, uint _funds) public {
    require(bytes(name).length == 0); // ensure not init'd already.
    require(bytes(_name).length > 0);

    name = _name;
    funds = _funds;
  }

  function doit() public {
    emit CreateSubscription(address(this), name, funds);
  }

  function epicfail() public returns (string){
    funds++;
    require(false, "Hello world!");
    return "Goodbye sweet world!";
  }
}