const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/todoapp")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.json({
        message: "Todo Backend is running"
    });
});

app.post("/todos", async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title
        });

        const savedTodo = await todo.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        console.log("Error creating todo:", error);

        res.status(500).json({
            error: "Failed to create todo"
        });
    }
});

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();

        res.json(todos);
    } catch (error) {
        console.log("Error fetching todos:", error);

        res.status(500).json({
            error: "Failed to fetch todos"
        });
    }
});
app.put("/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                completed: req.body.completed
            },
            { new: true }
        );

        res.json(updatedTodo);
    } catch (error) {
        console.log("Error updating todo:", error);

        res.status(500).json({
            error: "Failed to update todo"
        });
    }
});
app.delete("/todos/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        res.json({
            message: "Todo deleted successfully",
            todo: deletedTodo
        });
    } catch (error) {
        console.log("Error deleting todo:", error);

        res.status(500).json({
            error: "Failed to delete todo"
        });
    }
});
app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
