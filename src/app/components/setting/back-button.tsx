import { useWindowContentStore } from "@/stores/window-content";
import { HiChevronLeft } from "react-icons/hi";

type BackButtonProps = {
    typeWindow: number
}

export default function BackButton({ typeWindow }: BackButtonProps) {
    const setTypeWindow = useWindowContentStore(state => state.setTypeWindow);
    return (
        <a onClick={() => setTypeWindow(typeWindow)}>
            <HiChevronLeft className="w-6 h-6 text-blue-400" />
        </a>
    );
}