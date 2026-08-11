// scripts/join.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Set timestamp automatically when form is loaded/submitted
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Modal functionality for Membership cards
    const modals = [
        { btn: document.querySelector("#npButton"), modal: document.querySelector("#npModal") },
        { btn: document.querySelector("#bronzeButton"), modal: document.querySelector("#bronzeModal") },
        { btn: document.querySelector("#silverButton"), modal: document.querySelector("#silverModal") },
        { btn: document.querySelector("#goldButton"), modal: document.querySelector("#goldModal") }
    ];

    modals.forEach(item => {
        if (item.btn && item.modal) {
            // Open modal
            item.btn.addEventListener("click", () => {
                item.modal.showModal();
            });

            // Close button inside modal
            const closeBtn = item.modal.querySelector(".close-modal");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    item.modal.close();
                });
            }

            // Close when clicking outside the modal box
            item.modal.addEventListener("click", (event) => {
                const rect = item.modal.getBoundingClientRect();
                if (
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom
                ) {
                    item.modal.close();
                }
            });
        }
    });
});