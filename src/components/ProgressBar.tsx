import styled from "styled-components";

type Props = {
    currentIndex: number;
    maxIndex: number;
}

const ProgressBar = (props: Props) => {
  return (
    <ProgressBarLine>
      {Array.from({ length: props.maxIndex }).map((_, index) => (
            <ProgressBarCircle key={index} isActive={index <= props.currentIndex} />
        ))}
    </ProgressBarLine>
    
  )
}

const ProgressBarLine = styled.div `
    width: 100%;
    height: 20px;
    display: flex;
    position: relative;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 40px;

    &:after {
      position: absolute;
      width: 100%;
      background-color: #eaecf0;
      height: 50%;
      top: 50%;
      transform: translateY(-50%);
      content: "";
  }
`

const ProgressBarCircle = styled.div<{isActive:boolean}> `
    z-index: 999;
    height: 30px;
    width: 30px;
    transform: translateY(-5px);
    box-shadow: 0px 5px 5px rgba(120, 120, 120, 0.3);
    border-radius: 50%;
    background-color: ${({ isActive }) => (isActive ? '#202042' : '#fff')};
`


export default ProgressBar