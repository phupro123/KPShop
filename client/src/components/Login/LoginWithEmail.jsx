import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { _loginPass, _verifyPhone } from '../../redux/user/userApi';
import { BsChevronLeft } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Input } from '../Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginWithEmailFormSchema } from './loginWithEmailFormSchema';
import Button from '../Button/Button';
import { useCallback, useState } from 'react';
import ForgetPass from './ForgetPass';

const LoginWithEmail = ({ handleToggleLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [forget, setForget] = useState(true);

    const { control, handleSubmit: useFormSubmit } = useForm({
        resolver: yupResolver(loginWithEmailFormSchema()),
    });
    

    const handleSubmit = useFormSubmit((formData) => {
        setIsSubmitting(true);

        _loginPass(formData, dispatch, navigate)
            .then(() => {
                toast.success('Đăng nhập thành công!');
                navigate('/')
            })
            .catch((error) => {
                toast.error("Mật khẩu hoặc tài khoản không đúng vui lòng thử lại");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    });
    const handleToggleMail = useCallback(() => {
        setForget((pre) => !pre);
    }, [setForget]);
    return (
        
            forget ? 
            <>
            <div className="text-left">
                <button>
                    <BsChevronLeft onClick={handleToggleLogin} />
                </button>
                <p className="text-2xl font-semibold">Đăng nhập bằng email</p>
                <p>Nhập email và mật khẩu tài khoản KPShop</p>
            </div>

            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <Input name="username" label="Email" className="block" disabled={isSubmitting} control={control} />
                <Input
                    type="password"
                    name="password"
                    label="Mật khẩu"
                    className="block"
                    disabled={isSubmitting}
                    control={control}
                />
                <Button type="submit" color="primary" disabled={isSubmitting} isLoading={isSubmitting}>
                    Đăng nhập
                </Button>
            </form>

            <button onClick={handleToggleMail} className="text-blue-500 hover:text-blue-700 text-right text-xs font-medium">
                Quên mật khẩu
            </button>

            <div className="text-center">
                Bạn mới biết đến KPShop?
                <a onClick={handleToggleLogin} className="text-blue-500 hover:text-blue-700 ml-2 transition">
                    Tạo tài khoản
                </a>
            </div>
        </>
        :
         <>
            <ForgetPass handleToggleMail={handleToggleMail} />
         </>
        
        
    );
};

export default LoginWithEmail;
