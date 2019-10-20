import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

const Menu = (props) => {
  const { menuLinks } = props.data.site.siteMetadata;
  return (
    <div id="main-menu" className="main-menu">
      <ul>
        {menuLinks.map(link => (
          <li key={link.name}>
            <Link to={link.link}>{link.name}</Link>
          </li>
        ))}
        <li>
          <a href={`mailto:${props.data.site.siteMetadata.contact.email}`}>
            <i class="fas fa-lg fa-envelope"></i>
          </a>
        </li>
        <li>
          <a href={`${props.data.site.siteMetadata.contact.fb}`}>
            <i class="fab fa-lg fa-facebook-square"></i>
          </a>
        </li>
        <li> 
          <a href={"skype:live:.cid.5d01f27b1750bf7b?call"}>
            <i class="fab fa-lg fa-skype"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            contact {
              email
              fb
            }
            menuLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => <Menu data={data} />}
  />
);
