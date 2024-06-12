import kue from 'kue';
import winston from 'winston';

const queue = kue.createQueue();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

const jobs = [
    { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
    { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
    { phoneNumber: '4153518743', message: 'This is the code 4321 to verify your account' },
    { phoneNumber: '4153538781', message: 'This is the code 4562 to verify your account' },
    { phoneNumber: '4153118782', message: 'This is the code 4321 to verify your account' },
    { phoneNumber: '4153718781', message: 'This is the code 4562 to verify your account' },
    { phoneNumber: '4159518782', message: 'This is the code 4321 to verify your account' },
    { phoneNumber: '4158718781', message: 'This is the code 4562 to verify your account' },
    { phoneNumber: '4153818782', message: 'This is the code 4321 to verify your account' },
    { phoneNumber: '4154318781', message: 'This is the code 4562 to verify your account' }
];

jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_2', jobData).save((err) => {
        if (!err) {
            logger.info(`Notification job created: ${job.id}`);
        } else {
            logger.error(`Error creating job: ${err}`);
        }
    });

    job.on('complete', () => {
        logger.info(`Notification job ${job.id} completed`);
    }).on('failed', (err) => {
        logger.error(`Notification job ${job.id} failed: ${err}`);
    }).on('progress', (progress) => {
        logger.info(`Notification job ${job.id} ${progress}% complete`);
    });
});
