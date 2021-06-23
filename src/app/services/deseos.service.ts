import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  List: Lista[] = [];
  constructor() {
    this.loadStorage();
  }
  createList(title: string) {
    const newList = new Lista(title);
    this.List.push(newList);
    this.saveStorage();
    return newList.id;
  }
  getListById(Id: string | number) {
    Id = Number(Id);
    return this.List.find(listdata => {
      return listdata.id === Id;
    })
  }
  deleteList(list: Lista) {
    this.List = this.List.filter(filterData => {
      return filterData.id !== list.id;
    });
    this.saveStorage();
  }
  /*  editList(list: Lista, title: string) {
     const listEdid = this.List.filter(filterData => {
       return filterData.id === list.id;
     });
 
   } */
  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.List));
  }
  loadStorage() {
    if (localStorage.getItem('data')) {
      this.List = JSON.parse(localStorage.getItem('data'));
    }
    else {
      this.List = [];
    }
  }
}
