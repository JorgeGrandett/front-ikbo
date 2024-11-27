import { Inventory } from '../../entities/Inventory';
import { InventoryRepository } from '../../../domain/InventoryRepository';
import { alert } from '../../../core/utils/sweetAlerts';
import { HttpResponseFormat } from '../../entities/responseFormat';

export class ManageInventory {
	constructor(private inventoryRepository: InventoryRepository) { };

	async execute(inventory: Inventory): Promise<boolean> {
		try {
			const response: HttpResponseFormat = await this.inventoryRepository.manageInventory(inventory);
			alert('Inventario creado', response.getMessage().toString(), 'success', 'Aceptar');
			return true;
		} catch (error: any) {
			alert('Error', error.response.data.message, 'error', 'Aceptar');
			return false;
		}
	};
}