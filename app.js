const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { clinicRouter } = require("./routes/clinic.routes")
const { servicesRouter } = require('./routes/services.routes')
const { hourAttentionRouter } = require('./routes/hourAttention.routes')

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clinic', clinicRouter)
app.use('/api/v1/services', servicesRouter)
app.use('/api/v1/hourAttention', hourAttentionRouter)

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
