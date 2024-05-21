// script.js

// dashboard.js
function navigateTo(url) {
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchBusList();
    fetchRouteList();
    fetchCustomerList();
    fetchBookingList();
});

async function fetchBusList() {
    try {
        const response = await fetch("backend.php?action=getBuses");
        const data = await response.json();

        const busListContainer = document.getElementById("busList");
        busListContainer.innerHTML = "";

        data.forEach(bus => {
            const busCard = createCard(bus.name, `Route: ${bus.route}`, `Seats Available: ${bus.seats}`);
            busListContainer.appendChild(busCard);
        });
    } catch (error) {
        console.error("Error fetching bus list:", error);
    }
}

async function fetchRouteList() {
    try {
        const response = await fetch("backend.php?action=getRoutes");
        const data = await response.json();

        const routeListContainer = document.getElementById("routeList");
        routeListContainer.innerHTML = "";

        data.forEach(route => {
            const routeCard = createCard(route.name, `Distance: ${route.distance} km`);
            routeListContainer.appendChild(routeCard);
        });
    } catch (error) {
        console.error("Error fetching route list:", error);
    }
}

async function fetchCustomerList() {
    try {
        const response = await fetch("backend.php?action=getCustomers");
        const data = await response.json();

        const customerListContainer = document.getElementById("customerList");
        customerListContainer.innerHTML = "";

        data.forEach(customer => {
            const customerCard = createCard(customer.name, `Email: ${customer.email}`, `Phone: ${customer.phone}`);
            customerListContainer.appendChild(customerCard);
        });
    } catch (error) {
        console.error("Error fetching customer list:", error);
    }
}

async function fetchBookingList() {
    try {
        const response = await fetch("backend.php?action=getBookings");
        const data = await response.json();

        const bookingListContainer = document.getElementById("bookingList");
        bookingListContainer.innerHTML = "";

        data.forEach(booking => {
            const bookingCard = createCard(`Booking ID: ${booking.id}`, `Customer Name: ${booking.customer_name}`, `Bus Name: ${booking.bus_name}`, `Seat Number: ${booking.seat_number}`);
            bookingListContainer.appendChild(bookingCard);
        });
    } catch (error) {
        console.error("Error fetching booking list:", error);
    }
}

function createCard(...cardContent) {
    const card = document.createElement("div");
    card.classList.add("card");

    cardContent.forEach(content => {
        const p = document.createElement("p");
        p.textContent = content;
        card.appendChild(p);
    });

    return card;
}
