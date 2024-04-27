import { Header } from '../../components/header/header';
import useDeviceSize from '../../hooks';
import { AuthenticationPage } from './auth';
import { MobileAuth } from './mobileAuth';

export function AuthPage(props: any) {
	const { isDesktop, isMobile, isTablet } = useDeviceSize();
	if (isDesktop) {
		return( 
			<div>
				<AuthenticationPage 
                    open={props.open}
                    handleOpenModal={props.handleOpenModal}
                    handleModalClose={props.handleModalClose}
                />
			</div>
		)
	}
	if (isTablet) {
		return(
			<div>
				<Header />
				<div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
			</div>
		) 
	}
	if (isMobile) {
		return(
			<div>
				<MobileAuth 
                    open={props.open}
                    handleOpenModal={props.handleOpenModal}
                    handleModalClose={props.handleModalClose}
                />
			</div>
		)
	}
	return <div>Other</div>;
}