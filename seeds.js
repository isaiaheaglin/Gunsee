const Firearm = require('./models/firearm');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/guns');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const f = new Firearm({
    socialsecurity: '12435',
    firstname: 'isaiah',
    middlename: 'oneal',
    lastname: 'eaglin',
    gunname: 'glock43x',
    serialnumber: '23CS456453',
    locationbought: 'Houston,TX',
    dealername: 'USA GunRange',

})
f.save().then(f => {
    console.log(f);
})
.catch(e => {
    console.log(e);
})