import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import {View, Text, FlatList, SectionList} from "react-native";

import { Href, Link } from "expo-router";

import {CATEGORIES, MENU} from "@/utils/data/products";
import { useState, useRef } from "react"

import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-store";

export default function Home(){

    const cartStore = useCartStore()

    const cartQuantityItems = cartStore.products.reduce((total, product)=>total + product.quantity,0)
    const [category,setCategory] = useState(CATEGORIES[0]);

    const sectionListRef = useRef<SectionList>(null);

    function handleCategorySelect(selectedCategory: string){
        setCategory(selectedCategory)

        const sectionIndex = CATEGORIES.findIndex((category)=>category=== selectedCategory);

        if (sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }
    return(
        <View className="bg-slate-500 flex-1 pt-2">
           <Header title="faça seu pedido" cartQuantityItems={cartQuantityItems}/>
          
            <FlatList 
               data={CATEGORIES} 
                keyExtractor={(item)=> item}
                renderItem={({item})=> <CategoryButton title={item}
                isSelectd={item === category}
                onPress={()=> handleCategorySelect(item)}/>}
                horizontal
                className="max-h-10 mt-5"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap:12 , paddingHorizontal: 20}}
            />
            <SectionList
            ref={sectionListRef}
            sections={MENU}
            keyExtractor={(item)=> item.id}
            stickySectionHeadersEnabled={false}
            renderItem={({item})=> (<Link href={`/product/${item.id}`} asChild>
                <Product data={item} />
            </Link> ) }
            renderSectionHeader={({section: {title}})=> <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            className="flex-1 p-5"
            />
        </View>
    )
}