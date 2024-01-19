import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ApiService } from '../../utils/services/api.service';
import { IProduct } from '../../models/product.model';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruncateStringPipe } from '../../utils/pipes/truncate-string.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavComponent, DataTablesModule, FormsModule, CommonModule, ReactiveFormsModule, TruncateStringPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  // Variable que sirve para activar el nav de productos
  activeProducts: string = 'active';

  // Variable para hacer enrutamiento al login
  private _route = inject(Router);
  // Referencia a las funciones que consumen los servicios http
  private _apiServices = inject(ApiService);
  // Variable que contiene toda la lista de productos
  productList: IProduct[] = [];

  // Opciones de configuración de la tabla
  dtOptions: DataTables.Settings = {};
  //  Sirve para notificarle a la tabla que hay cambios en los datos y los vuelva a renderizar
  dtTrigger: Subject<any> = new Subject<any>();

  // Titulo del modal
  titleModal: string = '';
  // Producto seleccionado
  product?: IProduct | null = null;

  // Id del producto a eliminar
  idProductDelete: number = 0;

  // Variable que indica que el producto se esta modificando
  eliminandoProduct: boolean = false;
  // Variable que indica que el producto se esta editando
  editandoProducto: boolean = false;

  // Formulario de producto
  private formBuilder = inject(FormBuilder);
  //formaulario de loguin
  productForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  });

  // Variables que muestran los textos de los campos requeridos
  titleRequired: boolean = false;
  priceRequired: boolean = false;
  descriptionRequired: boolean = false;

  tableProducts = $('#tableProducts').DataTable({
    pagingType: 'simple_numbers',
    pageLength: 5,
    processing: true,
    lengthMenu: [5, 10, 25],
  });

  ngOnInit(): void {
    // Si no existe un logue se redirecciona a la pagina de login
    if (localStorage.getItem('login') !== 'true')
      this._route.navigate(['']);

    // Opciones del datatable
    this.dtOptions = {
      pagingType: "simple_numbers", //Muestra la paginación simple de la tabla
      pageLength: 5,
      lengthMenu: [5, 10, 25]
    }

    this.loadProducts();
  }

  // Función que carga la lista de productos
  loadProducts() {
    this._apiServices.getProducts().subscribe((data: IProduct[]) => {
      this.productList = data;
      // Se renderiza de nuevo la tabla
      this.dtTrigger.next(this.productList);
    });
  }

  // Se ejecuta cuando se desctruye el componente
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Función que se ejecuta cuando se desea editar un producto
  editProducto(id: number) {
    this.product = this.productList.find(p => p.id === id);
    this.titleModal = 'Edit product';

    // Se asignan los valores a los controles del formulario
    this.productForm.controls["title"].setValue(this.product?.title);
    this.productForm.controls["price"].setValue(this.product?.price);
    this.productForm.controls["description"].setValue(this.product?.description);

    this.openModalProduct();
  }

  newProduct() {
    this.titleModal = "New product";

    this.product = { id: 0, title: '', price: 0, description: '', image: '' };

    // Se limpian los valores
    this.productForm.controls["title"].setValue('');
    this.productForm.controls["price"].setValue('');
    this.productForm.controls["description"].setValue('');

    this.openModalProduct();
  }

  saveProduct(event: Event) {
    event.preventDefault;
    if (this.productForm.value.title === "") {
      this.titleRequired = true;
      return;
    }
    if (this.productForm.value.price === null) {
      this.priceRequired = true;
      return;
    }
    if (this.productForm.value.description === "") {
      this.descriptionRequired = true;
      return;
    }

    this.product!.title = this.productForm.value.title;
    this.product!.price = this.productForm.value.price;
    this.product!.description = this.productForm.value.description;

    this.editandoProducto = true;
    // Se esta editando un producto
    if (this.product!.id != 0) {
      this._apiServices.updateProduct(this.product!.id, this.product!).subscribe((data: IProduct) => {
        this.product = data;
        this.editandoProducto = false;
        this.closeModalProduct();

        this.renderTable();
      });
    }
    else {
      this._apiServices.newProduct(this.product!).subscribe((data: IProduct) => {
        this.productList.push(data);
        this.editandoProducto = false;
        this.closeModalProduct();
        
        this.renderTable();
      })
    }
  }

  renderTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Se destruye la tabla
      dtInstance.destroy();
      // Se renderiza de nuevo
      this.dtTrigger.next(this.productList);
    });
  }

  // Función que se ejecuta cuando se desea eliminar un producto
  deleteProduct(id: number) {
    this.idProductDelete = id;
    this.openModalDelete();
  }

  confirmDeleteProduct(id: number) {
    this.eliminandoProduct = true;
    this._apiServices.deleteProduct(id).subscribe((data: IProduct) => {
      this.productList.splice(this.productList.findIndex(p => p.id === id), 1);
      this.closeModalDelete();
      this.eliminandoProduct = false;
      this.renderTable();
    })
  }

  // Función que abre el modal deproductos
  openModalProduct() {
    const modal = document.getElementById("modalProduct");
    if (modal != null)
      modal.style.display = 'block';
  }

  // Función que cierra el modal de productos
  closeModalProduct() {
    const modal = document.getElementById("modalProduct");
    if (modal != null)
      modal.style.display = 'none';
  }

  // Función que abre el modal de eliminar
  openModalDelete() {
    const modal = document.getElementById("deleteProduct");
    if (modal != null)
      modal.style.display = 'block';
  }

  // Función que cierra el modal de eliminar
  closeModalDelete() {
    const modal = document.getElementById("deleteProduct");
    if (modal != null)
      modal.style.display = 'none';
  }

  focusTitle() {
    this.titleRequired = false;
  }
  focusPrice() {
    this.priceRequired = false;
  }
  focusDescription() {
    this.descriptionRequired = false;
  }
}
