let helper = require("helper");
let plan = require("plan");

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

        // Если крип апгрейдер отправить апгрейдить
        if (creep.memory.work.upgrade) {
            let targets = room.find(FIND_DROPPED_RESOURCES);
            let target = helper.getMinRange(creep, targets);

            if (creep.pickup(target) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: "#ffffff" }
                });
            } else {
                var targ = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } })[0];
                if (creep.upgradeController(targ) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targ, {
                        visualizePathStyle: { stroke: "#ffffff" }
                    });
                }
            }
        }

        // Если крип строитель отправить строить
        if (creep.memory.work.builds) {
            let targets = room.find(FIND_DROPPED_RESOURCES);
            let target = helper.getMinRange(creep, targets);

            if (creep.pickup(target) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: "#ffffff" }
                });
            } else {
                var targs = room.find(FIND_CONSTRUCTION_SITES);
                let targ = helper.getMinRange(creep, targs);
                if (creep.build(targ) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targ, {
                        visualizePathStyle: { stroke: "#ffffff" }
                    });
                }
            }
        }
    });
};
