// // import { ChangeEvent, useState } from "react";
// // import "../../../css/upload.css";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { FreeMode, Navigation, Thumbs } from "swiper";

// // export function UploadPhotoPost(props: any) {
// //     const [imageFiles, setImageFiles] = useState<File[]>([]);

// //     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
// //         const files = e.target.files;
// //         if (files) {
// //             const newFiles = Array.from(files);
// //             setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
// //         }
// //     };

// //     return (
// //         <div className="upload_post_bottom">
// //             <h3>Upload Photo Post</h3>
// //             <div className="photo_panel_container">
// //                 <div className="photo_panel_left">
// //                     <textarea
// //                         placeholder="Post title"
// //                         className="post_title_textarea"
// //                     ></textarea>
// //                     <div className="buttons">
// //                         <button className="upload_button cencel">Cencel</button>
// //                         <button className="upload_button">Post</button>
// //                     </div>
// //                 </div>
// //                 <div className="photo_panel_right">
// //                     <div className="upload_image_box">
// //                         <div className="photos">
// //                             <Swiper
// //                                 className=""
// //                                 // loop={true}
// //                                 slidesPerView={3}
// //                                 // spaceBetween={20}
// //                                 pagination={{
// //                                 clickable: true,
// //                                 }}
// //                                 modules={[FreeMode, Navigation, Thumbs]}
// //                             >
// //                                 {imageFiles.length > 0 ? (
// //                                     imageFiles.map((imageFile, index) => (
// //                                         <SwiperSlide className="swiper_slide" key={index}>
// //                                             <img src={URL.createObjectURL(imageFile)} alt="" className="uploaded_image" />
// //                                         </SwiperSlide>
// //                                     ))
// //                                 ) : (
// //                                     <div>No images uploaded</div>
// //                                 )}
// //                             </Swiper>
// //                         </div>
// //                         <div className="file_input">
// //                             <span>Add Photo</span>
// //                             <input type="file" onChange={handleChange} className="Upload_file" multiple />
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }



// import React, { ChangeEvent, useState } from "react";
// import "../../../css/upload.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Navigation, Thumbs } from "swiper";

// export function UploadPhotoPost(props: any) {
//     const [imageFiles, setImageFiles] = useState<File[]>([]);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files) {
//             const newFiles = Array.from(files);
//             setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
//         }
//     };

//     return (
//         <div className="upload_post_bottom">
//             <h3>Upload Photo Post</h3>
//             <div className="photo_panel_container">
//                 <div className="photo_panel_left">
//                     <textarea
//                         placeholder="Post title"
//                         className="post_title_textarea"
//                     ></textarea>
//                     <div className="buttons">
//                         <button className="upload_button cencel">Cencel</button>
//                         <button className="upload_button">Post</button>
//                     </div>
//                 </div>
//                 <div className="photo_panel_right">
//                     <div className="upload_image_box">
//                         <div className="photos">
//                             {imageFiles.length > 0 ? (
//                                 imageFiles.map((imageFile) => (
//                                         <img src={URL.createObjectURL(imageFile)} alt="" className="uploaded_image"
//                                         />
//                                 ))
//                             ) : (
//                                 <div>No images uploaded</div>
//                             )}
//                         </div>

//                         <div className="file_input">
//                             <span>Add Photo</span>
//                             <input type="file" onChange={handleChange} className="Upload_file" multiple />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { ChangeEvent, useState } from "react";
import "../../../css/upload.css";

export function UploadPhotoPost(props: any) {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // Tanlangan rasm manzili

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const handleImageClick = (image: string) => {
        setSelectedImage(image); // Rasmga bosganda manzilni saqlash
    };

    return (
        <div className="upload_post_bottom">
            <h3>Upload Photo Post</h3>
            <div className="photo_panel_container">
                <div className="photo_panel_left">
                    <textarea
                        placeholder="Post title"
                        className="post_title_textarea"
                    ></textarea>
                    <div className="buttons">
                        <button className="upload_button cencel">Cencel</button>
                        <button className="upload_button">Post</button>
                    </div>
                </div>
                <div className="photo_panel_right">
                    <div className="upload_image_box">
                        <div className="photos">
                            {imageFiles.length > 0 ? (
                                imageFiles.map((imageFile, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(imageFile)}
                                        alt=""
                                        className={`uploaded_image ${selectedImage === URL.createObjectURL(imageFile) ? "selected" : ""}`}
                                        onClick={() => handleImageClick(URL.createObjectURL(imageFile))}
                                    />
                                ))
                            ) : (
                                <div>No images uploaded</div>
                            )}
                        </div>
                        <div className="file_input">
                            <span>Add Photo</span>
                            <input type="file" onChange={handleChange} className="Upload_file" multiple />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



