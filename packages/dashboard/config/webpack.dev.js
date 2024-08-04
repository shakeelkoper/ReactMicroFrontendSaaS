const { merge } = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output:{
        publicPath: 'http://localhost:8083/'
    },
    devServer: {
        port: 8083,
        historyApiFallback: {
            index: '/index.html'
        },
        headers:{
            'Access-Control-Allow-Orgin': '*' 
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederation({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig);