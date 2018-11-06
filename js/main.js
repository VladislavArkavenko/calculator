let keys = document.getElementsByTagName('p');
let operators = ['+', '-', 'x', '÷', '^'];
let decimal = false;

for(let i = 0; i < keys.length; i++) {
	keys[i].onclick = function(event) {
		let display = document.getElementById('display');
		let displayValue = display.innerHTML;
		let keyValue = this.innerHTML;
		let lastChar = displayValue[displayValue.length -1];

		//Clear
		if (keyValue == 'C') {
			display.innerHTML = '';
			decimal = false;
		} else if (keyValue == 'S') {
            display.innerHTML = display.innerHTML.slice(0, -1);
        }

		//Operator "="
		else if(keyValue == '='){
			displayValue = displayValue.replace(/x/g, '*').replace(/÷/g, '/');
			if( displayValue[0] == "0" && displayValue[1] != ".") {
                displayValue = displayValue.slice(1)
			}
			if (lastChar == '.' || operators.indexOf(lastChar) > -1 ){
				displayValue = displayValue.replace(/.$/, ' ');
			}
			let result = eval(displayValue);
			if(result.toString().indexOf('.') > -1){
                result = result.toFixed(2);
                if( result[result.length - 1] == "0" ) {
                	result = result.slice(0, -1)
                }
			}
			display.innerHTML = result;
			if(result.toString().indexOf('.') > -1){
				decimal = true;
			} else {
				decimal = false;
			}

		} 

		//Other operators: '+', '-', 'x', '÷'.
		else if (operators.indexOf(keyValue) > -1) {			
			if (displayValue != '' && operators.indexOf(lastChar) == -1) {
				display.innerHTML += keyValue;
				decimal = false;				
			}
			else if (displayValue == '' && keyValue == '-') {
				display.innerHTML = '-';				
			}
			if((operators.indexOf(lastChar) > -1 || lastChar == '.') && displayValue.length > 1 ){				
				display.innerHTML = displayValue.replace(/.$/, keyValue);
				decimal = false;
			}
		}

		//Point
		else if(keyValue == '.'){
			if (displayValue == '' || operators.indexOf(lastChar) > -1 || lastChar == '.' || decimal ){
				//do nothing
			} else {
				display.innerHTML += '.';
				decimal = true;
			}
		}

		//Numbers
		else {
			display.innerHTML += keyValue;
		}		
	}
}