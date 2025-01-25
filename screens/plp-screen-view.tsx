import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useDebounce} from 'use-debounce';
import {CustomTextInput} from '../components/text-input';
import products from '../data/products.json';
import {isEqual} from 'lodash';
import {ProductTile} from '../components/product-tile';
import {CustomText} from '../components/text';
import {useQuery} from 'react-query';
import {fetchProducts} from '../data/fetch-products';
import {ProductDetailsProps} from './pdp-screen-view';
import {useDispatch} from 'react-redux';
import {setProducts} from '../slice/products-slice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../components/button';
import {CommonActions} from '@react-navigation/native';
import {useUnauthenticatedNavigation} from '../utils/use-navigation';

export const PLPScreenView = (): JSX.Element => {
  // Query the products with a specific delay
  const {data: products, isLoading} = useQuery('products', fetchProducts);
  // Handle search input using debounce logic
  const [searchProductTerm, setSearchProductTerm] = useState<string>('');
  const [debouncedTerm] = useDebounce(searchProductTerm, 500);

  const dispatch = useDispatch();
  const {navigate, dispatch: navigationDispatch} =
    useUnauthenticatedNavigation();

  const [filteredProducts, setFilteredProducts] = useState<
    ProductDetailsProps[] | undefined
  >(products as ProductDetailsProps[]);

  useEffect(() => {
    if (products) {
      // Store in redux
      dispatch(setProducts(products));
      // Find and store the matching products list
      const filteredProductsList = (products as ProductDetailsProps[]).filter(
        (product: ProductDetailsProps) =>
          product.name.toLowerCase().includes(debouncedTerm.toLowerCase()),
      );

      const areProductsEqual = isEqual(filteredProducts, filteredProductsList);
      if (!areProductsEqual) {
        setFilteredProducts(filteredProductsList);
      }
    }
  }, [debouncedTerm, products]);

  const handleSearchTextInput = (text: string) => {
    setSearchProductTerm(text);
  };

  const handleLogout = () => {
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
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <View>
        {isLoading && <ActivityIndicator size={'large'} color={'#000000'} />}
        {!isLoading && (
          <>
            <CustomTextInput
              value={searchProductTerm}
              onChangeText={handleSearchTextInput}
              placeholder="Search for a product..."
              defaultValue=""
              placeholderTextColor="#112222"
            />
            <View style={rules.productsListContainer}>
              {!filteredProducts?.length ? (
                <CustomText
                  text={`No products found while searching for ${debouncedTerm}`}
                />
              ) : (
                <FlatList
                  data={filteredProducts}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  horizontal={false}
                  contentContainerStyle={{paddingBottom: 300}}
                  renderItem={({item}) => {
                    return <ProductTile productDetails={item} />;
                  }}
                  ListFooterComponent={
                    <CustomButton text="Log out" onPress={handleLogout} />
                  }
                />
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

PLPScreenView.whyDidYouRender = true;

const rules = StyleSheet.create({
  productsListContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
