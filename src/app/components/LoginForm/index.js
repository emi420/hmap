
import React from "react";
import styles from './styles';

const LoginForm = (props) => {
    const { onSubmit } = props;
    return (
        <div style={{...styles.container}}>
            <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    onSubmit(e.target.email.value, e.target.password.value); 
                }} 
                style={styles.form.container}>
                <div style={{...styles.form.inputs}}>
                    <input type="text" placeholder="Email" name="email" required/>
                    <input type="password" placeholder="Password" name="password" required/>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>);
}

export default LoginForm;