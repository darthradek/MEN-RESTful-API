const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let quoteSchema  = new Schema(
    {
        content:{type:String},
        author:{type:String},
        source:{type:String},
        isActive:{type:Boolean}
    }
);

module.exports = mongoose.model("quote", quoteSchema);