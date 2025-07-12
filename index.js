const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/ussd", (req, res) => {
const { sessionId, serviceCode, phoneNumber, text } = req.body;

let response = "";
const inputs = text.split("*");

switch (inputs.length) {
case 1:
response = `CON Welcome Mentore Loans
1. Apply for a Loan
2. Check Loan Status
3. View My Score`;
break;
case 2:
if (inputs[0] === "1") {
response = `CON Enter your National ID:`;
} else if (inputs[0] === "2") {
response = `END Loan Status: Pending`;
} else if (inputs[0] === "3") {
response = `END Your Credit Score: 60 (Good Start)`;
} else {
response = `END Invalid option`;
}
break;
case 3:
response = `CON Enter your Monthly Income:`;
break;
case 4:
response = `CON How much do you want to borrow (in GYD)?`;
break;
case 5:
response = `END Thank you. Your loan application has been received.`;
break;
default:
response = `END Something went wrong. Try again.`;
}

res.set("Content-Type", "text/plain");
res.send(response);
});

app.listen(port, () => {
console.log(`USSD app running on port ${port}`);
});