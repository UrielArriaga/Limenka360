# 📦 AdvancedFilters – Sistema de Filtros Avanzados

Este componente permite aplicar múltiples filtros personalizados a una lista o dataset dentro de una interfaz. Incluye soporte para fechas, selecciones dinámicas y operadores lógicos básicos.

---

## 🧩 Estructura de configuración (`filtersState`)

Cada filtro se define como un objeto dentro del array `filtersState`, con las siguientes propiedades:

### Propiedades comunes

| Propiedad          | Tipo                    | Descripción                                                           |
| ------------------ | ----------------------- | --------------------------------------------------------------------- | --- |
| `label`            | `string`                | Nombre visible del filtro.                                            |
| `value`            | `string`                | Identificador único del filtro (clave usada internamente).            |
| `type`             | `string`                | Tipo del filtro (usado para lógica interna).                          |
| `custom`           | `boolean`               | Define si el filtro tiene opciones personalizadas o dinámicas.        |
| `customOptions`    | `Array<{label, value}>` | Opciones disponibles si `custom` es `true`.                           |
| `operators`        | `Array<{label, value}>` | Operadores que el usuario puede seleccionar para aplicar el filtro.   |
| `valuedbIdName`    | `string` _(opcional)_   | Campo ID si el filtro carga datos de una fuente externa.              |
| `valuedbFieldName` | `string` _(opcional)_   | Campo visual si el filtro carga datos de una fuente externa.          |
| `virtualConfig`    | `object` _(opcional)_   | Configuración de subfiltros o relaciones jerárquicas (e.g. ciudades). |
| `isSearchable`     | `boolean`_(opcional)_   | Define una vista de producto con otro estilo solo para **products**   |     |

---

## 🧪 Ejemplo de configuración

```ts
export const filtersState = [
  {
    label: 'Fecha de creación',
    value: 'createdAt1',
    type: 'date1',
    custom: true,
    customOptions: [
      { value: 'Hoy', label: 'Hoy' },
      { value: 'Semana', label: 'Semana' },
      { value: 'Mes', label: 'Mes' },
      { label: 'Rango', value: 'range', special: 'range' },
    ],
    operators: [
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
      { label: 'Igual', value: 'igual' },
    ],
  },
  ...
];
```

⚙️ Uso del componente

```ts
<AdvancedFilters
  filtersTypes={filtersState}
  TitleFilters="Filtros Avanzados"
  isOpen={isModalOpen}
  setIsOpen={setIsModalOpen}
  onSave={(filters) => {
    console.log('Filtros aplicados:', filters);
  }}
/>
```
