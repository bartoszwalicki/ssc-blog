import React from "react"
import styled from "@emotion/styled"
import SiteHeader from "./site-header";

export default function Layout({ children }) {


  const Wrapper = styled.div`
    height: 100vh;
    background-color: #000;
  `

  const ColumnWrapper = styled.div`
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
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
