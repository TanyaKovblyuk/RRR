export function setProfile(profile) {
  return {
    type: 'SET_PROFILE',
    payload: profile
  }
}

export function setFriends(users) {
  return {
    type: 'SET_FRIENDS',
    payload: users
  }
}

export function setPosts(posts) {
  return {
    type: 'SET_POSTS',
    payload: posts
  }
}

export function setComments(comments) {
  return {
    type: 'SET_COMMENTS',
    payload: comments
  }
}
