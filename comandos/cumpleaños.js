// Dependencias.
const { MessageEmbed } = require("discord.js");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

module.exports = {
	nombre: "cumpleaños",
	descripcion: "Responde cuantos dias faltan para el CUMpleaños del mencionado.",
	ejecutar(mensaje, argumentos){
      let persona_mencionada = mensaje.mentions.users.first();
      let persona_id = persona_mencionada.id

      EsquemaUsuario.findOne({ userID : persona_id})
         .then((esquema) => {
            if(!esquema){
               mensaje.channel.send("El usuario no esta registrado en la base de datos 😞");
            }else {
               // Calculo de los dias restantes para el cumpleaños.

               let fecha_hoy = new Date() // Fecha de hoy. 
               let cumpleaños = esquema.nacimiento // 23-03-2001
               let fecha_cumpleaños = new Date(cumpleaños)
               // let milisegundos = fecha_hoy - fecha_cumpleaños
               // let dias_restantes = milisegundos * 

               console.log(`HOY : ${fecha_hoy}`);
               console.log(`NACIMIENTO : ${cumpleaños}`);
               console.log(`FECHA CUM : ${fecha_cumpleaños}`);

            }
         })
         .catch(err => console.log(err));

	}
};