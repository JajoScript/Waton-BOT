// Dependencias.
const { MessageEmbed } = require("discord.js");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

module.exports = {
	nombre: "cumpleaños",
	descripcion: "Responde cuantos dias faltan para el CUMpleaños del mencionado.",
	ejecutar(mensaje, argumentos){
      let persona_mencionada = mensaje.mentions.users.first();
      let persona_id = persona_mencionada.id

      EsquemaUsuario.findOne({ userID : persona_id})
         .then((esquema) => {
            if(!esquema){
               mensaje.channel.send("El usuario no esta registrado en la base de datos 😞");
            }else {
                // PRIMERO: OBTENER FECHA ACTUAL Y LA DEL CUMPLEAÑOS
                let fecha_ahora = new Date() // Fecha de hoy.
                let cumple_db = esquema.nacimiento 
                let cumple_fecha = new Date(cumple_db) //Fecha Cumple


                // OBTENER LOS VALORES INDIVUDUALES
                let dia = cumple_fecha.getDate()
                let mes = cumple_fecha.getMonth()
                let ano = fecha_ahora.getFullYear()
		let ahora = fecha_ahora.getTime()
                // SEGUNDO: VERIFICAR SI ES QUE EL MES ACTUAL ES MAYOR O MENOR AL MES DEL CUMPLEAÑOS
                let diferencia_Mes = cumple_fecha.getMonth() - fecha_ahora.getMonth()
                //console.log(diferentMeses)
                //SI EL VALOR ES MENOR O IGUAL A 0: EL CUMPLEAÑOS YA PASO
                if (diferencia_Mes<=0){
                    //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y SUMARLE 1 AL AÑO ACTUAL.
                    console.log('Dia: '+dia+ ' Mes: '+mes +' Ano: '+ ano)
                    let cuenta_regresiva = new Date(ano+1,mes-1,dia).getTime()
                    let diferencia = cuenta_regresiva - ahora
                    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                    console.log('Faltan: '+ dias+' dias')

                //SI EL VALOR ES MAYOR A 0 EL CUMPLEAÑOS ESTA POR VENIR.
                }else if (diferencia_Mes>0){
                    //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y USAR EL AÑO ACTUAL.
                    console.log('Dia: '+dia+ ' Mes: '+mes +' Ano: '+ ano)
                    let cuenta_regresiva = new Date(ano,mes-1,dia).getTime()
                    let diferencia = cuenta_regresiva - ahora
                    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                    console.log('Faltan: '+ dias+' dias')
		}

            }
         })
         .catch(err => console.log(err));

	}
};
