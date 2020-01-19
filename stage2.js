let stage2_1 = require("stage2_1");
let stage2_2 = require("stage2_2");

module.exports = function(room) {
    if (!room.memory.endStage2_1) stage2_1(room);

    // Если расширений 5 то произвести следующие действия
    if (findExtentionQuantity(room) == 5) {
        room.memory.endStage2_1 = true;
        stage2_2(room);
    }
};

// Нахождение количества расширений в комнате
function findExtentionQuantity(room) {
    return room.find(FIND_STRUCTURES, {
        filter: structure => {
            return structure.structureType == STRUCTURE_EXTENSION;
        }
    }).length;
}
