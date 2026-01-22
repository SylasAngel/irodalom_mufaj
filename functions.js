/**
 * @typedef {{genre:string,author:string,firstcreation:string,secAuthor?:string,secCreation?:string}} Author az adattömb adatainak típusa
 */

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

/**
 * Létrehoz egy mezőt a formnak, div, benne label,input,error div
 * @param {string} id bemenet azonosítója, és a label for-ja
 * @param {string} text label belső szövege
 * @param {string} name input name tulajdonsága
 * @param {HTMLFormElement} formToAppend amihez fűzzük a mezőt
 * @returns {void} nem returnol semmivel
 */
function createFormField(id,text,name,formToAppend) //függvény definíció
{
    /**
     * @type {HTMLDivElement} div element, amibe benne lesz az egész mező
     */
    const divSect = document.createElement('div') //div létrehozása
    formToAppend.appendChild(divSect) //hozzáfűzés a formhoz
    /**
     * @type {HTMLLabelElement} felirat
     */
    const label = document.createElement('label') //felirat létrehozása
    divSect.appendChild(label) //fűzés a divhez
    label.htmlFor = id //felirat for tualjdonságának megadása
    label.innerText = text //felirat szövegének megadása

    /**
     * @type {HTMLBRElement} sortörés
     */
    const breakRow = document.createElement('br') //sortörés létrehozása
    divSect.appendChild(breakRow) //fűzés a divhez

    /**
     * @type {HTMLInputElement} bemenet elem
     */
    const input = document.createElement('input') //bemenet elem létrehozás
    divSect.appendChild(input) //divhez fűzés
    input.id = id //azonosító megadása
    input.name = name //name megadása

    /**
     * @type {HTMLDivElement} error div, ami a hibaüzenetet fogja kiírni validációnál
     */
    const errorDiv = document.createElement('div') //div létrehozása
    divSect.appendChild(errorDiv) //fűzés a divhez
    errorDiv.classList.add('error') //error osztály hozzáadása az error divhez
}

/**
 * a formot belsejét rendereli
 * @param {{ident:string,innText:string,inpName:string}[]} array a tömb, amibe benne vannak a form adatai
 * @param {HTMLFormElement} sectionAppendTo a form amihez fűzzük
 * @returns {void} nem returnol semmivel
 */
function renderForm(array,sectionAppendTo) //függvény definiálás
{
    for(const e of array){ //végigiterálunk a tömbön
        createFormField(e.ident,e.innText,e.inpName,sectionAppendTo) //függvény segítsígével létrehozunk egy mezőt az object adataival
    }
    /**
     * @type {HTMLButtonElement} gomb
     */
    const button = document.createElement('button') //gomb létrehozása
    sectionAppendTo.appendChild(button) //fűzés a mező divjéhez
    button.innerText= 'Submit' //belső szöveg megadása
}

/**
 * Hozzáad egy új sort a táblázat törzshöz
 * @param {Author} dataObj  object aminek az adatait hozzáadjuk a táblázathoz
 * @param {HTMLTableSectionElement} tbody táblázat törzs amihez hozzáadjuk az új sor(oka)t
 * @returns {void} nem returnol semmivel
 */
function addNewRow(dataObj,tbody) //függvény definiálás
{
    /**
     * @type {HTMLTableRowElement} sor
     */
    const tableRow = document.createElement('tr') //sor elem létrehozása
    tbody.appendChild(tableRow) //törzshöz hozzáfűzés
    /**
     * @type {HTMLTableCellElement} cella
     */
    const tabDetail = createCell('td',dataObj.genre,tableRow) //cella létrehozása,tárolása
    createCell('td',dataObj.author,tableRow) //cella létrehozása
    createCell('td',dataObj.firstcreation,tableRow) //cella létrehozása
    if(dataObj.secAuthor && dataObj.secCreation) //második szerző és második mű elemek vizsgálata hogy üresek-e
    {
        /**
         * @type {HTMLTableRowElement} táblázat sor
         */
        const secTableRow = document.createElement('tr') //sor létrehozása
        tbody.appendChild(secTableRow) //fűzés a törzshöz
        createCell('td',dataObj.secAuthor,secTableRow) //cella létrehozása
        createCell('td',dataObj.secCreation,secTableRow) //cella létrehozása
        tabDetail.rowSpan = 2 //sorszélesség átállítása 2-re
    }

}

/**
 * megnézi hogy a mező bemenete üres-e és ha igen akkor egy error üzenetet beír az error divbe
 * @param {HTMLInputElement} input bemenet
 * @param {string} text error üzenete
 * @returns {boolean} returnol a validdal
 */
function validateField(input,text) //függvény definiálás
{
    /**
     * @type {boolean} igaz/hamis boolean érték
     */
    let valid = true //bool változó deklarálás
    if(input.value == '') //megnézzük hogy a bemenet értéke üres-e
    {
        /**
         * @type {HTMLDivElement} div section
         */
        const inputParent = input.parentElement //megkapjuk a bemenet szülő elemét ami egy div
        /**
         * @type {HTMLDivElement} div section
         */
        const error = inputParent.querySelector('.error') //error div lekérése id alapján
        error.innerText = text //belső szöveg megadása
        valid = false //valid értékét átállítjuk false-ra
    }
    return valid //visszatér a validdal
}

/**
 * függvény ami validálja az összes szükséges mezőt
 * @param {HTMLInputElement} FirInput első bemenet
 * @param {HTMLInputElement} secInput második bemenet
 * @param {HTMLInputElement} thirInput harmadik bemenet
 * @param {HTMLFormElement} form form aminek megkeressük az összes error divjét
 * @returns {boolean} visszatér a validdal
 */
function validateFields(FirInput,secInput,thirInput,form) // függvény definiálás
{
    /**
     * @type {NodeList} error divek listája
     */
    const errorList = form.querySelectorAll('.error') //összes error div listába tétele
    for(const e of errorList){ //végigiterálunk az errodListen
        e.innerText = '' //átállítjuk a belső szövegüket üresre
    }
    /**
     * @type {boolean} valid 
     */
    let valid = true //valid deklarálás
    if(!validateField(FirInput,'Műfaj mező kitöltése kötelező')){ //első bemenet validálása függvénnyel
        valid = false //valid érték átállítása false-ra
    }
    if(!validateField(secInput,'Első szerző mező kitöltése kötelező')){ //második bemenet validálása függvénnyel
        valid = false //valid érték átállítása false-ra
    }
    if(!validateField(thirInput,'Első mű mező kitöltése kötelező')){ //harmadik bemenet validálása függvénnyel
        valid = false //valid érték átállítása false-ra
    }
    return valid //visszatér a validdal
}