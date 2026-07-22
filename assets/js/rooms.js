/*==================================================
ROOM ASSETS (Rutas estructurales de imágenes fijas)
==================================================*/
const roomImages = [
    "../assets/img/rooms/room-standard-single.webp",
    "../assets/img/rooms/room-superior-twin.webp",
    "../assets/img/rooms/room-standard-twin.webp",
    "../assets/img/rooms/room-superior-double.webp",
    "../assets/img/rooms/room-standard-double.webp",
    "../assets/img/rooms/room-superior-triple.webp",
    "../assets/img/rooms/room-standard-triple.webp",
    "../assets/img/rooms/room-suite.webp"
];

/*==================================================
ELEMENTOS
==================================================*/
const roomCategory = document.getElementById("room-category");
const roomTitle = document.getElementById("room-title");
const roomDescription = document.getElementById("room-description");
const roomImage = document.getElementById("room-image");
const roomButton = document.getElementById("room-button");
const indicators = document.querySelectorAll(".room-indicators span");

/*==================================================
CURRENT INDEX
==================================================*/
let currentRoom = 0;

/*==================================================
UPDATE ROOM
==================================================*/
function updateRoom(index) {
    const imgPath = roomImages[index];
    if (!imgPath) return;

    // Asignar imagen fija al instante
    roomImage.src = imgPath;

    // Si el motor de traducción ya cargó, aplicamos los textos traducidos
    if (typeof getTranslation === "function") {
        const catText = getTranslation(`rooms.roomList.${index}.category`);
        const titleText = getTranslation(`rooms.roomList.${index}.title`);
        const descText = getTranslation(`rooms.roomList.${index}.description`);
        const wpTemplate = getTranslation(`rooms.whatsapp_template`) || "Hello! I would like to check the availability for the ";

        if (catText) roomCategory.textContent = catText;
        if (titleText) {
            roomTitle.textContent = titleText;
            roomImage.alt = titleText;
        }
        if (descText) roomDescription.textContent = descText;

        // Armamos el link dinámico de WhatsApp con el texto del idioma actual
        roomButton.href = "https://wa.me/51969778388?text=" + encodeURIComponent(wpTemplate + (titleText || ""));
    }

    // Indicadores numéricos del slider
    indicators.forEach((dot) => {
        dot.classList.remove("active");
    });
    if(indicators[index]) {
        indicators[index].classList.add("active");
    }
}

/*==================================================
FUNCIÓN GLOBAL DE ACTUALIZACIÓN (Para unified.js)
==================================================*/
function updateRoomsLanguage() {
    // Al cambiar de idioma refrescamos los textos de la habitación que esté visible
    updateRoom(currentRoom);
}

/*==================================================
INITIAL LOAD PREVENTIVO
==================================================*/
updateRoom(currentRoom);

/*==================================================
ELEMENTOS ADICIONALES Y ANIMACIONES
==================================================*/
const roomCard = document.querySelector(".room-card");
const prevButton = document.querySelector(".room-prev");
const nextButton = document.querySelector(".room-next");
let isAnimating = false;

function changeRoom(index) {
    if (isAnimating) return;
    isAnimating = true;

    roomCard.classList.add("fade");

    setTimeout(() => {
        currentRoom = index;
        updateRoom(currentRoom);
        roomCard.classList.remove("fade");

        setTimeout(() => {
            isAnimating = false;
        }, 350);
    }, 300);
}

/*==================================================
CONTROLES (EVENT LISTENERS)
==================================================*/
nextButton.addEventListener("click", () => {
    let next = currentRoom + 1;
    if (next >= roomImages.length) {
        next = 0;
    }
    changeRoom(next);
});

prevButton.addEventListener("click", () => {
    let previous = currentRoom - 1;
    if (previous < 0) {
        previous = roomImages.length - 1;
    }
    changeRoom(previous);
});

indicators.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        if (index === currentRoom) return;
        changeRoom(index);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        nextButton.click();
    }
    if (event.key === "ArrowLeft") {
        prevButton.click();
    }
});