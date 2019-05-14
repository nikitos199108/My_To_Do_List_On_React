import './toDoListStyle.css';
import React from "react";

class Footer extends React.Component{

    constructor(props) {
        super(props);
        this.allRef = React.createRef();
        this.activeRef = React.createRef();
        this.completedRef = React.createRef();
    }

    handleFilterChanged1() {
        this.props.onFilterChanged(this.allRef.current.dataset.value);
    }

    handleFilterChanged2() {
        this.props.onFilterChanged(this.activeRef.current.dataset.value);
    }

    handleFilterChanged3() {
        this.props.onFilterChanged(this.completedRef.current.dataset.value);
    }

    render() {
        let {tasks, footerFilter} = this.props;
        return (

            <div className="footer">
                <div>
                    <span id="itemsLeft">{tasks.filter((t) => !t.isDone).length} items left</span>
                </div>
                <div className="buttons">
                    <button className= {footerFilter === "all" ? "selected" : ""}  data-value="all" ref={this.allRef} onClick={this.handleFilterChanged1.bind(this)}>All</button>
                    <button className={footerFilter === "active" ? "selected" : ""} data-value="active" ref={this.activeRef} onClick={this.handleFilterChanged2.bind(this)}>Active</button>
                    <button className={footerFilter === "completed" ? "selected" : ""} data-value="completed" ref={this.completedRef} onClick={this.handleFilterChanged3.bind(this)}>Completed</button>
                </div>
            </div>
        );
    }

}
export default Footer;