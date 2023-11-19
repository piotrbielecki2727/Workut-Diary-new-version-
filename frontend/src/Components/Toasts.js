import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toasts({ show, message, setShow, toastType, setToastType }) {
    useEffect(() => {
        if (show) {
            switch (toastType) {
                case 'success':
                    toast.success(message, {
                        onOpen: () => {
                            setShow(false)
                            setToastType(null);
                        }


                    });
                    break;
                case 'error':
                    toast.error(message, {
                        onOpen: () => {
                            setShow(false)
                            setToastType(null);
                        }

                    });
                    break;
                case 'warning':
                    toast.warning(message, {
                        onOpen: () => {
                            setShow(false)
                            setToastType(null);
                        }

                    });
                    break;
                default:

                    break;
            }
        }
    }, [show, message, setShow, toastType]);

    return <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        theme="dark"
       
        style={{ marginTop: "100px" }}
    />;
}

export default Toasts;
