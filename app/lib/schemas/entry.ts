import mongoose from "mongoose";
const entrySchema = new mongoose.Schema({
    name: String,
    content: String,
    date: Date,
});

const Entry = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default Entry;