import React from "react";


function Footer(){
    var date=new Date().getFullYear()
    return(
   <div className="footerDiv">
     <footer className="footerText">Copyright &#169; Hasnain's Stock Builder {date}  </footer>
   </div>

    )
}

export default Footer