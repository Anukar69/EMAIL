const mongoose = require("mongoose");
const DB_URI="mongodb+srv://anuk69:1anukartik@cluster0.q2r7djp.mongodb.net/fromdata"
mongoose
    .connect(DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.info("Connection successful!"))
    .catch((e) => {
        console.error(DB_URI, e)
        throw new Error("Error Occurred!");
    });
 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.info('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
 
mongoose.Promise = require("bluebird");