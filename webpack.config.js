const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const filterFunc = process.env.FUNC_NAME;

const entries = glob.sync("./src/functions/*").reduce(function(entries, entry) {
  if (filterFunc) {
    if (!entry.match(filterFunc)) {
      return entries;
    }
  }

  entries[entry.toString()] = entry;
  return entries;
}, {});

console.log("Building functions");
console.log(Object.keys(entries).join("\n"));

const config = {
  mode: "production",
  entry: entries,
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /re2\.node$/i,
        use: "raw-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".node"],
    descriptionFiles: ["package.json", "bower.json"],
    modules: ["node_modules"],
    alias: {
      app: path.resolve(__dirname, "src"),
    },
  },
  output: {
    filename: "[name]/index.js",
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "dist"),
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION)
    }),
  ],
};

module.exports = config;
