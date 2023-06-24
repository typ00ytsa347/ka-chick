import mongoose from "mongoose";
const { Schema } = mongoose;

const objectiveSchema = new Schema({
    letter: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Objective = mongoose.model('Objective', objectiveSchema);

export { Objective };