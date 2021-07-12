// Dependencias.
const bip = require("bip");

// Creación del comando: bit
module.exports = {
   nombre: "saldobip",
   descripcion: "Te responde con el saldo de tu tarjeta Bip",
   ejecutar(mensaje, argumentos) {
      // Variables locales del comando.
      console.log(`ARG: ${argumentos}`);

      let numeroTarjeta = parseInt(argumentos[0], 10);
      
      if (!argumentos){
         mensaje.reply("Necesito una tarjeta Bip para poder trabajar. EJ: 12345678");
         return 0;
      }
      
      // Consulta a bip por el saldo.
      // Revisar la dependencias... Error 402
      console.log("N°:", numeroTarjeta);
      bip(numeroTarjeta)
         .then((data) => {
            console.log(data);
            if(data){
               mensaje.channel.send(`Saldo: ${data.balance}`);
            }

         })
         .catch((err) => {
            console.log(err);

            mensaje.channel.send("No puedo trabajar con esa tarjeta");
         });
   } 
}