$('#memeCanvas').ready(function(){
			var WIDTH = 650, HEIGHT = 500;
			var canvas = document.getElementById("memeCanvas");
			var ctx = canvas.getContext('2d');
			var mirror = document.getElementById('mirror');
		
			canvas.height = 450;
			canvas.width = 600;

			var fontSize = 30, fontColor = "White";

			//cordiates for the text boxes 
			var xTop = 20, yTop = 50;
			var xBottom = 20, yBottom = 425;
			var topLine = "", bottomLine = "";
			
			var memeData;

			var mainImage = new Image();
			mainImage.src = "";
			mainImage.crossOrigin = 'Anonymous';
			
			var scrollerMargin = 0;
			initCanvas();
			
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
			 function initCanvas(){
			 	console.log("Init canvas");
				ctx.font = "bold " + fontSize+ "px Arial";
 			 	ctx.fillStyle = fontColor;
 			 	ctx.strokeStyle = 'black';
 			 	ctx.textAlign="center";
    			ctx.lineWidth = 2;
    			var sampleText = "Please select an image"
    			ctx.strokeText(sampleText, canvas.width / 2, canvas.height / 2);
				ctx.fillText(sampleText , 200, 200);
			 }


			function drawCanvas(image){
				ctx.clearRect(0,0,HEIGHT, WIDTH);
				ctx.drawImage(image, 0,0, image.width, image.height, 0, 0, canvas.width, canvas.height);
				ctx.font = "bold " + fontSize+ "px Arial";
 			 	ctx.fillStyle = fontColor;
 			 	ctx.textAlign="left";
 			 	ctx.strokeStyle = 'black';
    			ctx.lineWidth = 6;

    			ctx.strokeText(topLine, xTop, yTop);
				ctx.fillText(topLine , xTop, yTop);

				ctx.strokeText(bottomLine, xBottom, yBottom);
				ctx.fillText(bottomLine , xBottom, yBottom);


			}
			
			$('#tLine').on('keyup',function(){topLine = $(this).val();drawCanvas(mainImage)});
			$('#bLine').on('keyup',function(){bottomLine = $(this).val();drawCanvas(mainImage);});

			//highliting the thumbnials
			$("#slider1 ul li img").on("click", function(){
				$("img").removeClass("selected");
				$(this).addClass("selected");
			
				mainImage.src = this.src + "?dl=1"; 
				mainImage.addEventListener("load", function(){
					drawCanvas(mainImage);
					console.log("mainImage:" + mainImage.src);

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