import config from '../../util/AxiosConfig';

const TeamService = {
    addMember: (member,id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: member
        };

        return config.post(`/member/${id}`,requestOptions)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
    deleteMember: (id) => {
        return config.delete(`/member/${id}`)
        .then(({data}) => {
            return data
        })
        .catch(err => {
            throw err;
        })
    },
    getMembers: (id) => {
        return config.get(`/members/${id}`)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
}

export default TeamService