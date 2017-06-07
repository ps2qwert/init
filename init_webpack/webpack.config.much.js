var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    //插件项
    plugins: [
    	commonsPlugin,
	new webpack.ProvidePlugin({
	    $: 'n-zepto',
	    Zepto: 'n-zepto',
	    'window.Zepto': 'n-zepto',
	    'window.$': 'n-zepto',
	  }),
	new ExtractTextPlugin("style.css"),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                  title: 'My App',
                  template: 'index.html',
                  inject: 'body',
                  filename: 'index.html',
                  hash : true,
                  minify:{
                        removeComments: true,
                        collapseWhitespace : true
                  },
                  chunks : ['index','common.js']
            }),
            new HtmlWebpackPlugin({
                filename: 'list.html',
                template: 'index.html',
                inject : true,
                chunks: ['common.js', 'list']
            })
    ],
    //页面入口文件配置
    entry: {
        index : __dirname + '/src/app/index1.js',
        list : __dirname + '/src/app/list.js' 
    },
    
    //入口文件输出配置
    output: {
        path: __dirname + '/dist',
        // publicPath : "/dist/",
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url?limit=10000&name=images/[hash:8].[name].[ext]'
            },
            { test: /\.json$/, loader : "json"},
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    } 
};
