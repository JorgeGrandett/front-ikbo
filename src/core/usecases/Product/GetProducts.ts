import { Product } from '../../../core/entities/Product';
import { ProductRepository } from '../../../domain/ProductRepository';
import { alert } from '../../../core/utils/sweetAlerts';
import { HttpResponseFormat } from '../../entities/responseFormat';

export class GetProducts {
	constructor(private productRepository: ProductRepository) { };

	async execute(): Promise<Array<Product>> {
		try {
			const response: HttpResponseFormat = await this.productRepository.getProducts();
			
			return response.getData();
		} catch (error: any) {
			alert('Error', error.response.data.message, 'error', 'Aceptar');
			return [];
		}
	};
}