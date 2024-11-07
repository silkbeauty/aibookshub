import * as Actions from "../actions";

const initialState = {
  newsSource: "IT",
  isLoading: true,
  activeNewsSource: [],
  tabData: [],
  tabDataClone: [],
  url: "sources",
  api_key: "4de403f3af274240bd0ae00a00fedfc6",
  proxy_url: "",
  isHamburgerIconVisible: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ACTIVE_SOURCE: {
      return {
        ...state,
        activeNewsSource: action.payload,
      };
    }
    case Actions.CHANGE_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case Actions.CHANGE_ACTIVE_NEWS_SOURCE: {
      return {
        ...state,
        activeNewsSource: action.payload,
      };
    }
    case Actions.POPULATE_TAB_DATA: {
      return {
        ...state,
        tabData: action.payload,
        tabDataClone: action.payload,
      };
    }
    case Actions.SEARCH_TAB_DATA: {
      const newTabData = state.tabDataClone.filter((tdc) =>
        tdc.title.toLowerCase().startsWith(action.payload)
      );
      return {
        ...state,
        tabData: newTabData,
      };
    }
    case Actions.RESET_TAB_DATA: {
      return {
        ...state,
        tabData: state.tabDataClone,
      };
    }
    case Actions.CHANGE_URL: {
      return {
        ...state,
        url: action.payload,
      };
    }
    case Actions.TOGGLE_HAMBURGER_ICON_VISIBILITY: {
      return {
        ...state,
        isHamburgerIconVisible: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
