module.exports = (cliente) => {
    cliente.user.setPresence(
        {
            status: 'online',
            game : {
                name: 'WAWAWA',
                url: null,
                type: "PLAYING"
            }
        }
    );
};