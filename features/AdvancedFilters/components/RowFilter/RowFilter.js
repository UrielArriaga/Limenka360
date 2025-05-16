import { useState } from 'react';
import RowFilterMain from '../RowFilterMain/MainRow';
import SubFilter from '../SubFilter/SubFilter';
import { Container, Label, RowFilterStyled, SubFilterStyled } from './styles';

function RowFilter({ onDelete, filter }) {
  const [MainFilterType, setMainFilterType] = useState();

  return (
    <RowFilterStyled>
      <RowFilterMain
        onDelete={onDelete}
        filter={filter}
        setMainFilterType={setMainFilterType}
      />

      {filter?.subfilters?.length > 0 && (
        <SubFilterStyled>
          <Label>Subfiltro por:</Label>

          <Container>
            {filter?.subfilters?.map((subfilter) => (
              <SubFilter
                key={subfilter?.id}
                subfilter={subfilter}
                filter={filter}
                MainFilterType={MainFilterType}
              />
            ))}
          </Container>
        </SubFilterStyled>
      )}
    </RowFilterStyled>
  );
}

export default RowFilter;
