import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useDebounce} from 'use-debounce';
import {CustomTextInput} from '../components/text-input';
import products from '../data/products.json';
import {ProductTile} from '../components/product-tile';
import {CustomText} from '../components/text';
import {useQuery} from 'react-query';
import {fetchProducts} from '../data/fetch-products';
import {ProductDetailsProps} from './pdp-screen-view';

export const PLPScreenView = (): JSX.Element => {
  const {data, isLoading} = useQuery('products', fetchProducts);
  const [searchProductTerm, setSearchProductTerm] = useState<string>('');
  const [debouncedTerm] = useDebounce(searchProductTerm, 500);

  const [filteredProducts, setFilteredProducts] = useState<
    ProductDetailsProps[] | undefined
  >(data as ProductDetailsProps[]);

  useEffect(() => {
    if (data) {
      const filteredProductsList = (data as ProductDetailsProps[]).filter(
        (product: ProductDetailsProps) =>
          product.name.toLowerCase().includes(debouncedTerm.toLowerCase()),
      );
      setFilteredProducts(filteredProductsList);
    }
  }, [debouncedTerm, data]);

  const handleSearchTextInput = (text: string) => {
    setSearchProductTerm(text);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
                contentContainerStyle={{marginBottom: 20, flexGrow: 1}}
                renderItem={({item}) => {
                  return <ProductTile productDetails={item} />;
                }}
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const rules = StyleSheet.create({
  productsListContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
