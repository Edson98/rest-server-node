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
process.env.CADUCIDAD_TOKEN = '48h';

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
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// =====================
// Google client ID
// =====================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1079380325023-6ekbsmg7vn9672clvvuslg19gr7udo0o.apps.googleusercontent.com';
