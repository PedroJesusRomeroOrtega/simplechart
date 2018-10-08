import * as React from 'react';
import { FeatureCollection, GeometryObject, MultiLineString } from 'geojson';
import { DensityPopulation, MapInfo } from './viewModel';
import { getGeoEntities, geoAreaTypes, getMesh } from '../../common/geo/spain';
import { DensityPopulationComponent } from './densityPopulation';
import { mapDensitiesPopulationModelToVM, mapMapInfoModelToVM } from './mapper';
import { mapAPI } from '../../rest-api/api/map';

const mapId = 2;

interface Props {
  mapInfo: MapInfo;
}

interface State {
  densitiesPopulation: DensityPopulation[];
  geoEntities: FeatureCollection<GeometryObject, any>;
  mesh: MultiLineString;
}

export class DensityPopulationContainer extends React.PureComponent<Props, State> {
  state = {
    densitiesPopulation: [],
    geoEntities: null,
    mesh: null,
  };

  static async getInitialProps() {
    const map = await mapAPI.fetchMapById(mapId);

    return {
      mapInfo: mapMapInfoModelToVM(map),
    };
  }

  componentDidMount() {
    this.loadMapData();
  }

  loadMapData = async () => {
    const densityPopulationEntities = await require('../../map-data/spain/densittyPopulation2018.min.json');

    this.setState({
      densitiesPopulation: mapDensitiesPopulationModelToVM(densityPopulationEntities),
      geoEntities: getGeoEntities(geoAreaTypes.provinces),
      mesh: getMesh(geoAreaTypes.provinces),
    });
  }

  render() {
    return (
      <DensityPopulationComponent
        mapInfo={this.props.mapInfo}
        densityPopulationEntities={this.state.densitiesPopulation}
        geoEntities={this.state.geoEntities}
        mesh={this.state.mesh}
      />
    );
  }
}
