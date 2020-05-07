// variables //////////////////////////////////
let newCar: Car;
let carArray: { plate: string, brand: string, color: string }[] = new Array();

// functions //////////////////////////////////
function createCar(plate: string, brand: string, color: string){       
    let plateI = (<HTMLInputElement>document.getElementById("plate")).value;
    let brandI = (<HTMLInputElement>document.getElementById("brand")).value.toUpperCase();
    let colorI = (<HTMLInputElement>document.getElementById("color")).value.toUpperCase();     

    //if fields are OK, create newCar ////////
    if (validatePlate() && validateBrand() && validateColor()) {
        newCar = new Car(plateI, brandI, colorI);
        carArray.push(newCar);   

        //print result ///////
        (<HTMLInputElement>document.getElementById("messageCar")).innerHTML = `NEW CAR: 
        <br><br>PLATE: ${newCar.plate}
        <br>BRAND: ${newCar.brand}
        <br>COLOR: ${newCar.color}`;
       
        // display and clean fields ////////////////////////////
        (<HTMLInputElement>document.getElementById("sectionB2")).style.display = "block";     
        (<HTMLInputElement>document.getElementById("sectionB1")).style.display = "none";   
        cleanCarForm();
    }       
}
function addWheel(){   
    let wBrand: string;
    let wDiameter: number;    
    let error: number = 0;
    let wheels: Wheel[] = new Array(4);       
    let car: any;   

    //validate if brand and diameter are OK ///////
    for (let i:number = 1; i <= 4; i++)  {      
        wBrand = (<HTMLInputElement>document.getElementById("brandWheel" + i)).value.toUpperCase();
        wDiameter = Number((<HTMLInputElement>document.getElementById("diameterWheel" + i)).value);     
        
        if ((validateWBrand(wBrand, i) != true) || (validateWDiameter(wDiameter, i) != true)){
           error++;                    
        }       
    } 

    //if everything is OK, add wheel ///////
    if(error == 0){
        for (let i:number = 1; i <= 4; i++)  {      
            wBrand = (<HTMLInputElement>document.getElementById("brandWheel" + i)).value.toUpperCase();
            wDiameter = Number((<HTMLInputElement>document.getElementById("diameterWheel" + i)).value);     
            let newWheel = new Wheel(wBrand, wDiameter);  
            car = carArray[carArray.length - 1];
            newCar = car;
            newCar.addWheel(newWheel);
        } 
        //print result /////////
        for (let i:number = 0; i < 4; i++)  {   
            (<HTMLInputElement>document.getElementById("messageWheel")).innerHTML += `<br>WHEELS
            <br><br><b>Wheel ${i+1}:</b>
            <br>Brand: ${newCar.wheels[i].brand} 
            <br>Diameter:  ${newCar.wheels[i].diameter} `;
        }  
        // display and clean fields ////////////////////////////   
        (<HTMLInputElement>document.getElementById("sectionB1")).style.display = "block";     
        (<HTMLInputElement>document.getElementById("sectionB2")).style.display = "none";  
        cleanWheelForm();
    }        
    
    // revise the result /////////////////////
    console.log("wheels: " + wheels);
    console.log(carArray);           
}

