// Set up the mongoDB connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Ben:526817244@513cluster-qiybs.mongodb.net/test?retryWrites=true";
var client = new MongoClient(url, { useNewUrlParser: true });   // start a new client

module.exports = function () {

};

client.connect(err => {
    var collection = client.db("pictionary").collection("users");

    module.exports.signin = function (loginUsername, loginPassword, callback){
        var status = -1;
        var myobj = { username: loginUsername, password: loginPassword };

        // Checks if either username, email or password is empty
        if(loginUsername.trim() === "" || loginPassword.trim() === "") {
            console.log("empty username or password");
            status = 0;     // status is 0 when empty input errors happen
            callback(status);
        }

        collection.find(myobj).toArray(function(err, ress) {
            if (ress.length !== 0){
                status = 1;     // user exists
                callback(status);
            }else{
                status = 3;     // user doesn't exist
                callback(status);
            }
        });
    };

    module.exports.signup = function (signupUsername, signupEmail, signupPassword, callback) {
        var status = -1;
        // Checks if either username, email or password is empty
        if(signupUsername.trim() === "" || signupEmail.trim() === "" || signupPassword.trim() === "") {
            console.log("empty username, email or password");
            status = 0; // status is 0 when empty input errors happen
            callback(status);
        }

        var query = { username: signupUsername };
        collection.find(query).toArray(function(err, ress) {
            if (err) throw err;
            if (ress.length !== 0){       // checks if the username has been taken
                console.log("the username has been taken, please choose another username");
                status = 1;     // status is 1 when having duplicate usernames
                callback(status);
            }else{       // else, create the new user
                var myobj = { username: signupUsername, password: signupPassword, email: signupEmail, wins: 0, gamePlayed: 0 };
                collection.insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    console.log("inserted");
                    status = 2; // status is 2 when no errors occur
                    callback(status);
                });
            }
        });

    }

});

