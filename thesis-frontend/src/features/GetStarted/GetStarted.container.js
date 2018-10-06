import { connect } from 'react-redux'
import GetStarted from './GetStarted'
import { setScatter } from '../Scatter/Scatter.actions'

const stateToProps = () => ({

})

const dispatchToProps = {
  setScatter,
}

export default connect(stateToProps, dispatchToProps)(GetStarted)