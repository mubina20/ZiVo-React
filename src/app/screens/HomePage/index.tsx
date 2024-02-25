import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';
import { RightSidebar } from '../../components/sidebars/right_sidebar';
import { Home } from './home';

export function HomePage() {
	
	return (
		<div className="homepage">
			<Header />
            <LeftSidebar />
			<Home />
            <RightSidebar />
		</div>
	);
}
