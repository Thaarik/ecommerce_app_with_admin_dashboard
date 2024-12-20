import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import ProductListItem from "../../components/product-list-Item";
import { getCategoryAndProduct } from "../../api/api";

const Category = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>(); // to get the acces of the [slug]
  // if the slug value is found in category then continue or redirect to 404
  const { data, error, isLoading } = getCategoryAndProduct(slug);

  if (isLoading) return <ActivityIndicator />;

  if (error || !data) return <Text>Error: {error?.message}</Text>;

  if (!data.category || !data.products) return <Redirect href="/404" />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: data.category.name }} />
      <Image
        source={{ uri: data.category.imageUrl }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryName}>{data.category.name}</Text>
      <FlatList
        data={data.products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  categoryImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productsList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
