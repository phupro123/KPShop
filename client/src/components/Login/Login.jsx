import { useCallback, useState } from 'react';
import { _loginPass, _verifyPhone } from '../../redux/user/userApi';
import LoginWithEmail from './LoginWithEmail';
import LoginWithPhone from './LoginWithPhone';

const Login = ({ handleCloseModal }) => {
    const [isLoginPhone, setIsLoginPhone] = useState(true);

    const handleToggleLogin = useCallback(() => {
        setIsLoginPhone((pre) => !pre);
    }, [setIsLoginPhone]);

    return (
        <>
            <div
                onClick={handleCloseModal}
                className="fixed inset-0 w-full h-full z-10 bg-gray-800 bg-opacity-80"
            ></div>
            <div className="fixed z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-xl border shadow-xl text-gray-800 text-base p-6 flex justify-center items-center w-[700px] h-[450px]">
                <div className="w-1/2 flex items-center">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt="Sample image"
                    />
                </div>
                <div className="w-1/2 h-full">
                
                    <div className="h-full flex flex-col justify-between">
                        {isLoginPhone ? (
                            <LoginWithPhone handleToggleLogin={handleToggleLogin} handleCloseModal={handleCloseModal} />
                        ) : (
                            <LoginWithEmail handleToggleLogin={handleToggleLogin} handleCloseModal={handleCloseModal} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
