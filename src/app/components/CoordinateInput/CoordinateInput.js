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
                <input onChange={this.textChangeHandler} value={this.props.value || this.state.textValue} type="text" className="CoordinateInput" />
            </form>
        )
    }
}

export default CoordinateInput;
