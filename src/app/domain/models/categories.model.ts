export interface CategoriesModel {
  error: boolean;
  codigo: string;
  message: string;
  menuItems: MenuItemCat[];
}

export interface MenuItemCat {
  idMenu: number;
  descripción: string;
}
