import React from "react"
import styled from "@emotion/styled"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import logo from "./ssc_logo_tiny.png"

export default function SiteHeader() {
  const { title } = useSiteMetadata()

  const SiteHeaderWrapper = styled.div`
    padding: ${rhythm(1)} 0;
  `

  const Logo = styled.img`
    width: 40px;
    border-radius: 100%;
    margin: 0;
    padding: 0;
    margin-right: ${rhythm(1 / 2)};
  `

  const HeaderText = styled.h1`
    color: #fff;
    border-bottom: none;
    padding: 0;
    margin: 0;
  `

  const logoLink = css`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  `

  return (
    <SiteHeaderWrapper>
      <Link css={logoLink} to="/">
        <Logo src={logo} alt="Logo" />
        <HeaderText>{title}</HeaderText>
      </Link>
    </SiteHeaderWrapper>
  )
}
