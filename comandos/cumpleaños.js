// Dependencias.
const { MessageEmbed } = require("discord.js");

// Importando el modelo.
const EsquemaUsuario = require("../colecciones/usuarios.js");

module.exports = {
	nombre: "cumpleaños",
	descripcion: "Responde cuantos dias faltan para el CUMpleaños del mencionado.",
	ejecutar(mensaje, argumentos){
      let PersonaMenciona = mensaje.mentions.users.first();
      let personaID = PersonaMenciona.id

      EsquemaUsuario.findOne({ userID : personaID})
         .then((esquema) => {
            if(!esquema){
               mensaje.channel.send("El usuario no esta registrado en la base de datos 😞");
            }else {
                // PRIMERO: OBTENER FECHA ACTUAL Y LA DEL CUMPLEAÑOS
                let FechaAhora = new Date() // Fecha de hoy.
                let CumpleDB = esquema.nacimiento 
                let CumpleFecha = new Date(CumpleDB) //Fecha Cumple


                // OBTENER LOS VALORES INDIVUDUALES
                let dia = CumpleFecha.getDate()
                let mes = CumpleFecha.getMonth()
                let ano = FechaAhora.getFullYear()
		let ahora = FechaAhora.getTime()
                // SEGUNDO: VERIFICAR SI ES QUE EL MES ACTUAL ES MAYOR O MENOR AL MES DEL CUMPLEAÑOS
                let DiferenciaMes = CumpleFecha.getMonth() - FechaAhora.getMonth()
                //console.log(diferentMeses)
                //SI EL VALOR ES MENOR O IGUAL A 0: EL CUMPLEAÑOS YA PASO
                if (DiferenciaMes<=0){
                    //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y SUMARLE 1 AL AÑO ACTUAL.
                    console.log('Dia: '+dia+ ' Mes: '+mes +' Ano: '+ ano)
                    let CuentaRegresiva = new Date(ano+1,mes-1,dia).getTime()
                    let diferencia = CuentaRegresiva - ahora
                    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                    console.log('Faltan: '+ dias+' dias')

                //SI EL VALOR ES MAYOR A 0 EL CUMPLEAÑOS ESTA POR VENIR.
                }else if (DiferenciaMes>0){
                    //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y USAR EL AÑO ACTUAL.
                    console.log('Dia: '+dia+ ' Mes: '+mes +' Ano: '+ ano)
                    let CuentaRegresiva = new Date(ano,mes-1,dia).getTime()
                    let diferencia = CuentaRegresiva - ahora
                    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                    console.log('Faltan: '+ dias+' dias')
		}

            }
         })
         .catch(err => console.log(err));

	}
};
