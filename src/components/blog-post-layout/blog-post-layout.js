import React from "react"
import Layout from "../main-layout/main-layout"
import { graphql } from "gatsby"
import BlogContent from "./components/blog-content"
import BlogPostHeader from "./components/blog-post-header"
import CreateGithubIssueCta from "./components/create-github-issue-cta/create-github-issue-cta"

export default function BlogPostLayout({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <BlogPostHeader
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
      <BlogContent dangerouslySetInnerHTML={{ __html: post.html }} />
      <CreateGithubIssueCta slug={post.fields.slug} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
