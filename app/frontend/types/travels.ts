export interface Travel {
  id: string;
  name: string;
  description: string;
  status: string;
  owner_email: string;
  origin: string; // Lugar de origen
  destination: string; // Lugar de destino
  distance_km?: number; // Distancia estimada en kilómetros
  start_date?: string; // Fecha y hora de inicio
  end_date?: string; // Fecha y hora de finalización
  estimated_budget?: number; // Presupuesto estimado
  currency?: string; // Moneda del presupuesto
  max_participants?: number; // Número máximo de participantes
  current_participants?: number; // Número actual de participantes
  travel_type?: string; // Tipo de viaje (e.g., "business", "leisure")
  notes?: string; // Notas adicionales
  is_public: boolean; // Indica si el viaje es público o privado
  owner_travel_evaluations: TravelEvaluation[]; // Evaluaciones del propietario
  travel_requests: TravelRequest[];
  travel_evaluations: TravelEvaluation[];
  travel_chat_messages: TravelChatMessage[];
  average_rating?: number; // Calificación promedio opcional
  participants: Participant[];
}

export interface TravelCreateForm {
  name: string;
  description: string;
  origin?: string; // Lugar de origen
  destination?: string; // Lugar de destino
  start_date?: string; // Fecha y hora de inicio
  end_date?: string; // Fecha y hora de finalización
  estimated_budget?: number; // Presupuesto estimado
  currency?: string; // Moneda
  max_participants?: number; // Número máximo de participantes
  travel_type?: string; // Tipo de viaje
  notes?: string; // Notas adicionales
  is_public: boolean; // Público o privado
}

export interface TravelRequest {
  id: string;
  user_id: string;
  travel_id: string;
  message: string;
  created_at: string; // Fecha de creación
  status: "pending" | "accepted" | "rejected"; // Estado del request
}

export interface TravelEvaluation {
  id: string;
  user_name: string;
  rating: number; // Calificación de 1 a 5
  comment: string; // Comentario del usuario
  created_at: string; // Fecha de creación
  user_id: string;
}

export interface TravelEvaluationForm {
  rating: number; // Calificación de 1 a 5
  comment: string; // Comentario del usuario
}

export interface TravelChatMessage {
  id: string;
  travel_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface TravelChatMessageResponse {
  message: {
    id: string;
    content: string;
    sender_id: string;
    sender_name: string;
    created_at: string;
  };
}

export interface Participant {
  id: string;
  name: string;
  email: string;
}
