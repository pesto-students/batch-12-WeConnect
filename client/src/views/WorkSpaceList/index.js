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
  const [searchText, setSearchText] = React.useState('');

  const [location, setLocation] = React.useState({ workspaces: [] });
  const [checkMe, setCheckMe] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setSearchText(searchFromQuery);
    getWorkSpaceData(searchFromQuery).then((workspaces) => {
      setIsLoading(false);
      setLocation({
        workspaces,
      });
    });
  }, [searchFromQuery]);

  const updateSearch = () => {
    props.history.push(`/workspace?q=${searchText}`);
  };

  return (
    <section style={{ padding: '0 5vw' }}>
      <Filter
        filterFor="Location"
        valueOfSearch={{ searchText, setSearchText }}
        updateSearch={updateSearch}
      >
        <FilterCheckBox
          value="Parking"
          key="Parking"
          isChecked={{ check: checkMe, setCheck: setCheckMe }}
        />
        <FilterCheckBox
          value="Chai"
          key="Chai"
          isChecked={{ check: checkMe, setCheck: setCheckMe }}
        />
        <FilterCheckBox
          value="Coffee"
          key="Coffee"
          isChecked={{ check: checkMe, setCheck: setCheckMe }}
        />
      </Filter>
      <WeGrid id="workspaces-view" container spacing={6}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          location.workspaces.map((workspace) => {
            return (
              <WeGrid key={workspace._id} item sm={4} xs={12}>
                <Workspace
                  key={workspace._id}
                  className="workspace"
                  workspace={workspace}
                  history={props.history}
                />
              </WeGrid>
            );
          })
        )}
        {!isLoading && location.workspaces.length === 0 ? (
          <WeGrid item xs={12} style={{ textAlign: 'center', fontSize: 20 }}>
            No Workspace At This Location
          </WeGrid>
        ) : (
          ''
        )}
      </WeGrid>
    </section>
  );
};

export default WorkSpaceList;
