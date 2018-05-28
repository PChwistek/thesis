const Migrations = artifacts.require("./Migrations.sol")
const Subscription = artifacts.require("./Subscription.sol")
const Ownable = artifacts.require("./Ownable.sol")
const CloneFactory = artifacts.require("./CloneFactory.sol")
const SubscriptionFactory = artifacts.require("./SubscriptionFactory.sol")
const NaiveSubscriptionFactory = artifacts.require("./NaiveSubscriptionFactory.sol")

module.exports = function(deployer) {
  let MasterAddress = ''
  deployer.deploy(Migrations)
  deployer.deploy(Subscription).then((instance) => {
    MasterAddress = instance.address
  })
  deployer.deploy(Ownable)
  deployer.deploy(NaiveSubscriptionFactory)
  deployer.deploy(CloneFactory)
  deployer.deploy(SubscriptionFactory, MasterAddress)
}
