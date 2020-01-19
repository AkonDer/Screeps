// Создание крипов
var helper = require("helper");

module.exports = function(room, creepModels) {
    for (let name in creepModels) {
        let creepTypeQuantity = room.find(FIND_MY_CREEPS, {
            filter: creep => {
                return creep.memory.role == name;
            }
        }).length;
        if (creepTypeQuantity < creepModels[name][0]) {
            for (let name in Memory.creeps) {
                if (!Game.creeps[name]) {
                    delete Memory.creeps[name];
                }
            }
            let spawn = helper.getFreeSpawn(room);
            let crecon = creepConstraction(creepModels[name][1]);
            let newName = name + Game.time;
            spawn.spawnCreep(crecon, newName, { memory: { role: name } });
        }
    }
};

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
