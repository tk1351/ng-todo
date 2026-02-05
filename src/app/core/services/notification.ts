import { effect, Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notifications = signal<Notification[]>([]);
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  readonly notifications = this._notifications.asReadonly();

  constructor() {
    effect(() => {
      for (const notification of this._notifications()) {
        if (this.timers.has(notification.id)) return;
        const timerId = setTimeout(() => this.dissmiss(notification.id), 5000);
        this.timers.set(notification.id, timerId);
      }
    });
  }

  show(message: string, type: NotificationType) {
    this._notifications.update((notification) => [
      ...notification,
      { id: crypto.randomUUID(), message, type },
    ]);
  }

  dissmiss(id: string) {
    const timerId = this.timers.get(id);
    if (!timerId) return;

    clearTimeout(timerId);
    this.timers.delete(id);
    this._notifications.update((notification) => notification.filter((n) => n.id !== id));
  }
}
