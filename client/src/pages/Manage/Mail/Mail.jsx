import { useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react';
import './mail.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
    _changeMail,
    _checkMail,
    _editPass,
    _editPhone,
    _editUser,
    _verifyChangeMail,
} from '../../../redux/user/userApi';
import { CgSpinner } from 'react-icons/cg';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { login } from '../../../redux/user/userSlice';

function Mail({ title }) {
    const [check, setCheck] = useState(false);
    const currentUser = useSelector((state) => state.user?.currentUser);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [input0, setInput0] = useState('');

    const dispatch = useDispatch();
    const naviage = useNavigate();
    useEffect(() => {
        document.title = title;
    }, []);
    const [number, setnumber] = useState(currentUser?.username ?? '');

    async function onSignup(e) {
        e.preventDefault();
        if (number === '') {
            setInput0('has-error');
            return;
        }
        setLoading(true);
        await _checkMail(dispatch, { username: number }).then((e) => {
            if (e === 'Địa chỉ email đã được sử dụng') {
                setCheck(true);
                return;
            }
            const data = {
                phone: number,
            };
            _changeMail(data);
            setLoading(false);
            setShowOTP(true);
            toast.success('Mã xác thực OTP đã được gửi!');
        });
    }

    async function onOTPVerify() {
        setLoading(true);
        const data = {
            phone: number,
            otp: otp,
            user: currentUser?._id,
        };
        await _verifyChangeMail(data, dispatch).then((e) => {
            if (e === 'Your OTP was wrong!') {
                toast.error('Mã sai xác thực sai hoặc hết hạn!');
            } else {
                dispatch(login(e))
                toast.success('Cập nhật thành công!');
                naviage('/account');
            }
            setLoading(false);
        });
    }

    return (
        <div className="mb-[2rem]  bg-blue">
            <p className="text-2xl font-semibold mb-6">Thiết lập địa chỉ email</p>
            <div id="recaptcha-container"></div>
            {showOTP ? (
                <>
                    <div className="bg-white text-blue-500 w-fit mx-auto p-4 rounded-full">
                        <BsFillShieldLockFill size={30} />
                    </div>
                    <div className="font-bold text-xl text-black w-fit mx-auto">Nhập mã OTP để xác thực</div>
                    <div className="otpInput  w-fit mx-auto p-4  ">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="opt-container"
                        ></OtpInput>
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
                                    <label className="input-label">Địa chỉ email</label>
                                    <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                                        <input
                                            name="password"
                                            id="0"
                                            maxlength="32"
                                            placeholder="Nhập địa chỉ email"
                                            type="email"
                                            onChange={(e) => setnumber(e.target.value)}
                                            value={number}
                                            className={`input with-icon-right ${input0} `}
                                            onClick={(e) => setInput0('')}
                                        />
                                    </div>

                                    {check ? (
                                        <div className="text-sm text-red-500">
                                            Địa chỉ email đã được sử dụng vui lòng chọn lại
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
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
}

export default Mail;
