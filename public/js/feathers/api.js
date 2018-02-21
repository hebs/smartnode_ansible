const setupApi = function(nodar, feathers, io) {

  const api = feathers();
  const socket = io('http://localhost:3030', {
    transports: ['websocket']
  });

  api.configure(feathers.socketio(socket));
  api.configure(feathers.authentication({ storage: window.localStorage }));

  const ensureAuthenticated = () => {
    //return api.authenticate()
    return api.authenticate({
      strategy: 'local',
      email: 'techtbeau@gmail.com',
      password: 'password'
    })
      .then(success => {
        return api;
      })
      .catch(err => {
        console.log(err)
        window.location.href = '/login'
      })
  };

  window.nodar.ensureAuthenticated = ensureAuthenticated;

} (window.nodar, feathers, io);