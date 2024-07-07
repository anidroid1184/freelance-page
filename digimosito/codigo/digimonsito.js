window.addEventListener('keydown',sePresionoUnaTecla);//teclado
window.addEventListener('keyup',pausarMovimiento);//teclado
/* servidor */
let digimonId = null;
let enemigoId = null;
/* comienzo juego */
const botonSeleccionar= document.getElementById('boton-seleccionar');
let  botonFuego;
let botonAgua;
let  botonTierra;
const botonreiniciar=document.getElementById('boton-reiniciar');
const  tarjetasDigimons= document.getElementById('tarjeta digimon');
const botonReiniciarOcultar= document.getElementById('boton-reiniciar');
/* funcion comienzoJuego() */
const seccionSeleccionAtaque= document.getElementById('seleccionar-movimientos');
const seccionElegirDigimon= document.getElementById('seleccionar-digimon');
const seccionReiniciar = document.getElementById('reiniciar');
/* funcion seleccionarDigimonJugador() */
let inputExclaneitor;
let inputPiplox;
let inputGrover;
let inputPyros;
let inputKyros;
let inputRyros;
let spanjugador=document.getElementById('digimon-jugador');
let inputsDigimons=[];
let contadorJugador=0;
let digimonJugadorId;
/* funcion digimonEnemigo */
const spanEnemigo=document.getElementById('digimon-enemigo');//span para reemplazar digimon enemigo
let digimonGeneradoEnemigo;
/* funcion canvas */
const seccionCanvas = document.getElementById('seccion-canva');
const mapaCanva = document.getElementById('mapa');
let lienzo = mapaCanva.getContext('2d');//trabajamos en 2d
/* funcion crearImagenes() */
const seccionImgJugador= document.getElementById('imagenJugador');
const spanJugadorNameDigimon =  document.getElementById('digimonJugadorNameImg');  
const seccionImgEnemigo= document.getElementById('imagenEnemigo');
const spanEnemigoNameDigimon =  document.getElementById('digimonEnemigoNameImg');
/* funcion colorDigimonSeleccionado() */
const jugadorColor= document.getElementById('jugadorImg');
const enemigoColor= document.getElementById('enemigoImg');
const colorVidasJugador= document.getElementById('tarjeta-vidas-jugador');
const colorVidasEnemigo= document.getElementById('tarjeta-vidas-enemigo');
/* funcion ataqueJugador() */
const botonesAtaqueDiv= document.getElementById('botones-ataques');
/* funcion secuencia jugador */
let tipos=['tipo-fuego', 'tipo-agua', 'tipo-tierra'];//arreglo para verificar los tipos
let colorDesactivado={
    'tipo-fuego':'#F7BFA1',//tipos para verificar el color
    'tipo-agua':'#C0CCD8',
    'tipo-tierra':'#FBC888'
}
let colorActivado={
    'tipo-fuego':'#F85E12',//tipos para verificar el color
    'tipo-agua':'#3AA2CF',
    'tipo-tierra':'#DA8A44'
}
/* funcion conteo de vidas */
let vidasJugador=0, vidasEnemigo=0;

/* funcion crearBatalla() */
const resultadoBatallaParrafo=document.getElementById('resultado-final-batalla');//se accede a la dirección de la etiqueta
const ataqueJugadorDiv=document.getElementById('ataques-realizados-jugador');
const ataqueEnemigoDiv=document.getElementById('ataques-realizados-enemigo');
let ataquesDigimon=[];
let ataquesEnemigo=[];
let botonesAtaques;
let idBotones=[];
/* ataque Jugador */
let secuenciaJugador=[];
let secuenciaJugadorNombres = [];
/* ataque Enemigo */
let secuenciaEnemigo=[];
let secuenciaEnemigoNombres =[];
let tiposEnemigo = [];
let botones=[],botonesFuego=[],botonesAgua=[],botonesTierra=[];
let botonesActivar=[];
/* funcion conteoVidas() */
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
/* funcion confirmar() */
const seccionSecuenciaEnemgigo = document.getElementById('secuencia-enemigo');
const seccionSecuenciaJugador = document.getElementById('secuencia-jugador');
const seccionConfirmarAtaque = document.getElementById('confirmar-ataque');
let botonConfirmar;
let botonCancelar;
/* funcion resleccionar() */
let botonesActivarFiltrado=[];
/* Variables globales código */
let ataqueJugador, nAtaqueEnemigo=0,ataqueEnemigo, digimonJugador=0, nAtackjugador, nAtackEnemigo; 
let digimonEnemigo=aleatorioNum(6,1);
const emojiVidasJugador=' ♥', emojiVidasEnemigo=' ♥';
let emojiVidas1, emojiVidas2; 
let posiblesDigimons;
/* Sección de colores para cuando se generen las imagenes de la segunda pantalla */
let colorSecuenciaEnemigo='';
let colorSecuenciaJugador='';
let coloresDigimon={
    'naranja':'#F3722C',
    'azul':'#277DA1',
    'verde':'#90BE6D',
    'rojo':'#F94144',
    'morado':'#575890',
    'lila':'#8F5790'
};
let anchoMapa = window.innerWidth-20;//ancho con margen, para hacerlo de forma automatica
let altura = anchoMapa * 600/800;//calcula la altura automaticamente del mapa
const anchoMax = 350;
mapaCanva.width = anchoMapa;//ancho
mapaCanva.height = altura;//alto
if(anchoMapa>anchoMax){
    anchoMapa=anchoMax;
}
/* clase digimons */
class Digimons{
    constructor(nombre, imagen, vida, label, divName, tarjetaName, color,id){
        this.id=id;
        this.nombre=nombre;//ibjeto nombre
        this.imagen=imagen;//atributo imagen
        this.vida=vida;//atributo vida
        this.label=label;//atributo label
        this.divName=divName;//atributo div
        this.tarjetaName=tarjetaName;//atributo tarjeta de css
        this.color=color;//atributo color
        this.ataques=[];//atributo ataques
        this.ancho=70;  
        this.alto=70;
        this.x=aleatorioNum(mapaCanva.width-this.ancho,0);
        this.y=aleatorioNum(mapaCanva.height-this.alto,0);
        this.velocidadx=0;//movimiento
        this.velocidady=0;
        this.digimonCanva = new Image();//imagen mapa
        this.digimonCanva.src = imagen;//direccion imagen
        this.mapaFondo = new Image();//imagen fondo
        this.mapaFondo.src = './assets/mapaDigimon.png';
    }
}

