// Dependencias.
const mongoose = require("mongoose");

// Definición del esquema.
const Esquema = mongoose.Schema;

// Instancia.
const EsquemaUsuario = new Esquema({
   _id: mongoose.Schema.Types.ObjectId,
   userID : String,
   username: String,
   nacimiento: Date // 23/03/2001
}); 

// Exportar el esquema.
module.exports = mongoose.model("usuarios", EsquemaUsuario);