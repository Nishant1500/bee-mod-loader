"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeConfig = void 0;
var ForgeConfig;
(function (ForgeConfig) {
    /**
     * Convert a forge config to string
     */
    function stringify(config) {
        var content = "# Configuration file\n\n\n";
        var propIndent = "    ", arrIndent = "        ";
        Object.keys(config).forEach(function (cat) {
            content += cat + " {\n\n";
            config[cat].properties.forEach(function (prop) {
                var e_1, _a;
                if (prop.comment) {
                    var lines = prop.comment.split("\n");
                    try {
                        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                            var l = lines_1_1.value;
                            content += propIndent + "# " + l + "\n";
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                if (prop.value instanceof Array) {
                    content += "" + propIndent + prop.type + ":" + prop.name + " <\n";
                    prop.value.forEach(function (v) { return content += "" + arrIndent + v + "\n"; });
                    content += propIndent + ">\n";
                }
                else {
                    content += "" + propIndent + prop.type + ":" + prop.name + "=" + prop.value + "\n";
                }
                content += "\n";
            });
            content += "}\n\n";
        });
        return content;
    }
    ForgeConfig.stringify = stringify;
    /**
     * Parse a forge config string into `Config` object
     * @param body The forge config string
     */
    function parse(body) {
        var e_2, _a;
        var lines = body.split("\n").map(function (s) { return s.trim(); })
            .filter(function (s) { return s.length !== 0; });
        var category;
        var pendingCategory;
        var parseVal = function (type, value) {
            var map = {
                I: Number.parseInt,
                D: Number.parseFloat,
                S: function (s) { return s; },
                B: function (s) { return s === "true"; },
            };
            var handler = map[type];
            return handler(value);
        };
        var config = {};
        var inlist = false;
        var comment;
        var last;
        var readProp = function (type, line) {
            line = line.substring(line.indexOf(":") + 1, line.length);
            var pair = line.split("=");
            if (pair.length === 0 || pair.length === 1) {
                var value = void 0;
                var name_1;
                if (line.endsWith(" <")) {
                    value = [];
                    name_1 = line.substring(0, line.length - 2);
                    inlist = true;
                }
                else { }
                if (!category) {
                    throw {
                        type: "CorruptedForgeConfig",
                        reason: "MissingCategory",
                        line: line,
                    };
                }
                config[category].properties.push(last = { name: name_1, type: type, value: value, comment: comment });
            }
            else {
                inlist = false;
                if (!category) {
                    throw {
                        type: "CorruptedForgeConfig",
                        reason: "MissingCategory",
                        line: line,
                    };
                }
                config[category].properties.push({ name: pair[0], value: parseVal(type, pair[1]), type: type, comment: comment });
            }
            comment = undefined;
        };
        try {
            for (var lines_2 = __values(lines), lines_2_1 = lines_2.next(); !lines_2_1.done; lines_2_1 = lines_2.next()) {
                var line = lines_2_1.value;
                if (inlist) {
                    if (!last) {
                        throw {
                            type: "CorruptedForgeConfig",
                            reason: "CorruptedList",
                            line: line,
                        };
                    }
                    if (line === ">") {
                        inlist = false;
                    }
                    else if (line.endsWith(" >")) {
                        last.value.push(parseVal(last.type, line.substring(0, line.length - 2)));
                        inlist = false;
                    }
                    else {
                        last.value.push(parseVal(last.type, line));
                    }
                    continue;
                }
                switch (line.charAt(0)) {
                    case "#":
                        if (!comment) {
                            comment = line.substring(1, line.length).trim();
                        }
                        else {
                            comment = comment.concat("\n", line.substring(1, line.length).trim());
                        }
                        break;
                    case "I":
                    case "D":
                    case "S":
                    case "B":
                        readProp(line.charAt(0), line);
                        break;
                    case "<":
                        break;
                    case "{":
                        if (pendingCategory) {
                            category = pendingCategory;
                            config[category] = { comment: comment, properties: [] };
                            comment = undefined;
                        }
                        else {
                            throw {
                                type: "CorruptedForgeConfig",
                                reason: "MissingCategory",
                                line: line,
                            };
                        }
                        break;
                    case "}":
                        category = undefined;
                        break;
                    default:
                        if (!category) {
                            if (line.endsWith("{")) {
                                category = line.substring(0, line.length - 1).trim();
                                config[category] = { comment: comment, properties: [] };
                                comment = undefined;
                            }
                            else {
                                pendingCategory = line;
                            }
                        }
                        else {
                            throw {
                                type: "CorruptedForgeConfig",
                                reason: "Duplicated",
                                line: line,
                            };
                        }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (lines_2_1 && !lines_2_1.done && (_a = lines_2.return)) _a.call(lines_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return config;
    }
    ForgeConfig.parse = parse;
})(ForgeConfig = exports.ForgeConfig || (exports.ForgeConfig = {}));
