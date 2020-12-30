import React from "react"
import styled from "@emotion/styled"
import { rhythm } from "../../../../utils/typography"

export default function SiteHeader() {
    const nowYear = new Date().getFullYear();

    const Footer = styled.footer`
    text-align: right;
    border-top: 1px dashed rgba(255,255,255,0.4);
    color: rgba(255,255,255,0.4);
    font-size: 0.8rem;
    margin-top: ${rhythm(1 / 4)};
    padding: ${rhythm(1 / 2)} 0;
  `

    return (
        <Footer>
            Solid State Code - Bartosz Walicki {nowYear} | This site is not storing any data nor cookies
        </Footer>
    )
}
