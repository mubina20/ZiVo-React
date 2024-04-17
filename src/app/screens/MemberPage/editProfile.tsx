import React, { useState } from 'react'
import "../../../css/editProfile.css"
import { Header } from '../../components/header/header'
import { LeftSidebar } from '../../components/sidebars/left_sidebar'
import { verifiedMemberData } from '../../apiServices/verify'
import { serverApi } from '../../../lib/config'
import assert from 'assert'
import { Definer } from '../../../lib/definer'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert'
import { MemberUpdateData } from '../../../types/user'
import MemberApiService from '../../apiServices/memberApiService'

export function EditProfile() {
    /** INITIALIZATIONS **/
    const [file, setFile] = useState(verifiedMemberData.mb_profile_image ? `${serverApi}/${verifiedMemberData?.mb_profile_image}`  : "/icons/user.png");
    const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
        mb_name: "",
		mb_surname: "",
		mb_country: "",
		mb_school: "",
		mb_hobby: "",
		mb_description: "",
		mb_profile_image: ""
	});

    /** HANDLERS **/
    const changeMemberNameHandler = (e: any) => {
		memberUpdate.mb_name = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};
    const changeMemberSurnameHandler = (e: any) => {
		memberUpdate.mb_surname = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};
    const changeMemberCountryHandler = (e: any) => {
		memberUpdate.mb_country = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};
    const changeMemberSchoolHandler = (e: any) => {
		memberUpdate.mb_school = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};
    const changeMemberHobbyHandler = (e: any) => {
		memberUpdate.mb_hobby = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};
    const changeMemberDescriptionHandler = (e: any) => {
		memberUpdate.mb_description = e.target.value;
		setMemberUpdate({ ...memberUpdate });
	};

    const handleImagePreviewer = (e: any) => {
		try {
			console.log("handleImagePreviewer ::  e.target.files :: ", e.target.files);
			const file = e.target.files[0];

			const fileType = file.type;
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
			assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

			memberUpdate.mb_profile_image = file;
			setMemberUpdate({ ...memberUpdate });
			setFile(URL.createObjectURL(file));
		} catch (err) {
			console.log(`ERROR :: handleImagePreviewer, ${err}`);
			sweetErrorHandling(err).then();
		}
	};

    const handleSubmitButton = async () => {
		try {
			const memberService = new MemberApiService();
			const result = await memberService.updateMemberData(memberUpdate);
            console.log("memberUpdate::", memberUpdate);

			assert.ok(result, Definer.general_err1);
			await sweetTopSmallSuccessAlert('Information modified successfully!', 700, false);
    		window.location.href = '/my-page';
		} catch (err) {
			console.log(`ERROR ::: handleImagePreviewer, ${err}`);
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
                            src={file ? file : `${serverApi}verifiedMemberData.mb_profile_image`}
                            alt="" 
                            className='my_profile_image_bg'
                        />
                        <img 
                            src={file ? file : `${serverApi}verifiedMemberData.mb_profile_image`}
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
                                onChange={changeMemberNameHandler}
                            />
                        </div>
                        <div className="information_container">
                            <span>Surname</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_surname} 
                                onChange={changeMemberSurnameHandler}
                            />
                        </div>
                        <div className="information_container">
                            <span>Country</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_country} 
                                onChange={changeMemberCountryHandler}
                            />
                        </div>
                        <div className="information_container">
                            <span>School</span>
                            <input 
                                type="text" 
                                className='member_info_input' 
                                placeholder={verifiedMemberData.mb_school} 
                                onChange={changeMemberSchoolHandler}
                            />
                        </div> 
                        <div className="information_container">
                            <span>Hobby</span>
                            <textarea 
                                className='information_textarea'
                                placeholder={verifiedMemberData.mb_hobby}
                                onChange={changeMemberHobbyHandler}
                                rows={6}
                                style={{resize: "none"}}
                            ></textarea>
                        </div>
                        <div className="information_container">
                            <span>Description</span>
                            <textarea 
                                className='information_textarea'
                                placeholder={verifiedMemberData.mb_description}
                                onChange={changeMemberDescriptionHandler}
                                rows={6}
                                style={{resize: "none"}}
                            ></textarea>
                        </div>                        
                    </div>
                    <div className='button'>
                            <button onClick={handleSubmitButton}>Complete editing</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}