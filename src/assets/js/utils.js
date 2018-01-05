/*上拉加载插件*/
function ScrollPlugin(viewbox, parent, child, cb, autoLoad){
	this.parent = parent;
	this.child = child;
	this.viewbox = viewbox;
	this.cb = cb;
	autoLoad && cb();
}
ScrollPlugin.install = function(Vue, options){
	Vue.prototype.ScrollPlugin = ScrollPlugin;
}
ScrollPlugin.prototype.addEvent = function(){
	this.newscrollfn = this.scrollBottom.bind(this);//并保存新函数以便移除事件监听
	this.parent.addEventListener('scroll', this.newscrollfn)
}
ScrollPlugin.prototype.removeEvent = function(){
	this.parent.removeEventListener('scroll',this.newscrollfn)
	this.cb();
}
ScrollPlugin.prototype.scrollBottom = function(){
	var parentHeight = this.parent.offsetHeight + this.viewbox.getScrollTop();
	var childHeight = this.child.offsetHeight;
	if(parentHeight >= childHeight){
		this.removeEvent();			
	}
}
//生成32位随机字符串
function randomString(len) {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
}
//获取某一天为全年第几周
 /**
  * 判断年份是否为润年
  *
  * @param {Number} year
  */
 function isLeapYear(year) {
     return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
 }
  /**
  * 获取某一年份的某一月份的天数
  *
  * @param {Number} year
  * @param {Number} month
  */
 function getMonthDays(year, month) {
     return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
 } /**
  * 获取某年的某天是第几周
  * @param {Number} y
  * @param {Number} m
  * @param {Number} d
  * @returns {Number}
  */
 function getWeekNumber(y, m, d) {
     var now = new Date(y, m - 1, d),
         year = now.getFullYear(),
         month = now.getMonth(),
         days = now.getDate();
     //那一天是那一年中的第多少天
     for (var i = 0; i < month; i++) {
         days += getMonthDays(year, i);
     }
 
     //那一年第一天是星期几
     var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
 
     var week = null;
     if (yearFirstDay == 1) {
         week = Math.ceil(days / yearFirstDay);
     } else {
         days -= (7 - yearFirstDay + 1);
         week = Math.ceil(days / 7) + 1;
     }
 	//转换成中文数字
 	var arr = [
 		'一','二','三','四','五','六','七','八','九','十',
 		'十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
 		'二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十',
 		'三十一','三十二','三十三','三十四','三十五'
 	]
    return arr[week];
}
export {
	ScrollPlugin,
	randomString,
	getWeekNumber
}
