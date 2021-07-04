// Dependencias.
const Cumpleañero = require("../funcionalidad/cumpleañero.js");
const { MessageEmbed } = require("discord.js");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

// Exportación del comando: cumpleaños
module.exports = {
   nombre: "cumpleaños",
   descripcion: "Muestra la lista de los cumpleaños más cercanos.",
   async ejecutar(mensaje, argumentos) {
      // Instancias y variables.
      var servidorNombre = mensaje.guild.name;
      let cumpleañero = new Cumpleañero;
      var mensajePersonalizado = new MessageEmbed()
         .setColor("RANDOM")
         .setTitle("🛐 Lista de cumpleaños: ")
         .setThumbnail("https://cdn.discordapp.com/attachments/858141366487613440/861369026219606066/kieperokomo.jpg")
         .setDescription("🥵 Feliz cum.");
         
      // Lista de los usuarios en el servidor.
      var listaUsuarios = [];
      var listaCumpleaños = [];

      // Determinando los usuarios presentes dentro del servidor.
      mensaje.guild.members.cache.map((miembro) => { listaUsuarios.push(miembro.id) });
      console.log(listaUsuarios);

      // Consulta.
      EsquemaUsuario.find({userID: { $in : listaUsuarios}})
         .then((esquemas) => {
            if(esquemas){
               esquemas.map((documento) => {
                  let nombreUsuario = documento.username;
                  let fechaCumpleaños = documento.nacimiento;

                  // Calculando los dias restantes.
                  let diasRestantes = cumpleañero.definirDiasRestantes(fechaCumpleaños);
                  let horasRestantes = cumpleañero.definirHorasRestantes(fechaCumpleaños);

                  // Insertando los elementos en la lista.
                  listaCumpleaños.push({dias: diasRestantes, horas: horasRestantes, nombre: nombreUsuario});

                  // Ordenando los elementos dentro de la lista.
                  listaCumpleaños.sort((a,b) => {
                     console.log(`a: ${a.dias} , b: ${b.dias}`);

                     if (a.dias > b.dias) {
                        return 1;
                     }
                     if (a.dias < b.dias) {
                        return -1;
                     }

                     return 0;
                  });
               })

               let iterador = 1
               listaCumpleaños.map((miembro) => {
                  mensajePersonalizado.addField(`${iterador}.- 🥳 ${miembro.nombre}`, `en 🎉 ${miembro.dias} dias y ${miembro.horas} hrs`);
                  iterador++;
               });

               mensaje.channel.send(mensajePersonalizado);
            }
         })
         .catch((err) => console.log(err));
   }
}
