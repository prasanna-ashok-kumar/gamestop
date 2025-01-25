import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z as zod} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {ProductsList} from '../components/products-list';
import {Alert, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomText} from '../components/text';
import {CommonActions} from '@react-navigation/native';
import {CustomTextInput} from '../components/text-input';
import {CustomButton} from '../components/button';
import {useDispatch} from 'react-redux';
import {clearCart} from '../slice/cart-slice';
import {useAuthenticatedNavigation} from '../utils/use-navigation';

const formSchema = zod.object({
  name: zod
    .string()
    .refine(name => !/\d/.test(name), 'Name cannot contain numbers'),
  phone: zod
    .string()
    .refine(phone => /^[0-9]{10}$/.test(phone), 'Invalid phone number'),
  shippingAddress: zod
    .string()
    .refine(
      shippingAddress => shippingAddress.length != 0,
      'Shipping Address is required',
    ),
  creditCardNumber: zod
    .string()
    .refine(
      creditCardNumber => /^\d+$/.test(creditCardNumber),
      'Only numeric values allowed for CC number',
    )
    .refine(
      creditCardNumber => creditCardNumber.length === 16,
      'CC numbers should be 16 digits',
    ),
  cvv: zod
    .string()
    .refine(cvv => /^\d+$/.test(cvv), 'Only numeric values allowed for Cvv')
    .refine(cvv => cvv.length === 3, 'Cvv should be 3 digits'),
  expiryDate: zod.string(),
});

type FormData = zod.infer<typeof formSchema>;

export const CheckoutScreenView = () => {
  const {dispatch: navigationDispatch} = useAuthenticatedNavigation();
  const dispatch = useDispatch();
  const formHandler = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const {
    control,
    trigger,
    formState: {isValid},
  } = formHandler;

  const handleYesAlert = () => {
    // Reset the navigation stack
    navigationDispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'plp-screen',
          },
        ],
      }),
    );
    dispatch(clearCart());
  };

  const handleOrder = () => {
    setTimeout(
      () =>
        Alert.alert('Order placed', 'The order was placed successfully', [
          {
            text: 'Return to Home',
            onPress: handleYesAlert,
          },
        ]),
      400,
    );
  };

  return (
    <>
      <CustomText text={'Items in the cart:'} style={rules.cartText} />
      <ProductsList />
      <ScrollView>
        <Controller
          name={'name'}
          control={control}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            const customOnChangeText = (text: string) => {
              onChange(text);
              trigger('name');
            };
            return (
              <>
                <CustomTextInput
                  value={value}
                  onChangeText={customOnChangeText}
                  placeholder={'Enter your name..'}
                  defaultValue={''}
                  placeholderTextColor="#112222"
                  state={error ? 'error' : undefined}
                />
                {error && (
                  <CustomText
                    text={error.message as string}
                    style={rules.errorText}
                  />
                )}
              </>
            );
          }}
        />

        <Controller
          name={'phone'}
          control={control}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            const customOnChangeText = (text: string) => {
              onChange(text);
              trigger('phone');
            };
            return (
              <>
                <CustomTextInput
                  value={value}
                  onChangeText={customOnChangeText}
                  placeholder={'Enter your phone number..'}
                  defaultValue={''}
                  placeholderTextColor="#112222"
                  state={error ? 'error' : undefined}
                />
                {error && (
                  <CustomText
                    text={error.message as string}
                    style={rules.errorText}
                  />
                )}
              </>
            );
          }}
        />

        <Controller
          name={'shippingAddress'}
          control={control}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            const customOnChangeText = (text: string) => {
              onChange(text);
              trigger('shippingAddress');
            };
            return (
              <>
                <CustomTextInput
                  value={value}
                  onChangeText={customOnChangeText}
                  placeholder={'Enter your shipping address..'}
                  defaultValue={''}
                  placeholderTextColor="#112222"
                  state={error ? 'error' : undefined}
                />
                {error && (
                  <CustomText
                    text={error.message as string}
                    style={rules.errorText}
                  />
                )}
              </>
            );
          }}
        />

        <Controller
          name={'creditCardNumber'}
          control={control}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            const customOnChangeText = (text: string) => {
              onChange(text);
              trigger('creditCardNumber');
            };
            return (
              <>
                <CustomTextInput
                  value={value}
                  onChangeText={customOnChangeText}
                  placeholder={'Enter your CC number..'}
                  defaultValue={''}
                  placeholderTextColor="#112222"
                  state={error ? 'error' : undefined}
                />
                {error && (
                  <CustomText
                    text={error.message as string}
                    style={rules.errorText}
                  />
                )}
              </>
            );
          }}
        />

        <Controller
          name={'cvv'}
          control={control}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            const customOnChangeText = (text: string) => {
              onChange(text);
              trigger('cvv');
            };
            return (
              <>
                <CustomTextInput
                  value={value}
                  onChangeText={customOnChangeText}
                  placeholder={'Enter your Cvv number..'}
                  defaultValue={''}
                  placeholderTextColor="#112222"
                  state={error ? 'error' : undefined}
                />
                {error && (
                  <CustomText
                    text={error.message as string}
                    style={rules.errorText}
                  />
                )}
              </>
            );
          }}
        />

        <Controller
          name={'expiryDate'}
          control={control}
          defaultValue={''}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            const customOnChangeText = (text: string) => {
              onChange(text);
              trigger('expiryDate');
            };
            return (
              <>
                <CustomTextInput
                  value={value}
                  onChangeText={customOnChangeText}
                  placeholder={'Enter your expiry date number..'}
                  defaultValue={''}
                  placeholderTextColor="#112222"
                  state={error ? 'error' : undefined}
                />
                {error && (
                  <CustomText
                    text={error.message as string}
                    style={rules.errorText}
                  />
                )}
              </>
            );
          }}
        />
        <CustomButton
          onPress={handleOrder}
          text={'Place order'}
          enabled={isValid}
        />
      </ScrollView>
    </>
  );
};

const rules = StyleSheet.create({
  cartText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 14,
  },
});
