import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentDashModel } from './student-dash-model';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit {

  formValue!: FormGroup;
  allStudents: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  studenModelObj: StudentDashModel = new StudentDashModel();

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        firstName: [''],
        lastName: [''],
        email: [''],
        mobile: [''],
        fees: [''],
      }
    );
    this.getAllStudentDetails(); 
  }

  postStudentDetails () {
    this.studenModelObj.firstName = this.formValue.value.firstName;
    this.studenModelObj.lastName = this.formValue.value.lastName;
    this.studenModelObj.email = this.formValue.value.email;
    this.studenModelObj.mobile = this.formValue.value.mobile;
    this.studenModelObj.fees = this.formValue.value.fees;

    this.api.postStudent(this.studenModelObj).subscribe(
      res => {
        alert('Student Record Added Successfully...');
        this.formValue.reset();
      },
      err => {
        alert('Student Record Not Added Successfully...');
      }
    );
    this.getAllStudentDetails(); 
  }

  getAllStudentDetails () {
    this.api.getStudent().subscribe(
      res => {
        this.allStudents = res;
      }
    );
  }

  clickAddStudent () {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  deleteStudentDetails (data: any) {
    this.api.deleteStudent(data.id).subscribe(
      res => {
        alert('Student Record Deleted Successfully...');
        this.getAllStudentDetails(); 
      }
    );
  }

  editStudentDetails(data: any) {
    this.studenModelObj.id = data.id;

    this.showAdd = false;
    this.showUpdate = true;

    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['fees'].setValue(data.fees);
  }

  updateStudentDetails () {
    this.studenModelObj.firstName = this.formValue.value.firstName;
    this.studenModelObj.lastName = this.formValue.value.lastName;
    this.studenModelObj.email = this.formValue.value.email;
    this.studenModelObj.mobile = this.formValue.value.mobile;
    this.studenModelObj.fees = this.formValue.value.fees;

    this.api.updateStudent(this.studenModelObj, this.studenModelObj.id).subscribe(
      res => {
        alert('Student Record Updated Successfully...');
        this.formValue.reset();
        this.getAllStudentDetails();
      }
    );

  }

}
