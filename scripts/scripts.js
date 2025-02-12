async function fetchEvents(location = "New york") {
    const url = `https://www.eventbriteapi.com/v3/events/search/?location.address=${location}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer 2XUGVRGL3JSBTOC6LCAD",  // Use Bearer Token
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok && data.events) {
            console.log(data);  // Debugging: See API response in console
            displayEvents(data.events);
        } else {
            console.error("Error:", data.error_description || "Unknown error");
            document.getElementById("event-list").innerHTML = `<p>No events found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        document.getElementById("event-list").innerHTML = "<p>Failed to load events.</p>";
    }
}

function displayEvents(events) {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    if (events.length === 0) {
        eventList.innerHTML = "<p>No events found.</p>";
        return;
    }

    events.forEach(event => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event");

        eventItem.innerHTML = `
            <h3>${event.name.text}</h3>
            <p><strong>Date:</strong> ${event.start.local}</p>
            <p><strong>Venue:</strong> ${event.venue ? event.venue.name : "Unknown"}</p>
            <a href="${event.url}" target="_blank">View Event</a>
        `;

        eventList.appendChild(eventItem);
    });
}

// Example: Fetch events when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchEvents("Lagos");  // Change location as needed
});
