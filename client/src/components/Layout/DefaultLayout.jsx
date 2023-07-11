import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';
function DefaultLayout() {
    return (
        <>
            <Header />

            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
