import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from 'src/app/product.modal';
import { PromoCode } from 'src/app/promocode.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'PRODUCT ITEM NUMBER 1',
      description: 'Description for product item number 1',
      thumbnail: '././assets/image/img.jpg',
      price: 5.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'PRODUCT ITEM NUMBER 2',
      description: 'Description for product item number 2',
      thumbnail: '././assets/image/imgg.jpg',
      price: 9.99,
      quantity: 2,
    },
    {
      id: 3,
      name: 'PRODUCT ITEM NUMBER 3',
      description: 'Description for product item number 1',
      thumbnail: '././assets/image/img.jpg',
      price: 14.99,
      quantity: 3,
    },
  ];

  promoCodes: PromoCode[] = [
    {
      code: 'Winter',
      discountValue: 0.2
    },
    {
      code: 'Autumn',
      discountValue: 0.3
    },
    {
      code: 'Summer',
      discountValue: 0.5
    }
  ]
  subTotal!: number;
  tax!: number;
  total!: number;
  numberItems!: number;
  isDiscount!: boolean;
  valueDiscount!: number;
  promoCodeValue: string = '';

  ngOnInit(): void {
    this.subTotal = this.products.reduce((subTotal, currentValue) => {
      return subTotal + currentValue.price * currentValue.quantity;
    }, 0);

    this.tax = this.subTotal * 0.1;
    this.total = this.subTotal + this.tax;

    this.numberItems = this.products.reduce((total, currentValue) => {
      return total + currentValue.quantity;
    }, 0);
  }

  checkPromoCode(inputElement: any) {
    if (this.promoCodes.some(function(promoCode) {
      return promoCode.code == inputElement.value
    })) {
      this.isDiscount = true;
      const index = this.promoCodes.findIndex(
        (promoCode) => promoCode.code == inputElement.value
      );
      alert(`Promo Code ${this.promoCodes[index].code} with ${this.promoCodes[index].discountValue * 100}% discount is applied!`);
      this.valueDiscount = this.promoCodes[index].discountValue;
    } else {
      for(let i = 0; i < this.promoCodes.length; i++) {
        this.promoCodeValue += `'${this.promoCodes[i].code}' with ${this.promoCodes[i].discountValue * 100}% discount`;
        if (i != this.promoCodes.length - 1) {
          this.promoCodeValue += " or ";
        }
      }
      alert(`Please try code ${this.promoCodeValue}`);
      this.isDiscount = false;
    }
  }

  removeProduct(productID: number) {
    const index = this.products.findIndex(
      (product) => product.id === productID
    );
    this.products.splice(index, 1);

    this.numberItems = this.products.reduce((total, currentValue) => {
      return total + currentValue.quantity;
    }, 0);

    this.subTotal = this.products.reduce((subTotal, currentValue) => {
      return subTotal + currentValue.price * currentValue.quantity;
    }, 0);

    this.tax = this.subTotal * 0.1;
    this.total = this.subTotal + this.tax;
  }

  updateQuantity(inputElement: any) {

    let value: any = inputElement.value;
    const index = this.products.findIndex((product) => product.id == inputElement.id);

    if (value != "") {
      if (value < 1) {
        inputElement.value = "1";
      } else if (value > 99) {
        inputElement.value = "99";
      }
      this.products[index].quantity = Number(inputElement.value);
      this.numberItems = this.products.reduce((total, currentValue) => {
        return (total + currentValue.quantity);
      }, 0);

      this.subTotal = this.products.reduce((subTotal, currentValue) => {
        return subTotal + currentValue.price * currentValue.quantity;
      }, 0);

      this.tax = this.subTotal * 0.1;
      this.total = this.subTotal + this.tax;
    }
  }
}
