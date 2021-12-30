

const showErrorMessage = (error) => error.response ? error.response.data.detail || error.response.detail || Object.values(error.response.data)[0] : "Ups, we are having troubles connecting to the server. Please, try again later.";


export default showErrorMessage