// validating functions //////////////////////////////////
function validatePlate() {
    let plateI = (<HTMLInputElement>document.getElementById("plate"));
    let isValid: boolean = false;
    let error: any = document.getElementById("carError");
    let regexPlate: RegExp = /^([0-9]{4})([A-z]{3})$/;

    // validate pattern //////////
    if ((plateI.value.length < 7) || (regexPlate.test(plateI.value) == false)) {
        (<HTMLInputElement>document.getElementById("plate")).setAttribute("class", "incorrect");
        error.innerHTML = "Please, for the plate, follow the required pattern (like: 1111AAA)";             
    } else {
        (<HTMLInputElement>document.getElementById("plate")).setAttribute("class", "correct");         
        isValid = true;
    }
   // validate if plate exist ////////
    for (let carItem of carArray) {
        if (carItem.plate === plateI.value) {
            isValid = false;
            (<HTMLInputElement>document.getElementById("plate")).setAttribute("class", "incorrect");
            error.innerHTML = "The plate number already exist so, please, enter a new one.";            
        } else {
            (<HTMLInputElement>document.getElementById("plate")).setAttribute("class", "correct");       
            isValid = true;
        }
    }
    return isValid;
}
function validateBrand() {
    let brandI = (<HTMLInputElement>document.getElementById("brand"));
    let isValid: boolean = false;
    let error: any = document.getElementById("carError");

    if (brandI.value == "") {
        (<HTMLInputElement>document.getElementById("brand")).setAttribute("class", "incorrect");
        error.innerHTML = "Please, this field cannot be empty. Enter the brand";             
    } else {
        (<HTMLInputElement>document.getElementById("brand")).setAttribute("class", "correct");        
        isValid = true;
    }   
    return isValid;
}
function validateColor() {
    let colorI = (<HTMLInputElement>document.getElementById("color"));
    let isValid: boolean = false;
    let error: any = document.getElementById("carError");

    if (colorI.value == "") {
        (<HTMLInputElement>document.getElementById("color")).setAttribute("class", "incorrect");
        error.innerHTML = "Please, this field cannot be empty. Enter a colour";             
    } else {
        (<HTMLInputElement>document.getElementById("color")).setAttribute("class", "correct");         
        isValid = true;
    }   
    return isValid;
}
function validateWBrand (wbrand: string, i: number){    
    let isValid: boolean = false;     
    let error: any = document.getElementById("brandError");     
    
    if (wbrand == ""){
        (<HTMLInputElement>document.getElementById("brandWheel" +i)).setAttribute("class", "incorrect");
        error.innerHTML = "The wheel brand cannot be empty";
    }else {
        (<HTMLInputElement>document.getElementById("brandWheel" +i)).setAttribute("class", "correct");   
        error.innerHTML = "";
        isValid = true;                        
    }    
    return isValid;
}
function validateWDiameter (diam: number, i: number){    
    let isValid: boolean = false;     
    let error: any = document.getElementById("diamError");     

    if ((diam < 0.4) || (diam > 2)){
        (<HTMLInputElement>document.getElementById("diameterWheel" +i)).setAttribute("class", "incorrect");
        error.innerHTML = "The diameter has to be >0.4 and <2";
    }else if (diam === null){
        (<HTMLInputElement>document.getElementById("diameterWheel" +i)).setAttribute("class", "incorrect");
        error.innerHTML = "The diameter cannot be an empty field";
    }else {
        (<HTMLInputElement>document.getElementById("diameterWheel" +i)).setAttribute("class", "correct");  
        error.innerHTML = "";
        isValid = true;            
    }
    return isValid;
}

// cleaning functions //////////////////////////////////
function cleanCarForm(){    
    (<HTMLInputElement>document.getElementById("plate")).value = "";  
    (<HTMLInputElement>document.getElementById("brand")).value = ""; 
    (<HTMLInputElement>document.getElementById("color")).value = "";

    (<HTMLInputElement>document.getElementById("plate")).setAttribute("class", "myCarInput");  
    (<HTMLInputElement>document.getElementById("brand")).setAttribute("class", "myCarInput");  
    (<HTMLInputElement>document.getElementById("color")).setAttribute("class", "myCarInput");  

    (<HTMLInputElement>document.getElementById("carError")).innerHTML = "";
    (<HTMLInputElement>document.getElementById("messageWheel")).innerHTML = "";
}
function cleanWheelForm(){      
    //var wheelInput = document.getElementsByClassName("myWheelInput");      
   /*   var wheelInput = document.querySelectorAll("input.myWheelInput"); 
    for(let i = 0; i < wheelInput.length; i++){ 
        wheelInput[i].textContent = "";
        wheelInput[i].setAttribute("class", "myWheelInput");
    }  */   
     
    (<HTMLInputElement>document.getElementById("brandWheel1")).value = "";   
    (<HTMLInputElement>document.getElementById("brandWheel2")).value = "";   
    (<HTMLInputElement>document.getElementById("brandWheel3")).value = "";   
    (<HTMLInputElement>document.getElementById("brandWheel4")).value = "";   
    (<HTMLInputElement>document.getElementById("diameterWheel1")).value = "";    
    (<HTMLInputElement>document.getElementById("diameterWheel2")).value = "";    
    (<HTMLInputElement>document.getElementById("diameterWheel3")).value = "";    
    (<HTMLInputElement>document.getElementById("diameterWheel4")).value = "";    
    
     (<HTMLInputElement>document.getElementById("brandWheel1")).setAttribute("class", "myWheelInput");  
    (<HTMLInputElement>document.getElementById("brandWheel2")).setAttribute("class", "myWheelInput");   
    (<HTMLInputElement>document.getElementById("brandWheel3")).setAttribute("class", "myWheelInput");  
    (<HTMLInputElement>document.getElementById("brandWheel4")).setAttribute("class", "myWheelInput");  
    (<HTMLInputElement>document.getElementById("diameterWheel1")).setAttribute("class", "myWheelInput");  
    (<HTMLInputElement>document.getElementById("diameterWheel2")).setAttribute("class", "myWheelInput");  
    (<HTMLInputElement>document.getElementById("diameterWheel3")).setAttribute("class", "myWheelInput");   
    (<HTMLInputElement>document.getElementById("diameterWheel4")).setAttribute("class", "myWheelInput");  
 
     (<HTMLInputElement>document.getElementById("brandError")).innerHTML = "";
    (<HTMLInputElement>document.getElementById("diamError")).innerHTML = "";
    (<HTMLInputElement>document.getElementById("wheelError")).innerHTML = "";
}