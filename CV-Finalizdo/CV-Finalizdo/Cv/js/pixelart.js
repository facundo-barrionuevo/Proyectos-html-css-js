/*CODIGO PERTENENCIA GRIFF OF THE PROGRAMEISHON DON'T TOUCH THIS MADAFAKA*/

var myPixelDraw = {
	colorPicked: 0,
	cellColor: "#ecf0f1",
	defaultCells: 30,
	coloring: false,
	fns :{
		calcSize: function(cantCeldas){
            if (typeof cantCeldas === 'undefined') {
                cantCeldas = myPixelDraw.defaultCells;
            }
            var cantCeldas = cantCeldas * cantCeldas;
            var container = myPixelDraw.container;
            var containerWidth = container.width();
            container.empty();
            for (i = 0; i < cantCeldas; i++) {
                container.append('<div class="cell" draggable></div>');
            }
            var cell = $('.cell');
            var cellSize = containerWidth / Math.sqrt(cantCeldas);
            cell.width(cellSize);
            cell.height(cellSize);		
        },
		reSize: function(){
			$('#sizeit').on('click', function() {
				var newSize = $('#resize').val();
                if (newSize == 0 || newSize > 50) {
                    alert('Ingrese un numero entre 1 y 50');
                    var newSize = defaultCells;
                } else if (isNaN(newSize)) {
                    alert('Ingresar un numero valido');
                    var newSize = defaultCells;
                }
                myPixelDraw.fns.calcSize(newSize);
			});
		},
		detectMouseUp: function(){
            $(document).on('mouseup', function(elemento) {
                myPixelDraw.coloring = false;
            });
		},
		colorPalette: function(){
            $('#color-pick > *').each(function(a, elemento) {
                var clase = $(elemento).attr('class');
                $(elemento).css('background-color', clase);
            });
		},
		pickColor: function(){
            $('#color-pick > div').on('click', function() {
                myPixelDraw.colorPicked = $(this).attr('class');
                $(this).parent().find('.select').removeClass("select");
                $(this).addClass("select");
            });
		},
		colorIt: function(){
        $(document).on('mousedown', '#container .cell', function(elemento) {
            elemento.preventDefault();
            myPixelDraw.coloring = true;
            if (elemento.button == 2) {
                $(this).css('background-color', myPixelDraw.cellColor);
                return false;
            } else {
                $(this).css('background-color', myPixelDraw.colorPicked);
            }
        });
		},
		colorOnDrag: function(){
            $(document).on('mousemove', function(elemento) {
                if (myPixelDraw.coloring == true) {
                    var x = elemento.clientX;
                    var y = elemento.clientY;
                    var colorDraggedTo = document.elementFromPoint(x, y);
                    if ($(colorDraggedTo).hasClass('cell') && elemento.button != 2) {
                        $(colorDraggedTo).css('background-color', myPixelDraw.colorPicked);
                    } else if ($(colorDraggedTo).hasClass('cell') && elemento.button == 2) {
                        $(colorDraggedTo).css('background-color', myPixelDraw.cellColor);
                    }
                }
            });
		},
		reset: function(){
            $('#reset').on('click', function() {
                $('.cell').css('background-color', myPixelDraw.cellColor);
            });
		},
		toggleBorders: function(){
            $('#toggle-border').on('click', function() {
                $('.cell').toggleClass('no-border');
            });
		},
		disableRightClick: function(){
            myPixelDraw.container.on('contextmenu', function() {
                return false;
            })
		},
		grabImage: function(){
            $('#grab-it').on('click', function(e) {
            var container = document.getElementById('container');
            html2canvas(container,{
                onrendered: function(canvas) {
                    document.body.appendChild(canvas);
                }
            });
            console.log('done!');
        });
		},
	},
	init :function (container){
        myPixelDraw.container = container;
        var fns = myPixelDraw.fns;
        for (var i = 0; i < Object.keys(fns).length; i++) {
            fns[Object.keys(fns)[i]]();
        }
    }
};

$(document).ready(function(){
	var elemento = $('#container');
	myPixelDraw.init(elemento);
});