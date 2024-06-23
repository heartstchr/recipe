import Vue from 'vue'
import Quasar, * as All from 'quasar'
import 'quasar-extras/fontawesome/fontawesome.css'

Vue.use(Quasar, {
  config: {
    brand: {}
  },
  extras: ['material-icons', 'roboto-font'],
  components: All,
  directive: All,
  plugin: All
})
All.AddressbarColor.set('#cf5')
