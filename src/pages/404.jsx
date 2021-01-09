import React from "react"
import "normalize.css"
import styled from "@emotion/styled"
import SiteHeader from "../components/main-layout/components/site-header/site-header"
import Footer from "../components/main-layout/components/footer/footer"


export default function Layout() {
  const Wrapper = styled.div`
    min-height: 100vh;
    background-color: rgb(26, 29, 33, 1);
    overflow: auto;
  `

  const ColumnWrapper = styled.div`
    max-width: 990px;
    min-height: 100vh;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  `

  const Message = styled.h1`
    text-align: center;
  `

  return (
    <Wrapper>
      <ColumnWrapper>
        <SiteHeader></SiteHeader>
        <Message>404</Message>
        <Footer></Footer>
      </ColumnWrapper>
    </Wrapper>
  )
}
