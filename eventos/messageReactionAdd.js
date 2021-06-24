// Importando configuraciones y dependencias.
const usuarios = require("../configuraciones/usuarios.json");

module.exports = {
    nombre: 'messageReactionAdd',
    simple: false,
    ejecutar(mensajeReaccionado, usuario, Cliente) {
        // Depuración
        console.log(`[BOT][EVENT:${this.nombre}] Reaccionaron a un mensaje.`);

        // Usuario maestro 😎.
        let autor_id = mensajeReaccionado.message.author.id
        let autor_nombre = mensajeReaccionado.message.author.username

        // Eliminando las reacciones.
        if (autor_id == usuarios.Jajo.id){
            mensajeReaccionado.remove()
            console.log(`[BOT][EVENT:${this.nombre}] Se eliminaron las reacciones.`);
        }
    }
};