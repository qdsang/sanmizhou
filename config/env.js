/**
 * Module dependencies.
 */

var env = process.env;

/**
 * Expose environment configuration
 */

module.exports = {
  redisURL: env.REDIS_URL || env.REDISTOGO_URL || "",
  auth: {
    facebook: {
      clientid: env.FB_CLIENT_ID,
      clientsecret: env.FB_CLIENT_SECRET,
      callback: env.FB_CALLBACK
    },
    twitter: {
      consumerkey: env.TW_CONSUMER_KEY,
      consumersecret: env.TW_CONSUMER_SECRET,
      callback: env.TW_CALLBACK
    },
    qq: {
      clientid: env.QQ_CLIENT_ID,
      clientsecret: env.QQ_CLIENT_SECRET,
    },
    weibo: {
      clientid: env.WB_CLIENT_ID,
      clientsecret: env.WB_CLIENT_SECRET,
      callback: env.WB_CALLBACK
    },
    renren: {
      clientid: env.RR_CLIENT_ID,
      clientsecret: env.RR_CLIENT_SECRET,
      callback: env.RR_CALLBACK
    } 
  },
  session: {
    secret: env.SESSION_SECRET || "b.io:secret"
  },
  app: {
    port: env.PORT || 6789
  },
  theme: {
    name: env.THEME_NAME || "default"
  }
};
