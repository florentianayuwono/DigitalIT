/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useBusinessContext } from "../features/business/businessContext";
import { getBusinessSummary } from "../features/business/businessServices";

// A function that capitalizes the first letter of each word in a string
const capitalize = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }).replace(/\s/g, "");
}

export default function BusinessSummary({ business_id, date_range }) {
  const { businesses, dispatch: businessDispatch } = useBusinessContext();

  useEffect(() => {
    const fetch = async () => {
      const summary = await getBusinessSummary(businessDispatch, {
        business_id,
        date_range,
      });
      return summary;
    };

    fetch();
  }, []);

  // A summary showing the total number of products sold, the total revenue, the total revenue per category,
  // the total profit, the total profit per category, product with highest profit, product with the highest sales.
  return (
    <Accordion
      defaultIsOpen={false}
      allowMultiple
      allowToggle
      defaultIndex={[0]}
    >
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
            <container flex="1" textAlign="left">
              Main Summary
            </container>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <h3>
            Total number of products sold :{" "}
            {businesses.businessSummary?.totalNumberOfProductsSold}
          </h3>
          <h3>Total revenue : {businesses.businessSummary?.totalRevenue}</h3>
          <h3>Total profit: {businesses.businessSummary?.totalProfit} </h3>
        </AccordionPanel>
      </AccordionItem>
      {businesses.businessSummary?.totalRevenue ? (
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
              <container flex="1" textAlign="left">
                Categorized Summary
              </container>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <h3>Total number of products sold per category :</h3>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th>Number of products sold</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(
                    businesses.businessSummary
                      ?.totalNumberOfProductsSoldPerCategory
                  ).map((category) => (
                    <Tr>
                      <Td>{capitalize(category)}</Td>
                      <Td>
                        {
                          businesses.businessSummary
                            .totalNumberOfProductsSoldPerCategory[category]
                        }
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <h3>Total revenue per category :</h3>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th>Revenue Per Category</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(
                    businesses.businessSummary?.totalRevenuePerCategory
                  ).map((category) => (
                    <Tr>
                      <Td>{capitalize(category)}</Td>
                      <Td>
                        {
                          businesses.businessSummary.totalRevenuePerCategory[
                            category
                          ]
                        }
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <h3>Total profit per category :</h3>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th>Profit Per Category</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(
                    businesses.businessSummary?.totalProfitPerCategory
                  ).map((category) => (
                    <Tr>
                      <Td>{capitalize(category)}</Td>
                      <Td>
                        {
                          businesses.businessSummary.totalProfitPerCategory[
                            category
                          ]
                        }
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      ) : (
        <></>
      )}
      {businesses.businessSummary?.totalProfit ? (
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "purple", color: "white" }}>
              <container flex="1" textAlign="left">
                Product Highlight
              </container>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <h3>Product with highest profit :</h3>
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  {/* Show product_name, product_category, product_cost, product_price, quantity_sold, total_profit. store_name of the product */}
                  <Tr>
                    <Td>
                      <h5>Product Name</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestProfit.product_name}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Product Category</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestProfit.product_category}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Product Cost</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestProfit.product_cost}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Product Price</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestProfit.product_price}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Quantity Sold</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestProfit.quantity}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Total Profit From This Product</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestProfit.total_profit}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Store Name</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestProfit.store_name}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <h3>Product with highest sales :</h3>
            {/* Show product_name, store_name, and quantity_sold of the product */}
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>
                      <h5>Product Name</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestSales.product_name}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Store Name</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestSales.store_name}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <h5>Quantity Sold</h5>
                    </Td>
                    <Td>
                      {businesses.businessSummary?.highestSales.quantity}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </AccordionPanel>
        </AccordionItem>
      ) : (
        <></>
      )}
    </Accordion>
  );
}
