new Vue({
    el: '#app',
    name: 'monster-slayer',
    data: {
        appName: 'The Monster Slayer',
        playerHP: 100,
        monsterHP: 100,
        battleLog: [],
        finished: false,
        cooldown: 0,
        healCooldown: 0,
        type: {
            PLAYER: 'player',
            HEAL: 'heal',
            MONSTER: 'monster',
        }
    },
    methods: {
        attack: function() {
            const damage = this.randomize(1, 20)

            this.changeHealth(this.monsterHP, damage)
            this.log(this.type.PLAYER, "The monster receives " + damage + " damage!")
            this.monsterMove()
        },
        spAttack: function() {
            this.cooldown = 3

            const damage = this.randomize(5, 40)
            
            this.changeHealth(this.monsterHP, damage)
            this.log(this.type.PLAYER, "The monster receives " + damage + " damage!")
            this.monsterMove()
        },
        heal: function() {
            this.healCooldown = 3
            
            const heal = this.randomize(5, 15)
            
            this.changeHealth(playerHP, -heal)
            this.log(this.type.HEAL, "Your health goes up by " + heal + " points!")
            this.monsterMove()
        },
        reset: function() {
            this.playerHP = 100
            this.monsterHP = 100
            this.battleLog = []
            this.cooldown = 0
            this.healCooldown = 0
            this.finished = false
        },
        monsterMove: function() {
            if (this.end()) return 

            if (this.cooldown > 0) this.cooldown--
            if (this.healCooldown > 0) this.healCooldown--

            const willAttack = this.randomize(0, 100)

            if (willAttack <= 80) {
                const critical = this.randomize(0, 100)
                let damage = this.randomize(8, 20)
                let msg = ""

                if (critical <= 20) {
                    damage *= 2
                    msg = "The monster critically wounds the player! The player receives " + damage + " damage!"
                } else {
                    msg = "The player receives " + damage + " damage!"
                }

                this.changeHealth(this.playerHP, damage)
                this.log(this.type.MONSTER, msg)
            } else {
                this.log(this.type.MONSTER, 'The monster wanders around you without attacking. You can feel its bloodlust.')
            }

            this.end()
        },
        end: function() {
            if (this.playerHP === 0 || this.monsterHP === 0) {
                this.finished = true
                return true
            }

            return false
        },
        status: function(health) {
            if (health <= 50 && health > 25) return 'is-warning'
            else if (health <= 25) return 'is-danger'
            else return 'is-success'
        },
        logStyle: function(type) {
            if (type === this.type.MONSTER) return 'is-danger'
            else if (type === this.type.PLAYER) return 'is-info'
            else return 'is-success'
        },
        randomize: function(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        log: function(type, msg) {
            this.battleLog.unshift({
                type: type,
                text: msg
            })
        },
        changeHealth: function(health, value) {
            if (health - value < 0) {
                health = 0
            } else {
                health -= value 
            }
        }
    },
    computed: {
       won: function() {
           return this.monsterHP === 0 && this.finished
       },
       lost: function() {
           return this.playerHP === 0 && this.finished
       }
    }
})