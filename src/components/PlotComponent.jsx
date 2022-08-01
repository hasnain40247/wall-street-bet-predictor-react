import React from "react";

function PlotComponent({link, title}){
return(<div className="plots">
    <h3 className="plotTitle">{title}</h3>
<a href={link} ><img alt="imag" style={{
            borderRadius:"22px"
        }} src={link} height={600} width={800}/></a>
</div>)
}

export default PlotComponent