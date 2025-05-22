import { EntitiesLocal } from '../../BD/databd';

export const filtersprospects = [
  {
    label: 'Fecha de creación',
    value: 'createdAt',
    custom: true,
    customOptions: [
      { value: 'Hoy', label: 'Hoy' },
      { value: 'Semana', label: 'Semana' },
      { value: 'Mes', label: 'Mes' },
      { label: 'Rango', value: 'range', special: 'range' },
    ],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
    ],
  },
  {
    label: 'Fecha de ultimo seguimiento',
    value: 'lastTrackingcreatedAt',
    custom: true,
    customOptions: [
      { value: 'Hoy', label: 'Hoy' },
      { value: 'Semana', label: 'Semana' },
      { value: 'Mes', label: 'Mes' },
      { label: 'Rango', value: 'range', special: 'range' },
    ],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
    ],
  },
  {
    label: 'Fecha de actualización',
    value: 'updatedAt',
    custom: true,
    customOptions: [
      { value: 'Hoy', label: 'Hoy' },
      { value: 'Semana', label: 'Semana' },
      { value: 'Mes', label: 'Mes' },
      { label: 'Rango', value: 'range', special: 'range' },
    ],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
    ],
  },
  {
    label: 'Licitante',
    value: 'bidder',
    custom: true,
    customOptions: [
      { label: 'Licitantes', value: 'true' },
      { label: 'No Licitantes', value: 'false' },
    ],
    operators: [{ label: 'Igual', value: 'igual' }],
  },
  {
    label: 'Zona geografica',
    value: 'entitiesLocal',
    valueOutput: 'entityId',
    custom: true,
    customOptions: EntitiesLocal.map((entity) => ({
      value: entity.id,
      label: entity.name,
    })),
    virtualConfig: {
      custom: false,
      label: 'Ciudades',
      value: 'cities',
      valueOutput: 'cityId',
      valuedbIdName: 'id',
      valuedbFieldName: 'name',

      operators: [
        { label: 'Igual', value: 'igual' },
        { label: 'Diferente de', value: 'diferente' },
      ],
    },
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Diferente de', value: 'diferente' },
    ],
  },
  {
    label: 'Origen',
    value: 'origins',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    valueOutput: 'originId',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Diferente de', value: 'diferente' },
    ],
  },
  {
    label: 'Categoría de interes',
    value: 'categories',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    valueOutput: 'categoryId',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Diferente de', value: 'diferente' },
    ],
  },
  {
    label: 'Fase',
    value: 'phases',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    valueOutput: 'phaseId',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Diferente de', value: 'diferente' },
    ],
  },
  {
    label: 'Tipo de clientes',
    value: 'clientTypes',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    valueOutput: 'clientTypeId',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Diferente de', value: 'diferente' },
    ],
  },
  {
    label: 'Especialidades',
    value: 'specialties',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    valueOutput: 'specialtyId',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Diferente de', value: 'diferente' },
    ],
  },
  {
    label: 'Canales',
    value: 'channels',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    valueOutput: 'channelId',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Igual', value: 'igual' },
      { label: 'Diferente de', value: 'diferente' },
    ],
  },
  {
    label: 'Descartados',
    value: 'discarted',
    custom: true,
    customOptions: [{ label: 'Mostar descartados', value: 'true' }],
    operators: [{ label: 'Igual', value: 'igual' }],
  },
  {
    label: 'Vistos',
    value: 'viewed',
    custom: true,
    customOptions: [
      { label: 'Mostar visualizados', value: 'true' },
      { label: 'Mostar no visualizados', value: 'false' },
    ],
    operators: [{ label: 'Igual', value: 'igual' }],
  },
];
