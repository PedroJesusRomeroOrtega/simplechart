import { Map } from '../../model';
import { routes } from '../../../common/constants/routes';

export const maps: Map[] = [
  {
    id: 1,
    title: 'Test title',
    type: 1,
    description: 'Test description',
    tags: ['tag1', 'tag2', 'tag3'],
    url: routes.spainMunicipalitiesElectoralMap2016,
  },
  {
    id: 2,
    title: 'Densidad de población',
    type: 1, // TODO: ¿WHAT TO PUT HERE??
    description: 'Densidad de población por provincias',
    tags: ['tag1', 'tag2', 'tag3'],
    url: routes.densityPopulation2018,
  },
];
