import Swal, { SweetAlertIcon } from 'sweetalert2';

export function alert (tittle: string, text: string, icon: SweetAlertIcon = 'info', confirmButtonText: string = 'Ok'):void {
    Swal.fire({
        title: tittle,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText
    });
};