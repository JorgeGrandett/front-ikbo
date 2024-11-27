import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https:localhost',
  timeout: 5000,
});

import { ProductRepositoryImpl } from '../data/repositories/ProductRepositoryImpl';
import { ProductRepository } from '../domain/ProductRepository';

import { InventoryRepositoryImpl } from '../data/repositories/InventoryRepositoryImpl';
import { InventoryRepository } from '../domain/InventoryRepository';

export const productRepository: ProductRepository = new ProductRepositoryImpl(httpClient);
export const inventoryRepository: InventoryRepository = new InventoryRepositoryImpl(httpClient);
