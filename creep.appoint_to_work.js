let helper = require("helper");

module.exports = function(creeps, room) {
    creeps.forEach(creep => {
        // Назначаю новые задания
        if (!creep.memory.work && creep.memory.role == "miner") {
            // Очищаю все задания
            for (let name in creep.memory.work) delete creep.memory.work[name];

            creep.memory.work = { mine: true };
            creep.memory.works = true;
            creep.memory.source = helper.getSuitableSource(creep, room);
            creep.say("⛏️");
        }
        if (!creep.memory.work && creep.memory.role == "carrier") {
            // Очищаю все задания
            for (let name in creep.memory.work) delete creep.memory.work[name];

            creep.memory.work = { carry: true };
            creep.memory.works = true;
            creep.say("🚚");
        }
    });
};
