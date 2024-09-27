import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { CategoriesComponent } from './category/categories/categories.component';
import { ProductsComponent } from './product/products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    TabMenuModule, 
    RouterOutlet, 
    CategoriesComponent, 
    ProductsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Categorias', icon: 'pi pi-chart-line', routerLink: '/categories' },
      { label: 'Productos', icon: 'pi pi-list', routerLink: '/products' },
    ];
  }
}