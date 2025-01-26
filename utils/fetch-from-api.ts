import axios from 'axios';

export const fetchFromApi = async (url: string) => {
  try {
    const apiResponse = await axios.get(url);
    return [null, apiResponse.data];
  } catch (error) {
    return ['Error while fetching from API', null];
  }
};
