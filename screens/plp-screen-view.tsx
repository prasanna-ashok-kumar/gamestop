import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {useDebounce} from 'use-debounce';
import {CustomTextInput} from '../components/text-input';
import {isEqual} from 'lodash';
import {ProductTile} from '../components/product-tile';
import {CustomText} from '../components/text';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../components/button';
import {CommonActions} from '@react-navigation/native';
import {useUnauthenticatedNavigation} from '../utils/use-navigation';
import {CustomReducerType} from '../slice/store';
import {ProductDetailsProps} from '../types/types';
import {fetchProducts, ProductsDispatch} from '../slice/products-slice';

const ITEM_HEIGHT = Dimensions.get('screen').height;

export const PLPScreenView = (): JSX.Element => {
  const dispatch = useDispatch<ProductsDispatch>();

  const productsSliceResponse = useSelector(
    (state: CustomReducerType) => state.products,
  );

  const {
    productItems: products,
    productItemsError: productsError,
    productsLoading: isLoading,
  } = productsSliceResponse;

  const isProductsError = !!productsError;

  const [filteredProductsState, setFilteredProductsState] = useState<
    ProductDetailsProps[]
  >([]);

  // Handle search input using debounce logic
  const [searchProductTerm, setSearchProductTerm] = useState<string>('');
  const [debouncedTerm] = useDebounce(searchProductTerm, 500);

  const {dispatch: navigationDispatch} = useUnauthenticatedNavigation();

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (products.length) {
      // Find and store the matching products list
      const filteredProductsList = products.filter(
        (product: ProductDetailsProps) =>
          product.title.toLowerCase().includes(debouncedTerm.toLowerCase()),
      );
      // Update state only when the products are different from previous state
      const areProductsEqual = isEqual(
        filteredProductsState,
        filteredProductsList,
      );
      if (!areProductsEqual) {
        setFilteredProductsState(filteredProductsList);
        console.log('State updated');
      } else {
        console.log("State didn't update");
      }
    }
  }, [debouncedTerm, products]);

  const handleSearchTextInput = (text: string) => {
    setSearchProductTerm(text);
  };

  const handleLogout = useCallback(() => {
    navigationDispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'login-screen',
          },
        ],
      }),
    );
  }, []);

  const renderItem = useCallback(
    (item: ProductDetailsProps) => <ProductTile productDetails={item} />,
    [],
  );

  return (
    <SafeAreaView edges={['bottom']}>
      <View>
        {isLoading && <ActivityIndicator size={'large'} color={'#000000'} />}
        {!isLoading && isProductsError && (
          <CustomText
            text="Error while fetching products, try restarting the app"
            style={rules.errorText}
          />
        )}
        {!isLoading && !isProductsError && (
          <>
            <CustomTextInput
              value={searchProductTerm}
              onChangeText={handleSearchTextInput}
              placeholder="Search for a product..."
              defaultValue=""
              placeholderTextColor="#112222"
              autoFocus
            />
            <View>
              {!filteredProductsState?.length ? (
                <CustomText
                  text={`No products found while searching for ${debouncedTerm}`}
                  style={rules.noProductsFoundText}
                />
              ) : (
                <FlatList
                  data={filteredProductsState}
                  keyExtractor={item => item.id.toString()}
                  numColumns={2}
                  horizontal={false}
                  contentContainerStyle={rules.contentContainerStyle}
                  renderItem={({item}) => renderItem(item)}
                  maxToRenderPerBatch={10}
                  initialNumToRender={5}
                  getItemLayout={(_data, index) => ({
                    length: ITEM_HEIGHT * 0.5,
                    offset: ITEM_HEIGHT * index,
                    index,
                  })}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={rules.columnWrapperStyle}
                  removeClippedSubviews
                />
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

// PLPScreenView.whyDidYouRender = true;

const rules = StyleSheet.create({
  noProductsFoundText: {fontSize: 20},
  contentContainerStyle: {paddingBottom: 300},
  columnWrapperStyle: {justifyContent: 'space-between', marginBottom: 10},
  errorText: {color: '#FF0000'},
});
