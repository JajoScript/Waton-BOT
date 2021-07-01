// Dependencias.
const {readdirSync} = require("fs");

// Definición clase: Controlador de archivos.
class Controlador {
	lector_comandos(Cliente){
		// Leer y filtrar los archivos del directorio eventos.
		const archivos_comandos = readdirSync("./comandos").filter(archivo => archivo.endsWith(".js"));
		let numeroComandos = 0;
		
		// Ciclo para leer cada archivo del directorio.
		for (const archivo of archivos_comandos){
			// Cargando el archivo.
			const comando = require(`./comandos/${archivo}`);

			// Cargando el comando en la colección.
			Cliente.comandos.set(comando.nombre, comando);

			// Depuración.
			console.log(`[BOT][COMMAND] Cargado el comando: ${comando.nombre}!`);
			numeroComandos++;
		}

		console.log(`[BOT][COMMAND] Se cargaron ${numeroComandos} comandos!`);
	};

	lector_eventos(Cliente){
		// Leer y filtrar los archivos del directorio eventos.
		const archivos_eventos = readdirSync("./eventos").filter(archivo => archivo.endsWith(".js"));
		let numeroEventos = 0;

		// Ciclo para leer cada archivo del directorio.
		for (const archivo of archivos_eventos){
			const evento = require(`./eventos/${archivo}`);
			
			// Separando los eventos de tipo "once".
			if (evento.simple) {
				Cliente.once(evento.nombre, (...args) => evento.ejecutar(...args, Cliente));
				
			} else {
				Cliente.on(evento.nombre, (...args) => evento.ejecutar(...args, Cliente));
			}
			console.log(`[BOT][EVENTS] Cargado el evento: ${evento.nombre}!`);
			numeroEventos++;
		}

		console.log(`[BOT][EVENTS] Se cargaron ${numeroEventos} eventos!`);
	}
}

// Exportación.
module.exports = Controlador;