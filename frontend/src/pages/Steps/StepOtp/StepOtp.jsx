import React, { useState } from 'react';
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
 import OtpInput from 'react-otp-input';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import {Redirect } from 'react-router-dom';
import { sendOtp } from '../../../http/index';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StepOtp = () => {
    const [otp, setOtp] = useState('');
    const theme = useTheme();
    const history = useHistory();
    const [error, setError] = useState("");
   
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
const { phone, hash } = useSelector((state) => state.auth.otp);
    
    async function resubmit() {
        
        const { data } = await sendOtp({phone : phone})
          console.log(data);
        // dispatch(setOtp({ phone: data.phone, hash: data.hash}));
           
       }
    async function submit() {
        try {
            const { data } = await verifyOtp({ otp, phone, hash });
            dispatch(setAuth(data));
            if(data.auth===true){
                history.push("/activate")
            }
            

        } catch (err) {
            console.log(err);
            setError("Invalid OTP")
        }
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

 
    return (
        
           
    <>    
        <div className='loginPage'>
                <div className='otpPage'>
                 <img src="/images/undraw_confirmed_81ex.svg" alt={"undraw text"} className="undrawImage" /> 
                    <p style={{ fontSize: "20px" }}>Please verify mobile number</p>
                    {error && <h4 style={{ color: "red" }}>{error}</h4>}
                    <p style={{ fontSize: "16px" }}>An OTP is send to <strong>{phone}</strong></p>
                    <p style={{ fontSize: "16px" }}>Didn't receive the code?<span style={{ marginLeft: "12px", color: "#F7B348", cursor: "pointer" }} onClick={() => {window.location.reload(false)}}>Change Number</span></p>
                    <OtpInput
                        value={otp}
                        onChange={(val)=>{setOtp(val)}}
                        numInputs={4}
                        separator={<span>{"  "}-</span>}
                    />
                    <p style={{ fontSize: "16px" }}>Didn't receive the code?<span style={{ marginLeft: "12px", color: "#F7B348", cursor: "pointer" }} onClick={() => {setOpen(true); resubmit()}}>Resend</span></p>
                    <Button onClick={submit} variant="contained" style={{ backgroundColor: "#F7B348", borderRadius: "100px" }}>Verify</Button>
                </div></div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="warning" sx={{ width: '40%' }}>
                    OTP resent successfully!
                </Alert>
            </Snackbar>
            </>
     
        
    );
};

export default StepOtp;
