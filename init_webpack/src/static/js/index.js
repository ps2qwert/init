
require('../../static/css/reset.css'); //加载初始化样式
require('../../static/css/bootstrap.less'); //加载组件样式
// require("html-loader");js箭头函数
 //加载组件样式
var $ = require("n-zepto");
// // var Velocity = require("velocity-animate");
// debugger
// // $('#img').attr('src',imgSrc)
// console.log(imgSrc)
alert('2')
let obj = {
	birth : '1990',
	getAge : function(){
		let fn = () => new Date().getFullYear() - this.birth;
		return fn()
	}
		
}

var debounce = function(idle, action){
  var last
  return function(){
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
        action.apply(ctx, args)
    }, idle)
  }
}

let showNum = () => {
	console.log("开始")
}

debounce(1000,showNum())