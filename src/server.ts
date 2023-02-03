/* eslint-disable @typescript-eslint/no-floating-promises */
import app, { init } from '@/app';

let port = 0;

if (process.env.PORT === undefined) {
  port = 4000;
} else {
  port = +process.env.PORT;
}

init().then(() => {
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});
