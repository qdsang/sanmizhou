
/*
 * Module dependencies
 */

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy 
  , QQStrategy = require('passport-qq').Strategy
  , WeiboStrategy = require('passport-weibo').Strategy
  , RenrenStrategy = require('passport-renren').Strategy
;
/**
 * Expose Authentication Strategy
 */

module.exports = Strategy;

/*
 * Defines Passport authentication
 * strategies from application configs
 *
 * @param {Express} app `Express` instance.
 * @api public
 */

function Strategy (app) {
  var config = app.get('config');

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  if(config.auth.twitter.consumerkey.length) {
    passport.use(new TwitterStrategy({
        consumerKey: config.auth.twitter.consumerkey,
        consumerSecret: config.auth.twitter.consumersecret,
        callbackURL: config.auth.twitter.callback
      },
      function(token, tokenSecret, profile, done) {
        return done(null, profile);
      }
    ));
  } 

  if(config.auth.facebook.clientid.length) {
    passport.use(new FacebookStrategy({
        clientID: config.auth.facebook.clientid,
        clientSecret: config.auth.facebook.clientsecret,
        callbackURL: config.auth.facebook.callback
      },
      function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    ));
  }

  if(config.auth.qq.clientid.length) {
    passport.use(new QQStrategy({
        clientID: config.auth.qq.clientid,
        clientSecret: config.auth.qq.clientsecret,
        callbackURL: config.auth.qq.callback
      },
      function(accessToken, refreshToken, profile, done) {
	profile.username = profile.username || profile.nickname || profile.name;
        return done(null, profile);
      }
    ));
  }

  if(config.auth.weibo.clientid.length) {
    passport.use(new WeiboStrategy({
        clientID: config.auth.weibo.clientid,
        clientSecret: config.auth.weibo.clientsecret,
        callbackURL: config.auth.weibo.callback
      },
      function(accessToken, refreshToken, profile, done) {
	profile.username = profile.username || profile.nickname || profile.name;
        return done(null, profile);
      }
    ));
  }

  if(config.auth.renren.clientid.length) {
    passport.use(new RenrenStrategy({
        clientID: config.auth.renren.clientid,
        clientSecret: config.auth.renren.clientsecret,
        callbackURL: config.auth.renren.callback
      },
      function(accessToken, refreshToken, profile, done) {
	profile.username = profile.username || profile.nickname || profile.name;
	return done(null, profile);
      }
    ));
  }
}

