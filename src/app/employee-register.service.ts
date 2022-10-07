import { Injectable } from '@angular/core';
import { Employee } from './models/employee.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeRegisterService {

  readonly employeeAPIUrl = "https://localhost:7213/api"
  constructor(private http:HttpClient) { }

  getEmployeeList():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.employeeAPIUrl + '/Employee')
  }

  addEmployee(data:any){
    return this.http.post(this.employeeAPIUrl + '/employee', data);
  }

  updateEmployee(id:number|string, data:any){
    return this.http.put(this.employeeAPIUrl + `/employee/${id}`, data);
  }

  deleteEmployee(id:number|string){
    return this.http.delete(this.employeeAPIUrl +  `/employee/${id}`);
  }


  getDepartmentList():Observable<any[]>{
    return this.http.get<any>(this.employeeAPIUrl + '/departments');
  }
}
