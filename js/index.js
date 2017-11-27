/*
* @Author: Administrator
* @Date:   2017-10-13 15:43:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-14 12:21:39
*/
window.onload = function(){
	//顶部通栏滚动效果
	headerScroll();
	
	//倒计时效果
	cutDownTime();

	//轮番图效果 
	banner();

	// 顶部通栏滚动   
	function headerScroll(){   
		/*1、获取相关元素以及相关变量
		2、在滚动事件中需要完成的任务。每一次滚动需要计算被卷去的距离，（被卷去的距离/总高度）作为透明度。更改通栏的透明度
		*/
		//获取相关元素
		var header = document.querySelector('.jd_header');
		var nav = document.querySelector('.jd_nav');
		var tatalHeight = nav.offsetTop + nav.offsetHeight;
		console.log(tatalHeight);
		window.onscroll = function(){
			//页面被卷去的高度
			var height= window.document.body.scrollTop;
			var bili = height/tatalHeight;
			// console.log(tatalHeight);总高度总是不变
			if(bili>1){
				bili = 1;
			}
			header.style.backgroundColor = 'rgba(201, 21, 35,'+bili+')';
		}
	}

	   //倒计时效果
	   function cutDownTime(){
	   		//思路：使用定时器，每隔1s就更改时间,转化成h,m,s同时更改li标签里的内容
	   		//
	   		//获取相关元素
	   		var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
	   		// console.log(liArr);
	   		//
	   		var time = 2;
	   		var secTime = 5;
	   		
	   	var timeId = setInterval(function(){
	   		//清除定时器	   		
	   		if(secTime<=0){
	   			// console.log('到点了');
	   			clearInterval(timeId);
	   			return;
	   		} 
	   		//
	   		//
	   		secTime--;
	   			//转换成h,m,s
	   		var h = Math.floor(secTime/3600);
	   		var m = Math.floor(secTime%3600/60);
	   		var s = Math.floor(secTime%60);
	   		//分别求h,m,s对应的个位上的数以及十位上的数，然后填充到各个li标签里
	   		
	   		liArr[0].innerHTML = Math.floor(h/10);
	   		liArr[1].innerHTML = h%10;
	   		liArr[3].innerHTML = Math.floor(m/10);
	   		liArr[4].innerHTML = m%10;
	   		liArr[6].innerHTML = Math.floor(s/10);
	   		liArr[7].innerHTML = s%10;

	   		}, 1000);
	   		
	   }

	//轮番图特效
	function banner(){
		//1、自动旋转 
		//思路：运用定时器，每隔1sUl会自动移动屏幕的宽度，运用c3里的移动并过度，同时添加过度结束事件。
		//在过度结束事件里要完成的任务：判断是否到达最后一张图片，如果是，去除过度直接跳转到第一张图;更改底端对应的小序列。
		
		//获取相关元素
		var ul = document.querySelector('.banner_images');
		var liArr= document.querySelectorAll('.banner_index li');
		var width = document.body.offsetWidth;
		// console.log(width);
		var index = 1;
		var timerId = setInterval(function(){
			index++;
			ul.style.transition=  'all 0.3s';
			ul.style.transform= 'translateX('+(-index*width)+'px)';
		}, 1000)
		//过度结束事件
		ul.addEventListener('webkitTransitionEnd',function(){
			console.log('过度结束啦！');
			if(index>8){
				index = 1;
				//去除过度
				ul.style.transition=  '';
				ul.style.transform= 'translateX('+(-index*width)+'px)';
			}else if(index<1){
				index = 8;
				//去除过度
				ul.style.transition=  '';
				ul.style.transform= 'translateX('+(-index*width)+'px)';
			}

			//更改底端对应的li序号
			for(var i=0;i<liArr.length;i++){
				liArr[i].className = '';
			}
			liArr[index-1].className = 'current';          
		})

		//手指触摸事件
		//
		//手指触摸开始的位置
		var startX = 0;
		//手指移动的距离
		var moveX = 0;
		
		ul.addEventListener('touchstart',function(event){
			clearInterval(timerId);
			// console.log(event);
			 ul.style.transition=  '';
			startX = event.touches[0].clientX;
		})
		ul.addEventListener('touchmove',function(event){
			
			moveX = event.touches[0].clientX-startX;
			ul.style.transform= 'translateX('+(-index*width+moveX)+'px)';
			
		})
		ul.addEventListener('touchend',function(){
			ul.style.transition=  'all 0.3s';
			if(Math.abs(moveX)>width/3) {
				if(moveX>0){
					index--;
				}else {
					index++;
				}
				ul.style.transform= 'translateX('+(-index*width)+'px)';
			}else {
				ul.style.transform= 'translateX('+(-index*width)+'px)';

			}

			//开启定时器
			timerId = setInterval(function(){
				index++;
				ul.style.transition=  'all 0.3s';
				ul.style.transform= 'translateX('+(-index*width)+'px)';
			}, 1000);


		})




	}
	
}