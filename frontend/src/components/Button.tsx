import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}
const Button = ({ onClick, children }: ButtonProps) => {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

export default Button;

const CustomButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;
