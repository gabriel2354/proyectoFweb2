import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [RouterModule, CommonModule],  // Añade CommonModule aquí
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  usuario: any = {};  // Información del usuario
  carrito: any[] = [];  // Productos en el carrito
  total: number = 0;  // Total de la compra

  constructor(private router: Router) {}

  ngOnInit(): void {
    const factura = localStorage.getItem('factura');
    if (factura) {
      const facturaObj = JSON.parse(factura);

      // Asignar los datos del usuario de la factura
      this.usuario = {
        nombre: facturaObj.usuario,
        apellido: facturaObj.apellido,
        correo: facturaObj.correo,
        direccion: facturaObj.direccion
      };

      // Asignar los productos en el carrito
      this.carrito = facturaObj.peliculas;
      this.total = facturaObj.total;

      // Verifica los productos en el carrito y total
      console.log('Factura cargada:', facturaObj);
    } else {
      this.router.navigate(['/home']);  // Redirigir al home si no se encuentra factura
    }
  }

  descargarPDF() {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(20);
    doc.text('Factura de Compra', 20, 20);

    // Información del usuario
    doc.setFontSize(12);
    doc.text(`Nombre: ${this.usuario.nombre} ${this.usuario.apellido}`, 20, 30);
    doc.text(`Email: ${this.usuario.correo}`, 20, 40);
    doc.text(`Dirección: ${this.usuario.direccion}`, 20, 50);

    // Productos comprados
    let yPosition = 60;
    doc.text('Productos Comprados:', 20, yPosition);
    this.carrito.forEach((item, index) => {
      yPosition += 10;
      doc.text(`${item.nombre} - $${item.precio}`, 20, yPosition);
    });

    // Total
    yPosition += 20;
    doc.text(`Total: $${this.total}`, 20, yPosition);

    // Descargar el PDF
    doc.save('factura-compra.pdf');
  }
}
