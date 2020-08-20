import React from "react"
import styled from "@emotion/styled"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { rhythm } from "../utils/typography";

export default function SiteHeader() {
    const { title } = useSiteMetadata()

    const SiteHeaderWrapper = styled.div`
        padding: ${rhythm(1)} 0;
    `

    return (
        <SiteHeaderWrapper>
            <h1>{title}</h1>
        </SiteHeaderWrapper>
    )
}