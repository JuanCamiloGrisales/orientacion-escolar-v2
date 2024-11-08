import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEstudiantes } from '@/lib/StudentsContext';
import { format, formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ClockIcon } from "lucide-react";
import React from 'react';

const UpcomingEvents: React.FC = () => {
    const { estudiantes } = useEstudiantes();

    const upcomingEvents = estudiantes
        .filter(estudiante => estudiante.fechaProximoSeguimiento && new Date(estudiante.fechaProximoSeguimiento) > new Date())
        .sort((a, b) => new Date(a.fechaProximoSeguimiento!).getTime() - new Date(b.fechaProximoSeguimiento!).getTime())
        .slice(0, 5);

    const formatDate = (date: Date) => {
        // Remove time information from the relative date display
        return formatRelative(date, new Date(), { locale: es })
            .replace(/a las \d{1,2}:\d{2}/, '') // Remove "a las HH:MM"
            .replace(/\s+/g, ' ') // Clean up extra spaces
            .trim();
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                    Próximas Atenciones
                </h2>
                {upcomingEvents.length > 0 ? (
                    <ul className="space-y-4">
                        {upcomingEvents.map(event => (
                            <li
                                key={event.id}
                                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 
                                         transition-all duration-200 border border-transparent hover:border-indigo-50"
                            >
                                <Avatar className="h-12 w-12 ring-2 ring-indigo-100">
                                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {event.nombreEstudiante.split(' ').map((n: string) => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-medium text-gray-900">{event.nombreEstudiante}</p>
                                    <div className="flex items-center mt-1 text-sm text-gray-500">
                                        <CalendarIcon className="w-4 h-4 mr-1" />
                                        <span className="capitalize">
                                            {formatDate(new Date(event.fechaProximoSeguimiento!))}
                                        </span>
                                        <ClockIcon className="w-4 h-4 ml-3 mr-1" />
                                        <span>
                                            {format(new Date(event.fechaProximoSeguimiento!), 'HH:mm')}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p className="text-lg">No hay próximas atenciones programadas.</p>
                        <p className="mt-2 text-indigo-400">Programa nuevas atenciones para verlas aquí.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default UpcomingEvents;