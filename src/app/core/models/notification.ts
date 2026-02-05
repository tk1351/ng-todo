export type NotificationType = 'success' | 'error';

export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
};
