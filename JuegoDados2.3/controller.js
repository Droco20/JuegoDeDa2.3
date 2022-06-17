const ObjectId = require("mongoose").Types.ObjectId;
const User = require("./models");

/**
 * llena el formulario y por ende se crea el juego
 * es posible visiualizaren el enlace localhost:3000/startGame
 */
exports.CreateGet = (req, res) => {
    res.render("create");
};

/**crea el juego con los datos de los jugadores */
exports.CreatePost = async(req, res) => {
    const game = new User({
        id: req.body.id,
        type: req.body.type,
        gamers: req.body.gamers,
    });

    game
        .save()
        .then((result) => {
            res.json({
                id: result._id,
                type: result.type,
                gamers: [
                    result.gamers[0].name,
                    result.gamers[1].name,
                    result.gamers[2].name,
                ],
            });
        })
        .catch((err) => {
            res.json(err);
        });
};

exports.StartGet = (req, res) => {
    res.render("start");
};

/**
 * funcion para generar numero aleatorio.
 *
 */
function Randnber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * permite el registro de la apuesta del jugador
 * es posible visiualizaren el enlace localhost:3000/startGame
 */
exports.StartPost = (req, res) => {
    let body = req.body;
    for (let i = 0; i < 3; i++) {
        User.findOne({ _id: body._id })
            .then((result) =>
                User.updateOne({ _id: body._id }, {
                    $set: { "gamers.$[gamer].bet": body.gamers[i].bet },
                }, {
                    arrayFilters: [
                        { "gamer._id": { $eq: ObjectId(result.gamers[i]._id) } },
                    ],
                })
            )
            .catch((err) => {
                res.json(err);
            });
    }
    setTimeout(() => {
        User.findOne({ _id: body._id })
            .then((result) => {
                res.json({
                    id: result._id,
                    type: "",
                    gamerBet: {
                        [result.gamers[0]._id]: result.gamers[0].bet,
                        [result.gamers[1]._id]: result.gamers[1].bet,
                        [result.gamers[2]._id]: result.gamers[2].bet,
                    },
                });
            })
            .catch((err) => {
                res.json(err);
            });
    }, 500);
    User.findOne({ _id: body._id }).then((result) => {
        let num = Randnber(1, 6);
        console.log(num);
        for (let i = 0; i < 3; i++) {
            if (num === result.gamers[i].bet) {
                User.updateOne({ _id: body._id }, {
                    $set: {
                        winner: { name: result.gamers[i].name },
                    },
                }).catch((err) => console.log(err));
                break;
            }
        }
    });
};

/**
 * Muestra los datos del ganador del juego.
 */
exports.winnerPlayerGet = (req, res) => {
    const id = req.params.id;
    let winExist = false;
    User.findById(id).then((result) => {
        for (let i = 0; i < 3; i++) {
            if (result.gamers[i].name === result.winner.name) {
                {
                    res.json({
                        id: result.gamers[i]._id,
                        name: result.winner.name,
                    });
                }
                winExist = true;
            }
        }
    });
    User.findById(id)
        .then(() => {
            if (winExist === false) {
                res.json({
                    winner: "No hay ganador, inicie un nuevo juego",
                });
            }
        })
        .catch((err) => {
            res.json(err);
        });
};
/**
 * Muestra los juegos creados en un json
 */
exports.games = (req, res) => {
    const data = User.find({
        $or: [{ delete: { $eq: false } }, { delete: { $exists: false } }],
    });
    data;
    res
        .render("games")
        .then((result) => res.json(result))
        .catch((err) => console.log(err));
};

// exports.get('/', function(req, res, next) {
//     const data = User.find({
//         $or: [
//             { 'delete': { $eq: false } },
//             { 'delete': { $exists: false } },
//         ]
//     });
//     data
//         .then(resul => {
//             const games = {
//                 id: result,
//                 gamers: result,
//                 inProgress: true

//             }
//             res.json(games)
//         })
//         .catch(err => console.log(err))

// })

/**
 * Obtiene la informacion del juego especificado de la manera solicitada.
 */
exports.showDetailsGame = async(req, res) => {
    const id = req.params.id;
    let winExist = false;
    User.findById(id).then((result) => {
        for (let i = 0; i < 3; i++) {
            if (result.gamers[i].name === result.winner.name) {
                res.json({
                    id: result._id,
                    gamers: {
                        [result.gamers[0]._id]: {
                            id: result.gamers[0]._id,
                            name: result.gamers[0].name,
                        },
                        [result.gamers[1]._id]: {
                            id: result.gamers[1]._id,
                            name: result.gamers[1].name,
                        },
                        [result.gamers[2]._id]: {
                            id: result.gamers[2]._id,
                            name: result.gamers[2].name,
                        },
                    },
                    inProgress: false,
                    winner: {
                        id: result.gamers[i]._id,
                        name: result.winner.name,
                    },
                });
                winExist = true;
                break;
            }
        }
    });
    User.findById(id)
        .then((result) => {
            if (winExist === false) {
                res.json({
                    id: result._id,
                    gamers: {
                        [result.gamers[0]._id]: {
                            id: result.gamers[0]._id,
                            name: result.gamers[0].name,
                        },
                        [result.gamers[1]._id]: {
                            id: result.gamers[1]._id,
                            name: result.gamers[1].name,
                        },
                        [result.gamers[2]._id]: {
                            id: result.gamers[2]._id,
                            name: result.gamers[2].name,
                        },
                        inProgress: true,
                    },
                });
            }
        })
        .catch((err) => {
            res.json(err);
        });
};

module.exports = exports;