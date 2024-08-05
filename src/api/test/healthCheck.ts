import apiClient from '..';

const healthCheck = async () => {
  // TODO: 추후 API 호출로 변경
  const response = await apiClient.get('/healthcheck');
  return response.data;
};

export default healthCheck;
