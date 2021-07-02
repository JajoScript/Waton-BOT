// Dependencias.
const mongoose = require("mongoose");

// Definición del evento.
module.exports = {
	nombre: "ready",
	simple: true,
	descripción: "Controla el estado inicial del bot.",
	ejecutar(cliente) {
		// Definiendo el estado del bot.
		cliente.user.setPresence({
			status: "online",
			activity : {
				name: "Estoy waton 🎵",
				url: null,
				type: "LISTENING"
			}
		});

		console.log(`[BOT] BOT ${cliente.user.tag} encendido!`);

		// Conectando a la BD.
		mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
			.then(() => console.log("[BOT][DB] Base de datos conectada!"))
			.catch((err) => console.log(err));
	}
};


