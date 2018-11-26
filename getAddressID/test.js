const fs = require("fs");

fs.appendFile("test.txt", "fuck", err => console.log (err))