import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ifa from '../images/ifa.jpg';
import logoTag from '../images/logo_tag.png';

const Footer = props => (
  <div className="footer-strip">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer">
            <img alt="logo tag" src={logoTag} />
            <ul className="footer-menu">
              <li>
                <img alt="ifa" src={ifa} /> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Footer data={data} />}
  />
);
