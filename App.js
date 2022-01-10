import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import Payze from "@payze/payze-rn";

import Button from "./src/components/Button";
import Input from "./src/components/Input";

const TRANSACTION_ID = "4b20ace7-e569-4122-ba5e-1ec0da9ba25f";

export default function App() {
  const [info, setInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    securityNumber: "",
    billingAddress: "",
  });

  const payMethod = useRef();

  const onCardNumberChange = (cardNumber) => setInfo({ ...info, cardNumber });

  const onCardHolderChange = (cardHolder) => setInfo({ ...info, cardHolder });

  const onExpirationDateChange = (expirationDate) =>
    setInfo({ ...info, expirationDate });

  const onSecurityNumberChange = (securityNumber) =>
    setInfo({ ...info, securityNumber });

  const onBillingAddressChange = (billingAddress) =>
    setInfo({ ...info, billingAddress });

  const setPayMethod = (pay) => (payMethod.current = pay);

  const onSuccess = () => {
    alert("SUCCESS!");
  };

  const onError = (error) => {
    alert(`ERROR! ${error}`);
  };

  const pay = () => {
    if (!payMethod.current) return;

    if (
      !info.cardNumber ||
      !info.cardHolder ||
      !info.expirationDate ||
      !info.securityNumber
    )
      return;

    payMethod.current(
      info.cardNumber,
      info.cardHolder,
      info.expirationDate,
      info.securityNumber,
      TRANSACTION_ID,
      info.billingAddress,
      onSuccess,
      onError
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <View style={styles.middleContainer}>
              <Text style={styles.instructionsLabel}>
                Please input your card details to pay with Payze!
              </Text>

              <Input
                placeholder="Card Number"
                keyboardType="number-pad"
                onChangeText={onCardNumberChange}
              />
              <Input
                placeholder="Card Holder"
                style={styles.cardHolderInput}
                autoCapitalize="characters"
                onChangeText={onCardHolderChange}
              />

              <View style={styles.securityInputsContainer}>
                <Input
                  placeholder="Expires MM/YY"
                  style={styles.expiresInput}
                  onChangeText={onExpirationDateChange}
                />
                <Input
                  placeholder="CVV"
                  style={styles.cvvInput}
                  keyboardType="number-pad"
                  onChangeText={onSecurityNumberChange}
                />
              </View>
              <Input
                placeholder="Billing Address"
                onChangeText={onBillingAddressChange}
              />
            </View>
            <Button title="Pay" style={styles.payButton} onPress={pay} />
          </View>

          <StatusBar style="auto" />

          <Payze setPay={setPayMethod} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardHolderInput: {
    marginVertical: 12,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  cvvInput: {
    flex: 1,
    marginLeft: 12,
  },
  expiresInput: {
    flex: 1,
  },
  instructionsLabel: {
    marginBottom: 24,
    textAlign: "center",
  },

  middleContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 16,
  },
  payButton: {
    width: "auto",
  },
  safeArea: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  scrollViewContainer: {
    height: "100%",
  },
  securityInputsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
});
