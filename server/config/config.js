// =====================
// Puerto
// =====================
process.env.PORT = process.env.PORT || 3000;

// =====================
// Entorno
// =====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =====================
// Vencimiento del token
// =====================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =====================
// SEED de autenticación
// =====================
process.env.SEED = process.env.SEED || 'secret';

// =====================
// Database
// =====================
let urlDB;
if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://edson:0jtRA8Z6qIWvvl7L@cluster0-ii2fv.mongodb.net/cafe';
}