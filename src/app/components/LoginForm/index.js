
import React from "react";
import styles from './styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginForm = (props) => {
    const { open, setOpen } = props;
    const handleClose = () => setOpen(false);
    const { onSubmit } = props;
    return (
        <Modal
            // Known issue TODO: the email field focused is not working as expected within the modal parent. 
            // Spent like 15m on it but couldn't find a proper workaround it.
            // disableAutoFocus
            disableEnforceFocus
            open={open}
            onClose={handleClose}
        >
            <Box sx={styles.container}>

                <form onSubmit={(e) => { 
                        e.preventDefault(); 
                        onSubmit(e.target.email.value, e.target.password.value); 
                    }} 
                    style={styles.form.container}>
                    <div style={{...styles.form.inputs}}>
                        <TextField focused label="Email" id="email" name="email" required />   
                        <TextField label="Password" type="password" id="password" name="password"  required />
                        <Button type="submit">Login</Button>
                    </div>
                </form>
            </Box>
        </Modal>);
}

export default LoginForm;