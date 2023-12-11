export enum QueueTasks {
  UPLOAD_PHOTO = 'task.send.photo',
  SEND_EMAIL = 'task.send.email',
  SEND_SMS = 'task.send.sms',
  SEND_NOTIFICATION = 'task.send.notification',
  PING = 'task.send.ping',
}

export enum Queues {
  API = 'shtcut.queue.api',
  SHTCUT_TASK = 'shtcut.queue.task',
}
