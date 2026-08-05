document.addEventListener("DOMContentLoaded", () => {

    const directoryBox = document.getElementById("directory-box");
    const listViewBtn = document.getElementById("list-view-btn");
    const gridViewBtn = document.getElementById("grid-view-btn");

    // Default View
    directoryBox.classList.add("grid-view");
    gridViewBtn.classList.add("activebtn");

    // ==============================
    // Load Speakers
    // ==============================

    async function getSpeakers() {
        try {
            const response = await fetch("data/speakers.json");

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const speakers = await response.json();

            displaySpeakers(speakers);

        } catch (error) {

            console.error(error);

            directoryBox.innerHTML = `
                <p class="error">
                    Unable to load guest speakers.
                </p>
            `;
        }
    }

    // ==============================
    // Display Speakers
    // ==============================

    function displaySpeakers(speakers) {

        directoryBox.innerHTML = "";

        speakers.forEach((speaker) => {

            const card = document.createElement("article");
            card.classList.add("member-card");

            card.innerHTML = `

                <img
                    src="images/${speaker.image}"
                    alt="${speaker.name}"
                    loading="lazy"
                    width="200"
                    height="200">

                <h3>${speaker.name}</h3>

                <p class="membership-level">
                    ${speaker.role}
                </p>

                <p class="address">
                    ${speaker.position}
                </p>

                <a
                    href="${speaker.website}"
                    class="website-link"
                    target="_blank">

                    Learn More

                </a>

                <p class="description">
                    ${speaker.description}
                </p>

            `;

            directoryBox.appendChild(card);

        });

    }

    // ==============================
    // Grid View
    // ==============================

    gridViewBtn.addEventListener("click", () => {

        directoryBox.classList.add("grid-view");
        directoryBox.classList.remove("list-view");

        gridViewBtn.classList.add("activebtn");
        listViewBtn.classList.remove("activebtn");

    });

    // ==============================
    // List View
    // ==============================

    listViewBtn.addEventListener("click", () => {

        directoryBox.classList.add("list-view");
        directoryBox.classList.remove("grid-view");

        listViewBtn.classList.add("activebtn");
        gridViewBtn.classList.remove("activebtn");

    });

    // Initialize
    getSpeakers();

});