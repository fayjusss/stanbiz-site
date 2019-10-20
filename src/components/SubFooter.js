import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';


const SubFooter = props => (
  <div className="sub-footer-strip">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="sub-footer">
            <ul>
              <li>
                <a href={`mailto:${props.data.site.siteMetadata.contact.email}`}>
                  <i class="fas fa-lg fa-envelope"></i>
                </a>
              </li>
              <li className="pl-2">
                <a href={`${props.data.site.siteMetadata.contact.fb}`}>
                  <i class="fab fa-lg fa-facebook-square"></i>
                </a>
              </li>
              <li className="pl-2"> 
                <a href={"skype:live:.cid.5d01f27b1750bf7b?call"}>
                  <i class="fab fa-lg fa-skype"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="sub-footer">
            <ul>
              <li>
                {' '}
                <Link to="/">Home</Link>
              </li>
              <li>
                {' '}
                |
              </li>
              <li>
                {' '}
                <Link to="/services">Services</Link>
              </li>
              <li>
                {' '}
                |
              </li>
              <li>
                {' '}
                <Link to="/team">Team</Link>
              </li>
              <li>
                {' '}
                |
              </li>
              <li>
                {' '}
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="sub-footer">
            <ul>
              <li className="copyright">
                ©
              {' '}
              {new Date().getFullYear()}
              {' '}
              {props.data.site.siteMetadata.title}
              . All rights reserved
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
            contact {
              email
              phone
            }
          }
        }
      }
    `}
    render={data => <SubFooter data={data} />}
  />
);
