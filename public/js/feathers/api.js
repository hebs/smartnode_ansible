(function(nodar, feathers, io) {

  const apiRoot = 'http://localhost:3030';

  const api = feathers();
  const socket = io(apiRoot, {
    transports: ['websocket']
  });
  api.configure(feathers.socketio(socket));
  //api.configure(feathers.rest('http://feathers-api.com').fetch(window.fetch));
  api.configure(feathers.authentication({ storage: window.localStorage }));

  const token = window.localStorage.getItem('feathers-jwt');
  console.log(token)

  const ensureAuthenticated = () => {
    //return api.authenticate()
    return api.authenticate({
      strategy: 'local',
      email: 'techtbeau@gmail.com',
      password: 'password'
    })
      .then(response => {
        api.set('user', response.user);
        return api;
      })
      .catch(err => {
        console.log(err)
        //window.location.href = '/login'
      })
  };

  window.nodar.ensureAuthenticated = ensureAuthenticated;

} (window.nodar, feathers, io));