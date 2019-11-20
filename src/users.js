
const db = require('./queries');

const getUsers = (request, response) => {
    db.getUsers(request, response);
    /*response.json([{id: 0, name: "--CaptureCard--", site: "Doowy", nblate: 0, nbwhip: 0, nbwarning: 0, status: "En cours", friendcode: "1234-4568-7890-1234", note:"Compte de génération / distribution"}, 
    {id: 2, name: "Somberlord", site: "Meta6iv", nblate: 42, nbwhip: 1, nbwarning: 0, status: "Archivé", friendcode: "6548-3848-4861-4838 9610-7246-6854-4382", note:""}, 
    {id: 1, name: "TinyDoowy", site: "Doowy", nblate: 0, nbwhip: 0, nbwarning: 0, status: "En cours", friendcode: "4321-8765-0987-4321", note:"Dooowyyyyyyyy"}]);*/
}

const createOrUpdateUser = (request, response) => {
    db.createOrUpdateUser(request, response);
  }

module.exports = {getUsers, createOrUpdateUser: createOrUpdateUser};