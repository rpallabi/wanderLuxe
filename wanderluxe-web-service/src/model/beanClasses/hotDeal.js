class HotDeal {
    constructor(obj) {
        this.destinationId = obj.destinationId;
        this.continent = obj.continent;
        this.name = obj.name;
        this.imageUrl = obj.imageUrl;
        this.details=obj.details;
        this.details.itinerary.dayWiseDetails.firstDay=obj.details.itinerary.dayWiseDetails.firstDay;
        this.details.itinerary.dayWiseDetails.restDaysSightSeeing=obj.details.itinerary.dayWiseDetails.restDaysSightSeeing;
        this.details.itinerary.dayWiseDetails.lastDay=obj.details.itinerary.dayWiseDetails.lastDay;
        this.details.itinerary.packageInclusions=obj.details.itinerary.packageInclusions;
        this.details.itinerary.tourHighlights=obj.details.itinerary.tourHighlights;
        this.details.itinerary.tourPace=obj.details.itinerary.tourPace;

        this.noOfNights = obj.noOfNights;
        this.flightCharges = obj.flightCharges;
        this.chargesPerPerson = obj.chargesPerPerson;
        this.discount = obj.discount;
        this.availability = obj.availability;
    }
}
module.exports = HotDeal;
