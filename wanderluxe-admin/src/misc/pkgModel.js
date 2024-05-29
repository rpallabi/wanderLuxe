class Pkg {
    constructor(obj) {
        {
            console.log(obj);
            this.continent= obj.continent,
            this.name= obj.name,
            this.imageUrl= obj.imageUrl,
            this.details.about= obj.about,
            this.details.itinerary.dayWiseDetails.firstDay= obj.ss[0],
            this.details.itinerary.dayWiseDetails.restDaysSightSeeing= obj.ss.slice(1, -1),
            this.details.itinerary.dayWiseDetails.lastDay= obj.sightSeeing[obj.ss.length - 1];
            this.details.itinerary.packageInclusions=obj.pkinc,
            this.details.itinerary.tourHighlights=obj.th,
            this.details.itinerary.tourPace=obj.tourPace,
            this.noOfNights= obj.noOfNights,
            this.flightCharges= obj.flightCharges,
            this.chargesPerPerson= obj.chargesPerPerson,
            this.discount= obj.discount,
            this.availability= obj.availability
        }
    }
}

module.exports = Pkg;