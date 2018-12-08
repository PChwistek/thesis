# Contracts
To edit these contracts you need to have the EOSIO development installed
```
brew tap eosio/eosio.cdt
brew install eosio.cdt
```
These contracts are already compiled, but if you change them you need to recompile using eosio-cpp

Conventions state that you should have an account for every contract, so create a submanager account
```
cleos create account eosio submanager <your generated public key> 
```
You may need to copy the contract directory to wherever you placed your main contract directory.
```
cp -r path/to/contract/in/repo path/to/your/main/contract/directory
```
Then you can use this account to upload the contract to your local network. 
```
cleos set contract submanager <path to submanager in main contract directory> -p submanager@active
```

Now give submanager access to eosio.code. This is necessary for the contract to listen to the whole network. 
```
cleos set account permission submanager active '{"threshold": 1,"keys": [{"key": "<submanager public key>","weight": 1}], "accounts": [{"permission":{"actor":"submanager","permission":"eosio.code"},"weight":1}]}' -p submanager@owner
```

All done!