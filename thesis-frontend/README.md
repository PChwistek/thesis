# Prerequisites
In order to run this project you need to have the following installed
* npm (preferably yarn)
* docker
* eosio-cdt if you want to edit the contracts

## Running the frontend
```
yarn install
yarn start
```

## Setting up your local EOS instance
Follow this tutorial: https://developers.eos.io/eosio-home/v1.7.0/docs/getting-the-software

## Setting up your Scatter extension
You need to have at least 1 test account created on your local EOS instance

1. Install the ScatterJS Chrome Extension (Scatter Desktop and Scatter Mobile work too)
2. Get the keys of the test account you created by running the following cleos command
```
cleos wallet private_keys --password YOUR WALLET PASSWORD
```
3. Import the private key into Scatter
4. Go to settings and click new
5. Create a new network with this configuartion
```
EOS
local
http
localhost
7777
<your chain id (get it from curl http://localhost:7777/v1/chain/get_info)>
```
6. Go to your generated identity and link the identity to an @active account from your local EOS instance

## Interacting with Scatter
Go to the README in contracts to learn how to set up the contracts on your local EOS instance