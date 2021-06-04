// Importando configuraciones y dependencias.
const usuarios = require("../usuarios.json");

module.exports = (cliente, mensaje) => {
    // Captura de datos.
    const contenido = mensaje.content.toLowerCase()
    const usuario_nombre = mensaje.author.username
    const usuario_id = mensaje.author.id

    // Mensajes por defecto
    if (contenido == "gd"){
        mensaje.reply("Buenos dias!");
    }else if(contenido == "gn"){
        mensaje.reply("Buenas noches!");
    }

    if (usuario_id == usuarios.Mauri.id || usuario_id == usuarios.Kapeo.id || usuario_id == usuarios.Gonzalo.id) {
        mensaje.react('🤡')
            .catch(error => console.log(error));
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