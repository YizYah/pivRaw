import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function AppTitleAccordion({ title, description, children }) {
  const styles = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.root}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleAccordionChange('panel1')}
        className={styles.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
          classes={{
            content: styles.accordionSummary,
          }}
        >
          <Typography className={styles.heading}>{title}</Typography>
          <Typography className={styles.secondaryHeading}>
            DESCRIPTION
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{description}</Typography>
        </AccordionDetails>
      </Accordion>
      {children}
    </div>
  );
}

export default AppTitleAccordion;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '1.2rem 0',
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 'Bold',
    flexBasis: '33.33%',
    flexShrink: 0,
    textAlign: 'initial'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: '#26ABBC',
  },
  accordion: {
    backgroundColor: '#D2ECEF',
    margin: '1rem 0',
    border: 'none',
    borderRadius: '10px',
    padding: '10px'
  },
  accordionSummary: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
