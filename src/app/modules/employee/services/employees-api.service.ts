import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { BaseApiService } from '@core/services/base-api.service';
import { EmployeeItemInterface } from '@core/intefaces/employees.inteface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesApiService extends BaseApiService {
  constructor(private readonly http: HttpClient) {
    super(environment.employeesApiUrl)
  }

  getEmployees(pagination: any): Observable<EmployeeItemInterface[]> {
    return this.http.get<EmployeeItemInterface[]>(
      this.getUrl(`?_page=${pagination.pageIndex}&_limit=${pagination.pageSize}`
      ));
  }
}
