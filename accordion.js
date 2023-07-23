import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children, key }) {
  const decoratedOnClick = useAccordionButton(key, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: 'pink' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default function Example() {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <CustomToggle key="1">Click me!</CustomToggle>
        </Card.Header>
        <Accordion.Collapse key="1">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}