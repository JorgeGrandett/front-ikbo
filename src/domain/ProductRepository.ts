import { Product } from '../core/entities/Product';
import { HttpResponseFormat } from '../core/entities/responseFormat';

export interface ProductRepository {
  createProduct(product: Product): Promise<HttpResponseFormat>;
  getProducts(): Promise<HttpResponseFormat>;
}