var gridCont = document.getElementById('grid_Cont');
var btn_clean = document.getElementById('clean');
var btn_newGrid = document.getElementById('new_grid');
var btn_bnw_style = document.getElementById('bnw_style');
var btn_rgb_style = document.getElementById('rgb_style');
var btn_gradient_style = document.getElementById('gradient_style');

var square;
var cant_square = 256;
var prompt_text = "Ingrese la cantidad de cuadros por lado que desea crear  (max. 20 cuadros)";
var style = "black";

var randomColor;
var gradientColor = 255;
main();

function main() {
    createSquare(cant_square);
    paintSquare(style);
}


//Creacion de 256 cuadros como div's
function createSquare(cant_square) {
    for (var i = 0; i < cant_square; i++) {
        var gridDiv = document.createElement('div');
        gridDiv.className = 'square-style';
        gridCont.appendChild(gridDiv);

    }
    square = document.getElementsByClassName('square-style');

}

//Pinta de color los cuadros cuando el mouse pasa por encima de ellos
function paintSquare(style) {
    if (style == 'RGB') {
        for (var i = 0; i < square.length; i++) {
            square[i].onmouseover = function () {
                 randomColor = Math.floor(Math.random()*16777215).toString(16);
                this.style.backgroundColor = "#" + randomColor
            };

        }
    } else if (style == 'Gradient') {

        for (var i = 0; i < square.length; i++) {
            square[i].onmouseover = function () {
                if (gradientColor == 0) {
                    gradientColor = 255
                }
                gradientColor = gradientColor - 1;
                this.style.backgroundColor = "rgb(" + gradientColor + "," + gradientColor + "," + gradientColor + ")";
            };
        }

    }
    else {
        for (var i = 0; i < square.length; i++) {
            //"this" asocia al elemento sobre el que pasa el mouse
            square[i].onmouseover = function () { this.style.backgroundColor = style };

        }
    }
}


//Resetea el color de los cuadrados
btn_clean.onclick = resetSquare;

function resetSquare() {

    for (var i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = "rgb(186, 209, 204)";

    }
}

//Crea una nueva grilla
btn_newGrid.onclick = function () {
    cant_square = parseInt(prompt(prompt_text));
    while (!Number.isInteger(cant_square) || cant_square <= 0 || cant_square > 20) {
        //Genera los nuevos
        cant_square = parseInt(prompt(prompt_text));
    }

    //Elimina los cuadros anteriores
    gridCont.innerHTML = '';
    //Se modifican las filas y columnas
    gridCont.style.gridTemplateColumns = "repeat(" + cant_square + ", 30px)";
    gridCont.style.gridTemplateRows = "repeat(" + cant_square + ", 30px)";

    cant_square = Math.pow(cant_square, 2);
    createSquare(cant_square);

    paintSquare(style);

}

//Cambia los cuadros a blanco y negro
btn_bnw_style.onclick = function () {
    resetSquare();
    style = 'black';
    paintSquare(style);

}


//Cambia los cuadros a colores aleatorios
btn_rgb_style.onclick = function () {
    resetSquare();
    style = 'RGB';
    paintSquare(style);

}

//Cambia los cuadros a blanco y negro gradiente
btn_gradient_style.onclick = function () {
    resetSquare();
    style = 'Gradient';
    paintSquare(style);

}
