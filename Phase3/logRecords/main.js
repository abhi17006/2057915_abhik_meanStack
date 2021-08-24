let data = require("readline-sync");
let fs = require("fs");

let fname = data.question("Enter the first name:");
let lname = data.question("Enter the last name:");
let gender = data.question("Enter the Gender:");
let email = data.questionEMail("Enter the email address:");
//get timeStamp

let varDate = Date.now();
let currDate = new Date(varDate);
let userData = JSON.parse(fs.readFileSync("userData.json").toString());
userData.push({fname,lname,gender,email,currDate});
fs.writeFileSync("userData.json",JSON.stringify(userData));
debugger
console.log("New Data");
