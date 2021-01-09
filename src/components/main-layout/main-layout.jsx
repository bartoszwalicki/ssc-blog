import React from "react"
import "normalize.css"
import styled from "@emotion/styled"
import SiteHeader from "./components/site-header/site-header"
import Footer from "./components/footer/footer"


export default function Layout({ children }) {
  const Wrapper = styled.div`
    min-height: 100vh;
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
      <ColumnWrapper>
        <SiteHeader></SiteHeader>
        {children}
        <Footer></Footer>
      </ColumnWrapper>
    </Wrapper>
  )
}
