const title = document.querySelector(".title");
const footer = document.querySelector(".footer");
const body = document.querySelector("body");
document.documentElement.style.overflow = 'hidden';
document.body.scroll = "no";

const numDecimal = document.querySelector("#decimal");
const numBinario = document.querySelector("#binario");
const numOctal = document.querySelector("#octal");
const numHexadecimal = document.querySelector("#hexadecimal");
numDecimal.addEventListener("keyup", function (evento) {
  evento.preventDefault();

  numBinario.value = parseInt(numDecimal.value, 10).toString(2);
  numOctal.value = parseInt(numDecimal.value, 10).toString(8);
  numHexadecimal.value = parseInt(numDecimal.value, 10).toString(16).toLocaleUpperCase();

    
  if(numDecimal.value == ''){
      numBinario.value = '';
      numOctal.value = '';
      numHexadecimal.value = '';
  }
});



numBinario.addEventListener("keyup", function (evento) {
  evento.preventDefault();
  numDecimal.value = parseInt(numBinario.value, 2);
  
  numOctal.value = parseInt(numDecimal.value, 10).toString(8);
  numHexadecimal.value = parseInt(numDecimal.value, 10).toString(16).toLocaleUpperCase();


  if(numBinario.value == ''){
    numDecimal.value = '';
    numOctal.value = '';
    numHexadecimal.value = '';
  }
});



numOctal.addEventListener("keyup", function (evento) {
  evento.preventDefault();
  numDecimal.value = parseInt(numOctal.value, 8);

  numBinario.value = parseInt(numDecimal.value, 10).toString(2);
  numHexadecimal.value = parseInt(numDecimal.value, 10).toString(16).toLocaleUpperCase();


  if(numOctal.value == ''){
    numDecimal.value = '';
    numBinario.value = '';
    numHexadecimal.value = '';
  }
});



numHexadecimal.addEventListener("keyup", function (evento) {
  evento.preventDefault();
  numHexadecimal.value = numHexadecimal.value.toLocaleUpperCase();
  numDecimal.value = parseInt(numHexadecimal.value, 16);

  numBinario.value = parseInt(numDecimal.value, 10).toString(2);
  numOctal.value = parseInt(numDecimal.value, 10).toString(8);


  if(numHexadecimal.value == ''){
    numDecimal.value = '';
    numBinario.value = '';
    numOctal.value = '';
  }
});



function mudarFundo(){
    
    const body = document.querySelector("body")
    const buttonChecked = document.querySelector('input[name="contraste"]:checked').value;
     
    switch (buttonChecked){

        case 'preto':
            propriedadesParticula.particles.color.value = "#ffffff";
            propriedadesParticula.particles.line_linked.color = "#ffffff";
            body.classList.remove('white');
            particlesJS('particles-js', propriedadesParticula);
            break


        case 'branco':
            propriedadesParticula.particles.color.value = "#000000";
            propriedadesParticula.particles.line_linked.color = "#000000";
            body.classList.toggle('white');
            particlesJS('particles-js', propriedadesParticula);
            break        
        
    }
}

function getValues(){
  return {
  title: window.getComputedStyle(title).getPropertyValue('--fontsize-title'),
  footer: window.getComputedStyle(footer).getPropertyValue('--fontsize-footer'),
 }
}


function cleanCharacters(){
  const styles = getValues();
  const cleanNumbers = [];
  for (const keys in styles) {
    const onlyNumbers = styles[keys].replace(/[^0-9.]/g,'');
    cleanNumbers.push(onlyNumbers);
  }
  return cleanNumbers
}

function separateCharacters(){
  const cleanNumbersArray = cleanCharacters();
  const separatedValues = []
  cleanNumbersArray.forEach(element => {
    const firtsNums = element.slice(0,2);
    const finalsNums = element.slice(element.length - 2, element.length);
    const removeNums = element.replace(firtsNums, '');
    const centerNums = removeNums.replace(finalsNums, '');
    separatedValues.push(parseFloat(firtsNums), parseFloat(centerNums), parseFloat(finalsNums));
  })
  
  return separatedValues
}

function increaseValues(){
  const separatedValuesArray = separateCharacters();
  const increasedValues = []
  const increasedCenterValues = []
  separatedValuesArray.forEach(element => {
    if(Number.isInteger(element)){

      if(element + 2 < 70){
        increasedValues.push(element += 2);
      }else{
        increasedValues.push(element = 68);
      }

    }else{

      if(element + 0.2 < 7){
        increasedCenterValues.push(element += 0.2);
      }else{
        increasedCenterValues.push(element = 6.8);
      }
    }
  });

  addNewValues(increasedValues,increasedCenterValues);
}

function decreaseValues(){
  const separatedValuesArray = separateCharacters();
  const decreasedValues = []
  const decreasedCenterValues = []
  separatedValuesArray.forEach(element => {
    if(Number.isInteger(element)){

      if(element - 2 > 14){
        decreasedValues.push(element -= 2);
      }else{
        decreasedValues.push(element = 15);
      }

    }else{

      if(element - 0.2 > 0.2){
        decreasedCenterValues.push(element -= 0.2);
      }else{
        decreasedCenterValues.push(element = 0.2);
      }
    }
  });

  addNewValues(decreasedValues,decreasedCenterValues);
}

function addNewValues(numbers, centerNumbers){
  const newTitle = `clamp(${numbers[0]}px, ${centerNumbers[0]}vw, ${numbers[1]}px)`;
  const newFooter = `clamp(${numbers[2]}px, ${centerNumbers[1]}vw, ${numbers[3]}px)`;
  body.style.setProperty("--fontsize-title", newTitle);
  body.style.setProperty("--fontsize-footer", newFooter);
}
