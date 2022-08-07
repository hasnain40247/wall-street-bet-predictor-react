import React, { useState } from "react";

import { BsArrowDownCircleFill } from "react-icons/bs";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Circles } from 'react-loader-spinner'


import Plot from "react-plotly.js"
function Historic() {
    const [loading, setLoading] = useState(0)
    const [disabled, setDisabled] = useState(0)
    const [data, setData] = useState([])
    const [divdata, setDivData] = useState([])
    const [selected_stock, setselect] = useState([])



    const handleClick =  () => {
        setLoading(1)
        setDisabled(1)
        
        fetch("/histanal").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)

                setLoading(0)
            }
        )
     

       

    

    }


    const handleStockClick = ({ symbol }) => {


        const stock = data["plot_json"][symbol]
        const plot_data = JSON.parse(String(stock))
        const plots = [{

            type: plot_data["data"][0]["type"],
            x: plot_data["data"][0]["x"],
            low: plot_data["data"][0]["low"],
            close: plot_data["data"][0]["close"],
            high: plot_data["data"][0]["high"],
            open: plot_data["data"][0]["open"]


        }]
        const layouts = plot_data["layout"]
        console.log(plot_data)
        setselect(symbol)
        setDivData({ "plots": plots, "layouts": layouts })


    }



    return (
        <div id="hist" className="histsection">


            {loading === 0 ?

                <div className="plotDiv">
                    {disabled === 0 ?
                        <div className="buttonDiv">
                            <h1><span><img src="compare.png" height={25} width={25} /></span> Fetch Historic Data</h1>

                            <div style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>

                                <p style={{
                                    display: "flex",
                                    flex: 1,
                                    textAlign: "justify",
                                    textJustify: "inter-word"
                                }}>This button calls the API to essentially load and concatenate today's crawled through most popular stock and uses the yahoo finance API to collect the financial dataset and store it in a dataframe. </p>

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
                                        Press To Get Historic Data
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <h1 className="plotTitle" style={{
                                fontSize: "3.5rem"
                            }}>
                                <img className="logo" alt="imga" src="candle.png" height={50} width={50} /><span>  </span>

                                Select A Stock To View Historic Data</h1>

                            <div style={{
                                margin: "10px 0px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%"
                            }}>
                                <h3 className="plotTitle">{selected_stock} Historical Data</h3>
                                <Plot

                                    data={divdata["plots"]}
                                    layout={divdata["layouts"]}
                                />
                            </div>

                            <div style={{
                                boxSizing: "border-box",
                                marginTop: "26px",

                                alignItems: "center",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>

                                {data["stock_list"].map((e) => {
                                    return (
                                        <button id="btn-payout" style={{
                                            fontSize: "2.5rem",
                                            padding: "8px"
                                        }} onClick={() => handleStockClick({ symbol: e })}>
                                            {e}
                                        </button>)
                                })}


                            </div>



                        </>}

                </div> : <Circles color="white" height={80} width={80} />

            }

            <AnchorLink href="#pred" className="icon" style={{
                padding: "10px",
                fontSize: "2rem",
                color: "#48644c",
                marginTop: "3rem",

            }}><BsArrowDownCircleFill /></AnchorLink>

        </div>


    )
}

export default Historic