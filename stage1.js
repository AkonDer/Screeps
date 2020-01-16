// Все действия касаемые стадии 1
let creepCreate = require("creep.create");
let appointToWork = require("creep.appoint_to_work");
let goWork = require("creep.go_work");
let helper = require("helper");

module.exports = function(room) {
    // Записать в память комнаты координаты центра Базы
    if (!room.memory.centerBase) {
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        if (!room.memory.centerBase) {
            room.memory.centerBase = { x: spawn.pos.x + 1, y: spawn.pos.y + 2 };
        }
    }

    console.log(room.memory.centerBase.x + " " + room.memory.centerBase.y);
    // Записать в память комнаты все источники энергии
    if (room.find(FIND_MY_SPAWNS)) {
        if (!room.memory.sources) {
            let sources = room.find(FIND_SOURCES);
            const pos = room.getPositionAt(room.memory.centerBase.x, room.memory.centerBase.y);
            let ranges = sources.map(source => {
                return [pos.getRangeTo(source), source.id];
            });
            room.memory.sources = ranges.sort();
        }
    }

    // Создать первых крипов
    creepCreate(room, {
        upgraider: [3, { WORK: 2, CARRY: 1, MOVE: 1 }],
        carrier: [2, { CARRY: 1, MOVE: 1 }],
        miner: [1, { WORK: 2, MOVE: 1 }]
    });

    // когда создано два перевозчика создать еще одного майнера
    if (_.filter(Game.creeps, creep => creep.memory.role == "carrier").length >= 2) {
        creepCreate(room, {
            miner: [2, { WORK: 2, MOVE: 1 }]
        });
    }

    // Назначить крипов на работу
    let creeps = _.filter(Game.creeps); //TODO Заменить на фильтрацию крипов в конкретной комнате
    appointToWork(creeps, room);

    // Отправить крипов работать
    goWork(creeps, room);
};
