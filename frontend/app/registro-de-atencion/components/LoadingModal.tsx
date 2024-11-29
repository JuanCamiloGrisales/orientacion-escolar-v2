
import { Loader2 } from "lucide-react";

type LoadingStage = {
    title: string;
    description: string;
    isActive: boolean;
    isCompleted: boolean;
};

interface LoadingModalProps {
    stages: LoadingStage[];
}

export function LoadingModal({ stages }: LoadingModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
                <div className="space-y-6">
                    <div className="flex justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                    </div>
                    <div className="space-y-4">
                        {stages.map((stage, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-200 ${stage.isActive
                                        ? "scale-105 bg-indigo-50"
                                        : stage.isCompleted
                                            ? "opacity-50"
                                            : "opacity-25"
                                    } rounded-lg p-4`}
                            >
                                <h3
                                    className={`font-medium ${stage.isActive ? "text-indigo-600" : "text-gray-900"
                                        }`}
                                >
                                    {stage.title}
                                </h3>
                                <p
                                    className={`text-sm ${stage.isActive ? "text-indigo-500" : "text-gray-500"
                                        }`}
                                >
                                    {stage.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}