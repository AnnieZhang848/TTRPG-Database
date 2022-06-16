
var games;

window.onload = function initializePage(){
	document.getElementById("sort_btn").addEventListener("click", toggle);
	document.getElementById("filter_btn").addEventListener("click", toggle);
	document.getElementById("add_btn").addEventListener("click", toggle);
	document.getElementById("btnSubmit").addEventListener("click", addGame);
	document.getElementById("title").addEventListener("input", validateName);
  
	retrieveData();
};

function retrieveData(){
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
	xhttp.onreadystatechange = processData; // specify what should happen when the server sends a response
  	xhttp.open("GET", "http://localhost:8000/js/games.json", true); // open a connection to the server using the GET protocol
  	xhttp.send(); // send the request to the server
}

function processData(){
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
		let data = xhttp.responseText;
		games = JSON.parse(data);
		console.log(games);
		loadFilteredGames();
		loadGamesToEdit();
	}
	else {
		console.log("There was a problem with the request.");
	}
}

function toggle(event){
	if(event.currentTarget.id == "sort_btn"){
		document.getElementById("sort").className = "";
		document.getElementById("filter").className = "hidden";
		document.getElementById("add").className = "hidden";
	} else if (event.currentTarget.id == "filter_btn") {
		document.getElementById("sort").className = "hidden";
		document.getElementById("filter").className = "";
		document.getElementById("add").className = "hidden";
	} else {
		document.getElementById("sort").className = "hidden";
		document.getElementById("filter").className = "hidden";
		document.getElementById("add").className = "";
	}
}

function validateName(){
	document.getElementById("verification").className = "hidden";
	document.getElementById("btnSubmit").disabled = false;
}

function addGame(event){
	event.preventDefault();

	let URL = "http://localhost:8000/index.html?=";
  	let data = "?=&name=" + document.getElementById("title").value;

	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
    xhttp.onreadystatechange = processData; // specify what should happen when the server sends a response
    xhttp.open("POST", URL, true); // open a connection to the server using the GET prot

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data); // send the request to the server

	document.getElementById("verification").innerText = document.getElementById("title").value + " has succesfully been added to the database.";
	document.getElementById("verification").className = "";
	document.getElementById("title").value = "";
	document.getElementById("btnSubmit").disabled = true;
}

function loadFilteredGames(){
	let filtered = document.getElementById("filtered_games");
	
	for(i in games){
		let block = document.createElement("div");
		block.className = "game_block";

		let title = document.createElement("p");
		title.innerText = games[i].title;
		let info = games[i].tone + ", " + games[i].type + ", " + games[i].subject;
		if(info != ", , "){
			title.innerText += " - " + info;
		} else {
			title.innerText += " - No current tags"; 
		}
		block.appendChild(title);

		filtered.appendChild(block);
	}
}

function loadGamesToEdit(){
	let sorting = document.getElementById("sort_table");
	
	for(i in games){
		let row = document.createElement("tr");
		row.className = "sort_row";

		let title = document.createElement("td");
		title.innerText = games[i].title;
		row.appendChild(title);

		let tone = document.createElement("td");
		tone.innerText = games[i].tone;
		row.appendChild(tone);

		let type = document.createElement("td");
		type.innerText = games[i].type;
		row.appendChild(type);

		let subject = document.createElement("td");
		subject.innerText = games[i].subject;
		row.appendChild(subject);

		sorting.appendChild(row);
	}

	let editables = document.querySelectorAll('.sort_row');
	editables.forEach(cell => { cell.addEventListener('click', tagGame); });
}

function tagGame(event){
	console.log(parseInt(event.currentTarget.rowIndex)-1);
	console.log(event.currentTarget.firstChild.innerText);
}