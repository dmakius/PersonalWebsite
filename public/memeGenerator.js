$('#memeCanvas').ready(function(){
			var WIDTH = 650, HEIGHT = 500;
			var canvas = document.getElementById("memeCanvas");
			var ctx = canvas.getContext('2d');
			var mirror = document.getElementById('mirror');
		
			canvas.height = 450;
			canvas.width = 600;

			var fontSize = 12, fontColor = "Orange";

			//cordiates for the text boxes 
			var xTop = 20, yTop = 50;
			var xBottom = 20, yBottom = 425;
			var fImage = new Image();
			var topLine = "", bottomLine = "";
		
			fImage.setAttribute('crossOrigin', 'anonymous');
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
			}
			
			$('#tLine').on('keyup',function(){topLine = $(this).val();drawCanvas();});
			$('#bLine').on('keyup',function(){bottomLine = $(this).val();drawCanvas();});

			//highliting the thumbnials
			$('.scroller ul li img').on('click', this ,function(){
				alert("pic selected");
				console.log(this.src);
				$("img").removeClass("selected");
				$(this).addClass("selected");
				fImage.src = this.src;
				drawCanvas();
			});

			$('#fileName').on('keyup', function(){
				memeN = $(this).val();
				$('#memeName').val(memeN); 
			});
			
			$('select').change(function(){fontSize = this.value;drawCanvas();});
			
			//move the picture rollbar
			$('#lArrow').on("click", function(){
				$('#scroller').animate({marginLeft: scrollerMargin += 155}, "slow");
			});

			$('#rArrow').on("click", function(){
				$('#scroller').animate({marginLeft: scrollerMargin -= 155}, "slow");
			});

			//moving top text box
			$('#tMoveRight').click(function(){xTop += 5;drawCanvas();});
			$('#tMoveLeft').click(function(){xTop -= 5;drawCanvas();});
			$('#tMoveUp').click(function(){yTop -= 5;drawCanvas();});
			$('#tMoveDown').click(function(){yTop += 5;drawCanvas();});

			//moving bottom text box
			$('#bMoveDown').click(function(){yBottom += 5;drawCanvas();});
			$('#bMoveUp').click(function(){yBottom -= 5;drawCanvas();});
			$('#bMoveLeft').click(function(){xBottom -= 5;drawCanvas();});
			$('#bMoveRight').click(function(){xBottom += 5;drawCanvas();});

			//selecting Color
			$('.radioColor').click(function(){
				if($('#colorO').is(':checked')){fontColor = "Orange"; drawCanvas();}
				if($('#colorR').is(':checked')){fontColor = "Red";drawCanvas();}
				if($('#colorG').is(':checked')){fontColor = "Green";drawCanvas();}
				if($('#colorW').is(':checked')){fontColor = "White";drawCanvas();}
			});
			drawCanvas();
});