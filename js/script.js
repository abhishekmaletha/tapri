$(function(){
	$("#navbartoggle").blur(function(event){

		var screenwidth=window.innerWidth;
		if(screenwidth<768){

			$("#collapsable-nav").collapse('hide');
		}
	});
	
	$("#navbartoggle").click(function(event){
		$(event.target).focus();
	});
});

(function(global){
var ds = {};
var homehtml = "snips/home_snip.html";
// function to insert innerHTML
var insertHTML = function(selector,html){
	var target = document.querySelector(selector);
	target.innerHTML = html;
};

// function to show loading icons 

var showloadingicons = function(selector){
	var html = "<div class='text-center'>";
	html+="<img src = 'images/img_load.gif'></div>";
	insertHTML(selector,html);
};

// on page load

document.addEventListener("DOMContentLoaded",function(event){

//on first laod show home view
showloadingicons("#main-content");
$ajaxUtils.sendGetRequest(homehtml, 
	function(responseText){
	document.querySelector("#main-content").innerHTML = responseText;
},
false);
});

global.$ds = ds;
})(window);