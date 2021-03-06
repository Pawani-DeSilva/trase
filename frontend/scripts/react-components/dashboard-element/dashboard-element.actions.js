import { DASHBOARD_STEPS } from 'constants';

export const DASHBOARD_ELEMENT__SET_MORE_PANEL_DATA = 'DASHBOARD_ELEMENT__SET_MORE_PANEL_DATA';
export const DASHBOARD_ELEMENT__SET_PANEL_DATA = 'DASHBOARD_ELEMENT__SET_PANEL_DATA';
export const DASHBOARD_ELEMENT__SET_ACTIVE_PANEL = 'DASHBOARD_ELEMENT__SET_ACTIVE_PANEL';
export const DASHBOARD_ELEMENT__SET_ACTIVE_ITEM = 'DASHBOARD_ELEMENT__SET_ACTIVE_ITEM';
export const DASHBOARD_ELEMENT__SET_ACTIVE_ITEMS = 'DASHBOARD_ELEMENT__SET_ACTIVE_ITEMS';
export const DASHBOARD_ELEMENT__SET_ACTIVE_TAB = 'DASHBOARD_ELEMENT__SET_ACTIVE_TAB';
export const DASHBOARD_ELEMENT__CLEAR_PANEL = 'DASHBOARD_ELEMENT__CLEAR_PANEL';
export const DASHBOARD_ELEMENT__CLEAR_PANELS = 'DASHBOARD_ELEMENT__CLEAR_PANELS';
export const DASHBOARD_ELEMENT__ADD_ACTIVE_INDICATOR = 'DASHBOARD_ELEMENT__ADD_ACTIVE_INDICATOR';
export const DASHBOARD_ELEMENT__REMOVE_ACTIVE_INDICATOR =
  'DASHBOARD_ELEMENT__REMOVE_ACTIVE_INDICATOR';
export const DASHBOARD_ELEMENT__SET_PANEL_TABS = 'DASHBOARD_ELEMENT__SET_PANEL_TABS';
export const DASHBOARD_ELEMENT__SET_PANEL_PAGE = 'DASHBOARD_ELEMENT__SET_PANEL_PAGE';
export const DASHBOARD_ELEMENT__SET_LOADING_ITEMS = 'DASHBOARD_ELEMENT__SET_LOADING_ITEMS';
export const DASHBOARD_ELEMENT__GET_SEARCH_RESULTS = 'DASHBOARD_ELEMENT__GET_SEARCH_RESULTS';
export const DASHBOARD_ELEMENT__SET_SEARCH_RESULTS = 'DASHBOARD_ELEMENT__SET_SEARCH_RESULTS';
export const DASHBOARD_ELEMENT__SET_ACTIVE_ITEM_WITH_SEARCH =
  'DASHBOARD_ELEMENT__SET_ACTIVE_ITEM_WITH_SEARCH';
export const DASHBOARD_ELEMENT__SET_ACTIVE_ITEMS_WITH_SEARCH =
  'DASHBOARD_ELEMENT__SET_ACTIVE_ITEMS_WITH_SEARCH';
export const DASHBOARD_ELEMENT__OPEN_INDICATORS_STEP = 'DASHBOARD_ELEMENT__OPEN_INDICATORS_STEP';

export const getDashboardPanelParams = (state, optionsType, options = {}) => {
  const {
    countriesPanel,
    sourcesPanel,
    companiesPanel,
    destinationsPanel,
    commoditiesPanel
  } = state;
  const { page } = options;
  const sourcesTab = sourcesPanel.activeTab && sourcesPanel.activeTab.id;
  const companiesTab = companiesPanel.activeTab && companiesPanel.activeTab.id;

  const nodeTypesIds = {
    sources: sourcesTab,
    companies: companiesTab
  }[optionsType];
  const activeItemParams = panel => Object.keys(panel.activeItems).join();
  const params = {
    page,
    options_type: optionsType !== 'indicators' ? optionsType : 'attributes',
    node_types_ids: nodeTypesIds
  };
  const currentStep = DASHBOARD_STEPS[optionsType];
  if (currentStep === DASHBOARD_STEPS.sources) {
    params.countries_ids = activeItemParams(countriesPanel);
  }

  if (currentStep > DASHBOARD_STEPS.sources) {
    params.countries_ids = activeItemParams(countriesPanel);
    params.sources_ids = activeItemParams(sourcesPanel);
  }

  if (currentStep > DASHBOARD_STEPS.commodities) {
    params.commodities_ids = activeItemParams(commoditiesPanel);
  }

  if (currentStep > DASHBOARD_STEPS.destinations) {
    params.destinations_ids = activeItemParams(destinationsPanel);
  }

  if (currentStep > DASHBOARD_STEPS.companies) {
    params.companies_ids = activeItemParams(companiesPanel);
  }

  return params;
};

export const setDashboardActivePanel = activePanelId => ({
  type: DASHBOARD_ELEMENT__SET_ACTIVE_PANEL,
  payload: { activePanelId }
});

export const setDashboardPanelActiveItemWithSearch = (activeItem, panel) => ({
  type: DASHBOARD_ELEMENT__SET_ACTIVE_ITEM_WITH_SEARCH,
  payload: { panel, activeItem }
});

export const setDashboardPanelActiveItem = (activeItem, panel) => ({
  type: DASHBOARD_ELEMENT__SET_ACTIVE_ITEM,
  payload: { panel, activeItem }
});

export const setDashboardPanelActiveItemsWithSearch = (activeItems, panel) => ({
  type: DASHBOARD_ELEMENT__SET_ACTIVE_ITEMS_WITH_SEARCH,
  payload: { panel, activeItems }
});

export const setDashboardPanelActiveItems = (activeItems, panel) => ({
  type: DASHBOARD_ELEMENT__SET_ACTIVE_ITEMS,
  payload: { panel, activeItems }
});

export const setDashboardPanelActiveTab = (activeTab, panel) => ({
  type: DASHBOARD_ELEMENT__SET_ACTIVE_TAB,
  payload: { panel, activeTab }
});

export const clearDashboardPanel = panel => ({
  type: DASHBOARD_ELEMENT__CLEAR_PANEL,
  payload: { panel }
});

export const clearDashboardPanels = panels => ({
  type: DASHBOARD_ELEMENT__CLEAR_PANELS,
  payload: { panels }
});

export const addActiveIndicator = active => ({
  type: DASHBOARD_ELEMENT__ADD_ACTIVE_INDICATOR,
  payload: { active }
});

export const removeActiveIndicator = toRemove => ({
  type: DASHBOARD_ELEMENT__REMOVE_ACTIVE_INDICATOR,
  payload: { toRemove }
});

export const setDashboardPanelPage = (page, direction) => ({
  type: DASHBOARD_ELEMENT__SET_PANEL_PAGE,
  payload: { page, direction }
});

export const setDashboardPanelLoadingItems = loadingItems => ({
  type: DASHBOARD_ELEMENT__SET_LOADING_ITEMS,
  payload: { loadingItems }
});

export const getDashboardPanelSearchResults = query => ({
  type: DASHBOARD_ELEMENT__GET_SEARCH_RESULTS,
  payload: { query }
});

export const openIndicatorsStep = () => ({
  type: DASHBOARD_ELEMENT__OPEN_INDICATORS_STEP
});
