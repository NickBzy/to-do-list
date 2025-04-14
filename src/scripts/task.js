function createTask(title, description, dueDate, priority, id = crypto.randomUUID()) {
    let taskTitle = title;
    let taskDescription = description;
    let taskDate = dueDate;
    let taskPriority = priority;
    let taskComplete = false;

    function getId() {
        return id;
    }

    function getTitle() {
        return taskTitle;
    }

    function getDescription() {
        return taskDescription;
    }

    function getDate() {
        return taskDate;
    }

    function getPriority() {
        return taskPriority;
    }

    function getCompletion() {
        return taskComplete;
    }

    function changeTitle(newName) {
        taskTitle = newName;
    }

    function changeDescription(newDescription) {
        taskDescription = newDescription;
    }

    function changeDate(newDate) {
        taskDate = newDate;
    }

    function changePriority(newPriority) {
        taskPriority = newPriority;
    }

    function markComplete() {
        taskComplete = true;
    }

    return {
        getTitle,
        getDescription,
        getDate,
        getPriority,
        getCompletion,
        changeTitle,
        changeDescription,
        changeDate,
        changePriority,
        markComplete,
        getId
    };
}

export {createTask}