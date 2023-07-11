import { string } from 'yup';
import { generateFormSchema } from '../Utils/Helpers';

const loginWithEmailFormSchema = () =>
    generateFormSchema({
        username: string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
        password: string().required('Vui lòng nhập mật khẩu.'),
    });
    const forgetFormSchema = () =>
    generateFormSchema({
        username: string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
    });
export { loginWithEmailFormSchema,forgetFormSchema };
