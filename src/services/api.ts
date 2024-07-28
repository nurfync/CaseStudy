import axios from 'axios';
import {
  PromotionResponse,
  TagsResponse,
  PromotionsResponse,
} from '../types/types';

const api = axios.create({
  baseURL: 'https://api.extrazone.com',
  headers: {
    'Content-Type': 'application/json',
    'X-Country-Id': 'TR',
    'X-Language-Id': 'TR',
  },
});

export const fetchPromotions = async (): Promise<PromotionsResponse> => {
  const response = await api.get('/promotions/list?Channel=PWA');
  return response.data;
};

export const fetchTags = async (): Promise<TagsResponse> => {
  const response = await api.get('/tags/list');
  return response.data;
};

export const fetchPromotionDetail = async (
  id: number,
): Promise<PromotionResponse> => {
  const response = await api.get<PromotionResponse>(`/promotions?Id=${id}`);
  return response.data;
};
