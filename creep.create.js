// Создание крипов
var helper = require("helper");

module.exports = function(stage, room) {
    switch (stage) {
        case 1:
            creepCreate(
                {
                    builder: [1, { CARRY: 1, MOVE: 1 }],
                    carrier: [1, { CARRY: 1, MOVE: 1 }],
                    miner: [2, { CARRY: 1, MOVE: 1 }]
                },
                room
            );
            break;
    }
};

// Функция создания крипа
function creepCreate(creeps, room) {
    for (let name in room.creeps) {
        console.log(room.creeps[name].name);
    }

    for (let name in creeps) {
        let creepTypeQuantity = _.filter(Game.creeps, creep => creep.memory.role == name); //TODO Заменить на фильтрацию крипов в конкретной комнате
        if (creepTypeQuantity.length < creeps[name][0]) {
            for (let name in Memory.creeps) {
                if (!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log("Clearing non-existing creep memory:", name);
                }
            }
            let spawn = helper.getFreeSpawn(room);
            let crecon = creepConstraction(creeps[name][1]);
            let newName = name + Game.time;
            spawn.spawnCreep(crecon, newName, { memory: { role: name } });
        }
    }
}

// Функция переделывает объект с частями крипа в массив пригодный для указания в качестве параметра для функции создания
function creepConstraction(composition) {
    let constr = [];
    for (let name in composition) {
        for (let i = 0; i < composition[name]; i++) {
            constr.push(name.toLowerCase());
        }
    }
    return constr;
}
