const webpack = require("webpack");

module.exports = function override(config) {
  // Add the ProvidePlugin configuration to inject jQuery globally
  config.plugins.push(
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    })
  );

  return config;
};
