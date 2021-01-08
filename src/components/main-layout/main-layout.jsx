import React from "react"
import styled from "@emotion/styled"
import SiteHeader from "./components/site-header/site-header"
import Footer from "./components/footer/footer"
import SEO from "../seo/SEO"

export default function Layout({ children }) {
  const Wrapper = styled.div`
    height: 100vh;
    background-color: rgb(26, 29, 33, 1);
    overflow: auto;
  `

  const ColumnWrapper = styled.div`
    max-width: 990px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  `

  return (
    <Wrapper>
      <SEO />
      <ColumnWrapper>
        <SiteHeader></SiteHeader>
        {children}
        <Footer></Footer>
      </ColumnWrapper>
    </Wrapper>
  )
}
