$(function(){
	//to fix dropdown menu
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
var allCategoriesUrl =
  "js/categories_data.json";
var categoriesTitleHtml = "snips/categories_title_snip.html";
var categoryHtml = "snips/categories_snip.html";
var menuItemsUrl = "js/";
// var menuItemsUrl = "js/single_data.json?categories="
var menuItemsTitleHtml="snips/menu_title_snip.html";
var menuItemHtml="snips/menu_item_snip.html";
var json = ".json";
var category_Short = "";
var category_Name = "";
var category_SpecialInstructions ="";
var menu_Categories = [];



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


// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}


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

// load menu categories view

ds.loadMenuCategories = function() {
	showloadingicons("#main-content");
	$ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML);

};


// load the menu items view
// categoryShort is short name for category
ds.loadMenuItems = function(categoryShort,name,special_instructions) {
	showloadingicons('#main-content');
	$ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort + json, buildAndShowMenuItemsHTML);
	category_Short = categoryShort;
  getCategoriesData (menu_Categories,category_Short);
  console.log(category_Name);
  console.log(category_SpecialInstructions);
};




// Builds HTML for the categories page based on the data
// from the server

function buildAndShowCategoriesHTML (categories) {
  menu_Categories = categories;
	// load category title snip
	$ajaxUtils.sendGetRequest(categoriesTitleHtml,
		function (categoriesTitleHtml) {
			//single category snip
			$ajaxUtils.sendGetRequest(categoryHtml,
				function(categoryHtml) {
					var categoriesViewhtml = 
					buildCategoriesViewHtml(categories,
						categoriesTitleHtml,
						categoryHtml);
					insertHTML("#main-content",categoriesViewhtml);
				},false);
		}, false);
}


// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  // console.log(finalHtml);
  return finalHtml;
}


// gets menu categories data

function getCategoriesData (menu_Categories,category_Short){
  for (i=0; i<menu_Categories.length; i++){
    if (menu_Categories[i].short_name==category_Short){
      category_Name = menu_Categories[i].name;
      category_SpecialInstructions = menu_Categories[i].special_instructions;
    }
  }
}


//Builds HTML for the single category page based on
//data from the server

function buildAndShowMenuItemsHTML (categoryMenuItems){

	//load title snippet of menu items page
	$ajaxUtils.sendGetRequest(menuItemsTitleHtml,
		function(menuItemsTitleHtml){

			//withdraw info about single menu item snippet
			$ajaxUtils.sendGetRequest(menuItemHtml,
				function(menuItemHtml){
					var menuItemViewHtml = 
					buildMenuItemsViewHTML(categoryMenuItems,
						menuItemsTitleHtml,menuItemHtml);
					insertHTML("#main-content", menuItemViewHtml);
				},false);
		},false);
}


//using category and menu items data and snippets html
// build menu items view HTML to be inserted into page

function buildMenuItemsViewHTML(categoryMenuItems,menuItemsTitleHtml,menuItemHtml){

	// menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"name",categoryMenuItems.category.name);


	menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"name",category_Name);


	// menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"special_instructions",categoryMenuItems.category.special_instructions);

	menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"special_instructions",category_SpecialInstructions);

  console.log(categoryMenuItems);

	// var finalHtml = menuItemHtml;
	// finalHtml+=menuItemsTitleHtml;
  var finalHtml =menuItemsTitleHtml;
  
	//loop over menu items

	var menuItems = categoryMenuItems.menu_items;
	// var catShortName = categoryMenuItems.category.shortname;
	var catShortName = category_Short;

	for (var i =0; i<menuItems.length; i++){

		//insert  menu item values
		    var html = menuItemHtml;
    	html =
      	insertProperty(html, "short_name", menuItems[i].short_name);
    	html =
      	insertProperty(html,
                     "catShortName",
                     catShortName);
    	html =
      	insertItemPrice(html,
                      "price_small",
                      menuItems[i].price_small);
    	html =
      	insertItemPortionName(html,
                            "small_portion_name",
                            menuItems[i].small_portion_name);
    	html =
      	insertItemPrice(html,
                      "price_large",
                      menuItems[i].price_large);
    	html =
      	insertItemPortionName(html,
                            "large_portion_name",
                            menuItems[i].large_portion_name);
    	html =
      	insertProperty(html,
                     "name",
                     menuItems[i].name);
    	html =
      	insertProperty(html,
                     "description",
                     menuItems[i].description);

	// Add clearfix after every second menu item
    	if (i % 2 != 0) {
     	 html +=
        	"<div class='clearfix visible-lg-block visible-md-block'></div>";
    	}

    	finalHtml += html;
  	}

  	finalHtml += "</section>";
  	return finalHtml;
}


// Appends price with '$' if price exists
function insertItemPrice(html,
                         pricePropName,
                         priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) {
    return insertProperty(html, pricePropName, "");;
  }

  priceValue = priceValue.toFixed(2);
  html = insertProperty(html, pricePropName, priceValue);
  return html;
}


// Appends portion name in parens if it exists
function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProperty(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
}








global.$ds = ds;
})(window);