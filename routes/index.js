
/*
 * Module dependencies
 */

var passport = require('passport')
  , utils = require('../utils');

/**
 * Expose routes
 */

module.exports = Routes;

/**
 * Defines routes for application
 *
 * @param {Express} app `Express` instance.
 * @api public
 */

function Routes (app) {
  var config = app.get('config');
  var client = app.get('redisClient');
  
  /*
   * Homepage
   */

  app.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
     client.hmset(
          'users:' + req.user.provider + ":" + req.user.username
        , req.user
      );
      res.redirect('/rooms');
    } else{
      res.render('index');
    }
  });

  /*
   * Authentication routes
   */
  authRoutes(app, config);

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


  /*
   * Rooms list
   */

  app.get('/rooms', utils.restrict, function(req, res) {
    utils.getPublicRoomsInfo(client, function(rooms) {
      res.render('room_list', { rooms: rooms });
    });
  });

  /*
   * Create a rooom
   */

  app.post('/create', utils.restrict, function(req, res) {
    utils.validRoomName(req, res, function(roomKey) {
      utils.roomExists(req, res, client, function() {
        utils.createRoom(req, res, client);
      });
    });
  });

  /*
   * Join a room
   */

  app.get('/:id', utils.restrict, function(req, res) {
    utils.getRoomInfo(req, res, client, function(room) {
      utils.getUsersInRoom(req, res, client, room, function(users) {
        utils.getPublicRoomsInfo(client, function(rooms) {
          utils.getUserStatus(req.user, client, function(status) {
            utils.enterRoom(req, res, room, users, rooms, status);
          });
        });
      });
    });
  });

}

/*
 * 绑定第三方登录
 *
 * */
function authRoutes(app, config){

  if(config.auth.twitter.consumerkey.length) {
    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', 
      passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/'
      })
    );
  }

  if(config.auth.facebook.clientid.length) {
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', 
      passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
      })
    );
  }

  if(config.auth.qq.clientid.length) {
    app.get('/auth/qq', passport.authenticate('qq'));

    app.get('/auth/qq/callback', 
      passport.authenticate('qq', {
        successRedirect: '/',
        failureRedirect: '/'
      })
    );
  }

  if(config.auth.weibo.clientid.length) {
    app.get('/auth/weibo', passport.authenticate('weibo'));

    app.get('/auth/weibo/callback', 
      passport.authenticate('weibo', {
        successRedirect: '/',
        failureRedirect: '/'
      })
    );
  }

  if(config.auth.renren.clientid.length) {
    app.get('/auth/renren', passport.authenticate('renren'));

    app.get('/auth/renren/callback', 
      passport.authenticate('renren', {
        successRedirect: '/',
        failureRedirect: '/'
      })
    );
  }

}
