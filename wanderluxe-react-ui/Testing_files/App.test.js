import React from "react";
import App from "./App.js";
import Home from "./components/home";
import Hotdeals from "./components/hotDeals";
import PackageOverview from "./components/packageOverview";
import ViewBookings from "./components/viewBookings";
import { shallow,mount,render } from "enzyme";
import Mysidebar from "./components/sidebar"


const testDataPackage = {

  destinationId: "D1001",
  continent: "Europe",
  imageUrl: "/assets/geece.jpg",
  name: "A Week in Greece: Athens, Mykonos & Santorini",
  details: {
    about: "Watch the setting sun from the hilltops of Greece’s most famous islands.Experience ancient history and open-air museums in the capital of Athens. Then, the quintessential, beautiful Greek islands you’ve been dreaming of come to life on the isles of Mykonos and Santorini.",
    itinerary: {
      dayWiseDetails: {
        firstDay: "Travel day: Board your overnight flight to Athens.",
        restDaysSightSeeing: [
          "Santorini",
          "Acropolis",
          "Parthenon",
          "Temple of Apollo",
          "Ruins of Olympia",
          "Ancient Theater of Epidaurus"
        ],
        lastDay: "Departure:Transfer to the airport for your flight home."
      },
      packageInclusions: [
        "7 nights in handpicked hotels",
        "7 breakfasts",
        "3 dinners with beer or wine",
        "3 guided sightseeing tours",
        "Expert tour director & local guides",
        "Private deluxe motor coach"
      ],
      tourHighlights: [
        "Greece",
        "Athens",
        "Mykonos",
        "Santorini",
        "Acropolis",
        "Parthenon",
        "Temple of Apollo",
        "Ruins of Olympia",
        "Ancient Theater of Epidaurus",
        "Corinth Canal photo stop"
      ],
      tourPace: [
        "On this guided tour, you will walk for about 2 hours daily across uneven terrain, including paved roads and unpaved trails, with some hills and stairs."
      ]
    }
  },
  noOfNights: 7,
  flightCharges: 500,
  chargesPerPerson: 2499,
  discount: 0,
  availability: 30
}

const testBookingData = {
 
  bookingId: "B1001",
  userId: "U1001",
  destId: "D1001",
  destinationName: "A Week in Greece: Athens, Mykonos & Santorini",
  checkInDate: "2018-12-09",
  checkOutDate: "2018-12-16",
  noOfPersons: 2,
  totalCharges: 5998,
  timeStamp: "1588850477237"
}
// App component
describe("App Component", () => {
  // test cases will be written here.

  test("checks for 1 nav tag", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('nav').length).toEqual(1);
  });

  test("checks for 1 tag with class .navbar-header", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".navbar-header").length).toEqual(1);
  });

  test("checks for initial state of logged_out state", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().logged_out).toEqual(false);
  });

  test("checks if Dialog component renders after change in state of dialog_visible to true", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ dialog_visible: true });
    expect(wrapper.find("Dialog").length).toEqual(1);
  });

  test("checks if logout Button exists if state of logged_userId is true", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ logged_userId: true });
    expect(wrapper.find("#logoutButton").length).toEqual(1);
  });


});

// Home component

describe("Home Component", () => {
  // test cases will be written here.

  test("check for 1 header component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find("header").length).toEqual(1);
  });

  test("checks for section component with id about", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find("#about").length).toEqual(1);
  });

  test("checks for section component with id signup ", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find("#signup").length).toEqual(1);
  });

  test("checks if packagePage state is true then Redirects to packages", () => {
    const wrapper = shallow(<Home />);
    wrapper.setState({ packagePage: true });
    expect(wrapper.find("Redirect").length).toEqual(1);
  });

  test("checks if logout Button exists if state of logged_userId is true", () => {
    const wrapper = shallow(<Home />);
    wrapper.find("#getPackage").simulate("click")
    expect(wrapper.state().packagePage).toEqual(true);
  });
});


// Hotdeals component

