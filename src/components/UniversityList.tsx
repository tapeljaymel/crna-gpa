import styled from "styled-components";
import { useState, useRef } from "react";

type universityRecord = {
    name: string;
    totalQualityPoints: number;
    gpaHours: number;
    universityGpa: number;
}

const UniversityList = () => {

    const [universityData, setUniversityData] = useState<universityRecord[]>([]);
    const [newUniversity, setNewUniversity] = useState({ name: "", totalQualityPoints: "", gpaHours: "" });

    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleAddUniversity = () => {
        if (newUniversity.name && newUniversity.totalQualityPoints && newUniversity.gpaHours) {
            const calculatedGpa = parseFloat(newUniversity.totalQualityPoints) / parseFloat(newUniversity.gpaHours);

            setUniversityData([
                ...universityData,
                {
                    name: newUniversity.name,
                    totalQualityPoints: parseFloat(newUniversity.totalQualityPoints),
                    gpaHours: parseFloat(newUniversity.gpaHours),
                    universityGpa: calculatedGpa
                }
            ]);

            setNewUniversity({ name: "", totalQualityPoints: "", gpaHours: "" });

            if (nameInputRef.current) {
                nameInputRef.current.focus(); // Move cursor back to the University Name input
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddUniversity();
        }
    };

    const cumulativeGPA = () => {
        let totalQualityPoints = 0;
        let totalGpaHours = 0;

        // Loop through each university and calculate total quality points and total GPA hours
        for (let i = 0; i < universityData.length; i++) {
            const university = universityData[i];
            totalQualityPoints += university.totalQualityPoints;
            totalGpaHours += university.gpaHours;
        }

        if (totalGpaHours === 0) {
            return "0.00"; // Prevent division by zero
        }

        const cumulativeGpa = totalQualityPoints / totalGpaHours;

        return cumulativeGpa.toFixed(2);
    };

    return (
        <>
            <ShadowContainer>
                <TableHead>
                    <thead>
                        <tr>
                            <TableHeadCell>University</TableHeadCell>
                            <TableHeadCell>Total Quality Points</TableHeadCell>
                            <TableHeadCell>GPA Hours</TableHeadCell>
                            <TableHeadCell>University GPA</TableHeadCell>
                        </tr>
                    </thead>
                </TableHead>
            </ShadowContainer>

            <ColoredContainer>
                <TableBody>
                    <tbody>
                        {universityData.map((university, index) => (
                            <tr key={index}>
                                <TableCell>{university.name}</TableCell>
                                <TableCell>{university.totalQualityPoints}</TableCell>
                                <TableCell>{university.gpaHours}</TableCell>
                                <TableCell>{university.universityGpa.toFixed(2)}</TableCell>
                            </tr>
                        ))}
                    </tbody>
                </TableBody>

                <FormContainer>
                    <Input
                        ref={nameInputRef}
                        type="text"
                        placeholder="University Name"
                        value={newUniversity.name}
                        onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
                        onKeyPress={handleKeyPress}
                    />
                    <Input
                        type="number"
                        placeholder="Total Quality Points"
                        value={newUniversity.totalQualityPoints}
                        onChange={(e) => setNewUniversity({ ...newUniversity, totalQualityPoints: e.target.value })}
                        onKeyPress={handleKeyPress}
                    />
                    <Input
                        type="number"
                        placeholder="GPA Hours"
                        value={newUniversity.gpaHours}
                        onChange={(e) => setNewUniversity({ ...newUniversity, gpaHours: e.target.value })}
                        onKeyPress={handleKeyPress}
                    />
                    <AddButton onClick={handleAddUniversity}>Add University</AddButton>
                </FormContainer>

                <ResultContainer>
                    <ResultTable>
                        <tbody>
                            <tr>
                                <ResultCell>Results</ResultCell>
                                <ResultCell>{cumulativeGPA()}</ResultCell>
                            </tr>
                        </tbody>
                    </ResultTable>
                </ResultContainer>
            </ColoredContainer>
        </>
    );
}

export default UniversityList;

const ShadowContainer = styled.div`
    margin-top: 60px;
    width: 100%;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
    z-index: 9;
    position: relative;
`

const TableHead = styled.table`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
`

const TableHeadCell = styled.th`
    width: 25%;
    background-color: #91a1d5;
    color: #fff;
    padding: 15px;
    border-right: 1px solid #a1afdb;
`

const ColoredContainer = styled.div`
    padding-top: 30px;
    background-color: #eff2f7;
    padding-bottom: 100px;
`

const TableBody = styled.table`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
`

const TableCell = styled.td`
    width: 25%;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    background-color: #fff;
`

const FormContainer = styled.div`
    max-width: 1000px;
    margin: 60px auto;
    display: flex;
    column-gap: 0;
    flex-direction: row;
    align-items: center;
`
const Input = styled.input`
    padding: 10px;
    width: 25%;
    border-radius: 0px;
    border: 1px solid #ddd;
`

const AddButton = styled.button`
    background-color: #202042;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 0px;
    cursor: pointer;
    min-width: 200px;
    width: 25%;

    &:hover {
        background-color: #151531;
    }
`

const ResultContainer = styled.div`
    display: flex;
    max-width: 1000px;
    margin: 0 auto;
    justify-content: flex-end;
`

const ResultTable = styled.table`
    width: 50%;
    border-collapse: collapse;
`

const ResultCell = styled.td`
    padding: 15px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    text-align: center;
`
