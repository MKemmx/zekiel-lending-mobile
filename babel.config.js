module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "react-native-reanimated/plugin",
        {
          relativeSourceLocation: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            src: "./src",
            services: "./services",
            assets: "./assets",
            store: "./store",
            components: "./components",
            helpers: "./helpers",
            screens: "./Screens",
          },
        },
      ],
    ],
  };
};
