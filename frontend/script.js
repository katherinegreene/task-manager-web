const API = "http://127.0.0.1:5000";
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const rewardsContainer = document.getElementById("rewardsContainer");
/* =========================
LOAD TASKS
========================= */
function loadTasks() {
    fetch(`${API}/tasks`)
        .then(res => res.json())
        .then(tasks => {
            taskList.innerHTML = ""; // clear old tasks
            tasks.forEach((task, index) => {
                const li = document.createElement("li");
                const textSpan = document.createElement("span");
                textSpan.textContent = task.title;

                // Gray out completed tasks
                if (task.completed) {
                    textSpan.style.color = "#888";
                    textSpan.style.textDecoration = "line-through";
                }

                li.appendChild(textSpan);

                const doneBtn = document.createElement("button");
                doneBtn.textContent = "Done";
                doneBtn.classList.add("done");
                if (task.completed) {
                    doneBtn.disabled = true;
                    doneBtn.style.opacity = 0.6;
                    doneBtn.style.cursor = "not-allowed";
                }
                doneBtn.onclick = () => doneTask(index);
                li.appendChild(doneBtn);

                const delBtn = document.createElement("button");
                delBtn.textContent = "Delete";
                delBtn.classList.add("delete");
                delBtn.onclick = () => deleteTask(index);
                li.appendChild(delBtn);

                taskList.appendChild(li);
            });
        });
}

/* =========================
ADD TASK
========================= */
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newTask = {
        title: taskInput.value,
        completed: false
    };
    fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    }).then(function () {
        taskInput.value = "";
        loadTasks();
    });
});
/* DONE
 */
function doneTask(index) {
    fetch(`${API}/tasks/${index}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true })
    }).then(function () {
        loadTasks();
    });
}
/* 
DELETE TASK*/
function deleteTask(index) {
    fetch(`${API}/tasks/${index}`, {
        method: "DELETE"
    }).then(function () {
        loadTasks();
    });
}
/* 
REWARD SYSTEM
1 cat card per 5 completed tasks
 */
function showRewards(tasks) {
    let completedCount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            completedCount++;
        }
    }
    let rewardCount = Math.floor(completedCount / 5);
    rewardsContainer.innerHTML = "";
    for (let i = 0; i < rewardCount; i++) {
        const card = document.createElement("img");
        card.src = "images/cat-card.png";
        card.style.width = "80px";
        card.style.marginRight = "10px";
        rewardsContainer.appendChild(card);
    }
}
/* 
INITIAL LOAD
 */

loadTasks();
