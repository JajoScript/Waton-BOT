const { MessageEmbed } = require("discord.js");

module.exports = {
    nombre: 'ping',
    descripcion: 'Te responde con el ping del bot!',
    ejecutar(mensaje, argumentos){
        // Variables para el comando.
        let ping = Math.floor(mensaje.client.ws.ping);

        let mensaje_personalizado = new MessageEmbed()
            .setTitle("Ping")
            .setDescription(`:satellite: Pong! **${ping}** ms.`)

        if (ping > 300){
            mensaje_personalizado.setColor(0xff0000);
        } else if (ping > 150) {
            mensaje_personalizado.setColor(0xffcc00);
        } else {
            mensaje_personalizado.setColor(0x66ff66);
        }

        // Envio del mensaje.
        mensaje.channel.send(mensaje_personalizado);
    }
};