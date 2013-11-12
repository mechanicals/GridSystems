(function ($) {
	var flag = true;
	var newFlag = true;
	var accFlag  = true;
		
	var  thisWidget;
	var widgetParent;
	
	$(".resize, .close").click(function(event){
		event.stopPropagation();
	});
	
	$(".close").mousedown(function(event) {
		event.stopPropagation();
	}).mouseup(function(event){
		event.stopPropagation();
		$(".mask, .popUp").show();
		widgetParent = $(this).parents(".sec");
		thisWidget = $(this);
	});
	
	$("#ok").click(function(){
		thisWidget.parent().parent().remove();
		$(".mask, .popUp").hide();
		if(!flag){
			$(".sec,.widget").show();
			widgetParent.css("width","33.333333333333333333%");
		}
		accFlag = true;
	});
		
	$("#cancel").click(function(){
		$(".mask, .popUp").hide();
	});
	
	$(".resize").mousedown(function(event) {
		event.stopPropagation();
	}).mouseup(function(event){
		event.stopPropagation();
		var itself = $(this).parents(".widget");
		var itsParent = $(this).parents(".sec");
		if(flag){
			$(".sec,.widget").not(itself).not(itsParent).hide();
			itsParent.css("width","100%");
			flag = false;
			accFlag = false;
		}else{
			$(".sec,.widget").show();
			itsParent.css("width","33.333333333333333333%");
			flag = true;
			accFlag = true;
		}
	});
	
    $.fn.ithoughtworks = function(elemCollection) {
		
		var headerHandle = $(".headerSec");
		elemCollection = $.extend({handle: headerHandle, cursor: "move", draggableClass: "draggable", activeHandleClass: "active-handle"}, elemCollection);
		
        var $selected = null;
        var $elements = this.find(elemCollection.handle);
	
		var math;
        $elements.css('cursor', elemCollection.cursor).on("mousedown", function(e) {
			e.stopPropagation();
			if(!accFlag){
				return false;
			}
			$selected = $(this).parent();
			$selected.addClass(elemCollection.draggableClass).find(elemCollection.handle).addClass(elemCollection.activeHandleClass);
            var drg_h = $selected.outerHeight(),
                drg_w = $selected.outerWidth(),
                pos_y = $selected.offset().top + drg_h - e.pageY,
                pos_x = $selected.offset().left + drg_w - e.pageX,
				dragElemHt = $selected.height() ;
				
				var startingTop = e.pageY,
					startingLeft = e.pageX;
            $(document).on("mousemove", function(e) {
				math = Math.round(Math.sqrt(Math.pow(startingTop - e.clientY, 2) + Math.pow(startingLeft - e.clientX, 2))) ;
				
				var sec1LtPos = $(".sec1").offset().left,
					sec2LtPos = $(".sec2").offset().left,
					sec3LtPos = $(".sec3").offset().left,
					sec3RtPos = $(".sec3").offset().left + $(".sec3").width(),
					secTopPos = $(".sec1").offset().top;
					
				var curPosX = e.pageX,
					curPosY = e.pageY,
					topCheck = (curPosY>=secTopPos);
					
				$(".dummy").css("height",dragElemHt).insertBefore($selected).show();

				$selected.css("position","absolute");
				$selected.offset({
					top: e.pageY + pos_y - drg_h,
					left: e.pageX + pos_x - drg_w
				});

				if(topCheck && math>60){
					if(curPosX<=sec2LtPos){
						var curSec = $(".sec1");
						var topPosition = abc(curSec, secTopPos, $selected);
						var topElem = curSec.children();
						
						topPosition = jQuery.grep(topPosition, function(n){
						  return (typeof n != "undefined" );
						});
						
						var topElemArr = new Array();
						for(i=0;i<topElem.length;i++){
							topElemArr[i] = topElem.eq(i);
						}
						
						topElemArr = jQuery.grep(topElemArr, function(y){
						  return (!(y.hasClass("draggable")));
						});
					
						for(j=0;j<topElem.length;j++){
			
							if(curPosY >= topPosition[j] && curPosY < topPosition[j+1]){
								if(startingTop<curPosY && startingLeft<sec2LtPos && curPosX<sec2LtPos){
									$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j+1]).show();
								}
								else{
									$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j]).show();
								}
							}
							else if(curPosY >= topPosition[j]){
								$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j]).show();
							}
						}
					}
					else if(sec2LtPos<curPosX && curPosX<sec3LtPos){
						var curSec = $(".sec2");
						var topPosition = abc(curSec, secTopPos);
						var topElem = curSec.children();
						
						topPosition = jQuery.grep(topPosition, function(n){
						  return (typeof n != "undefined" );
						});
						
						var topElemArr = new Array();
						for(i=0;i<topElem.length;i++){
							topElemArr[i] = topElem.eq(i);
						}
						
						topElemArr = jQuery.grep(topElemArr, function(y){
						  return (!(y.hasClass("draggable")));
						});
					
						for(j=0;j<topElem.length;j++){
			
							if(curPosY >= topPosition[j] && curPosY < topPosition[j+1]){
								if(startingTop<curPosY && startingLeft>sec2LtPos && startingLeft<sec3LtPos && curPosX<sec3LtPos){
									$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j+1]).show();
								}
								else{
									$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j]).show();
								}
							}
							else if(curPosY >= topPosition[j]){
								$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j]).show();
							}
						}
					}
					else if(curPosX >= sec3LtPos){
						var curSec = $(".sec3");
						var topPosition = abc(curSec, secTopPos);
						var topElem = curSec.children();
						
						topPosition = jQuery.grep(topPosition, function(n){
						  return (typeof n != "undefined" );
						});
						
						var topElemArr = new Array();
						for(i=0;i<topElem.length;i++){
							topElemArr[i] = topElem.eq(i);
						}
						
						topElemArr = jQuery.grep(topElemArr, function(y){
						  return (!(y.hasClass("draggable")));
						});
					
						for(j=0;j<topElem.length;j++){
			
							if(curPosY >= topPosition[j] && curPosY < topPosition[j+1]){
								if(startingTop<curPosY && startingLeft>sec3LtPos && curPosX<sec3RtPos){
									$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j+1]).show();
								}
								else{
									$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j]).show();
								}
							}
							else if(curPosY >= topPosition[j]){
								$(".dummy").css("height",dragElemHt).insertBefore(topElemArr[j]).show();
							}
						}
					}
				}
				newFlag = false;
				
            }).on("mouseup", function() {
                $(this).off("mousemove");
                if ($selected !== null) {
                    $selected.removeClass(elemCollection.draggableClass);
                    $selected = null;
                }
			});
            e.preventDefault();
        }).on("mouseup", function(e) {
			
			if(!newFlag){
				$selected.removeClass(elemCollection.draggableClass).find(elemCollection.handle).removeClass(elemCollection.activeHandleClass);
				if(math>20){
					$selected.insertBefore(".dummy");
				}
				$selected.css({"position":"relative","left":"0","top":"0"});
				
				$(".dummy").hide();
				$selected  = null;
				newFlag = true;					
			}else{
				var widgetHead = $(this);
				widgetHead.parent().children().not(widgetHead).slideToggle();
			}
        });

        return this;

    };
	
	function abc(currentSec, topPos, selectedWidget){
		var childs = currentSec.children();
		childHeight = new Array();
		childTopPos = new Array();
		
		for(i=0;i<childs.length;i++){
			var classCheck = childs.eq(i).hasClass('draggable');
			if(i==0 && !classCheck){
				childTopPos[i] = childs.eq(i).offset().top = topPos;
			}else if(!classCheck){
				childTopPos[i] = childs.eq(i).offset().top;
			}
			
		}
		return childTopPos;
	};
	$('div .widget').ithoughtworks();
})(jQuery);