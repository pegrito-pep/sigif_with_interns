import Vue from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

require('dayjs/locale/fr')
dayjs.locale('fr')
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("Europe/London")
console.log(dayjs.tz.guess())


Vue.use({
    install: (Vue, options) => {
        Vue.dayjs = dayjs
        window.dayjs = dayjs
        Object.defineProperties(Vue.prototype, {
            $dayjs: {
                get: () => function() {
                    return dayjs(...arguments).tz('Europe/London')
                }
            },
            $date: {
                get: () => (date) => dayjs(date).tz('Europe/London')
            }
        })
    }
})

export default dayjs