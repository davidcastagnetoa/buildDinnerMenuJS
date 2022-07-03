class mainMenu {
    constructor(plate, comment, price) {
        this.plate = plate;
        this.comment = comment;
        this.price = price;
    }
    doneToPerfection(){
        this.price += 0.5;
        return `
            : Meat cooked for 30 minutes over low heat
        `
    }
    undercooked(){
        this.price += 0.35;
        return `
            : Meat cooked for 20 minutes over high heat
        `
    }
    defaultcooked(){
        return `
            : Meat cooked for 20 minutes over medium heat
        `
    }
}
class sideMenu extends mainMenu {
    constructor(plate, comment, price) {
        super(plate, comment, price);
    }
    plateInfo(){
        return `
            Entrante : ${this.plate}<br>
            Precio : $${this.price}<br>
            <i>${this.comment}</i>
        `
    }
}
class dayMenu extends mainMenu {
    constructor(plate, ingredients, comment, price) {
        super(plate, comment, price);
        this.ingredients = ingredients;
    }
    plateInfo(){
        return `
            Menu : ${this.plate}<br>
            Precio : $${this.price}<br>
            <i>${this.comment}</i>
        `
    }
}

//Main Menu, customer have to choice one
let mainPlate = [
    cachopo = new mainMenu('Cachopo', 'Asturian Tipical Plate', 13.50),
    juanchoBurger = new mainMenu("Juancho's Hamburger", 'Prepared with the best meat from local farms', 21.00),
    asturianSteak = new mainMenu('Asturian steak', "Chef's specialty", 18.50)
];

//Side Menu, customer have to choice two
let sidePlate = [
    gazpacho = new sideMenu('Gazpacho', 'Perfect in summer days', 3.50),
    henSoup = new sideMenu("Hen's soup", 'full nature', 2.50),
    sailorPotatoes = new sideMenu('Sailor potatoes', 'From organic farm', 1.50),
    salad = new sideMenu('Salad', 'Mediterranuem Recet', 3.10),
    vegetablesCream = new sideMenu('Vegetables cream', 'From organic farm', 1.80),
    cordovanSalmorejo = new sideMenu('Cordovan salmorejo', 'Cold soup perfect in summer days', 3.50)
];

let menuDay = [
    breakfast = new dayMenu('Continental breakfast', 'bread, butter, hard-boiled egg ,jam, coffee or tea, cereals, croissants and butter', 'Local Ingredients', 5.50),
    lunch = new dayMenu('Sunshine lunch', 'Rissoto, Gazpacho, and wine or water (Juice for kids)', 'The wine come from The Riojas vineyard', 10.50),
    dinner = new dayMenu('Sunshine Dinner', 'Rissoto, Gazpacho, and wine or water (Juice for kids)', 'The wine come from The Riojas vineyard', 14.50)
]

//Buttons Actions
let mainElected = undefined;
let menuOfDay = undefined;
let side1Elected = undefined;
let side2Elected = undefined;

