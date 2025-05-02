const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLID,
    GraphQLBoolean
} = require("graphql");

const resolvers = require("./resolvers");

// Define Customer Type
const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

// Define Product Type
const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat }
    }
});

// Define Shipping Details Type
const ShippingDetailsType = new GraphQLObjectType({
    name: "ShippingDetails",
    fields: {
        id: { type: GraphQLID },
        order_id: { type: GraphQLInt },
        status: { type: GraphQLString },
        carrier: { type: GraphQLString },
        tracking_number: { type: GraphQLString }
    }
});

// Define Order Type
const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: {
        id: { type: GraphQLInt },
        customer_id: { type: GraphQLInt },
        product_id: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        total_price: { type: GraphQLFloat },
        shipping_details: {
            type: ShippingDetailsType,
            resolve: async (order) => {
                return resolvers.getShippingDetails(null, { order_id: order.id });
            }
        }
    }
});

// PageInfo for pagination
const PageInfoType = new GraphQLObjectType({
    name: "PageInfo",
    fields: {
        endCursor: { type: GraphQLString },
        hasNextPage: { type: GraphQLNonNull(GraphQLBoolean) }
    }
});

// OrderEdge type for pagination
const OrderEdgeType = new GraphQLObjectType({
    name: "OrderEdge",
    fields: {
        cursor: { type: GraphQLString },
        node: { type: OrderType }
    }
});

// Connection type for paginated response
const OrderConnectionType = new GraphQLObjectType({
    name: "OrderConnection",
    fields: {
        edges: { type: GraphQLList(OrderEdgeType) },
        pageInfo: { type: PageInfoType }
    }
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getOrdersByCustomer: {
            type: new GraphQLList(OrderType),
            args: { customer_id: { type: GraphQLInt } },
            resolve: resolvers.getOrdersByCustomer
        },
        getOrderDetails: {
            type: OrderType,
            args: { order_id: { type: GraphQLInt } },
            resolve: resolvers.getOrderDetails
        },
        getShippingDetails: {
            type: ShippingDetailsType,
            args: { order_id: { type: GraphQLInt } },
            resolve: resolvers.getShippingDetails
        },
        getRecommendations: {
            type: new GraphQLList(ProductType),
            args: { customer_id: { type: GraphQLInt } },
            resolve: resolvers.getRecommendations
        },
        ordersPaginated: {
            type: OrderConnectionType,
            args: {
                customer_id: { type: GraphQLInt },
                first: { type: GraphQLInt },
                after: { type: GraphQLString },
                minPrice: { type: GraphQLFloat },
                sortOrder: { type: GraphQLString }
            },
            resolve: resolvers.getOrdersPaginated
        }
    }
});

// Define Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createOrder: {
            type: OrderType,
            args: {
                customer_id: { type: new GraphQLNonNull(GraphQLInt) },
                product_id: { type: new GraphQLNonNull(GraphQLInt) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                total_price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: resolvers.createOrder
        },
        updateOrder: {
            type: OrderType,
            args: {
                order_id: { type: GraphQLNonNull(GraphQLInt) },
                quantity: { type: GraphQLNonNull(GraphQLInt) },
                total_price: { type: GraphQLNonNull(GraphQLFloat) }
            },
            resolve: resolvers.updateOrder
        },
        deleteOrder: {
            type: GraphQLString,
            args: { order_id: { type: GraphQLNonNull(GraphQLInt) } },
            resolve: resolvers.deleteOrder
        }
    }
});

// Export Schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
