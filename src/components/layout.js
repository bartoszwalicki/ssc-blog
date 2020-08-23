import React from "react"
import styled from "@emotion/styled"
import SiteHeader from "./site-header";

export default function Layout({ children }) {


  const Wrapper = styled.div`
    height: 100vh;
    background-color: #000;
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
      </ColumnWrapper>
    </Wrapper>
  )
}
