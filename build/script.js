// LET
let tablero = $(window).width() > 570 ? 300 : 150;
$(window).resize(function(){
	let anchoVentana = $(window).width();
	if ( anchoVentana > 570 && tablero !== 300 ) {
		tablero = 300;
	} else if ( anchoVentana < 570 && tablero !== 150 ) {
		tablero = 150;
	}
})

// CONSTS 
const casillas = 10,
dimension = Number(tablero/casillas),
columnas = Number(tablero/10),
filas = Number(tablero/10),
tablonPiezas = Number(tablero/2),
columnas5x5 = Number(tablonPiezas/5),
fila5x5 = Number(tablonPiezas/5),
colorArray = [
	'#D40424',
	'#E9F0F7',
	'#AEC5D6',
	'#223040',
	'#101D29',
],
colores = ['purple','red','green','blue','yellow','brown','pink','orange','lightgreen'],	
posicionesPieza = [
	[0,0],[fila5x5,0],[fila5x5*2,0],[fila5x5*3,0],[fila5x5*4,0],
	[0,columnas5x5],[fila5x5,columnas5x5],[fila5x5*2,columnas5x5],[fila5x5*3,columnas5x5],[fila5x5*4,columnas5x5],
	[0,columnas5x5*2],[fila5x5,columnas5x5*2],[fila5x5*2,columnas5x5*2],[fila5x5*3,columnas5x5*2],[fila5x5*4,columnas5x5*2],
	[0,columnas5x5*3],[fila5x5,columnas5x5*3],[fila5x5*2,columnas5x5*3],[fila5x5*3,columnas5x5*3],[fila5x5*4,columnas5x5*3],
	[0,columnas5x5*4],[fila5x5,columnas5x5*4],[fila5x5*2,columnas5x5*4],[fila5x5*3,columnas5x5*4],[fila5x5*4,columnas5x5*4]
],
posicionesTablero = [
	[[0,0],[filas,0],[filas*2,0],[filas*3,0],[filas*4,0],[filas*5,0],[filas*6,0],[filas*7,0],[filas*8,0],[filas*9,0]],
	[[0,columnas],[filas,columnas],[filas*2,columnas],[filas*3,columnas],[filas*4,columnas],[filas*5,columnas],[filas*6,columnas],[filas*7,columnas],[filas*8,columnas],[filas*9,columnas]],
	[[0,columnas*2],[filas,columnas*2],[filas*2,columnas*2],[filas*3,columnas*2],[filas*4,columnas*2],[filas*5,columnas*2],[filas*6,columnas*2],[filas*7,columnas*2],[filas*8,columnas*2],[filas*9,columnas*2]],
	[[0,columnas*3],[filas,columnas*3],[filas*2,columnas*3],[filas*3,columnas*3],[filas*4,columnas*3],[filas*5,columnas*3],[filas*6,columnas*3],[filas*7,columnas*3],[filas*8,columnas*3],[filas*9,columnas*3]],
	[[0,columnas*4],[filas,columnas*4],[filas*2,columnas*4],[filas*3,columnas*4],[filas*4,columnas*4],[filas*5,columnas*4],[filas*6,columnas*4],[filas*7,columnas*4],[filas*8,columnas*4],[filas*9,columnas*4]],
	[[0,columnas*5],[filas,columnas*5],[filas*2,columnas*5],[filas*3,columnas*5],[filas*4,columnas*5],[filas*5,columnas*5],[filas*6,columnas*5],[filas*7,columnas*5],[filas*8,columnas*5],[filas*9,columnas*5]],
	[[0,columnas*6],[filas,columnas*6],[filas*2,columnas*6],[filas*3,columnas*6],[filas*4,columnas*6],[filas*5,columnas*6],[filas*6,columnas*6],[filas*7,columnas*6],[filas*8,columnas*6],[filas*9,columnas*6]],
	[[0,columnas*7],[filas,columnas*7],[filas*2,columnas*7],[filas*3,columnas*7],[filas*4,columnas*7],[filas*5,columnas*7],[filas*6,columnas*7],[filas*7,columnas*7],[filas*8,columnas*7],[filas*9,columnas*7]],
	[[0,columnas*8],[filas,columnas*8],[filas*2,columnas*8],[filas*3,columnas*8],[filas*4,columnas*8],[filas*5,columnas*8],[filas*6,columnas*8],[filas*7,columnas*8],[filas*8,columnas*8],[filas*9,columnas*8]],
	[[0,columnas*9],[filas,columnas*9],[filas*2,columnas*9],[filas*3,columnas*9],[filas*4,columnas*9],[filas*5,columnas*9],[filas*6,columnas*9],[filas*7,columnas*9],[filas*8,columnas*9],[filas*9,columnas*9]]
],
matrizRotacion = [
	[
		20,15,10,5,0,
		21,16,11,6,1,
		22,17,12,7,2,
		23,18,13,8,3,
		24,19,14,8,4
	],
	[	24,23,22,21,20,
		19,18,17,16,15,
		14,13,12,11,10,
		9,8,7,6,5,
		4,3,2,1,0
	],
	[	4,9,14,19,24,
		3,8,13,18,23,
		2,7,12,17,22,
		1,6,11,16,21,
		0,5,10,15,20
	]
],
tipo = [
	[6,11,16,17,18],           // L
	[7,12],					   // Small I
	[12],					   // One unit square
	[10,11,12,13,14],		   // Big horitzontal line
	[11,12,13],				   // Small horitzontal line
	[6,7,11,12],	           // Small square
	[7,12,17,22],			   // Big I
	[6,7,8,11,12,13,16,17,18], // Big square
	[6,7,11]				   // Inverted L
];
			
