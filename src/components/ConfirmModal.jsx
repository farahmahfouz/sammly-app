import { useEffect } from "react";
import DeleteIcon from './../icons/DeleteIcon';

const VARIANTS = {
    danger:
        "py-2 px-4 text-sm bg-primary text-white hover:bg-primaryDark duration-300 rounded-full font-normal flex gap-1",
    primary: "py-1 px-4 text-sm bg-buttonColor hover:bg-hoverButton text-white rounded-full",
};

export default function ConfirmModal({
    isOpen,
    title = "Confirm",
    message = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "primary", // "danger" | "primary"
    isLoading = false,
    onConfirm,
    onCancel,
}) {
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => e.key === "Escape" && !isLoading && onCancel();
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, isLoading, onCancel]);

    if (!isOpen) return null;

    return (
        <div className="modal modal-open" onClick={() => !isLoading && onCancel()}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-4 items-center">
                    <img src="/lavender-t-shirt.png" className="h-32 w-32 object-cover" />
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-2xl">{title}</h3>
                        <p className="text-textMuted tracking-tighter">{message}</p>
                    </div>
                </div>

                <div className="flex items-end justify-end gap-2">
                    <button
                        className={VARIANTS[variant]}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        <DeleteIcon />

                        {isLoading ? (
                            <span className="loading loading-ring loading-md" />
                        ) : (
                            confirmText
                        )}
                    </button>

                    <button className="py-2 px-4 text-sm bg-borderLight hover:bg-borderLight/70 transition-all duration-300 rounded-full font-normal" onClick={onCancel} disabled={isLoading}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}