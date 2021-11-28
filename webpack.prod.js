const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin')
const Terser = require('terser-webpack-plugin');


module.exports = {
    mode:'production',
    output:{
        clean:true,
        filename: 'main.[contenthash].js'
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-loader',
                        options:{
                            sources: false,
                            minimize: false,
                        }
                    }
                ]
            },
            {
               test: /\.css$/,
               exclude: /styles.css$/i,
               use: ['style-loader','css-loader'] 
            },
            {
                test:/styles\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {   test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ]
    },
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            title:'Mi webpack app',
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyWebpackPlugin({
            patterns:[
                {from:'src/assets/' , to:'assets/'}
            ]
        }
        )
    ]

}