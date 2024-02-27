import "../../../css/short.css";
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';

export function ShortContents() {
    return(
        <div>
            <Header />
            <LeftSidebar />
            <div className="shorts_container">
                <div className="short_content">
                    
                </div>
            </div>
        </div>
    )
}