import Vue from 'vue';



Vue.use({
    install: function (Vue, options) {
        Vue.axios = _axios;
        window.axios = _axios;

        Vue.api = _api
        window.api = _api

        Object.defineProperties(Vue.prototype, {
            axios: {
                get() {
                    return _axios;
                }
            },
            $axios: {
                get() {
                    return _axios;
                }
            },
            api: {
                get: () => _api
            },
        });
    }
})