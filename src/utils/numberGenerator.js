/**
 * Classe que gera os números randomicos dentro do intervalo dado
 */

class numberGenerator {
  constructor (min = 0, max = 100) {
    this.min = min
    this.max = max
    this.generatedNumbers = []
  }

  setMinMax (min, max) {
    this.min = min
    this.max = max
  }

  getMinMax () {
    return {
      min: this.min,
      max: this.max
    }
  }

  generate () {
    let num
    let found = true
    while (found) {
      num = String(Math.round(Math.random() * (this.max - this.min)) + this.min)
      found = this.generatedNumbers.includes(num)
    }
    this.generatedNumbers.push(num)
    return num
  }
}

export default numberGenerator;
