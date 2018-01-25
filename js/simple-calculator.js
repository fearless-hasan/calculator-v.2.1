var resultString = [
'',
''
];

var number = [
0,
0,
0
];

var indicator = 0;
var operator = '';
var flagMinus = '';
var pointCount = 0;


operateFunction = function() {
	number[0] = Number(resultString[0]);
	number[1] = Number(resultString[1]);
	if(operator==''){
		number[3]=Number(resultString[0]);
	} else if(operator=='+'){
		number[3] = number[0]+number[1];
	} else if(operator=='-'){
		number[3] = number[0]-number[1];
	} else if(operator=='*'){
		number[3] = number[0]*number[1];
	} else if(operator=='/'){
		number[3] = number[0]/number[1];
	} else if(operator=='%'){
		number[3] = number[0]%number[1];
	}
	if(number[3]<0) flagMinus='-';
	else flagMinus='';
	// resultString[0] += resultString[1];
	resultString[0] = String(number[3]);
	resultString[1] = '';
};

squareRoot = function(){
	number[0] = Number(resultString[indicator]);
	number[3] = Math.sqrt(number[0]);
	resultString[indicator] = String(number[3]);
	if(String(parseInt(resultString[indicator]))!=resultString[indicator]) pointCount=1;
};

valueInverse = function(){
	number[0] = Number(resultString[indicator]);
	number[3] = 1/number[0];
	resultString[indicator] = String(number[3]);
	if(String(parseInt(resultString[indicator]))!=resultString[indicator]) pointCount=1;
};

valueSquare = function(){
	number[0] = Number(resultString[indicator]);
	number[3] = number[0]*number[0];
	resultString[indicator] = String(number[3]);
	if(String(parseInt(resultString[indicator]))!=resultString[indicator]) pointCount=1;
};

c = function(){
	resultString[0] = '';
	resultString[1] = '';
	operator = '';
	flagMinus = '';
	pointCount = 0;
	indicator = 0;
	$('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
	$('#flagMinus').val(flagMinus);
	$('#result').val('0');
};

ce = function(){
	resultString[indicator]='';
	pointCount = 0;
	flagMinus='';
	$('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
	$('#flagMinus').val(flagMinus);
	$('#result').val('0');
};


backspace = function(){
	var size = resultString[indicator].length;
	resultString[indicator]=resultString[indicator].slice(0,size-1);
	if(size==0) flagMinus='';
	$('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
	$('#flagMinus').val(flagMinus);
	$('#result').val(resultString[indicator]);
};


inverse = function(){
	valueInverse();
	$('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
	$('#result').val(resultString[indicator]);
};

sqrt = function(){
	squareRoot();
	$('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
	$('#result').val(resultString[indicator]);
	flagMinus = '';
	$('#flagMinus').val(flagMinus);
};


square = function(){
	valueSquare();
	$('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
	$('#result').val(resultString[indicator]);
	flagMinus = '';
	$('#flagMinus').val(flagMinus);
};




reverse = function(){
	if(flagMinus==''){
		flagMinus = '-';
		resultString[indicator]='-'+resultString[indicator];
	} else {
		flagMinus = '';
		var size = resultString[indicator].length;
		resultString[indicator]=resultString[indicator].slice(1,size);
	}
	$('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
	$('#flagMinus').val(flagMinus);
};


$( document ).ready(function() {
	$('#result').focus();
    $(".btn").click(function() {
        if ($(this).attr('data-role')=='number') {
            if( ($(this).val() >= '1' && $(this).val() <= '9' ) || ($(this).val() == '0' && resultString [indicator] != '')){
                resultString[indicator] += $(this).val();
                $('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
                $('#result').val(String(Math.abs(Number(resultString[indicator]))));
            }
            else if ($(this).val() == '.') {
                if(pointCount==0){
                    pointCount=1;
                    resultString [indicator] += '.';
                }
                $('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
                if(resultString [indicator] != '.')
                    $('#result').val(String(Math.abs(Number(resultString[indicator]))));
            }
        }
        else if ($(this).attr('data-role')=='operator') {
            operateFunction();
            operator = $(this).val();
            indicator = 1;
            pointCount = 0;
            if(operator == '=') {
                operator = '';
                indicator = 0;
            }
            $('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
            $('#result').val(String(Math.abs(Number(resultString[indicator]))));
            $('#flagMinus').val(flagMinus);
        }
        else if ($(this).attr('data-role')=='specialOperator') {
            var check = $(this).val();
            if(check == 'C') {
                c();
            }
            else if(check == 'CE') {
                ce();
            }
            else if(check == '<-') {
                backspace();
            }
            else if(check == '1/X') {
                inverse();
            }
            else if(check == 'X^2') {
                square();
            }
            else if(check == '+/-') {
                reverse();
            }
            else {
                sqrt();
            }
        }
    });

    $("#result").keypress(function( event ) {
    	// alert(String.fromCharCode(event.which));
		var press = event.which;
        if(press >= 49 && press <= 58 ){
            resultString[indicator] += String.fromCharCode(press);
            $('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
            $('#result').val(resultString[indicator]);
        }
        else if( press == 48  && resultString [indicator] != ''){
            resultString[indicator] += String.fromCharCode(press);
            $('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
            $('#result').val(resultString[indicator]);
        }
        else if (press == 46) {
            if(pointCount==0){
                pointCount=1;
                resultString [indicator] += '.';
            }
            $('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
            if(resultString [indicator] != '.')
                $('#result').val(resultString[indicator]);
        }
        else if (press == 43 || press == 45 || press == 42 || press == 47 || press == 37 || press == 61 || press == 13 ) {
            operateFunction();
            operator = String.fromCharCode(press);
            if(press == 13) operator = '=';
            indicator = 1;
            pointCount = 0;
            if(operator == '=') {
                operator = '';
                indicator = 0;
            }
            $('#resultString').val(resultString[0] + ' ' + operator + ' ' + resultString[1]);
            $('#result').val(String(Math.abs(Number(resultString[indicator]))));
            $('#flagMinus').val(flagMinus);
        }
        else {
            alert(event.which);
		}

    });




});



















