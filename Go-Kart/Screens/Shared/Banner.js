import React, {useEffect, useState} from 'react'
import {Image, StyleSheet,Dimensions, View, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper/src';

var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([])

    useEffect(() => {
        setBannerData([
        "https://media.wired.com/photos/5c916cb3c2c1db37be68483a/191:100/w_1280,c_limit/Gear_OculusRiftS_1.jpg",
        "https://images2.minutemediacdn.com/image/upload/c_crop,w_2071,h_1164,x_0,y_193/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01g8eqh7x3frj93nqfh2.jpg",
        "https://cdn.akamai.steamstatic.com/steam/apps/1332010/header.jpg",
        "https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1660025387.webp"])
    

    return () => {
        setBannerData([])
    }
    }, [])

    return(
        <ScrollView>
            <View style = {styles.container}>
            <View style = {styles.swiper}>
                <Swiper
                
                style={{height: width / 2}}
                showButtons={false}
                autoplay={true}
                autoplayTimeout={3}>
                    {bannerData.map((item) => {
                        return(
                            <Image
                                key={item}
                                style={styles.imageBanner}
                                resizeMode="contain"
                                source={{uri: item}}/>
                        );
                    })}
                </Swiper>
                <View style = {{height: 20}}></View>
            </View>
        </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width -40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;
