import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { UserService } from "../../services";
import { useDispatch } from "react-redux";
import { Input } from "../../components/Form";
import Button from "../../components/Button/Button";
import { loginFormSchema } from "../../components/Schemas/loginFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useUser();
  const [redirectToReferrer] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit: useFormSubmit } = useForm({
    resolver: yupResolver(loginFormSchema()),
  });

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await UserService._login(formData, dispatch, navigate);
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    } finally {
      setIsSubmitting(false);
    }
  });

  if (redirectToReferrer) {
    return <Navigate to="/" />;
  }
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="h-fit-layout flex items-center justify-center">
      <div className="flex items-center shadow-md border bg-white rounded-lg w-1/2 px-6 min-w-[650px] py-12">
        <div className="w-1/2 text-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image"
          />
        </div>
        <div className="w-1/2 text-center">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <h2 className="text-blue-500 text-xl mb-8 uppercase font-bold">
              Trang quản lý
            </h2>
            <Input
              className="block w-full"
              control={control}
              disabled={isSubmitting}
              label="Email"
              name="username"
            />
            <Input
              className="block w-full"
              control={control}
              disabled={isSubmitting}
              label="Password"
              name="password"
              type="password"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