let exclaneitor= new Digimons('Exclaneitor', './assets/fuego.png', 5,'labelExclaneitor','exclaneitorName','tarjetaExclaneitor', 'naranja') ;//objeto clase digimon
let piplox= new Digimons('Piplox', './assets/agua.png', 5,'labelPiplox', 'piploxName','tarjetaPiplox', 'azul');
let grover= new Digimons('Grover', './assets/tierra.png', 5,'labelGrover', 'groverName', 'tarjetaGrover','verde');
let pyros= new Digimons('Pyros', './assets/tierraFuego.png', 5,'labelPyros', 'pyrosName', 'tarjetaPyros', 'rojo');
let kyros= new Digimons('Kyros', './assets/aguaFuego.png', 5,'labelKyros', 'kyrosName', 'tarjetaKyros', 'morado');
let ryros= new Digimons('Ryros', './assets/tierraAgua.png', 5,'labelRyros', 'ryrosName', 'tarjetaRyros', 'lila');
/* creacion de array de objetos-Digimones */
let digimons=[];
let digimonsEnemigo=[];
let digimonsEnemigoServer=[];
/* ataques digimon */
const exclaneitorAtaques = [
    {nombre:'Ataque igneo',id:'boton-fuego', tipo:'tipo-fuego'},//objetos literarios, no sigues o pertenecen a ninguna clase
    {nombre:'Llamarada',id:'boton-fuego', tipo:'tipo-fuego'},
    {nombre:'Terremoto',id:'boton-tierra', tipo:'tipo-tierra'},
    {nombre:'Golpe roca',id:'boton-tierra', tipo:'tipo-tierra'},
]
exclaneitor.ataques.push(...exclaneitorAtaques);// para que pase los values de cada array, en vez de solo nombres o un solo dato
const piploxAtaques = [
    {nombre:'Tsunami',id:'boton-agua', tipo:'tipo-agua'},
    {nombre:'Agua control',id:'boton-agua' , tipo:'tipo-agua'},
    {nombre:'Vida control',id:'boton-agua' , tipo:'tipo-agua'},
    {nombre:'Concentración',id:'boton-tierra' , tipo:'tipo-tierra'},
]
piplox.ataques.push(...piploxAtaques);
const groverAtaques = [
    {nombre:'Tumba rocas',id:'boton-tierra' , tipo:'tipo-tierra'},
    {nombre:'Defensa roca',id:'boton-tierra' , tipo:'tipo-tierra'},
    {nombre:'Inundación',id:'boton-agua' , tipo:'tipo-agua'},
    {nombre:'Golpe roca',id:'boton-tierra' , tipo:'tipo-tierra'},
]
grover.ataques.push(...groverAtaques);
const pyrosAtaques = [
    {nombre:'Fuego oscuro',id:'boton-fuego' , tipo:'tipo-fuego'},
    {nombre:'Infierno',id:'boton-fuego' , tipo:'tipo-fuego'},
    {nombre:'Terremoto',id:'boton-tierra' , tipo:'tipo-tierra'},
    {nombre:'Rocarada',id:'boton-tierra' , tipo:'tipo-tierra'},
]
pyros.ataques.push(...pyrosAtaques);
const kyrosAtaques = [
    {nombre:'Maremoto',id:'boton-agua' , tipo:'tipo-agua'},
    {nombre:'Lavarada',id:'boton-fuego' , tipo:'tipo-fuego'},
    {nombre:'Refuerzo obsidiana',id:'boton-tierra' , tipo:'tipo-tierra'},
    {nombre:'Tumba de obsidiana',id:'boton-tierra' , tipo:'tipo-tierra'},
]
kyros.ataques.push(...kyrosAtaques);
const ryrosAtaques = [
    {nombre:'Entierro fango',id:'boton-agua' , tipo:'tipo-agua'},
    {nombre:'Pantano',id:'boton-fuego' , tipo:'tipo-fuego'},
    {nombre:'Terremoto',id:'boton-tierra' , tipo:'tipo-tierra'},
    {nombre:'Golpe roca',id:'boton-tierra' , tipo:'tipo-tierra'},
]
ryros.ataques.push(...ryrosAtaques);
/* insertamos los digimones al arreglo  */
digimons.push(exclaneitor, piplox, grover, pyros, kyros, ryros);
digimonsEnemigo.push(exclaneitor, piplox, grover, pyros, kyros, ryros);
function aleatorioNum(max,min){
    let n=0;
    return n=Math.floor(Math.random()*(max-min+1)+min);//generar numero aleatorio
}
function comienzoJuego(){
    document.body.style.height = "200vh"//primera pantalla
    seccionSeleccionAtaque.style.display='none';//ocultamos el menu de combate
    seccionCanvas.style.display='none';//ocultamos el menu de combate
    seccionConfirmarAtaque.style.display='none';//no mostrammos la seccion
    seccionSecuenciaEnemgigo.style.display='none';//no mostrammos la seccion
    seccionSecuenciaJugador.style.display='none';//no mostrammos la seccion
    /* estructura para generar tarjetas automaticas */
    digimons.forEach((digimon)=>{
        posiblesDigimons=`
        <div  class=${digimon.tarjetaName}>
            <input type ="radio" name="digimonsito" id=${digimon.nombre} value=${digimon.color}>
            <label for=${digimon.nombre} id=${digimon.label}>
                <div id=${digimon.divName}>${digimon.nombre}</div>
                <img src=${digimon.imagen} alt=${digimon.nombre}>
            </label>
        </div>
        `;

        tarjetasDigimons.innerHTML+=posiblesDigimons;//generamos las tarjetas, el '+=' es para que se tengan 
    })
    inputExclaneitor=document.getElementById('Exclaneitor');//leemos los elementos luego de generados
    inputPiplox =document.getElementById('Piplox');
    inputGrover=document.getElementById('Grover');
    inputPyros=document.getElementById('Pyros');
    inputKyros=document.getElementById('Kyros');
    inputRyros=document.getElementById('Ryros');
    /* guardar todas las direcciones de inputs para usar un ciclo */
    inputsDigimons.push(inputExclaneitor, inputPiplox, inputGrover, inputPyros, inputKyros, inputRyros); 
    //esconder boton de reinicio 
    seccionReiniciar.style.display='none';//ocultar boton reinicio
    botonSeleccionar.addEventListener('click',seleccionarDigimonJugador);
    botonreiniciar.addEventListener('click',freiniciarJuego); 
    unirseJuegoEnLinea();
}
function unirseJuegoEnLinea(){
    fetch("http://localhost:8080/unirse").then(function(res){
        //.then sirve para incluir una función para la respuesta asincrona del servidor
        if (res.ok){
            //veficar que se obtuvo la respuesta
            res.text()
            .then(function(respuesta){
                console.log("Este es tu id online",respuesta);//obtener la respuesta en texto
                digimonId=respuesta;//asigamos a una variable el id que obtenemos
            })
        }
    });//se conectara al servidor que especiquemos
    //fetch es una petición asincrona
}
let digimonServidor = null;
function seleccionarDigimonJugador(){
    seccionElegirDigimon.style.display='none';//ocultamos la sección de selecciónar digimon
    let banderaDigimonSeleccionado = false;//variable boleana en false, cuando comience el ciclo cambia a true
    for(let i=0;i<inputsDigimons.length;i++){
        if(inputsDigimons[i].checked == false ){
         
        }else{
            spanjugador.innerHTML=inputsDigimons[i].id;//mostramos el nombre del digimon
            digimonJugador=i;
            digimonJugadorId=digimons[i].nombre;
            banderaDigimonSeleccionado = true;//cambiamos el valor de la variable
           
        }
    }
    if(!banderaDigimonSeleccionado){
        alert('Selecciona un Digimon');//si el valor de la variable es falso, significa que no se ha seleccionado
        freiniciarJuego();
    }
    seleccionarJugadorServidor(digimonJugadorId);
    iniciarMapa();
    /* digimonEnemigoAleatorio();//ejecutamos la funcion */
}
/* Funcion para postear los datos en el servidor */
function seleccionarJugadorServidor(){
    fetch(`http://localhost:8080/digimon/${digimonId}`,{
        method:"post", //metodo post para enviar datos
        //cabecera de la petición
        headers:{
            "Content-Type":"application/json"//tipo de dato enviado y los datos que enviaremos
        }, //valor que enviaremos
        //cuerpo de nuestra peticion que transformaremos como cadena de texto
        body: JSON.stringify({
            digimon : digimonJugadorId//asignamos el id del jugador
        })
    }   
    )


}
function iniciarMapa(){
    digimons.forEach((digimon)=>{
        if(digimon.nombre!=digimonJugadorId){
            
        }else{
            digimon.x=aleatorioNum(0,mapaCanva.width-digimon.ancho);//posicion aleatoria
            digimon.y=aleatorioNum(0,mapaCanva.height-digimon.alto);//posicion aleatoria
        }
    })
    seccionElegirDigimon.style.display='none';//al reiniciar ocultamos la seccion
    seccionSeleccionAtaque.style.display='none';
    seccionCanvas.style.display='flex';//mostra mapa
    document.body.style.height = "100vh"//solucion para que no se mueva el mapa
    intervalo= setInterval(pintarCanva,50);//iniciamos el intervalo
    /* recibe cada cuanto se ejecuta la función en ms 
    y ejecutar continuamente*/

}
let intervalo;
mapaCanva.width = 800;//ancho
mapaCanva.height = 400;//alto
function pintarCanva(){
    digimons.forEach((digimon)=>{
        digimon.x = digimon.x + digimon.velocidadx;//actualizar variable
        digimon.y = digimon.y + digimon.velocidady;
        if(digimon.nombre!=digimonJugadorId){
            
        }else{
            lienzo.clearRect(0,0,mapaCanva.width,mapaCanva.height);
            /* pintar lienzo */
            lienzo.drawImage(
                digimon.mapaFondo,
                0, //esquina SUperior izquierda
                0,
                mapaCanva.width,
                mapaCanva.height
            )
            /* pintarEnemigo(); */
            lienzo.drawImage(
                digimon.digimonCanva,
                digimon.x,
                digimon.y,
                digimon.ancho,
                digimon.alto
            );
            enviarPosicionServidor(digimon.x,digimon.y);
            verificarMovimiento(digimon);
        digimonsEnemigoServer.forEach(function(digimonEnemigo){
            pintarEnemigo(digimonEnemigo);
            verificarMovimiento(digimonEnemigo);
            enviarPosicionServidor(digimonEnemigo.x,digimonEnemigo.y);
        })
            /* verificar movimiento */
            
        }

    })
}
function pintarEnemigo(digi){
    
    lienzo.drawImage(
        digi.digimonCanva,
        digi.x,
        digi.y,
        digi.ancho,
        digi.alto
        ) 

}  
function verificarMovimiento(digimon){
    
    if(digimon.velocidadx == 0 && digimon.velocidady == 0){
    }else{
        revisarColision(digimon.alto,digimon.ancho,digimon);
    }
}
function enviarPosicionServidor(x,y){
    /* pedimos la posición al servidor */
    fetch(`http://localhost:8080/digimon/${digimonId}/posicion`,{
        method: "post", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,//si la clave se llama igual  que el valor, lo abreviamos
            y//en este caso seria y:y, por lo cual solo es y
        })
    }
    ).then(function(res){
        //obtenemos la respuesta del servidor
        if(res.ok){
            //si la respuesta es valida
            res.json() //responder con tipo json
                .then(function({ enemigos }){
                    //pedir la lista enemigos y mostrarla
                    /* creamos enemigos con el servidor */
                    /* Buscar los enemigos segun el id del servidor */
                    digimonsEnemigoServer = enemigos.map(function(enemigo){
                        let enemigoServer = null;
                        const digimonNombre = enemigo.digimon.nombre || " ";//traemos el nombre desde el servidor
                        if (digimonNombre === 'Exclaneitor'){
                            enemigoServer = new Digimons('Exclaneitor', './assets/fuego.png', 5,'labelExclaneitor','exclaneitorName','tarjetaExclaneitor', 'naranja', enemigoId) ;//objeto clase digimon
                        } else if(digimonNombre == 'Piplox'){
                            enemigoServer = new Digimons('Piplox', './assets/agua.png', 5,'labelPiplox', 'piploxName','tarjetaPiplox', 'azul',enemigoId);
                        } else if(digimonNombre== 'Grover'){
                            enemigoServer = new Digimons('Grover', './assets/tierra.png', 5,'labelGrover', 'groverName', 'tarjetaGrover','verde',enemigoId);
                        } else if(digimonNombre == 'Pyros'){
                            enemigoServer = new Digimons('Pyros', './assets/tierraFuego.png', 5,'labelPyros', 'pyrosName', 'tarjetaPyros', 'rojo', enemigoId);
                        } else if(digimonNombre == 'Kyros'){
                            enemigoServer = new Digimons('Kyros', './assets/aguaFuego.png', 5,'labelKyros', 'kyrosName', 'tarjetaKyros', 'morado', enemigoId);
                        } else if(digimonNombre == 'Ryros'){
                            enemigoServer = new Digimons('Ryros', './assets/tierraAgua.png', 5,'labelRyros', 'ryrosName', 'tarjetaRyros', 'lila', enemigoId);
                        }
                        enemigoServer.x = enemigo.x;//asginar posiciones fijas
                        enemigoServer.y = enemigo.y;
                        return enemigoServer;
                }
                    )
                })
        }
    })
    //metodo tipo post

}
console.log(digimonsEnemigoServer);
let nombreEliminar;
function revisarColision(alto,ancho,jugador){
    digimonsEnemigoServer.forEach((enemigo)=>{
        /* verificar que el pokemon no es el mismo que se selecciono */
        if(jugador.nombre==enemigo.nombre){
        }else{
            const arribaEnemigo = enemigo.y;
            const abajoEnemigo =   enemigo.y+alto;
            const derechaEnemigo = enemigo.x+ancho;
            const izquierdaEnemigo = enemigo.x;
            const arribaJugador = jugador.y;
            const abajoJugador =   jugador.y+alto;
            const derechaJugador = jugador.x+ancho;
            const izquierdaJugador = jugador.x;
            if(
                (abajoJugador<arribaEnemigo) ||
                (arribaJugador>abajoEnemigo) ||
                (derechaJugador<izquierdaEnemigo) ||(izquierdaJugador>derechaEnemigo)
            ){
            }else{
                colisionEnemigo(enemigo.nombre);
                enemigoId = enemigo.id;
                detenerMovimientoDefinitivo();
                clearInterval(intervalo);
            }
        }

    })

}
function colisionEnemigo(nombreEnemigo){
    if(nombreEnemigo==undefined){
    }else{
        digimonsEnemigo.forEach((enemigo)=>{
            if(enemigo.nombre!=nombreEnemigo){
            }else{
                seccionCanvas.style.display='none';
                seccionSeleccionAtaque.style.display='flex';
                document.body.style.height = "300vh"
                crearImagenes(nombreEnemigo);
                eliminarDigimonArray(nombreEnemigo);//removemos el digimon
            }
        })
    }


}
function moverDerecha(){
    digimons.forEach((digimon)=>{
        if(digimon.nombre!=digimonJugadorId){
        }else{
            digimon.velocidadx = 5;//movimiento
            pintarCanva();
        }
    })
}
function moverIzquierda(){
    digimons.forEach((digimon)=>{
        if(digimon.nombre!=digimonJugadorId){
        }else{
            digimon.velocidadx = -5;//movimiento
            pintarCanva();
        }
    })
}
function moverArriba(){ 
    digimons.forEach((digimon)=>{
        if(digimon.nombre!=digimonJugadorId){
        }else{
            digimon.velocidady = -5;//movimiento
            pintarCanva();
        }
    })
}
function moverAbajo(){
    digimons.forEach((digimon)=>{
        if(digimon.nombre!=digimonJugadorId){
        }else{
            digimon.velocidady =5;//movimiento
            pintarCanva();
        }
    })
}

