import { loadSearchResults } from 'actions/app.actions';
import GlobalSearch from 'react-components/nav/global-search/global-search.component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAppSearchResults } from 'react-components/nav/global-search/global-search.selectors';

const mapStateToProps = state => {
  const { search } = state.app;
  const searchResults = getAppSearchResults(state);

  return {
    isLoading: search.isLoading,
    searchTerm: search.term,
    searchResults
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onInputValueChange: inputValue => loadSearchResults(inputValue),
      onItemSelected: item =>
        dispatch({
          type: 'tool',
          payload: {
            query: {
              state: {
                isMapVisible: false,
                selectedContextId: item.contextId,
                selectedNodesIds: item.nodes.map(i => i.id),
                expandedNodesIds: item.nodes.map(i => i.id)
              }
            }
          }
        })
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalSearch);
