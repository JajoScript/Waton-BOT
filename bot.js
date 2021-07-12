// Cargar variables de entorno.
require("dotenv").config();

// Dependencias.
const Discord = require("discord.js");
const Ytdl = require("ytdl-core");
const Search = require("youtube-search");
const Controlador = require("./funcionalidad/controlador.js");

// Instancias.
const Cliente = new Discord.Client();
const Cola = new Map(); // Cola para la reproducción de temas.

// Colecciones.
Cliente.comandos = new Discord.Collection();

// Cargando comandos.
let controlador = new Controlador;
controlador.lectorComandos(Cliente);
controlador.lectorEventos(Cliente);

// Inicio de sesión.
Cliente.login(process.env.DISCORD_TOKEN)
	.then(() => {
		console.log(`[BOT] Estoy listo ${Cliente.user.tag}.`);
	})
	.catch((error) => {
		console.log("[BOT] Error al inciar sesión");
		console.log(error);
	}); 