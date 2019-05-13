import React from 'react';
import './toDoListStyle.css';
import Task from "./Task";


class TasksList extends React.Component {

    render() {
        return (
                <div className="tasksList">
                    <div className="tasks">
                        {
                            this.props.tasks.map((task,index) => {

                                return <Task task={task}
                                             updateCallBack={this.props.onUpdateTask}
                                             deleteCallBack={this.props.onDeleteTask}
                                             key={task.id}
                                             />
                            })
                        }
                    </div>
                </div>
        );
    }


}

export default TasksList;
