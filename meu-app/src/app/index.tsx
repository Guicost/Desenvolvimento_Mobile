
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ProductProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ResponseProps = {
  products: ProductProps[];
};

export default function App() {
  const [data, setData] = useState<ProductProps[]>([]);

  const { addToCart, items, removeFromCart, totalCart, totalItems } =
    useCart();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((response: ResponseProps) => {
        setData(response.products);
      })
      .catch((error) => {
        console.log("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Produtos</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const cartItem = items.find((prod) => prod.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <View style={styles.card}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.productTitle}>{item.title}</Text>

                  <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </Text>

                  <Text style={styles.price}>
                    {item.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.btnAction}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Text style={styles.btnText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                      style={styles.btnAction}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  image: {
    width: 105,
    height: 105,
    borderRadius: 12,
    backgroundColor: "#f1f1f1",
  },

  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },

  productTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
    color: "#6b7280",
    marginBottom: 6,
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16a34a",
    marginBottom: 8,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  btnAction: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
  },

  quantityText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginHorizontal: 16,
  },
});
