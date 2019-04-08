import React from 'react';
import PageContentMain from 'components/PageContentMain/PageContentMain';
import PageContentMainHeading from 'components/PageContentMainHeading/PageContentMainHeading';
import PageContentMainBody from 'components/PageContentMainBody/PageContentMainBody';

export default () => {
  return (
    <PageContentMain>
      <PageContentMainHeading>Wonen</PageContentMainHeading>
      <PageContentMainBody variant="regular">
        <p>Wonen body</p>
      </PageContentMainBody>
    </PageContentMain>
  );
};
