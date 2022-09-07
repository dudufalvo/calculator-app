import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext'

const getStyleName = (button) => {
    const className = {
        '=': 'equals',
        'x': 'opt',
        '/': 'opt',
        '+': 'opt',
        '-': 'opt',
    }

    return className[button]
}


const Button = ({ value }) => {
    const { calc, setCalc } = useContext(CalcContext)

    const commaClick = () => {
        setCalc({
            ...calc,
            number: !calc.number.toString().includes('.')? calc.number + value : calc.number
        })
    }

    const resetClick = () => {
        setCalc({
            sign: '',
            number: 0,
            result: 0
        })
    }
    
    const signClick = () => {
        setCalc({
            sign: value,
            result: !calc.result && calc.number? calc.number : calc.result,
            number: 0 
        })
    }

    const equalsClick = () => {
        if (calc.result && calc.number) {
            const math = (res, num, sig) => {
                const result = {
                    '+': (res, num) => res + num,
                    '-': (res, num) => res - num,
                    'x': (res, num) => res * num,
                    '/': (res, num) => res / num,
                }

                return result[sig](res, num)
            }
            setCalc({
                sign: '',
                result: math(calc.result, calc.number, calc.sign),
                number: 0
            })
        }
    }

    const percentClick = () => {
        setCalc({
            number: (calc.number/100),
            result: (calc.result/100),
            sign: ''
        })
    }

    const invertClick = () => {
        setCalc({
            number: calc.number? calc.number*(-1) : 0,
            result: calc.result? calc.result*(-1) : 0,
            sign: ''
        })
    }

    const handleClickBtn = () => {
        const numberString = value.toString()
        let numberValue;

        if (numberString === '0' && calc.number === 0) {
            numberValue = 0
        }
        else {
            numberValue = Number(calc.number + numberString)
        }
        console.log(numberValue)
        setCalc({...calc, number: numberValue})
    }

    const handleBtnClick = () => {
        const results = {
            '.': commaClick,
            'C': resetClick,
            '/': signClick,
            'x': signClick,
            '-': signClick,
            '+': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+-': invertClick
        }
        
        if (!results[value]) return handleClickBtn()
        return results[value]()
    }

    return (
        <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{ value }</button>
    )
}

export default Button