import TradingVue from 'trading-vue-js'
import { Overlay } from "trading-vue-js";

import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(TradingVue)
  app.use(Overlay)
})