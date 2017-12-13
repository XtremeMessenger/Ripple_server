//const path = require('path');
const DBinfo = require('./config/DBinfo.json');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
// your config file will be in your directory
const env = require('./config/env.js')
const db = new Sequelize(DBinfo.database, DBinfo.username, DBinfo.password, {
   host: env.DB_HOST,
   port: env.DB_PORT,
   logging: console.log,
   maxConcurrentQueries: 100,
   dialect: 'mysql',
   dialectOptions: {
       ssl:'Amazon RDS'
   },
   pool: { maxConnections: 10, maxIdleTime: 15},
   language: 'en'
})

const Usors = db.define('usors', {
    usorID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    key: Sequelize.STRING,
    email: Sequelize.STRING,
    first: Sequelize.STRING,
    last: Sequelize.STRING,
    quote: Sequelize.STRING,
    icon: Sequelize.STRING
})

const Uploads = db.define('uploads',{
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    fileName: Sequelize.STRING
})

const Friends = db.define('friends', {
    friendshipID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ogUsor: Sequelize.STRING,
    friend: Sequelize.STRING
   
})

const Messages = db.define('messages', {
    messageID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    },
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    // sender_id: Sequelize.INTEGER,
    // reciever_id: Sequelize.INTEGER,
    text: Sequelize.STRING
})

const RoomMessages = db.define('messages', {
    messageID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    },
    name: Sequelize.STRING,
    from: Sequelize.STRING,
    // sender_id: Sequelize.INTEGER,
    // reciever_id: Sequelize.INTEGER,
    text: Sequelize.STRING
})

const DirectRooms = db.define('directrooms', {
    roomID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdby: Sequelize.STRING,
    friendname: Sequelize.STRING
})
DirectRooms.sync()
exports.DirectRooms = DirectRooms;

const DirectRoomTable = db.define('directroomtable', {
    directroomID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    friendname: Sequelize.STRING,
    room_id: Sequelize.INTEGER
})
DirectRoomTable.belongsTo(DirectRooms, {
    foreignKey: 'room_id', targetKey: 'roomID'
})
DirectRoomTable.sync()
exports.DirectRoomTable = DirectRoomTable;

const Rooms = db.define('rooms', {
    roomID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomname: Sequelize.STRING,
    password: Sequelize.STRING,
    resident: Sequelize.STRING
})

const UserRoomTable = db.define('userroom', {
    userroomID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    room_id: Sequelize.INTEGER
})

UserRoomTable.belongsTo(Rooms, {
    foreignKey: 'room_id', targetKey: 'roomID'
})

const Videos = db.define('videos', {
    videoID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // usor_id: Sequelize.INTEGER,
    video: Sequelize.STRING
})
// relationships
// Messages.belongsTo(Usors, {
//     foreignKey: 'sender_id', targetKey: 'usorID',
//     foreignKey: 'receiver_id', targetKey: 'usorID'
// })

// Friends.belongsTo(Usors, {
//     foreignKey: 'adding_usor_id', targetKey: 'usorID',
//     foreignKey: 'added_usor_id', targetKey: 'usorID'
// })

// Videos.belongsTo(Usors, {
//     foreignKey: 'usor_id', targetKey: 'usorID'
// })



// UsorsRooms.belongsTo(Usors, {
//     foreignKey: 'usor_id', targetKey: 'usorID'
// })


Usors.sync()
exports.Usors = Usors;

// UsorsRooms.sync()
// exports.UsorsRooms = UsorsRooms;

Uploads.sync()
exports.Uploads = Uploads;

Friends.sync()
exports.Friends = Friends;

Messages.sync()
exports.Messages = Messages;

RoomMessages.sync()
exports.RoomMessages = RoomMessages;

Videos.sync()
exports.Videos = Videos;

Rooms.sync()
exports.Rooms = Rooms;


//user.belongsTo(group, {foreignKey: 'group_id', targetKey: 'groupId'});

// .belongsTo(, {
//     foreignKey: '', targetKey: '',
// })