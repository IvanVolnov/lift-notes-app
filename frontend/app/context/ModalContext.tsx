'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import ModalBase from '../components/Modal/ModalBase';

// export interface ModeData {
//   id?: string;
//   name?: string;
//   description?: string;
// }

interface Mode {
  entity: Entity;
  operation: Operation;
  modeData?: Content;
}

interface ModalContextProps {
  isOpened: boolean;
  mode: Mode;
  toggleModal: (
    newEntity?: Entity,
    newOperation?: Operation,
    modeData?: Content
  ) => void;
}

const ModalContextDefaultValue: ModalContextProps = {
  isOpened: false,
  mode: { entity: 'workout', operation: 'create' },
  toggleModal: () => {},
};

const ModalContext = createContext<ModalContextProps>(ModalContextDefaultValue);

ModalContext.displayName = 'ModalContext';

export function UseModal() {
  return useContext(ModalContext);
}

interface Props {
  children: ReactNode;
}

export function ModalProvider({ children }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [mode, setMode] = useState<Mode>({
    entity: 'workout',
    operation: 'create',
  });

  function toggleModal(
    newEntity?: Entity,
    newOperation?: Operation,
    modeData?: Content
  ) {
    setIsOpened((prev) => !prev);
    if (newEntity && newOperation) {
      const newMode: Mode = {
        entity: newEntity,
        operation: newOperation,
        modeData,
      };
      setMode(newMode);
    }
  }

  return (
    <ModalContext.Provider value={{ isOpened, mode, toggleModal }}>
      <ModalBase isOpened={isOpened} />
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
