import { Product } from '../../../core/entities/Product';
import { ProductRepository } from '../../../domain/ProductRepository';
import { alert } from '../../../core/utils/sweetAlerts';
import { HttpResponseFormat } from '../../entities/responseFormat';

export class CreateProduct {
	constructor(private productRepository: ProductRepository) { };

	async execute(product: Product): Promise<boolean> {
		try {
			const response: HttpResponseFormat = await this.productRepository.createProduct(product);
			alert('Producto creado', response.getMessage().toString(), 'success', 'Aceptar');
			return true;
		} catch (error: any) {
			console.log(error);
			alert('Error', error.response.data.message, 'error', 'Aceptar');
			return false;
		}
	};
}