import { CartProvider } from "@/context/cart-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <CartProvider>
      <Slot />
    </CartProvider>
  );
}