/* Se detecta un evento, si se presiona una tecla en especifico se ejecuta la funcion */
function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}
function pausarMovimiento(){
    digimons.forEach((digimon)=>{
        if(digimon.nombre!=digimonJugadorId){
            
        }else{
            digimon.velocidadx = 0;
            digimon.velocidady = 0;
        }
    })
}
function detenerMovimientoDefinitivo() {
    digimons.forEach((digimon) => {
        if (digimon.nombre === digimonJugadorId) {
            digimon.velocidadx = 0; // Detener movimiento en el eje x
            digimon.velocidady = 0; // Detener movimiento en el eje y
        }
    });
}

function eliminarDigimonArray(nombreEnemigo){
    if (nombreEnemigo==undefined) {
    }else{
    for(let i=0;i<digimonsEnemigo.length;i++){
        if(digimonsEnemigo[i].nombre!=nombreEnemigo){
        }else{
            digimonsEnemigo.splice(i,1);//indice a aliminar, numero de elementos a eliminar
        }
    }
    }
}
//funcion para crear imagenes
function crearImagenes(digimonEnemigo){
    //limpiar seccion de imagenes
    seccionImgEnemigo.innerHTML='';
    seccionImgJugador.innerHTML='';
    // Limpia cualquier imagen existente antes de agregar una nueva
    let  imgEnemigo, imgJugador;
    for(let i=0;i<digimons.length;i++){
        /* crear digimon para jugador */
        if(digimonJugador==i){
            imgJugador=document.createElement('img');
            imgJugador.src=digimons[i].imagen;
            imgJugador.alt=digimons[i].nombre;
            seccionImgJugador.appendChild(imgJugador);
            spanJugadorNameDigimon.innerHTML= digimons[i].nombre;
            seccionImgJugador.style.display='flex';
            spanJugadorNameDigimon.style.display='flex';
        }
        /* crear digimon para enemigo */
        if(digimonEnemigo==digimons[i].nombre){
            imgEnemigo=document.createElement('img');
            imgEnemigo.src=digimons[i].imagen;
            imgEnemigo.alt=digimons[i].nombre;
            seccionImgEnemigo.appendChild(imgEnemigo);
            spanEnemigoNameDigimon.innerHTML= digimons[i].nombre;
            seccionImgEnemigo.style.display='flex';
            spanEnemigoNameDigimon.style.display='flex';
            spanEnemigo.innerHTML=digimons[i].nombre;
        }
    }
    /* crear colores */
    colorDigimonSeleccionado(digimonEnemigo);
}
function colorDigimonSeleccionado(idEnemigo){
    /* seccion para el jugador */
    let banderaDigimonSeleccionado = false;
    for(let i=0; i<digimons.length;i++){
        if(inputsDigimons[i].checked){
            jugadorColor.style.backgroundColor= coloresDigimon[digimons[i].color]
            colorVidasJugador.style.backgroundColor=coloresDigimon[digimons[i].color]; 
            colorSecuenciaJugador=coloresDigimon[digimons[i].color];
            banderaDigimonSeleccionado = true;
        }
    }
    if(!banderaDigimonSeleccionado){
    }
    /* seccion para el enemigo */
    let banderaDigimonEnemigoSeleccion = false;
    //aca se reemplaza el valor de idEnemgio por un real, entonces generamos una variable para corregirlo
    for(let i=0; i<digimons.length;i++){
        if(idEnemigo==digimons[i].nombre){
            enemigoColor.style.backgroundColor= coloresDigimon[digimons[i].color];
            colorVidasEnemigo.style.backgroundColor=coloresDigimon[digimons[i].color];
            colorSecuenciaEnemigo=coloresDigimon[digimons[i].color]; 
            banderaDigimonEnemigoSeleccion = true;
            //ejecutar funcion
            let nombreEnemigo=digimons[i].nombre;//restablece el nombre del enemigo
            extraerAtaques(digimonJugadorId,nombreEnemigo);
        }
    } 
    if(!banderaDigimonEnemigoSeleccion){
    }


}
function extraerAtaques(nameJugador,nameEnemigo){
    for(let i=0;i<digimons.length;i++){
        if(nameJugador!=digimons[i].nombre){
        }
        else{
            ataquesDigimon=digimons[i].ataques;//asignar posicion a cada ataque
        }
    }
    for(let i=0;i<digimons.length;i++){
        if(nameEnemigo!=digimons[i].nombre){
            
        }else{
            ataquesEnemigo=digimons[i].ataques;
        }
    }
    ataquesJugador(ataquesDigimon);
    nombreEliminar=nameEnemigo;
    vidasDigimons(nameJugador,nameEnemigo);

}
function vidasDigimons(nameJugador, NameEnemigo){
    digimons.forEach((digimon)=>{
        if(nameJugador!=digimon.nombre){
            
        }else{
            vidasJugador=digimon.vida;
            console.log(vidasJugador);
        }
    })
    digimonsEnemigo.forEach((digimon)=>{
        if(NameEnemigo!=digimon.nombre){
            
        }else{
            vidasEnemigo=digimon.vida;
            console.log(vidasEnemigo);
        }
    })
    imprimirEmojis();//imprimir emojis
}
/* ataques jugador */
function ataquesJugador(arrayAtaques){
    arrayAtaques.forEach((arrayAtaque)=>{
        if(arrayAtaque!=null){
            botonesAtaques=`
            <button id=${arrayAtaque.id} class="ataquesDigimon  ${arrayAtaque.tipo}">${arrayAtaque.nombre}</button>`;
            //al separar class con espacio, se convierten una nueva clase para el boton
            botonesAtaqueDiv.innerHTML+=botonesAtaques;//insertar botones
            idBotones.push(arrayAtaque.id);//empuja id al array
            
        }
    }); //se generan 3 nodeList
    let bFuego=document.querySelectorAll('.tipo-fuego');//seleccionamos tipo-fuego
    let bAgua=document.querySelectorAll('.tipo-agua');//tipo-agua
    let bTierra=document.querySelectorAll('.tipo-tierra');//tipo-tierra
    botonesFuego=Array.from(bFuego);//pasamos de nodelist a array
    botonesAgua=Array.from(bAgua);
    botonesTierra=Array.from(bTierra);
    botones.push(botonesFuego,botonesAgua,botonesTierra);
    secuenciaAtaque(botones);
}
function secuenciaAtaque(arrayBotones){
    seccionReiniciar.style.display='none';
    botonReiniciarOcultar.style.display='none';
/*     desactivar botones usados
    generamos un forEach para descartar elementos Vacios, indefinidos o nulos */
     arrayBotones.forEach((array)=>{
        if(array !== null && array!== undefined && array!== ''){
            //inciamos otro forEach para generar un evento por cada boton
            array.forEach((boton)=>{
                botonesActivar.push(boton);//array para volver a activar el boton
                    boton.addEventListener('click', (e)=>{
                        tipos.forEach((tipo)=>{
                            //se verifica cada tipo de botonA
                            if(boton.classList.contains(tipo)){
                                secuenciaJugadorNombres.push(boton.textContent);//extrae el nombre del boton
                                secuenciaJugador.push(tipo);//extrae el tipo del boton
                                enviarAtaqueServer();
                                fAtaquesJugador(secuenciaJugadorNombres,secuenciaJugador);
                                boton.disabled=true;//desabilita el boton
                                botonesActivar.push(boton);
                                for(let i=0;i<array.length;i++){
                                    boton.style.backgroundColor=colorDesactivado[tipo];//verifica segun el tipo el boton
                                }
                                verificarSecuencia();
                            }
                            
                        })
                    })  
            })
            
        }

    })


}
//funcion para simplificar el ataque de enemigo
/* function fAtaquesEnemigo(arrayAtaques){
    seccionSecuenciaEnemgigo.style.display='flex';
    nAtaqueEnemigo=aleatorioNum(arrayAtaques.length-1,0);
    if(arrayAtaques[nAtaqueEnemigo]!=null){
        secuenciaEnemigoNombres.push(arrayAtaques[nAtaqueEnemigo].nombre);//extraer nombres de los ataques
        let imprimirBotonSeleccionado=document.getElementById('secuencia-enemigo');
        imprimirBotonSeleccionado.innerHTML="Enemigo Elige: "+secuenciaEnemigoNombres;//mostrar la elección del enemigo
        secuenciaEnemigo.push(arrayAtaques[nAtaqueEnemigo].tipo);//extraer tipos de los ataques
        imprimirBotonSeleccionado.style.backgroundColor=colorSecuenciaEnemigo;//color de la secuencia del enemigo
    }


} */
function fAtaquesJugador(arrayAtaquesNombre){
    seccionSecuenciaJugador.style.display='flex';
    let imprimirBotonSeleccionado=document.getElementById('secuencia-jugador');
    imprimirBotonSeleccionado.innerHTML="Jugador Elige: "+arrayAtaquesNombre;//mostrar la elección del enemigo
    imprimirBotonSeleccionado.style.backgroundColor=colorSecuenciaJugador;//color de la secuencia del enemigo

}
function limpiarArreglo(array){
    let arregloTemporal= new Set(array);//eliminamos los duplicados
    let arraySalida=Array.from(arregloTemporal);
    return arraySalida;//pasamos de set a array
}
function verificarSecuencia(){
    let i=0;
    if (secuenciaJugador.length===4){
        seccionReiniciar.style.display='flex';
        let imprimirBotonSeleccionado=document.getElementById('resultado-final-batalla');//se crea un nuevo parrafo con la secuencia del 
        let parrafo=document.createElement('p');//creamos parrafo del enemigo
        parrafo.innerHTML="Enemigo Elige: "+secuenciaEnemigoNombres;//mostrar la elección del enemigo
        parrafo=document.createElement('p');//se crea un nuevo parrafo
        imprimirBotonSeleccionado.appendChild(parrafo);
        banderaSecuencia = true; 
        botonesActivarFiltrado=limpiarArreglo(botonesActivar);//agragamos aca la funcion para que se guarden los arreglos
        revisarVidas();//reviso vidas
        seccionConfirmarAtaque.style.display='flex';//Mostramos si confirmamos o cancelamos ataque
        i++;

    }
    if(i===1){
        eliminarParrafos();
    }
    confirmarAtaque();
}
function eliminarParrafos(){
    let parrafoJugador=ataqueJugadorDiv.getElementsByTagName('p');//obtener parrafos
    for (let i = 0; i < parrafoJugador.length; i++) {
        ataqueJugadorDiv.removeChild(parrafoJugador[i]);
        ataqueJugadorDiv.innerHTML='';
        
    }
    let parrafoEnemigo=ataqueEnemigoDiv.getElementsByTagName('p');
    for (let i = 0; i < parrafoEnemigo.length; i++) {
        ataqueEnemigoDiv.removeChild(parrafoEnemigo[i]);
        ataqueEnemigoDiv.innerHTML='';
    }
    resultadoBatallaParrafo.innerHTML='';

}
function confirmarAtaque(){
    botonConfirmar = document.getElementById("boton-confirmar");
    botonCancelar = document.getElementById("boton-cancelar");
    botonConfirmar.addEventListener('click',crearBatalla);//iniciamos la batalla si se confirma el ataque
    botonCancelar.addEventListener('click',reseleccionar);//cancelar la batalla
}
function enviarAtaqueServer(){
    /* enviamos el arreglo con la secuencia de ataques del jugador */
    fetch(`http://localhost:8080/digimon/${digimonId}/ataques`,{
        method : "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques : secuenciaJugador

        })
    })
    /* recibir ataques del jugador enemigo */
    intervalo = setInterval(obtenerAtaquesEnemigoServer, 50);//consulta constantemente si tenemos los ataques del enemigo
}
function obtenerAtaquesEnemigoServer(){
    fetch(`http://localhost:8080/digimon/${digimonEnemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                .then(function({ataques}){
                    if(ataques.length !=5){

                    } else{
                        ataqueEnemigo = ataques;
                        console.log(ataqueEnemigo);
                        crearBatalla();
                    }
                })
            }
        })
}
function reseleccionar(){

    seccionConfirmarAtaque.style.display='none';//no mostrammos la seccion
    botonesActivarFiltrado.forEach((boton)=>{
        if(boton.disabled==true){
            boton.disabled=false;
        }
    })
    botonesActivarFiltrado.forEach((boton)=>{
        /* logica-> la secuencia jugador tiene 4 tipos, si el tipo del jugador elegido coincide con el del boton, entonces restaura su color */
        for(let i=0;i<botonesActivarFiltrado.length;i++){
            if (boton.classList.contains(secuenciaJugador[i])){
                boton.style.backgroundColor=colorActivado[secuenciaJugador[i]];//restauramos el color
            }
        }
    })
    vaciarArraysecuencias();
    enviarAtaqueServer();
    seccionSecuenciaEnemgigo.style.display='none';//no mostrammos la seccion

}
function vaciarArraysecuencias(){
    botonesActivarFiltrado=[];
    secuenciaJugador=[], secuenciaJugadorNombres=[];//vaciamos las secuencias
    secuenciaEnemigo=[], secuenciaEnemigoNombres=[];
}
//actualizar mensajes de batalla
function crearBatalla(){
    clearInterval(intervalo);//limpiamos intervalo
    seccionSecuenciaJugador.style.display='none';//ocultamos la seccion nueva
    let resultado;//muestra si se gano, perdio o empato
    let ganaJugador=" fue efectivo "
    let ganaEnemigo=" no efectivo "
    for(let i=0;i<secuenciaJugador.length;i++){
        if(secuenciaJugador[i]===secuenciaEnemigo[i]){
            resultado=' no afecto ';
            crearMensajesFuncion(secuenciaJugadorNombres[i],secuenciaEnemigoNombres[i],resultado);
        }else if(secuenciaJugador[i]===tipos[1] && secuenciaEnemigo[i]===tipos[0]){
            resultado=ganaJugador;
            vidasEnemigo--;
            crearMensajesFuncion(secuenciaJugadorNombres[i],secuenciaEnemigoNombres[i],resultado);
        }else if(secuenciaJugador[i]===tipos[0] && secuenciaEnemigo[i]===tipos[2]){
            resultado=ganaJugador;
            vidasEnemigo--;
            crearMensajesFuncion(secuenciaJugadorNombres[i],secuenciaEnemigoNombres[i],resultado);
        } else if(secuenciaJugador[i]===tipos[2] && secuenciaEnemigo[i]===tipos[1]){
            resultado=ganaJugador;
            vidasEnemigo--;
            crearMensajesFuncion(secuenciaJugadorNombres[i],secuenciaEnemigoNombres[i],resultado);
        }else{
            resultado=ganaEnemigo;
            vidasJugador--;
            crearMensajesFuncion(secuenciaJugadorNombres[i],secuenciaEnemigoNombres[i],resultado);
        }
    }
    reseleccionar();//limpiamos el array
}
function crearMensajesFuncion(jugador,enemigo, resultadoB){
    let parrafoAtaquesJugador=document.createElement('p');//se crea un nuevo parrafo
    let parrafoAtaquesEnemigo=document.createElement('p');//se crea un nuevo parrafo
    let parrafoResultadoBatalla=document.createElement('p');//se crea un nuevo parrafo
    parrafoAtaquesJugador.innerHTML="Tu Digimon ataco con "+jugador;
    parrafoAtaquesEnemigo.innerHTML="El rival ataco con "+enemigo;//se agrega el parrafo
    parrafoResultadoBatalla.innerHTML='Tu ataque '+jugador+' '+resultadoB+' contra '+enemigo;//se agrega el parrafo
    seccionReiniciar.style.display='flex';
    ataqueJugadorDiv.appendChild(parrafoAtaquesJugador);
    ataqueEnemigoDiv.appendChild(parrafoAtaquesEnemigo);
    resultadoBatallaParrafo.appendChild(parrafoResultadoBatalla);//se agrega el parrafo
    imprimirEmojis();//imprimir emojis
    revisarVidas(vidasJugador,vidasEnemigo);//reviso vidas 
}
//calcula las vidas disponibles
function imprimirEmojis(){
    /* añado una funcion para imprimir el numero de veces que haya de vidas el emoji */

    emojiVidas1=emojiVidasJugador.repeat(vidasJugador);
    emojiVidas2=emojiVidasEnemigo.repeat(vidasEnemigo);
    conteoVidas();
}
function conteoVidas(){
    /* ciclo para mostrar emojis segun el resto de vidas restantes */
    spanVidasJugador.innerHTML = emojiVidas1;
    spanVidasEnemigo.innerHTML = emojiVidas2;
}
//revisar vidas tras cada batalla
function revisarVidas(vidasJ,vidasE){
    if(digimonsEnemigo.length != 5){
        if (vidasE == 0){
            volverAlMapa();
            
    
        } else if(vidasJ == 0){
    /*         finDeJuego("¡Lo siento Perdiste!");  */
            volverAlMapa();
        }
    }else{
        finDeJuego("¡Felicidades Ganaste!");
    }

}
function volverAlMapa(){
    limpiarSecciones();
    eliminarParrafos();
    iniciarMapa();


}
/* Remover seccion Batalla, elimina imagenes y botones */
function limpiarSecciones(){
    desactivarBotones();   
    seccionSeleccionAtaque.children[3].innerHTML='';//quitar datos de la seccion de imagenes
    vidasEnemigo=0; vidasJugador=0;//reiniciamos las vidas  
    imprimirEmojis();//imprimir emojis
}

function mostrarSecciones(){
    seccionReiniciar.style.display='flex';//ponemos el estilo tipo flex 
    botonReiniciarOcultar.style.display='flex';
    seccionConfirmarAtaque.style.display='none';
    seccionSecuenciaEnemgigo.style.display='none';
}
//pide el resultado final
function finDeJuego(resultadoFinal){
    mostrarSecciones();
    
    resultadoBatallaParrafo.innerHTML=resultadoFinal;//agregamos al parrfo de resultados el resultado final
    desactivarBotones();
}

/* funcion para desactivar los botones al finalizar partida */
function desactivarBotones(){
    botonSeleccionar.disabled = true;//desabilita botones
    seccionConfirmarAtaque.style.display='none';//no mostrammos la seccion
    botonesActivarFiltrado.forEach((boton)=>{
        if(boton.disabled==false){
            boton.disabled=true;
        }
    })
    botonesActivarFiltrado.forEach((boton)=>{
        /* logica-> la secuencia jugador tiene 4 tipos, si el tipo del jugador elegido coincide con el del boton, entonces restaura su color */
        for(let i=0;i<botonesActivarFiltrado.length;i++){
            if (boton.classList.contains(secuenciaJugador[i])){
                boton.style.backgroundColor=colorDesactivado[secuenciaJugador[i]];//restauramos el color
            }
        }
    })
    botones=[];//vaciamos el array de botones
    botonesAtaques=[];//vaciamos el array de botones de ataque
    botonesActivarFiltrado=[];
    secuenciaJugador=[], secuenciaJugadorNombres=[];//vaciamos las secuencias
    secuenciaEnemigo=[], secuenciaEnemigoNombres=[];
    seccionSecuenciaEnemgigo.style.display='none';//no mostrammos la seccion
}
/* funcion para reiniciar el juego */
function freiniciarJuego(){
    location.reload();//recargar la pagina
}
window.addEventListener('load', comienzoJuego);//cargar todo el documeento y que nos avise el navegador