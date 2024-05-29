const userDetails = require('./beanClasses/users');
const connection = require("../utilities/connections")

const usersDB = {}
usersDB.generateId = () => {
    let matches = []
    return connection.getUserCollection().then((model) => {
        return model.distinct("userId").then((ids) => {
            //console.log(ids);
            ids.map((id) => {
                numId = parseInt(id.match(/(\d+)/))
                matches.push(numId);
            })
            return ("U" + (Math.max(...matches) + 1));
        })
    })
}
usersDB.generateAdminId = () => {
    let matches = []
    return connection.getUserCollection().then((model) => {
        return model.distinct("userId").then((ids) => {
            //console.log(ids);
            ids.map((id) => {
                numId = parseInt(id.match(/(\d+)/))
                matches.push(numId);
            })
            return ("U" + (Math.max(...matches) + 1));
        })
    })
}
usersDB.generateBookingId = () => {
    let matches = []
    return connection.getBookingCollection().then((model) => {
        return model.distinct("bookingId").then((ids) => {
            //console.log(ids);
            ids.map((id) => {
                numId = parseInt(id.match(/(\d+)/))
                matches.push(numId);
            })
            return ("B" + (Math.max(...matches) + 1));
        })
    })
}
usersDB.generateHotDealId = () => {
    let matches = []
    return connection.getHotDealsCollection().then((model) => {
        return model.distinct("destinationId").then((ids) => {
            //console.log(ids);
            ids.map((id) => {
                numId = parseInt(id.match(/(\d+)/))
                matches.push(numId);
            })
            return ("HD" + (Math.max(...matches) + 1));
        })
    })
}
usersDB.generatePackageId = () => {
    let matches = []
    return connection.getPackageCollection().then((model) => {
        return model.distinct("destinationId").then((ids) => {
            //console.log(ids);
            ids.map((id) => {
                numId = parseInt(id.match(/(\d+)/))
                matches.push(numId);
            })
            return ("D" + (Math.max(...matches) + 1));
        })
    })
}
//------------/USER------------------------------------------------------------------------
usersDB.checkUser = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.findOne({ "contactNo": contactNo }).then((customerContact) => {
            if (customerContact) {
                return new userDetails(customerContact);
            }
            else return null;
        })
    })
}
usersDB.userChange=(userid,type)=>{
    newData={admin:type}
    console.log(newData);
    return connection.getUserCollection().then((collection)=>{
        return collection.findOneAndUpdate({userId:userid},newData );
    })
}
usersDB.getPassword = (contactNo) => {
    return connection.getUserCollection().then((collection) => {
        return collection.find({ "contactNo": contactNo }, { _id: 0, password: 1 }).then((password) => {
            if (password.length != 0)
                return password[0].password;
            else
                return null;
        })
    })
}
usersDB.pushUser = (user) => {

    return connection.getUserCollection().then((collection) => {

        return collection.create(user).then((data) => {
            if (data)
                return data;
            else
                return null;
        })
    })
}
usersDB.pushUserAdmin = (user) => {

    return connection.getUserCollection().then((collection) => {

        return collection.create(user).then((data) => {
            if (data)
                return data;
            else
                return null;
        })
    })
}
usersDB.getUsers=()=>{
    return connection.getUserCollection().then((collection)=>{
        return collection.find({}, { _id: 0 }).then((user) => {
            if (user != null)
                return user;
            else
                return null;
        })
    })
}

