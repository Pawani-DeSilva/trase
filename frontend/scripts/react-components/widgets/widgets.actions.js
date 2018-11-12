import { getURLFromParams } from 'utils/getURLFromParams';
import qs from 'qs';

export const WIDGETS__INIT_ENDPOINT = 'WIDGETS__INIT_ENDPOINT';
export const WIDGETS__SET_ENDPOINT_DATA = 'WIDGETS__SET_ENDPOINT_DATA';
export const WIDGETS__SET_ENDPOINT_ERROR = 'WIDGETS__SET_ENDPOINT_ERROR';
export const WIDGETS__SET_ENDPOINT_LOADING = 'WIDGETS__SET_ENDPOINT_LOADING';

export const getWidgetData = (endpoint, params = { noKey: true }, raw) => (dispatch, getState) => {
  const { endpoints } = getState().widgets;
  const key = Object.entries(params)
    .map(([name, value]) => `${name}${value}`)
    .join('_');
  if (typeof endpoints[endpoint] === 'undefined' || endpoints[endpoint].key !== key) {
    dispatch({
      type: WIDGETS__INIT_ENDPOINT,
      payload: { endpoint, key }
    });

    let url;
    if (raw) {
      url = raw;
      if (params) {
        const search = qs.stringify(params);
        url = endpoint.includes('?') ? `${endpoint}&${search}` : `${endpoint}?${search}`;
      }
    } else {
      url = getURLFromParams(endpoint, params);
    }

    fetch(url)
      .then(res => (res.ok ? res.json() : Promise.reject(res)))
      .then(res =>
        dispatch({
          type: WIDGETS__SET_ENDPOINT_DATA,
          payload: { ...res, endpoint }
        })
      )
      .catch(error =>
        dispatch({
          type: WIDGETS__SET_ENDPOINT_ERROR,
          payload: { endpoint, error }
        })
      )
      .finally(() =>
        dispatch({
          type: WIDGETS__SET_ENDPOINT_LOADING,
          payload: { endpoint, loading: false }
        })
      );
  }
};
