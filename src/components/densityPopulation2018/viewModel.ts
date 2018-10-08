export interface DensityPopulation {
  id: string;
  name: string;
  region: string;
  province: string;
  population: string;
}

export const createEmptyDensityPopulation = (): DensityPopulation => ({
  id: '',
  name: '',
  region: '',
  province: '',
  population: '',
});

// TODO: refactorizar MAPINFO, QUE ESTA EN MAS VIEWMODELS
export interface MapInfo {
  id: number;
  title: string;
  description: string;
}

export const createEmptyMapInfo = (): MapInfo => ({
  id: 0,
  title: '',
  description: '',
});
