# Thesis 

This repo holds my project for my 2018 Honors Thesis. Ideally, this project will offer an alternative method of funding independent content creators through cryptocurrencies, or more specifically, an Ethereum token (e.g. ERC20).

This Trello board shows the current phase of development: https://trello.com/b/a6F0U7Tl/thesis

## Current Goal

Allow users to subscribe to a creator and allow creators access to those funds after a certain period of time. 

## Prerequisites

Make sure you have the following installed:

Yarn
```
npm install -g yarn
```
Truffle
```
npm install -g truffle
```

## Getting Started

For this application to function properly, fire up two terminal instances: one to serve the React app and the other to run a local Ethereum instance using Truffle. If using Windows, make sure to run Truffle using PowerShell. 

First, clone this repo:
```
git clone https://github.com/PChwistek/thesis.git
```
Then, install dependencies:
```
yarn install
```
Start Truffle in the first terminal instance:
```
truffle develop
compile
```
Start the development server in the second terminal instance:
```
yarn start
```

## Built With

* React:  https://github.com/facebook/react
* Redux:  https://github.com/reduxjs/redux
* Truffle: https://github.com/trufflesuite/truffle

## Authors

* **Philip Chwistek** - [PChwistek](https://github.com/PChwistek)

## Acknowledgments

* TBD

