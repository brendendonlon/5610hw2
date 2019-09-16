(function(){

    //state = 0 = Cleared state or results state
    //state = 1 = Building onto 1st number
    //state = 2 = Operator was entered and now starting the second number
    //state = 3 = Building onto 2nd number
    //The calculator will not accept any more than one operator per calculation and it can only be entered while in state 1. therefore, chains of operations such as 2*4+5 will not be allowed in this design.
    var state = 0;
    var visibleNum = 0; //the number currently being built.
    var operand = 0; //stores the first number entered after the operator has been chosen and the second number is being built.
    var operator = 0; //The operator that will be used in the calculation step.
    //1 = add, 2 = subtract, 3 = multiply, 4 = divide.
    var negative = 0; //keeps track of if the number should be negative or not.
    //The sign of a number can only be changed before any digits for that number have been entered.
    //hitting the subtract button multiple times in a row when it is capable of changing the sign of a number will repeatedly swap the sign of the number. so, two presses will make the number positive again and three presses will be negative.
    var decimalPlace = 0; //indicates how many decimal places we have moved in case of a float value.
    //0 indicates it is still a whole number and 1 indicates the next digit added will be in the tenths place.
    
    function appendNumber(num) {
	if (state == 0) state = 1;
	if (decimalPlace == 0) {
            visibleNum *=10;
	    if (negative == 0) visibleNum += num;
	    else visibleNum -= num;
	} else {
	    var position = 0.1;
	    for (var i = 1; i < decimalPlace; i++) {
		position *= 0.1;
	    }
	    num *= position;
	    decimalPlace += 1;
	   
	    if (negative == 0) visibleNum += num;
	    else visibleNum -= num;
	}
	document.getElementById("result").innerHTML = visibleNum;
    }

    function clear(flag) {
	if (flag == 0) { //A full clear that will revert back to the starting default state
	    state = 0;
	    visibleNum = 0;
	    operand = 0;
	    operator = 0;
	    decimalPlace = 0;
	    negative = 0;
	    document.getElementById("result").innerHTML = visibleNum;
	}
	else if(flag == 1) { //A partial clear that will clear the visible number but remember the previous number. Will move to state 2 and be ready to accept the second number of the operation.
	    state = 2;
	    operand = visibleNum;
	    visibleNum = 0;
	    decimalPlace = 0;
	    negative = 0;
	    document.getElementById("result").innerHTML = visibleNum;
	}
	else if (flag == 2) { //A full clear aside from the calculator's display. The result of the last operation will be shown to the user but all data from that operation has been erased and is ready to start the next operation from state 0. Hitting C after this will clear the display as well but change nothing else.
	    state = 0;
	    operand = 0;
	    visibleNum = 0;
	    decimalPlace = 0;
	    operator = 0;
	    negative = 0;
	}
    }

    function calculate() {
	var result;
	if (operator == 1) {
	    result = operand + visibleNum;
	}
	else if (operator == 2) {
	    result = operand - visibleNum;
	}
	else if (operator == 3) {
	    result = operand * visibleNum;
	}
	else if (operator == 4) {
	    result = operand / visibleNum;
	}
	document.getElementById("result").innerHTML = result;
    }
    
    document.getElementById('7').onclick = function pressed7() {
	appendNumber(7);
    }

    document.getElementById('8').onclick = function pressed8() {
        appendNumber(8);
    }

    document.getElementById('9').onclick = function pressed9() {
        appendNumber(9);
    }

    document.getElementById('+/=').onclick = function pressedPlus() {
        if (state == 1) {
	    clear(1);
	    operator = 1;
	}
	else if (state == 3 || state == 2) {
	    calculate();
	    clear(2);
	}
    }

    document.getElementById('4').onclick = function pressed4() {
	appendNumber(4);
    }

    document.getElementById('5').onclick = function pressed5() {
        appendNumber(5);
    }

    document.getElementById('6').onclick = function pressed6() {
        appendNumber(6);
    }

    document.getElementById('-').onclick = function pressedMinus() {
        if (state == 0 || state == 2) {
	    if (negative == 0) negative = 1;
	    else negative = 0;
	}
	else if (state == 1) {
	    clear(1);
	    operator = 2;
	}
    }

    document.getElementById('1').onclick = function pressed1() {
        appendNumber(1);
    }

    document.getElementById('2').onclick = function pressed2() {
	appendNumber(2);
    }

    document.getElementById('3').onclick = function pressed3() {
        appendNumber(3);
    }

    document.getElementById('X').onclick = function pressedX() {
        if (state == 1) {
	    clear(1);
	    operator = 3;
	}
    }

    document.getElementById('C').onclick = function pressedC() {
        clear(0);
    }

    document.getElementById('0').onclick = function pressed0() {
        appendNumber(0);
    }

    document.getElementById('.').onclick = function pressedDot() {
        if (decimalPlace == 0) {
	    decimalPlace += 1;
	}
    }

    document.getElementById('/').onclick = function pressedDivide() {
        if (state == 1) {
	    clear(1);
	    operator = 4;
	}
    }

})();
