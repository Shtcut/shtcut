import * as process from 'process';

export const configuration = () => ({
  app: {
    appName: process.env.APP_NAME || 'ShtCut',
    baseUrl: process.env.BASE_URL || `http//:localhost:${Number(process.env.PORT || 7000)}`,
    apiKey: process.env.API_KEY || 'ShtCutKey',
    serviceName: process.env.SERVICE_NAME || 'service',
    environment: process.env.NODE_ENV || 'development',
    encryptionKey: process.env.SERVER_SECRET || 'AppSecret',
    port: process.env.PORT || 7000,
    pagination: {
      itemsPerPage: 10,
    },
    lang: 'en',
    showDeveloperError: process.env.SHOW_DEVELOPER_ERROR || true,
    fromEmail: process.env.EMAIL_NO_REPLY || 'noreply@shtcut.link',
    defaultVerifyCode: '123456',
    messageBroker: 'mq',
    rabbitMQ: process.env.RABBIT_MQ_URL || 'amp://localhost:5672',
    redis: {
      url: process.env.REDIS_URL,
      host: process.env.REDIS_SERVER_HOST_URL,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
    mongodb: {
      url: process.env.DB_URL,
    },
    templates: {
      email: {
        verify: 'verify',
        passwordReset: 'password-reset',
        otp: 'otp',
      },
      sms: {
        verify: 'verify',
      },
    },
    socials: {
      facebook: {
        url: 'https://graph.facebook.com/v2.12/me?fields=email,first_name,last_name,picture',
        apiKey: process.env.FACEBOOK_CLIENT_ID,
        testAccessToken: process.env.FB_ACCESS_TOKEN,
        testEmail: process.env.FB_TEST_EMAIL,
        testSocialID: process.env.FB_TEST_ID,
      },
      google: {
        url: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
        userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
        secret: process.env.GOOGLE_SECRET_ID,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        testEmail: process.env.GOOGLE_TEST_EMAIL,
        testSocialId: process.env.GOOGLE_TEST_ID,
      },
    },
    redisUrl: process.env.REDIS_SERVER_HOST_URL,
    fileUpload: {
      default: process.env.GOOGLE_CLOUD_PROJECT_ID || 's3',
      gsc: {
        projectID: process.env.GOOGLE_CLOUD_PROJECT_ID,
        keyFile: process.env.GOOGLE_CLOUD_KEY_FILE,
        bucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
      },
      s3: {
        key: process.env.AWS_ACCESS_KEY,
        secret: process.env.ASW_SECRET_KEY,
        bucket: process.env.AWS_BUCKET,
        region: process.env.AWS_REGION,
      },
    },
    termii: {
      url: process.env.TERMI_API_URL,
      apiKey: process.env.TERMI_API_KEY,
      secretKey: process.env.TERMI_SECRET_KEY,
      senderId: process.env.TERMI_SENDER_ID,
    },
    email: {
      noReply: { email: process.env.NO_REPLY || 'no-reply@shtcut.link', name: process.env.APP_NAME || 'ShtCut' },
      mailOptions: process.env.MAIL_OPTION || 'sendgrid',
      sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY,
        contactForRecipient: process.env.CONTACT_FORM_EMAIL_RECIPIENT,
      },
    },
    permissionValuesTypes: ['boolean', 'list', 'number', 'text'],
  },
  microServices: {
    app: {
      url: process.env.SHTCUT_APP_SERVICE_HOST
        ? `${process.env.SHTCUT_APP_SERVICE_HOST}:${process.env.SHTCUT_APP_SERVICE_PORT}`
        : process.env.APP_SERVICE,
    },
    worker: {
      url: process.env.SHTCUT_APP_WORKER_HOST
        ? `${process.env.SHTCUT_APP_WORKER_HOST}:${process.env.SHTCUT_APP_WORKER_PORT}`
        : process.env.WORKER_SERVICE,
    },
  },
});
