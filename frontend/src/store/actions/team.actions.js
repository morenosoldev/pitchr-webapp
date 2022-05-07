import { teamConstants } from '../constants';
import { alertActions } from './alert.actions';
import TeamService from '../services/team.service';

export const teamActions = {
  addMember,
  deleteMember,
  getMembers,
};

function addMember(member, id) {
    return dispatch => {
        dispatch(request({ member }));
        TeamService.addMember(member,id)
            .then(
                data => { 
                    console.log(data)
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: teamConstants.ADD_MEMBER_REQUEST} }
    function success(member) { return { type: teamConstants.ADD_MEMBER_SUCCESS, member } }
    function failure(error) { return { type: teamConstants.ADD_MEMBER_FAILURE, error } }
}

function getMembers(id) {
    return dispatch => {
        dispatch(request({ id }));
        TeamService.getMembers(id)
            .then(
                data => { 
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: teamConstants.FETCH_MEMBERS_REQUEST} }
    function success(members) { return { type: teamConstants.FETCH_MEMBERS_SUCCESS, members } }
    function failure(error) { return { type: teamConstants.FETCH_MEMBERS_FAILURE, error } }
}

function deleteMember(id) {
    return dispatch => {
        dispatch(request({ id }));
        TeamService.deleteMember(id)
            .then(
                data => { 
                    //console.log(data)
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: teamConstants.DELETE_MEMBERS_REQUEST} }
    function success(id) { return { type: teamConstants.DELETE_MEMBERS_SUCCESS, id } }
    function failure(error) { return { type: teamConstants.DELETE_MEMBERS_FAILURE, error } }
}

