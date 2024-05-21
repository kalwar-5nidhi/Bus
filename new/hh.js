document.addEventListener('DOMContentLoaded', function() {
  const dashboardCard = document.getElementById('Dashboard');
  const busesCard = document.getElementById('Buses');

  dashboardCard.addEventListener('click', function() {
      window.location.href = 'dashboard.html';
  });

  busesCard.addEventListener('click', function() {
      window.location.href = 'buses.html';
  });

  document.getElementById('routes-card').addEventListener('click', function() {
      window.location.href = 'routes.html';
  });

  document.getElementById('customers-card').addEventListener('click', function() {
      window.location.href = 'customers.html';
  });

  document.getElementById('booking-card').addEventListener('click', function() {
      window.location.href = 'booking.html';
  });

  document.getElementById('seats-card').addEventListener('click', function() {
      window.location.href = 'seats.html';
  });
});