/* 	   PIECES MATRIX
	0   1   2   3	4
	5	6	7	8	9
	10	11	12	13	14
	15	16	17	18	19
	20	21	22	23	24
*/	

//VARS
var puntuacion = 0,
gameOver = false,
sonidoPieza = null,
sonidoRomper = null,
imposible1 = false,
imposible2 = false,
imposible3 = false,
resetPieza = false,
haTocado1 = false, haTocado2 = false, haTocado3 = false, // To know which piece is selected
vaciasTodas = true, // Variable para saber si las tres piezas se han colocado
vacia1 = true, // To know if piece number 1 was placed
vacia2 = true, // To know if piece number 2 was placed
vacia3 = true, // To know if piece number 3 was placed
pieza1C = null,
pieza2C = null,
pieza3C = null,
MatrizTablero = [];


// Where the magic begins
function prepararTablero(){
	InicializarMatrices();
	tableroInicial();
	tableroPiezas('pieza1');
	tableroPiezas('pieza2');
	tableroPiezas('pieza3');
	Piezas();
	sonidoPieza = new sound("sounds/colocar1.mp3");
	sonidoRomper = new sound("sounds/romper2.mp3");
	document.querySelector('#puntos').innerHTML = puntuacion;
}

function actualizarPuntuacion(){
	document.querySelector('#puntos').innerHTML = `<strong>`+ puntuacion + `</strong>`;
}

function tableroInicial(){
	let cvs = document.querySelector('#cv1');
	cvs.width = tablero;
	cvs.height = tablero;
	ctx = cvs.getContext('2d');
	ctx.font = '20px Arial';
	ctx.textAlign = 'center';
	ctx.strokeStyle = "black";
	for(var i = 0; i<casillas; i++){
		for(var j = 0; j<casillas; j++){
			if(MatrizTablero[i][j][0] != 0){
				ctx.fillStyle = MatrizTablero[i][j][1];
				ctx.strokeRect(i*dimension, j*dimension, dimension, dimension);
				ctx.rect(i*dimension, j*dimension, dimension, dimension);
				ctx.fillRect(i*dimension, j*dimension, dimension, dimension);
			}
			else{
				ctx.fillStyle = '#20B2AA';
				ctx.strokeRect(i*dimension, j*dimension, dimension, dimension);
				ctx.rect(i*dimension, j*dimension, dimension, dimension);
				ctx.fillRect(i*dimension, j*dimension, dimension, dimension);
			}
		}
	}
	ctx.stroke();
}

function redrawTablero(){
	let cvs = document.querySelector('#cv1');
	ctx = cvs.getContext('2d');
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	for(var i = 0; i<casillas; i++){
		for(var j = 0; j<casillas; j++){
			if(MatrizTablero[i][j][0] !=0){
				ctx.fillStyle = MatrizTablero[i][j][1];
				ctx.strokeRect(i*dimension, j*dimension, dimension, dimension);
				ctx.fillRect(i*dimension, j*dimension, dimension, dimension);
			}
			else{
				ctx.fillStyle = '#20B2AA';
				ctx.strokeRect(i*dimension, j*dimension, dimension, dimension);
				ctx.fillRect(i*dimension, j*dimension, dimension, dimension);
			}
		}
	}
	ctx.stroke();
}

function comprobarOcupada(fila,columna,pieza,auxFila,auxColumna){
	var ocupada = false;
	auxFila = fila-2;
	auxColumna = columna-2;
	for(var x = 0 ; x<5; x++){
		auxColumna = columna-2;
		for(var y = 0; y<5; y++){
			if(pieza.baseTablero[x][y] == 1){
				if(MatrizTablero[auxFila][auxColumna][0] == 1){
					ocupada = true;
					break;
				}
			}
			auxColumna++;
		}
		auxFila++;
	}
	return ocupada;
}

var aux1 = 0;
var aux2 = 0;
var auxFila = 0;
var auxColumna = 0;
var fila = 0;
var columna = 0;

