module.exports = function(room) {
    // Построить дорогу к ближайшему источнику
    build.buildRoad(Game.getObjectById(room.memory.sources[0][1]), plan, room);
};
