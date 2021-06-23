module.exports = (cliente) => {
    cliente.user.setPresence(
        {
            status: 'online',
            game : {
                name: 'Estoy waton 🎵',
                url: null,
                type: "PLAYING"
            }
        }
    );
};