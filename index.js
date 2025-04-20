function animate(cor, animation, ms = 300) {
    $("#" + cor).addClass(animation)
    setTimeout(() => {
        $("#" + cor).removeClass(animation)
    }, ms)
}


function alterarPontuaçãoMax(level) {
    console.log("editando localStorage")
    let levelMax = localStorage.getItem("levelMax")

    levelMax = levelMax == null ? 0 : parseInt(levelMax)

    if (level > levelMax) {
        console.log("alterando level 2")
        $('p').html('Highest level <em class="emphasis">has beaten</em>: ' + level)
        localStorage.setItem("levelMax", level)
    }
    else {
        $('p').text("Highest level: " + levelMax)
    }
}


class Simon {
    sequenciaReal = []
    tocado
    level = -1

    constructor() {
        self = this
        $("button.colors").on("mousedown", function () {
            self.playAudio(this.id)
            self.tocado = this.id
            animate(this.id, "press", 100)
            if (self.level > 0)
                self.checarSequencia()
        })
    }


    reset() {
        alterarPontuaçãoMax(this.level)
        console.log("-----------")
        this.sequenciaReal = []
        this.tocado = undefined
        this.level = 0
    }


    playAudio(audioName) {
        const audio = new Audio("./sounds/" + audioName + ".mp3")
        audio.play()
    }

    add_next() {

        this.level++
        $('h1').text("Level " + this.level)
        const cores = ['green', 'red', 'yellow', 'blue']
        const cor = [cores[Math.floor(Math.random() * 4)], false]
        this.sequenciaReal.push(cor)

        setTimeout(() => {
            this.playAudio(cor[0])
            //criar animação de destaque com shadow da cor esmaecida 
            animate(cor[0], "play")
        }, 1000)

        this.sequenciaReal.forEach((ele) => ele[1] = false)
        alterarPontuaçãoMax(this.level)
    }


    checarSequencia() {
        for (var ele of this.sequenciaReal) {
            if (!ele[1])
                break
        }

        if (this.tocado == ele[0]) {
            ele[1] = true

            const pos = this.sequenciaReal.length - 1

            if (this.sequenciaReal[pos][1])
                this.add_next()
        }
        else {
            $('h1').text("Game Over, Press Any Key to Restart")
            this.level = -1
            this.playAudio("wrong")
        }
    }
}


$('#darkmode').on('click', () => {
    document.body.classList.toggle('dark-mode')
})

alterarPontuaçãoMax(0)
let simon = new Simon()
addEventListener('keydown', (event) => {
    if (simon.level == -1) {
        simon.reset()
        simon.add_next()
        alterarPontuaçãoMax(simon.level)
    }
})

addEventListener('click', (event) => {
    if (simon.level == -1) {
        simon.reset()
        simon.add_next()
        alterarPontuaçãoMax(simon.level)
    }
})