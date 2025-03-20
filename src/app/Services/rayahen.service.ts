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
  getAllTickets(token:any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.get<any>('http://localhost:5162/api/Ticket/GetAllTicket',{ headers, responseType: 'json', observe: 'response' })
  } 
  getTicketById(req:any , token:any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.get<any>('http://localhost:5162/api/Ticket/GetTicketById?id=' + req ,{ headers, responseType: 'json', observe: 'response' })
  }

  addUser(req:any , token:any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://localhost:5162/api/Auth/register', req, { headers, responseType: 'json', observe: 'response' })

  }
  addTickt(req:any, token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://localhost:5162/api/Ticket/AddTicket', req, { headers, responseType: 'json', observe: 'response' })
  }
  addIssue(req:any, token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://localhost:5162/api/Admin/AddIssue', req, { headers, responseType: 'json', observe: 'response' })
  } 
  getallIssues(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.get<any>('http://localhost:5162/api/Admin/GetAllIssues', { headers, responseType: 'json', observe: 'response' })
  }
}
