const path = require("path");

// module.exports = path.dirname(process.mainModule.filemane);
//its not working for this we can write in other way

module.exports = path.dirname(require.main.filename);
