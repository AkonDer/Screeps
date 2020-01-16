let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");

let buildToPlan = require("build_to_plan"); //TODO После отладки строительства стереть
let plan = require("plan");

module.exports = function(room) {
    // Убиваем апгрейдеров они пока не нужны
    if (!room.memory.endStage1) {
        let creeps = _.filter(Game.creeps, creep => creep.memory.role == "upgraider"); //TODO Заменить на фильтрацию крипов в конкретной комнате
        creeps.forEach(creep => {
            creep.suicide();
        });
        room.memory.endStage1 = true;
    }

    // Создать первых крипов
    creepCreate(room, {
        builder: [4, { WORK: 2, CARRY: 1, MOVE: 1 }],
        carrier: [2, { CARRY: 1, MOVE: 1 }],
        miner: [1, { WORK: 2, MOVE: 1 }]
    });

    // Назначить крипов на работу
    let creeps = _.filter(Game.creeps); //TODO Заменить на фильтрацию крипов в конкретной комнате
    appointToWork(creeps, room);

    // Отправить крипов работать
    goWork(creeps, room);

    //TODO После отладки строительства стереть
    buildToPlan(plan, room); // Строить по плану
};
