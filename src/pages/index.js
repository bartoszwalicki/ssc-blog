import { css } from "@emotion/core"
import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/main-layout/main-layout"
import { rhythm } from "../utils/typography"
import styled from "@emotion/styled"

export default function Home({ data }) {
  const PostExcerptContainer = styled.article`
    margin-bottom: ${rhythm(1.5)};
  `

  const Abstract = styled.p``

  return (
    <Layout>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostExcerptContainer key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <time
                css={css`
                  color: #bbb;
                `}
              >
                {node.frontmatter.date}
              </time>
              <h1
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}
              </h1>
              <Abstract>{node.frontmatter.abstract}</Abstract>
            </Link>
          </PostExcerptContainer>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            abstract
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
