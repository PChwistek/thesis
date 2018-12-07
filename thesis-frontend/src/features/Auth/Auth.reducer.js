import i from 'icepick'

const initialState = {
  activeIndex: 0,
  completed: false,
  method: 'scatter',
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
      return i.assoc(state, 'completed', true)
    default:
      return state
  }
}

