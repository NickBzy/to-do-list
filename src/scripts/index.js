import "../styles/styles.css"
import "../styles/modals.css"
import { createProject } from "./project";
import { createTask } from "./task";
import {format, parseISO} from 'date-fns';
import { renderProjectsCount, renderProjectsList, renderProjectsSideBar, hideProjectModal, displayProjectModal, displaySelectedProject, hideSelectedProject, getSelectedProjectId, displayTaskModal, hideTaskModal, closeTaskModalOnly, projectIsShown } from "./domManipulator";

console.log("Hello world!");

const project1 = createProject("gym");
console.log(project1);
console.log(project1.getName())

const date1 = format(new Date(), '2025-04-12');
const task1 = createTask("leg day", "do legs 3x per week", date1, "light");
project1.addTask(task1);
console.log(task1.getDate());

const project2 = createProject("study");
console.log(project2);
console.log(project2.getName())

const date2 = format(new Date(), '2025-04-12');
const task2 = createTask("math", "complete 3 exercises", date2, "moderate");
project2.addTask(task2);
console.log(task2.getDate());

const projects = [];
projects.push(project1);
projects.push(project2);

const projectCountSelector = "#number-projects"
renderProjectsCount(projects, projectCountSelector);

const projectListSidebarSelector = ".projects-list"
renderProjectsSideBar(projects, projectListSidebarSelector);

const projectsGridSelector = ".projects-grid";
renderProjectsList(projects, projectsGridSelector);

//ADD PROJECT BUTTON
const addProjectButton = document.querySelector(".add-project");
addProjectButton.addEventListener("click", displayProjectModal);


document.querySelector(".overlay").addEventListener("click", hideProjectModal);
document.querySelector(".project-modal").addEventListener("click", (e) => {
    e.stopPropagation();
});


//DISPLAY SELECTED PROJECT FROM SIDEBAR
const projectsList = document.querySelector(".projects-list");
projectsList.addEventListener("click", function(event) {
    const clickedProject = event.target;
    if (clickedProject.classList.contains("project-sidebar")) {
        const projectId = clickedProject.getAttribute("data-id");
        displaySelectedProject(projects, projectId);
    }
});
document.querySelector(".overlay").addEventListener("click", function() {
    const selectedProjectId = getSelectedProjectId();
    hideSelectedProject(selectedProjectId);
});

//DISPLAY SELECTED PROJECT FROM PROJECTS GRID
const projectsGrid = document.querySelector(".projects-grid");
projectsGrid.addEventListener("click", function(event) {
    const clickedProject = event.target;
    if (clickedProject.classList.contains("project-name")) {
        const projectId = clickedProject.getAttribute("data-id");
        displaySelectedProject(projects, projectId);
    }
});

//ADD PROJECT BUTTON FROM PROJECTS GRID
projectsGrid.addEventListener("click", function(event){
    const addBtn = event.target;
    if (addBtn.classList.contains("add-project")) {
        displayProjectModal();
    }
});

// GENERAL CREATE TASK BUTTON
const createTaskButton = document.querySelector(".create-task-general");
createTaskButton.addEventListener("click", ()=> displayTaskModal(projects));
const projectSelect = document.querySelector(".project-select");
const closeTaskModal = document.querySelector(".close-task-modal");
closeTaskModal.addEventListener("click", () => {
    if (projectSelect.disabled) {
        closeTaskModalOnly();
    } else {
        hideTaskModal();
    }
});

// PROJECT CREATE TASK BUTTON
projectsGrid.addEventListener("click", function(event){
    const clickedProject = event.target;
    if (clickedProject.classList.contains("create-task")){
        const projectId = clickedProject.parentElement.parentElement.getAttribute("data-id");
        displayTaskModal(projects, projectId);
    }
});

document.querySelector(".overlay").addEventListener("click", hideTaskModal);

//CLOSE TASK MODAL
// const closeTaskModal = document.querySelector(".close-task-modal");
// closeTaskModal.addEventListener("click", closeTaskModalOnly);

//CREATE NEW PROJECT
const createProjectBtn = document.querySelector(".create-project");
createProjectBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const projectInput = document.querySelector("#new-project");
    const projectName = projectInput.value.trim();
    if (!projectName) {
        projectInput.reportValidity();
        return;
    }

    const newProject = createProject(projectName);
    projects.push(newProject);

    renderProjectsCount(projects, projectCountSelector);
    renderProjectsSideBar(projects, projectListSidebarSelector);
    renderProjectsList(projects, projectsGridSelector);

    hideProjectModal();
})

document.querySelector(".task-modal").addEventListener("click", (e) => {
    e.stopPropagation();
});

//CREATE NEW TASK
const createTaskSubmit = document.querySelector(".create-task-submit");
const taskForm = document.querySelector(".task-modal form");
createTaskSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    const taskProject = document.querySelector(".project-select").value;
    const taskTitleInput = document.querySelector("#title");
    const taskTitle = taskTitleInput.value.trim();

    if(!taskTitle) {
        taskTitleInput.reportValidity();
        return;
    }

    const taskDescription = document.querySelector("#description").value.trim();
    const taskDate = document.querySelector("#due-date").value;
    const taskPriority = document.querySelector("#priority").value;
    console.log(taskProject, taskTitle, taskDescription, taskDate, taskPriority);

    for (const project of projects) {
        if (taskProject === project.getId()){
            const newTask = createTask(taskTitle, taskDescription, taskDate, taskPriority);
            project.tasks.push(newTask);
            break;
        }
    }

    const selectedId = getSelectedProjectId();
    renderProjectsList(projects, projectsGridSelector);

    if (selectedId) {
        displaySelectedProject(projects, selectedId);
    }

    taskForm.reset();

    if(projectIsShown()){
        closeTaskModalOnly();
    } else {
        hideTaskModal();
    }
})