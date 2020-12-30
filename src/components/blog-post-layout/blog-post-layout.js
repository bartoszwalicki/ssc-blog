import React from "react"
import Layout from "../main-layout/main-layout"
import { graphql } from "gatsby"
import BlogContent from "./components/blog-content"
import BlogPostHeader from "./components/blog-post-header"


export default function BlogPostLayout({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <div>
        <BlogPostHeader title={post.frontmatter.title} date={post.frontmatter.date} />
        <BlogContent dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        date
      }
    }
  }
`
