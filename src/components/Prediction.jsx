import React, { useState } from "react";
import { Circles } from 'react-loader-spinner'
import Plot from "react-plotly.js"

function Prediction() {
    const [loading, setLoading] = useState(0)
    const [loading2, setLoading2] = useState(0)
    const [disabled, setDisabled] = useState(0)
    const [data, setData] = useState([])
    const [prediction, setPredict] = useState([])
    const [divdata, setDivData] = useState([])
    const [selected, setselect] = useState("")
    const [price, setPrice] = useState("")





    const handleClick = () => {
        setLoading(1)
        setDisabled(1)

        fetch("http://wallstreet-bets-api.herokuapp.com/prediction").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data);

                setLoading(0)
            }
        )

    }




    const handleStockClick = ({ symbol }) => {


        setLoading2(1)
        setDisabled(1)
        setselect(symbol)

        fetch("http://wallstreet-bets-api.herokuapp.com/predict?symbol=" + symbol).then(
            res => res.json()
        ).then(
            data => {
                setPredict(data)
                console.log(JSON.parse(String(data["plot_json"])));
                const plot_data = JSON.parse(String(data["plot_json"]))["data"]
                const plot_array = []

                plot_data.map((e) => {

                    plot_array.push(
                        {

                            type: e["type"],
                            x: e["x"],
                            y: e["y"],
                            mode: e["mode"],
                            name: e["name"]

                        }
                    )

                })


                const layouts = JSON.parse(String(data["plot_json"]))["layout"]
                setDivData({ "plots": plot_array, "layouts": layouts })
                setPrice(data["price"])
                setLoading2(0)



            }
        )



    }


    return (
        <div id="pred" className="histsection" style={{
            backgroundImage: "linear-gradient(  #06283D,#222 )"

        }}>
            {loading === 0 ?
                <div className="plotDiv">
                    {disabled === 0 ?
                        <div className="buttonDiv">
                            <h1><span><img src="pred.png" height={25} width={25} /></span> Press To Predict Stocks</h1>

                            <div style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>

                                <p style={{
                                    display: "flex",
                                    flex: 1,
                                    textAlign: "justify",
                                    textJustify: "inter-word"
                                }}>This button calls the API which uses the coda of dataset collected through the above modules and finally keys them according to the stock. This is then sent out to be trained on a personalized LSTM model which trains and predicts the stock price of the last 10 days. </p>

                                <div style={{
                                    flex: 1.5,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <button id="btn-payout" style={{
                                        width: "80%"
                                    }} onClick={handleClick}>
                                        Press To Start Predictions
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <h1 className="plotTitle" style={{
                                fontSize: "3.5rem"
                            }}>
                                <img className="logo" alt="imga" src="pred.png" height={50} width={50} /><span>  </span>

                                Stock Prediction</h1>
                            <div style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",


                            }}>
                                <div style={{

                                    display: "flex",
                                    borderTopLeftRadius: "22px",
                                    borderBottomLeftRadius: "22px",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: "#e4efe9",
                                    width: "100%",
                                    flex: 1,
                                    padding: "12px"

                                }}>
                                    {data["stocks"].map((e) => {
                                        return (
                                            <button className="btn-selected" onClick={() => handleStockClick({ symbol: e })}>
                                                {e}
                                            </button>)
                                    })}

                                </div>

                                <div style={{
                                    backgroundColor: "#e4efe9",
                                    borderTopRightRadius: "22px",
                                    borderBottomRightRadius: "22px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                    flexDirection: "column",

                                    flex: 2
                                }}>
                                    {loading2 === 0 ? <div>
                                        <h1 className="infoTitle"

                                        >{selected}</h1>
                                        <Plot

                                            data={divdata["plots"]} layout={divdata["layouts"]}

                                        />
                                        {price === "" ? null : <h3 className="infoTitle" >Averaging at a 10-day price of $ {price}</h3>}
                                    </div> : <Circles color="#222" height={80} width={80} />}
                                </div>

                            </div>
                        </>}
                </div> : <Circles color="white" height={80} width={80} />
            }
        </div>
    )
}

export default Prediction