var mainFunction = 
{
	galleryData: [

		{imageUrl 		: "https://images.unsplash.com/photo-1438979315413-de5df30042a1?crop=entropy&fit=crop&fm=jpg&h=360&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=640"},
		{imageUrl 		: "https://images.unsplash.com/photo-1422568374078-27d3842ba676?crop=entropy&fit=crop&fm=jpg&h=360&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=640"},

		{imageUrl 		: "https://images.unsplash.com/photo-1427435150519-42d9bcd0aa81?crop=entropy&fit=crop&fm=jpg&h=360&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=640"},
		{imageUrl 		: "https://images.unsplash.com/photo-1422568374078-27d3842ba676?crop=entropy&fit=crop&fm=jpg&h=360&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=640"}

	],

	elements: {

		oldItem 		: ".old-item",
		newItem 		: ".new-item",
		rightArrow 		: ".arrow-right",
		leftArrow 		: ".arrow-left"

	},

	count 				: 0,
	speed 				: .7,
	KEYBOARD_RIGHT 		: 39,
	KEYBOARD_LEFT 		: 37,
	isAnimate 			: false,

	init: function(){
		mainFunction.createImages();
		mainFunction.clickedSettings();
	},

	createImages: function(){
		$(mainFunction.elements.oldItem).append("<img src='" + mainFunction.galleryData[mainFunction.count].imageUrl + "'>");
		$(mainFunction.elements.newItem).append("<img src='" + mainFunction.galleryData[mainFunction.count + 1].imageUrl + "'>");
	},

	clickedSettings: function(){
		$(mainFunction.elements.rightArrow).on("click", mainFunction.nextImage);
		$(mainFunction.elements.leftArrow).on("click", mainFunction.prevImage);
		$("body").on("keyup", function(e){ if(e.which == mainFunction.KEYBOARD_RIGHT) { mainFunction.nextImage(); } else if(e.which == mainFunction.KEYBOARD_LEFT) { mainFunction.prevImage(); } });
	},

	nextImage: function(){
		var newItem = $(mainFunction.elements.newItem);
		var oldItem = $(mainFunction.elements.oldItem);

		if(!mainFunction.isAnimate)
		{
      console.log(mainFunction.count);
			mainFunction.isAnimate = true;

			TweenMax.to(newItem, mainFunction.speed, {ease: Expo.easeOut, marginLeft:0, onComplete:function(){

				mainFunction.count++;
				mainFunction.count = (mainFunction.count == mainFunction.galleryData.length) ? 0 : mainFunction.count;
				newItem.find("img").attr("src", mainFunction.galleryData[ ( (mainFunction.count == mainFunction.galleryData.length-1) ? 0 : (mainFunction.count+1) ) ].imageUrl);
				oldItem.find("img").attr("src", mainFunction.galleryData[mainFunction.count].imageUrl);
				newItem.css("margin-left", "640px");
				mainFunction.isAnimate = false;
              console.log(mainFunction.count);
				
			}});
		}
	},

	prevImage: function(){
		var newItem = $(mainFunction.elements.newItem);
		var oldItem = $(mainFunction.elements.oldItem);

		if(!mainFunction.isAnimate)
		{
			mainFunction.isAnimate = true;
			mainFunction.count--;
			mainFunction.count = (mainFunction.count < 0) ? (mainFunction.galleryData.length-1) : mainFunction.count;
			newItem.css("margin-left", "0");
			newItem.find("img").attr("src", mainFunction.galleryData[ ( (mainFunction.count == mainFunction.galleryData.length-1) ? 0 : (mainFunction.count+1) ) ].imageUrl);
			oldItem.find("img").attr("src", mainFunction.galleryData[mainFunction.count].imageUrl);
			TweenMax.to(newItem, mainFunction.speed, {ease: Expo.easeOut, marginLeft:640, onComplete:function(){ mainFunction.isAnimate = false; }});
		}
	}
};

$(document).on("ready", mainFunction.init);

