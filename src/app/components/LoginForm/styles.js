const styles = {
    container:{
        display:"flex",
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        alignItems: "center",
        justifyContent: "center",
        outline: 'none'
    },
    form: {
        container: {
            background:"white",
            width: "400px",
            borderRadius:"8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, .2), 0 8px 16px rgba(0, 0, 0, .2)",
        },
        inputs: {
            display:"flex",
            flexDirection: "column",
            gap: "10px",
        }
    },

}

export default styles;