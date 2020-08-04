class Calculator {
    constructor(calculatorSelector){

        /**
         * Current operator in the evaluation spoofer
         * @type {String}
         */
        this.op = ''

        /**
         * Result from the last operation
         * @type {Number}
         */
        this.buffer = 0

        /**
         * Flush number on the next number input
         * @type {Boolean}
         */
        this.flush = false
        
        /**
         * Calculator element
         * @type {HTMLObjectElement}
         */
        this.calculator = document.querySelector(calculatorSelector)
        
        /**
         * Display element
         * @type {HTMLObjectElement}
         */
        this.display = this.calculator.querySelector('.display .result')
        

        this.display.innerHTML = '&nbsp;'
        this.initListeners()

    }

    /**
     * Add a new operation to the evaluation spoofer
     * @param {String} newOp 
     */
    addOp(newOp) {
        
        if(this.flush && this.op != '') {
            this.op = newOp
            return
        }

        this.flush = true

        if(this.op != ''){
            this.evaluate()
        }

        this.buffer = Number(this.display.innerText)
        
        this.op = newOp
    }
    
    /**
     * Evaluate the current expression on the evaluation spoofer
     */
    evaluate() {
        let result = 0

        switch (this.op) {
            case '%':
                break;
            case '÷':
                result = this.buffer / Number(this.display.innerText)
                break;
            case '×':
                result = this.buffer * Number(this.display.innerText)
                break;
            case '−':
                result = this.buffer - Number(this.display.innerText)
                break;
            case '+':
                result = this.buffer + Number(this.display.innerText)
                break;
            default:
                result = Number(this.display.innerText)
                break;
        }
    
        this.result(result)

        this.buffer = 0
        this.op = ''
    }

    /**
     * Result the specified percent of the current value on buffer
     */
    percent() {
        this.result(this.buffer * Number(this.display.innerText)/100)
    }

    /**
     * Result the numeric inverse of the current value on display
     */
    invert() {
        this.result(Number(this.display.innerText) * -1)
    }

    /**
     * Replace the current display value with the specified result
     * @param {Number} res 
     */
    result(res) {
        if(String(res).length > 8) res = Number(res).toExponential()
        this.display.innerHTML = res
        this.flush = true
    }

    /**
     * Reset the display value
     */
    reset() {
        this.display.innerHTML = '&nbsp;'
    }

    /**
     * Reset display, buffer and operation values
     */
    allClear(){
        this.reset()
        this.buffer = 0
        this.op = ''
    }

    /**
     * Append the specified value to the display
     * @param {String} value 
     */
    append(value) {
        if(value === '.' && String(this.display.innerText).includes('.')) return
        if(this.flush) {
            this.reset()
            this.flush = false
        }
        this.display.innerHTML += value
    }

    /**
     * Initialize all listeners with the specific function to each button
     */
    initListeners(){
        let numbers = Array.prototype.slice.call(this.calculator.querySelectorAll('.number'))
        let operators = Array.prototype.slice.call(this.calculator.querySelectorAll('.operator'))

        let calc = this
        
        for (const n of numbers) {
            n.addEventListener('click', function() {
                calc.append(n.innerText)
            })
        }

        for (const o of operators) {
            o.addEventListener('click', function() {
                calc.addOp(o.innerText)
            })
        }

        this.calculator.querySelector('#ac')
            .addEventListener('click', function() {
                calc.allClear()
            })
        
        this.calculator.querySelector('#invert')
            .addEventListener('click', function() {
                calc.invert()
            })
        
        this.calculator.querySelector('#equals')
            .addEventListener('click', function() {
                calc.evaluate()
            })
        
        this.calculator.querySelector('#percent')
            .addEventListener('click', function() {
                calc.percent()
            })
        
    }

}

window.onload = function() {
    new Calculator('.calculator')
}
