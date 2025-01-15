import authedAxios from "./axios/authedAxios";
import type { Travel, TravelEvaluation, TravelEvaluationForm, TravelChatMessage, TravelChatMessageResponse } from 'types/travels';

export interface TravelResponse {
  travel: Travel;
}

export interface TravelEvaluationResponse {
  evaluation: TravelEvaluation;
}

export interface TravelsResponse {
  travels: Travel[];
}

export interface TravelCreateForm {
  name: string;
  description: string;
  status?: string;
}

interface GetTravelsParams {
  start_date?: string;
}

export interface TravelCreateRequest {
  travel: TravelCreateForm;
}

export interface TravelRequestCreateForm {
  message: string;
}

export interface TravelRequestUpdateForm {
  message?: string;
  status?: string;
}

export const getTravels = async (params: GetTravelsParams = {}): Promise<TravelsResponse> => {
  const response = await authedAxios.get<TravelsResponse>('/api/v1/travels', {
    params,
  });
  return response.data;
};

export const getTravel = async (id: string): Promise<TravelResponse> => {
  const response = await authedAxios.get<TravelResponse>(`/api/v1/travels/${id}`);
  return response.data;
};

export const createTravel = async (travel: TravelCreateForm): Promise<TravelResponse> => {
  const response = await authedAxios.post<TravelResponse>('/api/v1/travels', { travel });
  return response.data;
};

export const updateTravel = async (id: string, travel: Partial<TravelCreateForm>): Promise<TravelResponse> => {
  const response = await authedAxios.put<TravelResponse>(`/api/v1/travels/${id}`, { travel });
  return response.data;
};

export const deleteTravel = async (id: string): Promise<{ message: string }> => {
  const response = await authedAxios.delete<{ message: string }>(`/api/v1/travels/${id}`);
  return response.data;
};

export const createTravelRequest = async (travelId: string, travelRequest: TravelRequestCreateForm): Promise<{ travel_request: TravelRequestCreateForm }> => {
  const response = await authedAxios.post<{ travel_request: TravelRequestCreateForm }>(
    `/api/v1/travels/${travelId}/request`,
    { travel_request: travelRequest }
  );
  return response.data;
};

export const updateTravelRequest = async (
  travelId: string,
  travelRequestId: string,
  data: TravelRequestUpdateForm
): Promise<{ travel_request: TravelRequestUpdateForm }> => {
  const response = await authedAxios.patch<{ travel_request: TravelRequestUpdateForm }>(
    `/api/v1/travels/${travelId}/requests/${travelRequestId}/update_request`,
    { travel_request: data }
  );
  return response.data;
};

export const createTravelEvaluation = async (
  travelId: string,
  evaluation: TravelEvaluationForm
): Promise<TravelEvaluationResponse> => {
  const response = await authedAxios.post<TravelEvaluationResponse>(
    `/api/v1/travels/${travelId}/travel_evaluations`,
    { travel_evaluation: evaluation }
  );
  return response.data;
};

export const createTravelChatMessage = async (
  travelId: string,
  message: { content: string }
): Promise<TravelChatMessageResponse> => {
  const response = await authedAxios.post<TravelChatMessageResponse>(
    `/api/v1/travels/${travelId}/travel_chats`,
    { travel_chat_message: message }
  );
  return response.data;
};
