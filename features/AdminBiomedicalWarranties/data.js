export const filtersWarranties = [
    {
        label: "Fecha de Creación Garantía",
        value: "dates",
        valuedb: "createdAt",
        custom: true,
        customOptions: [
            {
                id: "day",
                name: "Hoy",
                toChip: "Hoy",
            },
            {
                id: "week",
                name: "Semanal",
                toChip: "Semanal",
            },
            {
                id: "month",
                name: "Mensual",
                toChip: "Mensual",
            },
            {
                id: "range",
                name: "Rango de Fechas",
                toChip: "Rango de Fechas",
            },
        ],
    },
    {
        label: "Creado Por",
        value: "users",
        valuedb: "createdbyId"
    }
];