function makeBill(){

    //Principal Plate
    //Choice main Plate
    for (i = 0; i < document.platoPrincipal.PrimerPlato.length; i++){ 
        if (document.platoPrincipal.PrimerPlato[i].checked) {
            break; 
        }
    } 
    mainElected = mainPlate[i];

    //Choice 1st side Plate 
    for (i = 0; i < document.primerSideMenu.PrimerEntrante.length; i++){ 
        if (document.primerSideMenu.PrimerEntrante[i].checked) {
            break; 
        }
    } 
    side1Elected = sidePlate[i];

    //Choice 2nd side Plate
    for (i = 0; i < document.segundoSideMenu.SegundoEntrante.length; i++){ 
        if (document.segundoSideMenu.SegundoEntrante[i].checked) {
            break; 
        }
    }
    side2Elected = sidePlate[i];

    //Menu of the Day
    for (i = 0; i < document.menuPreparado.menu.length; i++){ 
        if (document.menuPreparado.menu[i].checked) {
            break; 
        }
    }
    menuOfDay = menuDay[i];

    //Choice preparation main Plate
    if (menuOfDay != undefined && side1Elected != undefined && mainElected == undefined|| menuOfDay != undefined && side2Elected != undefined && mainElected == undefined) {
        document.write('Los acompañamientos solo se pueden añadir al Plato Principal<br>');
    }

    

    if (mainElected == undefined && menuOfDay == undefined){
        document.write('Debes Escoger Un Menu o Elegir Tu plato Principal<br>');
    }

    //Choice preparation main Plate
    let textOfChef = '';
    for (i = 0; i < document.preparationMode.preparation.length; i++){ 
        if (document.preparationMode.preparation[0].checked) {
            mainElected.doneToPerfection();
            textOfChef = mainElected.doneToPerfection()
            break;
        } else if (document.preparationMode.preparation[1].checked){
            mainElected.undercooked();
            textOfChef = mainElected.undercooked()
            break;
        } 
        else if (document.preparationMode.preparation[2].checked){
            mainElected.defaultcooked();
            textOfChef = mainElected.defaultcooked()
            break;
        }else {
            textOfChef = '';
            break;
        }
    }

    //Sum the prices

    //Generate random number for Bill
    function randomBillNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    randomBillNumber(10000, 99999);

    let totalPrice = 0;
    if (menuOfDay != undefined){
        totalPrice = menuOfDay.price;
        //Print the Bill
        document.write(`
        <b>Bottega Restaurant</b><br>
        <i><b>Spanish Meats</b></i><br>
        Madrid, Spain<br>
        davidcastagnetoa@gmail.com<br>
        *********************************************<br>
        Date: ${Date()}<br>
        Bill: ${randomBillNumber(10000, 99999)}<br>
        *********************************************<br>
        Plato Principal : ${menuOfDay.plate}<br>
        Ingredientes: ${menuOfDay.ingredients}<br>
        Precio : ${menuOfDay.price}<br>
        Waitress: '<i>'Made with Love'</i>'<br>

        *********************************************<br>
        Total Price : $${totalPrice}<br><br>`)       
    }

    if (mainElected != undefined){
        //Customer must to choice two side plates
        if (side1Elected == undefined || side2Elected == undefined) {
            document.write('Debes Escoger Dos acompañamientos');
        }
        totalPrice = mainElected.price + side1Elected.price + side2Elected.price;
        //Print the Bill
        document.write(`
        <b>Bottega Restaurant</b><br>
        <i><b>Spanish Meats</b></i><br>
        Madrid, Spain<br>
        davidcastagnetoa@gmail.com<br>
        *********************************************<br>
        Date: <br>
        Bill: ${randomBillNumber(10000, 99999)}<br>
        *********************************************<br>
        Plato Principal : ${mainElected.plate}<br>
        Precio : ${mainElected.price}<br>
        Waitress: '<i>${mainElected.comment}</i>'<br>
        Preparacion: ${textOfChef}<br><br>

        Primer Entrante: ${side1Elected.plate}<br>
        Precio : ${side1Elected.price}<br>
        Waitress: '<i>${side1Elected.comment}</i>'<br><br>

        Segundo Entrante: ${side2Elected.plate}<br>
        Precio : ${side2Elected.price}<br>
        Waitress: '<i>${side2Elected.comment}</i>'<br><br>
        *********************************************<br>
        Total Price : $${mainElected.price} + $${side1Elected.price} + $${side2Elected.price} : $${totalPrice}<br>`)
    }
    if (mainElected != undefined && menuOfDay != undefined){
        totalPrice = menuOfDay.price + mainElected.price + side1Elected.price + side2Elected.price;
        document.write(`
        <br>
        <b>You are a glutton, but calm down, We love gluttons</b><br>
        Total Price : $${menuOfDay.price} + $${mainElected.price} + $${side1Elected.price} + $${side2Elected.price}: $${totalPrice}
        `);
    }
}
    
