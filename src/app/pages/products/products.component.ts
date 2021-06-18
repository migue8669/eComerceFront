import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Products } from 'src/app/model/Products.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  idType: any;
  i: number = 0;
  filterPost='';
  productsObject: any;
  products!: Products;
  updateValidate: boolean = false;
  contador: number = 0;
  constructor(private productsService: ProductService) {}
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    basePrice: new FormControl(''),
    taxRate: new FormControl(''),
    productStatus: new FormControl(''),
    stock: new FormControl(''),
  });
  ngOnInit(): void {
    this.getProducts();
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if ((this.updateValidate = true)) {
      console.log('updateValidate');
      console.log(this.i);
      console.log(this.productsObject);
      console.log(this.productForm.value);

      this.productsService
        .update(this.productForm.value.id, this.productForm.value)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.productsObject.length == 0) {
      this.productsService
        .create(this.productForm.value)
        .subscribe((response) => {
          console.log(response);
        });
      formDirective.resetForm();
    } else {
      for (let el of this.productsObject) {
        console.log(el);
        if (el.id == this.productForm.value.id) {
          alert('Ya existe un empleado con esa identificacion');
          formDirective.resetForm();

          break;
        } else {
          this.contador++;
          this.productForm.value.id = this.contador;
          this.productsService
            .create(this.productForm.value)
            .subscribe((response) => {
              console.log(response);
            });
          formDirective.resetForm();

          break;
        }
      }
    }
  }

  getProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.productsObject = data;
      this.contador = data.length;
    });
  }
  update(index: any): void {
    this.i = index;
    this.updateValidate = true;
    this.productForm = this.productsObject[index];
    this.productForm = new FormGroup({
      id: new FormControl(this.productsObject[index].id),

      name: new FormControl(this.productsObject[index].name),
      description: new FormControl(this.productsObject[index].description),
      basePrice: new FormControl(this.productsObject[index].basePrice),
      taxRate: new FormControl(this.productsObject[index].taxRate),
      productStatus: new FormControl(this.productsObject[index].productStatus),
      stock: new FormControl(this.productsObject[index].stock),
    });
  }
  delete(i: any): void {
    console.log(i);
    this.productsService.delete(i).subscribe((response) => {
      console.log(response);
    });
  }


}
