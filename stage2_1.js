let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");
let build = require("build_to_plan");
let plan = require("plan");

module.exports = function(room) {
    // Убить апдейтеров они пока не нужны
    if (!room.memory.startStage2) {
        let upgraiders = room.find(FIND_MY_CREEPS, {
            filter: creep => {
                return creep.memory.role == "upgraider";
            }
        });
        upgraiders.forEach(upgraider => {
            upgraider.suicide();
        });
        room.memory.startStage2 = true;
    }

    // Создать первых крипов
    creepCreate(room, {
        builder: [4, { WORK: 2, CARRY: 1, MOVE: 1 }],
        carrier: [2, { CARRY: 1, MOVE: 1 }],
        miner: [3, { WORK: 2, MOVE: 1 }]
    });

    // Назначить крипов на работу
    let creeps = room.find(FIND_MY_CREEPS);
    appointToWork(creeps, room);

    // Отправить всех майнеров на ближайший источник
    let miners = room.find(FIND_MY_CREEPS, {
        filter: creep => {
            return creep.memory.role == "miner";
        }
    });
    miners.forEach(miner => {
        miner.memory.source = room.memory.sources[0][1];
    });

    // Отправить крипов работать
    goWork(creeps, room);

    // Построить расширения
    build.buildExtention(5, plan, room);
};
