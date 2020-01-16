module.exports = {
    // Функция нахождения свободного спавна
    getFreeSpawn: function(room) {
        let spawn = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
        spawn.forEach(spawn => {
            if (!spawn.spawning) return spawn;
        });
        return spawn[0];
    },

    // Функция поиска свободного ближайшего источника энергии
    getSuitableSource: function(creep, room) {
        let sources = room.find(FIND_SOURCES);
        let freeSources = [];
        let creeps = _.filter(Game.creeps); //TODO Заменить на фильтрацию крипов в конкретной комнате
        for (let i in sources) {
            creeps.forEach(cre => {
                if (cre.memory.source != sources[i].id) freeSources[i] = sources[i];
            });
        }

        let nearSource = getMinRange(creep, freeSources);

        return nearSource.id;
    },

    // Вибирает таргет до которого наименьшее растояние
    getMinRange: function(creep, targets) {
        return getMinRange(creep, targets);
    }
};

function getMinRange(creep, targets) {
    let minRange = 100;
    let nearTarget;
    targets.forEach(target => {
        if (minRange > creep.pos.getRangeTo(target)) {
            minRange = creep.pos.getRangeTo(target);
            nearTarget = target;
        }
    });
    return nearTarget;
}
