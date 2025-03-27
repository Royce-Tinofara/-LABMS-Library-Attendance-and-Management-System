// Toggle Sidebar
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Chart.js Configuration
const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
};

// Borrowed Books Bar Chart
const borrowedBarsCtx = document.getElementById('borrowedBarsChart').getContext('2d');
new Chart(borrowedBarsCtx, {
    type: 'bar',
    data: {
        labels: ['Month 1','Month 2','Month 3','Month 4'] ,
        datasets: [{
            label:'Borrowed books',
            data: [11, 21, 15, 13],
            backgroundColor: ['#f97319','#ffedcc', '#8b9467','#374151'],
            borderRadius: 4
        }]
    },
    options: chartOptions

});

// Borrowed Books Pie Chart
const borrowedPieCtx = document.getElementById('borrowedPieChart').getContext('2d');
new Chart(borrowedPieCtx, {
    type: 'doughnut',
    data: {
        labels: ['Sci-fi', 'Crime', 'Romance', 'Politics'],
        datasets: [{
            data: [11, 21, 15,13],
            backgroundColor: ['#f97319','#ffedcc', '#8b9467','#374151']
        }]
    },
    options: {
        ...chartOptions,
        cutout: '60%'
    }
});

function updateOutstandingFines() {
    // Simulate fetching outstanding fines (e.g., from an API)
    const outstandingFines = $22; // Example number
    document.getElementById('outstandingFines').innerText = outstandingFines;
}

// Call the function to set the current attendance on page load
updateOutstandingFines();