class Cumpleañero {
   // Propiedades.
   // Constructor.
   // Metodos.

   definirTiempoRestante(fecha){
      // PRIMERO: OBTENER FECHA ACTUAL Y LA DEL CUMPLEAÑOS
      let FechaAhora = new Date(); // Fecha de hoy.
      let CumpleDB = fecha;
      let CumpleFecha = new Date(CumpleDB); //Fecha Cumple

      // OBTENER LOS VALORES INDIVUDUALES
      let dia = CumpleFecha.getDate();
      let mes = CumpleFecha.getMonth();
      let año = FechaAhora.getFullYear();
      let ahora = FechaAhora.getTime();

      // SEGUNDO: VERIFICAR SI ES QUE EL MES ACTUAL ES MAYOR O MENOR AL MES DEL CUMPLEAÑOS
      let DiferenciaMes = CumpleFecha.getMonth() - FechaAhora.getMonth();

      //SI EL VALOR ES MENOR 0: EL CUMPLEAÑOS YA PASO
      if (DiferenciaMes < 0) {
         var CuentaRegresiva = new Date(año + 1, mes, dia).getTime();
         var diferencia = CuentaRegresiva - ahora;

         //SI EL VALOR ES MAYOR A 0 EL CUMPLEAÑOS ESTA POR VENIR.

      //SI EL VALOR ES IGUAL 0: EL CUMPLEAÑOS ESTA EN EL MES
      }else if(DiferenciaMes==0){
         if(dia>=FechaAhora.getDate()){
            var CuentaRegresiva = new Date(año, mes, dia).getTime();
         }else{
            //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y SUMARLE 1 AL AÑO ACTUAL.
            var CuentaRegresiva = new Date(año + 1, mes, dia).getTime();
         }

         var diferencia = CuentaRegresiva - ahora;

         //SI EL VALOR ES MAYOR A 0 EL CUMPLEAÑOS ESTA POR VENIR.
         var edad = (FechaAhora.getFullYear() - CumpleFecha.getFullYear()) + 1;

      } else if (DiferenciaMes > 0) {
         //OBTENER EL DIA Y MES DEL CUMPLEAÑOS Y USAR EL AÑO ACTUAL.
         let CuentaRegresiva = new Date(año, mes, dia).getTime();
         var diferencia = CuentaRegresiva - ahora;
      }

      return diferencia;
   }

   definirDiasRestantes(fecha){
      var tiempoRestante = this.definirTiempoRestante(fecha);
      var diasRestantes = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));

      return diasRestantes;
   }

   definirHorasRestantes(fecha){
      var tiempoRestante = this.definirTiempoRestante(fecha);
      var horasRestantes = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      return horasRestantes;

   }

   // Getters & Setters
   // Destructor.
}

module.exports = Cumpleañero;