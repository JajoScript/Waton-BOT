module.exports = {
    nombre: 'ready',
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
    }
};


