var mongoose = require('mongoose');
var config = require('../config');
mongoose.Promise = Promise;
mongoose.connect(config.dbUrl);
var ObjectId = mongoose.Schema.Types.ObjectId;
var UserSchema = new mongoose.Schema({
    email: String,
    avatar: String
});
var User = mongoose.model('User',UserSchema);
var RoomSchema = new mongoose.Schema({
    name: String,
    users: [{type: ObjectId,ref: 'User'}],
    messages: [{
        user: {type: ObjectId,ref: 'User'},
        content: String,
        createAt: {type: Date,default: Date.now()}
    }]
});
var Room = mongoose.model('Room',RoomSchema);
//导出用户模型
exports.User = User;
exports.Room = Room;
//Room.create([{name:'ReactJs'},{name:'AngularJs'}]);