import { verifiedMemberData } from '../../apiServices/verify';
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';
import { RightSidebar } from '../../components/sidebars/right_sidebar';
import useDeviceSize from '../../hooks';
import { AuthPage } from '../AuthenticationPage';
import { Home } from './home';
import { MobileHome } from './mobileHome';

export function HomePage(props: any) {
    const { open, handleOpenModal, handleModalClose } = props;
    const { isDesktop, isMobile, isTablet } = useDeviceSize();

    return (
        <>
            {verifiedMemberData ? (
                isDesktop ? (
                    <div>
                        <Header />
                        <LeftSidebar />
                        <Home />
                        <RightSidebar />
                    </div>
                ) : isTablet ? (
                    <div>
                        <Header />
                        <Home />
                    </div>
                ) : isMobile ? (
                    <div>
                        <MobileHome />
                    </div>
                ) : null
            ) : (
                <AuthPage
                    open={open}
                    handleOpenModal={handleOpenModal}
                    handleModalClose={handleModalClose}
                />
            )}
        </>
    );
}
