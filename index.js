
/**
 * @type {{title:string,colSpan?:Number}[]} fejléc elemeinek típusa
 */
const headerList= [ //fejléc elemeinek tömbje
    {
        title:'Műfaj', //fejléc első elemének szövege
    },
    {
        title:'Szerző' //fejléc második elemének szövege
    },
    {
        title:'Mű', //fejléc harmadik elemének szövege
        colSpan: 2 //oszlopszélesség értéke 2 lesz
    }
]
/**
 * @type {Author[]} adattömb a táblázat adatainak
 */
const dataArray = [ //tömb deklarálás
    {
        genre:'létértelmező vers', //műfaj adat 
        author:'Kosztolányi Dezső', //szerző adat 
        firstcreation:'Boldog, Szomorú dal', //első mű adat
        secCreation:'Hajnali részegség' //második mű adat
    },
    {
        genre:'kisregény', //műfaj adat adat
        author:'Thomas Mann', //szerző adat adat
        firstcreation:'Tonio Kröger', //első mű adat
        secCreation:'Mario és a varázsló' //második mű adat
    },
    {
        genre:'kisregény', //műfaj adat adat
        author:'Franz Kafka', //szerző adat adat
        firstcreation:'Az átváltozás' //első mű adat
    },
    {
        genre:'regény', //műfaj adat 
        author:'Móricz Zsigmond', //szerző adat 
        firstcreation:'Úri muri', //első mű adat

    },
    {
        genre:'regény', //műfaj adat 
        author:'Wass Albert', //szerző adat 
        firstcreation:'Adjátok vissza a hegyeimet', //első mű adat
    },
]

/**
 * @type {{ident:string,innText:string,inpName:string}[]} form adatainak tömbje
 */
const formArray = [ //tömb definiálás
    {
        ident: 'elso', //azonosító adat
        innText:'Műfaj', //belső szöveg adat
        inpName:'mufaj', //bemenet name adat
    },
    {
        ident: 'masodik', //azonosító adat
        innText:'Szerző', //belső szöveg adat
        inpName:'szerzo', //bemenet name adat
    },
    {
        ident: 'harmadik', //azonosító adat
        innText:'Első mű', //belső szöveg adat
        inpName:'mu1', //bemenet name adat
    },
    {
        ident: 'negyedik', //azonosító adat
        innText:'Második mű', //belső szöveg adat
        inpName:'mu2',  //bemenet name adat
    },
]
/**
 * @type {HTMLDivElement} div section
 */
const sectionDiv = document.createElement('div') //div element létrehozás,tárolás
document.body.appendChild(sectionDiv) //fűzés a htmlhez
sectionDiv.id = 'jssection' //divhez hozzáadunk azonosítót
/**
 * @type {HTMLTableElement} táblázat
 */
const table = document.createElement('table') //táblázat elem létrehozása,tárolása
sectionDiv.appendChild(table) //divhez hozzáfűzzük a táblázatot
/**
 * @type {HTMLTableSectionElement} fejléc
 */
const thead = document.createElement('thead') //fejléc elem létrehozás,tárolása
table.appendChild(thead) //hozzáfűzés a táblázathoz
renderHeader(headerList,thead) //függvény segítségével a fejlécet rendereljük
/**
 * @type {HTMLTableSectionElement} táblázat törzse
 */
const tableBody = document.createElement('tbody') //táblázattörzs elem létrehozás,tárolás
table.appendChild(tableBody) //táblázathoz hozzáfűzzük a törzset
renderTable(dataArray,tableBody) //függvény segítségével rendereljük a táblázat maradék részét(a törzsét)
/**
 * @type {HTMLSelectElement} tableselector, select elem
 */
const tableSelector = document.querySelector('#tableselector') //select elem lekérése id alapján
tableSelectorRender(tableSelector) //függvény meghívása, hogy az oldal beöltésekor már csak 1 táblázat legyen ott
tableSelector.addEventListener('change',function(e){ //select elementhez eventlistner hozzáadása a change eseményre
    /**
     * @type {HTMLSelectElement} target
     */
    const target = e.target //target tárolása változóba
    tableSelectorRender(target) //függvény meghívás a target értéke szerint
})

/**
 * @type {HTMLFormElement} form
 */
const jsForm = document.createElement('form') //form létrehozása
sectionDiv.appendChild(jsForm) //fűzés a divhez
jsForm.id = 'jsform' //azonosító megadása
renderForm(formArray,jsForm) //függvény segítségével rendereljük a form belsejét

