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
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Auth/login', req, { headers, responseType: 'json', observe: 'response' })
  }
  getAllTickets(token:any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.get<any>('http://ticket-sys.runasp.net/api/Ticket/GetAllTicket',{ headers, responseType: 'json', observe: 'response' })
  } 
  getTicketById(req:any , token:any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.get<any>('http://ticket-sys.runasp.net/api/Ticket/GetTicketById?id=' + req ,{ headers, responseType: 'json', observe: 'response' })
  }

  addUser(req:any , token:any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Auth/register', req, { headers, responseType: 'json', observe: 'response' })

  }
  addTickt(req:any, token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Ticket/AddTicket', req, { headers, responseType: 'json', observe: 'response' })

  }
  updTicket(req:any, token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Ticket/UpdateTicket', req, { headers, responseType: 'json', observe: 'response' })

  } 
  addIssue(req:any, token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Admin/AddIssue', req, { headers, responseType: 'json', observe: 'response' })

  }
  getallIssues(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.get<any>('http://ticket-sys.runasp.net/api/Admin/GetAllIssues',  { headers, responseType: 'json', observe: 'response' })

  }
  updIssue(req:any, token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Admin/UpdateIssue', req, { headers, responseType: 'json', observe: 'response' })

  }  
  deleteIssue(req:any, token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Attach JWT token
    });
    return this.http.delete<any>('http://ticket-sys.runasp.net/api/Admin/DeleteIssue?id=' + req , { headers, responseType: 'json', observe: 'response' })

  }
}
