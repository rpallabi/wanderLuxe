class Booking {
    constructor(obj) {
        this.userId = obj.userId;
        this.bookingId = obj.bookingId;
        this.destinationId = obj.destinationId;
        this.timeStamp = obj.timeStamp;
    }
}

module.exports = Booking;