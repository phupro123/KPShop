import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { _forgetPass, _loginPass, _verifyPhone } from '../../redux/user/userApi';
import { BsChevronLeft } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Input } from '../Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { forgetFormSchema } from './loginWithEmailFormSchema';
import Button from '../Button/Button';
import { useCallback, useState } from 'react';
import { login } from '../../redux/user/userSlice';
import { createAxios } from '../../api/createInstance';

const ForgetPass = ({ handleToggleMail }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const currentUser = useSelector((state) => state.user?.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, login);
    const { control, handleSubmit: useFormSubmit } = useForm({
        resolver: yupResolver(forgetFormSchema()),
    });
    

    const handleSubmit = useFormSubmit((formData) => {
        setIsSubmitting(true);

        _forgetPass(formData,axiosJWT,currentUser?._id)
            .then(() => {
                toast.success('Vui lòng kiểm tra Email của bạn');
                // handleToggleMail()
                setSuccess((e)=>!e);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    });
   
    return (
        
         <>
         <div className="text-left">
                <button className='a'>
                    <BsChevronLeft  onClick={handleToggleMail} />
                </button>
                
                <p className="text-2xl font-semibold">Quên mật khẩu</p>
                <p>Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu</p>
            </div>
            {
                success ?
                (
                    <p>Yêu cầu thay đổi mật khẩu đã được gửi đến địa chỉ Email của bạn, xin cảm ơn!</p>
                )
                :(
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    <Input name="username" label="Email" className="block" disabled={isSubmitting} control={control} />
                        
                        <Button type="submit" color="primary" disabled={isSubmitting} isLoading={isSubmitting}>
                            Lấy lại mật khẩu
                        </Button>
                    </form>
                )
            }
          
            <br></br>
            <br></br>
         </>
        
        
    );
};

export default ForgetPass;
