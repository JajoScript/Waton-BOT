// Dependencias.
const Cumpleañero = require("../funcionalidad/cumpleañero.js");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

// Exportación del comando: cumpleaños
module.exports = {
   nombre: "cumpleaños",
   descripcion: "Muestra la lista de los cumpleaños más cercanos.",
   ejecutar(mensaje, argumentos){
      let cumpleañero = new Cumpleañero;
      let servidorNombre = mensaje.guild.name;
      
      // Lista de los usuarios en el servidor.
      let listaUsuarios = []
      mensaje.guild.members.cache.map((miembros) => listaUsuarios.push(miembros.id));

      // Haciendo la consulta por cada uno de los miembros.
      mensaje.guild.members.cache.map((miembro) => {

         // Consulta a la base de datos.
         EsquemaUsuario.findOne({ userID: miembro.id})
            .then((esquema) => { 
               if (esquema) {
                  // Datos del usuario.
                  console.log(esquema);
                  let nombreUsuario = esquema.username;
                  let usuarioID = miembro.id;
                  let fechaCumpleaños = esquema.nacimiento;

                  let diasRestantes = cumpleañero.definirDiasRestantes(fechaCumpleaños);
                  
                  console.log(`ID: ${usuarioID} Nombre: ${nombreUsuario}, fecha: ${fechaCumpleaños}, dias: ${diasRestantes}`);   
               }
            })
            .catch((err) => console.log(err));
      });

      mensaje.channel.send(`${servidorNombre}, [${listaUsuarios}]`);
   }
}
