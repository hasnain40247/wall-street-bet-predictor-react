import React, {useState } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Circles } from 'react-loader-spinner'
import parse from 'html-react-parser';
import Plot from "react-plotly.js"
function AnalysisSection() {
    const [loading, setLoading] = useState(0)
    const [disabled, setDisabled] = useState(0)
    const [data, setData] = useState({})






    const handleClick = () => {
        setLoading(1)
        setDisabled(1)

        fetch("/members").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(JSON.parse(String(data["picks"])));

                setLoading(0)
            }
        )

    }

    const plotBearish = ({ title }) => {
        console.log(title)
        let stock_array = []
        JSON.parse(String(data["plot_json"][title]))["data"].map((e) => {

            stock_array.push({
                x: e["x"],
                y: e["y"],
                mode: e["mode"],
                type: e["type"],
                xaxis: e["xaxis"],
                yaxis: e["yaxis"],
                name: e["name"]

            })
        })

        return stock_array


    }



    return (
        <div id="analysis" className="analsection">

            {loading === 0 ?
                <div className="plotDiv">
                    {disabled === 0 ?

                        <div className="buttonDiv">
                            <h1><span><img src="reddit.png" height={25} width={25} /></span> Press The Button Below To Crawl Reddit</h1>

                            <div style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>

                                <p style={{
                                    display: "flex",
                                    flex: 1,
                                    textAlign: "justify",
                                    textJustify: "inter-word"
                                }}>This button calls the API to crawl through multiple subreddits, go through the daily discussions, trendy topics and then boil it down to the posts based on the number of upvotes and store its comments. These comments are then put through an NLPTK sentiment analysis crafted with millenial vocabulary to determine sentiment scores. </p>

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
                                        Press To Start Todays Crawl
                                    </button>
                                </div>
                            </div>
                        </div> :
                        <>
                            <h1 className="plotTitle" style={{
                                fontSize: "3.5rem"
                            }}>
                                <img className="logo" alt="imga" src="graph.png" height={50} width={50} /><span>  </span>

                                Statistics</h1>
                            <div className="stat" >
                                <h1 >Number Of Posts Surfed Through:  {data["statistics"]["posts"]}</h1>

                                <h1  >Number Of Comments Scraped:  {data["statistics"]["no_comments"]}</h1>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    backgroundColor: "#06283D",
                                    color: "white",
                                    borderRadius: "20px",
                                    padding: "10px",
                                    boxSizing: "border-box",

                                    alignItems: "center",
                                    justifyContent: "space-between",

                                }}>
                                    <h1>Symbol</h1>
                                    <h1>Mentions</h1>

                                </div>
                                {data["statistics"]["top_picks"].map((item) => {
                                    return (
                                        <div style={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",

                                        }}>
                                            <h1>{item}</h1>
                                            <h1>{data["statistics"]["tickers"][item]}</h1>

                                        </div>
                                    )
                                })}

                            </div>
                            <h3 className="plotTitle">Financial Data</h3>

                            <div className="datatable">
                                {parse(data["table"][0])}
                            </div>


                            <div style={{
                                boxSizing: "border-box",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "3rem 0px"
                            }}>

                                <Plot
                                    data={plotBearish({ title: "Bearish" })}
                                    layout={JSON.parse(String(data["plot_json"]['Bearish']))["layout"]}
                                />
                                <Plot
                                    data={plotBearish({ title: "Bullish" })}
                                    layout={JSON.parse(String(data["plot_json"]['Bullish']))["layout"]}
                                />
                            </div>

                            <h3 className="plotTitle">Frequency Of Stock Mentions</h3>
                            <h3 className="plotTitle">Top 10 Stocks</h3>

                            
                            <Plot
                                data={[
                                    JSON.parse(String(data["picks"]))["data"][0]
                                ]}
                                layout={

                                    JSON.parse(String(data["picks"]))["layout"]

                                }
                            />

                            <h3 className="plotTitle" style={{
                            }}>Sentiment Analysis</h3>

                            <Plot
                                data={[
                                    JSON.parse(String(data["sentiment"]))["data"][0],
                                    JSON.parse(String(data["sentiment"]))["data"][1],

                                    JSON.parse(String(data["sentiment"]))["data"][2],
                                    JSON.parse(String(data["sentiment"]))["data"][3]

                                ]}
                                layout={

                                    {
                                        width: 900, height: 500,
                                        legend:{
                                        bgcolor:"white",
                                        
                                        },
                                        paper_bgcolor: "rgb(0,0,0,0)", xaxis: {
                                            color: "white",

                                        }, yaxis: {
                                            color: "white",
                                        }, barmode: "group"
                                    }
                                }
                            />

                        </>}

                </div> : <Circles color="white" height={80} width={80} />

            }

            <AnchorLink href="#indi" className="icon" style={{
                padding: "10px",
                fontSize: "2rem",
                color: "#48644c",
                marginTop: "3rem",

            }}><BsArrowDownCircleFill /></AnchorLink>
        </div>
    )
}

export default AnalysisSection