let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");

let build = require("build_to_plan");
let plan = require("plan");

module.exports = function(room) {
    // Создать первых крипов
    creepCreate(room, {
        builder: [4, { WORK: 2, CARRY: 1, MOVE: 1 }],
        carrier: [2, { CARRY: 1, MOVE: 1 }],
        miner: [2, { WORK: 2, MOVE: 1 }]
    });

    // Назначить крипов на работу
    let creeps = _.filter(Game.creeps); //TODO Заменить на фильтрацию крипов в конкретной комнате
    appointToWork(creeps, room);

    // Отправить крипов работать
    goWork(creeps, room);

    // Построить дорогу до ближайшего источника
    build.buildRoad(Game.getObjectById(room.memory.sources[0][1]), plan, room);

    // Построить расширения
    build.buildExtention(plan, room);
};
