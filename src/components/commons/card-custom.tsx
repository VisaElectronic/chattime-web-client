import { ReactElement } from "react";

interface CardProps {
    className?: string; 
    onAction?: () => void;
    children: ReactElement;
}

export default function CardCustom({onAction, className, children}: CardProps) {
    let defaultClass = 'flex h-full flex-col justify-center gap-4 px-6 py-3';
    defaultClass += className ? ' ' + className : '';
    return (
        <div
            onClick={onAction}
            className='flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col hover:bg-gray-100 dark:hover:bg-gray-700 max-w-xs p-0'
        >
            <div className={defaultClass}>
                {children}
            </div>
        </div>
    );
}