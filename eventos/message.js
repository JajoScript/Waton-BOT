// Importando configuraciones y dependencias.
const usuarios = require("../configuraciones/usuarios.json");

module.exports = (cliente, mensaje) => {
    console.log("[BOT][EVENT] Se envio un mensaje. ");

    // Captura de datos.
    let contenido = mensaje.content.toLowerCase()
    let usuario_nombre = mensaje.author.username
    let usuario_id = mensaje.author.id
    
    let rol_payaso = mensaje.guild.roles.cache.find((rol) => {
        return rol.name === "Payaso";
    });

    // Control de rol payaso
    if (!rol_payaso) {
        console.log("[BOT][CLOWN] ERROR: No existe el rol 'Payaso'.");
    }else {
        if(mensaje.member.roles.cache.has(rol_payaso.id)){
            console.log("[BOT][CLOWN] Se agrego la reacción.");
            mensaje.react('🤡')
                .catch(error => {
                    console.log(error)
                    console.log("[ERROR] No se tienen los permisos para realizar esta acción");
                });
        }
    }

    // Mensajes por defecto
    if (contenido == "gd"){
        mensaje.reply("Buenos dias!");
    }else if(contenido == "gn"){
        mensaje.reply("Buenas noches!");
    }


    // Filtros.
    if(!mensaje.content.startsWith(process.env.DISCORD_PREFIX || "*")) return;
    if(mensaje.author.bot) return;

    // Definición de argumentos y comandos.
    const argumentos = mensaje.content.slice(process.env.DISCORD_PREFIX.length).trim().split(/ +/g);
    const comandos = argumentos.shift().toLowerCase();
    console.log(`[MSG] Contenido: ${contenido}`);
    console.log(`[MSG] Argumentos: ${argumentos}`);
    console.log(`[MSG] Comandos: ${comandos}`);
};