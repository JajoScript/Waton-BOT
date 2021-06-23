// Importando configuraciones y dependencias.
const usuarios = require("../configuraciones/usuarios.json");

module.exports = (cliente, messageReaction, usuario) => {
    // Depuración.
    console.log("[BOT][EVENT] Reaccionaron a un mensaje");

    // Usuario maestro.
    let autor_id = messageReaction.message.author.id
    let autor_nombre = messageReaction.message.author.username

    console.log(`[BOT] [${autor_id}] : ${autor_nombre}`)
    if (autor_id == usuarios.Jajo.id){
        messageReaction.remove()
        console.log("[BOT] Se eliminaron las reacciones");
    }
};