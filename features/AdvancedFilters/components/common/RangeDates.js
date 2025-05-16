import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-date-range';

import styled from 'styled-components';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { es } from 'date-fns/locale';

const StyledCalendarWrapper = styled.div``;

function RangeDates({ onChange, defaultFrom = '', defaultTo = '' }) {
  const initialRange = {
    startDate: defaultFrom ? parseISO(defaultFrom) : new Date(),
    endDate: defaultTo ? parseISO(defaultTo) : new Date(),
    key: 'selection',
  };

  const [range, setRange] = useState(initialRange);

  const handleChange = (item) => {
    const { startDate, endDate } = item.selection;
    setRange(item.selection);

    if (startDate && endDate) {
      onChange?.({
        from: format(startDate, 'yyyy-MM-dd'),
        to: format(endDate, 'yyyy-MM-dd'),
      });
    } else {
      onChange?.({ from: '', to: '' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <StyledCalendarWrapper>
        <DateRange
          locale={es}
          ranges={[range]}
          onChange={handleChange}
          showSelectionPreview={false}
          moveRangeOnFirstSelection={false}
          months={1}
          showDateDisplay={false}
          showPreview={false}
          rangeColors={['#228be6']}
        />
      </StyledCalendarWrapper>
    </div>
  );
}

export default RangeDates;
