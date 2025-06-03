// alert.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    mostrarAlerta(mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: tipo,
            title: mensaje
        });
    }

    mostrarAlertaModal(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' = 'info'): Promise<any> {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: tipo,
            confirmButtonText: 'Aceptar'
        });
    }

    // alert.service.ts
    mostrarConfirmacion(
        titulo: string,
        mensaje: string,
        confirmButtonText: string = 'Confirmar',
        cancelButtonText: string = 'Cancelar'
    ): Promise<boolean> {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText
        }).then((result) => result.isConfirmed);
    }
}