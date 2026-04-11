import { styled } from "solid-styled-components";

const Overlay = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
`

const ContainerModal = styled('div')`
  padding: 20px;
  position: relative;
  width: 400px;
  height: 400px;
  background-color: rgba(78, 148, 228, 0.8);
  border-radius: 20px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled('button')`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

export const Modal = () => {
    return (
        <Overlay>
            <ContainerModal>
                <CloseButton>X</CloseButton>
            </ContainerModal>
        </Overlay>
    )
}
