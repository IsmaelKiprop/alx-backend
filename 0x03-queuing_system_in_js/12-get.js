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

queue.on('job enqueue', (id, type) => {
    logger.info(`Job ${id} got queued of type ${type}`);
}).on('job complete', (id, result) => {
    kue.Job.get(id, (err, job) => {
        if (err) return;

        job.remove((err) => {
            if (err) throw err;
            logger.info(`Removed completed job ${job.id}`);
        });
    });
}).on('error', (err) => {
    logger.error(`Queue error: ${err}`);
});
