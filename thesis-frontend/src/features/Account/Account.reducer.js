import i from 'icepick'

const initialState = {
  hasChannel: false,
  promised: 0,
  fulfilled: 0,
  subs: [],
  projects: [],
}

export default function account (state = initialState, action) {
  switch(action.type){
    case 'BLOCKCHAIN/OPEN_STORE_FULFILLED':
      return i.assoc(state, 'hasChannel', true)
    default:
      return state
  }
}

