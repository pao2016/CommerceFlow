import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  back(): void {
    this.router.navigate(['/products']); // Redirige a la lista de productos
  }
}
