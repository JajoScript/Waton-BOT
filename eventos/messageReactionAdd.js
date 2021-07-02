// Importando configuraciones y dependencias.
const usuarios = require("../configuraciones/usuarios.json");

module.exports = {
	nombre: "messageReactionAdd",
	simple: false,
	ejecutar(mensajeReaccionado, usuario, Cliente) {
		// Depuración
		console.log(`[BOT][EVENT:${this.nombre}] Reaccionaron a un mensaje.`);

		// Usuario maestro 😎.
		let autorID = mensajeReaccionado.message.author.id;
		let autorNombre = mensajeReaccionado.message.author.username;

		// Eliminando las reacciones.
		if (autorID === usuarios.Jajo.id){
			mensajeReaccionado.remove();
			console.log(`[BOT][EVENT:${this.nombre}] Se eliminaron las reacciones.`);
		}
	}
};