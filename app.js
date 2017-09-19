new Vue({
    el: '#app',
    name: 'monster-slayer',
    data: function() {
        return {
            appName: 'The Monster Slayer',
            playerHP: 100,
            monsterHP: 100,
            battleLog: [],
            finished: false,
            cooldown: 0
        }
    },
    methods: {
        attack: function() {
            const damage = Math.floor(Math.random() * (15 - 1) + 1)

            if (this.monsterHP - damage < 0) {
                this.monsterHP = 0
            } else {
                this.monsterHP -= damage
            }

            this.battleLog.unshift({ 
                isPlayer: true, 
                text: "The monster receives " + damage + " damage!" 
            })

            this.monsterMove()
        },
        spAttack: function() {
            const damage = Math.floor(Math.random() * (50 - 1) + 1)

            if (this.monsterHP - damage < 0) {
                this.monsterHP = 0
            } else {
                this.monsterHP -= damage
            }

            this.battleLog.unshift({
                isPlayer: true,
                text: "The monster receives " + damage + " damage!"
            })

            this.cooldown = 3
            this.monsterMove()
        },
        heal: function() {
            const heal = Math.floor(Math.random() * (30 - 1) + 1)

            if (this.playerHP + heal > 100) {
                this.playerHP = 100
            } else {
                this.playerHP += heal
            }

            this.battleLog.unshift({
                isHeal: true,
                text: "Your health goes up by " + heal + " points!"
            })
            
            this.monsterMove()
        },
        reset: function() {
            this.playerHP = 100
            this.monsterHP = 100
            this.battleLog = []
            this.cooldown = 0
            this.finished = false
        },
        monsterMove: function() {
            if (this.end()) return 
            if (this.cooldown > 0) this.cooldown--

            const willAttack = Math.floor(Math.random() * (100 - 1) + 1)

            if (willAttack <= 80) {
                const damage = Math.floor(Math.random() * (20 - 1) + 1)
                const critical = Math.floor(Math.random() * (100 - 1) + 1)
                let logText = ""

                if (critical <= 20) {
                    damage *= 2
                    text = "The monster critically wounds the player! The player receives " + damage + " damage!"
                } else {
                    logText = "The player receives " + damage + " damage!"
                }

                if (this.playerHP - damage < 0) {
                    this.playerHP = 0
                } else {
                    this.playerHP -= damage 
                }

                this.battleLog.unshift({
                    isMonster: true,
                    text: logText
                })
            } else {
                this.battleLog.unshift({
                    isMonster: true,
                    text: 'The monster wanders around you without attacking. You can feel its bloodlust.'
                })
            }
        },
        end: function() {
            if (this.playerHP === 0 || this.monsterHP === 0) {
                this.finished = true
                return true
            }

            return false
        },
    },
    computed: {
        userInDanger: function() {
            return this.playerHP <= 50 && this.playerHP > 25
        },
        userAlmostDead: function() {
            return this.playerHP <= 25
        },
        userIsOk: function() {
            return !(this.userInDanger && this.userAlmostDead)
        },
        monsterInDanger: function() {
            return this.monsterHP <= 50 && this.monsterHP > 25
        },
        monsterAlmostDead: function() {
            return this.monsterHP <= 25
        },
        monsterIsOk: function() {
            return !(this.monsterInDanger && this.monsterAlmostDead)
        },
        won: function() {
            return this.monsterHP === 0 && this.finished
        },
        lost: function() {
            return this.playerHP === 0 && this.finished
        }
    }
})