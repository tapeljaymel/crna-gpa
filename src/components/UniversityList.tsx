import styled from "styled-components";
import { useState } from "react";

// type universityRecord = {
//     name: string;
//     totalQualityPoints: number;
//     gpaHours: number;
//     universityGpa: number;
// }

const UniversityList = () => {
    const [universityData, setUniversityData] = useState([
        { name: "University 1", totalQualityPoints: 255, gpaHours: 89, universityGpa: 2.87 },
        { name: "University 2", totalQualityPoints: 54, gpaHours: 15, universityGpa: 3.6 },
        { name: "University 4", totalQualityPoints: 345, gpaHours: 90, universityGpa: 3.83 },
        { name: "University 5", totalQualityPoints: 345, gpaHours: 90, universityGpa: 3.83 },
        { name: "University 6", totalQualityPoints: 255, gpaHours: 89, universityGpa: 2.87 },
        { name: "University 7", totalQualityPoints: 54, gpaHours: 15, universityGpa: 3.6 },
        { name: "University 8", totalQualityPoints: 345, gpaHours: 90, universityGpa: 3.83 },
        { name: "University 9", totalQualityPoints: 345, gpaHours: 90, universityGpa: 3.83 },
        { name: "University 10", totalQualityPoints: 255, gpaHours: 89, universityGpa: 2.87 },
        { name: "University 11", totalQualityPoints: 54, gpaHours: 15, universityGpa: 3.6 },
        { name: "University 12", totalQualityPoints: 345, gpaHours: 90, universityGpa: 3.83 }
    ]);

    // const [universityData, setUniversityData] = useState<universityRecord[]>([]);

    const [newUniversity, setNewUniversity] = useState({ name: "", totalQualityPoints: "", gpaHours: "", universityGpa: "" });

    const handleAddUniversity = () => {
        if (newUniversity.name && newUniversity.totalQualityPoints && newUniversity.gpaHours && newUniversity.universityGpa) {
            setUniversityData([
                ...universityData,
                {
                    name: newUniversity.name,
                    totalQualityPoints: parseFloat(newUniversity.totalQualityPoints),
                    gpaHours: parseFloat(newUniversity.gpaHours),
                    universityGpa: parseFloat(newUniversity.universityGpa)
                }
            ]);
            setNewUniversity({ name: "", totalQualityPoints: "", gpaHours: "", universityGpa: "" });
        }
    };


    // GPA Calculation Formula:

    // GPA = Total Quality Points / Total Credit Hours

    // Where:
    // - Total Quality Points = Sum of (Grade * Credit Hours) for all courses
    // - Total Credit Hours = Sum of Credit Hours for all courses

    // Example Calculation:

    // Suppose you have 3 courses with the following grades and credit hours:

    // Course 1: Grade = 4.0, Credit Hours = 3
    // Course 2: Grade = 3.7, Credit Hours = 4
    // Course 3: Grade = 3.3, Credit Hours = 2

    // Step 1: Calculate Total Quality Points
    // Total Quality Points = (4.0 * 3) + (3.7 * 4) + (3.3 * 2)
    // Total Quality Points = 12 + 14.8 + 6.6 = 33.4

    // Step 2: Calculate Total Credit Hours
    // Total Credit Hours = 3 + 4 + 2 = 9

    // Step 3: Calculate GPA
    // GPA = Total Quality Points / Total Credit Hours
    // GPA = 33.4 / 9 = 3.71

    // The GPA for these courses would be 3.71.

    const cumulativeGPA = () => {
        let totalQualityPoints = 0;
        let totalGpaHours = 0;
    
        // Loop through each university and calculate total quality points and total GPA hours
        for (let i = 0; i < universityData.length; i++) {
            const university = universityData[i];
            const qualityPoints = university.universityGpa * university.gpaHours;
            totalQualityPoints += qualityPoints;
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
                                <TableCell>{university.universityGpa}</TableCell>
                            </tr>
                        ))}
                    </tbody>
                </TableBody>

                <FormContainer>
                    <Input
                        type="text"
                        placeholder="University Name"
                        value={newUniversity.name}
                        onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="Total Quality Points"
                        value={newUniversity.totalQualityPoints}
                        onChange={(e) => setNewUniversity({ ...newUniversity, totalQualityPoints: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="GPA Hours"
                        value={newUniversity.gpaHours}
                        onChange={(e) => setNewUniversity({ ...newUniversity, gpaHours: e.target.value })}
                    />
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="University GPA"
                        value={newUniversity.universityGpa}
                        onChange={(e) => setNewUniversity({ ...newUniversity, universityGpa: e.target.value })}
                    />
                </FormContainer>
                <ButtonContainer>
                    <AddButton onClick={handleAddUniversity}>Add University</AddButton>
                </ButtonContainer>

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
    margin: 0 auto;
    display: flex;
    column-gap: 0;
    flex-direction: row;
    align-items: center;
`
const ButtonContainer = styled.div`
    max-width: 1000px;
    margin: 30px  auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const Input = styled.input`
    padding: 10px;
    width: 80%;
    border-radius: 0px;
    border: 1px solid #ddd;
`

const AddButton = styled.button`
    background-color: #202042;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    min-width: 200px;

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
