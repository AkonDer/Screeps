let helper = require("helper");

module.exports = function(creeps, room) {
    creeps.forEach(creep => {
        // Если крип типа майнер отправить копать энергию
        if (creep.memory.work.mine) {
            let target = Game.getObjectById(creep.memory.source);
            if (creep.harvest(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: "#ffffff" }
                });
            }
        }

        // Если крип типа carry отправить возить упавшую энергию
        if (creep.memory.work.carry) {
            let targets = room.find(FIND_DROPPED_RESOURCES);
            let target = helper.getMinRange(creep, targets);

            if (creep.pickup(target) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: "#ffffff" }
                });
            } else {
                var spawn = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } })[0];
                if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, {
                        visualizePathStyle: { stroke: "#ffffff" }
                    });
                }
            }
        }

        // Если крип апгрейдер отправить апгейдить
        if (creep.memory.work.upgrade) {
            let targets = room.find(FIND_DROPPED_RESOURCES);
            let target = helper.getMinRange(creep, targets);

            if (creep.pickup(target) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: "#ffffff" }
                });
            } else {
                var spawn = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } })[0];
                if (creep.upgradeController(spawn) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, {
                        visualizePathStyle: { stroke: "#ffffff" }
                    });
                }
            }
        }
    });
};
