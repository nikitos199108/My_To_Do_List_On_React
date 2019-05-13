import React from 'react';
import './toDoListStyle.css';
import Footer from "./Footer";
import AddTask from "./AddTask";
import TasksList from "./TasksList";


class ToDoList extends React.Component {

    constructor() {

        super();

        //localStorage.clear();
            if(localStorage.getItem("locState")) {
                this.state = JSON.parse(localStorage.getItem("locState"))
            }else{
                this.state = {
                    tasks: [],
                    baseArr: [],
                    newIndex: 0,
                    filter: "",
                    filterValue: "",
                    sortText: false,
                    sortDate: false,
                };
            }

    }

    toStore() {
        localStorage.setItem("locState", JSON.stringify(this.state));
    }

    createNewTask(task) {

        let index = this.state.newIndex;

        if(this.state.baseArr.length !== 0) {
            this.reset();

            this.setState({
                tasks: [...this.state.baseArr, task], newIndex: (index+1),
            });

        }else{
            this.setState({
                tasks: [...this.state.tasks, task], newIndex: (index+1),
            });

        }

    }

    changeTextFilter(headerFilterValue) {

        let baseArr = [...this.state.tasks];

        if (!this.state.sortText) {
            let sortTextUp = [...this.state.tasks];
            sortTextUp.sort(function (a, b) {
                let taskA = a.title.toLowerCase();
                let taskB = b.title.toLowerCase();
                if (taskA < taskB) {
                    return -1;
                }
                if (taskA > taskB) {
                    return 1;
                }
                return 0;
            });
            if(this.state.filter === "sortText" || this.state.filter === "sortDate"){
                this.setState({filter: headerFilterValue, sortText: true, tasks: sortTextUp});
            }else {
                this.setState({filter: headerFilterValue, sortText: true, tasks: sortTextUp, baseArr: baseArr});
            }

        } else if (this.state.sortText) {
            let sortTextDown = [...this.state.tasks];
            sortTextDown.sort(function (a, b) {
                let taskA = a.title.toLowerCase();
                let taskB = b.title.toLowerCase();
                if (taskA > taskB) {
                    return -1;
                }
                if (taskA < taskB) {
                    return 1;
                }
                return 0;
            });
            if(this.state.filter === "sortText" || this.state.filter === "sortDate"){
                this.setState({filter: headerFilterValue, sortText: false, tasks: sortTextDown});
            }else {
                this.setState({filter: headerFilterValue, sortText: false, tasks: sortTextDown, baseArr: baseArr});
            }

        }

    };

    changeDateFilter(headerFilterValue) {

        let baseArr = [...this.state.tasks];

        if (!this.state.sortDate) {
            let sortDateUp = [...this.state.tasks];
            sortDateUp.sort(function (a, b) {
                let dateA = new Date(a.parseDate);
                let dateB = new Date(b.parseDate);

                return dateA-dateB;

            });
            if(this.state.filter === "sortDate" || this.state.filter === "sortText"){
                this.setState({filter: headerFilterValue, sortDate: true, tasks: sortDateUp});
            }else {
                this.setState({filter: headerFilterValue, sortDate: true, tasks: sortDateUp, baseArr: baseArr});
            }

        } else if (this.state.sortDate) {
            let sortDateDown = [...this.state.tasks];
            sortDateDown.sort(function (a, b) {
                let dateA = new Date(a.parseDate);
                let dateB = new Date(b.parseDate);

                return dateB-dateA;
            });
            if(this.state.filter === "sortDate" || this.state.filter === "sortText"){
                this.setState({filter: headerFilterValue, sortDate: false, tasks: sortDateDown});
            }else {
                this.setState({filter: headerFilterValue, sortDate: false, tasks: sortDateDown, baseArr: baseArr});
            }

        }

    };

    changeFooterFilter(footerFilterValue) {
        this.setState({filter: footerFilterValue});
    }

    taskFilter(taskFilterValue, value) {
        this.setState({filter: taskFilterValue, filterValue: value});
    }

    deleteTask(taskId) {

        if(this.state.baseArr.length !== 0) {
            this.reset();

            let newTaskList = this.state.baseArr.filter((t) => {
                return t.id !== taskId;
            });
            this.setState({
                tasks: newTaskList
            });

        }else{
            let newTaskList = this.state.tasks.filter((t) => {
                return t.id !== taskId;
            });
            this.setState({
                tasks: newTaskList
            });
        }
    }

    reset() {
        if(this.state.baseArr.length !== 0){
            this.setState({filter: "", sortText: false, sortDate: false, tasks: [...this.state.baseArr], baseArr: []});
        }
    }

    updateTask(task) {

        let newTaskList = [...this.state.tasks];

        newTaskList.forEach((t) => {
            if (t.id === task.id) {
                t.isDone = task.isDone;
                return;
            }
        });

        this.setState({
            tasks: newTaskList
        });
    }

    render() {

        let {tasks, filter, filterValue} = this.state;
        let filteredTasks = [];

        if (filter === "") filteredTasks = tasks;
        if (filter === "all") filteredTasks = tasks;
        if (filter === "active") filteredTasks = tasks.filter(t => !t.isDone);
        if (filter === "completed") filteredTasks = tasks.filter(t => t.isDone);
        if (filter === "taskFilter") filteredTasks = tasks.filter(t =>
            ((~t.title.indexOf(filterValue)) || (~t.date.indexOf(filterValue))));
        if (filter === "sortText") filteredTasks = tasks;
        if (filter === "sortDate") filteredTasks = tasks;

        this.toStore();

        return (
            <div className="toDoList">
                <AddTask onCreate={this.createNewTask.bind(this)}
                         onTextFiltered={this.changeTextFilter.bind(this)}
                         onDateFiltered={this.changeDateFilter.bind(this)}
                         onReset={this.reset.bind(this)}
                         onFilter={this.taskFilter.bind(this)}
                         newIndex={this.state.newIndex}/>

                <TasksList tasks={filteredTasks}
                           onUpdateTask={this.updateTask.bind(this)}
                           onDeleteTask={this.deleteTask.bind(this)}/>

                <Footer tasks={tasks} footerFilter={filter}
                        onFilterChanged={this.changeFooterFilter.bind(this)}/>
            </div>
        );
    }
}

export default ToDoList;










