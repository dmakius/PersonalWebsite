$('#memeCanvas').ready(function(){
			var WIDTH = 650, HEIGHT = 500;
			var canvas = document.getElementById("memeCanvas");
			var ctx = canvas.getContext('2d');
			var mirror = document.getElementById('mirror');
		
			canvas.height = 450;
			canvas.width = 600;

			var fontSize = 30, fontColor = "Orange";

			//cordiates for the text boxes 
			var xTop = 20, yTop = 50;
			var xBottom = 20, yBottom = 425;
			var topLine = "", bottomLine = "";
			
			var memeData;

			var mainImage = new Image();
			mainImage.src = "";
			mainImage.crossOrigin = 'Anonymous';
			
			var scrollerMargin = 0;
			
			

			function download() {
				memeName = document.getElementById("fileName").value;
				if(memeName){
					document.getElementById("downloadLnk").download = memeName + ".png"
	   				var dt = canvas.toDataURL('image/png');
	   				this.href = dt;
	   				file = document.getElementById("downloadLnk");
   				}else{
   					alert("Please Enter a filename to download the meme");
   				}
			};
			
			 downloadLnk.addEventListener('click', download, false);

			function drawCanvas(image){
				ctx.clearRect(0,0,HEIGHT, WIDTH);
				// putImageData(ctx, memeData, 0,0);
				ctx.drawImage(image, 0,0, image.width, image.height, 0, 0, canvas.width, canvas.height);
				ctx.fillStyle = fontColor;
				ctx.font = "bold " + fontSize+ "px Arial" ;
				ctx.fillText(topLine , xTop, yTop);
				ctx.fillText(bottomLine , xBottom, yBottom);
				// console.log("IMAGE LOCATION: " + image.src);
			}
			
			$('#tLine').on('keyup',function(){topLine = $(this).val();drawCanvas(mainImage)});
			$('#bLine').on('keyup',function(){bottomLine = $(this).val();drawCanvas(mainImage);});

			//highliting the thumbnials
			$('.scroller ul li img').on('click', this ,function(){
				$("img").removeClass("selected");
				$(this).addClass("selected");
				
				var nImage = new Image();
				nImage.src = this.src + "?dl=1"; //the start up image
				
				mainImage.src = this.src + "?dl=1"; //the 'global' image
				
				nImage.crossOrigin = 'Anonymous'; 
				nImage.addEventListener("load", function() {
   					drawCanvas(nImage);
   					//var imgData = ctx.getImageData(0,0, 450, 600);
   					//console.log(imgData);
				}, false);

			});

			$('#fileName').on('keyup', function(){
				memeN = $(this).val();
				$('#memeName').val(memeN); 
			});
			
			//changing font size
			$('select').change(function(){fontSize = this.value; drawCanvas(mainImage);});
			
			//moving top text box
			$('#tMoveRight').click(function(){xTop += 5; drawCanvas(mainImage);});
			$('#tMoveLeft').click(function(){xTop -= 5; drawCanvas(mainImage);});
			$('#tMoveUp').click(function(){yTop -= 5; drawCanvas(mainImage);});
			$('#tMoveDown').click(function(){yTop += 5; drawCanvas(mainImage);});

			//moving bottom text box
			$('#bMoveDown').click(function(){yBottom += 5; drawCanvas(mainImage);});
			$('#bMoveUp').click(function(){yBottom -= 5; drawCanvas(mainImage);});
			$('#bMoveLeft').click(function(){xBottom -= 5; drawCanvas(mainImage);});
			$('#bMoveRight').click(function(){xBottom += 5; drawCanvas(mainImage);});

			//selecting Color
			$('.radioColor').click(function(){
				if($('#colorO').is(':checked')){fontColor = "Orange"; drawCanvas(mainImage);}
				if($('#colorR').is(':checked')){fontColor = "Red"; drawCanvas(mainImage);}
				if($('#colorG').is(':checked')){fontColor = "Green"; drawCanvas(mainImage);}
				if($('#colorW').is(':checked')){fontColor = "White"; drawCanvas(mainImage);}
			});

			//move the picture rollbar
			$('#lArrow').on("click", function(){
				$('#scroller').animate({marginLeft: scrollerMargin += 155}, "slow");
			});

			$('#rArrow').on("click", function(){
				$('#scroller').animate({marginLeft: scrollerMargin -= 155}, "slow");
			});
});