import React, { useContext } from 'react';
import { OverviewPage, PageContent } from 'components/Page/Page';
import PageHeading from 'components/PageHeading/PageHeading';
import { AppContext } from 'AppState';
import DataLinkTable from 'components/DataLinkTable/DataLinkTable';
import { Chapters, ChapterTitles } from 'App.constants';
import styles from './Inkomen.module.scss';
import { ButtonLinkExternal } from 'components/ButtonLink/ButtonLink';
import { ExternalUrls } from 'App.constants';
import Alert from 'components/Alert/Alert';
import { useTabletScreen } from 'hooks/media.hook';
import ChapterIcon from 'components/ChapterIcon/ChapterIcon';

const DISPLAY_PROPS = {
  datePublished: 'besluit',
};

const DISPLAY_PROPS_ACTUAL = {
  dateStart: 'aanvraag',
};

export default () => {
  const {
    FOCUS: {
      data: { products },
      isError,
      isLoading,
    },
  } = useContext(AppContext);

  const items = Object.values(products).flatMap(product => product.items);
  const itemsRequested = items.filter(item => !item.hasDecision);
  const itemsDecided = items.filter(item => item.hasDecision);
  const hasActiveRequests = !!itemsRequested.length;
  const isTabletScreen = useTabletScreen();

  return (
    <OverviewPage className={styles.Inkomen}>
      <PageHeading icon={<ChapterIcon chapter={Chapters.INKOMEN} />}>
        {ChapterTitles.INKOMEN}
      </PageHeading>
      <PageContent>
        <p>
          Hieronder vindt u een overzicht van alle voorzieningen die u hebt ter
          aanvulling of ondersteuning bij een laag inkomen.
        </p>
        <p>
          <ButtonLinkExternal to={ExternalUrls.WPI_REGELINGEN}>
            Naar alle regeleingen voor Werk en inkomen
          </ButtonLinkExternal>
          <br />
          <ButtonLinkExternal to={ExternalUrls.WPI_CONTACT}>
            Contact Werk en inkomen
          </ButtonLinkExternal>
        </p>
        {isError && (
          <Alert type="warning">
            We kunnen op dit moment geen gegevens tonen.
          </Alert>
        )}
      </PageContent>
      <DataLinkTable
        id="datalinktable-income-actual"
        rowHeight={isTabletScreen ? 'auto' : '5.8rem'}
        displayProps={DISPLAY_PROPS_ACTUAL}
        items={itemsRequested}
        title="Mijn lopende aanvragen"
        startCollapsed={false}
        isLoading={isLoading}
        trackCategory="Werk en inkomen overzicht / Lopende aanvragen"
        noItemsMessage="U hebt op dit moment geen lopende aanvragen."
      />
      <DataLinkTable
        id="datalinktable-income-granted"
        rowHeight={isTabletScreen ? 'auto' : '5.8rem'}
        displayProps={DISPLAY_PROPS}
        items={itemsDecided}
        startCollapsed={hasActiveRequests}
        isLoading={isLoading}
        title="Mijn besluiten"
        trackCategory="Werk en inkomen overzicht / Besluiten"
        noItemsMessage="U hebt op dit moment geen besluiten."
      />
    </OverviewPage>
  );
};
