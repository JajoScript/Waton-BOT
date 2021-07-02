const { MessageEmbed } = require("discord.js");

module.exports = {
	nombre: "avatar",
	descripcion: "Muestra el avatar del usuario mencionado o el avatar propio",
	ejecutar(mensaje, argumentos){
		// Variables para el comando.
		let mensajeAvatar = new MessageEmbed()
			.setColor(0x66b3ff);
			
		let personaMencionada = mensaje.mentions.users.first();
		console.log(`[DEV] Se menciono a:  ${personaMencionada}`);

		// CASO 1: No mencionan a nadie, mostrar el avatar propio.
		if(!personaMencionada) {
			personaMencionada = mensaje.author;
			console.log(`[DEV] Se menciono al autor:  ${personaMencionada}`);
		}
		
		// CASO 2: Se menciona a alguien, mostrar el avatar de la persona mencionda. 
		
		// Agregando la información al embed.
		let avatarDinamico = personaMencionada.avatarURL({dynamic: true, size: 4096});

		if (avatarDinamico){
			// Agregando el avatar si existe.
			mensajeAvatar
				.setImage(`${personaMencionada.avatarURL({dynamic: true, size: 4096})}`)
				.setFooter(`Avatar de ${personaMencionada.username}`);
				
		}else if (!avatarDinamico){
			mensajeAvatar
				.setFooter(`🤔 ${personaMencionada.username} No tiene un avatar.`);
		}	

		mensaje.channel.send(mensajeAvatar);
	}
};