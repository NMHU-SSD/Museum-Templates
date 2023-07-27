const feedURL = 'http://nmdcamediadev.wpengine.com/wp-json/tribe/events/v1/events';
const venue_name = "New Mexico History Museum";
getData();

async function getData() {
    const response = await fetch(feedURL, { mode: 'cors'});
    const data = await response.json();
    if (data == null) {
        const slide = document.createElement('div');
        slide.className = "carousel-item active";
        slide.setAttribute('data-bs-interval',15000);
        image = "assets/thumbnail_dca-logo.png";
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
        document.querySelector('.carousel-inner').appendChild(slide);
    }
    //what is being responded with if nothing, if events create carousel
    createCarousel(data.events);
}

function createCarousel(events) {
    
    for(i = 0; i < events.length; i++) {
        const event = events[i];
        const todays_date = new Date();
        const starting_date = new Date(event.start_date);
        if(events[i].venue.venue == venue_name && starting_date > todays_date) {
            console.log(i);
            const slide = document.createElement('div');
            console.log(events[i].venue.venue);
            slide.id = "item-"+i;
            slide_check = document.getElementById("item-"+(i-1));
            if(slide_check == null){
                slide.className = "carousel-item active";
            } else {
                slide.className = "carousel-item";
            }
            slide.setAttribute('data-bs-interval',15000);

            image = event.image.url;
            start_date = new Date(event.start_date).toLocaleString('en-us', {weekday:'long'});
            options = {month: 'long', day: 'numeric'}
            event_date = new Date(event.start_date).toLocaleDateString('en-us', options);
            start_time = new Date(event.start_date).toLocaleTimeString('en-us', { timeStyle: 'short'});
            end_time = new Date(event.end_date).toLocaleTimeString('en-us', { timeStyle: 'short'});
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