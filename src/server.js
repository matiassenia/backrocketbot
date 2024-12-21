const app = require('./app');
const PORT = process.env.PORT || 3000;

//Inicio de servidor
app.listen(PORT, () => {
    console.log(`Rocketbot server running on http://localhost:${PORT}`);
});
