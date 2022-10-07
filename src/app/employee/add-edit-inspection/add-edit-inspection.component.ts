import { Component, Input, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { EmployeeRegisterService } from 'src/app/employee-register.service';
import { Employee } from 'src/app/models/employee.model';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  employeeList: Employee[] = [];
  departmentList: Department[] = [];

  constructor(private service:EmployeeRegisterService) { }

  @Input() employee:Employee = {
    employeeId:0,
    firstName:"",
    lastName:"",
    email:"",
    phoneNr:"",
    address:"",
    gender:"",
    salary:0,
    departmentId:0
  }


  ngOnInit(): void {
    

    this.service.getEmployeeList().subscribe(response => { 
      this.employeeList = response;
    });
    this.service.getDepartmentList().subscribe(response =>{
      this.departmentList=response;
    })
  }

  addEmployee(){
    var employee = {
      firstName:this.employee.firstName,
      lastName:this.employee.lastName,
      email:this.employee.email,
      phoneNr:this.employee.phoneNr,
      address:this.employee.address,
      gender:this.employee.gender,
      salary:this.employee.salary,
      departmentId:this.employee.departmentId
    }

    console.log(this.employee.departmentId);
    console.log(this.employee.firstName);

    this.service.addEmployee(employee).subscribe(res=>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display="block";
      }
      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display="none"
        }
      }, 4000)
    })
  }




  updateEmployee(){
    var employee = {
      employeeId:this.employee.employeeId,
      firstName:this.employee.firstName,
      lastName:this.employee.lastName,
      email:this.employee.email,
      phoneNr:this.employee.phoneNr,
      address:this.employee.address,
      gender:this.employee.gender,
      salary:this.employee.salary,
      departmentId:this.employee.departmentId
    }

    var id:number = this.employee.employeeId;


    this.service.updateEmployee(id, employee).subscribe(res=>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display="block";
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display="none"
        }
      }, 4000)
    })
  }


  
}
