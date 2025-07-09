import mongoose from "mongoose";

const todo = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const Todo = mongoose.model("Todo", todo);

export default Todo;