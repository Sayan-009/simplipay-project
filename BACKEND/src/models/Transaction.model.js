import mongoose from "mongoose";

const transactionShema = new mongoose.Schema({
    senderUPI: {
        type: String,
        required: true,
    }, 
    receiverUPI: {
        type: String,
        required: true
    }, 
    amount: {
        type: Number,
        required: true
    },
    transactionID: {
        type: String,
        required: true,
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["success, failed"],
        default: "success"
    }
}, {
    timestamps: true
})


export const Transaction = mongoose.model("Transaction", transactionShema);