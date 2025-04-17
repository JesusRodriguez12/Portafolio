const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => res.render('index'));
router.get('/proyectos', (req, res) => res.render('proyectos'));
router.get('/contacto', (req, res) => res.render('contacto'));
router.get('/perfil', (req, res) => res.render('perfil'));

router.post('/enviar', async (req, res) => {
  const { nombre, telefono ,email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Nuevo mensaje del portafolio',
    text: `Nombre: ${nombre}\nTelefono: ${telefono}\nEmail: ${email}\nMensaje:\n${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Mensaje enviado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
});

module.exports = router;