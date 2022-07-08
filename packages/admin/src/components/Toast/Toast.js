import {ToastContainer} from "react-toastify";

export default function Toast(){
    return (
        <ToastContainer
            position="top-right"
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
