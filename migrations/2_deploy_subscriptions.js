const Subscription = artifacts.require('./Subscription.sol')
const CloneFactory = artifacts.require('./CloneFactory.sol')
const Ownable = artifacts.require('./Ownable.sol')
const SubscriptionFactory = artifacts.require('./SubscriptionFactory.sol')
const NaiveSubscriptionFactory = artifacts.require('./NaiveSubscriptionFactory.sol')

module.exports = function(deployer) {
  deployer.deploy(CloneFactory)
    .then(() => deployer.deploy(Ownable))
    .then(() => deployer.deploy(Subscription))
    .then(() => deployer.deploy(SubscriptionFactory, Subscription.address))
    .then(() => deployer.deploy(NaiveSubscriptionFactory))
    .catch((error) => console.log(error))
}