describe("Hotdeals Component", () => {
  // test cases will be written here.

  test("check for initial value of packageData", () => {
    const wrapper = shallow(<Hotdeals />);
    expect(wrapper.state().packageData).toEqual(null);
  });

  test("check if state gets updated properly for packagedata state", () => {
    const wrapper = shallow(<Hotdeals />);
    wrapper.setState({packageData:[testDataPackage]})
    expect(wrapper.state().packageData.length).toEqual(1);
  });

  // test("check if 2 Package components are there for 2 items in packageData state", () => {
  //   const wrapper = shallow(<Hotdeals />);
  //   wrapper.setState({ packageData: [testDataPackage] })
  //   expect(wrapper.find('Package').length).toEqual(1);
  // });


});

// PackageOverview component
describe("PackageOverview Component", () => {
  // test cases will be written here.

  test("check if 1 Accordion component present", () => {
    const wrapper = shallow(<PackageOverview data={testDataPackage}/>);
    expect(wrapper.find("Accordion").length).toEqual(1);
  });

  test("check if 3 Accordion tabs component present", () => {
    const wrapper = shallow(<PackageOverview data={testDataPackage}/>);
    expect(wrapper.find("AccordionTab").length).toEqual(3);
  });

  test("check if 3 component with row class present", () => {
    const wrapper = shallow(<PackageOverview data={testDataPackage} />);
    expect(wrapper.find(".row").length).toEqual(3);
  });
});

// Sidebar Component

describe("Mysidebar Component",()=>{
  test("Intial state of showItineraryPage state",()=>{
    const wrapper = shallow(<Mysidebar data={testDataPackage}/>);
    expect(wrapper.state().showItineraryPage).toEqual(true)
  })
  test("Check if 1 Sidebar component is present", () => {
    const wrapper = shallow(<Mysidebar data={testDataPackage} />);
    expect(wrapper.find('Sidebar').length).toEqual(1)
  })
  test("Check if 1 TabView component is present", () => {
    const wrapper = shallow(<Mysidebar data={testDataPackage} />);
    expect(wrapper.find('TabView').length).toEqual(1)
  })
  test("Check if 3 TabPanel components are present", () => {
    const wrapper = shallow(<Mysidebar data={testDataPackage} />);
    expect(wrapper.find('TabPanel').length).toEqual(3)
  })
  test("Check if 1 ul component is present", () => {
    const wrapper = shallow(<Mysidebar data={testDataPackage} />);
    expect(wrapper.find('ul').length).toEqual(1)
  })
  test("Check if 6 li components are present", () => {
    const wrapper = shallow(<Mysidebar data={testDataPackage} />);
    expect(wrapper.find('li').length).toEqual(6)
  })
  test("Check if 6 components with class-name days are present", () => {
    const wrapper = shallow(<Mysidebar data={testDataPackage} />);
    expect(wrapper.find('.days').length).toEqual(6)
  })


})

// ViewBookings component
describe("ViewBookings Component",()=>{
  test("check if setState works properly",()=>{
    const wrapper = shallow(<ViewBookings/>)
    wrapper.setState({userId:'U1003'})
    expect(wrapper.state().userId).toEqual('U1003')
  })

  test("check state of myBookings", () => {
    const wrapper = shallow(<ViewBookings />)
    wrapper.setState({ userId: 'U1002' })
    expect(wrapper.state().myBookings.length).toEqual(0)
  })
  test("check initial state of dialogVisible", () => {
    const wrapper = shallow(<ViewBookings />)
    
    expect(wrapper.state().dialogVisible).toEqual(false)
  })
  test("check state of dialogVisible when function initiate cancel is called", () => {
    const wrapper = shallow(<ViewBookings />)
    wrapper.instance().initiateCancel('B1004')

    expect(wrapper.state().dialogVisible).toEqual(true)
  })

  test("check state of bookingIdToCancel when function initiate cancel is called", () => {
    const wrapper = shallow(<ViewBookings />)
    wrapper.instance().initiateCancel('B1004')

    expect(wrapper.state().bookingIdToCancel).toEqual('B1004')
  })



})


