const mongoose = require ("mongoose")
const Journey = require('./models/journey.js');


//mongoose.connect('mongodb://localhost:27017/journeyManagement', {useNewUrlParser: true, useUnifiedTopology: true})
//.then(()=> {
//        console.log("Mongo Connection Open")
//})
//.catch(err => {
//    console.log('error')
//})

mongoose.connect('mongodb+srv://nexhub1:12345@cluster0.tyo1d.mongodb.net/journeyManagement?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
})

const j = [{
    name: 'Jordan Essman',
    employeeNum: '015250',
    phoneNum: '817-894-0087',
    points: 15,
    truckNum: '154820',
    trailerNum: '456185',
    mileage: 54750,
    journeyStart: '11:50',
    driveTime: '5 hrs',
    expectedArival: '15:40',
    submissionDate: 'Thu Apr 08 2021 01:21:20 GMT-0500 (Central Daylight Time)',
    status: true,
    completionTime: '16:00',
    completionSubTime: 'Thu Apr 08 2021 01:21:20 GMT-0500 (Central Daylight Time)'
},
{
    name: 'Bob Bobberson',
    employeeNum: '555',
    phoneNum: '817-894-0087',
    points: 15,
    truckNum: '22222',
    trailerNum: '45215',
    mileage: 54750,
    journeyStart: '11:50',
    driveTime: '5 hrs',
    expectedArival: '15:40',
    submissionDate: 'Thu Apr 08 2021 01:21:20 GMT-0500 (Central Daylight Time)',
    status: true,
    completionTime: '16:00',
    completionSubTime: 'Thu Apr 08 2021 01:21:20 GMT-0500 (Central Daylight Time)'
},
{
    name: 'John Doe',
    employeeNum: '111',
    phoneNum: '817-894-0087',
    points: 15,
    truckNum: '11111',
    trailerNum: '456185',
    mileage: 54750,
    journeyStart: '11:50',
    driveTime: '5 hrs',
    expectedArival: '15:40',
    submissionDate: 'Thu Apr 08 2021 01:21:20 GMT-0500 (Central Daylight Time)',
    status: true,
    completionTime: '16:00',
    completionSubTime: 'Thu Apr 08 2021 01:21:20 GMT-0500 (Central Daylight Time)'
}]

Journey.insertMany(j)
.then( res => {
    console.log(res)
})
.catch(e =>{
    console.log(e)
})