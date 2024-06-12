import kue from 'kue';

const queue = kue.createQueue();

queue.on('job complete', (id, result) => {
    kue.Job.get(id, (err, job) => {
        if (err) return;

        job.remove((err) => {
            if (err) throw err;
            console.log(`Removed completed job ${job.id}`);
        });
    });
});
