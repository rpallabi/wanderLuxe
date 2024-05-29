const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/wanderluxe_DB";

let userSchema = Schema({
    name: String,
    userId: String,
    emailId: String,
    contactNo: Number,
    password: String,
    bookings: [String],
    admin: Boolean,
}, { collection: "User" })
let emailSchema = Schema({
    email: String
},{collection:"Subscription"})

let bookingSchema = Schema({
    userId: String,
    bookingId: String,
    destId: String,
    destinationName: String,
    checkInDate: Date,
    checkOutDate: Date,
    noOfPersons: Number,
    totalCharges: Number,
    timeStamp: Date
}, { collection: "Booking" })

let packageSchema = Schema({
    destinationId: String,
    continent: String,
    imageUrl: String,
    name: String,
    details: Object,
    noOfNights: Number,
    flightCharges: Number,
    chargesPerPerson: Number,
    discount: Number,
    availability: Number
}, { collection: "Package" })

let hotDealsSchema = Schema({
    destinationId: String,
    continent: String,
    name: String,
    imageUrl: String,
    details: Object,
    noOfNights: Number,
    flightCharges: Number,
    chargesPerPerson: Number,
    discount: Number,
    availability: Number
}, { collection: "HotDeals" })

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        return database.model('User', userSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
collection.getBookingCollection = () => {
    //console.log("chk");
    return Mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        return database.model('Booking', bookingSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
collection.getPackageCollection = () => {
    return Mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        return database.model('Package', packageSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
collection.getHotDealsCollection = () => {
    return Mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        return database.model('HotDeals', hotDealsSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
collection.getSucbscribesCollection = () => {
    return Mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        return database.model('Subscription', emailSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
module.exports = collection;
