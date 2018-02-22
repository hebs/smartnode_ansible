(function(nodar, feathers, io) {

  const apiRoot = 'http://localhost:3030';

  const api = feathers();
  const socket = io(apiRoot, {
    transports: ['websocket']
  });
  api.configure(feathers.socketio(socket));
  //api.configure(feathers.rest('http://feathers-api.com').fetch(window.fetch));
  api.configure(feathers.authentication({ storage: window.localStorage }));

  // api.authenticate()
  api.authenticate({
    strategy: 'local',
    email: 'techtbeau@gmail.com',
    password: 'password'
  })
    .then(response => {
      window.nodar.api = api;
      NProgress.done();
    })
    .catch(err => {
      console.log(err)
      window.location.href = '/login'
    })

  window.nodar.api = api;

} (window.nodar, feathers, io));