let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");
let build = require("build_to_plan");
let plan = require("plan");
let helper = require("helper");

module.exports = function(room) {
    // Создать крипов
    creepCreate(room, {
        builder: [4, { WORK: 2, CARRY: 1, MOVE: 1 }],
        carrier: [3, { CARRY: 1, MOVE: 1 }],
        miner: [2, { WORK: 2, MOVE: 1 }]
    });

    // Назначить крипов на работу
    let creeps = room.find(FIND_MY_CREEPS);
    appointToWork(creeps, room);

    // Отправить крипов работать
    goWork(creeps, room);

    //Построить контейнеры около источников
    build.buildContainerToSource(room);

    // Построить дорогу к ближайшему источнику
    // build.buildRoad(Game.getObjectById(room.memory.sources[0][1]), plan, room);

    // Проверить состояние майнеров и если он умирает то стереть информацию о нем из памяти комнаты
    let miners = helper.findCreeps("miner", room);
    miners.forEach(miner => {
        if (miner.ticksToLive == 1) {
            let sourceContainer = room.memory.sourceContainers.find(sourceCont => sourceCont.idCreep == miner.id);
            if (sourceContainer) room.memory.sourceContainers.idCreep = sourceContainer.idCreep;
        }
    });
};
