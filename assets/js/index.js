/* ==========================================
   DISCOVER SHOWCASE (Rutas estructurales)
========================================== */
const showcaseData = [
    {
        image: "assets/img/hero/discover-cusco.webp",
        link: "pages/experiences.html"
    },
    {
        image: "assets/img/hero/dining-feature.webp",
        link: "pages/dining.html"
    }
];

/* ==========================================
   ELEMENTOS
========================================== */
const discoverButtons = document.querySelectorAll(".discover-btn");
const discoverTag = document.getElementById("discoverTag");
const discoverTitle = document.getElementById("discoverTitle");
const discoverDescription = document.getElementById("discoverDescription");
const discoverImage = document.getElementById("discoverImage");
const discoverLink = document.getElementById("discoverLink");

/* ==========================================
   CAMBIAR CONTENIDO (Leyendo del JSON traducido)
========================================== */
function loadDiscover(index) {
    const item = showcaseData[index];
    if (!item) return;

    // Verificar que la función global de traducción exista antes de usarla
    if (typeof getTranslation === "function") {
        const tagText = getTranslation(`index.discover.showcaseData.${index}.tag`);
        const titleText = getTranslation(`index.discover.showcaseData.${index}.title`);
        const descText = getTranslation(`index.discover.showcaseData.${index}.description`);
        const btnText = getTranslation(`index.discover.showcaseData.${index}.button`);

        if (tagText) discoverTag.textContent = tagText;
        if (titleText) {
            discoverTitle.textContent = titleText;
            discoverImage.alt = titleText;
        }
        if (descText) discoverDescription.textContent = descText;
        if (btnText) discoverLink.textContent = btnText;
    }

    // Atributos de rutas e imágenes estructurales fijos
    discoverImage.src = item.image;
    discoverLink.href = item.link; 
}

/* ==========================================
   FUNCIÓN GLOBAL PARA ACTUALIZAR TODO EL SHOWCASE
========================================== */
// unified.js llamará automáticamente a esta función cada vez que cambie el idioma
function updateShowcaseLanguage() {
    if (typeof getTranslation !== "function") return;

    // 1. Traduce los botones del menú lateral
    discoverButtons.forEach(button => {
        const index = button.getAttribute("data-item");
        const menuText = getTranslation(`index.discover.showcaseData.${index}.menu`);
        if (menuText) {
            button.textContent = menuText;
        }
    });

    // 2. Refresca los textos del contenedor activo actual
    const activeBtn = document.querySelector(".discover-btn.active");
    if (activeBtn) {
        const index = activeBtn.getAttribute("data-item");
        loadDiscover(index);
    } else {
        // Por si acaso no hay ninguno activo, carga el primero por defecto
        loadDiscover(0);
    }
}

/* ==========================================
   BOTONES (Event Listeners de clicks)
========================================== */
discoverButtons.forEach(button => {
    button.addEventListener("click", () => {
        discoverButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        loadDiscover(button.dataset.item);
    });
});

// Carga inicial por defecto
loadDiscover(0);