/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="px-4 h-full">
        <main className="my-1 h-full">{children}</main>
      </div>
      <footer className="py-1 border-t text-xs px-4 border-gray-500 flex flex-row justify-between bg-gray-300">
        <div>
          <span className="py-1">
            Built using {` `}</span>
            <a className="text-indigo-800 py-1 underline hover:bg-indigo-800 hover:text-gray-100" href="https://www.gatsbyjs.org"> Gatsby</a>
        </div>
        <div >
        <span className="py-1">
            © {new Date().getFullYear()} Built by </span><a className="text-indigo-800 py-1 underline hover:bg-indigo-800 hover:text-gray-100" href="https://softwarecrafts.uk">Software Crafts</a>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
