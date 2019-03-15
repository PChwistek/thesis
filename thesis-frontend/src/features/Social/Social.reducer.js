import i from 'icepick'

const initialState = {
  posts: []
}

export default function scatter (state = initialState, action) {
  switch (action.type) {
    case 'SOCIAL/GET_FEED_FULFILLED':
      if(action.payload[0]) {
        return i.assoc(state, 'posts', action.payload[0])
      }
      return state
    default:
      return state
  }
}