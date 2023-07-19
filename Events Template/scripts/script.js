// JSON feed URL for events and exhibits
//const feedURL = 'http://nmdcamediadev.wpengine.com/wp-json/tribe/events/v1/events';
const feedURL = 'https://test-dca-mc.nmdca.net/wp-json/tribe/events/v1/events';
// Name of venue for events/exhibits
const venue_name = "New Mexico History Museum";
// Category to search for Event or Exhibits
const event_or_exhibit = "Event";
// async function to parse json and events/exhibits into slides for a carousel
getData();

// async function to parse json and events/exhibits into slides for a carousel
async function getData() {
    // fetch to grab the promised response from the server
    const response = await fetch(feedURL, { mode: 'cors'});
    // grabbing the JSON data from the feed url promised response
    const data = await response.json();
    
    // If data is null, placing an empty or no event/exhibit slide
    if (data == null) {
        // Creating a slide div to place into the carousel
        const slide = document.createElement('div');
        // Setting carousel to item/slide to active via class
        slide.className = "carousel-item active";
        // Setting the interval between slides
        slide.setAttribute('data-bs-interval',15000);
        // Using DCA logo in place of other images
        image = "assets/thumbnail_dca-logo.png";
        // Creating the carousel inner HTML with divs and class settings
        slide.innerHTML = `

                    <div class="container-fluid p-0 text-white">
                        <div class="row">
                            <div class="col offset-3">
                                <p class="p-0 m-0 event-activities-type">ACTIVITIES</p>
                                <p class="event-datetime-text"> No Event Date <span class="pipe"> | </span> No Event Time </p>
                            </div>
                        </div>
                        <div class="row event-location-container">
                            <p class="col offset-3 text-dark">No Venue</p>
                        </div>
                        <div class="row">
                            <div class="col event-description-text">
                                <div class="pe-2 justify-content-end">
                                    <p class="event-title">No Event Description</p>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3" style="height: 50vh">
                            <div class="col d-flex justify-content-center" style="height: 60vh">
                                <img src=${image} class="img-fluid object-fit-cover h-100">
                            </div>
                        </div>
                    </div>
            `;
        // Placing the inner HTML slide into the carousel div 
        document.querySelector('.carousel-inner').appendChild(slide);
    } else {
        // What is being responded with if nothing, if events create carousel
        createCarousel(data.events);
    }
}

