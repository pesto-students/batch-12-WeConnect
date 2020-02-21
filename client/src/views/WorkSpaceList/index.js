import React, { useEffect } from 'react';
import WeGrid from '../../components/Generic/Grid/Grid';
import Workspace from '../../containers/workspace';
import Filter from '../../components/FilterPanel';
import FilterCheckBox from '../../components/FilterPanel/FilterChecks';
import keyValueGetter from '../../utils/QueryKeyValue';
import { getWorkSpaceData } from '../../apis/getWorkSpace';
import LinearProgress from '../../components/Generic/ProgressBar/LinearProgress';

const WorkSpaceList = (props) => {
  const { search } = props.location;
  const searchFromQuery = keyValueGetter(search, 'q');
  const [location, setLocation] = React.useState({ workspaces: [] });
  const [checkMe, setCheckMe] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getWorkSpaceData('').then((response) => {
      setIsLoading(false);
      setLocation({
        workspaces: response.workspaces,
      });
    });
  }, []);

  return (
    <section style={{ padding: '0 5vw' }}>
      <Filter filterFor="Location" valueOfSearch={searchFromQuery}>
        <FilterCheckBox
          value="Parking"
          checked={{ check: checkMe, setCheck: setCheckMe }}
        />
        <FilterCheckBox
          value="Chai"
          checked={{ check: checkMe, setCheck: setCheckMe }}
        />
        <FilterCheckBox
          value="Coffee"
          checked={{ check: checkMe, setCheck: setCheckMe }}
        />
      </Filter>
      <WeGrid id="workspaces-view" container spacing={6}>
        {isLoading ? <LinearProgress /> : ''}
        {location.workspaces.map((workspace) => {
          return (
            <WeGrid item sm={4} xs={12} spacing={3}>
              <Workspace
                className="workspace"
                workspace={workspace}
                history={props.history}
              />
            </WeGrid>
          );
        })}
      </WeGrid>
    </section>
  );
};

export default WorkSpaceList;
