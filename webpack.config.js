const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode:'development',
    output:{
        clean:true,
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
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Mi webpack app',
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
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