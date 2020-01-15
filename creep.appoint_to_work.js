module.exports = function(creeps) {
    creeps.forEach(creep => {
        // Очищаю все задания
        for (let name in creep.memory.work) delete creep.memory.work[name];

        // Назначаю новые задания
        if (creep.memory.role == "miner") creep.memory.work = { mine: true };
        if (creep.memory.role == "carrier") creep.memory.work = { carry: true };
    });
};
