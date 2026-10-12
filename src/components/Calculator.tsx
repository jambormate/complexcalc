import { useState } from 'react'

function Calculator() {
    const [display, setDisplay] = useState('0')
    const [firstNumber, setFirstNumber] = useState<number | null>(null)
    const [operation, setOperation] = useState('')
    const [newNumber, setNewNumber] = useState(false)

    function addNumber(number: string) {
        if (newNumber || display === 'Hiba') {
            setDisplay(number === ',' ? '0,' : number)
            setNewNumber(false)
        } else if (number !== ',' || !display.includes(',')) {
            setDisplay(display === '0' && number !== ',' ? number : display + number)
        }
    }

    function chooseOperation(selectedOperation: string) {
        setFirstNumber(Number(display.replace(',', '.')))
        setOperation(selectedOperation)
        setNewNumber(true)
    }

    function calculate() {
        if (firstNumber === null || operation === '') return

        const secondNumber = Number(display.replace(',', '.'))
        let result = 0

        if (operation === '+') result = firstNumber + secondNumber
        else if (operation === '-') result = firstNumber - secondNumber
        else if (operation === '*') result = firstNumber * secondNumber
        else if (operation === '/') {
            if (secondNumber === 0) {
                setDisplay('Hiba')
                setFirstNumber(null)
                setOperation('')
                setNewNumber(true)
                return
            }
            result = firstNumber / secondNumber
        }

        if (!Number.isFinite(result)) {
            setDisplay('Hiba')
        } else {
            setDisplay(String(Number(result.toPrecision(10))).replace('.', ','))
        }

        setFirstNumber(null)
        setOperation('')
        setNewNumber(true)
    }

    function clearCalculator() {
        setDisplay('0')
        setFirstNumber(null)
        setOperation('')
        setNewNumber(false)
    }

    return (
        <div className="card shadow p-3 mx-auto" style={{ maxWidth: '350px' }}>
            <div
                className="bg-dark text-white text-end rounded p-3 mb-3 fs-2"
                style={{ minHeight: '75px'}}
            >
                {display}
            </div>

            <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <button className="btn btn-danger" onClick={clearCalculator}>C</button>
                <button className="btn btn-secondary" onClick={() => chooseOperation('/')}>÷</button>
                <button className="btn btn-secondary" onClick={() => chooseOperation('*')}>×</button>
                <button className="btn btn-secondary" onClick={() => chooseOperation('-')}>−</button>

                <button className="btn btn-light border" onClick={() => addNumber('7')}>7</button>
                <button className="btn btn-light border" onClick={() => addNumber('8')}>8</button>
                <button className="btn btn-light border" onClick={() => addNumber('9')}>9</button>
                <button className="btn btn-secondary" onClick={() => chooseOperation('+')}>+</button>

                <button className="btn btn-light border" onClick={() => addNumber('4')}>4</button>
                <button className="btn btn-light border" onClick={() => addNumber('5')}>5</button>
                <button className="btn btn-light border" onClick={() => addNumber('6')}>6</button>
                <button className="btn btn-light border" onClick={() => addNumber('1')}>1</button>

                <button className="btn btn-light border" onClick={() => addNumber('2')}>2</button>
                <button className="btn btn-light border" onClick={() => addNumber('3')}>3</button>
                <button className="btn btn-primary" onClick={calculate}>=</button>
                <button className="btn btn-light border" onClick={() => addNumber('0')}>0</button>

                <button
                    className="btn btn-light border"
                    style={{ gridColumn: 'span 3' }}
                    onClick={() => addNumber(',')}
                >
                    ,
                </button>
            </div>
        </div>
    )
}

export default Calculator
