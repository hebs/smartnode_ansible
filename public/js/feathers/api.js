// import api from './api'

// export default {
//   isAuthenticated() {
//     const token = window.localStorage.getItem('feathers-jwt');
//     return token
//       ? api.passport.verifyJWT(token)
//       : new Promise((resolve, reject) => reject(false))
//   },
//   authenticate(options) {
//     return api.authenticate(options);
//   }
// }

// // Socket.io is exposed as the `io` global.
// const socket = io('http://localhost:3030', {
//   transports: ['websocket']
// });

// const app = feathers();

// app.configure(feathers.socketio(socket));
// app.configure(feathers.authentication({ storage: window.localStorage }));

// api.service('smart-node').find()
//   .then(result => {
//     this.setState({
//       smartNodes: result.data,
//       loading: false
//     });
//   })
//   .catch(err => {
//     toastr.error(err.message)
//   })

// const { email, password } = this.state;
// event.preventDefault();
// auth.authenticate({
//   email,
//   password,
//   strategy: 'local'
// })
//   .then(response => {
//     console.log({ response })
//     this.setState({
//       redirect: '/dashboard'
//     })
//   })
//   .catch(err => {
//     console.log({ err })
//     toastr.error(err.message)
//   })

const checkAuth = function(api) {
  const token = window.localStorage.getItem('feathers-jwt');
  return token
    ? api.passport.verifyJWT(token)
    : new Promise((resolve, reject) => reject(false))
  // authenticate(options) {
  //   return api.authenticate(options);
  // }
};

const api = function(nodar, feathers, io) {

  const api = feathers();

  // Socket.io is exposed as the `io` global.
  const socket = io('http://localhost:3030', {
    transports: ['websocket']
  });

  api.configure(feathers.socketio(socket));
  api.configure(feathers.authentication({ storage: window.localStorage }));

  const token = window.localStorage.getItem('feathers-jwt');

  if (token) {
    api.passport.verifyJWT(token)
      .catch(err => window.location.href = '/login')
  } else {}

  window.nodar.api = api;

} (window.nodar, feathers, io);