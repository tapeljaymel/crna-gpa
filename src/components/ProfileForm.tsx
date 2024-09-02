import styled from "styled-components";
import { GpaInput } from "./GpaInput";
import ProgressBar from "./ProgressBar";
import { useState } from "react";

type GpaInputType = {
    name: string;
    hours: number;
    grade: number;
    isActive: boolean;
};

export const ProfileForm = () => {

    const initialInputs: GpaInputType[] = [
        { name: "Cumulative GPA", hours: 0, grade: 0, isActive: true },
        { name: "Science GPA", hours: 0, grade: 0, isActive: false },
        { name: "Last 60 Credits GPA", hours: 0, grade: 0, isActive: false },
        { name: "BSN GPA", hours: 0, grade: 0, isActive: false },
        { name: "Graduate GPA", hours: 0, grade: 0, isActive: false },
    ];

    const [inputs, setInputs] = useState<GpaInputType[]>(() => {
        const savedInputs = localStorage.getItem('gpaInputs');
        return savedInputs ? JSON.parse(savedInputs) : initialInputs;
    });

    const [progress, setProgress] = useState(0);

    const handleOnChange = (index: number, updatedValue: { hours: number, grade: number; isActive: boolean }) => {
        const newInputs = inputs.map((input, i) =>
            i === index ? { ...input, ...updatedValue } : input
        );

        setInputs(newInputs);
        setProgress(index);
    }

    const handleActivate = (index: number) => {
        const newInputs = inputs.map((input, i) => ({
            ...input,
            isActive: i === index
        }));

        setInputs(newInputs);
        setProgress(index);
    }

    const handleSave = () => {
        const inactiveInputs = inputs.map(input => ({ ...input, isActive: false }));
        setInputs(inactiveInputs);
        localStorage.setItem('gpaInputs', JSON.stringify(inactiveInputs));
    }

    const handleReset = () => {
        setInputs(initialInputs);
        setProgress(0);
        localStorage.removeItem('gpaInputs');
    }

    return (
        <FormContainer>
            <FormRow>
                {inputs.map((input, index) => (
                    <GpaInput
                        key={index}
                        index={index}
                        onChange={handleOnChange}
                        onActivate={handleActivate}
                        name={input.name}
                        hours={input.hours}
                        isActive={input.isActive}
                        grade={input.grade}
                    />
                ))}
            </FormRow>

            <ProgressBar currentIndex={progress} maxIndex={inputs.length}></ProgressBar>

            <ButtonRow>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleReset}>Reset</Button>
            </ButtonRow>
        </FormContainer>
    );
}

export default ProfileForm;

const FormContainer = styled.div`
    padding: 20px;
`

const FormRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #202042;
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    min-width: 100px;

    &:hover {
        background-color: #151531;
    }
`;
