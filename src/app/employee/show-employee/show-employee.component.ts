import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { Department } from 'src/app/models/department.model';
import { EmployeeRegisterService } from 'src/app/employee-register.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent {

  employeeList: Employee[] = [];
  departmentList: Department[] = [];
  departmentTypeList:any=[];

  employee : Employee = {
    employeeId:0,
    firstName:'',
    lastName:'',
    email:'',
    phoneNr:'',
    address:'',
    gender:'',
    salary:0,
    departmentId:0,
  }

  //Map to display data associate with foreign keys
  departmentMap:Map<number, string> = new Map()

  constructor(private service:EmployeeRegisterService) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartments();
    this.refreshDepartmentMap();
  }


  //Variables
  modalTitle:string = '';
  activateAddEditEmployeeComponent:boolean=false;

  modalAdd(){
    this.employee={
      employeeId:0,
      firstName:'',
      lastName:'',
      address:'',
      salary:0,
      departmentId:0,
      email:'',
      phoneNr:'',
      gender:''
    }
    this.modalTitle = "Add Employee";
    this.activateAddEditEmployeeComponent=true;

  }

  modalEdit(employeeItem:Employee){
    this.employee = employeeItem;
    this.modalTitle = "Update Employee";
    this.activateAddEditEmployeeComponent=true;
  }

  delete(employeeItem:Employee){
    if(confirm(`Are you sure you want to delete ${employeeItem.firstName} ${employeeItem.lastName}(Id: ${employeeItem.employeeId}) from the system?`)){
      this.service.deleteEmployee(employeeItem.employeeId).subscribe(response => {
        
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }
  
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess){
          showDeleteSuccess.style.display="block";
        }
        setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display="none"
          }
        }, 4000);
        
        this.service.getEmployeeList().subscribe(response => { 
          this.employeeList = response;
        });

      });
    }
  }

  modalClose(){
    this.activateAddEditEmployeeComponent=false;
    this.service.getEmployeeList().subscribe(response => { 
      this.employeeList = response;
    });
  }
  

  getAllEmployees(){
    this.service.getEmployeeList().subscribe(response => { 
      this.employeeList = response;
    });
  }

  getAllDepartments(){
    this.service.getDepartmentList().subscribe(response =>{
      this.departmentList=response;
    })
  }


  refreshDepartmentMap(){
    this.service.getDepartmentList().subscribe(
      data=>{
        this.departmentTypeList = data;

        for(let i =0; i<data.length; i++){
          this.departmentMap.set(this.departmentTypeList[i].departmentId, this.departmentTypeList[i].departmentName);
        }
      }
    )
  }
}
