const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const trainingRoutes = require('./routes/training');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/training', trainingRoutes); 