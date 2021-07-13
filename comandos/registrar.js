// Dependencias.
const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

module.exports = {
	nombre: "registrar",
	descripcion: "Te registra en la base de datos!",
   disponible: true,
	ejecutar(mensaje, argumentos){
      // Variables del comando.
      let usuarioNick = mensaje.author.username;
      let usuarioID = mensaje.author.id;
      let serverID = mensaje.guild.id;
      let serverName = mensaje.guild.name;

      // Deconstrucción de la fecha.
      if (!argumentos || argumentos.length !== 1){
         mensaje.reply("Es necesario colocar la fecha con el siguiente formato: dia-mes-año, ej: 23-03-2001");
         return;
      }

      let cumpleaños = argumentos[0].split("-"); // 23-03-2001

      if (cumpleaños.length != 3 || cumpleaños[2].length < 4) {
         mensaje.reply("Es necesario colocar la fecha con el siguiente formato: dia-mes-año, ej: 23-03-2001");
         return;
      }

      let miCumpleaños = new Date(cumpleaños[2], (parseInt(cumpleaños[1], 10) - 1) , cumpleaños[0]);

      // Query para buscar a un usuario ya existente en la bd.
      EsquemaUsuario.findOne({ userID : usuarioID})
         .then((esquema) => {
            if(!esquema){
               const nuevoUsuario = new EsquemaUsuario({
                  _id : mongoose.Types.ObjectId(),
                  userID : usuarioID,
                  username: usuarioNick,
                  nacimiento: miCumpleaños,

                  servidores : [{
                     servidorID: serverID,
                     servidorNombre: serverName
                  }]
               });

               // Guardando la información en la base de datos.
               nuevoUsuario.save()
                  .then(() => console.log("[BOT][DB] Se guardaron los cambios en la base de datos!"))
                  .catch((err) => console.log(err));

               console.log(`[BOT][BD] Hay un nuevo usuario: ${usuarioNick} en la base de datos!`);

               // Mensaje de respuesta.
                  let mensajeEmbed = new MessageEmbed()
                  .setColor("BLUE")
                  .setTitle("Base de datos")
                  .setFooter(`🧐 Usuario: ${usuarioNick} agregado a la base de datos!`);

               mensaje.channel.send(mensajeEmbed);
            }
            else {

               // Cargando el nuevo cumpleaños.
               let nuevoCumpleaños = new Date(cumpleaños[2], (parseInt(cumpleaños[1], 10) - 1) , cumpleaños[0]);
               esquema.updateOne({ nacimiento: nuevoCumpleaños })
                  .then(() => console.log("[BOT][DB] Se actualizo la base de datos!"))
                  .catch((err) => console.log(err));

               // Guardando la información de la base de datos.
               esquema.save()
                  .then(() => console.log("[BOT][DB] Se guardaron los cambios en la base de datos!"))
                  .catch((err) => console.log(err));

               // Mensaje de respuesta.
               let mensajeEmbed = new MessageEmbed()
               .setColor("BLUE")
               .setTitle("Base de datos")
               .setFooter(`🧐 Usuario: ${usuarioNick} se actualizaron los datos en la base de datos!`);

               mensaje.channel.send(mensajeEmbed);
            }
         }
         
         )
         .catch((err) => console.log(err));      
	}
};