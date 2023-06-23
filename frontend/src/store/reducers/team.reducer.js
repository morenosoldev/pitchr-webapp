import { teamConstants } from "../constants";

const initialState = {
  members: [],
  loading: false,
};

function teamReducer(state = initialState, action) {
  switch (action.type) {
    case teamConstants.ADD_MEMBER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case teamConstants.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        members: [...state.members, action.member],
        loading: false,
      };
    case teamConstants.ADD_MEMBER_FAILURE:
      return {
        ...state,
      };
    case teamConstants.FETCH_MEMBERS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case teamConstants.FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.members,
        loading: false,
      };
    case teamConstants.FETCH_MEMBERS_FAILURE:
      return {
        ...state,
      };

    case teamConstants.DELETE_MEMBERS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case teamConstants.DELETE_MEMBERS_SUCCESS:
      const newArr = state.members.filter((member) => member.id !== action.id);

      return {
        ...state,
        loading: false,
        members: newArr,
      };
    case teamConstants.DELETE_MEMBERS_SUCCESS:
      return {};

    default:
      return state;
  }
}
export default teamReducer;
