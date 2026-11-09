
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({
    isOpen,
    title,
    message,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-4">
                    <AlertTriangle
                        size={24}
                        className="text-red-600"
                    />
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-slate-800">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-sm text-slate-500 mt-2">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ConfirmDialog;
