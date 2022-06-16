var file = require("fs");
const express = require('express');
const path = require('path');
let router = express.Router();
const app = express();

app.use(express.json());

router.get("/", function(req, res, next){
	if(req.accepts('text/html')){
		if (file.existsSync("public/index.html")) {
			res.status(200);
			res.sendFile(path.join(__dirname, '/public/' + "index.html"));
		} else {
			res.status(404).send();
		}
	}
});

router.get("/index", function(req, res, next){
	if(req.accepts('text/html')){
		if (file.existsSync("public/index.html")) {
			res.status(200);
			res.sendFile(path.join(__dirname, '/public/' + "index.html"));
		} else {
			res.status(404).send();
		}
	}
});

// router.get("/fridges", function(req, res, next){
// 	if(req.accepts('text/html')){
//         if (file.existsSync("public/view_pickup.html")) {
// 			res.status(200);
// 			res.sendFile(path.join(__dirname, '/public/' + "view_pickup.html"));
// 		} else {
// 			res.status(404).send();
// 		}
// 	}

// 	else if(req.accepts('application/json')){
//         let data = undefined;
// 		if (file.existsSync("data/comm-fridge-data.json")) {
// 			data = JSON.parse(file.readFileSync("data/comm-fridge-data.json"));
// 		}

// 		if(data !== undefined){
// 			res.set("Content-Type", "application/json");
// 			res.json(data);
// 			res.status(200);
// 		} else if (data === undefined){
// 			res.status(404).send();
// 		} else {
// 			res.status(500).send();
// 		}
// 	}
// });

// router.get("/items", function(req, res, next){
// 	if(req.accepts('application/json')){
//         let data = undefined;
// 		if (file.existsSync("data/comm-fridge-items.json")) {
// 			data = JSON.parse(file.readFileSync("data/comm-fridge-items.json"));
// 		}
		
// 		if(data !== undefined){
// 			res.status(200);
// 			res.set("Content-Type", "application/json");
// 			res.json(data);
// 		} else if (data === undefined){
// 			res.status(404).send();
// 		} else {
// 			res.status(500).send();
// 		}
// 	}
// });

// //Part 1 Q5
// router.post("/fridges", express.json(), function(req, res, next){
// 	let data = [];
// 	if (file.existsSync("data/comm-fridge-data.json")) {
// 		data = JSON.parse(file.readFileSync("data/comm-fridge-data.json"));
// 	}

// 	let name = req.body.name;
// 	let can_accept_items = req.body.can_accept_items;
// 	let accepted_types = req.body.accepted_types;
// 	let contact_person = req.body.contact_person
// 	let contact_phone = req.body.contact_phone
// 	let address = req.body.address;

// 	// check if the data in the put body is properly formatted
// 	if(name === undefined || can_accept_items === undefined || accepted_types === undefined || contact_person === undefined || contact_phone  === undefined || address === undefined ){
// 		if(address.street  === undefined || address.postal_code === undefined || address.city === undefined  || address.province === undefined ){
// 			res.status(400).send("Expected fieldnames are not provided.");
// 		}
// 	}
// 	else {
// 		let newFridge = {"id": "fg-" + (data.length+1),
// 			"name":name, 
// 			"num_items_accepted": 0 ,
// 			"can_accept_items": can_accept_items,
// 			"accepted_types": accepted_types,
// 			"contact_person": contact_person,
// 			"contact_phone": contact_phone,
// 			"address": address,
// 			"items":[]
// 		}

// 		newFridge.address.country = "Canada";
// 		data.push(newFridge);

// 		file.writeFileSync("data/comm-fridge-data.json", JSON.stringify(data));
// 		res.status(200).set("Content-Type", "application/json").json(newFridge);
// 	}
// 	res.status(500).send();
// });

// //Part 1 Q4
// router.get("/fridges/addFridge", function(req, res, next){
// 	if(req.accepts('text/html')){
//         if (file.existsSync("public/addFridges.html")) {
// 			res.status(200);
// 			res.sendFile(path.join(__dirname, '/public/' + "addFridges.html"));
// 		} else {
// 			res.status(404).send();
// 		}
// 	}
// });

// //Part 1 Q7
// router.get("/fridges/editFridge", function(req, res, next){
// 	if(req.accepts('text/html')){
// 		if (file.existsSync("public/editFridges.html")) {
// 			res.status(200);
// 			res.sendFile(path.join(__dirname, '/public/' + "editFridges.html"));
// 		} else {
// 			res.status(404).send();
// 		}
// 	} else {
// 		res.status(500).send();
// 	}
// });

// //Part 1 Q6
// router.get("/fridges/:fridgeID", function(req, res, next){
// 	if(req.accepts('application/json')){
		
//         let data = [];
// 		if (file.existsSync("data/comm-fridge-data.json")) {
// 			data = JSON.parse(file.readFileSync("data/comm-fridge-data.json"));
// 		}

// 		let foundFridge = [];
// 		for(fridge in data){
// 			if(data[fridge].id == req.params.fridgeID){
// 				foundFridge = data[fridge];
// 			}
// 		}

// 		if(foundFridge.id != undefined){
// 			res.status(200).set("Content-Type", "application/json").json(foundFridge);
// 		} else if (foundFridge == []){
// 			res.status(404).send();
// 		} else {
// 			res.status(400).send();
// 		}
// 	} else {
// 		res.status(500).send();
// 	}
// });

// //Part 1 Q8
// router.put("/fridges/:fridgeID", express.json(), function(req, res, next){
// 	let toChange = Object.keys(req.body);

