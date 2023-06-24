import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/kachick')
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));

export default mongoose;