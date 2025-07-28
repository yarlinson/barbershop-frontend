export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // duración en minutos
  category: string;
  image_url?: string;
}

export interface ServiceFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

// Datos de prueba temporales
const mockServices: Service[] = [
  {
    id: 1,
    name: "Corte de Cabello Clásico",
    description: "Corte tradicional con tijeras y máquina",
    price: 25,
    duration: 30,
    category: "Cortes"
  },
  {
    id: 2,
    name: "Afeitado Tradicional",
    description: "Afeitado con navaja y toalla caliente",
    price: 20,
    duration: 25,
    category: "Barbería"
  },
  {
    id: 3,
    name: "Corte y Barba",
    description: "Servicio completo de corte de cabello y arreglo de barba",
    price: 40,
    duration: 50,
    category: "Combo"
  }
];

const serviceService = {
  // Obtener todos los servicios con filtros opcionales
  getServices: async () => {
    try {
      // Por ahora, retornamos los datos de prueba
      return mockServices;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Obtener un servicio específico por ID
  getServiceById: async (id: number) => {
    try {
      // Por ahora, retornamos un servicio de prueba
      return mockServices.find(s => s.id === id);
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },

  // Obtener todas las categorías de servicios
  getCategories: async () => {
    try {
      // Por ahora, retornamos categorías de prueba
      return ["Cortes", "Barbería", "Combo"];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};

export default serviceService; 