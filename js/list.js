/*
* @Author: Administrator
* @Date:   2017-10-14 12:46:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-17 11:32:41
*/
window.onload = function(){
	tapMove();
	function tapMove(){
		//思路：手指移动多少，左栏移动多少
		//
		//获取相关元素
		var leftPart = document.querySelector('.main_left ul');
		var liArr = document.querySelectorAll('.main_left ul li');
		var liHeight = document.querySelector('.main_left ul li').offsetHeight;
		var ulHeight = leftPart.offsetHeight;
		//ul移动的范围
		var minRange = document.querySelector('.main_left').offsetHeight - document.querySelector('.header').offsetHeight - ulHeight;
		var maxRange = 0;
		//上下允许可伸缩距离
		var delayDistance = 100;
		var startY = 0;
		var moveY = 0;
		var totalY = 0;

		//重复的代码进行封装
		var startTransition = function(){
				leftPart.style.transition = 'all .5s';
		}
		var endTransition = function(){
			leftPart.style.transition = '';
		}
        var setTransform = function(distance){
        	leftPart.style.transform = 'translateY('+distance+'px)';
        }
        //
		leftPart.addEventListener('touchstart',function(event){
			startY = event.touches[0].clientY;
		});
		leftPart.addEventListener('touchmove',function(event){
			endTransition();
			moveY = event.touches[0].clientY - startY;
			if((totalY+moveY)>(maxRange+delayDistance)){
				moveY =0;
				totalY = maxRange + delayDistance;
			}else if((totalY+moveY)<(minRange-delayDistance)) {
				moveY =0;
				totalY = minRange - delayDistance;
			}

			setTransform(totalY+moveY);
		});
		leftPart.addEventListener('touchend',function(event){
			startTransition();
			totalY += moveY;
			if(totalY>maxRange){
				totalY = maxRange;
			}else if(totalY<minRange){
				totalY = minRange;
			}
			setTransform(totalY);
		});


		//第二大部分逻辑点击跳转
		
		//给给个li绑定data-index属性
		for(var i=0;i<liArr.length;i++){
			liArr[i].dataset['index'] = i;
		}
		fox_tap(leftPart,function(e){
			// console.log(e);
			var index = e.target.parentNode.dataset['index'];
			//点亮当前li标签
			for(var i=0;i<liArr.length;i++){
				liArr[i].className = '';
			}
			e.target.parentNode.className = 'current';
			//
			startTransition();
			var moveDistance = index*liHeight*-1;
			if(moveDistance>maxRange){
				moveDistance = maxRange;
			}else if(moveDistance<minRange) {
				moveDistance =minRange;
			}
			setTransform(moveDistance);
		})

	}

}