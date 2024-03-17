import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';
import { RightSidebar } from '../../components/sidebars/right_sidebar';
import useDeviceSize from '../../hooks';
import { Home } from './home';

export function HomePage() {
	const { isDesktop, isMobile, isTablet } = useDeviceSize();
	if (isDesktop) {
		return( 
			<div>
				<Header />
				<LeftSidebar />
				<Home />
				<RightSidebar />
			</div>
		)
	}
	if (isTablet) {
		return <div style={{color: "white", fontSize: "5rem"}}>isTablet</div>;
	}
	if (isMobile) {
		return <div style={{color: "white", fontSize: "5rem"}}>isMobile</div>;
	}
	
	return <div>Other</div>;
}
