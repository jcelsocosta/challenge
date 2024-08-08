import cron from 'node-cron';

import { MovieController } from '../controller/movie';

const movieController = new MovieController()

async function initMovie() {
  let isWorking = false
  cron.schedule('*/30 * * * * *', async () => {
    if (!isWorking) {
      isWorking = true
        await movieController.loadMoviesFromAPI()
      isWorking = false
    }
  })
}

export { initMovie }