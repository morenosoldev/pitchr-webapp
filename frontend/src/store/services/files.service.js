import config from '../../util/AxiosConfig';

const FilesService = {
    fetchFiles: (id) => {
        return config.get(`/files/${id}`)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
    deleteFile: (id) => {
        return config.delete(`/file/${id}`)
        .then(({data}) => {
            return data
        })
        .catch(err => {
            throw err;
        })
    },
    uploadFile: (file,id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: file
        };
        return config.post(`/file/${id}`,requestOptions)
            .then(({ data }) => {
                return data
            })
            .catch(err => {
                throw err
            })
    },
}

export default FilesService