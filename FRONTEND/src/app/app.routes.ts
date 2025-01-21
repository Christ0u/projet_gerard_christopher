import { Routes } from "@angular/router";
import { ProductsListComponent } from "./products-list/products-list.component";
import { BasketComponent } from "./basket/basket.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
    {
        path: "", redirectTo: "home", pathMatch: "full"
    },
    {
        path: "home", component: ProductsListComponent
    },
    {
        path: "basket", component: BasketComponent
    },
    {
        path: "register", component: RegisterComponent
    },
    {
        path: "login", component : LoginComponent
    },
    {
        path: "**", redirectTo: "home"
    },
];