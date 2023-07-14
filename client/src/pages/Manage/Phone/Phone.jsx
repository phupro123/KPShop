import { useNavigate } from 'react-router-dom';
import './phone.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {  _checkPhone, _editPhone,  } from '../../../redux/user/userApi';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../utils/firebase.config';
import { CgSpinner } from 'react-icons/cg';
import { BsFillShieldLockFill } from 'react-icons/bs';
import PinInput from 'react-pin-input';
import { login } from '../../../redux/user/userSlice';
import { createAxios } from '../../../api/createInstance';

const Phone = ({ title }) => {
    const currentUser = useSelector((state) => state.user?.currentUser);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [input0, setInput0] = useState('');
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const naviage = useNavigate();
    let axiosJWT = createAxios(currentUser, dispatch, login);

    useEffect(() => {
        document.title = title;
    }, []);
    const [number, setnumber] = useState(currentUser?.phone ?? '');

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response) => {
                        onSignup();
                    },
                    'expired-callback': () => {},
                },
                auth,
            );
        }
    };

    const onSignup = async(e) => {
        e.preventDefault();
        if (number === '') {
            setInput0('has-error');
            return;
        }
        await _checkPhone( { phone: number },currentUser._id,axiosJWT).then((e) => {
            if (e === 'Phone đã được sử dụng') {
                setCheck(true);
                return;
            }
           
        });
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = '+84' + number.slice(1, 10);

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success('OTP sended successfully!');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const onOTPVerify = () => {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                toast.success('Thành công successfully!');
                const data = {
                    phone: number,
                };
                await _editPhone(dispatch, data, currentUser?._i,axiosJWT);
                setLoading(false);
                naviage('/account');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleOnChangeOTP = (inputOTP) => {
        setOtp?.(inputOTP);
    };

    return (
        <div className="mb-[2rem]  bg-blue">
            <p className="text-2xl font-semibold mb-6">Thiết lập số điện thoại</p>
            <div id="recaptcha-container"></div>
            {showOTP ? (
                <>
                    <div className="bg-white text-blue-500 w-fit mx-auto p-4 rounded-full">
                        <BsFillShieldLockFill size={30} />
                    </div>
                    <div className="font-bold text-xl text-black w-fit mx-auto">Nhập mã OTP để xác thực</div>
                    <div className="otpInput  w-fit mx-auto p-4  ">
                        <PinInput
                            length={6}
                            initialValue={String(otp)}
                            onChange={handleOnChangeOTP}
                            type="numeric"
                            inputMode="number"
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                            inputStyle={{
                                borderRadius: '8px',
                                borderWidth: '2px',
                                borderColor: '#f3f4f6',
                                marginInline: '8px',
                            }}
                            inputFocusStyle={{ borderColor: '#3b82f6' }}
                            autoSelect
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </div>

                    <button
                        onClick={onOTPVerify}
                        className="bg-blue-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                        {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                        <span>Xác thực</span>
                    </button>
                </>
            ) : (
                <>
                    <div className="innerPassword">
                        <div className="item">
                            <form className="form" onSubmit={(e) => onSignup(e)}>
                                <div className="form-control">
                                    <label className="input-label">Số điện thoại</label>
                                    <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                                        <input
                                            name="password"
                                            id="0"
                                            maxlength="10"
                                            placeholder="Nhập số điện thoại"
                                            type="text"
                                            onChange={(e) => setnumber(e.target.value.replace(/\D/, ''))}
                                            value={number}
                                            className={`input with-icon-right ${input0} `}
                                            onClick={(e) => setInput0('')}
                                        />
                                    </div>
                                </div>
                                {check ? (
                                        <div className="text-sm text-red-500">
                                            Số điện đã được sử dụng vui lòng chọn lại
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                <button
                                    type="submit"
                                    disabled=""
                                    className="styles__StyledBtnSubmit-sc-s5c7xj-3 cqEaiM flex gap-1 items-center justify-center py-2.5"
                                >
                                    {loading ?? <CgSpinner size={20} className="mt-1 animate-spin" />}Lưu thay đổi
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Phone;
