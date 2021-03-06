let startVirtualTime
var chronom

var app = new Vue({
    el: '#app',
    data: {
        time: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hundredths: 0,
        playing: false,
        pause: false,
    },
    created: function() {
        startVirtualTime = localStorage.getItem('vtr_time')  // Fecha del Inicio Virtual del cronometro
        this.pause = localStorage.getItem('pause')=='true'?true:false // Pausado?
    },
    mounted: function() {
        this.$refs.app.style.display = 'flex'
        if(startVirtualTime) {
            startVirtualTime = new Date(startVirtualTime)

            if(this.pause)  {
                let timeElapsed = parseInt(localStorage.getItem('timeElapsed'))
                console.log('timeElapsed',timeElapsed)                
                this.setTime(timeElapsed)
                // Obtener el número de la centésima guardada en el local storage
                let a = `${timeElapsed}`.split('')
                a.reverse()
                a = a.filter((a,i) => i===1||i===2)
                a.reverse()
                this.hundredths = parseInt(a.join(''))
            }
            if(!this.pause) this.defineChronometer()
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
            chronom = setInterval(() => {
                this.increase()
            }, 10)
        },
        /**
         * Inicia el cronometro
         */
        startChronometer: function() {
            if(chronom) return            

            const now = new Date()

            if(!this.pause) {
                startVirtualTime = now
                localStorage.setItem('str_time', now) // Tiempo de inicio del cronometro
                localStorage.setItem('vtr_time', now) // Tiempo virtual del inicio del cronometro
            }else{
                let pauseTime = new Date(localStorage.getItem('psd_time'))
                let pasedTimeElapsed = Math.round(pauseTime - now)
                startVirtualTime = new Date(startVirtualTime - pasedTimeElapsed)
                localStorage.setItem('vtr_time', startVirtualTime) // Tiempo virtual del inicio del cronometro
            }
            this.defineChronometer()

            this.pause = false
            localStorage.setItem('pause', this.pause)
        },
        /**
         * Pausa el cronómetro
         */
        pauseChronometer: function() {
            this.pause = true
            localStorage.setItem('pause', this.pause) // Pausado?
            localStorage.setItem('psd_time', new Date()) // Último tiempo en el que se pausó el cronometro
            clearInterval(chronom)
            chronom = null
        },
        /**
         * Detiene totalmente el cronometro
         */
        stopChronometer: function() {
            clearInterval(chronom)
            chronom = null
            this.hours = 0
            this.minutes = 0
            this.seconds = 0
            this.hundredths = 0
            localStorage.removeItem('str_time')
            localStorage.removeItem('vtr_time')
        },
        increase: function() {
            let timeElapsed = this.getTimeElapsed()
            localStorage.setItem('timeElapsed',timeElapsed)
            this.setTime(timeElapsed)
            if(this.hundredths===100) this.hundredths = 0
            else this.hundredths++
        },
        /**
         * Setear el tiempo formateado a partir del tiempo en ms
         * @param {Number} timeElapsed 
         */
        setTime: function(timeElapsed) {
            // console.log('timeElapsed',timeElapsed)
            let diff_in_seconds = (timeElapsed / 1000)

            let sec_num = parseInt(diff_in_seconds, 10)
            this.hours = Math.floor(sec_num / 3600)
            this.minutes = Math.floor((sec_num - (this.hours * 3600)) / 60)
            this.seconds = sec_num - (this.hours * 3600) - (this.minutes * 60)
        },
    },
})