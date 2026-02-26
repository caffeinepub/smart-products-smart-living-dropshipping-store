import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Review {
    id: bigint;
    productId: bigint;
    comment: string;
    timestamp: Time;
    reviewerPrincipal: Principal;
    rating: bigint;
}
export interface ProductInput {
    features: Array<string>;
    name: string;
    description: string;
    imageUrl: ExternalBlob;
    category: string;
    price: bigint;
    discountedPrice?: bigint;
}
export interface Product {
    id: bigint;
    features: Array<string>;
    name: string;
    description: string;
    imageUrl: ExternalBlob;
    category: string;
    rating: number;
    price: bigint;
    reviewCount: bigint;
    discountedPrice?: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface ProductUpdate {
    id: bigint;
    features: Array<string>;
    name: string;
    description: string;
    imageUrl: ExternalBlob;
    category: string;
    price: bigint;
    discountedPrice?: bigint;
}
export interface Order {
    id: bigint;
    total: bigint;
    ownerPrincipal: Principal;
    timestamp: Time;
    items: Array<CartItem>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Cart {
    total: bigint;
    discountApplied: boolean;
    items: Array<CartItem>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface ReviewInput {
    productId: bigint;
    comment: string;
    rating: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: ProductInput): Promise<void>;
    addReview(input: ReviewInput): Promise<void>;
    addToCart(productId: bigint, quantity: bigint): Promise<Cart>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteProduct(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<string>>;
    getMyOrders(): Promise<Array<Order>>;
    getOrCreateCart(): Promise<Cart>;
    getProduct(id: bigint): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getReviewsByProduct(productId: bigint): Promise<Array<Review>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getSubscriptions(): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isDiscounted(productId: bigint): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitOrder(items: Array<CartItem>): Promise<bigint>;
    subscribe(email: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateProduct(product: ProductUpdate): Promise<void>;
}
