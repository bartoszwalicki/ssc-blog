import React from "react"
import { Link } from "gatsby"

export default function Home() {
  return (<div><ul><li><Link to="/about/">About</Link></li></ul>
    <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div></div>)
}