import express from 'express';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/player/growid/checktoken', (req, res) => {
  res.json({
    status: "redirect",
    message: "Token is invalid.",
    token: "",
    url: "",
    accountType: "growtopia",
    accountAge: 2
  });
});

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.all('/player/login/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'html', 'login.html'));
});

app.use((req, res, next) => {
  res.status(404).send('<h1 style="color:red; text-align:center;"><i>Page Not Found <br> (404)</i></h1>');
});

app.use((err, req, res, next) => {
  console.error('An error occurred:', err.message);
  res.status(500).send('Something went wrong.');
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