// Function to create carousel if there is data from the promised response
function createCarousel(events) {
    // Array/list to check first slide
    slide_array = [];
    slide_first = false;
    
    // Looping through events and exhibits items
    for(i = 0; i < events.length; i++) {
        // Grabbing the event at i or 0 - the length of events/exhibits
        const event = events[i];
        // Getting today's date to compare
        const todays_date = new Date();
        // Getting the event/exhibit start date and time
        const starting_date = new Date(event.start_date);
        
        // Checking the category ie event/exhibit, venue name and starting date beyond today's date
        if(event.categories[0].name == event_or_exhibit && venue_name == event.venue.venue && starting_date >= todays_date) {
            // Creating a div for the slide
            const slide = document.createElement('div');
            // Applying an ID to each slide based upon given number i or 0 - events.length
            slide.id = "item-"+i;
            // Pushing slide id to a list
            slide_array.push(slide.id);
                        
            // If slide_array length is 1 that means we're on the first slide so slide_first is equal to true
            if(slide_array.length == 1) {
                slide_first = true;
            } else {
                slide_first = false;
            }

            // If slide_first is true then this slide is the first slide and is placed as active; otherwise just setting the slide as a carousel item
            if(slide_first){
                slide.className = "carousel-item active";
            } else {
                slide.className = "carousel-item";
            }
            // Setting the slide interval for the slide
            slide.setAttribute('data-bs-interval',15000);

            // Using the event[i] image url 
            image = event.image.url;
            // Getting the start date week day
            start_date = new Date(event.start_date).toLocaleString('en-us', {weekday:'long'});
            // Options for formatting a date to return month and day
            options = {month: 'long', day: 'numeric'}
            // Getting month and day for event date
            event_date = new Date(event.start_date).toLocaleDateString('en-us', options);
            // Getting the start time for the event/exhibit
            start_time = new Date(event.start_date).toLocaleTimeString('en-us', { timeStyle: 'short'});
            // Getting the end time for the event/exhibit
            end_time = new Date(event.end_date).toLocaleTimeString('en-us', { timeStyle: 'short'});
            // Creating the inner HTML divs for the carousel and placing previously set data into the divs
            slide.innerHTML = `

                    <div class="container-fluid p-0 text-white">
                        <div class="row">
                            <div class="col offset-3">
                                <p class="p-0 m-0 event-activities-type">ACTIVITIES</p>
                                <p class="event-datetime-text"> ${start_date}, ${event_date} <span class="pipe"> | </span> ${start_time} - ${end_time} </p>
                            </div>
                        </div>
                        <div class="row event-location-container">
                            <p class="col offset-3 text-dark">${event.venue.venue}</p>
                        </div>
                        <div class="row">
                            <div class="col event-description-text">
                                <div class="pe-2 justify-content-end">
                                    <p class="event-title">${event.title}</p>
                                    ${event.description}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3" style="height: 50vh">
                            <div class="col d-flex justify-content-center" style="height: 60vh">
                                <img src=${image} class="img-fluid object-fit-cover h-100">
                            </div>
                        </div>
                    </div>
            `;
            // Adding the inner HTML to the carousel 
            document.querySelector('.carousel-inner').appendChild(slide);
        }
    }
}
/* const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const feedURL = 'http://nmdcamediadev.wpengine.com/wp-json/tribe/events/v1/events';
start_time = 'AM';
end_time = 'AM';

getData();


async function getData() {
    const response = await fetch(feedURL, { mode: 'cors'});
    const data = await response.json();
    
    images = []
    descriptions = []
    start_dates = []
    start_date_details = []
    end_dates = []
    end_date_details = []
    venues = []
    
    events = data.events;
    events = Array.from(events);
    for(i = 0; i < events.length; i++) {
        console.log(events[i]);
        images.push(events[i].image.url);
        descriptions.push(events[i].description);
        start_dates.push(events[i].start_date);
        end_dates.push(events[i].end_date);
        start_date_details.push(events[i].start_date_details);
        end_date_details.push(events[i].end_date_details);
        venues.push(events[i].venue);
    }
        
    htmlCarousel = `
            <div id="eventsTitle">
                Events
            </div>
            <div id="carouselSlides" class="carousel slide carousel-fade bg-dark" data-bs-ride="carousel" data-bs-pause="false">
              <div class="carousel-inner">
                <div id="item0" class="carousel-item active" data-bs-interval="1000">
                </div>
        `;
    htmlCarouselEnd = `
                </div>
            </div>
        `;
    for(i = 0; i < events.length; i++) {
        htmlCarousel += `
                <div id="item${i+1}" class="carousel-item" data-bs-interval="1000">
                </div>
        `;
    }
    
    htmlCarousel += htmlCarouselEnd;
    
    document.querySelector("#main").innerHTML = htmlCarousel;

    for(i = 0; i < events.length; i++) {
        idString = '#item' + i;
        if(parseInt(start_date_details[i].hour) >= 12) {
            if(parseInt(start_date_details[i].hour) == 12) {
                    start_time = parseInt(start_date_details[i].hour) + ":" + start_date_details[i].minutes + ' PM';
            } else {
                    start_time = (parseInt(start_date_details[i].hour) - 12)+ ":" + start_date_details[i].minutes + ' PM';
                }
        } else {
            if(parseInt(start_date_details[i].hour) == 0) {
                start_time = 12 + ":" + start_date_details[i].minutes + ' AM';

            } else {
                start_time = parseInt(start_date_details[i].hour)+ ":" + start_date_details[i].minutes + ' AM';
            }
        }

        if(parseInt(end_date_details[i].hour) >= 12) {
            if(parseInt(end_date_details[i].hour) == 12) {
                    end_time = parseInt(end_date_details[i].hour) + ":" + end_date_details[i].minutes + ' PM';
            } else {
                    end_time = (parseInt(end_date_details[i].hour) - 12) + ":" + end_date_details[i].minutes + ' PM';
                }
        } else {
            end_time = parseInt(end_date_details[i].hour) + ":" + end_date_details[i].minutes + ' AM';
        }

        htmlDescription = descriptions[i];
        htmlImage = `
                <img id="eventImg" src="${images[i]}" alt="Image" class="fade-in">
            `;
        htmlVenue = venues[i].venue;
        htmlDate = `
                <p id="dateTime"> ${dayNames[new Date(start_dates[i]).getDay()]}, ${monthNames[new Date(start_dates[i]).getDate()]} ${parseInt(start_date_details[i].day, 10)} <span id="bracket">|</span>
                ${start_time} - ${end_time}
                </p>
            `;
        htmlCarouselInsert = `
        
                    <div class="alignText">
                        <div id="activities">
                            <p id="activitiesTitle">ACTIVITIES</p>
                            <p id="dateTime">${htmlDate}</p>
                        </div>
                    </div>
                    <div id="location"> <p id="locationText">${htmlVenue}</p></div>
                    <div class="alignText">
                        <div id="eventContent">
                            ${htmlDescription}
                        </div>
                    </div>
                    <div id="eventImage">
                        ${htmlImage}
                    </div>
        `;
        document.querySelector(idString).innerHTML = htmlCarouselInsert;
        console.log(document.querySelector('#item1').innerHTML);
    }
}
*/