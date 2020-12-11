import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/product.modal';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @Input() products!: Product[];
  @Output() onRemoveProduct = new EventEmitter();
  @Output() onChangeQty = new EventEmitter();

  removeProduct(productID: number) {
    this.onRemoveProduct.emit(productID);
  }

  updateQuantity(inputElement: any) {
    this.onChangeQty.emit(inputElement);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
