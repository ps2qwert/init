var webpack = require('webpack');
var glob = require('glob')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var entries = getEntry('src/app/**/*.js','');
var chunks = Object.keys(entries);
var config = {
    //插件项
    plugins: [
            new webpack.optimize.CommonsChunkPlugin({
              name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
              chunks: chunks,
              minChunks: chunks.length // 提取所有entry共同依赖的模块
            }),
	new webpack.ProvidePlugin({
	    $: 'n-zepto',
	    Zepto: 'n-zepto',
	    'window.Zepto': 'n-zepto',
	    'window.$': 'n-zepto',
	  }),
	new ExtractTextPlugin("css/style.css"),
            new webpack.HotModuleReplacementPlugin(),
            // new HtmlWebpackPlugin({
            //       title: 'My App',
            //       template: 'index.html',
            //       inject: 'body',
            //       filename: 'index.html',
            //       hash : true,
            //       minify:{
            //             removeComments: true,
            //             collapseWhitespace : true
            //       },
            //       chunks : ['index','common.js']
            // }),
            // new HtmlWebpackPlugin({
            //     filename: 'list.html',
            //     template: 'index.html',
            //     inject : true,
            //     chunks: ['common.js', 'list']
            // })
    ],
    //页面入口文件配置
    entry: entries,
    //入口文件输出配置
    // output: {
    //     path: __dirname + '/build',
    //     // publicPath : "/dist/",
    //     filename: '[name].js'
    // },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/static/',
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    module: {
        //加载器配置
        loaders: [
            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
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

var pages = Object.keys(getEntry('src/app/**/*.html', 'src/app/'));
console.log(pages)
pages.forEach(function(pathname) {
    var conf = {
        filename:  '../build/' + pathname + '.html', //生成的html存放路径，相对于path
        template:  pathname + '.html', //html模板路径
        inject: false,    //js插入的位置，true/'head'/'body'/false
        /*
        * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
        * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
        * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
        * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        // minify: { //压缩HTML文件
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: false //删除空白符与换行符
        // }
    };
    if (pathname in config.entry) {
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    console.log(conf)
    config.plugins.push(new HtmlWebpackPlugin(conf));
});


function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
    entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        console.log(entry)
        dirname = path.dirname(entry);
        console.log(dirname)
        extname = path.extname(entry);
        console.log(extname)
        basename = path.basename(entry, extname);
        console.log(basename)
        pathname = path.join(dirname, basename);
        console.log(pathname)
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        console.log(pathname)
        entries[pathname] = ['../' + entry];
    }
    console.log(entries)
    return entries;
}



module.exports = config;