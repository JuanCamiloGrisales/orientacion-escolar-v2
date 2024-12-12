"use client";

import { useState, useEffect } from "react";
import { FormSection } from "./components/FormSection";
import { formSections, createFormSections } from "./config/formSections";
import { StudentFormData } from "./types";
import axios from "axios";
import { AutocompleteService } from "@/services/form/AutocompleteService";
import { dateService } from "@/utils/services/DateService";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, Save, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { StudentService } from "@/services/student/StudentService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function CreateStudentPageContent() {
  const [sections, setSections] = useState(formSections);
  const [formData, setFormData] = useState<StudentFormData>({} as StudentFormData);
  const [studentsData, setStudentsData] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const initializeSections = async () => {
      const loadedSections = await createFormSections();
      setSections(loadedSections);
    };

    initializeSections();
  }, []);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/lista-estudiantes/");
        setStudentsData(response.data);
      } catch (error) {
        console.error("Failed to fetch students data:", error);
      }
    };

    fetchStudentsData();
  }, []);

  const handleFieldChange = (field: string, value: any) => {
    if (value instanceof File) {
      setFiles(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value]
      }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [field]: value };

        // Auto-fill student data if nombreEstudiante is changed
        if (field === 'nombreEstudiante') {
          const studentInfo = AutocompleteService.getStudentByName(value);
          if (studentInfo) {
            const birthDate = dateService.parseSpanishDateToISO(studentInfo.fechaNacimiento);
            return {
              ...newData,
              tipoDocumentoEstudiante: studentInfo.tipoDocumento,
              numeroDocumentoEstudiante: studentInfo.numeroDocumento.toString(),
              entidadPrestadoraDeSalud: studentInfo.eps,
              fechaNacimientoEstudiante: birthDate,
              edadEstudiante: dateService.calculateAge(birthDate).toString(),
              lugarNacimientoEstudiante: studentInfo.lugarNacimiento,
              lugarResidencia: studentInfo.barrio,
              gradoEscolaridad: studentInfo.gradoEscolaridad.toString(),
            };
          }
        }

        // Calculate age when birth date changes
        if (field === 'fechaNacimientoEstudiante' && value) {
          return {
            ...newData,
            edadEstudiante: dateService.calculateAge(value).toString()
          };
        }

        return newData;
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await StudentService.createStudent(formData, files);

      toast({
        title: "Éxito",
        description: "Estudiante creado correctamente",
        duration: 3000,
      });

      router.push('/students');
    } catch (error) {
      console.error('Error creating student:', error);
      toast({
        title: "Error",
        description: "Hubo un error al crear el estudiante",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100/50">
        <div className="max-w-5xl mx-auto p-8">
          {/* Header with back button - fixed at top */}
          <div className="sticky top-0 z-10 bg-gradient-to-br from-gray-50 to-gray-100/50 
                         backdrop-blur-sm pb-4 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">
                  Nuevo Estudiante
                </h1>
              </div>
              <Button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 
                           hover:from-indigo-600 hover:to-purple-600"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2">⭮</div> Guardando...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Registro
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Profile Section */}
          <Card className="mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <CardContent className="relative pt-16 pb-8">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <UserCircle2 className="w-20 h-20 text-gray-300" />
                    </div>
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg 
                               hover:scale-110 transition-transform duration-200 group-hover:bg-indigo-500 
                               group-hover:text-white">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Perfil del Estudiante</h2>
                <p className="text-gray-500">Ingresa la información del nuevo estudiante</p>
              </div>
            </CardContent>
          </Card>



          {/* Form sections */}
          < div className="space-y-8" >
            {
              sections.map((section, index) => (
                <FormSection
                  key={index}
                  section={section}
                  data={formData}
                  onChange={handleFieldChange}
                />
              ))
            }
          </div >

          {/* Submit Button - fixed at bottom */}
          < div className="sticky bottom-0 z-10 py-4 bg-gradient-to-t from-gray-50 to-transparent" >
            <div className="flex justify-end">
              <Button
                className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-500 
                          hover:from-indigo-600 hover:to-purple-600 rounded-xl text-lg
                          transform hover:scale-105 transition-all duration-200"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2">⭮</div> Guardando...
                  </div>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Guardar Perfil
                  </>
                )}
              </Button>
            </div>
          </div >
        </div >
      </div >
    </main >
  );
}

export default function CreateStudentPage() {
  return (

    <CreateStudentPageContent />
  );
}
