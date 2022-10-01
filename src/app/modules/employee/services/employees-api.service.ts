import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { BaseApiService } from '@core/services/base-api.service';
import { CreateEmployeeReqI, EmployeeItemI, PaginationResponseI } from '@core/intefaces/employees.inteface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesApiService extends BaseApiService {
  constructor(private readonly http: HttpClient) {
    super(environment.employeesApiUrl)
  }

  getEmployees(params: any): Observable<any> {
    const endpoint = `?_page=${params.page}&_limit=${params.size}&_sort=registered&_order=DESC`;
    return this.http.get<PaginationResponseI<EmployeeItemI>>(this.getUrl(endpoint),  {observe: 'response'} );
  }

  createEmployee(reqData: CreateEmployeeReqI): Observable<EmployeeItemI> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<EmployeeItemI>(this.getUrl(''),
      {...reqData},
      {headers: headers}
      );
  }

  editEmployee(reqData: CreateEmployeeReqI): Observable<EmployeeItemI> {
    return this.http.put<EmployeeItemI>(this.getUrl(`${reqData.id}`), reqData);
  }

  getEmployeesById(id: string): Observable<EmployeeItemI> {
    return this.http.get<EmployeeItemI>(this.getUrl(`${id}`) );
  }
}
