let botonPedir = document.querySelector("#boton-pedir");
let botonPasar = document.querySelector("#boton-pasar");
// class id tag
let nodoPuntuacionJugador = document.querySelector("#puntuacion-j1");
let nodoPuntuacionBanca = document.querySelector("#puntuacion-j2");
let nodoNombreJugador = document.querySelector("#nombre-j1");
let nodoListaCartasJ1 = document.querySelector("div#cartas-j1");
let barajaCompleta = [];
let contador = 1;

function iniciarBaraja() {
  const palos = ["C", "D", "P", "T"];
  const valores = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];
  for (let palo of palos) {
    for (let valor of valores) {
      barajaCompleta.push(`${valor}${palo}`);
    }
  }
  barajaCompleta = _.shuffle(barajaCompleta);
}

function configurarNombre() {
  let nombreJugador = prompt("Indica tu nombre");
  nodoNombreJugador.innerText = nombreJugador;
}

window.addEventListener("load", () => {
  iniciarBaraja();
});

function obtenerValorCarta(valorCarta) {
  const valores = { 'J': 10, 'Q': 10, 'K': 10 };
  return valores[valorCarta] || Number(valorCarta);
}

botonPedir.addEventListener("click", () => {
  let cartaSacada = barajaCompleta.pop();
  let valorCarta = cartaSacada.substring(0, cartaSacada.length - 1);
  let valorNumericoCarta = obtenerValorCarta(valorCarta);

  nodoPuntuacionJugador.innerText =
    Number(nodoPuntuacionJugador.textContent) + valorNumericoCarta;
    
  nodoListaCartasJ1.innerHTML += `<img src='./utils/images/${cartaSacada}.png' 
    class='m-2' style='width: 20%' >`;

  setTimeout(() => {
    if (Number(nodoPuntuacionJugador.textContent) === 21) {
      botonPedir.disabled = true;
    } else if (Number(nodoPuntuacionJugador.textContent) > 21) {
      alert("Has perdido");
    }
  }, 200);

});

botonPasar.addEventListener("click", () => {
  botonPedir.disabled = true;
  let intervalo = setInterval(() => {
    let cartaSacada = barajaCompleta.pop();
    let valorCarta = cartaSacada.substring(0, cartaSacada.length - 1);
    let valorNumericoCarta = obtenerValorCarta(valorCarta);

    nodoPuntuacionBanca.textContent =
      Number(nodoPuntuacionBanca.textContent) + valorNumericoCarta;

    if (Number(nodoPuntuacionBanca.textContent) >= 17) {
      clearInterval(intervalo);
    }
  }, 2000);
});
