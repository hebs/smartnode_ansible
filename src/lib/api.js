import feathers from '@feathersjs/client';
import io from 'socket.io-client';

// Socket.io is exposed as the `io` global.
const socket = io('http://localhost:3030', {
  transports: ['websocket']
});

const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication({ storage: window.localStorage }));

// app.authenticate({
//   strategy: 'local',
//   email: 'techtbeau@gmail.com',
//   password: 'password'
// })
//   .then(response => {
//     console.log('Authenticated!', response);
//     return app.passport.verifyJWT(response.accessToken);
//   })
//   .then(payload => {
//     console.log('JWT Payload', payload);
//     return app.service('users').get(payload.userId);
//   })
//   .then(user => {
//     app.set('user', user);
//     console.log('User', app.get('user'));
//   })
//   .catch(function (error) {
//     console.error('Error authenticating!', error);
//   });

export default app;