/*
* @Author: Administrator
* @Date:   2017-10-17 09:51:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-17 10:11:43
*/

function fox_tap(element,callBack){
	//定义一些变量
	var startTime =0;
	var isMove = false;
	var maxTime = 250;
	element.addEventListener('touchstart',function(event){
		startTime = Date.now();
		isMove = false;
	} )
	element.addEventListener('touchmove',function(event){
		isMove = true;
		
	} )
	element.addEventListener('touchend',function(event){
		var delayTime = Date.now() - startTime;
		if(isMove) {
			return;
		}else if(delayTime>maxTime) {
			return;
		}else {
			callBack(event);
		}
	} )
	
}