usersDB.deleteUser=(uid)=>{
    // console.log(data);
    return connection.getUserCollection().then((collection) => {
        return collection.deleteOne({ "userId": uid }).then((d) => {
            if (d)
                return d;
            else
                return null;
        })
    })
}
usersDB.getBooking = (userId) => {
    return connection.getBookingCollection().then((collection) => {
        return collection.find({ "userId": userId }, { _id: 0 }).then((bookings) => {
            if (bookings != null)
                return bookings;
            else
                return null;
        })
    })

}
//-----------/Package--------------------------------------------------------------------------------------------
usersDB.getHotDeals = () => {
    return connection.getHotDealsCollection().then((collection) => {
        return collection.find({}, { _id: 0 }).then((hotDeal) => {
            if (hotDeal != null)
                return hotDeal;
            else
                return null;
        })
    })

}
usersDB.pushHotDeal=(data)=>{
    // console.log(data);
    return connection.getHotDealsCollection().then((collection) => {
        return collection.create(data).then((d) => {
            if (d)
                return d;
            else
                return null;
        })
    })
}
usersDB.pushDestination=(data)=>{
    // console.log(data);
    return connection.getPackageCollection().then((collection) => {
        return collection.create(data).then((d) => {
            // console.log("d",d);
            if (d)
                return d;
            else
                return null;
        })
    })
}
usersDB.deleteHotdeal=(hdid)=>{
    // console.log(data);
    return connection.getHotDealsCollection().then((collection) => {
        return collection.deleteOne({ "destinationId": hdid }).then((d) => {
            if (d)
                return d;
            else
                return null;
        })
    })
}
usersDB.deletePackage=(pkgid)=>{
    // console.log(data);
    return connection.getPackageCollection().then((collection) => {
        return collection.deleteOne({ "destinationId": pkgid }).then((d) => {
            if (d)
                return d;
            else
                return null;
        })
    })
}
usersDB.getDestinations = () => {
    return connection.getPackageCollection().then((collection) => {
        return collection.find({}, { _id: 0 }).then((dest) => {
            if (dest != null)
                return dest;
            else
                return null;
        })
    })

}
usersDB.searchPackages = (destinations) => {
    let dest = destinations[0].toUpperCase() + destinations.slice(1)
    let mergedArray = []
    return connection.getPackageCollection().then((collection) => {
        return collection
            .find({
                $or: [
                    { "continent": { $regex: dest } },
                    { "name": { $regex: dest } },
                    { "details.itinerary.dayWiseDetails.restDaysSightSeeing": { $regex: dest } },
                    { "details.about": { $regex: dest } }
                ]
            })
    }).then((destination) => {
        if (destination) {
            return connection.getHotDealsCollection().then((hot) => {
                return hot
                    .find({
                        $or: [
                            { "continent": { $regex: dest } },
                            { "name": { $regex: dest } },
                            { "details.itinerary.dayWiseDetails.restDaysSightSeeing": { $regex: dest } },
                            { "details.about": { $regex: dest } }
                        ]
                    }).then((hotDeals) => {
                        if (hotDeals) {
                            destination.map((dest) => {
                                mergedArray.push(dest)
                            })
                            hotDeals.map((hDeals) => {
                                mergedArray.push(hDeals)
                            })
                        } return mergedArray
                    })
            })
        }
    })

}
//-------------/Book----------------------------------------------------------------------------------------------------
usersDB.newBooking = (userId, destinationId, bookId, checkInDate, noOfPersons) => {
    return connection.getUserCollection().then((userCollection) => {
        return userCollection.findOneAndUpdate({ "userId": userId }, { $push: { "bookings": bookId } }).then((customer) => {
            return connection.getPackageCollection().then((pkgCollection) => {
                return pkgCollection.find({ destinationId: destinationId }, { _id: 0, name: 1, noOfNights: 1, chargesPerPerson: 1 }).then((pkgData) => {
                    return connection.getBookingCollection().then((bookCollection) => {
                        if (customer) {
                            let checkOutDate = new Date(checkInDate)
                            return pkgCollection.updateOne({ destinationId: destinationId }, { $inc: { availability: -noOfPersons } }).then((des) => {
                                checkOutDate.setDate(checkOutDate.getDate() + pkgData[0].noOfNights)
                                let book = {
                                    "bookingId": bookId,
                                    "userId": userId,
                                    "destId": destinationId,
                                    "destinationName": pkgData[0].name,
                                    "checkInDate": (Date.parse(checkInDate)),
                                    "checkOutDate": checkOutDate,
                                    "noOfPersons": noOfPersons,
                                    "totalCharges": (pkgData[0].chargesPerPerson) * noOfPersons,
                                    "timeStamp": new Date()
                                }
                                return bookCollection.create(book).then((data) => {
                                    if (data)
                                        return data;
                                    else
                                        return null;
                                })
                            })


                        }
                        else return null;
                    })
                }).catch((err) => {
                    return connection.getHotDealsCollection().then((hotDeals) => {
                        return hotDeals.find({ destinationId: destinationId }, { _id: 0, name: 1, noOfNights: 1, chargesPerPerson: 1 }).then((pkgData) => {
                            return connection.getBookingCollection().then((bookCollection) => {
                                if (customer) {
                                    let checkOutDate = new Date(checkInDate)
                                    return hotDeals.updateOne({ destinationId: destinationId }, { $inc: { availability: -noOfPersons } }).then((update) => {
                                        checkOutDate.setDate(checkOutDate.getDate() + pkgData[0].noOfNights)
                                        let book = {
                                            "bookingId": bookId,
                                            "userId": userId,
                                            "destId": destinationId,
                                            "destinationName": pkgData[0].name,
                                            "checkInDate": (Date.parse(checkInDate)),
                                            "checkOutDate": checkOutDate,
                                            "noOfPersons": noOfPersons,
                                            "totalCharges": (pkgData[0].chargesPerPerson) * noOfPersons,
                                            "timeStamp": new Date()
                                        }
                                        return bookCollection.create(book).then((data) => {
                                            if (data)
                                                return data;
                                            else
                                                return null;
                                        })
                                    })

                                }
                                else return null;
                            })
                        })
                    })
                })

            })

        })
    })
}
usersDB.cancelBooking = (bookingId) => {
    return connection.getBookingCollection().then((bookingCollection) => {
        return connection.getUserCollection().then((userCollection) => {
            return connection.getPackageCollection().then((pkgCollection) => {
                return bookingCollection.find({ "bookingId": bookingId }, { _id: 0, userId: 1, destId: 1, noOfPersons: 1 }).then((pkgData) => {

                    let numAlphDest = (pkgData[0].destId.match(/[a-zA-Z]+/))[0]
                    if (numAlphDest === "D") {
                        return pkgCollection.updateOne({ "destinationId": pkgData[0].destId }, { $inc: { availability: pkgData[0].noOfPersons } }).then(() => {
                            return userCollection.findOneAndUpdate({ "userId": pkgData[0].userId }, { $pull: { "bookings": bookingId } }).then(() => {
                                return bookingCollection.deleteOne({ "bookingId": bookingId }).then((removedData) => {
                                    //console.log("yooooo",pkgData[0].noOfPersons,pkgData[0].destId,numAlphDest,pkgData[0].userId);

                                    if (removedData)
                                        return removedData;
                                    else
                                        return null;
                                })
                            })
                        }).catch((err) => {
                            return err
                        })
                    }
                    else {
                        return connection.getHotDealsCollection().then((hDC) => {
                            return hDC.updateOne({ "destinationId": pkgData[0].destId }, { $inc: { availability: pkgData[0].noOfPersons } }).then(() => {
                                return userCollection.findOneAndUpdate({ "userId": pkgData[0].userId }, { $pull: { "bookings": bookingId } }).then(() => {
                                    return bookingCollection.deleteOne({ "bookingId": bookingId }).then((removedData) => {
                                        //console.log("yo",pkgData[0].noOfPersons,pkgData[0].destId,pkgData[0].userId);
                                        if (removedData)
                                            return removedData;
                                        else
                                            return null;
                                    })
                                })
                            })
                        })
                    }



                })
            })
        })
    })

}
usersDB.pkgDetails = (destinationId) => {
    return connection.getPackageCollection().then((collection) => {
        return collection.find({ "destinationId": destinationId }, { _id: 0, details: 1 }).then((details) => {
            if (details != null)
                return details[0].details;
            else
                return null;
        })
    })

}
usersDB.subscribe=(email)=>{
    console.log(email);
    return connection.getSucbscribesCollection().then((collection) => {
        return collection.find({ "email": email }, { _id: 0, details: 1 }).then((details) => {
            if (details != null)
                return collection.create({email}).then((d)=>{
                    if(d) return d;
                    else return null;
            })
            else
                return null;
        })
    })
}


module.exports = usersDB;
