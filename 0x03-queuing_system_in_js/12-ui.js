import kue from 'kue';
import express from 'express';
import winston from 'winston';

const app = express();
const port = 3000;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

kue.app.listen(3000);
logger.info(`Queue UI is running at http://localhost:${port}`);

app.delete('/job/:id', (req, res) => {
    const { id } = req.params;

    kue.Job.get(id, (err, job) => {
        if (err) {
            logger.error(`Job not found: ${err}`);
            return res.status(404).json({ error: 'Job not found' });
        }

        job.remove((err) => {
            if (err) {
                logger.error(`Could not remove job: ${err}`);
                return res.status(500).json({ error: 'Could not remove job' });
            }
            logger.info(`Job ${id} removed`);
            return res.status(200).json({ message: 'Job removed' });
        });
    });
});

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
