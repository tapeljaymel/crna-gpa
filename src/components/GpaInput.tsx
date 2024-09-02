import React, { useRef, useEffect } from "react";
import styled from "styled-components";

type GpaInputProps = {
    index: number;
    isActive: boolean;
    name: string;
    grade: number;
    hours: number;
    onChange: (index: number, updatedValue: { hours: number; grade: number; isActive: boolean }) => void;
    onActivate: (index: number) => void;
}

export const GpaInput = (props: GpaInputProps) => {
    const gradeInputRef = useRef<HTMLInputElement>(null);
    const hoursInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (props.isActive) {
            gradeInputRef.current?.focus();
        }
    }, [props.isActive]);

    const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(props.index, { hours: props.hours, grade: parseFloat(e.target.value), isActive: props.isActive });
    };

    const handleGradeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            hoursInputRef.current?.focus();
        }
    };

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHours = parseFloat(e.target.value);
        props.onChange(props.index, { hours: newHours, grade: props.grade, isActive: props.isActive });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.onChange(props.index, { hours: props.hours, grade: props.grade, isActive: false });
            if (props.index + 1 < 5) {  // Assuming there are always 5 inputs
                props.onActivate(props.index + 1);
            }
        }
    };

    const handleClick = () => {
        if (!props.isActive) {
            props.onActivate(props.index);
        }
    };

    return (
        <InputContainer isActive={props.isActive} onClick={handleClick}>
            <Label isActive={props.isActive}>
                {props.name}
                <Input 
                    type="number" 
                    value={props.grade} 
                    onChange={handleGradeChange} 
                    onKeyDown={handleGradeKeyDown} 
                    disabled={!props.isActive}
                    ref={gradeInputRef}
                    min={0}          
                    max={4.0}        
                    step={0.01}    
                />
            </Label>
            <Label isActive={props.isActive}>
                Total Credit Hours
                <Input 
                    type="number" 
                    value={props.hours} 
                    onChange={handleHoursChange} 
                    onKeyDown={handleKeyDown} 
                    ref={hoursInputRef}
                    disabled={!props.isActive}
                />
            </Label>
        </InputContainer>
    )
}

const InputContainer = styled.div<{ isActive: boolean }> `
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ isActive }) => (isActive ? '#91a1d5' : 'transparent')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#444')};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    cursor: pointer;
`

const Input = styled.input `
    border: 1px solid #c7c7c7;
    margin: 0 10px;
    max-width: 60px;
    padding: 5px;
    margin-left: auto;
    border-radius: 5px;
    color: #444;
`

const Label = styled.label<{isActive: boolean}> `
    display: flex;
    column-gap: 10px;
    font-size: 0.8rem;
    align-items: center;
`
