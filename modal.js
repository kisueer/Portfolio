// Funktion zum Öffnen eines Modals mit Animation
function openModal(modalId, event) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    const appElement = event.currentTarget.getBoundingClientRect();

    // Setzt die Modal-Position basierend auf dem geklickten Element
    modalContent.style.left = `${appElement.left + window.scrollX}px`;
    modalContent.style.top = `${appElement.top + window.scrollY}px`;
    modalContent.style.width = `${appElement.width}px`;
    modalContent.style.height = `${appElement.height}px`;

    // Erst Modal anzeigen, dann Animation starten
    modal.style.display = 'block';

    setTimeout(() => {
        modal.classList.add('show');
        modalContent.classList.add('show');

        // Modal auf volle Größe setzen
        modalContent.style.left = '50%';
        modalContent.style.top = '50%';
        modalContent.style.width = '50%';
        modalContent.style.height = 'auto';
        modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);

    // Hintergrund-Scroll deaktivieren
    document.body.style.overflow = 'hidden';
}

// Funktion zum Schließen eines Modals mit Animation
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.remove('show');
    modalContent.classList.remove('show');

    // Warte auf die Animation, bevor das Modal ausgeblendet wird
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.removeAttribute('style'); // Zurücksetzen der Inline-Stile
        document.body.style.overflow = ''; // Hintergrund-Scroll wieder aktivieren
    }, 400);
}

// Schließen des Modals bei Klick außerhalb des Inhalts
window.onclick = function (event) {
    document.querySelectorAll('.modal').forEach((modal) => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
};

// Schließen des Modals mit der Escape-Taste
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Hintergrund-Scroll wieder aktivieren
        });
    }
});
