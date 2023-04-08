import React from "react";
import { Box, Text } from "native-base";
import { TouchableOpacity } from "react-native";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const PrintButton: React.FC<any> = ({ rowData }) => {
  const { item } = rowData;

  const html = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>

    <body style="font-family: Times New Roman; line-height: 27px; padding: 30px 0;">

        <h1 style="text-align:center; font-size: 25px;"> PROMISSORY NOTE </h1>
        
        <div style="text-align:start; text-indent: 40px; margin-top: 30px;">
            <p> 
                I am ${item.firstName} ${item.middleName} ${item.lastName} of legal age, Filipino and a resident of ${item.address}.
                I received the amount of _________________________ PESOS from 
                <span style="font-weight:bold;text-decoration:underline; "> Mr. & Mrs. Redentor I. Asdilla </span> 
                with my ${item.bankName} ATM card, with ATM card number of ${item.accountNumber} as my collateral for the said loan.
            </p>
        </div>

        <div style="text-align:start; text-indent: 40px; margin-top: 30px;">
            <p> 
                I promise to pay to 
                <span style="font-weight:bold; text-decoration:underline; "> Mr. & Mrs. Redentor I. Asdilla </span>, 
                of legal age Filipino, and a Resident of     
                <span style="font-weight:bold; text-decoration:underline;"> Burgos St. Brgy. San Roque Tanauan, Leyte </span>
                 the sum of _________________________ PESOS, Philippine currency on or before _________________________, plus _________________________% interest per month.
            </p>
        </div>

        <div style="text-align:start; text-indent: 40px; margin-inline:auto; margin-top: 30px;  ">
            <p> If I fail to make payment on the above promised date, court action shall be filed for the collection of the said debt. I agree and bind myself to pay all the litigation expenses, plus attorney's fee. </p>
        </div>
      
        <div style="display:flex; justify-content:space-around; align-items:center;">
            <div style="flex:1;"> </div>
            <div style="flex:1; text-align:center;"> 
                <p> _________________________ </p>
                <p style="margin-top: -15px"> Promissor </p>
            </div>
        </div>

        <div style="display:flex; justify-content:space-around; align-items:center;">
            <div style="flex:1; text-align:center;"> 
                <p> _________________________ </p>
                <p style="margin-top: -15px"> Guarantor </p>
            </div>
            <div style="flex:1;"> </div>
        </div>


        <div>
            <p style="text-align: center; margin-bottom: 15px;"> Witnesses: </p>
            <div style="display:flex; justify-content:space-around; align-items:center;">
                <div> 1. _________________________ </div>
                <div> 2. ________________________ </div>
            </div>
        </div>

        <div style="text-align:start; text-indent: 40px; margin-top: 30px;">
            <p>
                <span style="font-weight:bold;"> SUBSCRIBED AND SWORN </span>
                to me this ____________________ at ____________________, Philippines.
            </p>
        </div>
    </body>
</html>
`;

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <TouchableOpacity onPress={printToFile}>
      <Box
        mr={1}
        px={3}
        justifyContent={"center"}
        alignSelf="center"
        style={{
          backgroundColor: "#1D3B80",
          height: "80%",
          justifyContent: "center",
        }}
      >
        <Text color="white" fontSize="xs">
          Print
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default PrintButton;
