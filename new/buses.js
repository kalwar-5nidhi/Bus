const buses = [
    { busNumber: 'A101', route: 'City - Suburb', description: 'Standard bus' },
    { busNumber: 'B102', route: 'Suburb - City', description: 'Standard bus' },
    { busNumber: 'C201', route: 'City - Airport', description: 'Luxury bus' },
    { busNumber: 'D202', route: 'Airport - City', description: 'Luxury bus' },
    { busNumber: 'E301', route: 'City - Beach', description: 'Tourist bus' },
];

const rowsPerPage = 5;
let currentPage = 1;

function displayBuses(buses, page) {
    const busList = document.getElementById('busList');
    busList.innerHTML = '';

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginated = buses.slice(startIndex, endIndex);

    paginated.forEach(bus => {
        const row = document.createElement('tr');

        const checkbox = document.createElement('td');
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkbox.appendChild(checkboxInput);
        row.appendChild(checkbox);

        const busNumber = document.createElement('td');
        busNumber.textContent = bus.busNumber;
        row.appendChild(busNumber);

        const route = document.createElement('td');
        route.textContent = bus.route;
        row.appendChild(route);

        const description = document.createElement('td');
        description.textContent = bus.description;
        row.appendChild(description);

        const actions = document.createElement('td');
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        actions.appendChild(viewButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        actions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        actions.appendChild(deleteButton);

        row.appendChild(actions);
        busList.appendChild(row);
    });

    updatePagination(buses.length, page);
}

function updatePagination(totalItems, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.textContent = `Showing ${(currentPage - 1) * rowsPerPage + 1} to ${Math.min(currentPage * rowsPerPage, totalItems)} of ${totalItems} entries`;

    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(totalItems / rowsPerPage);
}

function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayBuses(buses, currentPage);
    }
}

function handleNextPage() {
    const totalPages = Math.ceil(buses.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayBuses(buses, currentPage);
    }
}

document.getElementById('prevPage').addEventListener('click', handlePrevPage);
document.getElementById('nextPage').addEventListener('click', handleNextPage);

displayBuses(buses, currentPage);