import { Card, CardContent } from "@/components/ui/card";
import { Camera, UserCircle2 } from "lucide-react";

export const StudentProfile = () => {
  return (
    <Card className="mb-8 overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <CardContent className="relative pt-16 pb-8">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <UserCircle2 className="w-20 h-20 text-gray-300" />
              </div>
            </div>
            <button
              className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg 
                           hover:scale-110 transition-transform duration-200 group-hover:bg-indigo-500 
                           group-hover:text-white"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Perfil del Estudiante
          </h2>
          <p className="text-gray-500">
            Ingresa la información del nuevo estudiante
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
