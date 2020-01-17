var stage1 = require("stage1");
var stage2 = require("stage2");

module.exports.loop = function() {
    console.log(Game.time);
    // Перебор всех моих комнат через room мы будем обращаться ко всем структурам
    for (var name in Game.rooms) {
        var room = Game.rooms[name];
        // Разделение на этапы в зависимости от уровня контроллера
        switch (room.controller.level) {
            case 1:
                stage1(room);
                break;
            case 2:
                stage2(room);
                break;
        }

        // Создание крипов
    }
};
