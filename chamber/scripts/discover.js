import { discoverItems } from '../data/discover.mjs';

// ==========================================
// 1. Render the Items of Interest Dynamically
// ==========================================
const cardContainer = document.getElementById('card-container');

if (cardContainer) {
    cardContainer.innerHTML = ""; // Clear existing content
    discoverItems.forEach(item => {
        const card = document.createElement('section');
        card.classList.add('discover-card');

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        cardContainer.appendChild(card);
    });

    // Add functionality to the "Learn More" buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    learnMoreButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = discoverItems[index];
            alert(`You clicked learn more about ${item.title} located at ${item.address}.`);
        });
    });
}

// ==========================================
// 2. Handle LocalStorage Visitor Message Logic
// ==========================================
const visitorMessageContainer = document.getElementById('visitor-message');

const lastVisitKey = 'accra_chamber_last_visit';
const currentTimestamp = Date.now();
const lastVisitTimestamp = localStorage.getItem(lastVisitKey);

let message = '';

if (!lastVisitTimestamp) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentTimestamp - Number(lastVisitTimestamp);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysDifference} days ago.`;
    }
}

if (visitorMessageContainer) {
    visitorMessageContainer.textContent = message;
}
localStorage.setItem(lastVisitKey, currentTimestamp);

// ==========================================
// 3. Dynamic Calendar Builder (August 2026 Summit)
// ==========================================
function createCalendar() {
    const calendarBody = document.getElementById("calendar-body");
    if (!calendarBody) return; // Exit gracefully if table doesn't exist

    calendarBody.innerHTML = ""; // Clear prior rows

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // Summit context: August 2026
    const year = 2026;
    const month = 7; // August is month index 7
    const summitDay = 15; // Matching Saturday, 15 August 2026

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let row = document.createElement("tr");

    // Empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= totalDays; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }

        const cell = document.createElement("td");
        cell.textContent = day;

        // Highlight actual real-world current day if matching
        if (day === currentDay && month === currentMonth && year === currentYear) {
            cell.classList.add("current-day");
        }

        // Highlight the Summit Event Day
        if (day === summitDay) {
            cell.classList.add("today");
            cell.title = "Business Bridge Summit 2026";
        }

        row.appendChild(cell);
    }

    // Pad remaining empty cells in the final row
    while (row.children.length > 0 && row.children.length < 7) {
        row.appendChild(document.createElement("td"));
    }

    calendarBody.appendChild(row);
}

createCalendar();