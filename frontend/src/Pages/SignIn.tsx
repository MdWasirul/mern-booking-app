import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      //1.toast message
      //2.navigate
      showToast({ message: "LogIn Success", type: "Success" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      // Error Message shows
      showToast({ message: error.message, type: "Error" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form action="" onSubmit={onSubmit} className="flex flex-col gap5">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <label htmlFor="" className="text-gray-700 text-sm font-bold">
        Email
        <input
          {...register("email", { required: "This field is required" })}
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold">
        Password
        <input
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Passsword must be 6 character",
            },
          })}
          type="password"
          className="border rounded w-full  py-1 px-2 font-normal"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex justify-between items-center">
        <span>
          Not registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button className="bg-blue-700 mt-4 py-2 px-4 text-2xl text-white border rounded-2xl">
          LogIn
        </button>
      </span>
    </form>
  );
};
export default SignIn;
