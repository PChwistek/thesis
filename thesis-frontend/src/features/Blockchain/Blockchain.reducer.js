// import i from 'icepick'

const initialState = {

}

export default function blockchain (state = initialState, action) {
  switch (action.type) {
    case 'BLOCKCHAIN/SAY_HELLO_FULFILLED':
      console.log(action.payload)
      return state
    case 'BLOCKCHAIN/SAY_HELLO_REJECTED':
      console.log(action.payload)
      return state
    default:
      return state
  }
}