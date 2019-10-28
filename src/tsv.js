
const getTsvByUser = (request, response) => {
    const user = request.params.user;
    if(user == 'Somberlord') {
        response.json([{name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{name: 'Zorua', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'}]);
    }
    else {
        response.json([{name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'},{name: 'Tarsal', gender: 'M', nature: 'Modeste', ability: 'Illusion', ball: 'Honor Ball', lp: 31, atk: 31, def: 31, spatk: 31, spdef: 31, spe: 31, hp: 'Dark', atk1: 'Tricherie', atk2: 'Coup Bas', atk3: 'Danse lames', atk4: 'Machination'}]);
    }
}

module.exports = getTsvByUser;