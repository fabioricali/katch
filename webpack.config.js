const webpack = require('webpack');
const unminifiedWebpackPlugin = require('unminified-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const pkg = require('./package.json');

const banner = `
  ${pkg.name} - ${pkg.description}
  Author: ${pkg.author.name}
  Version: v${pkg.version}
  Url: ${pkg.homepage}
  License(s): ${pkg.license}
`;

module.exports = {
    entry: './index.js',
    output: {
        filename: './dist/katch.min.js',
        library: 'katch',
        umdNamedDefine: true
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js'],
    },
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015'],
            },
        }],
    },
    node: {
        mkdirp: 'empty',
        fs: 'empty',
        os: 'empty'
    },
    //target: 'node',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            comments: false,
            compress: {
                warnings:false
            }, include: /\.min\.js$/ }),
        new WebpackAutoInject({
            PACKAGE_JSON_PATH: './package.json',
            components: {
                InjectAsComment: true,
                InjectByTag: true,
            },
            componentsOptions: {
                InjectAsComment: {
                    tag: 'katch Build version: {version}'
                }
            }
        }),
        new unminifiedWebpackPlugin()/*,
        new webpack.BannerPlugin(banner)*/
    ]
};
