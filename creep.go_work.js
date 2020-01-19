let helper = require("helper");
let plan = require("plan");

module.exports = function(creeps, room) {
    creeps.forEach(creep => {
        // Если крип типа майнер отправить копать энергию
        if (creep.memory.work.mine) {
            //если начальная стадия и нет контейнера то просто копать на землю иначе идти к контейнеру и копать в него
            if (room.memory.sourceContainers) {
                let container = room.memory.sourceContainer.find(sourceCont => sourceCont.idCreep == 0);
                let target = Game.getObjectById(creep.memory.source);
                if (creep.harvest(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container.x, container.y);
                }
            } else {
                let target = Game.getObjectById(creep.memory.source);
                if (creep.harvest(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }

        // Если крип типа carry возить энергию
        if (creep.memory.work.carry) {
            let target = findDropRes(room);

            if (creep.pickup(target) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(target);
            } else {
                let energeBoxs = room.find(FIND_STRUCTURES, {
                    filter: structure => {
                        return (
                            (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        );
                    }
                });
                let energeBox = creep.pos.findClosestByPath(energeBoxs);
                if (creep.transfer(energeBox, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energeBox);
                }
            }
        }

        // Если крип апгрейдер отправить апгрейдить
        if (creep.memory.work.upgrade) {
            let target = findDropRes(room);

            if (creep.pickup(target) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(target);
            } else {
                var targ = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } })[0];
                if (creep.upgradeController(targ) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targ);
                }
            }
        }

        // Если крип строитель отправить строить
        if (creep.memory.work.builds) {
            let target = findDropRes(room);

            if (creep.pickup(target) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(target);
            } else {
                var targs = room.find(FIND_CONSTRUCTION_SITES);
                let targ = creep.pos.findClosestByPath(targs);
                if (creep.build(targ) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targ);
                }
            }
        }
    });
};

// Поиск упавших ресурсов по принципу где больше
function findDropRes(room) {
    let dropReses = room.find(FIND_DROPPED_RESOURCES);
    let target;
    let amountMax = 0;
    dropReses.forEach(dropRes => {
        if (dropRes.amount > amountMax) {
            target = dropRes;
            amountMax = dropRes.amount;
        }
    });
    return target;
}
