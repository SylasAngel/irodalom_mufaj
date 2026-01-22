/**
 * @typedef {{genre:string,author:string,firstcreation:string,secCreation?:string}} Author az adattömb adatainak típusa
 */
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
 * ez a függvény létrehoz egy cellát
 * @param {string} type milyen típusú lesz a cella (td/th)
 * @param {string} text belső szöveg
 * @param {HTMLTableRowElement} toAppend mihez fűzzük hozzá a cellát
 * @returns {HTMLTableCellElement} visszatér a cellával
 */
function createCell(type,text,toAppend) //függvény definiálás, ami létrehoz egy cellát
{
    /**
     * @type {HTMLTableCellElement} cella
     */
    const cell = document.createElement(type) //cella létrehozás,tárolás
    toAppend.appendChild(cell) //hozzáfűzés amit megadunk paraméterbe
    cell.innerText = text //belső szöveg 
    return cell //visszatérés a cellával
}

/**
 * táblázatot fogja renderelni beadott tömb alapján
 * @param {Author []} array a tömb ami tartalmazza a táblázat adatait
 * @param {HTMLTableSectionElement} tbody törzs amihez hozzáfűzzük az adatokat
 * @returns {void} nem returnol semmivel
 */
function renderTable(array,tbody){ //függvény definiálás, táblázat renderelés
    tbody.innerHTML = '' //táblázat törzsét kiürítjük
    for(let e of array){ //végigiterálunk az adattömbön
    /**
    *@type {HTMLTableRowElement} táblázat sor 
    */
    const tableRow = document.createElement('tr') //táblázat sor deklarálás,tárolás
    tbody.appendChild(tableRow) //hozzáfűzás a törzshöz
    createCell('td',e.genre,tableRow) //első adat cella létrehozása függvény segítségével 
    createCell('td',e.author,tableRow) //második adat cella létrehozása függvény segítségével
    /**
     * @type {HTMLTableCellElement} cella
     */
    const tableDetail = createCell('td',e.firstcreation,tableRow) //harmadik adat cella létrehozása függvény segítségével
    if(e.secCreation ){ //megnézzük hogy a második mű adat undefined-e, igaz ág
        createCell('td',e.secCreation,tableRow) //létrehozzuk a negyed adat cellát függvény segítségével
    }
    else{ //hamis ág
        tableDetail.colSpan = 2 //oszlopszélesség átállítása 2-re
    }
    }
}

/**
 * a fejlécet rendereli
 * @param {{title:string,colSpan?:Number}[]} array tömb ami tartalmazza a fejléc elemei objecteket
 * @param {HTMLTableSectionElement} headerAppend amihez hozzáfűzzük az elemeket
 * @returns {void} nem returnol semmivel
 */
function renderHeader(array,headerAppend) //függvény definiálás
{
    for(const e of array) //végigiterálás a tömbön
    {
        /**
         * @type {HTMLTableCellElement} cella
         */
        const headerCell = createCell('th',e.title,headerAppend) //cella létrehozása függvénnyel, és tárolással
        if(e.colSpan == 2) //megnézzük hogy az object colSpan adata 2-e, igaz ág
        {
            headerCell.colSpan = 2 //cella oszlopszélességének átállítása 2-re
        }
    }
}
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
 * függvény ami a select értéke szerint megjeleníti vagy eltüntetit a táblázatokat
 * @param {HTMLSelectElement} target a select elem, amit meghíváskor megadunk
 * @returns {void} nem returnol semmit
 */
function tableSelectorRender(target) //függvény definiálás
{
    /**
     * @type {HTMLDivElement} a html divje
     */
    const htmlSection = document.querySelector('#htmlsection') //html divjének lekérése azonosító alapján
    /**
     * @type {HTMLDivElement} a js divje
     */
    const jsSection = document.querySelector('#jssection') //js divjének lekérése azonosító alapján
    if(target.value == 'jssection') //megnézzük hogy a target értéke jssection-e
    {
        jsSection.classList.remove('hide') //a js divjéről levesszük a hide osztályt
        htmlSection.classList.add('hide') //a html divjéhez hozzáadjuk a hide osztályt
    }
    if(target.value == 'htmlsection') //megnézzük hogy a target értéke htmlsection-e
    {
        htmlSection.classList.remove('hide') //html divjéről levesszük a hide osztályt
        jsSection.classList.add('hide') //js divjéhez hozzáadjuk a hide osztályt
    }
}