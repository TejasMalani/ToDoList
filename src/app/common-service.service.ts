import { Injectable } from "@angular/core";
import { Todo } from "./model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  userObject = Array<Todo>();//bahen
  selectedObject = [];
  key = 'testKey';
  selectedId = null;
  userDataSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

    userData = this.userDataSource.asObservable();

    constructor() {
     this.getData(this.key);
    }
    updateUserData(data) {
        this.userDataSource.next(data);
    }

    addData(dataObj) {
        const currentValue = this.userDataSource.value;
        const updatedValue = [...currentValue, dataObj];
        this.userDataSource.next(updatedValue);
    }

  //  Get selected data function
  getSelectedData(i) {
    return this.userObject[i];
  }
  //  Retrive data function
  getData(key: string): any {
    this.userObject = JSON.parse(localStorage.getItem(key));
    this.updateUserData(this.userObject);
    return this.userData ;
  }
  //  Save data function
  setData(key: string, data: any) {
    if (this.userObject == null) {
      localStorage.setItem(key, JSON.stringify(data));
      this.updateUserData(data);
    } else {
      console.log(data);
      this.userObject.push(data);
      localStorage.setItem(this.key, JSON.stringify(this.userObject));
      this.updateUserData(this.userObject);
    }
  }
   // Update data function
  updateItem(changes) {
    console.log(changes);
    this.userObject[this.selectedId] = changes;
    console.log(this.userObject);
    localStorage.setItem(this.key, JSON.stringify(this.userObject));
    this.updateUserData(this.userObject);
  }
  // Delete data function
  deleteItem(i) {
    this.userObject.splice(i, 1);
    localStorage.setItem(this.key, JSON.stringify(this.userObject));
    this.updateUserData(this.userObject);
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
