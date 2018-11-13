import i from 'icepick'

const initialState = {
  activeIndex: 0,
  completed: false,
}

export default function scatter (state = initialState, action) {
  switch(action.type){
    case 'GET_STARTED/NEXT':
      const nextValue = state.activeIndex + 1
      return i.assoc(state, 'activeIndex', nextValue)
    case 'GET_STARTED/BACK':
      const previousValue = state.activeIndex > 0 ? state.activeIndex - 1 : 0
      return i.assoc(state, 'activeIndex', previousValue)
    default:
      return state
  }
}

