export default {
  namespaced: true,
  state: {
    locale: 'fr'
  },
  mutations: {
    setLocale(state, locale) {
      console.log('locale',locale);
      state.locale = locale
    }
  }
}