function Hover(pieza){
	let cvsTablero = document.querySelector('#cv1');
	ctxTablero = cvsTablero.getContext('2d');
	cvsTablero.onmousemove = function(e){
		ctxTablero.fillStyle = pieza.color;
		if(haTocado1 == true || haTocado2 == true || haTocado3 == true){
			ctxTablero.fillStyle = pieza.color;
			fila = Math.trunc(e.offsetX/dimension);
			columna = Math.trunc(e.offsetY/dimension); 
			if(fila == 10){
				fila = 9;
			}
			if(columna == 10){
				columna = 9;
			}
			//If position does not match with cursor
			if(aux1 != fila || aux2 != columna){
				aux1 = fila;
				aux2 = columna;
				redrawTablero();
			}
			auxFila = fila-2;
			auxColumna = columna-2;
			if(comprobacionHover(pieza,fila,columna) == pieza.cantidad){
				if(comprobarOcupada(fila,columna,pieza,auxFila,auxColumna)==false){
					// Hover animation when it matches
					auxFila = fila-2;
					auxColumna = columna-2;
					for(var x = 0 ; x<5; x++){
						auxColumna = columna-2;
						for(var y = 0; y<5; y++){
							if(pieza.baseTablero[x][y] == 1){
								ctxTablero.fillStyle = pieza.color;
								ctxTablero.strokeRect(auxFila*dimension, auxColumna*dimension, dimension, dimension);
								ctxTablero.rect(auxFila*dimension, auxColumna*dimension, dimension, dimension);
								ctxTablero.fillRect(auxFila*dimension, auxColumna*dimension, dimension, dimension);
							}
							auxColumna++;
						}
						auxFila++;
					}
					ctxTablero.stroke();
				}
				else{
					// Hover animation when it does not match
					ctxTablero.fillStyle = 'gray';
					auxFila = fila-2;
					auxColumna = columna-2;
					for(var x = 0 ; x<5; x++){
						auxColumna = columna-2;
						for(var y = 0; y<5; y++){
							if(pieza.baseTablero[x][y] == 1){
								ctxTablero.strokeRect(auxFila*dimension, auxColumna*dimension, dimension, dimension);
								ctxTablero.rect(auxFila*dimension, auxColumna*dimension, dimension, dimension);
								ctxTablero.fillRect(auxFila*dimension, auxColumna*dimension, dimension, dimension);
							}
							auxColumna++;
						}
						auxFila++;
					}
					ctxTablero.stroke();		
				}
			}
		}		
	}
	// Draw the piece when clicking
	cvsTablero.onclick = function(e){
		if(comprobacionHover(pieza,fila,columna) == pieza.cantidad){
			if(comprobarOcupada(fila,columna,pieza,auxFila,auxColumna) == false){
				if(haTocado1 == true || haTocado2 == true || haTocado3 == true){
					auxFila = fila-2;
					auxColumna = columna-2;
					for(var x = 0 ; x<5; x++){
						auxColumna = columna-2;
						for(var y = 0; y<5; y++){
							if(pieza.baseTablero[x][y] == 1){
								MatrizTablero[auxFila][auxColumna][0] = 1;
								MatrizTablero[auxFila][auxColumna][1] = pieza.color;
							}
							auxColumna++;
						}
						auxFila++;
					}
					sonidoPieza.play();
					puntuacion += pieza.cantidad;
					resetPieza = true;
					if(resetPieza == true){
						if(haTocado1 == true){
							colocada = false;
							resetPieza = false;
							haTocado1 = false;
							vacia1 = true;
							imposible1 = true; 
							pieza1C = null;
							vaciarTableroPiezas(1);
							tableroPiezas('pieza1');
						}
						else if(haTocado2 == true){
							resetPieza = false;
							haTocado2 = false;
							vacia2 = true;
							imposible2 = true;
							pieza2C = null;
							vaciarTableroPiezas(2);
							tableroPiezas('pieza2');
						}
						else if(haTocado3 == true){
							resetPieza = false;
							haTocado3 = false;
							vacia3 = true;
							imposible3 = true;
							pieza3C = null;
							vaciarTableroPiezas(3);
							tableroPiezas('pieza3');	
						}
						if(vacia1 == true && vacia2 == true && vacia3 == true){
							vaciasTodas = true;
							imposible1 = false;
							imposible2 = false;
							imposible3 = false;
							Piezas();
						}
						comprobarLineas();
						endGame();
					}
				}
			}
		}
	}
	cvsTablero.onmouseout = function(e){
		if(haTocado1 == true){
			redrawTablero();
			let cvs1 = document.querySelector('#pieza1');
			ctx1 = cvs1.getContext('2d');
		}
		else if(haTocado2 == true){
			redrawTablero();
			let cvs2 = document.querySelector('#pieza2');
			ctx2 = cvs2.getContext('2d');
		}
		else if(haTocado3 == true){
			redrawTablero();
			let cvs3 = document.querySelector('#pieza3');
			ctx3 = cvs3.getContext('2d');
		}
	}
}

