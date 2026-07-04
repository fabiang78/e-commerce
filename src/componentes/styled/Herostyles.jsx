import styled from "styled-components";

export const Hero = styled.section`
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  text-align: center;
  padding: 60px 20px;
  border-radius: 12px;
  margin-bottom: 40px;
`;

export const HeroTitulo = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

export const HeroTexto = styled.p`
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: rgba(255, 255, 255, 0.9);
`;

export const HeroButton = styled.button`
  background-color: white;
  color: #2563eb;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
    transform: scale(1.05);
  }
`;