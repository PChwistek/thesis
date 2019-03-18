import i from 'icepick'

const initialState = {
  channelName: '',
  minimumPrice: '',
  subs: '',
  desc: '',
  tags: '',
  projects: '',
  delivered: '',
  viewing: {},
  channels: [],
  subscriptions: [],
}

export default function channel (state = initialState, action) {
  switch (action.type) {
    case 'CHANNEL/GET_USER_CHANNEL_FULFILLED':
      return i.chain(state)
        .assoc('channelName', action.payload.channelName)
        .assoc('minimumPrice', action.payload.minimumPrice)
        .assoc('subs', action.payload.subs)
        .assoc('desc', action.payload.description)
        .assoc('tags', action.payload.tags)
        .assoc('projects', action.payload.projects)
        .assoc('delivered', action.payload.delivered)
        .assoc('subscriptions', action.payload.subscriptions)
        .value()
    case 'CHANNEL/GET_CHANNEL_DETAILS_FULFILLED':
      return i.assoc(state, 'viewing', action.payload)
    case 'CHANNEL/LOG_CHANNEL_FULFILLED':
      return i.chain(state)
        .assoc('channelName', action.payload.channelName)
        .assoc('minimumPrice', action.payload.minimumPrice)
        .assoc('subs', action.payload.subs)
        .assoc('desc', action.payload.description)
        .assoc('tags', action.payload.tags)
        .assoc('projects', action.payload.projects)
        .assoc('delivered', action.payload.delivered)
        .value()
    case 'CHANNEL/GET_CHANNELS_FULFILLED': 
      return i.assoc(state, 'channels', action.payload)
    case 'CHANNEL/CLEAR':
      return initialState
  }
  return state
}