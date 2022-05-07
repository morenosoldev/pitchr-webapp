import config from '../../util/AxiosConfig';

const ViewsService = {
    addProfileView: (user_id,visitor_id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        return config.post(`/profileview/${user_id}/${visitor_id}`,requestOptions)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
    getProfileViews: (id) => {
        return config.get(`/profileviews/${id}`)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
    addPitchView: (user_id,visitor_id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        return config.post(`/pitchview/${user_id}/${visitor_id}`,requestOptions)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
    getPitchViews: (id) => {
        return config.get(`/pitchviews/${id}`)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
}

export default ViewsService