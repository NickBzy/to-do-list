function createProject(name) {
    let projectName = name;
    const id = crypto.randomUUID();
    const tasks = [];

    function getId() {
        return id;
    }

    function addTask(task) {
        tasks.push(task);
    }

    function removeTask(index) {
        tasks.splice(index, 1);
    }

    function  editName(newName) {
        projectName = newName
    }

    function getName() {
        return projectName;
    }

    return {
        getName,
        editName,
        tasks,
        addTask,
        removeTask,
        getId
    };
}

export { createProject };