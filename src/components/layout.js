import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { css } from "@emotion/core"

export default function Layout({ children }) {
  const { title } = useSiteMetadata()

  return (
    <div
      css={css`
        margin: 3rem auto;
        max-width: 850px;
        padding: 0 1rem;
      `}
    >
      <h1>{title}</h1>
      {children}
    </div>
  )
}
