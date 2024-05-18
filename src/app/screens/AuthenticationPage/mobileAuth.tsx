import { Box, Modal, Stack, TextField } from '@mui/material';
import assert from 'assert';
import { Definer } from '../../../lib/definer';
import MemberApiService from '../../apiServices/memberApiService';
import { sweetErrorHandling } from '../../../lib/sweetAlert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { parse } from 'date-fns';

import "../../../css/auth.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function MobileAuth(props: any) {
    // INITIALIZATIONS 
    let mb_nick: string = "",
        mb_name: string = "",
        mb_surname: string = "",
        mb_birthday: Date | null = null,

        mb_gender: string = "",
        mb_email: string = "",
        mb_phone: string = "",
        mb_password: string = "";

        const { open, handleOpenModal, handleModalClose } = props;
        const [selectedDate, setSelectedDate] = useState<Date | null>(null);
        const [name, setName] = useState("");
        const [nick, SetNick] = useState("");
        const [surname, setSurname] = useState("");
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");


        const [gender, setGender] = useState('');
    
    // HANDLERS 
    const handleUsername = (e: any) => {
        mb_name = e.target.value;
        setName(mb_name);
    };

    const handleUserSurname = (e: any) => {
        mb_surname = e.target.value;
        setSurname(mb_surname);
    };

    const handleUserNickName = (e: any) => {
        mb_nick = e.target.value;
        SetNick(mb_nick);
    };

    const handleUserEmail = (e: any) => {
        mb_email = e.target.value;
        setEmail(mb_email);
    };

    const handleUserPhone = (e: any) => {
        mb_phone = e.target.value;
        setPhone(mb_phone);
    };

    const handleUserPassword = (e: any) => {
        mb_password = e.target.value;
        setPassword(mb_password);
    };

    const handleLoginRequest = async () => {
        try {
            const is_fulfilled = nick != "" && password != "";
            assert.ok(is_fulfilled, Definer.input_err1);

            const login_data = {
                mb_nick: nick,
                mb_password: password,
            };

            const memberApiService = new MemberApiService();
            await memberApiService.loginRequest(login_data);

            window.location.reload();
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const handleSignupRequest = async () => {
        try {
            // Barcha inputlarni tekshiramiz
            const is_phone_or_email_filled = (phone != "" && email == "") || (phone == "" && email != "");
            const is_other_fields_filled = nick != "" && 
                                        name != "" && 
                                        surname != "" && 
                                        password != "" && 
                                        gender != "" && 
                                        selectedDate != new Date(0); 
    
            assert.ok(is_phone_or_email_filled && is_other_fields_filled, Definer.input_err1);
    
            const signup_data = {
                mb_nick: nick,
                mb_name: name,
                mb_surname: surname,
                mb_password: password,
                mb_gender: gender,
                mb_phone: phone,
                mb_email: email,
                mb_birthday: selectedDate, 
            };
    
            const memberApiService = new MemberApiService();
            await memberApiService.signupRequest(signup_data);
    
            window.location.reload();
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const handleUserBirthday = (date: Date | null) => {
        setSelectedDate(date);
        mb_birthday = date;
    };
    

    const handleUserGender = (e: any) => {
        mb_gender = e.target.value;
        setGender(mb_gender);
    };

    return (
        <div>
            <div className="auth_page">
                <div className="auth_page_container" style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: "none", flexDirection: "column"}}>
                    <div className="auth-top-container">
                        <h1 style={{color: 'white', borderBottom: "1px solid #f71661", marginBottom: "50px"}}>Welcome to ZIVO!</h1>
                    </div>
                    <div className="auth_left_container">
                        <div className='login-box'>
                        <h2>Login</h2>
                            <div className='form'>
                                <div className="user-box">
                                    <input onChange={handleUserNickName} type="text" name="mb_nick" required />
                                    <label>NickName</label>
                                </div>
                                <div className="user-box">
                                    <input onChange={handleUserPassword} type="password" name="mb_password" required />
                                    <label>Password</label>
                                </div>
                                <Box className='button' style={{display: "flex", justifyContent: "center"}} height={"40px"}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <input onClick={handleLoginRequest} className="btn" type="submit" value="Login"/>
                                </Box>
                                <div className="auth_buttons">
                                    <p>Don't have an account?</p>
                                    <div className='signup_btn' onClick={handleOpenModal}>Signup</div>
                                </div>
                            </div>
                            
                        </div>
                        <Modal
                            className="signup_container"
                            open={open}
                            onClose={handleModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            style={{width: "100%",height: "100%", overflow: "scroll", border: "none"}}
                        >
                            <div className="signup">
                                <div className="signup_closing" style={{width: "100%"}}>
                                    <span>Signup</span>
                                    <img src="/icons/other/close.png" alt="" onClick={handleModalClose} className="signup_close"/>
                                </div>
                                
                                <div className="signup_input_container">
                                    <input type="text" placeholder='Name' onChange={handleUsername} name='mb_name' className='signup_input'/>
                                </div>
                                <div className="signup_input_container">
                                    <input type="text" placeholder='Surname' onChange={handleUserSurname} name='mb_surname' className='signup_input'/>
                                </div>
                                <div className="signup_input_container check_container">
                                    <input type="text" placeholder='Nickname' onChange={handleUserNickName} name='mb_nick' className='signup_input'/>
                                    <button className='duplicate_check'>Duplicate check</button>
                                </div>
                                <div className="signup_input_container">
                                    <input type="password" placeholder='Password' onChange={handleUserPassword} name='mb_password' className='signup_input'/>
                                </div>
                                
                                <div className="or_container">
                                    <p style={{margin: "20px 0 10px 0"}}>Enter Email or Phone number</p>
                                    <div className="or">
                                        <div className="or_signup_input_container">
                                            <input type="text" placeholder='Email' onChange={handleUserEmail} name='mb_email' className='signup_input'/>
                                        </div>
                                        <div className="or_signup_input_container">
                                            <input type="text" placeholder='Phone number' onChange={handleUserPhone} name='mb_phone' className='signup_input'/>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className="signup_input_container">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker 
                                                className='date_picker'
                                                value={selectedDate} // Tanlangan sanani ko'rsatish
                                                onChange={handleUserBirthday} // O'zgarishlarni qabul qiluvchi funksiya
                                                name='mb_birthday'
                                                // renderInput={(props: any) => <TextField {...props} />}
                                                orientation="portrait"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>

                                </div>
                                <div className="signup_input_container signup_radio_container">
                                    <label className='signup_radio'>
                                        <input
                                            type="radio"
                                            value="FEMALE"
                                            checked={gender === 'FEMALE'}
                                            onChange={handleUserGender}
                                            name='mb_gender'
                                            style={{marginRight: "7px"}}
                                        />
                                        Female
                                    </label>
                                    <br />
                                    <label className='signup_radio'>
                                        <input
                                            type="radio"
                                            value="MALE"
                                            checked={gender === 'MALE'}
                                            onChange={handleUserGender}
                                            name='mb_gender'
                                            style={{marginRight: "7px"}}
                                        />
                                        Male
                                    </label>
                                    <br />
                                    <label className='signup_radio'>
                                        <input
                                            type="radio"
                                            value="UNKNOWN"
                                            checked={gender === 'UNKNOWN'}
                                            onChange={handleUserGender}
                                            name='mb_gender'
                                            style={{marginRight: "7px"}}
                                        />
                                        Unknown
                                    </label>
                                </div>
                                <button className='signup_button' onClick={handleSignupRequest} style={{marginBottom: "50px"}}>Signup</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            
        </div>
    )
}