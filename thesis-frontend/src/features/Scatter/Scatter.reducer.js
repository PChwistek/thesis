import i from 'icepick'

const initialState = {
  'test': 0,
}

export default function scatter (state = initialState, action) {
  switch (action.type) {
    case 'SCATTER/SET_SCATTER_SUCCEEDED':
      console.log('right here!!')
      return state
    default:
      return state
  }
}