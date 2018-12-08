import i from 'icepick'

const initialState = {
  activeIndex: 0,
  completed: false,
  method: 'scatter',
  authenticated: null,
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
    case 'AUTH/CREATE_SCATTER_ASSOCIATED_ACCOUNT':
      return i.chain(state)
        .assoc('complted', true)
        .assoc('authenticated', true)
        .value()
    case 'AUTH/SET_AUTHENTICATED':
      return i.chain(state)
        .assoc('authenticated', action.payload ? true : false)
        .value()
    default:
      return state
  }
}

