import { connect } from 'react-redux'
import GetStarted from './GetStarted'
import { setScatter, setScatterAccount } from '../Scatter/Scatter.actions'

const stateToProps = () => ({

})

const dispatchToProps = {
  setScatter,
  setScatterAccount,
}

export default connect(stateToProps, dispatchToProps)(GetStarted)