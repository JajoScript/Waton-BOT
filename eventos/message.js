// Importando configuraciones y dependencias.
const usuarios = require("../configuraciones/usuarios.json");

module.exports = {
	nombre: "message",
	simple: false,
	ejecutar(mensaje, cliente) {
		// Captura de datos.
		let contenido = mensaje.content.toLowerCase();
		let usuarioNombre = mensaje.author.username;
		let usuarioID = mensaje.author.id;
		let rolPayaso = mensaje.guild.roles.cache.find((rol) => rol.name === "Payaso");
		console.log(`[BOT][EVENT:${this.nombre}] @${usuarioNombre} : ${contenido}`);
		
		

		// Mensajes por defecto.
		if (contenido.toLowerCase() === "gd"){
			mensaje.reply("Buenos dias!");
		}else if(contenido.toLowerCase() === "gn"){
			mensaje.reply("Buenas noches!");
		} else if(contenido.toLowerCase() === "te amo"){
			mensaje.reply("Yo te amo más!");
		} else if(contenido.toLowerCase() === "quien es tu dios?"){
			mensaje.reply("Watica es mi dios 🥵");
		} else if(contenido.toLowerCase() === "quien es tu creador?"){
			mensaje.channel.send(`Mi creador es <@${usuarios.Jajo.id}>`);
		} else if(contenido.toLowerCase() === "quien es el mas weon?"){
			mensaje.reply(`El más weon es el <@${usuarios.Alonso.id}>`);
		}
		
		// Control para el rol de "Payaso".
		if (!rolPayaso) {
			console.log(`[BOT][EVENT:${this.nombre}][CLOWN:ERROR] No existe el rol \"Payaso\".`);

		}else {
			if(mensaje.member.roles.cache.has(rolPayaso.id) && usuarioID !== usuarios.Jajo.id){
				console.log(`[BOT][EVENT:${this.nombre}][CLOWN] Se agrego la reacción.`);

				mensaje.react("🤡")
					.catch(error => {
						console.log(error)
						console.log(`[BOT][EVENT:${this.nombre}][CLOWN:ERROR]  No se tienen los permisos para realizar esta acción`);
					});
			}
		}

		// Filtros contra bots.
		if(!mensaje.content.startsWith(process.env.DISCORD_PREFIX || "*")){ return; };
		if(mensaje.author.bot){ return; };

		// Definición de argumentos y comandos.
		const argumentos = mensaje.content.slice(process.env.DISCORD_PREFIX.length).trim().split(/ +/g);
		const nombreComando = argumentos.shift().toLowerCase();

		// Depuración del mensaje.
		console.log(`[BOT][EVENT:${this.nombre}] Contenido: ${contenido}`);
		console.log(`[BOT][EVENT:${this.nombre}] Argumentos: ${argumentos}`);
		console.log(`[BOT][EVENT:${this.nombre}] Comandos: ${nombreComando}`);

		// Control de errores.
		if(!cliente.comandos.has(nombreComando)) {
			console.log(`[BOT][EVENT:${this.nombre}] No existe el comando ${nombreComando}`);
			return
		};

		try {
			// Enviamos al archivo comando la instancia mensaje con los argumentos del comando.
			cliente.comandos.get(nombreComando).ejecutar(mensaje, argumentos);

		} catch(error){
			console.log(`[BOT][EVENT:${this.nombre}] Problema al ejecutar el comando.`);
			mensaje.reply(`Tengo problemas para ejecutar el comando: ${nombreComando}`);
			console.log(error);
		}
	}
};