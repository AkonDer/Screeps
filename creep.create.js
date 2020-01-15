// Создание крипов
var helper = require("helper");

module.exports = function(stage, room) {
    switch (stage) {
        case 1:
            creepCreate({ builder: 1, miner: 1, carrier: 1 }, room);
            break;
    }
};

function creepCreate(creeps, room) {
    switch (room.energyAvailable) {
        case 300:
            console.log(helper.getFreeSpawn(room));
            break;
    }

    // { MOVE: 2, WORK: 2, CARRY: 1 },
}

// Функция переделывает объект с частями крипа в массив пригодный для указания в качестве параметра для функции создания
function creepConstraction(composition) {
    let constr = [];
    for (let name in composition) {
        for (let i = 0; i < composition[name]; i++) {
            constr.push(name);
        }
    }
    return constr;
}
