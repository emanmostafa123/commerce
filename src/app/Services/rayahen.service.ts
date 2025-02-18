import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RayahenService {

  constructor(
    public http: HttpClient
  ) {

  }

  login(req: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:5162/api/Auth/login', req, { headers, responseType: 'json', observe: 'response' })
  }
  getAllTickets(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>('http://localhost:5162/api/Ticket/GetAllTicket',{ headers, responseType: 'json', observe: 'response' })
  } 
  getTicketById(req:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'id': req
    });
    return this.http.get<any>('http://localhost:5162/api/Ticket/GetTicketById?id=' + req ,{ headers, responseType: 'json', observe: 'response' })
  }
}
