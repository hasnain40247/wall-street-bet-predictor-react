import React, {  useState } from "react";

import { BsArrowDownCircleFill } from "react-icons/bs";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Circles } from 'react-loader-spinner'
import Plot from "react-plotly.js"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function IndivStock() {
    const [loading, setLoading] = useState(0)
    const [disabled, setDisabled] = useState(0)
    const [data, setData] = useState({})
    const [datalist, setDataList] = useState([])


    const handleClick = () => {
      
        setLoading(1)
        setDisabled(1)
      
       fetch("/indivstock").then(
        res => res.json()
    ).then(
        data => {
            setData(data)
            console.log(data)
            const dl=[]

            Object.keys(data["plot_json"]).map((key, index) => {

        
                dl.push(   <Plot
                    data={plotBearish({
                        stock_data: JSON.parse(String(data["plot_json"][key]))["data"]
                    })}
                    layout={JSON.parse(String(data["plot_json"][key]))["layout"]}
                />)

            
                


            })

            setDataList(dl)




            

            setLoading(0)
        }
    )

     

    }

    const plotBearish = ({ stock_data }) => {

        let return_array = []
        stock_data.map((e) => {


            return_array.push({
                x: e["x"],
                y: e["y"],
                mode: e["mode"],
                type: e["type"],
                xaxis: e["xaxis"],
                yaxis: e["yaxis"],
                name: e["name"],
                fill: e["fill"],
                line: { color: e["line"]["color"] }

            })
        })


        return return_array


    }




    return (
        <div id="indi" className="indivsection">

            {loading === 0 ?
                <div className="plotDiv">
                    {disabled === 0 ?

                        <div className="buttonDiv">
                            <h1><span><img src="graph.png" height={25} width={25} /></span> Press Get Stock Comparisions</h1>

                            <div style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>

                                <p style={{
                                    display: "flex",
                                    flex: 1,
                                    textAlign: "justify",
                                    textJustify: "inter-word"
                                }}>This button calls the API flask API to generate a the top mentioned picks and create graphs with axes that pertain to the stock price currently, the percentage of negative sentiments and the percentage of positive sentiments. </p>

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
                                        Press To Get Stock Comparisions
                                    </button>
                                </div>
                            </div>
                        </div>

                        :
                        <>
                            <h1 className="plotTitle" style={{
                                fontSize: "3.5rem"
                            }}>
                                <img className="logo" alt="imga" src="compare.png" height={50} width={50} /><span>  </span>

                                Stock Comparisions</h1>

                            <h3 className="plotTitle">Financial Data</h3>

                       
    <AliceCarousel paddingLeft={350} autoPlay autoPlayDirection="right" autoPlayInterval={3000} infinite  mouseTracking  items={datalist} />

                              





                        </>}

                </div> : <Circles color="white" height={80} width={80} />

            }
            <AnchorLink href="#hist" className="icon" style={{
                padding: "10px",
                fontSize: "2rem",
                color: "#48644c",
                marginTop: "3rem",

            }}><BsArrowDownCircleFill /></AnchorLink>

        </div>
    )
}

export default IndivStock