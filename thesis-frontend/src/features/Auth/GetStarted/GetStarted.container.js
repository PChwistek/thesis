import { connect } from 'react-redux'
import { get } from 'lodash'
import GetStarted from './GetStarted'
import { setScatter, setScatterAccount } from '../../Scatter/Scatter.actions'
import { createScatterAssocAccount, getStartedAt, getStartedBack, getStartedNext } from '../Auth.actions'

const stateToProps = ({ scatter, auth }) => ({
  identity: scatter.identity,
  available: scatter.available,
  activeIndex: get(auth, 'activeIndex', 0),
})

const dispatchToProps = {
  setScatter,
  setScatterAccount,
  createScatterAssocAccount,
  getStartedNext,
  getStartedBack,
  getStartedAt,
}

export default connect(stateToProps, dispatchToProps)(GetStarted)