import mongoose from "mongoose";

const { Schema } = mongoose;

const mapSchema = new Schema({
    map_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    objectives: [{
        type: Schema.Types.ObjectId,
        ref: "Objective"
    }]
});

const Map = mongoose.model('Map', mapSchema);

export { Map };