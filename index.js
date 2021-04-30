const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
const fs = require("fs");
const { stringify } = require('qs');
const Journey = require('./models/journey.js');
const methodOverride = require('method-override')
//const mongoDBStore = require('connect-mongo')(session);



const mongoose = require ("mongoose")
// mongoose.connect('mongodb://localhost:27017/journeyManagement', {useNewUrlParser: true, useUnifiedTopology: true}) 
//.then(()=> {
 //   console.log("Mongo Connection Open")
//})
//.catch(err => {
//console.log('error')
//})
mongoose.connect('mongodb+srv://nexhub1:12345@cluster0.tyo1d.mongodb.net/journeyManagement?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
})
// console.log(dbURL)




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))


 app.get('/DATA', async (rec, res) => {
     const trips = await Journey.find();
    res.render('index.ejs', {trips})
})

app.get('/LOGS', async (rec, res) => {
    const trips = await Journey.find();
    res.render('log.ejs', {trips})
})

app.post('/LOGS', async (req, res) => {
    const trips = await Journey.find();
    hold = req.body;
    res.render('logWDate.ejs', {trips, hold})
})

app.get('/JM', (rec, res) =>{
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    res.render('NexTier JM Bootstrap.html')
})


app.get('/COMPLETE', (rec, res) =>{
    res.render('completion.ejs')
})

app.post('/COMPLETE', async (req, res) =>{
    let tA = await Journey.find();
    let hold = req.body;
    complete(tA, hold)
    res.send('Your trip has been closed out!')
})

app.post('/JM', async (req, res) =>{
   let hold = req.body
   const trips = await Journey.find();
   addPoints(hold);
   saveData(hold, trips);
    res.send('Received, please submit your trip completion through www.NexTierOFS.com/COMPLETE')
})

app.use((req, res)=> {
        res.send('NOT FOUND')
})

const port = process.env.PORT || 3000

app.listen(port, () =>{
    console.log(port);
})

function addPoints(hold){
    let points = parseFloat(hold.Pass);
    points+= parseFloat(hold.roads);
    points+= parseFloat(hold.DayNight);
    points+= parseFloat(hold.Weather);
    points+= parseFloat(hold.Comunication);
    points+= parseFloat(hold.DRHours);
    points+= parseFloat(hold.Contr);
    hold.points = points;
}

async function saveData(hold){
    trip = {};
    trip.name = hold.fname;
    trip.employeeNum = hold.eNum;
    trip.phoneNum = hold.phoneNum;
    trip.points = hold.points;
    trip.truckNum = hold.truck;
    trip.trailerNum = hold.Trailer;
    trip.mileage = hold.Mile;
    trip.journeyStart = hold.TS;
    trip.driveTime = hold.TD;
    trip.expectedArival = hold.TE;
    trip.submissionDate = `${new Date()}`;
    trip.status = true;
    console.log(trip)
    const n = new Journey(trip);
    await n.save();
}

async function complete(tA, hold){
    for(i=0;i < tA.length; i++){
        if(tA[i].employeeNum === hold.eNum){
            if(tA[i].truckNum === hold.truckNumber){
                    if(tA[i].status === true){ 
                       const {id} = {id : tA[i]._id} 
                        tA[i].completionTime = hold.time;
                        tA[i].status = false;
                        tA[i].completionSubTime = `${new Date()}`;
                        console.log(id)
                        const n = await Journey.findByIdAndUpdate({_id: tA[i]._id}, tA[i], {new : true},function(err, updatedProfile){
                            if(err) { console.log(err)}});
                        console.log(n)
            }}            
            }
        }
    }

    