import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,

    onSuccess: async () => {
      showToast({ message: "Registeration Success", type: "Success" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/search");
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form action="" onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Create an Account</h2>
      <div className=" flex flex-col md:flex-row gap-5 ">
        <label htmlFor="" className="text-gray-700 text-sm font-bold">
          First Name
          <input
            {...register("firstName", { required: "This field is required" })}
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold">
          Last Name
          <input
            {...register("lastName", { required: "This field is required" })}
            type="text"
            className="border rounded w-full  py-1 px-2 font-normal"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label htmlFor="" className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This is required Field";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
          type="password"
          className="border rounded w-full  py-1 px-2 font-normal"
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex justify-between items-center">
        <span>
          Already Registered?{" "}
          <Link className="underline" to="/login">
            Login here
          </Link>
        </span>
        <button className="bg-blue-700 py-2 px-4 text-2xl text-white border rounded-2xl">
          Register
        </button>
      </span>
    </form>
  );
};

export default Register;