function endGame(){
	if(pieza1C != null){
		imposible1 = true;
		for(var x = 0; x<casillas; x++){
			for(var y = 0; y<casillas; y++){
				if(comprobacionHover(pieza1C,x,y) == pieza1C.cantidad){
					if(comprobarOcupada(x,y,pieza1C,fila-2,columna-2) == false){
						imposible1 = false;
					}
				}
			}
		}
		if(imposible1 == true && imposible2 == true && imposible3 == true){
			gameOver = true;
			restart();
		}
	}
	if(pieza2C!=null){
		imposible2 = true;
		for(var x = 0; x<casillas; x++){
			for(var y = 0; y<casillas; y++){
				if(comprobacionHover(pieza2C,x,y) == pieza2C.cantidad){
					if(comprobarOcupada(x,y,pieza2C,fila-2,columna-2)==false){
						imposible2 = false;
					}
				}
			}
		}
		if(imposible1 == true && imposible2 == true && imposible3 == true){
			gameOver = true;
			restart();
		}
	}
	if(pieza3C!=null){
		imposible3 = true;
		for(var x = 0; x<casillas; x++){
			for(var y = 0; y<casillas; y++){
				if(comprobacionHover(pieza3C,x,y) == pieza3C.cantidad){
					if(comprobarOcupada(x,y,pieza3C,fila-2,columna-2)==false){
						imposible3 = false;
					}
				}
			}
		}
		if(imposible1 == true && imposible2 == true && imposible3 == true){
			gameOver = true;
			restart();
		}
	}
}

// Once the player lose
function restart(){
	let cambiarDisplayModal = document.querySelector('#mensajemodal');
	let mensajeModal = document.querySelector('.contenidomodal');
	mensajeModal.innerHTML = `<h2 class="errorModal">You lost</h2>
	<div class="modalcontent">
		<h3>Punctuation: `+puntuacion+`</h3>
		<button class="inputloginsummit" onclick="return closeModal(1)">Play again</button>
		<br>
	</div>`;
	cambiarDisplayModal.style.display = "block";
}

function closeModal(num)
{
	let cambiarDisplayModal = document.querySelector('#mensajemodal');
	cambiarDisplayModal.style.display = "none";
	switch(num){
		case 0:
			break;
		case 1:
			location.reload();
			break;
		default:
			break;
	}
}

// Check for columns or rows completed
function comprobarLineas(){

	let fila = 0,
	columna = 0,
	borrarFila = true,
	borrarColumna = true,
	columnasEliminar = [],
	filasEliminar = [],
	comboBreaker = 0; // Counts how many columns and rows are full in order to add bonus points

	// Check columns saving the ones completed in 'columnasEliminar' array. Later we'll use it for erasing
	for(var x = 0; x<10; x++){
		borrarColumna = true;
		columna = x;
		for(var y = 0; y<10; y++){
			if(MatrizTablero[x][y][0] == 0){
				borrarColumna = false;
			}
		}
		// Column completed
		if(borrarColumna == true){
			columnasEliminar.push(columna);
			comboBreaker++;
		}
	}
	// Check rows saving the ones completed in 'filasEliminar' array. Later we'll use it for erasing
	for(var x = 0; x<10; x++){
		borrarFila = true;
		fila = x;
		for(var y = 0; y<10; y++){
			if(MatrizTablero[y][x][0] == 0){
				borrarFila = false;
			}
		}
		// Row completed
		if(borrarFila == true){
			filasEliminar.push(fila);
			comboBreaker++;
		}
	}

	// Delete rows and columns
	if(columnasEliminar != null){
		for(var g = 0; g<columnasEliminar.length;g++){
			for(var cont = 0; cont<10; cont++){
				MatrizTablero[columnasEliminar[g]][cont][0] = 0;
				MatrizTablero[columnasEliminar[g]][cont][1] = '#20B2AA';
			}	
		}
	}
	if(filasEliminar != null){
		for(var f = 0; f<filasEliminar.length; f++){
			for(var cont = 0; cont<10; cont++){
				MatrizTablero[cont][filasEliminar[f]][0] = 0;
				MatrizTablero[cont][filasEliminar[f]][1] = '#20B2AA';
			}	
		}
	}
	if(comboBreaker == 1){
		puntuacion += 10;
		sonidoRomper.play();
	}
	else if(comboBreaker>1){
		puntuacion+=Number((10*2)*comboBreaker);
		sonidoRomper.play();
	}
	comboBreaker = 0;
	actualizarPuntuacion();
	redrawTablero();
}

