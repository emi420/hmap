import React, { PureComponent } from 'react';
import './CoordinateInput.css';

class CoordinateInput extends PureComponent {

    state = {
        textValue: ""
    }
    
    submitHandler = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.textValue);
    }

    textChangeHandler = (e) => {
        this.setState({
            textValue: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input placeholder="-64.10021 -31.0649" onChange={this.textChangeHandler} value={this.state.textValue || this.props.value} type="text" className="CoordinateInput" />
            </form>
        )
    }
}

export default CoordinateInput;