// 	let data = {};
// 	if (file.existsSync("data/comm-fridge-data.json")) {
// 		data = JSON.parse(file.readFileSync("data/comm-fridge-data.json"));
// 	}

// 	let foundFridge = -1;
// 	for(fridge in data){
// 		if(data[fridge].id == req.params.fridgeID){
// 			foundFridge = fridge;
// 		}
// 	}

// 	if(foundFridge == -1){
// 		res.status(404).send();
// 	} else {
// 		for(i in toChange){
// 			if(data[foundFridge][toChange[i]] == undefined){
// 				res.status(404).send();
// 			} else {
// 				data[foundFridge][toChange[i]] = req.body[toChange[i]];
// 			}
// 		}
// 	}

// 	file.writeFileSync("data/comm-fridge-data.json", JSON.stringify(data));
// 	res.status(200).set("Content-Type", "application/json").json(data[foundFridge]);
// });

// //Part 1 Q9
// router.post("/fridges/:fridgeID/items", express.json(), function(req, res, next){
// 	let id = req.body.id;
// 	let quantity = req.body.quantity;

// 	let fridgeData = [];
// 	if (file.existsSync("data/comm-fridge-data.json")) {
// 		fridgeData = JSON.parse(file.readFileSync("data/comm-fridge-data.json"));
// 	}

// 	let itemData = [];
// 	if (file.existsSync("data/comm-fridge-items.json")) {
// 		itemData = JSON.parse(file.readFileSync("data/comm-fridge-items.json"));
// 	}

// 	let foundFridge = -1;
// 	for(fridge in fridgeData){
// 		if(fridgeData[fridge].id == req.params.fridgeID){
// 			foundFridge = fridge;
// 		}
// 	}

// 	let foundItem = -1;
// 	for(item in itemData){
// 		if(itemData[item].id == id){
// 			foundItem = item;
// 		}
// 	}

// 	if(foundFridge >= 0 && foundItem >= 0){
// 		fridgeData[foundFridge].items.push({"id": id, "quantity": quantity});
// 		file.writeFileSync("data/comm-fridge-data.json", JSON.stringify(fridgeData));
// 		res.status(200).set("Content-Type", "application/json").json(fridgeData[foundFridge]);
// 	} else if (foundFridge == -1 || foundItem == -1){
// 		res.status(404).send();
// 	} else {
// 		res.status(500).send();
// 	}
// });

// //Part 1 Q11
// router.delete("/fridges/:fridgeID/items", function(req, res, next){
// 	let ids = Object.keys(req.query);

// 	let fridgeData = [];
// 	if (file.existsSync("data/comm-fridge-data.json")) {
// 		fridgeData = JSON.parse(file.readFileSync("data/comm-fridge-data.json"));
// 	}

// 	let itemData = [];
// 	if (file.existsSync("data/comm-fridge-items.json")) {
// 		itemData = JSON.parse(file.readFileSync("data/comm-fridge-items.json"));
// 	}

// 	let foundFridge = -1;
// 	for(fridge in fridgeData){
// 		if(fridgeData[fridge].id == req.params.fridgeID){
// 			foundFridge = fridge;
// 		}
// 	}
// 	if(foundFridge == -1){
// 		res.status(404).send();
// 	}

// 	if(ids.length == 0){
// 		fridgeData[foundFridge].items = [];
// 	} else {
// 		for(i in ids){
// 			let itemID = ids[i].replace("itemId", "");
			
// 			for(item in fridgeData[foundFridge].items){
// 				if(fridgeData[foundFridge].items[item].id == itemID){
// 					if(parseInt(fridgeData[foundFridge].items[item].quantity) > 1){
// 						fridgeData[foundFridge].items.push({"id": itemID, "quantity": parseInt(fridgeData[foundFridge].items[item].quantity)-1});
// 					}
// 					fridgeData[foundFridge].items.splice(item, 1);
// 				}
// 			}
// 		}
// 	}

// 	file.writeFileSync("data/comm-fridge-data.json", JSON.stringify(fridgeData));
// 	res.status(200).send();
	
// });

// //Part 1 Q10
// router.delete("/fridges/:fridgeID/:itemID", function(req, res, next){
// 	let fridgeData = [];
// 	if (file.existsSync("data/comm-fridge-data.json")) {
// 		fridgeData = JSON.parse(file.readFileSync("data/comm-fridge-data.json"));
// 	}

// 	let itemData = [];
// 	if (file.existsSync("data/comm-fridge-items.json")) {
// 		itemData = JSON.parse(file.readFileSync("data/comm-fridge-items.json"));
// 	}

// 	let foundFridge = -1;
// 	for(fridge in fridgeData){
// 		if(fridgeData[fridge].id == req.params.fridgeID){
// 			foundFridge = fridge;
// 		}
// 	}

// 	let foundItem = -1;
// 	for(item in fridgeData[foundFridge].items){
// 		if(fridgeData[foundFridge].items[item].id == req.params.itemID){
// 			foundItem = item;
// 		}
// 	}

// 	if(foundFridge >= 0 && foundItem >= 0){
// 		fridgeData[foundFridge].items.push({"id": req.params.itemID, "quantity": parseInt(fridgeData[foundFridge].items[item].quantity) - 1});
// 		fridgeData[foundFridge].items.splice(foundItem, 1);
// 		file.writeFileSync("data/comm-fridge-data.json", JSON.stringify(fridgeData));
// 		res.status(200).send();
// 	} else if (foundFridge == -1 || foundItem == -1){
// 		res.status(404).send();
// 	} else {
// 		res.status(500).send();
// 	}
// });

module.exports = router;