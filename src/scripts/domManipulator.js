
//displayProjectModal
//renderProjectsList
//displayTaskModal
//renderTasksList

function renderProjectsCount(projects, selector) {
    const projectsCount = document.querySelector(selector);
    if (projectsCount) {
        projectsCount.innerText = projects.length;
    } else {
        console.error(`Element with selector "${selector}" not found`);
    }
}

function renderProjectsSideBar(projects, selector) {
    const projectList = document.querySelector(selector);
    projectList.innerText = "";
    for(let i=0; i<projects.length; i++){
        const project = document.createElement("div");
        project.classList.add("project-sidebar");
        project.setAttribute("data-id", projects[i].getId());
        project.innerText = projects[i].getName().toUpperCase();
        projectList.appendChild(project);
    }
}

function renderProjectsList(projects, selector) {
    const projectsGrid = document.querySelector(selector);
    projectsGrid.innerText = "";
    for (let i=0; i<projects.length; i++) {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.setAttribute("data-id", projects[i].getId());

        // To open modal of first project for development
        // if (i==0) {
        //     projectItem.classList.add("selected");
        // }

        const projectNameDiv = document.createElement("div");
        projectNameDiv.classList.add("project-name");
        projectNameDiv.setAttribute("data-id", projects[i].getId());
        projectNameDiv.innerText = projects[i].getName().toUpperCase();
        projectItem.appendChild(projectNameDiv);

        const projectTasksDiv = document.createElement("div");
        projectTasksDiv.classList.add("project-tasks");
        renderTasksList(projects[i], projectTasksDiv);

        const createTaskButton = document.createElement("button");
        createTaskButton.classList.add("create-task");
        createTaskButton.innerText = "+ Create a task";
        
        projectTasksDiv.appendChild(createTaskButton);
        projectItem.appendChild(projectTasksDiv);

        projectsGrid.appendChild(projectItem);
    }

    //Add a project button
    const addProject = document.createElement("button");
    addProject.classList.add("add-project");
    addProject.innerText = "+ Add a Project";
    projectsGrid.appendChild(addProject);
}

function renderTasksList(project, projectTasks) {
    projectTasks.innerText = "";
    for (let i=0; i<project.tasks.length; i++){
        const task = document.createElement("div");
        task.classList.add("task");

        const customCheckbox = document.createElement("label");
        customCheckbox.classList.add("custom-checkbox");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        customCheckbox.appendChild(checkbox);

        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");
        customCheckbox.appendChild(checkmark);

        const taskTitle = document.createElement("span");
        taskTitle.classList.add("task-title");
        taskTitle.innerText = project.tasks[i].getTitle();
        customCheckbox.appendChild(taskTitle);

        task.appendChild(customCheckbox);

        const date = document.createElement("p");
        date.innerText = project.tasks[i].getDate();

        task.appendChild(date);

        const priorityIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        priorityIcon.classList.add(project.tasks[i].getPriority());
        priorityIcon.setAttribute("height", 20);
        priorityIcon.setAttribute("width", 20);
        priorityIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        priorityIcon.setAttribute("viewBox", "0 0 24 24");
        const priorityTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
        priorityTitle.innerText = "circle-half-full";
        priorityIcon.appendChild(priorityTitle);
        const priorityPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        priorityPath.setAttribute("d", "M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12A8 8 0 0 1 12 20V4Z");
        priorityIcon.appendChild(priorityPath);
        
        task.appendChild(priorityIcon);

        const editIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        editIcon.classList.add("button");
        editIcon.setAttribute("height", 20);
        editIcon.setAttribute("width", 20);
        editIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        editIcon.setAttribute("viewBox", "0 0 24 24");
        const editTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
        editTitle.innerText = "pencil";
        editIcon.appendChild(editTitle);
        const editPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        editPath.setAttribute("d", "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z");
        editIcon.appendChild(editPath);

        task.appendChild(editIcon);

        const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        deleteIcon.classList.add("button");
        deleteIcon.setAttribute("height", 20);
        deleteIcon.setAttribute("width", 20);
        deleteIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        deleteIcon.setAttribute("viewBox", "0 0 24 24");
        const deleteTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
        deleteTitle.innerText = "trash-can";
        deleteIcon.appendChild(deleteTitle);
        const deletePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        deletePath.setAttribute("d", "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z");
        deleteIcon.appendChild(deletePath);

        task.appendChild(deleteIcon);

        projectTasks.appendChild(task);
    }
}

let selectedProjectId = null;
function displaySelectedProject(projects, projectId) {
    const selectedProject = projects.find(project => project.getId() === projectId);

    if (selectedProject) {
        const projectItems = document.querySelectorAll(".project-item");
        projectItems.forEach(item => {
            if (item.getAttribute("data-id") === projectId) {
                item.classList.add("selected");
                displayOverlay();
            } else {
                item.classList.remove("selected");
            }
        });

        selectedProjectId = projectId;
    }
}

function getSelectedProjectId() {
    return selectedProjectId;
}

function hideSelectedProject(projectId) {
    const projectItems = document.querySelectorAll(".project-item");

    projectItems.forEach(item => {
        if (item.getAttribute("data-id") === projectId) {
            item.classList.remove("selected");
        }
    });

    hideOverlay();
}

function displayProjectModal() {
    displayOverlay();
    const createProjectModal = document.querySelector(".project-modal");
    createProjectModal.classList.remove("hidden");
}

function hideProjectModal() {
    const createProjectModal = document.querySelector(".project-modal");  
    createProjectModal.classList.add("hidden");
    hideOverlay();
}

function displayOverlay() {
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("hidden");
}

function hideOverlay() {
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("hidden");
}

function populateProjectDropdown(projects, selectedProjectId = null) {
    const projectSelect = document.querySelector(".project-select");
    projectSelect.disabled = false;

    projectSelect.innerHTML = "";

    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.getId();
        option.innerText = project.getName();
        if (project.getId() === selectedProjectId) {
            option.selected = true;
            projectSelect.disabled = true;
        }
        projectSelect.appendChild(option);
    });
}

function displayTaskModal(projects, selectedProjectId = null) {
    populateProjectDropdown(projects, selectedProjectId);
    displayOverlay();
    document.querySelector(".task-modal").classList.remove("hidden");
}

function hideTaskModal() {
    hideOverlay();
    const taskModal = document.querySelector(".task-modal");
    taskModal.classList.add("hidden");
}

function closeTaskModalOnly() {
    const taskModal = document.querySelector(".task-modal");
    taskModal.classList.add("hidden");
}

function projectIsShown(){
    const projectItems = document.querySelector(".projects-grid").children;
    for (const item of projectItems) {
        if (item.classList.contains("selected")) {
            return true;
        }
    }
    return false;
}

export {
    renderProjectsCount,
    renderProjectsSideBar,
    renderProjectsList,
    displayProjectModal,
    hideProjectModal,
    displaySelectedProject,
    hideSelectedProject,
    getSelectedProjectId,
    displayTaskModal,
    hideTaskModal,
    closeTaskModalOnly,
    projectIsShown
}