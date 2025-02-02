import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import EditProfileScreen from '../screens/account/edit-profile-screen.tsx/EditProfileScreen'
import MyBidRequestScreen from '../screens/account/my-bid-request-screen/MyBidRequestScreen'
import { MyPartRequestListScreen } from '../screens/account/my-part-request/MyPartRequestListScreen'
import { OrderPlacedListScreen } from '../screens/account/order-placed-list-screen/OrderPlacedListScreen'
import { OrderRecievedListScreen } from '../screens/account/order-recieved-list-screen/OrderRecievedListScreen'
import { PartRequestDetailScreen } from '../screens/account/part-request-detail-screen/PartRequestDetailScreen'
import { PartRequestScreen } from '../screens/account/part-request-screen/PartRequestScreen'
import { ProfileNameEditScreen } from '../screens/account/profile-name-edit-screen/ProfileNameEditScreen'
import ProfileScreen from '../screens/account/profile-screen/ProfileScreen'
import { RatingsScreen } from '../screens/account/ratings/RatingsScreen'
import { SubscriptionScreen } from '../screens/account/subscription/SubscriptionScreen'
import WinningBidScreen from '../screens/account/winning-bid-screen/WinningBidScreen'
import { WishlistScreen } from '../screens/cart/WishlistScreen'
import { OrderReceivedDetailScreen } from '../screens/order-recieved-detail-screen/OrderReceivedDetailScreen'

const Stack = createStackNavigator()

export const AccountStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ScreenNames.RATINGS_SCREEN}
        component={RatingsScreen} />
      <Stack.Screen name={ScreenNames.SUBSCRIPTION_SCREEN}
        component={SubscriptionScreen} />
      <Stack.Screen name={ScreenNames.PROFILE_SCREEN}
        component={ProfileScreen} />
      <Stack.Screen name={ScreenNames.EDIT_PROFILE_SCREEN}
        component={EditProfileScreen} />
      <Stack.Screen name={ScreenNames.EDIT_NAME_PROFILE_SCREEN}
        component={ProfileNameEditScreen} />
      <Stack.Screen name={ScreenNames.MY_BID_REQUEST_SCREEN}
        component={MyBidRequestScreen} />
      <Stack.Screen name={ScreenNames.WINNING_BID_SCREEN}
        component={WinningBidScreen} />
      <Stack.Screen name={ScreenNames.PART_REQUEST_SCREEN}
        component={PartRequestScreen} />
      <Stack.Screen name={ScreenNames.PART_REQUEST_DETAIL_SCREEN}
        component={PartRequestDetailScreen} />
      <Stack.Screen name={ScreenNames.ORDER_RECIEVED_LIST_SCREEN}
        component={OrderRecievedListScreen} />
      <Stack.Screen name={ScreenNames.ORDER_PLACED_LIST_SCREEN}
        component={OrderPlacedListScreen} />
      <Stack.Screen name={ScreenNames.WISHLIST_SCREEN}
        component={WishlistScreen} />
      <Stack.Screen name={ScreenNames.MY_PART_REQUEST_LIST_SCREEN}
        component={MyPartRequestListScreen} />
      <Stack.Screen name={ScreenNames.ORDER_RECEIVED_DETAIL}
        component={OrderReceivedDetailScreen} />
    </Stack.Navigator>
  )
}