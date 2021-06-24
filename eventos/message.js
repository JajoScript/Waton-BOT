// Importando configuraciones y dependencias.
const usuarios = require("../configuraciones/usuarios.json");

module.exports = {
    nombre: 'message',
    simple: false,
    ejecutar(mensaje, cliente) {
        // Captura de datos.
        let contenido = mensaje.content.toLowerCase()
        let usuario_nombre = mensaje.author.username
        let usuario_id = mensaje.author.id
        let rol_payaso = mensaje.guild.roles.cache.find((rol) => rol.name === "Payaso");
        console.log(`[BOT][EVENT:${this.nombre}] @${usuario_nombre} : ${contenido}`);

        // Mensajes por defecto.
        if (contenido.toLowerCase() == "gd"){
            mensaje.reply("Buenos dias!");
        }else if(contenido.toLowerCase() == "gn"){
            mensaje.reply("Buenas noches!");
        }
        
        // Control para el rol de 'Payaso'.
        if (!rol_payaso) {
            console.log(`[BOT][EVENT:${this.nombre}][CLOWN:ERROR] No existe el rol 'Payaso'.`);

        }else {
            if(mensaje.member.roles.cache.has(rol_payaso.id) && usuario_id != usuarios.Jajo.id){
                console.log(`[BOT][EVENT:${this.nombre}][CLOWN] Se agrego la reacción.`);

                mensaje.react('🤡')
                    .catch(error => {
                        console.log(error)
                        console.log(`[BOT][EVENT:${this.nombre}][CLOWN:ERROR]  No se tienen los permisos para realizar esta acción`);
                    });
            }
        }

        // Filtros contra bots.
        if(!mensaje.content.startsWith(process.env.DISCORD_PREFIX || "*")) return;
        if(mensaje.author.bot) return;

        // Definición de argumentos y comandos.
        const argumentos = mensaje.content.slice(process.env.DISCORD_PREFIX.length).trim().split(/ +/g);
        const nombre_comando = argumentos.shift().toLowerCase();

        // Depuración del mensaje.
        console.log(`[BOT][EVENT:${this.nombre}] Contenido: ${contenido}`);
        console.log(`[BOT][EVENT:${this.nombre}] Argumentos: ${argumentos}`);
        console.log(`[BOT][EVENT:${this.nombre}] Comandos: ${nombre_comando}`);

        // Control de errores.
        if(!cliente.comandos.has(nombre_comando)) {
            console.log(`[BOT][EVENT:${this.nombre}] No existe el comando ${nombre_comando}`);
            return
        };

        try {
            // Enviamos al archivo comando la instancia mensaje con los argumentos del comando.
            cliente.comandos.get(nombre_comando).ejecutar(mensaje, argumentos);

        } catch(error){
            console.log(`[BOT][EVENT:${this.nombre}] Problema al ejecutar el comando.`);
            mensaje.reply(`Tengo problemas para ejecutar el comando: ${nombre_comando}`);
            console.log(error);
        };
    }
};