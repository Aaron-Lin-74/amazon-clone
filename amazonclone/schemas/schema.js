import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import product from './product';
import navbarLink from './navbarLink';
import footerLink from './footerLink';
import sidemenuLink from './sidemenuLink';
import heroImage from './heroImage';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,
    navbarLink,
    sidemenuLink,
    footerLink,
    heroImage,
  ]),
});
