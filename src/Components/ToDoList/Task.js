import React from 'react';
import './toDoListStyle.css';


class Task extends React.Component {

    constructor(props) {
        super(props);

        this.parentDeleteCallBack = props.deleteCallBack;
        this.parentUpdateCallBack = props.updateCallBack;
    }

    deleteTask() {
        this.parentDeleteCallBack(this.props.task.id);
    }

    toggleTaskStatus() {

        let task = {...this.props.task};
        task.isDone = !this.props.task.isDone;
        this.parentUpdateCallBack(task);
    }

    render() {
        return (
            <div className={this.props.task.isDone ? 'task done' : 'task'}>
                <span className="title" onClick={this.toggleTaskStatus.bind(this)}>
                    {this.props.task.date}
                </span>
                <span className="title" onClick={this.toggleTaskStatus.bind(this)}>
                    {this.props.task.title}
                </span>
                <span className="delete" onClick={this.deleteTask.bind(this)}>X</span>
            </div>
        );
    }


}

export default Task;
