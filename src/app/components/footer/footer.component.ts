import { SimpleChange, SimpleChanges } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PromoCode } from 'src/app/promocode.modal';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() subTotal!: number;
  @Input() tax!: number;
  @Input() total!: number;
  @Input() isDiscount!: boolean;
  @Input() valueDiscount!: number;
  @Output() checkPromoCode = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  checksPromoCode(inputElement: any) {
    this.checkPromoCode.emit(inputElement);
  }

  discount!: number;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (this.isDiscount) {
      this.discount = this.subTotal * this.valueDiscount;
      this.total = this.subTotal + this.tax - this.discount;
    } else {
      this.total = this.subTotal + this.tax;
    }
  }
}
