function openModal(modalId, event) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    const appElement = event.currentTarget.getBoundingClientRect();

    modalContent.style.left = `${appElement.left + window.scrollX}px`;
    modalContent.style.top = `${appElement.top + window.scrollY}px`;
    modalContent.style.width = `${appElement.width}px`;
    modalContent.style.height = `${appElement.height}px`;

    modal.style.display = 'block';

    setTimeout(() => {
        modal.classList.add('show');
        modalContent.classList.add('show');

        modalContent.style.left = '50%';
        modalContent.style.top = '50%';
        modalContent.style.width = '50%';
        modalContent.style.height = 'auto';
        modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);

    // Hintergrund-Scroll deaktivieren
    document.body.style.overflow = 'hidden';
}


function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.remove('show');
    modalContent.classList.remove('show');


    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.removeAttribute('style'); 
        document.body.style.overflow = '';
    }, 400);
}


window.onclick = function (event) {
    document.querySelectorAll('.modal').forEach((modal) => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
};


document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
});