function comprobacionHover(pieza, fila, columna){
	let x = 0;
	let y = 0;
	let tipo = 0;
	let auxF = fila-2;
	let auxC = columna-2;
	let cont = 0;
	let MatrizPartida = [];
	let aux1 = 0;
	let aux2 = 0;
	let max1 = 0;
	let max2 = 0;
	// This is an IF statement OCEAN but it did the work
	if(fila == 0  && columna == 0){
		x = 3;
		y = 3;
		tipo = 1;
		aux1 = 2;
		aux2 = 2;
		max1 = 5;
		max2 = 5;
	}
	if(fila == 0  && columna == 9){
		x = 3;
		y = 3;
		tipo = 2;
		aux1 = 2;
		aux2 = 0;
		max1 = 5;
		max2 = 3;
	}
	if(fila == 9  && columna == 0){
		x = 3;
		y = 3;
		tipo = 3;
		aux1 = 0;
		aux2 = 2;
		max1 = 3;
		max2 = 5;
	}
	if(fila == 9  && columna == 9){
		x = 3;
		y = 3;
		tipo = 4;
		aux1 = 0;
		aux2 = 0;
		max1 = 3;
		max2 = 3;
	}
	if(fila == 1  && columna == 0){
		x = 4;
		y = 3;
		tipo = 5;
		aux1 = 1;
		aux2 = 2;
		max1 = 5;
		max2 = 5;
	}
	if(fila == 8  && columna == 0){
		x = 4;
		y = 3;
		tipo = 6;
		aux1 = 0;
		aux2 = 2;
		max1 = 4;
		max2 = 5;
	}
	if(fila == 1  && columna == 9){
		x = 4;
		y = 3;
		tipo = 7;
		aux1 = 1;
		aux2 = 0;
		max1 = 5;
		max2 = 3;
	}
	if(fila == 8  && columna == 9){
		x = 4;
		y = 3;
		tipo = 8;
		aux1 = 0;
		aux2 = 0;
		max1 = 4;
		max2 = 3;
	}
	if(fila == 0  && columna == 1){
		x = 3;
		y = 4;
		tipo = 9;
		aux1 = 2;
		aux2 = 1;
		max1 = 5;
		max2 = 5;
	}
	if(fila == 9  && columna == 1){
		x = 3;
		y = 4;
		tipo = 10;
		aux1 = 0;
		aux2 = 1;
		max1 = 3;
		max2 = 5;
	}
	if(fila == 0  && columna == 8){
		x = 3;
		y = 4;
		tipo = 11;
		aux1 = 2;
		aux2 = 0;
		max1 = 5;
		max2 = 4;
	}
	if(fila == 9  && columna == 8){
		x = 3;
		y = 4;
		tipo = 12;
		aux1 = 0;
		aux2 = 0;
		max1 = 3;
		max2 = 4;
	}
	if(fila == 1  && columna == 1){
		x = 4;
		y = 4;
		tipo = 13;
		aux1 = 1;
		aux2 = 1;
		max1 = 5;
		max2 = 5;
	}
	if(fila == 8  && columna == 1){
		x = 4;
		y = 4;
		tipo = 14;
		aux1 = 0;
		aux2 = 1;
		max1 = 4;
		max2 = 5;
	}
	if(fila == 1  && columna == 8){
		x = 4;
		y = 4;
		tipo = 15;
		aux1 = 1;
		aux2 = 0;
		max1 = 5;
		max2 = 4;
	}
	if(fila == 8  && columna == 8){
		x = 4;
		y = 4;
		tipo = 16;
		aux1 = 0;
		aux2 = 0;
		max1 = 4;
		max2 = 4;
	}
	if(fila == 0  && (columna == 2 || columna == 3 || columna == 4 || columna == 5 || columna == 6 || columna == 7)){
		x = 3;
		y = 5;
		tipo = 17;
		aux1 = 2;
		aux2 = 0;
		max1 = 5;
		max2 = 5;
	}
	if(fila == 1  && (columna == 2 || columna == 3 || columna == 4 || columna == 5 || columna == 6 || columna == 7)){
		x = 4;
		y = 5;
		tipo = 18;
		aux1 = 1;
		aux2 = 0;
		max1 = 5;
		max2 = 5;
	}
	if(fila == 8  && (columna == 2 || columna == 3 || columna == 4 || columna == 5 || columna == 6 || columna == 7)){
		x = 4;
		y = 5;
		tipo = 19;
		aux1 = 0;
		aux2 = 0;
		max1 = 4;
		max2 = 5;
	}
	if(fila == 9  && (columna == 2 || columna == 3 || columna == 4 || columna == 5 || columna == 6 || columna == 7)){
		x = 3;
		y = 5;
		tipo = 20;
		aux1 = 0;
		aux2 = 0;
		max1 = 3;
		max2 = 5;
	}
	if((fila == 2 || fila == 3 || fila == 4 || fila == 5 || fila == 6 || fila == 7)  && columna == 0){
		x = 5;
		y = 3;
		tipo = 21;
		aux1 = 0;
		aux2 = 2;
		max1 = 5;
		max2 = 5;
	}
	if((fila == 2 || fila == 3 || fila == 4 || fila == 5 || fila == 6 || fila == 7)  && columna == 1){
		x = 5;
		y = 4;
		tipo = 22;
		aux1 = 0;
		aux2 = 1;
		max1 = 5;
		max2 = 5;
	}
	if((fila == 2 || fila == 3 || fila == 4 || fila == 5 || fila == 6 || fila == 7)  && columna == 8){
		x = 5;
		y = 4;
		tipo = 23;
		aux1 = 0;
		aux2 = 0;
		max1 = 5;
		max2 = 4;
	}
	if((fila == 2 || fila == 3 || fila == 4 || fila == 5 || fila == 6 || fila == 7)  && columna == 9){
		x = 5;
		y = 3;
		tipo = 24;
		aux1 = 0;
		aux2 = 0;
		max1 = 5;
		max2 = 3;
	}
	if((fila == 2 || fila == 3 || fila == 4 || fila == 5 || fila == 6 || fila == 7) && (columna == 2 || columna == 3 || columna == 4 || columna == 5 || columna == 6 || columna == 7)){
		x = 5;
		y = 5;
		tipo = 25;
		aux1 = 0;
		aux2 = 0;
		max1 = 5;
		max2 = 5;
	}
	let var1 = aux1;
	let var2 = aux2;
	for(var i=0; i<x; i++)
	{
		MatrizPartida[i] = [];
		for(var j=0; j<y; j++)
		{
			MatrizPartida[i][j] = pieza.baseTablero[var1][var2];
			if(MatrizPartida[i][j] == 1){
				cont++;
			}
			var2++;
			if(var2 == max2){
				var2 = aux2;
			}
		}
		var1++;
		if(var1 == max1){
			var1 = aux1;
		}
	}
	return cont;
}

