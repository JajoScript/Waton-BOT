const { MessageEmbed } = require("discord.js");

module.exports = {
	nombre: "avatar",
	descripcion: "Muestra el avatar del usuario mencionado o el avatar propio",
	ejecutar(mensaje, argumentos){
		// Variables para el comando.
		let mensaje_avatar = new MessageEmbed()
			.setColor(0x66b3ff);
			
		let persona_mencionada = mensaje.mentions.users.first();
		console.log(`[DEV] Se menciono a:  ${persona_mencionada}`);

		// CASO 1: No mencionan a nadie, mostrar el avatar propio.
		if(!persona_mencionada) {
			persona_mencionada = mensaje.author;
			console.log(`[DEV] Se menciono al autor:  ${persona_mencionada}`);
		}
		
		// CASO 2: Se menciona a alguien, mostrar el avatar de la persona mencionda. 
		
		// Agregando la información al embed.
		mensaje_avatar
			.setImage(`${persona_mencionada.avatarURL({dynamic: true, size: 4096})}`)
			.setFooter(`Avatar de ${persona_mencionada.username}`);

		mensaje.channel.send(mensaje_avatar);
	}
};