import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
  grid-column: 1/-1;
`;

const Text = styled.span`
  font-size: 14px;
  text-align: center;
  color: #1864ab;
`;

function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDateString(dateStr) {
  if (!dateStr) return '';
  const date = parseLocalDate(dateStr);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('es-MX').format(date);
}

function IndicatorDate({ date }) {
  const hasDates = date?.from && date?.to;
  const formattedFrom = formatDateString(date.from);
  const formattedTo = formatDateString(date.to);

  return (
    <Wrapper>
      {hasDates && formattedFrom && formattedTo ? (
        <>
          <Text>De: {formattedFrom}</Text>
          <Text>A: {formattedTo}</Text>
        </>
      ) : (
        <Text>Seleccione rango de fechas</Text>
      )}
    </Wrapper>
  );
}

export default IndicatorDate;
