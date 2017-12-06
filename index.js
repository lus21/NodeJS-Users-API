const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// test data
const users = [
  { id: 1 , name: 'John', address: 'Highway 71'},
  { id: 2 , name: 'Peter', address: 'Lowstreet 4'},
  { id: 3 , name: 'Amy', address: 'Apple st 652'},
  { id: 4 , name: 'Hannah', address: 'Mountain 21'},
  { id: 5 , name: 'Michael', address: 'Valley 345'},
  { id: 6 , name: 'Sandy', address: 'Ocean blvd 2'},
  { id: 7 , name: 'Betty', address: 'Green Grass 1'},
  { id: 8 , name: 'Richard', address: 'Sky st 331'},
  { id: 9 , name: 'Susan', address: 'One way 98'},
  { id: 10 , name: 'Vicky', address: 'Yellow Garden 2'},
  { id: 11 , name: 'Ben', address: 'Park Lane 38'},
  { id: 12 , name: 'William', address: 'Central st 954'},
  { id: 13 , name: 'Chuck', address: 'Main Road 989'},
  { id: 14 , name: 'Viola', address: 'Sideway 1633'}
];

//midlware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// returns json. status and all users
app.get('/users', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.json({status: "OK", body: users });
	res.end();
});

// returns json. status and user with specified id
app.get('/users/:id', (req, res) => {
	let data = '';
	const  index = users.findIndex(findUserById.bind( null, req.params.id )); //index will be -1 if no user
	index < 0 ? data = 'User not found' : data = users[index];
	res.setHeader('Content-Type', 'application/json');
	res.json({status: "OK", body: data });
	res.end();
});

// deleting user with specified id, returns json. status and msg
app.delete('/users/:id', (req, res) => {
	const  index = users.findIndex(findUserById.bind( null, req.params.id )); 
	if (index >= 0) users.splice(index, 1);
	res.setHeader('Content-Type', 'application/json');
	res.json({status: "OK", body: "Successfully deleted" });
	res.end();
});

// updating user with specified id, returns json. status and msg
app.put('/users/:id', (req, res) => {
	const updateData = req.body;
	const index = users.findIndex(findUserById.bind( null, req.params.id ));
	res.setHeader('Content-Type', 'application/json');
	if (index < 0) {
		res.json({status: "OK", body: 'User not found' });
	} else {
		for (let prop in updateData) {
			if (prop !== 'id') users[index][prop] = updateData[prop];
		}
		res.json({status: "OK", body: 'Successfully updated' });
	}
	res.end();
});

// from array returns object wich id is equal to given
function findUserById(id, element) {
	return element.id == id;
}

app.listen(3000);
