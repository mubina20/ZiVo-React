import React, { useState } from 'react'
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

export function EditProfile() {
    /** INITIALIZATIONS **/
    const [gender, setGender] = useState<string>('');
    const [file, setFile] = useState(verifiedMemberData.mb_profile_image ? `${serverApi}/${verifiedMemberData?.mb_profile_image}`  : "/icons/user.png");

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
			setFile(URL.createObjectURL(file));
		} catch (err) {
			console.log(`ERROR :: handleImagePreviewer, ${err}`);
			sweetErrorHandling(err).then();
		}
	};

    return (
        <div>
            <Header />
            <LeftSidebar />

            <div className="edit_page">
                <div className="edit_container">
                    <div className="my_profile_image_container">
                        <img 
                            src={file} 
                            alt="" 
                            className='my_profile_image_bg'
                        />
                        <img 
                            src={file} 
                            alt="" 
                            className='my_profile_image'
                        />
                        <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleImagePreviewer} className='profile_image_upload'/>

                    </div>
                    <div className="member_info">
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_name} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_surname} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_nick} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Phone Number / Email</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_phone ? verifiedMemberData.mb_phone : verifiedMemberData.mb_email} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_school} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_company} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_address} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_country} 
                            />
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <textarea 
                                className='information_textarea'
                                placeholder={verifiedMemberData.mb_hobby}
                            ></textarea>
                        </div>
                        <div className="information_container">
                            <span>Name</span>
                            <textarea 
                                className='information_textarea'
                                placeholder={verifiedMemberData.mb_description}
                            ></textarea>
                        </div>
                        <div className="information_container">
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
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unknown">Unknown</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}