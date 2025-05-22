import { Button } from '@material-ui/core';
import { useState } from 'react';

import AdvancedFilters from './AdvancedFilters';
import { filtersState } from './config';

const filterInit = filtersState;

function AppFilters() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open filters
      </Button>
      <AdvancedFilters
        idFilter="prospects-filters"
        isOpen={open}
        setIsOpen={setOpen}
        TitleFilters="Filtros avanzados"
        filtersTypes={filterInit}
        onSave={setFilters}
      />
    </div>
  );
}

export default AppFilters;
