<!-- TYPESCRIPT -->
<script lang="ts">
import { Ref, ref } from 'vue'
import { validateFormat } from '../core/utils/validateFormat';
import { alert } from '../core/utils/sweetAlerts';
import { Product } from '../core/entities/Product';
import { CreateProduct } from '../core/usecases/Product/CreateProduct';
import { productRepository } from '../infrastructure/HttpClient';

export default {
	name: 'CreateProduct',
	emits: ['close'],
	setup(_, { emit }) {

		const createProductUseCase: CreateProduct = new CreateProduct(productRepository);

		const productName: Ref<string> = ref<string>('');
		const productBarcode: Ref<string> = ref<string>('');

		const create = async():Promise<void> => {
			if (!validateFormat(productName.value, new RegExp(/^[a-zA-Z0-9\s]{1,100}$/)) || !validateFormat(productBarcode.value, new RegExp(/^\d{1,50}$/))) {
				alert('Error', 'Campos faltantes o incorrectos', 'warning', 'Aceptar');
				return;
			}

			const product = new Product(0, productName.value, productBarcode.value);
			if(await createProductUseCase.execute(product)) back();
		};

		const back = ():void => {
			emit('close');
		};

		return {
			back,
			productName,
			productBarcode,
			create
		}
	},
};
</script>

<!-- HTML -->
<template>
	<div class="main-frame">
		<div class="tittle-container">
			<div>
				<button v-on:click="back">Volver</button>
			</div>
			<h1>Crear producto</h1>
		</div>
		<main>
			<form @submit.prevent="create">
				<div>
					<label for="name-product">Nombre del producto:</label>
					<input id="name-product" type="text" v-model="productName">
				</div>
				<div>
					<label for="barcode-product">Código de barras:</label>
					<input id="barcode-product" type="text" v-model="productBarcode">
				</div>
				<button type="submit">Crear</button>
			</form>
		</main>
	</div>
</template>

vueinit
<!-- CSS -->
<style scoped>
	.tittle-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
	}

	.tittle-container div {
		width: 20%;
	}

	.tittle-container h1 {
		width: 60%;
		display: flex;
		justify-content: center;
		margin-right: 20%;
	}

	.back-button {
		cursor: pointer;
		color: blue;
		text-decoration: underline;
	}
</style>