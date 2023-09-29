import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// compound component, 4 steps
// modal component itself should be responsible to know weather it is currently open or not

// 1. create new context
const ModalContext = createContext();

// 2. create parent component
function Modal({ children }) {
  // state update functions
  const [openName, setOpenName] = useState('');

  // handler functions
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    // value will be available to all children now
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// excepts opens from AddCabin Modal like opens="cabin-form"
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext); // get open function from context

  // add openEvent handler to the children which is button and is in Modal itself
  return cloneElement(children, { onClick: () => open(opensWindowName) }); // it will set openName either opens="cabin-form" or opens="table"
}
// 2. parent component
// get createForm as a children
// name="cabin-form" or name="table"
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext); // get openName state and close function from context
  const ref = useOutsideClick(close);
  // if name is different from the name we get from context then return nothing otherwise return createPortal
  if (name !== openName) return null;
  //createPortal = render component inside body to avoid css override from parent element like overflow:hidden

  return createPortal(
    <Overlay>
      <div>
        <StyledModal ref={ref}>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </StyledModal>
      </div>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
