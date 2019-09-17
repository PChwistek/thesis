# Write up
https://honors.libraries.psu.edu/files/final_submissions/5509

## Prerequisites
In order to run this project you need to have the following installed
* npm (preferably yarn)
* docker
* eosio-cdt if you want to edit the contracts
* Scatter Desktop (recommended), Mobile, or Chrome Extension

## Setting up your local EOS instance
Follow this tutorial: https://developers.eos.io/eosio-home/v1.7.0/docs/getting-the-software

BlockOne has stated that they have ceased supporting Docker Image. Nonetheless, it isn't too outdated and by far the easiest way of running EOS locally. Perhaps a community supported version will span soon. 

## Setting up your Scatter Wallet/Extension
You need to have at least 1 test account created on your local EOS instance

1. Install Scatter (Desktop)

### Add your local EOS network
1. Click settings
2. Scroll down to networks on the left hand side
3. Create a new network with this configuartion
```
EOS
local
http
localhost
7777
<your chain id (get it from curl http://localhost:7777/v1/chain/get_info)>

```

### Add your local test acounts
1. Get the keys of the test account you created by running the following cleos command
```
cleos wallet private_keys --password YOUR WALLET PASSWORD
```
2. Go to vault
3. Select new
4. Import
5. Text or QR code
6. Paste in your private key from cleos
7. Export key

## Interacting with Contracts
Go to the README in contracts to learn how to set up the contracts on your local EOS instance
