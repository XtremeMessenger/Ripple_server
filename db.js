//const path = require('path');
const config = require('./config.json');
const Sequelize = require('sequelize');
// your config file will be in your directory
const db = new Sequelize(config.database, config.username, config.password, {
   host: 'jayop2.cmu59wji766r.us-west-1.rds.amazonaws.com',
   port: 3300,
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
    usorname: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    first: Sequelize.STRING,
    last: Sequelize.STRING,
    quote: Sequelize.STRING,
    icon: Sequelize.STRING
})

const Friends = db.define('friends', {
    friendshipID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    // usor_id: Sequelize.INTEGER,
    // friend_id: Sequelize.INTEGER
})

const Messages = db.define('messages', {
    messageID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // sender_id: Sequelize.INTEGER,
    // reciever_id: Sequelize.INTEGER,
    text: Sequelize.STRING
})

const Rooms = db.define('rooms', {
    roomID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    password: Sequelize.STRING,
})
const UsorsRooms = db.define('usorsrooms', {
    userroomID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    // usor_id: Sequelize.INTEGER,
    // room_id: Sequelize.INTEGER
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
Messages.belongsTo(Usors, {
    foreignKey: 'sender_id', targetKey: 'usorID',
    foreignKey: 'receiver_id', targetKey: 'usorID'
})

Friends.belongsTo(Usors, {
    foreignKey: 'adding_usor_id', targetKey: 'usorID',
    foreignKey: 'added_usor_id', targetKey: 'usorID'
})

Videos.belongsTo(Usors, {
    foreignKey: 'usor_id', targetKey: 'usorID'
})

UsorsRooms.belongsTo(Rooms, {
    foreignKey: 'room_id', targetKey: 'roomID'
})

UsorsRooms.belongsTo(Usors, {
    foreignKey: 'usor_id', targetKey: 'usorID'
})


Usors.sync()
exports.Usors = Usors;

Friends.sync()
exports.Friends = Friends;

Messages.sync()
exports.Messages = Messages;

Videos.sync()
exports.Videos = Videos;

Rooms.sync()
exports.Rooms = Rooms;


//user.belongsTo(group, {foreignKey: 'group_id', targetKey: 'groupId'});

// .belongsTo(, {
//     foreignKey: '', targetKey: '',
// })