// Dependencias.
const {readdirSync, copyFileSync} = require('fs');

// Definición clase: Controlador de archivos.
class Controlador {
    lector_comandos(cliente){
        // Ciclo para leer los archivos contenedores de los comandos.
        let iteracion = 0;
        for (const archivo of readdirSync(`./comandos/`)){
            // Filtro para leer archivos.
            if (archivo.endsWith('.js')){
                let nombre_archivo = archivo.substring(0, (archivo.length - 3));
                let contenido_archivo = require(`./comandos/${archivo}`);

                cliente.comandos.set(nombre_archivo, contenido_archivo);
                iteracion++;
                console.log(`[BOT] comando: ${nombre_archivo} cargado!`);
            };
        };

        console.log(`[BOT] Comandos totales cargados: ${iteracion}`);
    };

    lector_eventos(cliente){
        // Ciclo para leer los archivos contenedores de los eventos.
        let iteracion = 0;
        for (const archivo of readdirSync(`./eventos/`)){
            // Filtro para leer archivos.
            if (archivo.endsWith('.js')){
                let nombre_archivo = archivo.substring(0, (archivo.length - 3));
                let contenido_archivo = require(`./eventos/${archivo}`);

                cliente.on(nombre_archivo, contenido_archivo.bind(null, cliente));
                iteracion++;
                console.log(`[BOT] Evento: ${nombre_archivo} cargado!`);

                // Limpieza de cache.
                delete require.cache[require.resolve(`./eventos/${archivo}`)];
            };
        };

        console.log(`[BOT] Eventos totales cargados: ${iteracion}`);
    };
}

// Exportación.
module.exports = Controlador;