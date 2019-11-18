var chronom

var app = new Vue({
    el: '#app',
    data: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        hundredths: 0,
        playing: false,
    },
    mounted: function() {
        this.$refs.app.style.display = 'block'
        this.defineChronometer()
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
            let zero = ''
            if( this.hundredths < 10 ) zero = '00'
            else if( this.hundredths < 100 ) zero = '0'
            else zero = ''
            return `${zero}${this.hundredths}`
        },
    },
    methods: {
        defineChronometer: function() {
            chronom = setInterval(() => {
                if( this.playing ) this.increase()
            }, 10)
        },
        startChronometer: function() {
            this.playing = true
        },
        pauseChronometer: function() {
            this.playing = false
        },
        stopChronometer: function() {
            this.hours = 0
            this.minutes = 0
            this.seconds = 0
            this.hundredths = 0
            this.playing = false
        },
        increase: function() {
            this.hundredths++
            if( this.hundredths === 100 ) {
                this.hundredths = 0
                this.seconds++
            }
            if( this.seconds === 60 ) {
                this.seconds = 0
                this.minutes++
            }
            if( this.minutes === 60 ) {
                this.minutes = 0
                this.hours++
            }
        },
    },
})