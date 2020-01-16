// Все действия касаемые стадии 1
let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");

module.exports = function(room) {
    // Записать координаты центра Базы
    if (!room.memory.centerBase) {
        let spawn = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } })[0];
        room.memory.centerBase = { x: spawn.pos.x + 1, y: spawn.pos.y + 2 };
    }

    // Создать первых крипов
    creepCreate(room, {
        upgraider: [2, { WORK: 2, CARRY: 1, MOVE: 1 }],
        carrier: [2, { CARRY: 1, MOVE: 1 }],
        miner: [1, { WORK: 2, MOVE: 1 }]
    });

    // Назначить крипов на работу
    let creeps = _.filter(Game.creeps); //TODO Заменить на фильтрацию крипов в конкретной комнате
    appointToWork(creeps, room);

    // Отправить крипов работать
    goWork(creeps, room);
};
