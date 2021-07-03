// Dependencias.
const mongoose = require("mongoose");

// Definición del esquema.
const Esquema = mongoose.Schema;

// Instancia.
const EsquemaUsuario = new Esquema({
   _id: mongoose.Schema.Types.ObjectId,
   userID : String,
   username: String,
   nacimiento: Date,
   
   servidores : [{
      servidorID: String,
      servidorNombre: String
   }]

}); 

// Exportar el esquema.
module.exports = mongoose.model("usuarios", EsquemaUsuario);