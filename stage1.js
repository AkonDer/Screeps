// Все действия касаемые стадии 1
var creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");

module.exports = function(room) {
    // Создать первых крипов
    creepCreate(room, {
        carrier: [1, { CARRY: 1, MOVE: 1 }],
        miner: [1, { WORK: 1, MOVE: 1 }]
    });

    //Назначить крипов на работу
    let creeps = _.filter(Game.creeps); //TODO Заменить на фильтрацию крипов в конкретной комнате
    appointToWork(creeps);
};
