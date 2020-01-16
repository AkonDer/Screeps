let helper = require("helper");

module.exports = function(plan, room) {
    // определяем ближайший источник энергии от центра
    const posCenter = room.getPositionAt(room.memory.centerBase.x, room.memory.centerBase.y);
    let nearSource = posCenter.findClosestByPath(FIND_SOURCES);
    // Строим туда дорогу
    buildRoad(nearSource, plan, room);
};

function buildRoad(target, plan, room) {
    let listPorts = []; // Архив всех дорожных портов
    function countCoord(x, y) {
        if (plan[y][x] == "02") {
            const posRoad = new RoomPosition(x + room.memory.centerBase.x - 6, y + room.memory.centerBase.y - 5, room.name);
            listPorts.push([posRoad.getRangeTo(target), x + room.memory.centerBase.x - 6, y + room.memory.centerBase.y - 5]);
        }
    }

    if (!room.memory.roads) {
        let y = 0;
        for (let x = 0; x < plan[y].length; x++) countCoord(x, y);
        let x = 12;
        for (let y = 0; y < plan.length; y++) countCoord(x, y);
        y = 10;
        for (let x = 0; x < plan[y].length; x++) countCoord(x, y);
        x = 0;
        for (let y = 0; y < plan.length; y++) countCoord(x, y);

        // Сортируем для того что бы узнать ближайший до источника дорожный порт
        listPorts = listPorts.sort();

        // Строительство дороги к цели
        const findPathStart = room.getPositionAt(listPorts[0][1], listPorts[0][2]);
        let path = findPathStart.findPathTo(target, { ignoreCreeps: true });
        for (let i = 0; i < path.length - 1; i++) {
            room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
        }

        // Добавление в память комнаты информации о дороге
        room.memory.roads = [];
        room.memory.roads.push({ name: target.id, xBase: listPorts[0][1], yBase: listPorts[0][2] });
    }
}
