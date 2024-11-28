import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "../../FormField";

const AppreciationSection = ({ formData, handleChange, memoizedOptions }) => (
  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
        Apreciación de la Docente Orientadora
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <FormField
        section="appreciation"
        field="observaciones"
        type="richtext"
        value={formData.appreciation.observaciones}
        onChange={handleChange}
        label="Observaciones"
      />
      <FormField
        section="appreciation"
        field="activacionRuta"
        value={formData.appreciation.activacionRuta}
        onChange={handleChange}
        label="Activación de Ruta"
        options={memoizedOptions.activacionRuta}
      />
      <FormField
        section="appreciation"
        field="procesosConvivencia"
        type="richtext"
        value={formData.appreciation.procesosConvivencia}
        onChange={handleChange}
        label="Procesos de Convivencia"
      />
    </CardContent>
  </Card>
);

export default AppreciationSection;
