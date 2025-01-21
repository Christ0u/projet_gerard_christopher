import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, FooterComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp05_gerard_christopher';

}
