
const getTsvByUser = (request, response) => {
    const userid = parseInt(request.params.userid);
    if(userid == 2) {
        response.json([{uid: 0, name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{uid: 1, name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{uid: 2, name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{uid: 3, name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'}]);
    }
    else {
        response.json([{uid: 4, name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{uid: 5, name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{uid: 6, name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{uid: 7, name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'}]);
    }
}

module.exports = getTsvByUser;