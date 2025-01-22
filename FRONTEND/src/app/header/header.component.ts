import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasketState } from '../basket/basket.state';
import { UserAuthService } from '../services/user-auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    connected: Boolean = false;
    @Select(BasketState.getTotalItems) totalItems$!: Observable<number>;

    constructor(private userAuthService: UserAuthService, private router: Router) {}

    ngOnInit(): void {
        this.userAuthService.isAuthenticated().subscribe(isAuthenticated => {
            this.connected = isAuthenticated;
        });
    }

    logout() {
        this.userAuthService.logout();
        this.connected = false;
        this.router.navigate(['/home']);
    }
}