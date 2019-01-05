# Contracts
This is the smart contract responsible for handling payments, referendums, foundation decisions, and channels. It's all 1 monolith contract (transactions across contracts are expensive) that breaks down its logic using hpp headers. The actual cpp file is really a facade, and the actual logic occurs in the controllers. 

## Editing 
To edit this you need to have the EOSIO development installed
```
brew tap eosio/eosio.cdt
brew install eosio.cdt
```
These contracts are already compiled, but if you change them you need to recompile using eosio-cpp

Conventions state that you should have an account for every contract, so create a submerged account
```
cleos create account eosio submanager <your generated public key> 
```
You may need to copy the contract directory to wherever you placed your main contract directory.
```
cp -r path/to/contract/in/repo path/to/your/main/contract/directory
```
Then you can use this account to upload the contract to your local network. 
```
cleos set contract submerged <path to submerged in main contract directory> -p submerged@active
```

Now give submanager access to eosio.code. This is necessary for the contract to listen to the whole network. 
```
cleos set account permission submerged active '{"threshold": 1,"keys": [{"key": "<submerged public key>","weight": 1}], "accounts": [{"permission":{"actor":"submerged","permission":"eosio.code"},"weight":1}]}' -p submerged@owner
```

All done!