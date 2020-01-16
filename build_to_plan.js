let helper = require("helper");

module.exports = function(plan, room) {
    findDirectionForRoad(plan, room);
};

function findDirectionForRoad(plan, room) {
    var centerBase = { x: room.memory.centerBase.x, y: room.memory.centerBase.y }; // Получаем координаты центра базы
    let sources = room.find(FIND_SOURCES);
    const posCenter = new RoomPosition(centerBase.x, centerBase.y, room.name);

    // определяем ближайший источник энергии от центра
    let minRange = 100;
    let needSource;
    sources.forEach(source => {
        if (minRange > posCenter.getRangeTo(source)) {
            minRange = posCenter.getRangeTo(source);
            needSource = source;
        }
    });

    //Перебор всех значений в массиве
    // for (let y in plan) {
    //     console.log("------------------------------------------");
    //     for (let x in plan[y]) {
    //         console.log("x: " + x + " y: " + y + " -  " + plan[y][x]);
    //     }
    // }
    // console.log("*****************************************");

    // for (let y = 0; y < plan.length; y++) {
    //     console.log("------------------------------------------");
    //     for (let x = 0; x < plan[y].length; x++) {
    //         console.log("x: " + x + " y: " + y + " -  " + plan[y][x]);
    //     }
    // }
    // console.log("*****************************************");

    // Поиск ближайшего к источнику энергии порта базы

    // for (let y = 0; y < plan.length; y++) {
    //     for (let x = 0; x < plan[y].length; x++) {
    //         if (x == 12) {
    //             y = x;
    //             x = 12;
    //             break;
    //         }
    //         console.log("x: " + x + " y: " + y + " -  " + plan[y][x]);
    //     }
    //     console.log("------------------------------------------");
    // }
    // console.log("==================================================");

    if (!room.memory.roads) {
        minRange = 100;
        let minRngeRoad = { x: 0, y: 0 };

        let y = 0;
        for (let x = 0; x < plan[y].length; x++) {
            if (plan[y][x] == "02") {
                const posRoad = new RoomPosition(x + centerBase.x - 6, y + centerBase.y - 5, room.name);
                if (minRange > posRoad.getRangeTo(needSource)) {
                    minRange = posRoad.getRangeTo(needSource);
                    minRngeRoad.x = x + centerBase.x - 6;
                    minRngeRoad.y = y + centerBase.y - 5;
                }
            }
        }

        let x = 12;
        for (let y = 0; y < plan.length; y++) {
            if (plan[y][x] == "02") {
                const posRoad = new RoomPosition(x + centerBase.x - 6, y + centerBase.y - 5, room.name);
                if (minRange > posRoad.getRangeTo(needSource)) {
                    minRange = posRoad.getRangeTo(needSource);
                    minRngeRoad.x = x + centerBase.x - 6;
                    minRngeRoad.y = y + centerBase.y - 5;
                }
            }
        }

        y = 10;
        for (let x = 0; x < plan[y].length; x++) {
            if (plan[y][x] == "02") {
                const posRoad = new RoomPosition(x + centerBase.x - 6, y + centerBase.y - 5, room.name);
                if (minRange > posRoad.getRangeTo(needSource)) {
                    minRange = posRoad.getRangeTo(needSource);
                    minRngeRoad.x = x + centerBase.x - 6;
                    minRngeRoad.y = y + centerBase.y - 5;
                }
            }
        }

        x = 0;
        for (let y = 0; y < plan.length; y++) {
            if (plan[y][x] == "02") {
                const posRoad = new RoomPosition(x + centerBase.x - 6, y + centerBase.y - 5, room.name);
                if (minRange > posRoad.getRangeTo(needSource)) {
                    minRange = posRoad.getRangeTo(needSource);
                    minRngeRoad.x = x + centerBase.x - 6;
                    minRngeRoad.y = y + centerBase.y - 5;
                }
            }
        }

        // Строительство дороги к цели
        const findPathStart = new RoomPosition(minRngeRoad.x, minRngeRoad.y, room.name);
        let path = findPathStart.findPathTo(needSource);
        for (let i = 0; i < path.length - 1; i++) {
            room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
        }

        // Добавление в память комнаты информации о дороге
        room.memory.roads = [];
        room.memory.roads.push({ name: needSource.id, xBase: minRngeRoad.x, yBase: minRngeRoad.y });
    }
}
