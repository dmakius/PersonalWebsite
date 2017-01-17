$('#memeCanvas').ready(function(){
			var WIDTH = 650, HEIGHT = 500;
			var canvas = document.getElementById("memeCanvas");
			var ctx = canvas.getContext('2d');
			var mirror = document.getElementById('mirror');
		
			canvas.height = 450;
			canvas.width = 600;

			var fontSize = 24, fontColor = "Orange";

			//cordiates for the text boxes 
			var xTop = 20, yTop = 50;
			var xBottom = 20, yBottom = 425;
			var topLine = "", bottomLine = "";
			var fImage = new Image();
			fImage.ImageUtils.crossOrigin = "";		
			fImage.src = 'https://dl.dropboxusercontent.com/1/view/z4w7bxbstdzbqar/Apps/DanielMakover-PersonalWebsite/medium/35_DE.jpg';

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

			function drawCanvas(){
				ctx.clearRect(0,0,HEIGHT, WIDTH);
				ctx.drawImage(fImage, 0,0, fImage.width, fImage.height, 0, 0, canvas.width, canvas.height);
				ctx.fillStyle = fontColor;
				ctx.font = "bold " + fontSize+ "px Arial" ;
				ctx.fillText(topLine , xTop, yTop);
				ctx.fillText(bottomLine , xBottom, yBottom);
				console.log(fImage.src);
			}

			function drawReadyCanvas(){
				for(var i = 0; i < 3; i ++){
					drawCanvas();
				}
			}
			
			$('#tLine').on('keyup',function(){topLine = $(this).val();drawReadyCanvas();});
			$('#bLine').on('keyup',function(){bottomLine = $(this).val();drawReadyCanvas();});

			//highliting the thumbnials
			$('.scroller ul li img').on('click', this ,function(){
				//console.log(this.src);
				$("img").removeClass("selected");
				$(this).addClass("selected");
				fImage.src = this.src;
				fImage.ImageUtils.crossOrigin = "";		
				drawReadyCanvas();
			});

			$('#fileName').on('keyup', function(){
				memeN = $(this).val();
				$('#memeName').val(memeN); 
			});
			
			$('select').change(function(){fontSize = this.value;drawReadyCanvas();});
			
			//move the picture rollbar
			$('#lArrow').on("click", function(){
				$('#scroller').animate({marginLeft: scrollerMargin += 155}, "slow");
			});

			$('#rArrow').on("click", function(){
				$('#scroller').animate({marginLeft: scrollerMargin -= 155}, "slow");
			});

			//moving top text box
			$('#tMoveRight').click(function(){xTop += 5;drawReadyCanvas();});
			$('#tMoveLeft').click(function(){xTop -= 5;drawReadyCanvas();});
			$('#tMoveUp').click(function(){yTop -= 5;drawReadyCanvas();});
			$('#tMoveDown').click(function(){yTop += 5;drawReadyCanvas();});

			//moving bottom text box
			$('#bMoveDown').click(function(){yBottom += 5;drawReadyCanvas();});
			$('#bMoveUp').click(function(){yBottom -= 5;drawReadyCanvas();});
			$('#bMoveLeft').click(function(){xBottom -= 5;drawReadyCanvas();});
			$('#bMoveRight').click(function(){xBottom += 5;drawReadyCanvas();});

			//selecting Color
			$('.radioColor').click(function(){
				if($('#colorO').is(':checked')){fontColor = "Orange"; drawReadyCanvas();}
				if($('#colorR').is(':checked')){fontColor = "Red";drawReadyCanvas();}
				if($('#colorG').is(':checked')){fontColor = "Green";drawReadyCanvas();}
				if($('#colorW').is(':checked')){fontColor = "White";drawReadyCanvas();}
			});
			drawReadyCanvas();
});