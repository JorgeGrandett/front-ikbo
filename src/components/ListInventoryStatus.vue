<!-- TYPESCRIPT -->
<script lang="ts">
import { onMounted, ref } from "vue";
import { alert } from "../core/utils/sweetAlerts";
import { GetInventoryStatusUseCase } from "../core/usecases/Inventory/GetInventoryStatus";
import { inventoryRepository } from "../infrastructure/HttpClient";

export default {
    name: "ListInventoryStatus",
    emits: ["close"],
    setup(_, { emit }) {

        const getInventoryStatusUseCase: GetInventoryStatusUseCase = new GetInventoryStatusUseCase(inventoryRepository);

        const inventoryList = ref<Array<any>>([]);

        onMounted(async () => {
            inventoryList.value = await getInventoryStatusUseCase.execute();
            if (inventoryList.value.length === 0) alert('Inventario vacío', 'No hay registros en el inventario', 'info', 'Aceptar')
        });

        const formatDate = (date: Date): string => {
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            };
            return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
        };

        const getStatusClass = (status: 'Vencido' | 'Por Vencer' | 'Vigente'): string => {
            switch (status) {
                case 'Vencido':
                    return 'bg-red';
                case 'Por Vencer':
                    return 'bg-yellow';
                case 'Vigente':
                    return 'bg-green';
            }
        };

        const back = (): void => {
            emit("close");
        }

        return {
            back,
            inventoryList,
            formatDate,
            getStatusClass
        };
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
            <h1>Ver estado del inventario</h1>
        </div>
        <main>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID Inventario</th>
                        <th>ID Producto</th>
                        <th>Nombre Producto</th>
                        <th>Código de Barras</th>
                        <th>Lote</th>
                        <th>Cantidad</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in inventoryList" :key="item.idInventory">
                        <td>{{ item.idInventory }}</td>
                        <td>{{ item.idProduct }}</td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.productBarcode }}</td>
                        <td>{{ item.batch }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ formatDate(item.expirationDate) }}</td>
                        <td :class="getStatusClass(item.status)">{{ item.status }}</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
</template>

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

.bg-green {
    background-color: #d4edda;
    color: #155724;
}

.bg-yellow {
    background-color: #fff3cd;
    color: #856404;
}

.bg-red {
    background-color: #f8d7da;
    color: #721c24;
}
</style>
