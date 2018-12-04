export async function transaction(api, contractName, contractAction, account, actionParam) {
  return await api.transact({
    actions: [{
      account: contractName,
      name: contractAction,
      authorization: [{
        actor: account.name,
        permission: account.authority,
      }],
      data: {...actionParam},
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
}

