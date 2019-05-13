import './toDoListStyle.css';
import React from "react";

class Footer extends React.Component{

    handleFilterChanged(e) {

        this.props.onFilterChanged(e.currentTarget.dataset.value);

    }

    render() {
        let {tasks, footerFilter} = this.props;
        return (

            <div className="footer">
                <div>
                    <span id="itemsLeft">{tasks.filter((t) => !t.isDone).length} items left</span>
                </div>
                <div className="buttons">
                    <button className= {footerFilter === "all" ? "selected" : ""}  data-value="all" onClick={this.handleFilterChanged.bind(this)}>All</button>
                    <button className={footerFilter === "active" ? "selected" : ""} data-value="active" onClick={this.handleFilterChanged.bind(this)}>Active</button>
                    <button className={footerFilter === "completed" ? "selected" : ""} data-value="completed" onClick={this.handleFilterChanged.bind(this)}>Completed</button>
                </div>
            </div>
        );
    }

}
export default Footer;