// Piece object: we pase the base form, color and rotation
function Pieza(base,color,rotacion){
	this.base = base;
	this.color = color;
	this.coordenadas = [];
	this.baseTablero = [];
	this.rotacion = rotacion;
	this.cantidad = this.base.length;

	let rotarOno = Math.floor(Math.random()*4);
	if(rotarOno != 0){
		let auxiliar = [];
		for(var x = 0; x<this.base.length;x++){
			auxiliar[x] = this.rotacion[this.base[x]];
		}
		this.base = auxiliar;
	}
	for(var x = 0; x<this.base.length;x++){
		this.coordenadas[x] = [posicionesPieza[this.base[x]][0], posicionesPieza[this.base[x]][1]];
	}
	for(var x = 0;x<5;x++){
		this.baseTablero[x] = [];
		for(var y=0;y<5;y++){
			this.baseTablero[x][y] = 0;
		}
	}
	for(var x = 0; x<this.base.length;x++){
		this.baseTablero[Math.trunc(Number(this.base[x]%5))][Math.trunc(this.base[x]/5)] = 1;
	}
}

// Function that creates the three pieces and keeps the loop of creating three more when all pieces are positioned
function Piezas(){
	if(vaciasTodas == true){
		let randomizador = Math.floor(Math.random() * 9);
		let randomizador2 = Math.floor(Math.random() * 9);
		let randomizador3 = Math.floor(Math.random() * 9);

		pieza1C = new Pieza(tipo[randomizador], colores[randomizador], matrizRotacion[Math.floor(Math.random()*3)]);
		pieza2C = new Pieza(tipo[randomizador2], colores[randomizador2], matrizRotacion[Math.floor(Math.random()*3)]);
		pieza3C = new Pieza(tipo[randomizador3], colores[randomizador3], matrizRotacion[Math.floor(Math.random()*3)]);

        // Draw pieces on the canvas
		let cvs1 = document.querySelector('#pieza1');
		ctx1 = cvs1.getContext('2d');
		ctx1.fillStyle = pieza1C.color;
		for(var g = 0; g<pieza1C.base.length;g++){
			ctx1.strokeRect(pieza1C.coordenadas[g][0], pieza1C.coordenadas[g][1], filas, columnas);
			ctx1.rect(pieza1C.coordenadas[g][0], pieza1C.coordenadas[g][1], filas, columnas);
			ctx1.fill();
			ctx1.stroke();
		}
		let cvs2 = document.querySelector('#pieza2');
		ctx2 = cvs2.getContext('2d');
		ctx2.fillStyle = pieza2C.color;
		for(var g = 0; g<pieza2C.base.length;g++){
			ctx2.strokeRect(pieza2C.coordenadas[g][0], pieza2C.coordenadas[g][1], filas, columnas);
			ctx2.rect(pieza2C.coordenadas[g][0], pieza2C.coordenadas[g][1], filas, columnas);
			ctx2.fill();
			ctx2.stroke();
		}
		let cvs3 = document.querySelector('#pieza3');
		ctx3 = cvs3.getContext('2d');
		ctx3.fillStyle = pieza3C.color;
		for(var g = 0; g<pieza3C.base.length;g++){
			ctx3.strokeRect(pieza3C.coordenadas[g][0], pieza3C.coordenadas[g][1], filas, columnas);
			ctx3.rect(pieza3C.coordenadas[g][0], pieza3C.coordenadas[g][1], filas, columnas);
			ctx3.fill();
			ctx3.stroke();
		}
		vaciasTodas = false;
		vacia1 = false;
		vacia2 = false;
		vacia3 = false;
		cvs1.addEventListener("click", click(pieza1C),false);
		cvs2.addEventListener("click", click(pieza2C),false);
		cvs3.addEventListener("click", click(pieza3C),false);

		hoverPiezaCursor(pieza1C);
		hoverPiezaCursor(pieza2C);
		hoverPiezaCursor(pieza3C);
	}
}

