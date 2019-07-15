const withCSS = require("@zeit/next-css");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = phase => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const env = {
    BASE_URL: (() => {
      if (isDev) return "http://localhost:3000";
      return "https://that.matthewcarlreetz.now.sh";
    })()
  };

  // next.config.js object
  return withCSS({
    target: "serverless",
    env
  });
};
