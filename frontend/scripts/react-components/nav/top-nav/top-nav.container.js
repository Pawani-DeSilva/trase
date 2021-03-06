import { connect } from 'react-redux';
import routerLinks from 'router/nav-links';
import TopNav from './top-nav.component';

function mapStateToProps(state) {
  const { type, routesMap } = state.location;
  return {
    links: routerLinks.nav,
    showLogo: type !== 'home',
    ...routesMap[type].nav
  };
}

export default connect(mapStateToProps)(TopNav);
