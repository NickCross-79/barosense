import express from 'express';
import getRoutes from './routes/api/getRoutes.js'

const app = express();

app.use('/api', getRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

export default app;
