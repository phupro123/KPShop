import { string } from 'yup';
import { generateFormSchema } from '../../../../components/Utils/Helpers';

const profileFormSchema = () =>
    generateFormSchema({
        fullname: string().required('Vui lòng nhập họ và tên.'),
    });

export { profileFormSchema };
