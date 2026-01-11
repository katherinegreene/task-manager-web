from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []

# GET all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

# POST a new task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    tasks.append(data)
    return jsonify({"message": "Task added"}), 201

# DELETE a task by index
@app.route("/tasks/<int:index>", methods=["DELETE"])
def delete_task(index):
    if 0 <= index < len(tasks):
        tasks.pop(index)
        return jsonify({"message": "Task deleted"})
    return jsonify({"error": "Invalid index"}), 400
@app.route("/tasks/<int:index>", methods=["PATCH"])
def update_task(index):
    if 0 <= index < len(tasks):
        tasks[index]["completed"] = True
        return jsonify({"message": "Task marked as completed"})
    return jsonify({"error": "Invalid index"}), 400


if __name__ == "__main__":
    app.run(debug=True)
