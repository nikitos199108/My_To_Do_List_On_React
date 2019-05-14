import React from 'react';
import './toDoListStyle.css';


class AddTask extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            toDoValue: "",
            toDoDate: "",
            parseDate: "",

        };

        this.sortTextRef = React.createRef();
        this.sortDateRef = React.createRef();
        this.taskFilterRef = React.createRef();
        this.dateRef = React.createRef();
    }

    createNewTask() {


        if (this.state.toDoValue.length !== 0 && this.state.toDoDate.length !== 0 && this.state.toDoDate.toString() !== "NaN.NaN.NaN") {
            let newTask = {
                title: this.state.toDoValue,
                isDone: false,
                id: this.props.newIndex,
                date: this.state.toDoDate,
                parseDate: this.state.parseDate,
            };

            this.setState({toDoValue: ""});

            this.props.onCreate(newTask);

        }
    }

    toDoDateChange() {

        let date;
        let dateValue = this.dateRef.current.value;
        let parseDate = Date.parse(dateValue);
        let dateFunc = new Date(parseDate);;

            let day = dateFunc.getDate();
            if (day < 10) {
                day = '0' + day;
            }

            let month = dateFunc.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }

            let year = dateFunc.getFullYear();

            date = day + '.' + month + '.' + year;

        this.setState({toDoDate: date, parseDate: parseDate});
    }

    toDoValueChange(e) {
        this.setState({toDoValue: e.currentTarget.value});
    }

    handleTextSortChanged() {
        this.props.onTextFiltered(this.sortTextRef.current.dataset.value);
    }

    handleDateSortChanged() {
        this.props.onDateFiltered(this.sortDateRef.current.dataset.value);
    }

    handleTaskFilter() {
        this.props.onFilter(this.taskFilterRef.current.dataset.value, this.taskFilterRef.current.value);
    }


    render() {
        return (
                <div className="header">
                    <input id="inputText" value={this.state.toDoValue}
                           onChange={this.toDoValueChange.bind(this)}/>
                    <input type="date" id="date" ref={this.dateRef}
                           onChange={this.toDoDateChange.bind(this)}/>
                    <button id="addButton" className="btn"
                            onClick={this.createNewTask.bind(this)}>Add task!</button>
                    <input type="text" className="sort" id="search" data-value="taskFilter"
                           ref={this.taskFilterRef}
                           onChange={this.handleTaskFilter.bind(this)}/>
                    <input type="button" value="SortText" className="btn" id="SortText" data-value="sortText"
                           ref={this.sortTextRef} onClick={this.handleTextSortChanged.bind(this)}/>
                    <input type="button" value="SortDate" className="btn" id="SortDate" data-value="sortDate"
                           ref={this.sortDateRef} onClick={this.handleDateSortChanged.bind(this)}/>
                    <input type="button" value="Reset" className="btn" id="Reset"
                           onClick={this.props.onReset}/>
                </div>

        );
    }


}

export default AddTask;
