import axios from 'axios';

const baseUrl = typeof window === 'undefined' ? process.env.NEXTAUTH_URL : '';

export const getAllBrands = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/brands`);
    const brands = res.data;
    return brands;
  } catch (error) {
    console.error('Error fetching brands', error);
    return [];
  }
};

export const getBrands = async (page: number, limit: number) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/brands?page=${page}&limit=${limit}`
    );
    const brands = res.data;
    return brands;
  } catch (error) {
    console.error('Error fetching brands', error);
    return [];
  }
};

export const getBrandById = async (id: number) => {
  try {
    const res = await axios.get(`${baseUrl}/api/brands/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching brand by id', error);
    return null;
  }
};
