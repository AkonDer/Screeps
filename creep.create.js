// Создание крипов

module.exports = function(stage, room) {
    switch (stage) {
        case 1:
            creepCreate({ MOVE: 2, WORK: 1, CARRY: 1 });
            break;
    }
};

function creepCreate(composition) {
    console.log(creepConstraction(composition));
}

// Функция переделывает объект с частями крипа в массив пригодный для указания в качестве параметра для функции создания
function creepConstraction(composition) {
    var constr = [];
    for (var name in composition) {
        for (let i = 0; i < composition[name]; i++) {
            constr.push(name);
        }
    }
    return constr;
}
