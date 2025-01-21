import { Component  } from '@angular/core';
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [RouterLink, CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    connected: Boolean = false;

}
