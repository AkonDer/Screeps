let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");

module.exports = function(room) {
    let creeps = _.filter(Game.creeps, creep => creep.memory.role == "upgraider"); //TODO Заменить на фильтрацию крипов в конкретной комнате
    console.log(creeps);
    creeps.forEach(creep => {
        creep.suicide();
    });
};
