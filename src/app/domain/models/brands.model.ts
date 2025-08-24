export interface BrandsModel {
  error: boolean;
  codigo: string;
  message: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  idItem: number;
  nombreMarca: string;
  descripción: string;
  imagen: string;
}
