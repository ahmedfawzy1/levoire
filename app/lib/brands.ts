import axios from 'axios';
import { db } from './db';

const baseUrl = typeof window === 'undefined' ? process.env.NEXTAUTH_URL : '';

export async function getBrandsServer(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;

    const brands = await db.brand.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await db.brand.count();
    const totalPages = Math.ceil(totalCount / limit);

    return { brands, totalCount, totalPages };
  } catch (error) {
    console.error('Error fetching brands from server', error);
    return { brands: [], totalCount: 0, totalPages: 0 };
  }
}

export async function getBrandByIdServer(id: number) {
  try {
    const brand = await db.brand.findUnique({
      where: { id },
    });
    return brand;
  } catch (error) {
    console.error('Error fetching brand by id from server', error);
    return null;
  }
}

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
      `${baseUrl}/api/brands?page=${page}&limit=${limit}`,
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
