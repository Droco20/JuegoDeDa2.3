const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const mongooseSoftDelete = require('mongoose-delete');

const userSchema = new Schema({
    id: {
        type: ObjectId
    },
    type: {
        type: String,
        default: "",
    },
    gamers: [{
        name: {
            type: String,
            trim: true,
            require: true
        },
        bet: {
            type: Number,
            default: 0,
            require: true
        }
    }],
    inProgress: {
        type: Boolean,
        default: false,
    },
    winner: {
        name: {
            type: String,
            default: '',
        }
    }
}, { timestamps: true });

userSchema.plugin(mongooseSoftDelete);


module.exports = User = mongoose.model('User', userSchema);