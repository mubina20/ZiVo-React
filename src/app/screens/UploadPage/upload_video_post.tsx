// import React, { ChangeEvent, useState } from "react";
// import "../../../css/upload.css";

// export function UploadVideoPost(props: any) {
//     const [videoFile, setVideoFile] = useState<File | null>(null);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files && e.target.files[0];
//         if (file) {
//             setVideoFile(file);
//         }
//     };

//     return (
//         <div className="upload_post_bottom">
//             <h3>Upload Video Post</h3>
//             <h2>Add Video:</h2>
//             <div className="upload_image_box">
//                 {videoFile && (
//                     <video controls className="upload_video">
//                         <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                 )}
//                 <input type="file" onChange={handleChange} className="file_input" />
//             </div>
//         </div>
//     );
// }

import React, { ChangeEvent, useState } from "react";
import "../../../css/upload.css";

export function UploadVideoPost(props: any) {
    const [videoFiles, setVideoFiles] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setVideoFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    return (
        <div className="upload_post_bottom">
            <h3>Upload Video Post</h3>
            <h2>Add Video:</h2>
            <div className="upload_image_box">
                {videoFiles.map((videoFile, index) => (
                    <div key={index}>
                        <video controls className="upload_video">
                            <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
                <input type="file" onChange={handleChange} className="file_input" />
            </div>
        </div>
    );
}


