export type Formation = '3-4-3' | '4-4-2';

export type PositionLabel = 'GK' | 'DF' | 'MF' | 'FW';

export interface FormationPosition {
  id: number;
  label: PositionLabel;
  playerId: string | null;
  top: string;
  left: string;
}

export interface FormationConfig {
  goalkeepers: number;
  defenders: number;
  midfielders: number;
  attackers: number;
  positions: FormationPosition[];
}

export const FORMATIONS: Record<Formation, FormationConfig> = {
  '3-4-3': {
    goalkeepers: 1,
    defenders: 3,
    midfielders: 4,
    attackers: 3,
    positions: [
      // GK
      { id: 1, label: 'GK', playerId: null, top: '50%', left: '10%' },
      // Defenders (3)
      { id: 2, label: 'DF', playerId: null, top: '30%', left: '25%' },
      { id: 3, label: 'DF', playerId: null, top: '50%', left: '25%' },
      { id: 4, label: 'DF', playerId: null, top: '70%', left: '25%' },
      // Midfielders (4)
      { id: 5, label: 'MF', playerId: null, top: '20%', left: '45%' },
      { id: 6, label: 'MF', playerId: null, top: '40%', left: '45%' },
      { id: 7, label: 'MF', playerId: null, top: '60%', left: '45%' },
      { id: 8, label: 'MF', playerId: null, top: '80%', left: '45%' },
      // Attackers (3)
      { id: 9, label: 'FW', playerId: null, top: '30%', left: '65%' },
      { id: 10, label: 'FW', playerId: null, top: '50%', left: '65%' },
      { id: 11, label: 'FW', playerId: null, top: '70%', left: '65%' },
    ]
  },
  '4-4-2': {
    goalkeepers: 1,
    defenders: 4,
    midfielders: 4,
    attackers: 2,
    positions: [
      // GK
      { id: 1, label: 'GK', playerId: null, top: '50%', left: '10%' },
      // Defenders (4)
      { id: 2, label: 'DF', playerId: null, top: '20%', left: '25%' },
      { id: 3, label: 'DF', playerId: null, top: '40%', left: '25%' },
      { id: 4, label: 'DF', playerId: null, top: '60%', left: '25%' },
      { id: 5, label: 'DF', playerId: null, top: '80%', left: '25%' },
      // Midfielders (4)
      { id: 6, label: 'MF', playerId: null, top: '20%', left: '45%' },
      { id: 7, label: 'MF', playerId: null, top: '40%', left: '45%' },
      { id: 8, label: 'MF', playerId: null, top: '60%', left: '45%' },
      { id: 9, label: 'MF', playerId: null, top: '80%', left: '45%' },
      // Attackers (2)
      { id: 10, label: 'FW', playerId: null, top: '35%', left: '65%' },
      { id: 11, label: 'FW', playerId: null, top: '65%', left: '65%' },
    ]
  }
} as const;

export const POSITION_MAP: Record<string, PositionLabel> = {
  'Goalkeeper': 'GK',
  'Defender': 'DF',
  'Midfielder': 'MF',
  'Attacker': 'FW'
} as const; 