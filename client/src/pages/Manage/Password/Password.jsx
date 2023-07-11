import { useNavigate } from 'react-router-dom';

import './password.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { _checkPassword, _editPass } from '../../../redux/user/userApi';
function Password({ title }) {
    const currentUser = useSelector((state) => state.user?.currentUser);

    const dispatch = useDispatch();
    const naviage = useNavigate();
    useEffect(() => {
        document.title = title;
    }, []);
    const [oldPassword, setOldPassword] = useState('');
    const [havePassword, sethavePassword] = useState(false);

    const [password, setPassword] = useState('');
    const [rePassword, setRePassWord] = useState('');

    const [noti, setNoti] = useState('');
    const [img1, setImg1] = useState('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png');
    const [img2, setImg2] = useState('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png');
    const [img0, setImg0] = useState('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png');
    const [input0, setInput0] = useState('');

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const check = (string) => {
        var regExp = /[a-zA-Z]/g;
        return regExp.test(string) && string.length >= 8;
    };
    useEffect(()=>{
       _checkPassword({username:currentUser?.username}).then((e) => {
            if (e === 'Có pass') {
                sethavePassword(true);
                return;
            }

        })
    },{})
    const handleChange = async (e) => {
        e.preventDefault();
        if(havePassword){
            if(oldPassword === ''){
                setNoti('Vui lòng nhập thông tin');
                setInput0('has-error');
            }
        }
        if (password === '' && rePassword === '' ) {
            setNoti('Vui lòng nhập thông tin');
            setInput1('has-error');
            setInput2('has-error');
            
        }
         else if (!check(password)) {
            setNoti('Mật khẩu không đúng định dạng');
            setInput1('has-error');
        } else if (password !== rePassword) {
            setNoti('Mật khẩu chưa trùng khớp');
            setInput2('has-error');
        } else {
            toast.success('Thiết lập mật khẩu thành công!');
            const data = {
                password: password,
            };
            await _editPass(dispatch, data, currentUser?._id);
            naviage('/account');
        }
    };
    const handleImg1 = () => {
        if (img1 === 'https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png') {
            setImg1('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png');
            document.getElementById('1').type = 'text';
        } else {
            setImg1('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png');
            document.getElementById('1').type = 'password';
        }
    };
    const handleImg2 = () => {
        if (img2 === 'https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png') {
            setImg2('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png');
            document.getElementById('2').type = 'text';
        } else {
            setImg2('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png');
            document.getElementById('2').type = 'password';
        }
    };
    const handleImg0 = () => {
        if (img0 === 'https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png') {
            setImg0('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye-splash.png');
            document.getElementById('0').type = 'text';
        } else {
            setImg0('https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png');
            document.getElementById('0').type = 'password';
        }
    };
    return (
        <div classNameName="mb-[38rem]">
            <p className="text-2xl font-semibold mb-6">Thiết lập mật khẩu</p>
            <div className="innerPassword">
                <div className="item">
                    <form className="form" onSubmit={(e) => handleChange(e)}>
                        {havePassword ? (
                            <div className="form-control">
                                <label className="input-label">Mật khẩu cũ</label>
                                <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                                    <input
                                        name="password"
                                        id="0"
                                        maxlength="32"
                                        placeholder="Nhập mật khẩu cũ"
                                        type="password"
                                        className={`input with-icon-right ${input0} `}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        value={oldPassword}
                                        onClick={(e) => setInput0('')}
                                    />
                                    <img src={img0} onClick={() => handleImg0()} className="icon-right" />
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="form-control">
                            <label className="input-label">Mật khẩu mới</label>
                            <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                                <input
                                    name="password"
                                    id="1"
                                    maxlength="32"
                                    placeholder="Nhập mật khẩu mới"
                                    type="password"
                                    className={`input with-icon-right ${input1} `}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    onClick={(e) => setInput1('')}
                                />
                                <img src={img1} onClick={() => handleImg1()} className="icon-right" />
                            </div>
                            {/* <div className="hint-message"> Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</div> */}
                        </div>
                        <div className="form-control">
                            <label className="input-label">Nhập lại mật khẩu mới</label>
                            <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                                <input
                                    name="confirmPassword"
                                    id="2"
                                    maxlength="32"
                                    placeholder="Nhập lại mật khẩu mới"
                                    type="password"
                                    className={`input with-icon-right ${input2} `}
                                    onChange={(e) => setRePassWord(e.target.value)}
                                    value={rePassword}
                                    onClick={(e) => setInput2('')}
                                />
                                <img src={img2} onClick={() => handleImg2()} className="icon-right" />
                            </div>
                            <label className=" text-[red] mt-4">{noti}</label>
                        </div>

                        <button type="submit" disabled="" className="styles__StyledBtnSubmit-sc-s5c7xj-3 cqEaiM">
                            Lưu thay đổi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Password;
