var http = require('http');
var querystring = require('querystring');
//json转换为字符串
var data = querystring.stringify({
    Num:"苏A33333",
    imgSrc : []
});
var options = {
    host: 'https://api.douban.com/v2/movie/top250',
    path:'/Chepai/up.php',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
    res.on('end',function (chunk){
        console.log("body: " + chunk);
    })
});

req.write(data);
req.end();

