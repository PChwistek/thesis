import i from 'icepick'

const initialState = {
  channelName: '',
  minimumPrice: '',
  subs: '',
  desc: '',
  tags: '',
  projects: '',
  delivered: '',
  viewing: {}
}

export default function channel (state = initialState, action) {
  switch (action.type) {
    case 'CHANNEL/GET_USER_CHANNEL_FULFILLED':
      return i.chain(state)
        .assoc('channelName', action.payload.channelName)
        .assoc('minimumPrice', action.payload.minimumPrice)
        .assoc('subs', action.payload.subs)
        .assoc('desc', action.payload.desc)
        .assoc('tags', action.payload.tags)
        .assoc('projects', action.payload.projects)
        .assoc('delivered', action.payload.delivered)
        .value()
    case 'CHANNEL/GET_CHANNEL_DETAILS_FULFILLED':
      return i.assoc(state, 'viewing', action.payload)
  }
  return state
}