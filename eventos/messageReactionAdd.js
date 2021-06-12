// Importando configuraciones y dependencias.
const usuarios = require("../configuraciones/usuarios.json");

module.exports = (cliente, messageReaction, usuario) => {
    console.log("[DEV] reaccionaron a algo");
    console.log(messageReaction)

    let autor_id = messageReaction.message.author.id
    let autor_nombre = messageReaction.message.author.username

    console.log(`[DEV] [${autor_id}] : ${autor_nombre}`)
    if (autor_id == usuarios.Jajo.id){
        messageReaction.remove()
        console.log("[DEV] Se eliminaron las reacciones");
    }
};