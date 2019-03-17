import i from 'icepick'

const initialState = {
  activeIndex: 0,
  completed: false,
  method: 'scatter',
  authenticated: null,
  account: '',
  first: '',
  last: '',
  email: '',
  username: '',
  token: '',
  subscribedTo: '',
}

export default function auth (state = initialState, action) {
  switch(action.type){
    case 'AUTH/GET_STARTED_NEXT':
      const nextValue = state.activeIndex + 1
      return i.assoc(state, 'activeIndex', nextValue)
    case 'AUTH/GET_STARTED_PREV':
      const previousValue = state.activeIndex > 0 ? state.activeIndex - 1 : 0
      return i.assoc(state, 'activeIndex', previousValue)
    case 'AUTH/GET_STARTED_COMPLETED':
      return i.chain(state)
        .assoc('completed', true)
        .assoc('authenticated', true)
        .value()
    case 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT_FULFILLED':
      return i.chain(state)
        .assoc('completed', true)
        .assoc('authenticated', true)
        .assoc('token', action.payload.token)
        .assoc('first', action.payload.first)
        .assoc('last', action.payload.last)
        .assoc('email', action.payload.email)
        .assoc('username', action.payload.username)
        .assoc('account', action.payload.account)
        .value()
    case 'AUTH/LOGIN_WITH_SCATTER_FULFILLED':
      return i.chain(state)
        .assoc('completed', true)
        .assoc('authenticated', true)
        .assoc('token', action.payload.token)
        .assoc('first', action.payload.first)
        .assoc('last', action.payload.last)
        .assoc('email', action.payload.email)
        .assoc('username', action.payload.username)
        .assoc('account', action.payload.account)
        .value()
    case 'AUTH/LOGOUT':
      return initialState
    case 'AUTH/SET_AUTHENTICATED':
      return i.chain(state)
        .assoc('authenticated', action.payload ? true : false)
        .value()
    case 'BLOCKCHAIN/OPEN_STORE_FULFILLED':
      return i.assoc(state, 'hasChannel', true)
    default:
      return state
  }
}

