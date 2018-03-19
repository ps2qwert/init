require('../../static/css/reset.css'); //加载初始化样式
require('../../static/css/bootstrap.less'); //加载组件样式
var $ = require("n-zepto");



let obj = {
	birth : '1990'
		
}
var n = 0
var last

function throttle(method,context){
	clearTimeout(method.tID);
	method.tId = setTimeout(()=>{
		method.call(context)
	},1000)
}

var debounce = function(idle, action){
  
  return function(){
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
        action.apply(ctx, args)
    }, idle)
  }
}

let showNum = () => {
	console.log(n)
	n++
}

debounce(1000,showNum())


$('#btn').on('click',function(){
	var x = debounce(1000,showNum);
	x()
})