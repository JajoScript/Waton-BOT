// Dependencias.
const { MessageEmbed, Message } = require('discord.js');

// Definiendo el estado.
module.exports = {
   nombre: "help",
   descripcion: "Comando para mostrar la lista y funcionalidad de cada comando",
   disponible: true,
   ejecutar(mensaje, argumentos) {
      // Variables internas del comando.
      const mensajesAyuda = [];
      const { comandos } = mensaje.client;
      var mensajePersonalizado = new MessageEmbed()
         .setColor("RANDOM")
         .setTitle("π‘ Lista de comando!")

      if(!argumentos.length){
         mensajesAyuda.push("π AquΓ­ tienes la lista de comandos π");
         mensajesAyuda.push("π ---------------------------------π");
         comandos.map(comando => {
            if (comando.disponible){
               mensajesAyuda.push(`π£ Comando:  **${comando.nombre}**\n       π§ DescripciΓ³n: *${comando.descripcion}*`)
            }
         });
         mensajesAyuda.push("π ---------------------------------π");
         mensaje.author.send(mensajesAyuda, {split: true})
            .then(() => {
               // Filtro para el no uso del chat privado.
               if(mensaje.channel.type === "dm") return;
               mensaje.reply("Te envie los comandos por interno! π");
            })
            .catch((err) => {
               console.log(err);
               mensaje.reply("Tal parece que no puedo enviarte los comandos por interno π€");
            });

         
      }
   }
}