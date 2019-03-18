import i from 'icepick'

const initialState = {
  posts: [],
  channelPosts: [],
  projects: []
}

export default function scatter (state = initialState, action) {
  switch (action.type) {
    case 'SOCIAL/GET_FEED_FULFILLED':
      if(action.payload[0]) {
        return i.assoc(state, 'posts', action.payload[0])
      }
      return state
    case 'SOCIAL/GET_CHANNEL_FEED_FULFILLED':
      if(action.payload[0]) {
        return i.assoc(state, 'channelPosts', action.payload[0])
      }
      return state
    case 'SOCIAL/GET_PROJECTS_FULFILLED':
      return i.assoc(state, 'projects', action.payload[0])
    case 'SOCIAl/CLEAR':
      return initialState
    default:
      return state
  }
}