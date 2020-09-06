var chronom
let startVirtualTime

var app = new Vue({
    el: '#app',
    data: {
        time: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hundredths: 0,
        playing: false,
    },
    created: function() {
        startVirtualTime = localStorage.getItem('vtr_time')  // Fecha del Inicio Virtual del cronometro
    },
    mounted: function() {
        this.$refs.app.style.display = 'flex'
        if(startVirtualTime) {
            startVirtualTime = new  Date(startVirtualTime)
            this.defineChronometer()
        }
    },
    computed: {
        formatedHours: function() {
            let zero = '0'
            return this.hours < 10 ? `${zero}${this.hours}` : this.hours
        },
        formatedMinutes: function() {
            let zero = '0'
            return this.minutes < 10 ? `${zero}${this.minutes}` : this.minutes
        },
        formatedSeconds: function() {
            let zero = '0'
            return this.seconds < 10 ? `${zero}${this.seconds}` : this.seconds
        },
        formatedHundredths: function() {
            let zero = '0'
            return this.hundredths < 10 ? `${zero}${this.hundredths}` : this.hundredths
        },
    },
    methods: {
        /**
         * @param {Date} initialTime 
         * @param {Date} finalTime 
         * @returns {Number} In ms
         */
        calcTime: function(initialTime, finalTime) {
            return Math.round(finalTime - initialTime)
        },
        /**
         * @returns {Number} In ms
         */
        getTimeElapsed: function() {
            return this.calcTime(startVirtualTime, new Date())
        },
        /**
         * Inicia el intervalo
         */
        defineChronometer: function() {
            this.chronom = setInterval(() => {
                this.increase()
            }, 10)
        },
        /**
         * Inicia el cronometro
         */
        startChronometer: function() {
            const now = new Date()
            startVirtualTime = now
            localStorage.setItem('str_time', now) // Tiempo de inicio del cronometro
            localStorage.setItem('vtr_time', now) // Tiempo virtual del inicio del cronometro
            this.defineChronometer()
        },
        /**
         * Limpia el intervalo
         */
        pauseChronometer: function() {
            clearInterval(this.chronom)
        },
        stopChronometer: function() {
            this.pauseChronometer()
            this.hours = 0
            this.minutes = 0
            this.seconds = 0
            this.hundredths = 0
            localStorage.removeItem('str_time')
            localStorage.removeItem('vtr_time')
        },
        increase: function() {
            let timeElapsed = this.getTimeElapsed()
            this.setTime(timeElapsed)
            if(this.hundredths===100) this.hundredths = 0
            else this.hundredths++
        },
        /**
         * Setear el tiempo formateado a partir del tiempo en ms
         * @param {Number} timeElapsed 
         */
        setTime: function(timeElapsed) {
            let diff_in_seconds = (timeElapsed / 1000)

            let sec_num = parseInt(diff_in_seconds, 10)
            this.hours = Math.floor(sec_num / 3600)
            this.minutes = Math.floor((sec_num - (this.hours * 3600)) / 60)
            this.seconds = sec_num - (this.hours * 3600) - (this.minutes * 60)
        },
    },
})