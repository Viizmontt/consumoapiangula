import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [MessageService, ProductService],
  imports: [
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule,
    RouterModule,
    ProductComponent
  ],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  selectedPreduct!: Product;
  isDeleteInProgress: boolean = true;

  constructor(
    private productService: ProductService, 
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmation) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Producto eliminado correctamente',
          });
          this.loadProducts();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el producto',
          });
        }
      });
    }
  }

}