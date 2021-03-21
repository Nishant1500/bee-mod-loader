"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeModParseFailedError = exports.readForgeMod = exports.readForgeModJson = exports.readForgeModAsm = exports.readForgeModToml = exports.readForgeModManifest = void 0;
var system_1 = require("@xmcl/system");
var toml_1 = require("@iarna/toml");
var asm_1 = require("@xmcl/asm");
var ModAnnotationVisitor = /** @class */ (function (_super) {
    __extends(ModAnnotationVisitor, _super);
    function ModAnnotationVisitor(map) {
        var _this = _super.call(this, asm_1.Opcodes.ASM5) || this;
        _this.map = map;
        return _this;
    }
    ModAnnotationVisitor.prototype.visit = function (s, o) {
        if (s === "value") {
            this.map.modid = o;
        }
        else {
            this.map[s] = o;
        }
    };
    return ModAnnotationVisitor;
}(asm_1.AnnotationVisitor));
var DummyModConstructorVisitor = /** @class */ (function (_super) {
    __extends(DummyModConstructorVisitor, _super);
    function DummyModConstructorVisitor(parent, api) {
        var _this = _super.call(this, api) || this;
        _this.parent = parent;
        _this.stack = [];
        return _this;
    }
    DummyModConstructorVisitor.prototype.visitLdcInsn = function (value) {
        this.stack.push(value);
    };
    DummyModConstructorVisitor.prototype.visitFieldInsn = function (opcode, owner, name, desc) {
        if (opcode === asm_1.Opcodes.PUTFIELD) {
            var last = this.stack.pop();
            if (last) {
                if (name === "modId") {
                    this.parent.guess.modid = last;
                }
                else if (name === "version") {
                    this.parent.guess.version = last;
                }
                else if (name === "name") {
                    this.parent.guess.name = last;
                }
                else if (name === "url") {
                    this.parent.guess.url = last;
                }
                else if (name === "parent") {
                    this.parent.guess.parent = last;
                }
                else if (name === "mcversion") {
                    this.parent.guess.mcversion = last;
                }
            }
        }
    };
    return DummyModConstructorVisitor;
}(asm_1.MethodVisitor));
var ModClassVisitor = /** @class */ (function (_super) {
    __extends(ModClassVisitor, _super);
    function ModClassVisitor(result, guess, corePlugin) {
        var _this = _super.call(this, asm_1.Opcodes.ASM5) || this;
        _this.result = result;
        _this.guess = guess;
        _this.corePlugin = corePlugin;
        _this.fields = {};
        _this.className = "";
        _this.isDummyModContainer = false;
        _this.isPluginClass = false;
        return _this;
    }
    ModClassVisitor.prototype.validateType = function (desc) {
        if (desc.indexOf("net/minecraftforge") !== -1) {
            this.result.usedForgePackage = true;
        }
        if (desc.indexOf("net/minecraft") !== -1) {
            this.result.usedMinecraftPackage = true;
        }
        if (desc.indexOf("cpw/mods/fml") !== -1) {
            this.result.usedLegacyFMLPackage = true;
        }
        if (desc.indexOf("net/minecraft/client") !== -1) {
            this.result.usedMinecraftClientPackage = true;
        }
    };
    ModClassVisitor.prototype.visit = function (version, access, name, signature, superName, interfaces) {
        var e_1, _a;
        this.className = name;
        this.isPluginClass = name === this.corePlugin;
        if (superName === "net/minecraftforge/fml/common/DummyModContainer") {
            this.isDummyModContainer = true;
        }
        this.validateType(superName);
        try {
            for (var interfaces_1 = __values(interfaces), interfaces_1_1 = interfaces_1.next(); !interfaces_1_1.done; interfaces_1_1 = interfaces_1.next()) {
                var intef = interfaces_1_1.value;
                this.validateType(intef);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (interfaces_1_1 && !interfaces_1_1.done && (_a = interfaces_1.return)) _a.call(interfaces_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ModClassVisitor.prototype.visitMethod = function (access, name, desc, signature, exceptions) {
        if (this.isDummyModContainer && name === "<init>") {
            return new DummyModConstructorVisitor(this, asm_1.Opcodes.ASM5);
        }
        this.validateType(desc);
        return null;
    };
    ModClassVisitor.prototype.visitField = function (access, name, desc, signature, value) {
        this.fields[name] = value;
        return null;
    };
    ModClassVisitor.prototype.visitAnnotation = function (desc, visible) {
        if (desc === "Lnet/minecraftforge/fml/common/Mod;" || desc === "Lcpw/mods/fml/common/Mod;") {
            var annotationData = {
                modid: "",
                name: "",
                version: "",
                dependencies: "",
                useMetadata: true,
                clientSideOnly: false,
                serverSideOnly: false,
                acceptedMinecraftVersions: "",
                acceptableRemoteVersions: "",
                acceptableSaveVersions: "",
                modLanguage: "java",
                modLanguageAdapter: "",
                value: "",
            };
            this.result.modAnnotations.push(annotationData);
            return new ModAnnotationVisitor(annotationData);
        }
        return null;
    };
    ModClassVisitor.prototype.visitEnd = function () {
        var e_2, _a;
        if (this.className === "Config" && this.fields && this.fields.OF_NAME) {
            this.result.modAnnotations.push({
                modid: this.fields.OF_NAME,
                name: this.fields.OF_NAME,
                mcversion: this.fields.MC_VERSION,
                version: this.fields.OF_EDITION + "_" + this.fields.OF_RELEASE,
                description: "OptiFine is a Minecraft optimization mod. It allows Minecraft to run faster and look better with full support for HD textures and many configuration options.",
                authorList: ["sp614x"],
                url: "https://optifine.net",
                clientSideOnly: true,
                serverSideOnly: false,
                value: "",
                dependencies: "",
                useMetadata: false,
                acceptableRemoteVersions: "",
                acceptableSaveVersions: "",
                acceptedMinecraftVersions: "[" + this.fields.MC_VERSION + "]",
                modLanguage: "java",
                modLanguageAdapter: "",
            });
        }
        try {
            for (var _b = __values(Object.entries(this.fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                switch (k.toUpperCase()) {
                    case "MODID":
                    case "MOD_ID":
                        this.guess.modid = this.guess.modid || v;
                        break;
                    case "MODNAME":
                    case "MOD_NAME":
                        this.guess.name = this.guess.name || v;
                        break;
                    case "VERSION":
                    case "MOD_VERSION":
                        this.guess.version = this.guess.version || v;
                        break;
                    case "MCVERSION":
                        this.guess.mcversion = this.guess.mcversion || v;
                        break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return ModClassVisitor;
}(asm_1.ClassVisitor));
/**
 * Read the mod info from `META-INF/MANIFEST.MF`
 * @returns The manifest directionary
 */
function readForgeModManifest(mod, manifestStore) {
    if (manifestStore === void 0) { manifestStore = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var fs, data, manifest, metadata, file, metadataContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, system_1.resolveFileSystem(mod)];
                case 1:
                    fs = _a.sent();
                    return [4 /*yield*/, fs.existsFile("META-INF/MANIFEST.MF")];
                case 2:
                    if (!(_a.sent())) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, fs.readFile("META-INF/MANIFEST.MF")];
                case 3:
                    data = _a.sent();
                    manifest = data.toString().split("\n")
                        .map(function (l) { return l.trim(); })
                        .filter(function (l) { return l.length > 0; })
                        .map(function (l) { return l.split(":").map(function (s) { return s.trim(); }); })
                        .reduce(function (a, b) {
                        var _a;
                        return (__assign(__assign({}, a), (_a = {}, _a[b[0]] = b[1], _a)));
                    }, {});
                    Object.assign(manifestStore, manifest);
                    metadata = {
                        modid: "",
                        name: "",
                        authors: new Array(),
                        version: "",
                        description: "",
                        url: "",
                    };
                    if (typeof manifest.TweakName === "string") {
                        metadata.modid = manifest.TweakName;
                        metadata.name = manifest.TweakName;
                    }
                    if (typeof manifest.TweakAuthor === "string") {
                        metadata.authors = [manifest.TweakAuthor];
                    }
                    if (typeof manifest.TweakVersion === "string") {
                        metadata.version = manifest.TweakVersion;
                    }
                    if (!manifest.TweakMetaFile) return [3 /*break*/, 6];
                    file = manifest.TweakMetaFile;
                    return [4 /*yield*/, fs.existsFile("META-INF/" + file)];
                case 4:
                    if (!_a.sent()) return [3 /*break*/, 6];
                    return [4 /*yield*/, fs.readFile("META-INF/" + file, "utf-8").then(function (s) { return s.replace(/^\uFEFF/, ""); }).then(JSON.parse)];
                case 5:
                    metadataContent = _a.sent();
                    if (metadataContent.id) {
                        metadata.modid = metadataContent.id;
                    }
                    if (metadataContent.name) {
                        metadata.name = metadataContent.name;
                    }
                    if (metadataContent.version) {
                        metadata.version = metadataContent.version;
                    }
                    if (metadataContent.authors) {
                        metadata.authors = metadataContent.authors;
                    }
                    if (metadataContent.description) {
                        metadata.description = metadataContent.description;
                    }
                    if (metadataContent.url) {
                        metadata.url = metadataContent.url;
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/, metadata];
            }
        });
    });
}
exports.readForgeModManifest = readForgeModManifest;
/**
 * Read mod metadata from new toml metadata file.
 */
function readForgeModToml(mod, manifest) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __awaiter(this, void 0, void 0, function () {
        var fs, existed, all, str, root, _q, _r, mod_1, tomlMod, modObject, all_1, all_1_1, mod_2, dep;
        var e_3, _s, e_4, _t;
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0: return [4 /*yield*/, system_1.resolveFileSystem(mod)];
                case 1:
                    fs = _u.sent();
                    return [4 /*yield*/, fs.existsFile("META-INF/mods.toml")];
                case 2:
                    existed = _u.sent();
                    all = [];
                    if (!existed) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.readFile("META-INF/mods.toml", "utf-8")];
                case 3:
                    str = _u.sent();
                    root = toml_1.parse(str);
                    if (root.mods instanceof Array) {
                        try {
                            for (_q = __values(root.mods), _r = _q.next(); !_r.done; _r = _q.next()) {
                                mod_1 = _r.value;
                                tomlMod = mod_1;
                                modObject = {
                                    modid: (_a = tomlMod.modId) !== null && _a !== void 0 ? _a : "",
                                    authors: (_c = (_b = tomlMod.authors) !== null && _b !== void 0 ? _b : root.authors) !== null && _c !== void 0 ? _c : "",
                                    version: tomlMod.version === "${file.jarVersion}" && typeof (manifest === null || manifest === void 0 ? void 0 : manifest["Implementation-Version"]) === "string"
                                        ? manifest === null || manifest === void 0 ? void 0 : manifest["Implementation-Version"] : tomlMod.version,
                                    displayName: (_d = tomlMod.displayName) !== null && _d !== void 0 ? _d : "",
                                    description: (_e = tomlMod.description) !== null && _e !== void 0 ? _e : "",
                                    displayURL: (_g = (_f = tomlMod.displayURL) !== null && _f !== void 0 ? _f : root.displayURL) !== null && _g !== void 0 ? _g : "",
                                    updateJSONURL: (_j = (_h = tomlMod.updateJSONURL) !== null && _h !== void 0 ? _h : root.updateJSONURL) !== null && _j !== void 0 ? _j : "",
                                    dependencies: [],
                                    logoFile: (_k = tomlMod.logoFile) !== null && _k !== void 0 ? _k : "",
                                    credits: (_l = tomlMod.credits) !== null && _l !== void 0 ? _l : "",
                                    loaderVersion: (_m = root.loaderVersion) !== null && _m !== void 0 ? _m : "",
                                    modLoader: (_o = root.modLoader) !== null && _o !== void 0 ? _o : "",
                                    issueTrackerURL: (_p = root.issueTrackerURL) !== null && _p !== void 0 ? _p : "",
                                };
                                all.push(modObject);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_r && !_r.done && (_s = _q.return)) _s.call(_q);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                    if (typeof root.dependencies === "object") {
                        try {
                            for (all_1 = __values(all), all_1_1 = all_1.next(); !all_1_1.done; all_1_1 = all_1.next()) {
                                mod_2 = all_1_1.value;
                                dep = root.dependencies[mod_2.modid];
                                if (dep) {
                                    mod_2.dependencies = dep;
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (all_1_1 && !all_1_1.done && (_t = all_1.return)) _t.call(all_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                    _u.label = 4;
                case 4: return [2 /*return*/, all];
            }
        });
    });
}
exports.readForgeModToml = readForgeModToml;
/**
 * Use asm to scan all the class files of the mod. This might take long time to read.
 */
function readForgeModAsm(mod, manifest) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (manifest === void 0) { manifest = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var fs, corePluginClass, clazz, _p, result, guessing;
        var _this = this;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0: return [4 /*yield*/, system_1.resolveFileSystem(mod)];
                case 1:
                    fs = _q.sent();
                    if (!manifest) return [3 /*break*/, 5];
                    if (!(typeof manifest.FMLCorePlugin === "string")) return [3 /*break*/, 5];
                    clazz = manifest.FMLCorePlugin.replace(/\./g, "/");
                    return [4 /*yield*/, fs.existsFile(clazz)];
                case 2:
                    _p = (_q.sent());
                    if (_p) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.existsFile("/" + clazz)];
                case 3:
                    _p = (_q.sent());
                    _q.label = 4;
                case 4:
                    if (_p) {
                        corePluginClass = clazz;
                    }
                    _q.label = 5;
                case 5:
                    result = {
                        usedForgePackage: false,
                        usedLegacyFMLPackage: false,
                        usedMinecraftClientPackage: false,
                        usedMinecraftPackage: false,
                        modAnnotations: []
                    };
                    guessing = {};
                    return [4 /*yield*/, fs.walkFiles("/", function (f) { return __awaiter(_this, void 0, void 0, function () {
                            var data, visitor;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!f.endsWith(".class")) {
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, fs.readFile(f)];
                                    case 1:
                                        data = _a.sent();
                                        visitor = new ModClassVisitor(result, guessing, corePluginClass);
                                        new asm_1.ClassReader(data).accept(visitor);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 6:
                    _q.sent();
                    if (result.modAnnotations.length === 0 && guessing.modid && (result.usedForgePackage || result.usedLegacyFMLPackage)) {
                        result.modAnnotations.push({
                            modid: (_a = guessing.modid) !== null && _a !== void 0 ? _a : "",
                            name: (_b = guessing.name) !== null && _b !== void 0 ? _b : "",
                            version: (_c = guessing.version) !== null && _c !== void 0 ? _c : "",
                            dependencies: (_d = guessing.dependencies) !== null && _d !== void 0 ? _d : "",
                            useMetadata: (_e = guessing.useMetadata) !== null && _e !== void 0 ? _e : false,
                            clientSideOnly: (_f = guessing.clientSideOnly) !== null && _f !== void 0 ? _f : false,
                            serverSideOnly: (_g = guessing.serverSideOnly) !== null && _g !== void 0 ? _g : false,
                            acceptedMinecraftVersions: (_h = guessing.acceptedMinecraftVersions) !== null && _h !== void 0 ? _h : "",
                            acceptableRemoteVersions: (_j = guessing.acceptableRemoteVersions) !== null && _j !== void 0 ? _j : "",
                            acceptableSaveVersions: (_k = guessing.acceptableSaveVersions) !== null && _k !== void 0 ? _k : "",
                            modLanguage: (_l = guessing.modLanguage) !== null && _l !== void 0 ? _l : "java",
                            modLanguageAdapter: (_m = guessing.modLanguageAdapter) !== null && _m !== void 0 ? _m : "",
                            value: (_o = guessing.value) !== null && _o !== void 0 ? _o : "",
                        });
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.readForgeModAsm = readForgeModAsm;
/**
 * Read `mcmod.info`, `cccmod.info`, and `neimod.info` json file
 * @param mod The mod path or buffer or opened file system.
 */
function readForgeModJson(mod) {
    return __awaiter(this, void 0, void 0, function () {
        function normalize(json) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            var metadata = {
                modid: "",
                name: "",
                description: "",
                version: "",
                mcversion: "",
                url: "",
                updateUrl: "",
                updateJSON: "",
                authorList: [],
                credits: "",
                logoFile: "",
                screenshots: [],
                parent: "",
                useDependencyInformation: false,
                requiredMods: [],
                dependencies: [],
                dependants: [],
            };
            metadata.modid = (_a = json.modid) !== null && _a !== void 0 ? _a : metadata.modid;
            metadata.name = (_b = json.name) !== null && _b !== void 0 ? _b : metadata.name;
            metadata.description = (_c = json.description) !== null && _c !== void 0 ? _c : metadata.description;
            metadata.version = (_d = json.version) !== null && _d !== void 0 ? _d : metadata.version;
            metadata.mcversion = (_e = json.mcversion) !== null && _e !== void 0 ? _e : metadata.mcversion;
            metadata.url = (_f = json.url) !== null && _f !== void 0 ? _f : metadata.url;
            metadata.updateUrl = (_g = json.updateUrl) !== null && _g !== void 0 ? _g : metadata.updateUrl;
            metadata.updateJSON = (_h = json.updateJSON) !== null && _h !== void 0 ? _h : metadata.updateJSON;
            metadata.authorList = (_j = json.authorList) !== null && _j !== void 0 ? _j : metadata.authorList;
            metadata.credits = (_k = json.credits) !== null && _k !== void 0 ? _k : metadata.credits;
            metadata.logoFile = (_l = json.logoFile) !== null && _l !== void 0 ? _l : metadata.logoFile;
            metadata.screenshots = (_m = json.screenshots) !== null && _m !== void 0 ? _m : metadata.screenshots;
            metadata.parent = (_o = json.parent) !== null && _o !== void 0 ? _o : metadata.parent;
            metadata.useDependencyInformation = (_p = json.useDependencyInformation) !== null && _p !== void 0 ? _p : metadata.useDependencyInformation;
            metadata.requiredMods = (_q = json.requiredMods) !== null && _q !== void 0 ? _q : metadata.requiredMods;
            metadata.dependencies = (_r = json.dependencies) !== null && _r !== void 0 ? _r : metadata.dependencies;
            metadata.dependants = (_s = json.dependants) !== null && _s !== void 0 ? _s : metadata.dependants;
            return metadata;
        }
        function readJsonMetadata(json) {
            var modList = [];
            if (json instanceof Array) {
                modList.push.apply(modList, __spreadArray([], __read(json)));
            }
            else if (json.modList instanceof Array) {
                modList.push.apply(modList, __spreadArray([], __read(json.modList)));
            }
            else if (json.modid) {
                modList.push(json);
            }
            all.push.apply(all, __spreadArray([], __read(modList.map(normalize))));
        }
        var fs, all, json, _a, _b, e_5, text, json, e_6, text, json, e_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, system_1.resolveFileSystem(mod)];
                case 1:
                    fs = _c.sent();
                    all = [];
                    return [4 /*yield*/, fs.existsFile("mcmod.info")];
                case 2:
                    if (!_c.sent()) return [3 /*break*/, 7];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs.readFile("mcmod.info", "utf-8")];
                case 4:
                    json = _b.apply(_a, [(_c.sent()).replace(/^\uFEFF/, "")]);
                    readJsonMetadata(json);
                    return [3 /*break*/, 6];
                case 5:
                    e_5 = _c.sent();
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 18];
                case 7: return [4 /*yield*/, fs.existsFile("cccmod.info")];
                case 8:
                    if (!_c.sent()) return [3 /*break*/, 13];
                    _c.label = 9;
                case 9:
                    _c.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, fs.readFile("cccmod.info", "utf-8")];
                case 10:
                    text = (_c.sent()).replace(/^\uFEFF/, "").replace(/\n\n/g, "\\n").replace(/\n/g, "");
                    json = JSON.parse(text);
                    readJsonMetadata(json);
                    return [3 /*break*/, 12];
                case 11:
                    e_6 = _c.sent();
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 18];
                case 13: return [4 /*yield*/, fs.existsFile("neimod.info")];
                case 14:
                    if (!_c.sent()) return [3 /*break*/, 18];
                    _c.label = 15;
                case 15:
                    _c.trys.push([15, 17, , 18]);
                    return [4 /*yield*/, fs.readFile("neimod.info", "utf-8")];
                case 16:
                    text = (_c.sent()).replace(/^\uFEFF/, "").replace(/\n\n/g, "\\n").replace(/\n/g, "");
                    json = JSON.parse(text);
                    readJsonMetadata(json);
                    return [3 /*break*/, 18];
                case 17:
                    e_7 = _c.sent();
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/, all];
            }
        });
    });
}
exports.readForgeModJson = readForgeModJson;
/**
 * Read metadata of the input mod.
 *
 * This will scan the mcmod.info file, all class file for `@Mod` & coremod `DummyModContainer` class.
 * This will also scan the manifest file on `META-INF/MANIFEST.MF` for tweak mod.
 *
 * If the input is totally not a mod. It will throw {@link NonForgeModFileError}.
 *
 * @throws {@link NonForgeModFileError}
 * @param mod The mod path or data
 * @returns The mod metadata
 */
function readForgeMod(mod) {
    return __awaiter(this, void 0, void 0, function () {
        var fs, jsons, manifest, manifestMetadata, tomls, base, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, system_1.resolveFileSystem(mod)];
                case 1:
                    fs = _a.sent();
                    return [4 /*yield*/, readForgeModJson(fs)];
                case 2:
                    jsons = _a.sent();
                    manifest = {};
                    return [4 /*yield*/, readForgeModManifest(fs, manifest)];
                case 3:
                    manifestMetadata = _a.sent();
                    return [4 /*yield*/, readForgeModToml(fs, manifest)];
                case 4:
                    tomls = _a.sent();
                    return [4 /*yield*/, readForgeModAsm(fs, manifest)];
                case 5:
                    base = _a.sent();
                    if (jsons.length === 0 && (!manifestMetadata || !manifestMetadata.modid) && tomls.length === 0 && base.modAnnotations.length === 0) {
                        throw new ForgeModParseFailedError(mod, base, manifest);
                    }
                    result = __assign({ mcmodInfo: jsons, manifest: manifest, manifestMetadata: (manifestMetadata === null || manifestMetadata === void 0 ? void 0 : manifestMetadata.modid) ? manifestMetadata : undefined, modsToml: tomls }, base);
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.readForgeMod = readForgeMod;
var ForgeModParseFailedError = /** @class */ (function (_super) {
    __extends(ForgeModParseFailedError, _super);
    function ForgeModParseFailedError(mod, asm, manifest) {
        var _this = _super.call(this, "Cannot find the mod metadata in the mod!") || this;
        _this.mod = mod;
        _this.asm = asm;
        _this.manifest = manifest;
        return _this;
    }
    return ForgeModParseFailedError;
}(Error));
exports.ForgeModParseFailedError = ForgeModParseFailedError;
