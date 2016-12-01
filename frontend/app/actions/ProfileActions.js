export function setProfile(profile) {
  localStorage.setItem('profile', JSON.stringify(profile))
  return {
    type: 'SET_PROFILE',
    payload: profile
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

export function setStatus(status) {
  return {
    type: 'SET_STATUS',
    payload: status
  }
}
