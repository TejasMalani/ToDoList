import { Injectable } from "@angular/core";
import { Todo } from "./model";

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  userObject = [];//bahen
  selectedObject = [];
  key = 'testKey';
  selectedId = null;
  constructor() {
    this.userObject = this.getData(this.key);
  }
  //  Get selected data function
  getSelectedData(i) {
    return this.userObject[i];  }
  //  Retrive data function
  getData(key: string): any {
    console.log(this.userObject);
    return (this.userObject = JSON.parse(localStorage.getItem(key)));
  }
  //  Save data function
  setData(key: string, data: any) {
    if (this.userObject == null) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      console.log(this.selectedId);
      this.userObject.push(data);
      localStorage.setItem(this.key, JSON.stringify(this.userObject));
    }
  }
   // Update data function
  updateItem(changes) {
    this.userObject[this.selectedId] = changes;
    localStorage.setItem(this.key, JSON.stringify(this.userObject));
  }
  // Delete data function
  deleteItem(i) {
    this.userObject.splice(i, 1);
    localStorage.setItem(this.key, JSON.stringify(this.userObject));
  }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      let varA;
      let varB;
      if (key !== 'date') {
        varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
        varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
      } else {
        varA = Date.parse(a[key]);
        varB = Date.parse(b[key]);
      }
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }
}
