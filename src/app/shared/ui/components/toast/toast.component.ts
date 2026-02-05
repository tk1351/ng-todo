import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  private notificationService = inject(NotificationService);

  notifications = this.notificationService.notifications;

  clearToast(id: string) {
    this.notificationService.dissmiss(id);
  }
}
