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