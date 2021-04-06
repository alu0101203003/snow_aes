
// --------------- Funciones principales ----------------- \\

function generar (){
    var datos = get_datos();
    var resultado = snow_aes(datos.primer,datos.segundo,datos.byteAlgoritmo)
    imprimirSalida(datos,resultado)    
}

// --------------------------------------------------------- \\

function get_datos (){

    primer = document.getElementById("primer").value;
    segundo = document.getElementById("segundo").value;
    algoritmo = document.getElementById("algoritmo").value;
    var byteAlgoritmo = ""
    if (algoritmo == "AES"){
      byteAlgoritmo = "00011011"
    } else if(algoritmo = "SNOW") {
      byteAlgoritmo = "10101001"
    }

    var primer_array = parseInt(primer,16).toString(2).padStart(8, "0").split("");
    var segundo_array = parseInt(segundo,16).toString(2).padStart(8, "0").split("");
    var byteAlgoritmo_array = byteAlgoritmo.split("");

    for (var i = 0; i < primer_array.length; i++){
      primer_array[i] = parseInt(primer_array[i]);
      segundo_array[i] = parseInt(segundo_array[i]);
      byteAlgoritmo_array[i] = parseInt(byteAlgoritmo_array[i]);
    }
    
	var datos = {
		primer: primer_array,
		segundo: segundo_array,
    byteAlgoritmo: byteAlgoritmo_array
	};
	return datos;
}

function separar(byte){
  var bytePos = byte.reduce((c, v, i) => v == 1 ? c.concat(i) : c, []); // array de posiciones donde hay un 1
  bytePos.reverse()
  return bytePos
}

function multiplicacion(byte1, byte2 , byteAlgoritmo) {
  var size = byte2
  let aux1 = byte1.join("")
  let aux2 = aux1.split("")

  for (var i = 7; i > size; i--){
    if (aux2[0] == 0){
      aux2.shift()
      aux2.push(0)
    } else if (aux2[0] == 1){
      aux2.shift()
      aux2.push(0)

      var byte1_xor = parseInt(aux2.join(''),2)
      var byteAlgoritmo_xor = parseInt(byteAlgoritmo.join(''),2)
      var xor = byte1_xor ^ byteAlgoritmo_xor
      xor = xor.toString(2).padStart(8, "0").split("");
      for (var j = 0; j < xor.length; j++){
        xor[j] = parseInt(xor[j])
      }
      aux2 = xor
    }
  }
  resultado = aux2
  return resultado
}

function snow_aes(primer, segundo, byteAlgoritmo){
  var posiciones = separar(segundo);
  var resultado = multiplicacion(primer,posiciones[0],byteAlgoritmo);
  resultado = parseInt(resultado.join(''),2)
  let operacion
  var segundo_xor
  console.log("primer",primer)
  for (var i = 1; i < posiciones.length; i++){
    console.log("primer",primer)
    operacion = multiplicacion(primer,posiciones[i],byteAlgoritmo)
    console.log("primer",primer)
    segundo_xor = parseInt(operacion.join(''),2)
    console.log("primer",primer)
    resultado = resultado ^ segundo_xor
    console.log("primer",primer)
  }

  resultado = resultado.toString(2)
  return resultado
}

function imprimirSalida(datos,multiplicacion){

    document.getElementById("primerB").innerHTML = datos.primer.toString(2);
    document.getElementById("segundoB").innerHTML = datos.segundo.toString(2);
    document.getElementById("algoritB").innerHTML = datos.byteAlgoritmo.toString(2);
    document.getElementById("multipB").innerHTML = multiplicacion

    // Show / Hide
    var mostrar = document.getElementById("salidas");
    if (mostrar.style.display === "none") {
      mostrar.style.display = "block";
    } else {
      mostrar.style.display = "none";
    }
}