import React, { useState } from 'react';
import "../../../css/editProfile.css"
import { Header } from '../../components/header/header'
import { LeftSidebar } from '../../components/sidebars/left_sidebar'
import { verifiedMemberData } from '../../apiServices/verify'
import { serverApi } from '../../../lib/config'
import assert from 'assert'
import { Definer } from '../../../lib/definer'
import { sweetErrorHandling } from '../../../lib/sweetAlert'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileHeader } from '../../components/header/mobileHeader';
import { MobileFooter } from '../../components/footer/mobileFooter';

export function MobileEditProfile() {

    /** INITIALIZATIONS **/
    const [gender, setGender] = useState<string>('');
    // const [file, setFile] = useState(verifiedMemberData.mb_profile_image ? `${serverApi}/${verifiedMemberData?.mb_profile_image}`  : "/icons/user.png");
    const [file, setFile] = useState<File | null>(null);

    /** HANDLERS **/
    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value); // Foydalanuvchi tanlovini saqlash
    };
    
    const handleImagePreviewer = (e: any) => {
        try {
            console.log("handleImagePreviewer ::  e.target.files :: ", e.target.files);
            const file = e.target.files[0];

            const fileType = file.type;
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
            assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

            // memberUpdate.mb_image = file;
            // setMemberUpdate({ ...memberUpdate });
            // setFile(URL.createObjectURL(file));
        } catch (err) {
            console.log(`ERROR :: handleImagePreviewer, ${err}`);
            sweetErrorHandling(err).then();
        }
    };
    return (
        <div>
            <MobileHeader/>
            <MobileFooter/>
            <div className="edit_page" style={{height: "2100px"}}>
                <div className="edit_container">
                    <div className="my_profile_image_container">
                        <img 
                            src="https://img.freepik.com/free-photo/natures-beauty-captured-in-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1711497600&semt=ais"
                            alt="" 
                            className='my_profile_image_bg'
                        />
                        <img 
                            src="https://img.freepik.com/free-photo/natures-beauty-captured-in-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1711497600&semt=ais"
                            alt="" 
                            className='my_profile_image'
                        />
                        <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleImagePreviewer} className='profile_image_upload'/>

                    </div>
                    <div className="member_info" style={{display: "flex", flexDirection: "column", width: "100%"}}>
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_name} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Surname</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_surname} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Nickname</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_nick} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Phone Number / Email</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_phone ? verifiedMemberData.mb_phone : verifiedMemberData.mb_email} 
                            />
                        </div>
                        <div className="information_container">
                            <span>School</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_school} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Company</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_company} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Address</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_address} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Country</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                // placeholder={verifiedMemberData.mb_country} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Hobby</span>
                            <textarea 
                                className='information_textarea'
                                // placeholder={verifiedMemberData.mb_hobby}
                                rows={6}
                                style={{resize: "none"}}
                            ></textarea>
                        </div>
                        <div className="information_container">
                            <span>Description</span>
                            <textarea 
                                className='information_textarea'
                                // placeholder={verifiedMemberData.mb_description}
                                rows={6}
                                style={{resize: "none"}}
                            ></textarea>
                        </div>
                        <div className="information_container" style={{zIndex: "1"}}>
                            <span>Birhtday</span>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        name='mb_birthday'
                                        orientation="portrait"
                                        className='information_birthday'
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="information_container">
                            <label htmlFor="genderSelect">Gender</label>
                            <select id="genderSelect" value={gender} onChange={handleGenderChange}>
                                <option value="unknown">Unknown</option>    
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className='button'>
                            <button style={{width: "100%"}}>Complete editing</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}