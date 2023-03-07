"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const bson_1 = require("bson");
const mongoose_1 = __importStar(require("mongoose"));
// Schema
const ProductSchema = new mongoose_1.default.Schema({
    id: {
        type: bson_1.ObjectId,
        required: true,
    },
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
    bardCode: {
        type: String,
    },
    description: {
        type: String,
    },
    Keywords: {
        type: Array,
    },
    createAt: {
        type: Date,
    },
    updateAt: {
        type: Date,
    },
    price: {
        type: Number,
    },
    isActive: {
        type: Boolean,
    },
    category: {
        type: mongoose_1.Schema
    },
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.Product = Product;
