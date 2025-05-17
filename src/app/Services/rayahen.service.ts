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
  forgetPass(req: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Auth/forgot-password', req, { headers, responseType: 'json', observe: 'response' })
  }
  getAllTickets() {
    return this.http.get<any>('http://ticket-sys.runasp.net/api/Ticket/GetAllTicket', { responseType: 'json', observe: 'response' })
  }
  getTicketById(req: any) {
    return this.http.get<any>('http://ticket-sys.runasp.net/api/Ticket/GetTicketById?id=' + req, { responseType: 'json', observe: 'response' })
  }

  addUser(req: any) {
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Auth/register', req, { responseType: 'json', observe: 'response' })
  }
  addTickt(req: any) {
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Ticket/AddTicket', req, { responseType: 'json', observe: 'response' })
  }
  readTickt(id: any) {
    return this.http.put<any>('http://ticket-sys.runasp.net/api/Ticket/' + id + '/AddInRead', { responseType: 'json', observe: 'response' })
  }
  updTicket(req: any, id: number) {
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Ticket/UpdateTicket?id=' + id, req, { responseType: 'json', observe: 'response' })
  }

  addIssue(req: any) {
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Admin/AddIssue', req, { responseType: 'json', observe: 'response' })
  }
  getallIssues() {
    return this.http.get<any>('http://ticket-sys.runasp.net/api/Admin/GetAllIssues', { responseType: 'json', observe: 'response' })
  }
  updIssue(req: any) {
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Admin/UpdateIssue', req, { responseType: 'json', observe: 'response' })
  }
  deleteIssue(req: any) {
    return this.http.delete<any>('http://ticket-sys.runasp.net/api/Admin/DeleteIssue?id=' + req, { responseType: 'json', observe: 'response' })
  }
  getNotification(req: any) {
    return this.http.get<any>('http://ticket-sys.runasp.net/api/Notification/GetAllNotifications?userid=' + req, { responseType: 'json', observe: 'response' })
  }
  uploudImg(req: any) {
    return this.http.post<any>('http://ticket-sys.runasp.net/api/Ticket/Image' , req, { responseType: 'json', observe: 'response' })
  }
}