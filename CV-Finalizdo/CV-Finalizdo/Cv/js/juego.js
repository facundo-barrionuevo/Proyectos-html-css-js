/*ADVERTENCIA: Codigo de pertenencia manija, no repollo porfa*/


/*Creacion del objeto*/
var juego = {
	filas:[[],[],[]],
	espacioVacio:{
		fila:2,
		columna:2
	},
	iniciar:function(elemento){
		this.instalarPiezas(elemento);
		this.mezclarFichas(50);
		this.capturarTeclas();
	},
	/*Funcocion que instala cada pieza en su lugar*/
	instalarPiezas(juegoEl){
		var counter = 1;
		for (var fila = 0; fila < 3; fila++) {
			for (var columna = 0; columna < 3; columna++) {
				if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna){
					this.filas[fila][columna] = null;
				}else{
					var pieza = this.crearPieza(counter++,fila,columna);
					juegoEl.append(pieza.el);
					this.filas[fila][columna] = pieza;
				}
			}
		}

		return juegoEl;
	},
	/*Funcion que crea cada una de las piezas*/
	crearPieza(numero,fila,columna){
		var nuevoElemento = $('<div>');
		nuevoElemento.addClass('pieza');

		nuevoElemento.css({
			backgroundImage:'url(piezas/'+ numero + '.jpg)',
			top: fila*200,
			left: columna*200
		});

		return{
			el:nuevoElemento,
			numero:numero,
			filaInicial:fila,
			columnaInicial: columna,
		};
	},
	/*Funcion que llama al procedimiento de intercambiar las posiciones*/
	moverHaciaAbajo(){
		var filaOrigen = this.espacioVacio.fila-1;
		var columnaOrigen = this.espacioVacio.columna;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
	},
	/*Funcion que llama al procedimiento de intercambiar las posiciones*/
	moverHaciaArriba(){
		var filaOrigen = this.espacioVacio.fila+1;
		var columnaOrigen = this.espacioVacio.columna;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);

	},
	/*Funcion que llama al procedimiento de intercambiar las posiciones*/
	moverHaciaLaDerecha(){
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna+1;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
	},
	/*Funcion que llama al procedimiento de intercambiar las posiciones*/
	moverHaciaLaIzquierda(){
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna-1;

		this.intercambiarPosicionConEspacioVacio(filaOrigen,columnaOrigen);
	},
	/*Funcion que captura que tecla fue precionada y llama a la funcion de su tecla correspondiente*/
	capturarTeclas(){
		var that = this;
		$(document).keydown(function(evento){
			switch(evento.which){
				case 40: that.moverHaciaAbajo();

				break;
				case 38: that.moverHaciaArriba();

				break;
				case 37: that.moverHaciaLaDerecha();

				break;
				case 39:that.moverHaciaLaIzquierda();

				break;

				default: return;
			}

			evento.preventDefault();
			that.chequearSiGano();
		});
	},
	/*Funcion que mueve el div de lugar*/
	moverFichaFilaColumna(ficha,fila,columna){
		ficha.el.css({
			top: fila*200,
			left: columna*200
		})
	},
	/*Funcion que guarda la posicion de donde esta el espacio vacio*/
	guardarEspacioVacio(fila,columna){
		this.espacioVacio.fila = fila;
		this.espacioVacio.columna = columna;

		this.filas[fila][columna] = null;
	},
	/*Funcion que intercambia de lugar la pieza y el espacio vacio*/
	intercambiarPosicionConEspacioVacio(fila,columna){
		var ficha = this.filas[fila] && this.filas[fila][columna];
		if(ficha){
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
			this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
			this.guardarEspacioVacio(fila,columna);
		}
	},
	/*Luego de cada movimiento chequea si gano, verificando que cada pieza este en su lugar*/
	chequearSiGano(){
		for(var f = 0; f < this.filas.length; f++){
			for(var c = 0; c < this.filas.length; c++){
				var ficha = this.filas[f][c];
				if(ficha && !(ficha.filaInicial== f && ficha.columnaInicial == c)){
					return false;
				}
			}
		}
		return alert('Ganaste!!!');
	},
	/*Funcion que mezcla las fichas mediante un numero random de posicion*/
	mezclarFichas(veces){
		if(veces <= 0){
			return;
		}

		var that = this;
		var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];
		var numeroRamdom = Math.floor(Math.random()*4);
		var nombreDeFuncion = funciones[numeroRamdom];
		this[nombreDeFuncion]();

		setTimeout(function(){
			that.mezclarFichas(veces-1);
		},10);
	}

};
/*arranca el juego*/
$(function(){
	var elemento = $('#juego');
	juego.iniciar(elemento);
})

