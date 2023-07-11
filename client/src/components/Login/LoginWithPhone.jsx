import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { _loginPass, _loginPhone, _loginSucessPhone, _verifyPhone } from '../../redux/user/userApi';
import { BsChevronLeft, BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import { CgSpinner } from "react-icons/cg";
const LoginWithPhone = ({ handleToggleLogin, handleCloseModal }) => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const [isContinueLogin, setIsContinueLogin] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleContinueLogin = () => {
        setIsContinueLogin((pre) => !pre);
    };

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }

    const handleLogin = useCallback(
        (e) => {
            e.preventDefault();
            setLoading(true);
            window.confirmationResult
                .confirm(otp)
                .then(async (res) => {
                    console.log(res);
                    
                    const data = {
                        phone: phone
                     }
                     await _loginSucessPhone(data,dispatch)
                     toast.success("Thành công successfully!");
                     setLoading(false);
                     handleCloseModal();
                })
                .catch((err) => {
                    toast.error(err);
                });
           
        },
        [ phone, otp, dispatch, navigate, toast, handleCloseModal],
    );

    const handlePhone = useCallback(() => {
        if(phone==""|| phone.length<=9){
            toast.error("Vui lòng nhập đúng số điện thoại");
            return
        }
        setLoading(true);
        onCaptchVerify();
        
        const appVerifier = window.recaptchaVerifier;
    
        const formatPh = "+84" + phone.slice(1,10);
        
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            handleContinueLogin();
            toast.success("OTP sended successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
        
    }, [ phone, dispatch, navigate, setIsContinueLogin, toast]);

    const handleGoolge = () => {
        window.open(`http://localhost:8000/auth/connect/google/1/0`, '_self');
    };
    const handleFb = () => {
        window.open(`http://localhost:8000/auth/connect/facebook/1/0`, '_self');
    };
    return (
        <>
            {!isContinueLogin ? (
                <>
             
                    <div className="flex flex-col space-y-6">
                        <div className="text-left">
                            <p className="font-bold text-2xl">Xin chào</p>
                            <p>Đăng nhập hoặc Tạo tài khoản</p>
                        </div>
                        
                        <div>
                            <input
                                className="w-full px-6 py-3  font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded"
                                placeholder="Số điện thoại"
                                maxLength="10"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/,''))}
                            />
                        </div>
                        <button
                            onClick={(e) => {
                                handlePhone(e);
                            }}
                            className="py-3 w-full  flex gap-1 items-center justify-center bg-primary-600 text-white font-medium text-lg rounded-xl hover:bg-primary-700"
                        > {loading && (
                            <CgSpinner size={20} className="mt-0 animate-spin" />
                          )}
                            Tiếp tục
                        </button>
                        <a
                            onClick={() => {
                                handleToggleLogin();
                            }}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Đăng nhập bằng Email
                        </a>
                    </div>
                    <div>
                        <p className="text-center">Hoặc tiếp tục bằng</p>
                        <div className="flex flex-row items-center justify-center">
                            <p className="mr-6">Sign in with</p>
                            <button className="text-blue-500"onClick={handleFb}>
                                <BsFacebook size={30} />
                            </button>
                            <button onClick={handleGoolge}>
                                <FcGoogle size={36} />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-left cursor-pointer">
                        <BsChevronLeft onClick={handleContinueLogin} />
                    </div>
                    <div className="text-left">
                        <p className="text-2xl font-semibold">Nhập mã xác minh</p>
                        <p>Nhập mã xác minh gồm 6 số vừa được gửi đến {phone}</p>
                    </div>

                    <div>
                        <input
                            className="form-control block w-full px-6 py-3 font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-xl"
                            placeholder="OTP"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="py-3 text-lg w-full  flex gap-1 items-center justify-center bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700"
                    >
                        {loading && (
                            <CgSpinner size={20} className="mt-0 animate-spin" />
                          )}
                        Đăng nhập
                    </button>
                    <div>
                        Chưa nhận được.
                        <a onClick={() => {}} className="text-blue-500 hover:text-blue-700 ml-2">
                            Gửi lại
                        </a>
                    </div>
                </>
            )}
        </>
    );
};

export default LoginWithPhone;
