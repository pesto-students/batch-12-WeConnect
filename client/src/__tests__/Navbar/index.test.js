import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../components/Navbar/Navbar';

describe('Test Navbar Component', () => {
  it('Validate existence of component', () => {
    const navbarInstance = shallow(<Navbar />);
    expect(navbarInstance.exists()).toBe(true);
  });

  it('renders a link to /', () => {
    const navbarInstance = shallow(<Navbar />);
    const linkToRoot = navbarInstance.find({ href: '/' });
    expect(linkToRoot.exists()).toBe(true);
  });

  it('renders given text as Title', () => {
    const givenText = 'SomeRandomText';
    const navbarInstance = shallow(<Navbar titleText={givenText} />);
    const linkToRoot = navbarInstance.find({ href: '/' });
    expect(linkToRoot.text()).toBe(givenText);
  });

  it('renders default text when no text is given as Title', () => {
    const defaultText = Navbar.defaultProps.titleText;
    const navbarInstance = shallow(<Navbar />);
    const linkToRoot = navbarInstance.find({ href: '/' });
    expect(linkToRoot.text()).toBe(defaultText);
  });

  it('renders a Login button if user is not logged in', () => {
    const loginState = false;
    const navbarInstance = shallow(<Navbar isLoggedIn={loginState} />);
    const loginButton = navbarInstance.find({ href: '/login' });
    const loginButtonText = loginButton
      .children()
      .first()
      .text();

    expect(loginButton.exists()).toBe(true);
    expect(loginButtonText.toLowerCase()).toBe('login');
  });

  it('renders a Profile Menu if user is logged in', () => {
    const loginState = true;
    const navbarInstance = shallow(<Navbar isLoggedIn={loginState} />);
    const profileMenu = navbarInstance.find('.profileMenu');

    expect(profileMenu.exists()).toBe(true);
  });
});
