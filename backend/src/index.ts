import { initMovie } from './main/adapters/start/movie'
import initRest from './main/adapters/rest/server'

class CMD {
  run(): void {
    initMovie()
    initRest()
  }
}

new CMD().run()
