import useDarkMode from "@/hook/useDarkMode";
import { FC } from "react";
import { ToastContainer } from "react-toastify";

const ToastBoss: FC = () => {
    const isDarkMode = useDarkMode();
    return (
        <ToastContainer
            theme={isDarkMode ? 'colored' : 'light'}
        />
    );
}

export default ToastBoss;