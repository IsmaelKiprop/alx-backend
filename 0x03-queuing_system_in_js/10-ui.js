import kue from 'kue';
import express from 'express';

const app = express();
const port = 3000;

kue.app.listen(3000);
console.log(`Queue UI is running at http://localhost:${port}`);

app.delete('/job/:id', (req, res) => {
    const { id } = req.params;

    kue.Job.get(id, (err, job) => {
        if (err) return res.status(404).json({ error: 'Job not found' });

        job.remove((err) => {
            if (err) return res.status(500).json({ error: 'Could not remove job' });
            return res.status(200).json({ message: 'Job removed' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
