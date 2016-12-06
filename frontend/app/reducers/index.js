import { combineReducers } from 'redux'
import currentUser from './current_user'
import images from './images'
import profile from './profile'
import news from './news'
import friends from './friends'
import messages from './messages'

export default combineReducers({
  currentUser,
  images,
  profile,
  news,
  friends,
  messages
})
