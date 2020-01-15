var stage1 = require("stage1");

module.exports.loop = function() {
    // Перебор всех моих комнат через room мы будем обращаться ко всем структурам
    for (var name in Game.rooms) {
        var room = Game.rooms[name];

        // Разделение на этапы в зависимости от уровня контроллера
        switch (room.controller.level) {
            case 1:
                stage1(room);
                break;
        }

        // Создание крипов
    }
};
