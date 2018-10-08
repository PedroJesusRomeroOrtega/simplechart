import * as React from 'react';
import { FeatureCollection, GeometryObject, MultiLineString } from 'geojson';
import { MapComponent } from '../../common/components/map';
import { getProjection } from '../../common/geo/spain';
import { mapGeoAreaListModelToVM } from './mapper';
import { DensityPopulation, MapInfo } from './viewModel';
const styles = require('./densityPopulation.scss');

interface Props {
  mapInfo: MapInfo;
  densityPopulationEntities: DensityPopulation[];
  geoEntities: FeatureCollection<GeometryObject, any>;
  mesh: MultiLineString;
}

export const DensityPopulationComponent: React.StatelessComponent<Props> = (props) => (
  <div className={styles.densityPopulationMap}>
    <div className={styles.header}>
      <h1>{props.mapInfo.title}</h1>
      <p>{props.mapInfo.description}</p>
    </div>
    <div className={styles.mapContainer}>
      <MapComponent
        geoAreas={mapGeoAreaListModelToVM(props.geoEntities, props.densityPopulationEntities)}
        geoEntities={props.geoEntities}
        mesh={props.mesh}
        projection={getProjection()}
      />
    </div>
  </div>
);
