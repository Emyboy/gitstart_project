import express from 'express';
import indexRoute from './routes/index';
import cors from 'cors';
import bodyparser from 'body-parser';
import swagger from './swagger';
import volleyball from 'volleyball';
// import moment from 'moment';
// console.log('moment -----', moment("2020-10-05T21:56:41.645Z").fromNow())


const PORT = process.env.PORT || 3000;
const app = express();

app.use(volleyball)
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/api/v1", indexRoute);
app.use('/api/v1/docs', swagger);

app.get("/api", (req, res) => {
  // res.sendfile(path.join(__dirname, "/", "../../build/index.html"));
  res.send('Welcome To GitStart API')
});

app.get("*", (req, res) => {
  // res.sendfile(path.join(__dirname, "/", "../../build/index.html"));
  res.send("<h1>404</h1><br /><p>Route Not Found!</p>")
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
});

export default app;
