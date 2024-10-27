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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
const fetchCountries_1 = require("./api/fetchCountries");
const RenderAllCountries_1 = __importStar(require("./components/RenderAllCountries"));
const util_1 = require("./helpers/util");
const eventHandlers_1 = require("./components/eventHandlers");
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const countries = yield (0, fetchCountries_1.fetchAllCountries)();
        (0, util_1.applySkeletonLoader)();
        if (countries) {
            setTimeout(() => {
                (0, util_1.setCurrentCountries)(countries);
                RenderAllCountries_1.pageState.currentPage = 1;
                (0, eventHandlers_1.handlePagination)((0, util_1.getCurrentCountries)());
                (0, RenderAllCountries_1.default)((0, util_1.getCurrentCountries)());
            }, 1500);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initialize();
    (0, eventHandlers_1.setupThemeSwitch)();
    (0, eventHandlers_1.handleDropdownClick)();
    (0, eventHandlers_1.handleSearchCountries)();
    (0, eventHandlers_1.filterCountriesByRegion)();
    (0, eventHandlers_1.handleNavigateHome)(initialize);
});
