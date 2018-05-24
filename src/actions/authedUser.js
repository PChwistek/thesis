//the user, for now, is basically a wallet address
export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(wallet) {
  return {
    type: SET_AUTHED_USER,
    wallet
  }
}
