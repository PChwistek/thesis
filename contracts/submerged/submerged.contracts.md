<h1 class="contract">
   transfer
</h1>
### Parameters
Input parameters:

* `user` (string to include in the output)

Implied parameters: 

* `account_name` (name of the party invoking and signing the contract)

### Intent
INTENT. The intention of the author and the invoker of this contract is to print output. It shall have no other effect.

### Term
TERM. This Contract expires at the conclusion of code execution.

<h1 class="contract"> open </h1>

Stub for open action's ricardian contract parameters
Input parameters:

* `minimum_price` (string to include in the output)
* `num_projects` the (initial) monthly max of declared projects

Implied parameters: 

* `creator` (name of the party invoking and signing the contract)

### Intent
INTENT. The intention of the author and the invoker of this contract is to open a "channel" on the Submerged network. Channels owners will be able to declare and fulfill projects.

### Term
TERM. This Contract expires once the invoker closes their channel.