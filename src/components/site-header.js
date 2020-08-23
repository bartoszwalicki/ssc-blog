import React from "react"
import styled from "@emotion/styled"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { rhythm } from "../utils/typography";
import { Link } from "gatsby";
import { css } from "@emotion/core"

export default function SiteHeader() {
    const { title } = useSiteMetadata()

    const SiteHeaderWrapper = styled.div`
        padding: ${rhythm(1)} 0;
    `

    const HeaderText = styled.h1`
        color: #fff;
    `

    const noUnderline = css`
        text-decoration: none;
    `;

    return (
        <SiteHeaderWrapper>
            <Link css={noUnderline} to="/">
                <HeaderText>{title}</HeaderText>
            </Link>
        </SiteHeaderWrapper>
    )
}