import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BsArrowDownCircleFill } from "react-icons/bs";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Circles } from 'react-loader-spinner'
import PlotComponent from "./PlotComponent";
import parse from 'html-react-parser';
import Plot from "react-plotly.js"
function Historic() {
    const [loading, setLoading] = useState(0)
    const [disabled, setDisabled] = useState(0)
    const [data, setData] = useState([])
    const [divdata, setDivData] = useState([])
    
    const [bearish, setBearish] = useState([])
    const [neutral, setNeutral] = useState([])
    const [bullish, setBullish] = useState([])
    const [selected_stock, setselect] = useState([])







    const handleClick = () => {
        setLoading(1)
        setDisabled(1)

        fetch("/histanal").then(
            res => res.json()
        ).then(
            data => {
                setData(data)

                setLoading(0)
            }
        )

    }


    const handleStockClick = ({symbol}) => {
        
        
const stock= data["plot_json"][symbol]
const plot_data= JSON.parse(String(stock))
const plots=[{

        type: plot_data["data"][0]["type"],
        x: plot_data["data"][0]["x"],
        low: plot_data["data"][0]["low"],
        close: plot_data["data"][0]["close"],
        high:plot_data["data"][0]["high"],
        open:plot_data["data"][0]["open"]


}]
const layouts=plot_data["layout"]
console.log(plot_data)
setselect(symbol)
setDivData({"plots": plots, "layouts":layouts})


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
        <div className="histsection">


{loading === 0 ?

    <div className="plotDiv">
        {disabled === 0 ? 
        <div className="buttonDiv">
        <h1><span><img src="compare.png" height={25} width={25} /></span> Fetch Historic Data</h1>

     <div style={{
        display:"flex",
        flexDirection:"row"
     }}>

     <p style={{
        display:"flex",
        flex:1,
        textAlign: "justify",
        textJustify: "inter-word"
     }}>This button calls the API to essentially load and concatenate today's crawled through most popular stock and uses the yahoo finance API to collect the financial dataset and store it in a dataframe. </p>

<div style={{
      flex:1.5,
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center"
}}>
<button id="btn-payout" style={{
    width:"80%"
}}  onClick={handleClick}>
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
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    width:"100%"
}}>
    <h3 className="plotTitle">{selected_stock} Historical Data</h3>
    <Plot  

    data={divdata["plots"]}
    layout={divdata["layouts"]}
    />
</div>

                <div style={{
                    boxSizing: "border-box",
                    marginTop:"26px",

                    alignItems: "center",
                    width:"100%",
                    display: "flex",
                    flexDirection:"row",
                    justifyContent: "space-between",
                }}>

{data["stock_list"].map((e)=>{
    return(
        <button id="btn-payout" style={{
            fontSize:"2.5rem",
            padding:"8px"
        }} onClick={()=>handleStockClick({symbol: e})}>
                                {e}
                            </button> )
})}
                

                </div>



            </>}

    </div> : <Circles color="white" height={80} width={80} />

}



                </div> 

            


        
    )
}

export default Historic