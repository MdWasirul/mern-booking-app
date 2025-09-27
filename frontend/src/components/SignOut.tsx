import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      //showtoast
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ message: "LogOut Successfully", type: "Success" });
      navigate("/login");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-white px-4 cursor-pointer  text-blue-700 py-2 font-bold border rounded-xl hover:bg-gray-300 "
      >
        Sign Out
      </button>
    </div>
  );
};
export default SignOut;
