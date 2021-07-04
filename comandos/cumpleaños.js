// Dependencias.
const Cumpleañero = require("../funcionalidad/cumpleañero.js");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

// Exportación del comando: cumpleaños
module.exports = {
   nombre: "cumpleaños",
   descripcion: "Muestra la lista de los cumpleaños más cercanos.",
   async ejecutar(mensaje, argumentos) {
      let cumpleañero = new Cumpleañero;
      let servidorNombre = mensaje.guild.name;
      
      // Lista de los usuarios en el servidor.
      var listaUsuarios = [];
      var listaCumpleaños = [];

      mensaje.guild.members.cache.map((miembro) => { listaUsuarios.push(miembro.id) });
      console.log(listaUsuarios);

      // Consulta.
      EsquemaUsuario.find({userID: { $in : listaUsuarios}})
         .then((esquemas) => {
            if(esquemas){
               esquemas.map((documento) => {
                  let nombreUsuario = documento.username;
                  let fechaCumpleaños = documento.nacimiento;

                  let diasRestantes = cumpleañero.definirDiasRestantes(fechaCumpleaños);
                  console.log(`${nombreUsuario} : ${fechaCumpleaños} : ${diasRestantes}`)

                  // Insertando los elementos en la lista.
                  listaCumpleaños.push({dias: diasRestantes, nombre: nombreUsuario});

                  // 
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
               
               console.log(listaCumpleaños);
               mensaje.channel.send(`Lista de cumpleaños: ${listaCumpleaños}`);
            }
         })
         .catch((err) => console.log(err));
   }
}
