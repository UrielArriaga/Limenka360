const NZONE = 6;
export const zones = [
    {gmt: 'GMT-05:00', zones: ['Quintana Roo'] },
    {gmt: `GMT-0${NZONE}:00`, zones: [
      'México City ',
      'Monterrey ',
      'Guadalajara '], summer: false },
    {gmt: `GMT-0${NZONE-1}:00`, zones: [
      'México City ',
      'Monterrey ',
      'Guadalajara '], summer: true },
      {gmt: `GMT-0${NZONE+1}:00`, 
      zones: 'Baja California Sur Sinaloa Sonora',
      summer: false
    },
      {gmt: `GMT-0${NZONE+1-1}:00`, 
      zones: 'Baja California Sur Sinaloa Sonora',
      summer: true
    },
    
    {gmt: `GMT-0${NZONE+2}:00`, 
    zones: 'Baja California',
    summer: false },
    {gmt: `GMT-0${NZONE+2-1}:00`, 
    zones: 'Baja California',
    summer: true },
  ]