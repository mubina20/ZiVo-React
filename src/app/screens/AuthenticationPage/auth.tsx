import { Box, Modal } from '@mui/material';
import assert from 'assert';
import { Definer } from '../../../lib/definer';
import MemberApiService from '../../apiServices/memberApiService';
import { sweetErrorHandling } from '../../../lib/sweetAlert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "../../../css/auth.css"
import { Link } from 'react-router-dom';

export function AuthenticationPage(props: any) {
    // INITIALIZATIONS 
    let mb_nick: string = "",
        mb_name: string = "",
        mb_surname: string = "",
        mb_birthday: string = "",
        mb_gender: string = "",
        mb_email: string = "",
        mb_type: string = "",
        mb_phone: number = 0,
        mb_password: string = "";

        const { open, handleOpenModal, handleModalClose } = props;
    
    // HANDLERS 
    const handleUsername = (e: any) => {
        mb_name = e.target.value;
    };

    const handleUserSurname = (e: any) => {
        mb_surname = e.target.value;
    };

    const handleUserNickName = (e: any) => {
        mb_nick = e.target.value;
    };

    const handleUserBirthday = (e: any) => {
        mb_birthday = e.target.value;
    };

    const handleUserGender = (e: any) => {
        mb_gender = e.target.value;
    };

    const handleUserEmail = (e: any) => {
        mb_email = e.target.value;
    };

    const handleUserType = (e: any) => {
        mb_type = e.target.value;
    };

    const handleUserPhone = (e: any) => {
        mb_phone = e.target.value;
    };

    const handleUserPassword = (e: any) => {
        mb_password = e.target.value;
    };

    const handleLoginRequest = async () => {
        try {
            const is_fulfilled = mb_nick != "" && mb_password != "";
            assert.ok(is_fulfilled, Definer.input_err1);

            const login_data = {
                mb_nick: mb_nick,
                mb_password: mb_password,
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
            const is_phone_or_email_filled = (mb_phone !== 0 && mb_email === "") || (mb_phone === 0 && mb_email !== "");
            const is_other_fields_filled = mb_nick !== "" && 
                                        mb_name !== "" && 
                                        mb_surname !== "" && 
                                        mb_password !== "" && 
                                        mb_gender !== "" && 
                                        mb_birthday !== "" && 
                                        mb_type !== "";
            assert.ok(is_phone_or_email_filled && is_other_fields_filled, Definer.input_err1);
    
            const signup_data = {
                mb_nick: mb_nick,
                mb_name: mb_name,
                mb_surname: mb_surname,
                mb_password: mb_password,
                mb_gender: mb_gender,
                mb_phone: mb_phone,
                mb_email: mb_email,
                mb_birthday: mb_birthday,
            };
    
            const memberApiService = new MemberApiService();
            await memberApiService.signupRequest(signup_data);
    
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div>
            <div className='zivo'>
                <Link to={"/"} href="/admin">
                    <span>Z</span>
                    I
                    <span>V</span>
                    O
                </Link>
            </div>

            <div className="home_contaner">
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
                        <Box className='button'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <input onClick={handleLoginRequest} className="btn" type="submit" value="Login" />
                        </Box>
                        <button onClick={handleOpenModal}>Opennnnnn</button>
                    </div>
                </div>
                <Modal
                    className="signup_container"
                    open={open}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="signup">
                        <div className="signup_closing">
                            <span>Signup</span>
                            <img src="/icons/other/close.png" alt="" onClick={handleModalClose} className="signup_close"/>
                        </div>
                        <div className="birthday_container">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker className='abb'/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        
                    </div>
                </Modal>
            </div>
        </div>
    )
}