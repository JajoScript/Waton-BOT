// Dependencias.
const { MessageEmbed } = require("discord.js");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

module.exports = {
	nombre: "cumpleaños",
	descripcion:
		"Responde cuantos dias faltan para el CUMpleaños del mencionado.",
	ejecutar(mensaje, argumentos) {
		// Comprobación si se etiqueta a alguien.
		if (!argumentos || argumentos.length < 1){
			var PersonaMenciona = mensaje.author;
			var personaID = PersonaMenciona.id;

			console.log(`No se menciono a nadie ${PersonaMenciona}: ${personaID}`)
		} else {
			var PersonaMenciona = mensaje.mentions.users.first();
			var personaID = PersonaMenciona.id;
		}

		EsquemaUsuario.findOne({ userID: personaID })
			.then((esquema) => {
				if (!esquema) {
					mensaje.channel.send("El usuario no esta registrado en la base de datos 😞");
				} else {
					// PRIMERO: OBTENER FECHA ACTUAL Y LA DEL CUMPLEAÑOS
					let FechaAhora = new Date(); // Fecha de hoy.
					let CumpleDB = esquema.nacimiento;
					let CumpleFecha = new Date(CumpleDB); //Fecha Cumple

					// OBTENER LOS VALORES INDIVUDUALES
					let dia = CumpleFecha.getDate();
					let mes = CumpleFecha.getMonth();
					let año = FechaAhora.getFullYear();
					let ahora = FechaAhora.getTime();

					// SEGUNDO: VERIFICAR SI ES QUE EL MES ACTUAL ES MAYOR O MENOR AL MES DEL CUMPLEAÑOS
					let DiferenciaMes = CumpleFecha.getMonth() - FechaAhora.getMonth();

					//SI EL VALOR ES MENOR O IGUAL A 0: EL CUMPLEAÑOS YA PASO
					if (DiferenciaMes <= 0) {
						//OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y SUMARLE 1 AL AÑO ACTUAL.
						let CuentaRegresiva = new Date(año + 1, mes, dia).getTime();
						let diferencia = CuentaRegresiva - ahora;
						var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

						//SI EL VALOR ES MAYOR A 0 EL CUMPLEAÑOS ESTA POR VENIR.
						var edad = (FechaAhora.getFullYear() - CumpleFecha.getFullYear()) + 1;

					} else if (DiferenciaMes > 0) {
						//OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y USAR EL AÑO ACTUAL.
						let CuentaRegresiva = new Date(año, mes, dia).getTime();
						let diferencia = CuentaRegresiva - ahora;
						var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

						var edad = (FechaAhora.getFullYear() - CumpleFecha.getFullYear());
					}
					
					// Mensaje personalizado.
					let avatarDinamico = PersonaMenciona.avatarURL({dynamic: true, size: 4096});
					let mensajePersonalizado = new MessageEmbed()

					if (avatarDinamico){
						// Agregando el avatar si existe.
						mensajePersonalizado
							.setImage(`${PersonaMenciona.avatarURL({dynamic: true, size: 64})}`)
							
					}

					mensajePersonalizado
						.setColor("GREEN")
						.setTitle(`✨ CUMpleaños ${PersonaMenciona.username}`)
						.addField(`📣 Para su CUMpleaños faltan:`, `${dias} dias`)
						.addField(`🥳 ${PersonaMenciona.username} cumple: `, `${edad} años`)
						.setDescription("Venganse todos...")

					mensaje.channel.send(mensajePersonalizado);
				}
			})
			.catch((err) => console.log(err));
	},
};
