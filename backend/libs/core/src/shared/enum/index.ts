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

export enum SocialType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  APPLE = 'apple',
  GITHUB = 'github',
  TWITTER = 'twitter',
}

export enum FileUploadEnum {
  AWS_S3 = 's3',
  GCS = 'gcs',
  AZURE = 'azure',
}

export enum WorkerQueue {
  PROCESS_WORK = 'shtcut.jobs.process.work',
}

export enum Roles {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}
