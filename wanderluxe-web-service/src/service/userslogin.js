const userDB = require('../model/userslogin');
const userService = {}

//login a user
userService.login = (contactNo, userPassword) => {
    return userDB.checkUser(contactNo).then((user) => {
        if (user == null) {
            let err = new Error("Enter registered contact number! If not registered, please register")
            err.status = 404
            throw err
        }
        else {
            return userDB.getPassword(contactNo).then((password) => {
                if (password != userPassword) {
                    let err = new Error("Incorrect password")
                    err.status = 406
                    throw err
                }
                else {
                    return user;
                }
            })
        }
    })
}
//Register as a new user
userService.register = (user) => {
    return userDB.checkUser(user.contactNo).then((userChk) => {
        if (userChk == null) {
            return userDB.generateId().then((id) => {
                user.userId = id;
                return (userDB.pushUser(user))
            })
        }
        else {
            let err = new Error("Already registered")
            err.status = 404
            throw err

        }
    })
}
userService.getUsers=()=>{
    return userDB.getUsers().then((u) => {
        if (u == null) {
            let err = new Error("No users found")
            err.status = 406
            throw err
        }
        else {
            return u;
        }
    })
}
userService.registerAdmin = (user) => {
    return userDB.checkUser(user.contactNo).then((userChk) => {
        if (userChk == null) {
            return userDB.generateAdminId().then((id) => {
                user.userId = id;
                return (userDB.pushUserAdmin(user))
            })
        }
        else {
            let err = new Error("Already registered")
            err.status = 404
            throw err

        }
    })
}
//delete User

userService.deleteUser = (uid) => {
    return userDB.deleteUser(uid).then((cancelData) => {
        if (cancelData == null) {
            let err = new Error("user deletion faild")
            err.status = 406
            throw err
        }
        else {
            return cancelData;

        }
    })
}
//Change user type
userService.userType=(userid,type)=>{
    return userDB.userChange(userid,type).then((user)=>{
        if(user!==null) return user;
        else{
            let err = new Error("No user found")
            err.status = 406
            throw err
        }
    })
}
//Get the bookings
userService.booking = (userId) => {
    return userDB.getBooking(userId).then((bookings) => {
        if (bookings == null) {
            let err = new Error("No bookings found")
            err.status = 406
            throw err
        }
        else {
            return bookings;

        }
    })
}
//--------------------------------------------------------------------------------------------------------
//Get the Hot Deals
userService.hotDeals = () => {
    return userDB.getHotDeals().then((hotDeal) => {
        if (hotDeal == null) {
            let err = new Error("No bookings found")
            err.status = 406
            throw err
        }
        else {
            return hotDeal;

        }
    })
}
//get the destinations
userService.destinations = () => {
    return userDB.getDestinations().then((pkgs) => {
        if (pkgs == null) {
            let err = new Error("No bookings found")
            err.status = 406
            throw err
        }
        else {
            return pkgs;

        }
    })
}
//Get the search Data

userService.getSearch = (continent) => {
    continent
    return userDB.searchPackages(continent).then((searches) => {
        if (searches == null) {
            let err = new Error("No searched data")
            err.status = 406
            throw err
        }
        else {
            return searches;

        }
    })
}
//-------------------------------------------------------------------------------------------------------//
//book new destination
userService.bookNow = (userId, destinationId, checkInDate, noOfPersons) => {
    return userDB.generateBookingId().then((bookId) => {
        return userDB.newBooking(userId, destinationId, bookId, checkInDate, noOfPersons).then((bookedData) => {
            if (bookedData == null) {
                let err = new Error("Booking not Done")
                err.status = 406
                throw err
            }
            else {
                return bookedData;

            }
        })
    })
}
//delet booked destination
userService.deleteBooking = (bookingId) => {
    return userDB.cancelBooking(bookingId).then((cancelData) => {
        if (cancelData == null) {
            let err = new Error("Booking cancelation faild")
            err.status = 406
            throw err
        }
        else {
            return cancelData;

        }
    })
}
//get details of a destination
userService.getdetails = (destinationId) => {
    return userDB.pkgDetails(destinationId).then((detailsData) => {
        if (detailsData == null) {
            let err = new Error("Details of this package is not available")
            err.status = 406
            throw err
        }
        else {
            return detailsData;

        }
    })

}
userService.pushHotDeals = (hotDealData) => {
    return userDB.generateHotDealId().then((hd) => {
        hotDealData.destinationId=hd;
        return userDB.pushHotDeal(hotDealData).then((deal) => {
            if (deal == null) {
                let err = new Error("Pushing hot deals failed")
                err.status = 500
                throw err
            }
            else {
                return deal;

            }
        })
    })
}
userService.pushPackages = (pkg) => {
    // console.log(pkg);
    return userDB.generatePackageId().then((hd) => {
        pkg.destinationId=hd;
        return userDB.pushDestination(pkg).then((p) => {
            if (p == null) {
                let err = new Error("Pushing package failed")
                err.status = 500
                throw err
            }
            else {
                return p;

            }
        })
    })
}
userService.deleteHotDeals = (hdid) => {
    return userDB.deleteHotdeal(hdid).then((data) => {
        if (data == null) {
            let err = new Error("HotDeals deletion faild")
            err.status = 406
            throw err
        }
        else {
            return data;

        }
    })
}
userService.deletePackages = (pkgid) => {
    return userDB.deletePackage(pkgid).then((data) => {
        if (data == null) {
            let err = new Error("Package deletion failed")
            err.status = 406
            throw err
        }
        else {
            return data;

        }
    })
}
//Subscribe
userService.subscribe=(email)=>{
    return userDB.subscribe(email).then((data)=>{
        if (data == null) {
            let err = new Error("email registration failed")
            err.status = 406
            throw err
        }
        else {
            return data;

        }
    })
}



module.exports = userService
