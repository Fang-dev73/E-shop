import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Text, LogBox, FlatList } from 'react-native';
import { Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import baseURL from '../../assets/Urls/baseUrl';

LogBox.ignoreAllLogs(true);

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setFocus(false);
    setActive(-1);

    axios.get(`${baseURL}/products`)
      .then((res) => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setProductsCtg(res.data);
        setInitialState(res.data);
      })

    axios.get(`${baseURL}/categories`)
      .then((res) => {
        setCategories(res.data);
      })


    return () => {
      setProducts([])
      setProductsFiltered([])
      setFocus()
      setCategories([])
      setActive()
      setInitialState()
    }
  }, [])

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories
  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [setProductsCtg(products.filter((i) => i.category._id === ctg), setActive(true))]
    }
  }

  return (
    <ScrollView>
      <Header>
          <Icon name="search"
            size={30}
          />
          <Input
            placeholder="Search"
            backgroundColor='white'
            placeholderTextColor={'black'}
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="times" size={30} /> : null}
        </Header>
      {focus == true ? (
        <SearchedProduct
          navigation={props.navigation}
          productsFiltered={productsFiltered} />
      ) : (
        <View>
          <Banner />
          <CategoryFilter
            categories={categories}
            categoryFilter={changeCtg}
            productsCtg={productsCtg}
            active={active}
            setActive={setActive}
          />
          {productsCtg.length > 0 ? (
            <View style={styles.listContainer}>
              {productsCtg.map((item) => {
                return (
                  <ProductList
                    navigation={props.navigation}
                    key={item._id}
                    item={item}
                  />
                )
              })}
            </View>
          ) : (
            <View style={[styles.center, { height: height / 2 }]}>
              <Text style={{ fontSize: 20 }}>No products found  :(</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductContainer;