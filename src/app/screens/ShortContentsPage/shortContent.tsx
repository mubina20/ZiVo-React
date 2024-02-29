import "../../../css/short.css";
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';

export function ShortContents() {
    return(
        <div>
            <Header />
            <LeftSidebar />
            <div className="shorts_big_container">
                <div className="shorts_container">
                    <div className="short_content">
                        <video
                            className={"ads_video"}
                            autoPlay={true}
                            loop
                            playsInline
                            data-video-media=""

                        >
                            <source
                                data-src="/icons/post/turkey.mp4"
                                type="video/mp4"
                                src="/icons/post/turkey.mp4"
                            />
                        </video>
                    </div>

                    <div className="short_content">
                        <video
                            className={"ads_video"}
                            autoPlay={true}
                            loop
                            playsInline
                            data-video-media=""

                        >
                            <source
                                data-src="/icons/post/turkey.mp4"
                                type="video/mp4"
                                src="/icons/post/turkey.mp4"
                            />
                        </video>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}