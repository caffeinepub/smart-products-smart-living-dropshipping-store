import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

// Prefab imports
import AccessControl "authorization/access-control";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // === TYPES ===
  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    features : [Text];
    category : Text;
    price : Nat;
    discountedPrice : ?Nat;
    imageUrl : Storage.ExternalBlob;
    rating : Float;
    reviewCount : Nat;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type Cart = {
    items : [CartItem];
    total : Nat;
    discountApplied : Bool;
  };

  public type Review = {
    id : Nat;
    productId : Nat;
    reviewerPrincipal : Principal;
    rating : Nat;
    comment : Text;
    timestamp : Time.Time;
  };

  public type Order = {
    id : Nat;
    ownerPrincipal : Principal;
    items : [CartItem];
    total : Nat;
    timestamp : Time.Time;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    features : [Text];
    category : Text;
    price : Nat;
    discountedPrice : ?Nat;
    imageUrl : Storage.ExternalBlob;
  };

  public type ReviewInput = {
    productId : Nat;
    rating : Nat;
    comment : Text;
  };

  public type ProductUpdate = {
    id : Nat;
    name : Text;
    description : Text;
    features : [Text];
    category : Text;
    price : Nat;
    discountedPrice : ?Nat;
    imageUrl : Storage.ExternalBlob;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type ShoppingItem = Stripe.ShoppingItem;

  // Persistent store name, used in external text fields
  let storeName = "Helping Hand";

  // === STATE ===
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  var nextProductId = 1;
  var nextReviewId = 1;
  var nextOrderId = 1;

  let products = Map.empty<Nat, Product>();
  let reviews = Map.empty<Nat, Review>();
  let orders = Map.empty<Nat, Order>();
  let subscriptions = Map.empty<Text, Bool>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let carts = Map.empty<Principal, [CartItem]>();

  let categories = [
    "Computers",
    "Smartphones",
    "Cameras",
    "Audio & Video",
    "Gaming",
    "Wearables",
    "Home Appliances",
    "Networking",
    "Office Equipment",
    "Drones",
    "3D Printing",
    "VR & AR",
    "Smart Home",
    "Electric Vehicles",
    "E-Readers",
  ];

  // Stripe integration config
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // === UTILS ===
  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  module Product {
    public func compareById(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  // === USER PROFILE ===
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // === PRODUCT MANAGEMENT ===
  public query func getProducts() : async [Product] {
    products.values().toArray().sort(Product.compareById);
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    let filtered = products.values().toArray().filter(
      func(product : Product) : Bool {
        product.category == category;
      }
    );
    filtered.sort(Product.compareById);
  };

  public query func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public query func getCategories() : async [Text] {
    categories;
  };

  public query func isDiscounted(productId : Nat) : async Bool {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product.discountedPrice != null };
    };
  };

  public shared ({ caller }) func addProduct(product : ProductInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let newProduct : Product = {
      id = nextProductId;
      name = product.name;
      description = product.description;
      features = product.features;
      category = product.category;
      price = product.price;
      discountedPrice = product.discountedPrice;
      imageUrl = product.imageUrl;
      rating = 0.0;
      reviewCount = 0;
    };

    products.add(nextProductId, newProduct);
    nextProductId += 1;
  };

  public shared ({ caller }) func updateProduct(product : ProductUpdate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(product.id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?existing) {
        let updatedProduct : Product = {
          id = product.id;
          name = product.name;
          description = product.description;
          features = product.features;
          category = product.category;
          price = product.price;
          discountedPrice = product.discountedPrice;
          imageUrl = product.imageUrl;
          rating = existing.rating;
          reviewCount = existing.reviewCount;
        };
        products.add(product.id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(id);
  };

  // === REVIEW MANAGEMENT ===
  public shared ({ caller }) func addReview(input : ReviewInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };

    switch (products.get(input.productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?existing) {
        let newReview : Review = {
          id = nextReviewId;
          productId = input.productId;
          reviewerPrincipal = caller;
          rating = input.rating;
          comment = input.comment;
          timestamp = Time.now();
        };
        reviews.add(nextReviewId, newReview);
        nextReviewId += 1;

        // Update product rating and reviewCount
        let totalRating = existing.rating * existing.reviewCount.toNat().toFloat() + input.rating.toNat().toFloat();
        let newReviewCount = existing.reviewCount + 1;
        let newRating = totalRating / newReviewCount.toFloat();

        let updatedProduct : Product = {
          id = existing.id;
          name = existing.name;
          description = existing.description;
          features = existing.features;
          category = existing.category;
          price = existing.price;
          discountedPrice = existing.discountedPrice;
          imageUrl = existing.imageUrl;
          rating = newRating;
          reviewCount = newReviewCount;
        };
        products.add(existing.id, updatedProduct);
      };
    };
  };

  public query func getReviewsByProduct(productId : Nat) : async [Review] {
    reviews.values().toArray().filter(
      func(r : Review) : Bool { r.productId == productId }
    ).sort(
      func(r1 : Review, r2 : Review) : Order.Order {
        Nat.compare(r1.id, r2.id);
      }
    );
  };

  // === CART/ORDER MANAGEMENT ===
  public shared ({ caller }) func submitOrder(items : [CartItem]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit orders");
    };

    var total : Nat = 0;
    for (item in items.vals()) {
      switch (products.get(item.productId)) {
        case (null) { Runtime.trap("Product does not exist: " # item.productId.toText()) };
        case (?product) {
          let unitPrice = switch (product.discountedPrice) {
            case (?dp) { dp };
            case (null) { product.price };
          };
          total += unitPrice * item.quantity;
        };
      };
    };

    let newOrder : Order = {
      id = nextOrderId;
      ownerPrincipal = caller;
      items;
      total;
      timestamp = Time.now();
    };

    orders.add(nextOrderId, newOrder);
    nextOrderId += 1;
    newOrder.id;
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their orders");
    };
    orders.values().toArray().filter(
      func(o : Order) : Bool { o.ownerPrincipal == caller }
    ).sort(func(o1 : Order, o2 : Order) : Order.Order {
      Nat.compare(o1.id, o2.id);
    });
  };

  public shared ({ caller }) func getOrCreateCart() : async Cart {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their cart");
    };
    let items = switch (carts.get(caller)) {
      case (null) { [] };
      case (?i) { i };
    };
    var total : Nat = 0;
    for (item in items.vals()) {
      switch (products.get(item.productId)) {
        case (null) {};
        case (?product) {
          let unitPrice = switch (product.discountedPrice) {
            case (?dp) { dp };
            case (null) { product.price };
          };
          total += unitPrice * item.quantity;
        };
      };
    };
    { items; total; discountApplied = false };
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async Cart {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can modify their cart");
    };

    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?_) {};
    };

    let existingItems = switch (carts.get(caller)) {
      case (null) { [] };
      case (?i) { i };
    };

    // Check if product already in cart; if so update quantity
    var found = false;
    let updatedItems = existingItems.map(func(item : CartItem) : CartItem {
      if (item.productId == productId) {
        found := true;
        { productId = item.productId; quantity = item.quantity + quantity };
      } else {
        item;
      };
    });

    let finalItems = if (found) {
      updatedItems;
    } else {
      updatedItems.concat([{ productId; quantity }]);
    };

    carts.add(caller, finalItems);

    var total : Nat = 0;
    for (item in finalItems.vals()) {
      switch (products.get(item.productId)) {
        case (null) {};
        case (?product) {
          let unitPrice = switch (product.discountedPrice) {
            case (?dp) { dp };
            case (null) { product.price };
          };
          total += unitPrice * item.quantity;
        };
      };
    };
    { items = finalItems; total; discountApplied = false };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear their cart");
    };
    carts.remove(caller);
  };

  // === STRIPE INTEGRATION ===
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check session status");
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // === NEWSLETTER SUBSCRIPTION ===
  public shared func subscribe(email : Text) : async () {
    subscriptions.add(email, true);
  };

  public query ({ caller }) func getSubscriptions() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view subscriptions");
    };
    subscriptions.keys().toArray();
  };

  // === MOCK DATA ===
  system func preupgrade() {
    // Pre-load with mock products, reviews, etc if needed
  };

  system func postupgrade() {
    nextProductId := 1;
    nextReviewId := 1;
    nextOrderId := 1;
    products.clear();
    reviews.clear();
    orders.clear();
    subscriptions.clear();
    userProfiles.clear();
    carts.clear();
  };
};
