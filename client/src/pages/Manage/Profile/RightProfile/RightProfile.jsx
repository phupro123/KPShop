import { MdEmail, MdPhone ,MdLock} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import {  _editUser, _getWishList } from '../../../../redux/user/userApi';
import { toast } from 'react-toastify';
import { Axios } from 'axios';
import { login } from '../../../../redux/user/userSlice';
import { createAxios } from '../../../../api/createInstance';
import { useEffect } from 'react';

function RightProfile() {
    const currentUser = useSelector((state) => state.user?.currentUser);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let axiosJWT = createAxios(currentUser, dispatch, login);
    const hanldPass = ()=>{

        if(!currentUser?.username){
            navigate("/account/edit/mail")
            toast.info("Bạn cần thiết lập tài khoản email trước!!")
        }else{
             navigate("/account/edit/password")
        }
       
    }
    const hanldPhone = ()=>{
        navigate("/account/edit/phone")
    }
    const hanldMail = ()=>{
        navigate("/account/edit/mail")
    }

    const handleFb = async()=>{
        window.open(`http://localhost:8000/auth/connect/facebook/${currentUser.userId}/1`, '_self');
        
        
    }
    const handleGoolge = async()=>{
        window.open(`http://localhost:8000/auth/connect/google/${currentUser.userId}/1`, '_self');
        
    }
    const handleCancelFb = async()=>{
        const data ={
            fbId:""
        }
       await _editUser (dispatch,data,currentUser._id,axiosJWT,navigate)
                
    }
    const handleCancelGoogle = async()=>{
        const data ={
            googleId:""
        }
       await _editUser (dispatch,data,currentUser._id,axiosJWT,navigate)
             
    }
    useEffect(()=>{
        _getWishList(currentUser,dispatch,axiosJWT);
    },[])
    return (
        <div className="flex flex-col text-base space-y-4">
            <span className="font-semibold">Số điện thoại và Email</span>
            <div className="flex items-center w-full justify-between text-slate-600">
                <div className="flex space-x-4 items-center">
                    <MdPhone size={30} />
                    <div className="flex flex-col">
                        <span>Số điện thoại</span>
                        <span>{currentUser?.phone ? currentUser?.phone : 'Thêm số điện thoại'}</span>
                    </div>
                </div>
                <button onClick={hanldPhone} className="text-blue-500 border-blue-500 border-2 hover:text-blue-700 hover:border-blue-700 rounded-xl px-3 py-2">
                    Cập nhật
                </button>
            </div>

            <div className="flex items-center w-full justify-between text-slate-600">
                <div className="flex space-x-4 items-center">
                    <MdEmail size={30} />
                    <div className="flex flex-col">
                        <span>Địa chỉ email</span>
                        <span>{currentUser?.username ? currentUser?.username : 'Thêm địa chỉ email'}</span>
                    </div>
                </div>
                <button onClick={hanldMail} className="text-blue-500 border-blue-500 border-2 hover:text-blue-700 hover:border-blue-700 rounded-xl px-3 py-2">
                    Cập nhật
                </button>
            </div>
            <span className="font-semibold">Bảo mật</span>
            <div className="flex items-center w-full justify-between text-slate-600">
                <div className="flex space-x-4 items-center">
                    <MdLock size={30} />
                    <div className="flex flex-col">
                        <span>Mật khẩu</span>
                    </div>
                </div>
                <button onClick={hanldPass} className="text-blue-500 border-blue-500 border-2 hover:text-blue-700 hover:border-blue-700 rounded-xl px-3 py-2">
                    Cập nhật
                </button>
            </div>

           

            <span className="font-semibold ">Liên kết mạng xã hội</span>
            <div className="flex items-center w-full justify-between">
                <div className="flex">
                    <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/facebook.png"
                        className="w-10 h-10 align-text-bottom"
                        alt=""
                    />
                    <div className="flex flex-col ml-4">
                        <span>Facebook</span>
                    </div>
                </div>
                <div className="text-blue-500 hover:text-blue-700">
                    {currentUser?.fbId ? (
                        <button onClick={handleCancelFb} className="border-blue-500 border-2 hover:border-blue-700 rounded-xl px-3 py-2 bg-[#f0f0f0]">
                            Đã liên kết
                        </button>
                    ) : (
                        <button onClick={handleFb} className="border-blue-500 border-2 hover:border-blue-700 rounded-xl px-3 py-2">
                            Liên kết
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center w-full justify-between">
                <div className="flex">
                    <img
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/google.png"
                        className="w-10 h-10 align-text-bottom"
                        alt=""
                    />
                    <div className="flex flex-col ml-4">
                        <span>Google</span>
                    </div>
                </div>
                <div className="text-blue-500 hover:text-blue-700">
                    {currentUser?.googleId ? (
                    <button onClick={handleCancelGoogle} className=" hover:border-blue-700 rounded-xl px-3 py-2 bg-[#f0f0f0]">
                            Đã liên kết
                        </button>
                    ) : (
                        <button onClick={ handleGoolge}className="border-blue-500  border-2 hover:border-blue-700 rounded-xl px-3 py-2">
                            Liên kết
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RightProfile;
