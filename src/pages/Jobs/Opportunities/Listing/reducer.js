export const ACTION_TYPES = {
  LOADING_OPPORTUNITIES_COMPLETED: "LOADING_OPPORTUNITIES_COMPLETED",
  FILTER_CHANGED: "FILTER_CHANGED",
  STATUS_FILTER_CHANGED: "STATUS_FILTER_CHANGED",
  STATUS_FILTERS_RESET_SELECTED: "STATUS_FILTERS_RESET_SELECTED",
  STATUS_FILTERS_CLEARED: "STATUS_FILTERS_CLEARED",
  STATUS_FILTERS_QS_CHANGED: "STATUS_FILTERS_QS_CHANGED",
  COMPANY_NAMES: "COMPANY_NAMES",
  COMPANY_FILTER_CHANGED: "COMAPNY_CHANGED",
  JOB_TYPES_CHANGED: "JOB_TYPES_CHANGED",
  JOB_TYPES: "JOB_TYPES",
  LOADING_NEXT_PAGE: "LOADING_NEXT_PAGE",
  LOADING_PREVIOUS_PAGE: "LOADING_PREVIOUS_PAGE",
  COGNITO_GROUPS_LOADED: "COGNITO_GROUPS_LOADED",
  CUSTOMER_OWNER_NAMES: "CUSTOMER_OWNER_NAMES",
  CUSTOMER_OWNER_FILTER_CHANGED: "CUSTOMER_OWNER_FILTER_CHANGED",
};

export default function JobListingReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.COGNITO_GROUPS_LOADED:
      return {
        ...state,
        loadingGroups: false,
        cognitoGroups: action.groups,
      };
    case ACTION_TYPES.LOADING_OPPORTUNITIES_COMPLETED:
      return {
        ...state,
        loadingOpps: false,
        jobOpps: action.jobOpps,
        paginationTokens: [...state.paginationTokens, action.nextToken],
      };
    case ACTION_TYPES.FILTER_CHANGED:
      return {
        ...state,
        loadingOpps: true,
        filter: action.filter,
        pageNumber: 1,
        paginationTokens: [],
      };
    case ACTION_TYPES.STATUS_FILTER_CHANGED: {
      const filter = state.statusFilters.map((option) => {
        if (option.label === action.label) {
          return { ...option, isActive: !option.isActive };
        }
        return option;
      });
      return {
        ...state,
        statusFilters: filter,
      };
    }
    case ACTION_TYPES.STATUS_FILTERS_RESET_SELECTED: {
      return {
        ...state,
        statusFilters: action.filter,
      };
    }
    case ACTION_TYPES.STATUS_FILTERS_CLEARED: {
      const filter = state.statusFilters.map((option) => {
        return { ...option, isActive: false };
      });
      return {
        ...state,
        statusFilters: filter,
      };
    }
    case ACTION_TYPES.STATUS_FILTERS_QS_CHANGED: {
      const statusFiltersResult = state.statusFilters.map((statusFilter) => {
        if (
          action.statusFilters.some(
            (label) => label.toLowerCase() === statusFilter.label.toLowerCase()
          )
        ) {
          return {
            ...statusFilter,
            isActive: true,
          };
        }
        return {
          ...statusFilter,
          isActive: false,
        };
      });

      return {
        ...state,
        statusFilters: statusFiltersResult,
      };
    }
    case ACTION_TYPES.LOADING_NEXT_PAGE:
      return {
        ...state,
        loadingOpps: true,
        pageNumber: state.pageNumber + 1,
      };
    case ACTION_TYPES.LOADING_PREVIOUS_PAGE:
      const paginationTokens = JSON.parse(
        JSON.stringify(state.paginationTokens)
      );
      // Remove token of next page
      paginationTokens.pop();
      // Remove token of current page
      paginationTokens.pop();

      return {
        ...state,
        loadingOpps: true,
        pageNumber: state.pageNumber - 1,
        paginationTokens: paginationTokens,
      };
    case ACTION_TYPES.COMPANY_FILTER_CHANGED:
      return {
        ...state,
        companyFilters: action.companyFilters,
        customerOwnerFilter: "All",
      };
    case ACTION_TYPES.COMPANY_NAMES:
      return {
        ...state,
        companyNames: action.companyNames,
      };
    case ACTION_TYPES.JOB_TYPES_CHANGED:
      return {
        ...state,
        jobTypeFilter: action.jobTypeFilter,
      };
    case ACTION_TYPES.JOB_TYPES:
      return {
        ...state,
        jobTypes: action.jobTypes,
      };
    case ACTION_TYPES.CUSTOMER_OWNER_NAMES:
      return {
        ...state,
        customerOwnerNames: action.customerOwnerNames,
      };
    case ACTION_TYPES.CUSTOMER_OWNER_FILTER_CHANGED:
      return {
        ...state,
        customerOwnerFilter: action.customerOwnerFilter,
      };
    default:
      throw new Error(`Unknown job opp action type: ${action.type}`);
  }
}
