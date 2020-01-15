module.exports = {
    // Функция нахождения свободного спавна
    getFreeSpawn: function(room) {
        let spawn = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_SPAWN } });
        spawn.forEach(spawn => {
            if (!spawn.spawning) return spawn;
        });
        return spawn[0];
    }
};