function hoverPiezaCursor(pieza){
	if(pieza == pieza1C){
		let cvs1 = document.querySelector('#pieza1');
		ctx1 = cvs1.getContext('2d');
		cvs1.onmousemove = function(e){
			if(!vacia1){
				let filass = Math.floor(e.offsetX);
				let columnass = Math.floor(e.offsetY);
				let hover = false;
				for(var x = 0; x < pieza1C.base.length;x++){
					let posicionX = pieza1C.coordenadas[x][0];
					let posicionY = pieza1C.coordenadas[x][1];
					if(filass >= posicionX && filass < (posicionX+fila5x5)){
						if(columnass >= posicionY && columnass < (posicionY+fila5x5)){
							hover = true;
						}
					}
					if(hover && !haTocado2 && !haTocado3){
						document.querySelector('#pieza1').className = "hoverCursor";
					}
					else{
						document.querySelector('#pieza1').classList.remove("hoverCursor");
					}
				}
			}
		}
	}
	else if(pieza == pieza2C){
		let cvs2 = document.querySelector('#pieza2');
		ctx2 = cvs2.getContext('2d');
		cvs2.onmousemove = function(e){
			if(!vacia2){
				let filass = Math.floor(e.offsetX);
				let columnass = Math.floor(e.offsetY);
				let hover = false;
				for(var x = 0; x < pieza2C.base.length;x++){
					let posicionX = pieza2C.coordenadas[x][0];
					let posicionY = pieza2C.coordenadas[x][1];
					if(filass >= posicionX && filass < (posicionX+fila5x5)){
						if(columnass >= posicionY && columnass < (posicionY+fila5x5)){
							hover = true;
						}
					}
					if(hover && !haTocado3 && !haTocado1){
						document.querySelector('#pieza2').className = "hoverCursor";
					}
					else{
						document.querySelector('#pieza2').classList.remove("hoverCursor");
					}
				}
			}
		}
	}
	else if(pieza == pieza3C){
		let cvs3 = document.querySelector('#pieza3');
		ctx3 = cvs3.getContext('2d');
		cvs3.onmousemove = function(e){
			if(!vacia3){
				let filass = Math.floor(e.offsetX);
				let columnass = Math.floor(e.offsetY);
				let hover = false;
				for(var x = 0; x < pieza3C.base.length;x++){
					let posicionX = pieza3C.coordenadas[x][0];
					let posicionY = pieza3C.coordenadas[x][1];
					if(filass >= posicionX && filass < (posicionX+fila5x5)){
						if(columnass >= posicionY && columnass < (posicionY+fila5x5)){
							hover = true;
						}
					}
					if(hover && !haTocado1 && !haTocado2){
						document.querySelector('#pieza3').className = "hoverCursor";
					}
					else{
						document.querySelector('#pieza3').classList.remove("hoverCursor");
					}
				}
			}
		}
	}
}

