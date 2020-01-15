let helper = require("helper");

module.exports = function(creeps, room) {
    creeps.forEach(creep => {
        // Очищаю все задания
        for (let name in creep.memory.work) delete creep.memory.work[name];

        // Назначаю новые задания
        if (creep.memory.role == "miner") {
            creep.memory.work = { mine: true };
            creep.memory.source = helper.getSuitableSource(creep, room);
            console.log(1);
        }
        if (creep.memory.role == "carrier") creep.memory.work = { carry: true };
    });
};
