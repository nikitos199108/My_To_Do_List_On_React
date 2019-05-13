import React from 'react';
import './Calculator.css';


class Calculator extends React.Component {

    constructor() {
        super();
        this.state = {
            result: 0,
            number1: 10,
            number2: 7,
            operation: "+"
        };
        this.showResult = this.showResult.bind(this);
        this.handleNumber1Change = this.handleNumber1Change.bind(this);
        this.handleNumber2Change = this.handleNumber2Change.bind(this);
        this.handleOperationChange = this.handleOperationChange.bind(this);
    }

    showResult() {
        switch (this.state.operation) {
            case "+":
                this.setState({result: this.state.number1 + this.state.number2});
                break;
            case  "-":
                this.setState({result: this.state.number1 - this.state.number2});
                break;
            default:
                break;
        }

    };

    handleNumber1Change(e) {
        this.setState({number1: +e.currentTarget.value});
    };

    handleNumber2Change(e) {
        this.setState({number2: +e.currentTarget.value});
    };

    handleOperationChange(e) {
        this.setState({operation: e.currentTarget.value});
    };

    render() {
        return (
            <div className="calculator">
                <div>
                    <input value={this.state.number1} onChange={this.handleNumber1Change}/>
                    <div>
                        <select name="" id="" onChange={this.handleOperationChange}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                        </select>
                    </div>
                    <input value={this.state.number2} onChange={this.handleNumber2Change}/>
                </div>
                <div>
                    <button onClick={this.showResult}>Get result</button>
                </div>
                <div>
                    Result: <span>{this.state.result}</span>
                </div>
            </div>
        );
    }

}

export default Calculator;
