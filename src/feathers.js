import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import feathersAuth from '@feathersjs/authentication-client'

const apiRoot = 'http://localhost:3030'

const socket = io(apiRoot, {
  transports: ['websocket'],
  forceNew: true
})

const api = feathers()
api.configure(socketio(socket))
api.configure(feathersAuth({
  storage: window.localStorage
}))

const auth = {
  isAuthorized: false,
  checkAuth () {
    if (!this.isAuthorized) {
      console.log('Not Autorized')
      const jwt = localStorage.getItem('feathers-jwt')
      console.log(jwt)
      if (jwt) {
        console.log('Token found, authorizing')
        // return api.authenticate()
        return api.authenticate()
          .then((response) => {
            console.log('Authorized')
            this.isAuthorized = true
            return true
          })
          .catch((err) => {
            console.log(err)
            this.isAuthorized = false
            return false
          })
      } else {
        console.log('no token')
        // temp code to bypass auth
        return api.authenticate({
          strategy: 'local',
          email: 'techtbeau@gmail.com',
          password: 'password'
        })
          .then((response) => {
            console.log('Authorized')
            this.isAuthorized = true
            return true
          })
          .catch((err) => {
            console.log(err)
            this.isAuthorized = false
            return false
          })
        // return new Promise((resolve, reject) => {
        //   reject(new Error('There is no JWT'))
        // })
      }
    } else {
      console.log('Already authorized')
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    }
  }
}

export { api }
export { auth }
export default { api, auth }
