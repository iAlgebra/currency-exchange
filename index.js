var $date = document.querySelector("#date");
var $base = document.querySelector("#base");
var $tbody = document.querySelector("#tBody");
var $dateInput = document.querySelector("[name=date]");

const API_BASE_URL = "https://api.exchangeratesapi.io/";

jQuery.ajax(API_BASE_URL + "latest", {
	success: changeValues
});

function changeValues(data) {
	// clean up the table
	$tbody.innerHTML = "";
	// populate the table
	for(var currency in data.rates) {
		var $tr = document.createElement("tr");
		var $tdCurrency = document.createElement("td");
		var $tdRate = document.createElement("td");
		//crear una fila
		$tbody.appendChild($tr);
		//crear una celda izq con el valor de currency
		$tr.appendChild($tdCurrency);
		$tdCurrency.textContent = currency;
		//crear otra celda der con el valor del rate
		$tr.appendChild($tdRate);
		$tdRate.textContent = data.rates[currency];
	}

	$date.textContent = data.date;
	$base.textContent = data.base;
	$dateInput.max = data.date;
};

$dateInput.addEventListener("change", function() {
	var url;

	if($dateInput.value === "") {
		// request the latest date
		url = API_BASE_URL + "latest";
	} else {
		// request the chosen date
		url = API_BASE_URL + $dateInput.value;
	}

	jQuery.ajax(url, {
		success: changeValues
	});
});
