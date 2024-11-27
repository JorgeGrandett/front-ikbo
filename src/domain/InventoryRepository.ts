import { Inventory } from '../core/entities/Inventory';
import { HttpResponseFormat } from '../core/entities/responseFormat';

export interface InventoryRepository {
  manageInventory(inventory: Inventory): Promise<HttpResponseFormat>;
  getInventory(): Promise<HttpResponseFormat>;
  getInventoryStatus(): Promise<HttpResponseFormat>;
}