import fluidStorage from 'fluid-storage'
import vue from 'vue'

const storage = fluidStorage.init('sigif2', 'localstorage')

vue.use({
    install: (Vue, options) => {
        Vue.storage = storage
        window.storage = storage
        Object.defineProperties(Vue.prototype, {
            storage: {
                get: () => storage
            },
            $storage: {
                get: () => storage
            },
        })
    }
})

export default storage