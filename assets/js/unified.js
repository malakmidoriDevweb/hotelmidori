
/* ==========================================
   INICIALIZAR
========================================== */



document.addEventListener("DOMContentLoaded", () => {
    const bookBtn = document.querySelector(".book-btn"); // Tu botón del header
    const wspWidget = document.getElementById("wspWidget");
    const wspClose = document.getElementById("wspClose");

    // Al hacer clic en el botón del header, abre el widget
    bookBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Evita que intente navegar al '#'
        wspWidget.style.display = "block";
    });

    // Al hacer clic en la 'X', cierra el widget
    wspClose.addEventListener("click", () => {
        wspWidget.style.display = "none";
    });
});



/*==================================================
LANGUAGE SELECTOR
==================================================*/

const languageSelector =
document.querySelector(".language-selector");

const languageButton =
document.getElementById("languageBtn");

const languageMenu =
document.getElementById("languageMenu");

const currentLanguage =
document.getElementById("currentLanguage");

const languageItems =
document.querySelectorAll(".language-menu li");


/*===== OPEN / CLOSE =====*/

languageButton.addEventListener("click",()=>{

    languageSelector.classList.toggle("active");

});


/*===== SELECT LANGUAGE =====*/

languageItems.forEach((item)=>{

    item.addEventListener("click",()=>{

        const lang =
        item.dataset.lang;

        loadLanguage(lang);

        languageSelector.classList.remove("active");

    });

});


/*===== CLOSE OUTSIDE =====*/

document.addEventListener("click",(event)=>{

    if(!languageSelector.contains(event.target)){

        languageSelector.classList.remove("active");

    }

});




/*==================================================
SIDE MENU
==================================================*/

const menuToggle =
document.querySelector(".menu-toggle");

const sideMenu =
document.getElementById("sideMenu");

const closeMenu =
document.getElementById("closeMenu");

const menuOverlay =
document.getElementById("menuOverlay");

const menuLinks =
document.querySelectorAll(".side-menu a");


/*===== OPEN MENU =====*/

function openMenu(){

    sideMenu.classList.add("active");

    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/*===== CLOSE MENU =====*/

function closeSideMenu(){

    sideMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/*===== EVENTS =====*/

menuToggle.addEventListener("click", openMenu);

closeMenu.addEventListener("click", closeSideMenu);

menuOverlay.addEventListener("click", closeSideMenu);


/*===== CLOSE WHEN CLICKING A LINK =====*/

menuLinks.forEach((link)=>{

    link.addEventListener("click",()=>{

        closeSideMenu();

    });

});


/*===== ESC KEY =====*/

document.addEventListener("keydown",(event)=>{

    if(event.key === "Escape"){

        closeSideMenu();

    }

});







/*==================================================
LANGUAGE SYSTEM
==================================================*/

/*===== LANGUAGE PATH =====*/

const LANG_PATH =
window.location.pathname.includes("/pages/")
? "../assets/lang/"
: "assets/lang/";


/*===== VARIABLES =====*/

let translations = {};

let currentLang =
localStorage.getItem("language") || "en";

/*===== LOAD LANGUAGE =====*/

async function loadLanguage(lang){

    try{

        const response =
        await fetch(`${LANG_PATH}${lang}.json`);

        translations =
        await response.json();

        currentLang = lang;

        localStorage.setItem(
            "language",
            lang
        );

        updateLanguageButton();
        applyTranslations();

        console.log(
            `Language loaded: ${lang}`
        );

    }

    catch(error){

        console.error(
            "Language loading error:",
            error
        );

    }

}

/*===== UPDATE BUTTON =====*/

function updateLanguageButton(){

    const selected =
    languageMenu.querySelector(

        `[data-lang="${currentLang}"]`

    );

    if(selected){

        currentLanguage.textContent =
        selected.textContent.trim();

    }

}

/*===== INITIALIZE =====*/

loadLanguage(currentLang);


/*===== GET TRANSLATION =====*/

function getTranslation(key){

    return key.split(".").reduce((obj, part) => {

        return obj ? obj[part] : null;

    }, translations);

}



/*===== APPLY TRANSLATIONS =====*/

function applyTranslations(){

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        const text = getTranslation(key);

        if(text){

            element.textContent = text;

        }

    });

    // Integration con index.js
    if (typeof updateShowcaseLanguage === "function") {
        updateShowcaseLanguage();
    }

    // INTEGRACIÓN CON EL SLIDER DE ROOMS.JS
    if (typeof updateRoomsLanguage === "function") {
        updateRoomsLanguage();
    }

}