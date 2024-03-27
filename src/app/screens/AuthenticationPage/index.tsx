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
				<div style={{color: "white", fontSize: "5rem"}}>isTablet</div>;
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