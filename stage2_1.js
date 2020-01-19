let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");
let build = require("build_to_plan");
let plan = require("plan");
let helper = require("helper");

module.exports = function(room) {
    // Убить апдейтеров они пока не нужны
    if (!room.memory.startStage2) {
        let upgraiders = helper.findCreeps("upgraider", room);
        upgraiders.forEach(upgraider => {
            upgraider.suicide();
        });
        room.memory.startStage2 = true;
    }

    // Создать крипов
    creepCreate(room, {
        builder: [8, { WORK: 2, CARRY: 1, MOVE: 1 }],
        carrier: [3, { CARRY: 1, MOVE: 1 }],
        miner: [3, { WORK: 2, MOVE: 1 }]
    });

    // Назначить крипов на работу
    let creeps = room.find(FIND_MY_CREEPS);
    appointToWork(creeps, room);

    // Отправить всех майнеров на ближайший источник
    let miners = helper.findCreeps("miner", room);
    miners.forEach(miner => {
        miner.memory.source = room.memory.sources[0][1];
    });

    // Отправить крипов работать
    goWork(creeps, room);

    // Построить расширения
    build.buildExtention(5, plan, room);
};
