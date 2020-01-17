let stage2_1 = require("stage2_1");
let stage2_2 = require("stage2_2");

module.exports = function(room) {
    stage2_1(room);

    let extQuantity = room.find(FIND_STRUCTURES, {
        filter: structure => {
            return structure.structureType == STRUCTURE_EXTENSION;
        }
    }).length;

    // Если расширений 5 то произвести следующие действия
    if (extQuantity == 5) {
        stage2_2(room);
    }
};
function findExtentionQuantity() {}
