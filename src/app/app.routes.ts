import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './category/categories/categories.component';
import { ProductsComponent } from './product/products/products.component';
import { CategoryComponent } from './category/category/category.component';
import { ProductComponent } from './product/product/product.component';

export const routes: Routes = [
    { path:'inicio', component:HomeComponent, title:"Inicio" },
    { path:'categories', component:CategoriesComponent, title:"Categorias" },
    { path:'createCategory', component:CategoryComponent, title:"Crear Categoria" },
    { path: 'editCategory/:id', component: CategoryComponent, title:"Editar Categoria" },
    { path:'products', component:ProductsComponent, title:"Productos" },
    { path:'createProduct', component:ProductComponent, title:"Crear producto" },
    { path: 'editProduct/:id', component: ProductComponent, title:"Editar Producto" },
    { path:'**', redirectTo:'/inicio', pathMatch:"full" }
];
