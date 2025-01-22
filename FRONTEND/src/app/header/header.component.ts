import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { BasketState } from '../basket/basket.state';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    connected: Boolean = false;
    @Select(BasketState.getTotalItems) totalItems$!: Observable<number>;

    constructor() { }
    ngOnInit(): void { }
}
