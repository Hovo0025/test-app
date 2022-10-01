import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CustomValidators } from '@core/utils/custom-validators';
import { CreateEmployeeReqI, EmployeeItemI } from '@core/intefaces/employees.inteface';
import { EmployeesApiService } from '../../services/employees-api.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  public createEmployeeForm: FormGroup;
  public nameMinLength = 3;
  public nameMaxLength = 50;

  public employee: EmployeeItemI | undefined;

  protected destroy$ = new Subject<void>();
  constructor(private readonly fb: FormBuilder,
              private readonly activeRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly employeesApiService: EmployeesApiService,
              private readonly toastr: ToastrService,
              private readonly location: Location) {
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any) => {
        if (params?.id) {
          this.getEmployeeData(params.id)
        }
      });

    this.createEmployeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      lastName: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      age: ['', [Validators.required, CustomValidators.numberValidator]],
      gender: ['', [Validators.required]],
      company: ['', []],
      email: ['', [Validators.required, CustomValidators.emailValidator]],
      phone: ['', []]
    });
  }

  ngOnInit(): void {
  }


  getEmployeeData(uuid: string): void {
    this.employeesApiService.getEmployeesById(uuid).subscribe((data: EmployeeItemI) => {
      this.employee = data;
      this.createEmployeeForm.patchValue({
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        age: this.employee.age,
        gender: this.employee.gender,
        company: this.employee.company,
        email: this.employee.email,
        phone: this.employee.phone,
      })
    })
  }

  onEditEmployee(): void {
    this.createEmployeeForm.markAllAsTouched();
    if (this.createEmployeeForm.invalid) {
      return;
    }
    const reqData = this.createEmployeeForm.value as CreateEmployeeReqI;
    if (this.employee) {
      reqData.id = this.employee.id;
      reqData.registered = this.employee.registered;
    }

    this.employeesApiService.editEmployee(reqData).subscribe((res) => {
      this.toastr.success('Employee successfully edited');
      this.router.navigate(['../']);
    }, err => {
      this.toastr.error('Something went wrong while editing employee');
    });
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
