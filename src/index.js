var Mopidy = require("mopidy");
var restify = require('restify');
var errors = require('restify-errors');
require('dotenv').config()

var mopidy = new Mopidy({
  webSocketUrl: `ws://${process.env.MOPIDY_HOST}:${process.env.MOPIDY_PORT}/mopidy/ws/`
});

const server = restify.createServer({
  name: 'mopidy-nowplaying',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));

server.get('/playing', function (req, res, next) {
  mopidy.playback.getCurrentTrack()
    .catch((err) => {
      return next(new errors.InternalServerError())
    })
    .done((track) => {
      if(track) {
        res.send(200,`${track.name} - ${track.artists[0].name} - ${track.album.name}`);
      } else {
        res.send(200, 'No track playing');
      }
      return next();
    });
});

mopidy.on("state:online", function () {
  console.log('connected to mopidy');
  server.listen(process.env.API_PORT, function () {
    console.log(`Server running at ${server.url}`);
  });
});

