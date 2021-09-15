const styles = {
    container:{
        display:"flex",
        position: "absolute",
        top: "0",
        left:"0",
        width: "100%" ,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
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