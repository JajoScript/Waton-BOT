// Dependencias.
const {readdirSync} = require('fs');

// Definición clase: Controlador de archivos.
class Controlador {
    lector_comandos(Cliente){
        // Leer y filtrar los archivos del directorio eventos.
        const archivos_comandos = readdirSync('./comandos').filter(archivo => archivo.endsWith('.js'));
        let numero_comandos = 0;
        
        // Ciclo para leer cada archivo del directorio.
        for (const archivo of archivos_comandos){
            // Cargando el archivo.
            const comando = require(`./comandos/${archivo}`);

            // Cargando el comando en la colección.
            Cliente.comandos.set(comando.nombre, comando);

            // Depuración.
            console.log(`[BOT][COMMAND] Cargado el comando: ${comando.nombre}!`);
            numero_comandos++;
        }

        console.log(`[BOT][COMMAND] Se cargaron ${numero_comandos} comandos!`);
    };

    lector_eventos(Cliente){
        // Leer y filtrar los archivos del directorio eventos.
        const archivos_eventos = readdirSync('./eventos').filter(archivo => archivo.endsWith('.js'));
        let numero_eventos = 0;

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
            numero_eventos++;
        }

        console.log(`[BOT][EVENTS] Se cargaron ${numero_eventos} eventos!`);
    }
}

// Exportación.
module.exports = Controlador;