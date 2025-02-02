import React, { useCallback, useEffect } from 'react'

import { isEmpty, map } from 'lodash'
import { ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { partRequestDetailScreenStyles as styles } from './styles'
import { HeaderComponent } from '../../../common/components/screens'
import { ProposeOfferFormComponent } from '../../../common/components/screens/part-request/ProposeOfferForm'
import { BiddingDetailComponent, CompanyDetailComponent, RequestedPartBasicDetailsComponent } from '../../../common/components/screens/part-request/RequestedPartDetailsComponent'
import { log } from '../../../common/config/log'
import { IBidDetail, ICompanyDetail, IPartRequestBasicDetail } from '../../../common/Interfaces'
import { PART_REQUEST_DETAIL_SCREEN } from '../../../common/strings'
import { getSelectedPartRequestType } from '../../../redux/part-request/PartRequestSelector'
import { removePartRequestOnLaterOrWishlistReducer } from '../../../redux/part-request/PartRequestSlice'
import { addPartRequestToWishlistApi, fetchPartRequestDetail, ignorePartRequestApi } from '../../../redux/part-request-detail/PartRequestDetailApi'
import { getBasicDetail, getCompanyDetail, getBiddingList, isWishlistStatusChanged, isRequestIgnoredStatusChanged, isAddedInWishlist, isPartRequestIgnored } from '../../../redux/part-request-detail/PartRequestDetailSelector'
import { setActivePartRequestIdReducer } from '../../../redux/part-request-detail/PartRequestDetailSlice'
import { isPartRequestCancelled, isPartRequestResolved } from '../../../utils/app-utils'
import { goBack } from '../../../utils/navigation-utils'


interface IProps {
  navigation?: any
  route?: any
}

const { HEADER_TITLE } = PART_REQUEST_DETAIL_SCREEN

export const PartRequestDetailScreen = (props: IProps) => {
  const { navigation, route } = props

  const dispatch = useDispatch()
  const basicDetail = useSelector(getBasicDetail) || {}
  const companyDetail = useSelector(getCompanyDetail) || {}
  const biddingList = useSelector(getBiddingList)
  const isWishlistChanged = useSelector(isWishlistStatusChanged)
  const isRequestIgnoreListChnaged = useSelector(isRequestIgnoredStatusChanged)
  const selectedPartRequestType = useSelector(getSelectedPartRequestType)
  const isPartAddedInWishlist = useSelector(isAddedInWishlist) || false
  const isPartAddedInIgnoreList = useSelector(isPartRequestIgnored) || false

  log('selectedPartRequestType selectedPartRequestType', selectedPartRequestType)

  useEffect(() => {
    log('useEffectuseEffectuseEffect')
    const partRequestId = route?.params?.partRequestId
    dispatch({
      type: setActivePartRequestIdReducer.type,
      payload: {
        partRequestId
      }
    })
    if(partRequestId) {
      fetchPartRequestDetail({
        productId: partRequestId
      })
    }
  }, [dispatch, route])

  useEffect(() => {
    return () => {
      log('selectedPartRequestType unmounting called')
      if((selectedPartRequestType === 'wishlist' && isWishlistChanged) || (selectedPartRequestType === 'ignored' && isRequestIgnoreListChnaged)) {
        log('inside if is called selectedPartRequestType unmounting called')
        dispatch({
          type: removePartRequestOnLaterOrWishlistReducer.type,
          payload: {
            extraParams: {
              partRequestId: route?.params?.partRequestId
            }
          }
        })
      }
    }
  }, [isWishlistChanged, isRequestIgnoreListChnaged, selectedPartRequestType, route, dispatch])


  const onPressBackButton = useCallback(() => {
    goBack(navigation)
  }, [navigation])

  const scrollToProposeOfferSection = useCallback(() => {

  }, [])

  const onPressIgnoreButton = useCallback(() => {
    const partRequestId = route?.params?.partRequestId
    ignorePartRequestApi(partRequestId)
  }, [route])

  const onPressWishlistButton = useCallback(() => {
    const partRequestId = route?.params?.partRequestId
    addPartRequestToWishlistApi(partRequestId)
  }, [route])

  const renderBasicDetailComponent = () => {
    return (
      <RequestedPartBasicDetailsComponent
        basicDetail={basicDetail as IPartRequestBasicDetail}
        scrollToProposeOfferSection={scrollToProposeOfferSection}
        onPressIgnoreButton={onPressIgnoreButton}
        onPressWishlistButton={onPressWishlistButton}
        isPartAddedInWishlist={isPartAddedInWishlist}
        isPartAddedInIgnoreList={isPartAddedInIgnoreList}
      />
    )
  }

  const renderCompanyDetailComponent = () => {

    return (
      <CompanyDetailComponent
        companyDetail={companyDetail as ICompanyDetail}
      />
    )
  }

  const renderBiddingItem = (bidItemDetail: IBidDetail) => {
    return (
      <BiddingDetailComponent
        biddingDetail={bidItemDetail}
        partRequestStatus={(basicDetail as IPartRequestBasicDetail).partRequestStatus}
        isPostByLoggedInUser={(basicDetail as IPartRequestBasicDetail).isPostByLoggedInUser}
      />
    )
  }

  const renderBiddingListComponent = () => {
    return (
      <View style={styles.biddingItemSeperator}>
        {
          map(biddingList, renderBiddingItem)
        }
      </View>
    )
  }

  const renderProposeOfferForm = () => {
    const { partRequestStatus, isPostByLoggedInUser } = basicDetail as IPartRequestBasicDetail
    if(isPartRequestCancelled(partRequestStatus) || isPartRequestResolved(partRequestStatus) || isPostByLoggedInUser) {
      return null
    }
    return (
      <ProposeOfferFormComponent />
    )
  }

  const renderContentContainer = () => {
    if(isEmpty(basicDetail)) {
      return null
    }
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps={'never'}
      >
        {renderBasicDetailComponent()}
        {renderCompanyDetailComponent()}
        {renderBiddingListComponent()}
        {renderProposeOfferForm()}
      </ScrollView>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent title={HEADER_TITLE}
        showBackBtn
        onPress={onPressBackButton}
      />
      {renderContentContainer()}
    </View>
  )
}