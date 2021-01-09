import React from "react"
import styled from "@emotion/styled"
import { rhythm } from "../../../../utils/typography"

export default function SiteHeader() {
  const nowYear = new Date().getFullYear()

  const Footer = styled.footer`
    text-align: center;
    border-top: 1px dashed rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.4);
    padding: ${rhythm(1 / 2)} 0;

    @media (min-width: 576px) {
      text-align: right;
    }
  `

  const Section = styled.span`
    display: block;

    @media (min-width: 576px) {
      display: inline;
    }
  `

  const Divider = styled.span`
    display: none;

    @media (min-width: 576px) {
      display: inline;
    }
  `

  return (
    <Footer>
      <Section>Solid State Code - Bartosz Walicki {nowYear}</Section>{" "}
      <Divider>|</Divider>{" "}
      <Section>This site is not storing any data nor cookies</Section>
    </Footer>
  )
}
