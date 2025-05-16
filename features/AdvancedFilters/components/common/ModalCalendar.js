import IconButton from '@material-ui/core/IconButton';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  position: relative;
`;

const ModalCalendarStyled = styled.div`
  position: absolute;
  top: 35px;
  right: 20%;
  z-index: 999;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

function ModalCalendar({ setOpen, open, children, ignoreRef }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current?.contains(event.target) ||
        ignoreRef?.current?.contains(event.target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [setOpen, ignoreRef]);

  return (
    <CalendarWrapper>
      {open && (
        <ModalCalendarStyled ref={modalRef}>{children}</ModalCalendarStyled>
      )}
    </CalendarWrapper>
  );
}

export default ModalCalendar;
