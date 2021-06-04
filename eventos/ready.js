module.exports = (cliente) => {
    cliente.user.setPresence(
        {
            status: 'online',
            game : {
                name: 'WAWAWA',
                url: null,
                tpye: "PLAYING"
            }
        }
    );
};