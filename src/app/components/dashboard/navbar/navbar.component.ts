import { Component } from '@angular/core';
import { Menu } from './../../../interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menu: Menu[] = [];

  constructor(private _menuService: MenuService) { }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
    })
  }
}
