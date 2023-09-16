import { Box, Heading, NativeBaseProvider, ScrollView, Text , View } from 'native-base';
import { React } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import OrderInfo from '../Components/PlaceOrder/OrderInfo';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import OrderItem from '../Components/PlaceOrder/OrderItem';
import PlaceOrderModel from '../Components/PlaceOrder/placeOrderModel';

const PlaceOrderScreen=({route})=>{
  const product = route.params;
  return (
    <NativeBaseProvider>
      <Box
        bg="#D8D4F2"
        // flex=1 increases height of scrollview, fix?
        // flex=1 make the second box appear, why does it not appear
        flex={1}
        safeArea pt={6}
      >
        <Box>
          <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // bg="cyan.100"
              // contentContainerStyle={{flexGrow: 1}}
            >
              <OrderInfo
                title={"Customer"}
                success
                subTitle={"Admin joe"}
                text={"admin@example.com"}
                icon={<FontAwesome name="user" size={30} color={"white"} />}
              />
              <OrderInfo
                title={"ORDER INFO"}
                danger
                subTitle={"Shipping: Tanzania"}
                text={"Pay method: PayPal"}
                icon={<FontAwesome5 name="shipping-fast" size={30} color={"white"} />}
              />
              <OrderInfo
                title={"DELIVER TO"}
                subTitle={"Address:"}
                text={"Arusha Tz"}
                icon={<Ionicons name="location-sharp" size={30} color={"white"} />}
              />
            </ScrollView>
        </Box>
        <Box
          px={6}
          flex={1}
          pb={3}
        >
          <Heading
            bold
            fontSize={15}
            isTruncated
            my={4}
          >
            Products
          </Heading>
            <OrderItem/>
            <PlaceOrderModel />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

export default PlaceOrderScreen ;