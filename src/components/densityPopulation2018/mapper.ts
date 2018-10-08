import { GeoArea, createEmptyGeoArea } from '../../common/components/map';
import { FeatureCollection, GeometryObject } from 'geojson';
import { getId } from '../../common/geo/spain';
import * as model from '../../rest-api/model';
import * as vm from './viewModel';

export const mapDensitiesPopulationModelToVM = (
  densitiesPopulation: model.DensityPopulation[],
): vm.DensityPopulation[] =>
  Boolean(densitiesPopulation) ? densitiesPopulation.map(mapDensityPopulationModelToVM) : [];

const mapDensityPopulationModelToVM = (
  densityPopulation: model.DensityPopulation,
): vm.DensityPopulation =>
  Boolean(densityPopulation)
    ? {
        id: densityPopulation.id.toString(),
        name: densityPopulation.name,
        region: densityPopulation.region,
        province: densityPopulation.province,
        population: densityPopulation.population.toString(),
      }
    : vm.createEmptyDensityPopulation();

export const mapGeoAreaListModelToVM = (
  geoEntities: FeatureCollection<GeometryObject, any>,
  densitiesPopulation: vm.DensityPopulation[],
): GeoArea[] =>
  Boolean(geoEntities)
    ? geoEntities.features.map((geoEntity) => mapGeoAreaModelToVM(geoEntity, densitiesPopulation))
    : [];

const mapGeoAreaModelToVM = (geoEntity, densitiesPopulation: vm.DensityPopulation[]): GeoArea => {
  const id = getId(geoEntity);
  const densityPopulation = densitiesPopulation.find((item) => item.id === id);

  return Boolean(densityPopulation)
    ? {
        id,
        geoEntity,
        color: getColor(densityPopulation),
        tooltipMessage: getTooltipMessage(densityPopulation),
      }
    : createEmptyGeoArea();
};

const getColor = (densityPopulation: vm.DensityPopulation) => {
  if (+densityPopulation.population < 500000) {
    return '#170000';
  } else if (+densityPopulation.population < 1000000){
    return '#710000';
  } else{
    return '#da0000';
  }
};

const getTooltipMessage = (densityPopulation: vm.DensityPopulation) =>
  Boolean(densityPopulation)
    ? `
      <h4>${densityPopulation.name}</h4>
      <h3>${densityPopulation.population}</h3>
    `
    : '<h4>Sin Datos</h4>';

export const mapMapInfoModelToVM = (map: model.Map): vm.MapInfo =>
  Boolean(map)
    ? {
        id: map.id,
        title: map.title,
        description: map.description,
      }
    : vm.createEmptyMapInfo();
