import {ToastContainer} from "react-toastify";

export default function Toast(){
    const contextClass = {
        success: "bg-success",
        error: "bg-error",
        info: "bg-info",
        warning: "bg-warning",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    return (
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            icon={false}
            theme="colored"
        />
    )
}