function click(variable){
	if(variable == pieza1C){
		let cvs1 = document.querySelector('#pieza1');
		ctx1 = cvs1.getContext('2d');
		ctx1.fillStyle = pieza1C.color;
		cvs1.onclick = function(e){
			if(vacia1 == false){
				if(haTocado2 == false && haTocado3 == false){
					let filass = Math.floor(e.offsetX);
					let columnass = Math.floor(e.offsetY);
					for(var x = 0; x < pieza1C.base.length;x++){
						let posicionX = pieza1C.coordenadas[x][0];
						let posicionY = pieza1C.coordenadas[x][1];
						if(filass >= posicionX && filass < (posicionX+fila5x5)){
							if(columnass >= posicionY && columnass < (posicionY+fila5x5)){
								if(haTocado1 == true){
									ctx1.strokeStyle = "#333";
									for(var g = 0; g < pieza1C.base.length;g++){
										ctx1.strokeRect(pieza1C.coordenadas[g][0], pieza1C.coordenadas[g][1], filas, columnas);
										ctx1.rect(pieza1C.coordenadas[g][0], pieza1C.coordenadas[g][1], filas, columnas);
										ctx1.fill();
							
										ctx1.stroke();
									}
									haTocado1 = false;
								}
								else{
									haTocado1 = true;
									// Glowing when it's touched
									ctx1.strokeStyle = "white";
									for(var g = 0; g < pieza1C.base.length;g++){
										ctx1.strokeRect(pieza1C.coordenadas[g][0], pieza1C.coordenadas[g][1], filas, columnas);
										ctx1.rect(pieza1C.coordenadas[g][0], pieza1C.coordenadas[g][1], filas, columnas);
										ctx1.fill();
										ctx1.stroke();
									}
									Hover(pieza1C);
								}
							}
						}
					}
				}
			}
		}
	}
	else if(variable == pieza2C){
		let cvs2 = document.querySelector('#pieza2');
		ctx2 = cvs2.getContext('2d');
		ctx2.fillStyle = pieza2C.color; 
		cvs2.onclick = function(e){
			if(vacia2 == false){
				if(haTocado1 == false && haTocado3 == false){
					var filass = Math.floor(e.offsetX);
					var columnass = Math.floor(e.offsetY);
					for(var x = 0; x < pieza2C.base.length;x++){
						var posicionX = pieza2C.coordenadas[x][0];
						var posicionY = pieza2C.coordenadas[x][1];
						if(filass >= posicionX && filass < (posicionX+fila5x5)){
							if(columnass >= posicionY && columnass < (posicionY+fila5x5)){
								if(haTocado2 == true){
									ctx2.strokeStyle="#333";
									for(var g = 0; g < pieza2C.base.length;g++){
										ctx2.strokeRect(pieza2C.coordenadas[g][0], pieza2C.coordenadas[g][1], filas, columnas);
										ctx2.rect(pieza2C.coordenadas[g][0], pieza2C.coordenadas[g][1], filas, columnas);
										ctx2.fill();
										ctx2.stroke();
									}
									haTocado2 = false;
								}
								else{
									haTocado2 = true;
									// Glowing when it's touched
									ctx2.strokeStyle = "white";
									for(var g = 0; g < pieza2C.base.length;g++){
										ctx2.strokeRect(pieza2C.coordenadas[g][0], pieza2C.coordenadas[g][1], filas, columnas);
										ctx2.rect(pieza2C.coordenadas[g][0], pieza2C.coordenadas[g][1], filas, columnas);
										ctx2.fill();
										ctx2.stroke();
									}
									Hover(pieza2C);
								}
							}
						}
					}
				}
			}
		}
	}
	else if(variable == pieza3C){
		let cvs3 = document.querySelector('#pieza3');
		ctx3 = cvs3.getContext('2d');
		ctx3.fillStyle = pieza3C.color;
		cvs3.onclick = function(e){
			if(vacia3 == false){
				if(haTocado1 == false && haTocado2 == false){
					var filass = Math.floor(e.offsetX);
					var columnass = Math.floor(e.offsetY);
					for(var x = 0; x < pieza3C.base.length;x++){
						var posicionX = pieza3C.coordenadas[x][0];
						var posicionY = pieza3C.coordenadas[x][1];
						if(filass >= posicionX && filass < (posicionX+fila5x5)){
							if(columnass >= posicionY && columnass <(posicionY+fila5x5)){
								if(haTocado3 == true){
									ctx3.strokeStyle = "#333";
									for(var g = 0; g < pieza3C.base.length;g++){
										ctx3.strokeRect(pieza3C.coordenadas[g][0], pieza3C.coordenadas[g][1], filas, columnas);
										ctx3.rect(pieza3C.coordenadas[g][0], pieza3C.coordenadas[g][1], filas, columnas);
										ctx3.fill();
										ctx3.stroke();
									}
									haTocado3 = false;
								}
								else{
									haTocado3 = true;
									// Glowing when it's touched
									ctx3.strokeStyle = "white";
									for(var g = 0; g < pieza3C.base.length;g++){
										ctx3.strokeRect(pieza3C.coordenadas[g][0], pieza3C.coordenadas[g][1], filas, columnas);
										ctx3.rect(pieza3C.coordenadas[g][0], pieza3C.coordenadas[g][1], filas, columnas);
										ctx3.fill();
										ctx3.stroke();
									}
									Hover(pieza3C);
								}
							}
						}
					}
				}
			}
		}
	}
}


function tableroPiezas(texto){
	let pieza = document.querySelector('#'+texto);
	pieza.width = tablonPiezas;
	pieza.height = tablonPiezas;
	p = pieza.getContext('2d');
	p.strokeStyle = "#333";
	p.fillStyle = '#20B2AA'; 
	p.lineWidth = 2;	
	for(i = 0; i < pieza.height; i=i+columnas5x5){
		for(j = 0; j <= pieza.height; j=j+fila5x5){
			p.strokeRect(i, j, filas, columnas);
			p.fillRect(i, j, filas, columnas);
		}
	}
	p.stroke();	
}

function vaciarTableroPiezas(num){
	let peace = document.querySelector('#pieza'+num);
	pe = peace.getContext('2d');
	pe.clearRect(0,0,innerWidth,innerHeight);
}

function InicializarMatrices(){
	MatrizTablero = [];
	for(var i=0; i<casillas; i++)
	{
		MatrizTablero[i] = [];
		for(var j=0; j<casillas; j++)
		{
			MatrizTablero[i][j] = [0,'#20B2AA'];
		}
	}
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.volume = 0.1;
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


