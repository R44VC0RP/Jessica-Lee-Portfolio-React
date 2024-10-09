module.exports = {
  reactScriptsVersion: "react-scripts",
  style: {
    css: {
      loaderOptions: () => {
        return {
          url: false,
        };
      },
    },
  },
  resolve: {
    fallback: {
      fs: false,
      http: false,
      https: false,
      url: false,
    },
  },
};