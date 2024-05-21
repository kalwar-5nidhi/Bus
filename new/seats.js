document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const seatResults = document.getElementById('seat-results');

    searchBtn.addEventListener('click', function() {
        const busNo = document.getElementById('bus-no').value.trim();
        if (busNo !== '') {
            fetch(`your_api_endpoint?bus-no=${busNo}`)
                .then(response => response.json())
                .then(data => {
                    if (data.bookedSeats) {
                        seatResults.innerHTML = generateSeatTable(data.bookedSeats, busNo);
                    } else {
                        seatResults.innerHTML = '<p>No seat booked</p>';
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            seatResults.innerHTML = '<p>Please enter a valid bus number</p>';
        }
    });

    function generateSeatTable(bookedSeats, busNo) {
        let tableHtml = `<table>`;
        let seatNumber = 1;
        for (let i = 0; i < 4; i++) {
            tableHtml += '<tr>';
            for (let j = 0; j < 10; j++) {
                if (bookedSeats.includes(seatNumber)) {
                    tableHtml += `<td class="booked">${seatNumber}</td>`;
                } else {
                    tableHtml += `<td>${seatNumber}</td>`;
                }
                seatNumber++;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        tableHtml += `<div style="text-align: center; color: #9a031e; font-weight: bold;">${busNo}</div>`;
        return tableHtml;
    }
});
