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
                let fecha_now = new Date() // Fecha de hoy.
                let cumple_db = esquema.nacimiento 
                let cumple_date = new Date(cumple_db) //Fecha Cumple


                // OBTENER LOS VALORES INDIVUDUALES
                let dia = cumple_date.getDate()
                let mes = cumple_date.getMonth()
                let anho = fecha_now.getFullYear()
                // SEGUNDO: VERIFICAR SI ES QUE EL MES ACTUAL ES MAYOR O MENOR AL MES DEL CUMPLEAÑOS
                let diferentMeses = cumple_date.getMonth() - fecha_now.getMonth()
                //console.log(diferentMeses)
                //SI EL VALOR ES MENOR O IGUAL A 0: EL CUMPLEAÑOS YA PASO
                if (diferentMeses<=0){
                    console.log('Ya paso')
                    //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y SUMARLE 1 AL AÑO ACTUAL.
                    console.log('Dia: '+dia+ ' Mes: '+mes +' Ano: '+ anho)
                    let countDown = new Date(anho+1,mes-1,dia).getTime()
                    let now = fecha_now.getTime()
                    let diferencia = countDown - now
                    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                    console.log('Faltan: '+ dias+' dias')

                //SI EL VALOR ES MAYOR A 0 EL CUMPLEAÑOS ESTA POR VENIR.
                }else if (diferentMeses>0){
                    console.log('Por venir.')
                    //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y USAR EL AÑO ACTUAL.
                    console.log('Dia: '+dia+ ' Mes: '+mes +' Ano: '+ anho)
                    let countDown = new Date(anho,mes-1,dia).getTime()
                    let now = fecha_now.getTime()
                    let diferencia = countDown - now
                    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                    console.log('Faltan: '+ dias+' dias')
}

            }
         })
         .catch(err => console.log(err));

	}
};
