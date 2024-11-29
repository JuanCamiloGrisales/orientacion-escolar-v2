
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ApiKeyInputProps {
    handleApiKeySave: (apiKey: string) => void;
}

export default function ApiKeyInput({ handleApiKeySave }: ApiKeyInputProps) {
    const [apiKey, setApiKey] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleApiKeySave(apiKey);
        setApiKey("");
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Configurar API Key de Gemini AI
            </h2>
            <p className="text-gray-600 mb-4">
                Por favor, introduce tu API Key de Gemini AI para habilitar las funciones de inteligencia artificial generativa.
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Ejemplo: sk-1234567890abcdef"
                    className="w-full border-2 border-gray-200 rounded-lg p-4 mb-4"
                />
                <Button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg">
                    Guardar API Key
                </Button>
            </form>
        </div>
    );
}