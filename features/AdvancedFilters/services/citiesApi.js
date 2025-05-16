import { api } from '../../../services/api';

export async function fetchCitiesByEntityId(entityId) {
  try {
    const response = await api.get('cities', {
      params: {
        where: JSON.stringify({ entityId }),
        limit: 1012,
      },
    });
    return response.data?.results || [];
  } catch (e) {
    console.error('Failed to fetch cities', e);
    return [];
  }
}
