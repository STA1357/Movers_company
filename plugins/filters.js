import Vue from 'vue'

const filters = {
  bwFormat(value) {
    
  }
}

for (const key of Object.keys(filters)) {
  Vue.filter(key, filters[key])
}
