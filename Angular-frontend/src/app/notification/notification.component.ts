import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>('http://127.0.0.1:8000/api/notifications', { headers })
    .subscribe(
      data => this.notifications = data,
      error => console.error('Error fetching notifications', error)
    );
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'info': return 'fa-info-circle';
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-exclamation-circle';
      default: return 'fa-bell';
    }
  }

  dismissNotification(id: number): void {
    // Optionally, you might want to call an API to remove the notification from the server
    // this.http.delete(`http://127.0.0.1:8000/api/notifications/${id}`, { headers }).subscribe(
    //   () => {
    //     this.notifications = this.notifications.filter(notification => notification.id !== id);
    //   },
    //   error => console.error('Error dismissing notification', error)
    // );

    // For now, just remove it from the local array
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  }
}
