import React, { Component } from 'react';
import { Checkbox, Card, FormControlLabel, TextField, Button, FormControl ,CardContent} from '@mui/material'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

class ChangePass extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             chnge:0
        }
    }
    
    changePassWord(){
        let arr = JSON.parse(localStorage.getItem('employee'));
        let pass = document.getElementById('password2').value;
        let pass1 = document.getElementById('password1').value;
        let pass2 = document.getElementById('password2').value;
        if(arr["password"]==pass){
            if(pass1 === pass2){
                arr["password"] = pass1
                localStorage.setItem('employee',JSON.stringify(arr));
                let id = arr["id"];
                axios.put(`http://localhost:3001/employee/${id}`, arr)
                alert("chnged succesful")
                this.setState({
                    chnge:1
                })
            }
            else{
                alert("check again")
            }
        }
        else{
            alert("Your Old Password is Incorrect")
        }

    }
    render() {
        if(this.state.chnge==1){
            return <Redirect to="/" />
        }
        return (
            <>
            <NavBar/>
            <Card sx={{ width:'55ch' ,mx:"auto",mt:'7rem'}}> 
            <CardContent>       
                <h1 style={{"color":'navy',"fontFamily":"bolder" , textAlign: 'center'}}>Login Page</h1>
                <FormControl sx={{m:1, width:'50ch'}}>
                    <TextField
                        helperText="Please enter your old password"
                        id="password"
                        label="Old Password"/> 
                    <TextField
                        helperText="Please enter your new password"
                        id="password1"
                        label="New Password"/> 
                    <TextField
                        helperText="Please recheck your new password"
                        id="password2"
                        label="Conform Password2"/> 
                <br/> 
                    <FormControlLabel control={<Checkbox defaultUnChecked />} label="Remember Me" /> <br/>
                    <Button variant="contained" onClick={()=>this.changePassWord()}>Login</Button>
                </FormControl>
            </CardContent>
        </Card>
        </>
        );
    }
}

export default ChangePass;