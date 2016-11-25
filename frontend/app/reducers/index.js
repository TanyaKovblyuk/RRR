import { combineReducers } from 'redux'
import current_user from './current_user'
import images from './images'
import profile from './profile'
import news from './news'
import friends from './friends'

export default combineReducers({
  current_user,
  images,
  profile,
  news,
  friends
})
