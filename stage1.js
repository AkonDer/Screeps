// Все действия касаемые стадии 1
var creepCreate = require("creep.create");
const STAGE = 1;

module.exports = function(room) {
    creepCreate(STAGE, room);
};
