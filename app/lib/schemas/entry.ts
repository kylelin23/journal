import mongoose from "mongoose";
const entrySchema = new mongoose.Schema({
    name: String,
    content: String,
    date: Date,
});

const Entry = mongoose.model('Entry', entrySchema);

const testEntry = new Entry({
    name: 'Test Entry',
    content: 'Hopefully this shows up! ',
    date: new Date("<2026-09-03>"),
})

testEntry.save();

export default Entry;