// Types
import {
  SET_TRACKS,
  TOGGLE_CHANGE_TRACK,
  TOGGLE_TRACK_FILTERS,
  SET_WORK_TYPES,
  SET_STATUS_TYPES,
  SET_TRACK_FILTER,
  CLEAR_TRACK_FILTERS,
  CHANGE_TRACK_VIEW
} from './../actions/types';

// Helpers
import {
  getInitFilters,
  getInitNewTrackData
} from './../../shared/HelpService';

const initFilters = getInitFilters();
const initTrackData = getInitNewTrackData();
const view = localStorage.getItem('viewType');
const initial = {
  tracks: [],
  workTypes: [],
  statusTypes: [],
  trackIsOpen: false,
  isTrackCreate: false,
  filtersIsOpen: false,
  filters: initFilters,
  view: view ? view : 'block',
  trackData: initTrackData
};

export default function trackReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_TRACKS:
      return Object.assign({}, state, { tracks: action.tracks });
    case CHANGE_TRACK_VIEW:
      return Object.assign({}, state, { view: action.view });
    case CLEAR_TRACK_FILTERS:
      return Object.assign({}, state, { filters: initFilters });
    case SET_TRACK_FILTER:
      return Object.assign({}, state, {
        filters: action.filters
      });
    case SET_STATUS_TYPES:
      return Object.assign({}, state, { statusTypes: action.statusTypes });
    case SET_WORK_TYPES:
      return Object.assign({}, state, { workTypes: action.workTypes });
    case TOGGLE_CHANGE_TRACK:
      return Object.assign({}, state, {
        trackIsOpen: action.param,
        trackData: action.data ? action.data : initTrackData,
        isTrackEdit: action.isTrackEdit
      });
    case TOGGLE_TRACK_FILTERS:
      return Object.assign({}, state, { filtersIsOpen: !state.filtersIsOpen });
    default:
      return state;
  }
}
