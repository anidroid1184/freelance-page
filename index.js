/* código que ayuda a json */
const express = require("express");// importar las librerias instaladas con npm
const cors = require("cors");//importamos la libreria para configuarar las direcciones del servidor
const app = express();//recibe y responde peticiones HTTP, declarada como funcion
app.use(cors());//usamos la libreria cors
app.use(express.json());//admitimos el uso de objetos tipo JSOn
//admitimos las peticiones  tipo post
const jugadores = []; //lista de jugadores
class Jugador {
    constructor(id){
        this.id= id;
    }
    asignarDigimon(digimon){
        this.digimon = digimon;
    }
    actualizarPosicion(x,y){
        this.x = x;
        this.y = y;
    }
    asignarAtaques(ataques){
        this.ataques = ataques;
    }
}
class Digimon{
    constructor(nombre){
        this.nombre = nombre;
    }
}
//incia servidor en el puerto 8080
//lo que este en "" sera la dirección adicional del local host
app.get("/unirse", (req, res)=>{
    const id = `${Math.random()}` //genera número de id aleatoreo para cada jugador
    const jugador = new Jugador(id);//define una variable con la clase jugador
    jugadores.push(jugador);//añade el jugador a el array
    /* cabecera */
    res.setHeader("Access-Control-Allow-Origin","*");
    res.send(id);//devuelve el id
    console.log(jugadores);
})
/* Recibir nombre de digimon elegido */
//añadimos un nuevo url para recibir peticiones y postear lo que el jugador selecciono
app.post("/digimon/:jugadorId",(req,res)=>{
    //definimos el id del jugador que obtendra los parametros de nuestra variable jugadorId
    const jugadorId = req.params.jugadorId || "";// o muestra una lista vacia
    //aca ingresamos el identificador de la variable
    const nombre = req.body.digimon || "";//captamos el nombre del digimon seleccionado
    const digimon = new Digimon(nombre); //definir digimon como clase Digimon con el nombre obtenido
    const jugadorIndex = jugadores.findIndex((jugador)=>jugadorId === jugador.id);//si en la URL se encuentra qu eel jugadorId que obtuvimos es igual a el del objeto, retorna un valor != -1
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarDigimon(digimon);
    }
    res.end();//respuesta del servidor si no encuentra nada
    console.log(digimon)
})
/* recibir coordenadas */
app.post("/digimon/:jugadorId/posicion",(req,res)=>{
    //obtener nombre de digimon
    const jugadorId = req.params.jugadorId || "";// o muestra una lista vacia
    const x = req.body.x || 0;//obtenemos la posición en x del código
    const y = req.body.y || 0;//obtenemos la posición en y del código
    const jugadorIndex = jugadores.findIndex((jugador)=>jugadorId === jugador.id);
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y);
    }
    /* Usamos la misma lógica anterior para obtener las posiciones del digimon */
    const enemigos = jugadores.filter((jugador)=>jugadorId != jugador.id);
    res.send({
        enemigos,
    });//devuelve los enemigos y sus coordenadas en un tipo json
    console.log(enemigos);
})
app.post("/digimon/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId || "";// o muestra una lista vacia
    const ataques =  req.body.ataques || [];
    const jugadorIndex = jugadores.findIndex((jugador)=>jugadorId === jugador.id);
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end();
})
/* recibir los datos del servidor */
app.get("/digimon/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId || "";// o muestra una lista vacia
    const jugador = jugadores.find((jugador) => jugador.id == jugadorId);
    res.send({
        ataques: jugador.ataques || [],
    })
    console.log(ataques);
})
app.listen(8080,()=>{
    console.log("servidor corriendo en el puerto 8080")
})