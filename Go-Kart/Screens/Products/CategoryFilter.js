import React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Badge, ListItem } from 'react-native-elements';

const CategoryFilter = (props) => {

    return (
        <ScrollView
            bounces={true}
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            style={{ backgroundColor: "grey" }}>
            <ListItem
                style={{ margin: 0, padding: 0, borderRadius: 0 }}
            >
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActive(-1)
                    }}>
                    <Badge
                        badgeStyle={[styles.center, { margin: 5 }, props.active == -1
                            ? styles.active : styles.inactive]}
                        value={<Text style={{ color: 'white', fontSize: 20 }}>All</Text>}>
                    </Badge>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        onPress={() => {
                            props.categoryFilter(item._id),
                                props.setActive(props.categories.indexOf(item))
                        }}>
                        <Badge
                            badgeStyle={[styles.center, { margin: 5 },
                            props.active == props.categories.indexOf(item)
                                ? styles.active
                                : styles.inactive]}
                            value={<Text style={{ color: 'white', fontSize: 16 }}>{item.name}</Text>}>
                        </Badge>
                    </TouchableOpacity>
                ))}
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: 'red'
    },
    inactive: {
        backgroundColor: 'blue'
    }
})


export default CategoryFilter;