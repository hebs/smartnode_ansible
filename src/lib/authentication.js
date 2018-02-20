import api from './api'

export default {
  isAuthenticated() {
    const token = window.localStorage.getItem('feathers-jwt');
    return token
      ? api.passport.verifyJWT(token)
      : new Promise((resolve, reject) => reject(false))
  },
  authenticate(options) {
    return api.authenticate(options);
  }
}