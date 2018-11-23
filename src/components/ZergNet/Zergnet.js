import React from "react"

class Zergnet extends React.Component {
  render() {
    let zergnet = document.createElement("script")
    zergnet.type = "text/javascript"
    zergnet.async = true
    zergnet.src =
      (document.location.protocol == "https:" ? "https:" : "http:") +
      "//www.zergnet.com/zerg.js?id=50489"
    let znscr = document.getElementsByTagName("script")[0]
    znscr.parentNode.insertBefore(zergnet, znscr)

    return <div id="zergnet-widget-50489" />
  }
}

export default Zergnet
