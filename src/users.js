
const getUsers = (request, response) => {
    response.json([{id: 0, name: "Capture"}, {id: 2, name: "Somberlord"}, {id: 1, name: "TinyDoowy"}]);
}

module.exports = getUsers;