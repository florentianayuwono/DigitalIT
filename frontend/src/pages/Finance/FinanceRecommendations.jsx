import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  Select,
  FormLabel,
  Button,
  Stack,
} from "@chakra-ui/react";

export default function FinanceRecommendations() {
  return (
    <div>
      <Accordion allowMultiple allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
              <container flex="1" textAlign="left">
                Enemy in disguise
              </container>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            You might want to watch out for your Cost of Goods Sold or
            Operational Expense! Looks like it is hindering your profit growth.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
              <container flex="1" textAlign="left">
                Paradox of thrift in action
              </container>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            You might be able to boost your revenue by spending more in
            promotion! Check out our business recommendations for more tips.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
              <container flex="1" textAlign="left">
                Digitalize your bookkeeping
              </container>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Tired of filling sales data manually on pen and paper? Why not try
            these awesome bookkeeping platforms.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
