require('../static/css/reset.css'); //加载初始化样式
require('../static/css/style.css'); //加载组件样式
var $ = require("n-zepto");
var Velocity = require("velocity-animate");


// $(".main").click(function(){
// 	alert("213")
// })

// Function.prototype.bind = function(){
//     var self = this,
//     context = [].shift.call(arguments),
//     args = [].slice.call(arguments);
//     console.log(self);
//     console.log(arguments);//[1,2]
//     return function(){
//         console.log(arguments);//[3,4]
//         return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
//     };
// };

// var obj = {
//     name:"keke"
// };
// var fun = function (a,b,c,d){
//     alert(this.name);
//     alert([a,b,c,d]);
// }.bind(obj,1,2);


// fun(3,4);

var pageW=parseInt($(document).width());
var pageH=parseInt($(document).height());
var boxDom=$("#boxDom");
var btnDom=$("#btn");
var Top,Right;
var width;
width=pageW;
var colorArr=["#cfaf12","#12af01","#981234","#adefsa","#db6be4","#f5264c","#d34a74"];
 btnDom.bind("click",auto);
document.onkeydown=function(e){
    if(e.keyCode == 13){
        auto();
    }
}
var data = {
    avatar : "http://www.minizhen.com/Chat/head/oaufajqf9Oxwnv2JWK2Fh76YFFUY.jpg",
    content : "模糊"
}
function auto(){
    var creSpan=$("<span class='string'></span>");
    var main = "<img src ="+data.avatar+" width='30' height = '30' ><span>"+data.content+"</span> "
    creSpan.html(main);
    Top=parseInt(pageH*(Math.random()));
    if(Top>pageH-90){
        Top=pageH-90;
    }
    creSpan.css({"top":Top,"right":-300,"color":getRandomColor()});
    boxDom.append(creSpan);
    var spanDom=$("#boxDom>span:last-child");
    spanDom.velocity({"right":pageW+300},10000,"linear",function(){
                $(this).remove();
    });
}
function getRandomColor(){
    return '#' + (function(h){
        return new Array(7 - h.length).join("0") + h
    })((Math.random() * 0x1000000 << 0).toString(16));
}