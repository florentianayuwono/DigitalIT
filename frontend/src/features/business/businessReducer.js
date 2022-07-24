// same as in ../auth/authReducer.js:

export const initialBusinessState = {
  businesses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  businessSummary: {},
};

// function that takes an array of objects and an id and outputs the same array without the object with the id
const deleter = (array, id) => {
  return array.filter((obj) => obj.business_id !== id);
};

/*
  I'm not sure whether or not this is the most elegant way of doing this. When this code was written, I'd previously
  written different reducer functions for each action type (e.g. addBusiness, updateBusiness, deleteBusiness).
  I intend to group them in one businessReducer object and then export that object, and then import it into the
  businessContext.js file to then combine the functions using some kind of a combiner function and use that function
  as the dispatch function that is passed as the provider value.
  
  However, I found that harder to do and even uglier than what I'd thought (I had to create multiple useReducers,
  one for each action type, and then combine them using useCallback. Not to mention handling the supposedly shared state
  that are being modified individually and needs to be linked some how). So in the end, I resorted to create this one big
  businessReducer function instead.
*/
export const businessReducer = (state, action) => {
  let newState = state;
  switch (action.type) {
    case "REQUEST_ADD_BUSINESS":
      return {
        ...state,
        isLoading: true,
        message: "loading ...",
      };
    case "ADD_BUSINESS_SUCCESS":
      newState = {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: "",
      };

      return newState;
    case "ADD_BUSINESS_ERROR":
      newState = {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };

      return newState;
    case "REQUEST_BUSINESSES":
      return {
        ...state,
        isLoading: true,
        message: "loading ...",
      };
    case "GET_BUSINESSES_SUCCESS":
      newState = {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: "",
        businesses: action.payload,
      };

      return newState;
    case "GET_BUSINESSES_ERROR":
      newState = {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };

      return newState;
    case "REQUEST_UPDATE_BUSINESS":
      return {
        ...state,
        isLoading: true,
        message: "loading ...",
      };
    case "UPDATE_BUSINESS_SUCCESS":
      newState = {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: "",
      };

      return newState;
    case "UPDATE_BUSINESS_ERROR":
      newState = {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };

      return newState;
    case "REQUEST_DELETE_BUSINESS":
      return {
        ...state,
        isLoading: true,
        message: "loading ...",
      };
    case "DELETE_BUSINESS_SUCCESS":
      newState = {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: "",
        businesses: deleter(state.businesses, action.payload),
      };

      return newState;
    case "DELETE_BUSINESS_ERROR":
      newState = {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
      };

      return newState;
    case "REQUEST_BUSINESS_SUMMARY": {
      return {
        ...state,
        isLoading: true,
        message: "loading ...",
        businessSummary: {},
      };
    }
    case "GET_BUSINESS_SUMMARY_SUCCESS": {
      newState = {
        ...state,
        isLoading: false,
        isSuccess: true,
        message: "",
        businessSummary: action.payload,
      };

      return newState;
    }
    case "GET_BUSINESS_SUMMARY_ERROR": {
      newState = {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.error,
        businessSummary: {},
      };

      return newState;
    }
    case "RESET":
      return initialBusinessState;
    default:
      throw new Error(`No matching action for ${action.type}`);
  }
};
