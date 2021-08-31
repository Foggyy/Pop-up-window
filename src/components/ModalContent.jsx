import React, {useRef, useState} from 'react';
import closingCross from '../images/closingCross.png'
import checkboxChecked from '../images/checkboxChecked.png';
import styled from "styled-components";

const Header = styled.h3`
    font-size: 28px;
`

const CrossImage = styled.img`
    position: absolute;
    width: 18px;
    height: 18px;
    right: 23px;
    top: 27px;
    cursor: pointer;
`

const HelpText = styled.p`
    color: #808080;
    padding-top: 16px;
`

const SalaryCaption = styled.p`
    padding-top: 24px;
    font-weight: 600;
`

const SalaryInput = styled.input`
    border: ${props => props.error ? '1px solid #EA0029' : '1px solid #DFE3E6'};
    border-radius: 3px;
    margin-top: 8px;
    height: 40px;
    width: 100%;
    padding-left: 10px;
    
    &:focus{
      outline: none;
    }
    
    &:hover{
      border: 1px solid #000000;
      transition: 0.3s;
    }
`

const SalaryInputError = styled.p`
    margin-top: 4px;
    color: #EA0029;
    font-size: 10px;
`

const Calculate = styled.p`
    font-weight: 510;
    color: #EA0029;
    margin-top: 8px;
    cursor: pointer;
    
    &:hover{
      color: #F53A31;
      transition: 0.3s;
    }
`

const ReducingText = styled.p`
    font-weight: 510;
`

const ReducingContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 28px;
    
    @media (max-width: 767px){
      flex-direction: column;
      align-items: start;
    }
`

const ReducingButton = styled.button`
    padding: 6px 12px;
    width: 73px;
    height: 36px;
    margin-right: 16px;
    border-radius: 50px;
    background: ${props => props.active ? 'linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56' : '#EEF0F2'};
    color: ${props => props.active ? '#FFFFFF' : '#000000'};
    cursor: pointer;
    transition: background 0.2s;
`

const ReducingButtonsContainer = styled.div`
    margin-left: 32px;
    
    @media (max-width: 767px){
      margin-left: 0;
      margin-top: 30px;
    }
`

const AddButton = styled.button`
    display: flex;
    justify-content: center;
    border-radius: 6px;
    padding: 4%;
    width: 100%;
    margin-top: 40px;
    text-align: center;
    color: #FFFFFF;
    background: linear-gradient(255.35deg, #DC3131 0.83%, rgba(255, 79, 79, 0) 108.93%), #FF5E56;
    box-shadow: 0px 0px 24px rgba(234, 0, 41, 0.33);
    
    &:hover{
      background: #EA0029;
      transition: 0.2s;
    }
    
    @media (max-width: 560px){
      padding: 3%;
    }
`

const CheckboxesInfo = styled.p`
    margin-top: 16px;
    font-weight: 510;
`

const CheckboxContainer = styled.div`
    margin-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #DFE3E6;
`

const Checkbox = styled.input`
      position: absolute;
      z-index: -1;
      opacity: 0;
      
      +label{
          display: inline-flex;
          align-items: center;
          user-select: none;
        
        &:before{
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 1px solid #DFE3E6;
          border-radius: 6px;
          margin-right: 11px;
          background: #FFFFFF;
          cursor: pointer;
          
        }
      }
      
      :checked + label{
        &:before{
          border: none;
          background-image: url(${checkboxChecked});
        }
      }
      
      :not(:disabled):not(:checked)+label:hover{
        &:before{
          border: 1px solid #000000;
          transition: 0.3s;
        }
      }
`


const ModalContent = (props) => {

    const [salary, setSalary] = useState("");
    const [payment, setPayment] = useState(true);
    const [period, setPeriod] = useState(false);
    const [showCalculations, setShowCalculations] = useState(false);
    const [taxDeductionArray, setTaxDeductionArray] = useState([]);
    const [errorSalary, setErrorSalary] = useState("");
    const bufArray = JSON.parse(JSON.stringify(taxDeductionArray));
    const inputSalary = useRef(null);

    function calculateTaxDeduction(){
        if(!salary)
        {
            setErrorSalary("Поле обязательно для заполнения")
            return;
        }

        let limit = 260000;
        const arrayOfDeductions = []
        const taxDeductionPerYear = (Number(salary.substring(0, salary.length - 2)) * 12) * 0.13;
        while(taxDeductionPerYear < limit){
            arrayOfDeductions.push({
                value: taxDeductionPerYear,
                checked: false
            });
            limit = limit - taxDeductionPerYear;
        }

        if(limit > 0)
            arrayOfDeductions.push({
                value: limit,
                checked: false
            });


        setTaxDeductionArray(arrayOfDeductions);
        setShowCalculations(true);
    }

    function inputSalaryOnChange(e){
        const value = e.target.value;
        let digits = value.match(/\d/g) || ['0'];
        const newCursorPosition = digits.length;
        setErrorSalary('');
        if(value.includes('₽') && digits[0] === '0' || value === '0')
            setSalary('')
        else
            setSalary(digits.join('') + ' ₽');

        setTimeout(() => {
            inputSalary.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    }

    function handleTaxDeductionArrayChange(e, index){
        bufArray[index].checked = e.target.checked;
        setTaxDeductionArray(bufArray);
    }

    function handleAddButtonClick(){
        let flag = false;
        for (let i = 0; i<taxDeductionArray.length; i++){
            if(taxDeductionArray[i].checked){
                flag = true;
                break;
            }
        }
        if(flag)
            alert("Добавлено!");
        else
            alert("Выберите хотя бы один налоговый вычет")
    }

    return (
        <div>
            <div>
                <Header>Налоговый вычет</Header>
                <CrossImage src={closingCross} alt={"Закрыть окно"} onClick={props.onClick}/>
            </div>
            <HelpText>Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.</HelpText>
            <SalaryCaption>Ваша зарплата в месяц:</SalaryCaption>
            <SalaryInput error={errorSalary} ref={inputSalary} value={salary} onChange={(e) => inputSalaryOnChange(e)}/>
            {errorSalary &&
                <SalaryInputError>{errorSalary}</SalaryInputError>
            }
            <Calculate onClick={() => calculateTaxDeduction()}>Рассчитать</Calculate>
            {showCalculations &&
                <div>
                    <CheckboxesInfo>Итого можете внести в качестве досрочных:</CheckboxesInfo>
                    {taxDeductionArray.length && taxDeductionArray.map((item, index) => {
                        return(
                            <CheckboxContainer key={"checkbox_deduction_key_" + index}>
                                <Checkbox id={"checkbox_deduction_" + index} type={"checkbox"} value={item.checked} checked={item.checked}
                                       onChange={(e) => handleTaxDeductionArrayChange(e, index)}/>
                                <label htmlFor={"checkbox_deduction_" + index}>{item.value} рублей в {index + 1}-ый год</label>
                            </CheckboxContainer>
                        )
                    })}
                </div>
            }
            <ReducingContainer>
                <ReducingText>Что уменьшаем?</ReducingText>
                <ReducingButtonsContainer>
                    <ReducingButton active={payment} onClick={() => {setPayment(true); setPeriod(false)}}>Платеж</ReducingButton>
                    <ReducingButton active={period} onClick={() => {setPeriod(true); setPayment(false)}}>Срок</ReducingButton>
                </ReducingButtonsContainer>
            </ReducingContainer>
            <AddButton onClick={() => handleAddButtonClick()}>Добавить</AddButton>
        </div>
    );
};

export default ModalContent;