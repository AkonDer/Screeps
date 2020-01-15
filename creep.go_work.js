var helper = require("helper");

module.exports = function(creeps, room) {
    creeps.forEach(creep => {
        if (creep.memory.work.mine) {
            let target = Game.getObjectById(creep.memory.source);
            if (creep.harvest(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {
                    visualizePathStyle: { stroke: "#ffffff" }
                });
            }
        }
    });
};
