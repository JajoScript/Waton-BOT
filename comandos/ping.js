module.exports = {
    nombre: 'ping',
    descripcion: 'Te responde el ping!',
    ejecutar(mensaje, argumentos){
        mensaje.channel.send("Pong!");
    }
}