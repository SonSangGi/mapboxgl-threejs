!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).turf = {})
}(this, (function (t) {
    "use strict";
    var e = 6371008.8, n = {
        centimeters: 637100880,
        centimetres: 637100880,
        degrees: 57.22891354143274,
        feet: 20902260.511392,
        inches: 39.37 * e,
        kilometers: 6371.0088,
        kilometres: 6371.0088,
        meters: e,
        metres: e,
        miles: 3958.761333810546,
        millimeters: 6371008800,
        millimetres: 6371008800,
        nauticalmiles: e / 1852,
        radians: 1,
        yards: 5825721.287490856
    }, r = {
        centimeters: 100,
        centimetres: 100,
        degrees: 1 / 111325,
        feet: 3.28084,
        inches: 39.37,
        kilometers: .001,
        kilometres: .001,
        meters: 1,
        metres: 1,
        miles: 1 / 1609.344,
        millimeters: 1e3,
        millimetres: 1e3,
        nauticalmiles: 1 / 1852,
        radians: 1 / e,
        yards: 1 / 1.0936
    }, i = {
        acres: 247105e-9,
        centimeters: 1e4,
        centimetres: 1e4,
        feet: 10.763910417,
        hectares: 1e-4,
        inches: 1550.003100006,
        kilometers: 1e-6,
        kilometres: 1e-6,
        meters: 1,
        metres: 1,
        miles: 386e-9,
        millimeters: 1e6,
        millimetres: 1e6,
        yards: 1.195990046
    };

    function o(t, e, n) {
        void 0 === n && (n = {});
        var r = {type: "Feature"};
        return (0 === n.id || n.id) && (r.id = n.id), n.bbox && (r.bbox = n.bbox), r.properties = e || {}, r.geometry = t, r
    }

    function s(t, e, n) {
        switch (t) {
            case"Point":
                return a(e).geometry;
            case"LineString":
                return h(e).geometry;
            case"Polygon":
                return l(e).geometry;
            case"MultiPoint":
                return d(e).geometry;
            case"MultiLineString":
                return g(e).geometry;
            case"MultiPolygon":
                return y(e).geometry;
            default:
                throw new Error(t + " is invalid")
        }
    }

    function a(t, e, n) {
        if (void 0 === n && (n = {}), !t) throw new Error("coordinates is required");
        if (!Array.isArray(t)) throw new Error("coordinates must be an Array");
        if (t.length < 2) throw new Error("coordinates must be at least 2 numbers long");
        if (!C(t[0]) || !C(t[1])) throw new Error("coordinates must contain numbers");
        return o({type: "Point", coordinates: t}, e, n)
    }

    function u(t, e, n) {
        return void 0 === n && (n = {}), f(t.map((function (t) {
            return a(t, e)
        })), n)
    }

    function l(t, e, n) {
        void 0 === n && (n = {});
        for (var r = 0, i = t; r < i.length; r++) {
            var s = i[r];
            if (s.length < 4) throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
            for (var a = 0; a < s[s.length - 1].length; a++) if (s[s.length - 1][a] !== s[0][a]) throw new Error("First and last Position are not equivalent.")
        }
        return o({type: "Polygon", coordinates: t}, e, n)
    }

    function c(t, e, n) {
        return void 0 === n && (n = {}), f(t.map((function (t) {
            return l(t, e)
        })), n)
    }

    function h(t, e, n) {
        if (void 0 === n && (n = {}), t.length < 2) throw new Error("coordinates must be an array of two or more positions");
        return o({type: "LineString", coordinates: t}, e, n)
    }

    function p(t, e, n) {
        return void 0 === n && (n = {}), f(t.map((function (t) {
            return h(t, e)
        })), n)
    }

    function f(t, e) {
        void 0 === e && (e = {});
        var n = {type: "FeatureCollection"};
        return e.id && (n.id = e.id), e.bbox && (n.bbox = e.bbox), n.features = t, n
    }

    function g(t, e, n) {
        return void 0 === n && (n = {}), o({type: "MultiLineString", coordinates: t}, e, n)
    }

    function d(t, e, n) {
        return void 0 === n && (n = {}), o({type: "MultiPoint", coordinates: t}, e, n)
    }

    function y(t, e, n) {
        return void 0 === n && (n = {}), o({type: "MultiPolygon", coordinates: t}, e, n)
    }

    function v(t, e, n) {
        return void 0 === n && (n = {}), o({type: "GeometryCollection", geometries: t}, e, n)
    }

    function _(t, e) {
        if (void 0 === e && (e = 0), e && !(e >= 0)) throw new Error("precision must be a positive number");
        var n = Math.pow(10, e || 0);
        return Math.round(t * n) / n
    }

    function m(t, e) {
        void 0 === e && (e = "kilometers");
        var r = n[e];
        if (!r) throw new Error(e + " units is invalid");
        return t * r
    }

    function x(t, e) {
        void 0 === e && (e = "kilometers");
        var r = n[e];
        if (!r) throw new Error(e + " units is invalid");
        return t / r
    }

    function E(t, e) {
        return w(x(t, e))
    }

    function b(t) {
        var e = t % 360;
        return e < 0 && (e += 360), e
    }

    function w(t) {
        return 180 * (t % (2 * Math.PI)) / Math.PI
    }

    function I(t) {
        return t % 360 * Math.PI / 180
    }

    function N(t, e, n) {
        if (void 0 === e && (e = "kilometers"), void 0 === n && (n = "kilometers"), !(t >= 0)) throw new Error("length must be a positive number");
        return m(x(t, e), n)
    }

    function S(t, e, n) {
        if (void 0 === e && (e = "meters"), void 0 === n && (n = "kilometers"), !(t >= 0)) throw new Error("area must be a positive number");
        var r = i[e];
        if (!r) throw new Error("invalid original units");
        var o = i[n];
        if (!o) throw new Error("invalid final units");
        return t / r * o
    }

    function C(t) {
        return !isNaN(t) && null !== t && !Array.isArray(t)
    }

    function P(t) {
        return !!t && t.constructor === Object
    }

    function L(t) {
        if (!t) throw new Error("bbox is required");
        if (!Array.isArray(t)) throw new Error("bbox must be an Array");
        if (4 !== t.length && 6 !== t.length) throw new Error("bbox must be an Array of 4 or 6 numbers");
        t.forEach((function (t) {
            if (!C(t)) throw new Error("bbox must only contain numbers")
        }))
    }

    function M(t) {
        if (!t) throw new Error("id is required");
        if (-1 === ["string", "number"].indexOf(typeof t)) throw new Error("id must be a number or a string")
    }

    var O = Object.freeze({
        __proto__: null,
        earthRadius: e,
        factors: n,
        unitsFactors: r,
        areaFactors: i,
        feature: o,
        geometry: s,
        point: a,
        points: u,
        polygon: l,
        polygons: c,
        lineString: h,
        lineStrings: p,
        featureCollection: f,
        multiLineString: g,
        multiPoint: d,
        multiPolygon: y,
        geometryCollection: v,
        round: _,
        radiansToLength: m,
        lengthToRadians: x,
        lengthToDegrees: E,
        bearingToAzimuth: b,
        radiansToDegrees: w,
        degreesToRadians: I,
        convertLength: N,
        convertArea: S,
        isNumber: C,
        isObject: P,
        validateBBox: L,
        validateId: M
    });

    function R(t) {
        if (!t) throw new Error("coord is required");
        if (!Array.isArray(t)) {
            if ("Feature" === t.type && null !== t.geometry && "Point" === t.geometry.type) return t.geometry.coordinates;
            if ("Point" === t.type) return t.coordinates
        }
        if (Array.isArray(t) && t.length >= 2 && !Array.isArray(t[0]) && !Array.isArray(t[1])) return t;
        throw new Error("coord must be GeoJSON Point or an Array of numbers")
    }

    function T(t) {
        if (Array.isArray(t)) return t;
        if ("Feature" === t.type) {
            if (null !== t.geometry) return t.geometry.coordinates
        } else if (t.coordinates) return t.coordinates;
        throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array")
    }

    function A(t) {
        if (t.length > 1 && C(t[0]) && C(t[1])) return !0;
        if (Array.isArray(t[0]) && t[0].length) return A(t[0]);
        throw new Error("coordinates must only contain numbers")
    }

    function D(t, e, n) {
        if (!e || !n) throw new Error("type and name required");
        if (!t || t.type !== e) throw new Error("Invalid input to " + n + ": must be a " + e + ", given " + t.type)
    }

    function F(t, e, n) {
        if (!t) throw new Error("No feature passed");
        if (!n) throw new Error(".featureOf() requires a name");
        if (!t || "Feature" !== t.type || !t.geometry) throw new Error("Invalid input to " + n + ", Feature with geometry required");
        if (!t.geometry || t.geometry.type !== e) throw new Error("Invalid input to " + n + ": must be a " + e + ", given " + t.geometry.type)
    }

    function k(t, e, n) {
        if (!t) throw new Error("No featureCollection passed");
        if (!n) throw new Error(".collectionOf() requires a name");
        if (!t || "FeatureCollection" !== t.type) throw new Error("Invalid input to " + n + ", FeatureCollection required");
        for (var r = 0, i = t.features; r < i.length; r++) {
            var o = i[r];
            if (!o || "Feature" !== o.type || !o.geometry) throw new Error("Invalid input to " + n + ", Feature with geometry required");
            if (!o.geometry || o.geometry.type !== e) throw new Error("Invalid input to " + n + ": must be a " + e + ", given " + o.geometry.type)
        }
    }

    function G(t) {
        return "Feature" === t.type ? t.geometry : t
    }

    function q(t, e) {
        return "FeatureCollection" === t.type ? "FeatureCollection" : "GeometryCollection" === t.type ? "GeometryCollection" : "Feature" === t.type && null !== t.geometry ? t.geometry.type : t.type
    }

    var B = Object.freeze({
        __proto__: null,
        getCoord: R,
        getCoords: T,
        containsNumber: A,
        geojsonType: D,
        featureOf: F,
        collectionOf: k,
        getGeom: G,
        getType: q
    });

    function z(t, e, n) {
        if (null !== t) for (var r, i, o, s, a, u, l, c, h = 0, p = 0, f = t.type, g = "FeatureCollection" === f, d = "Feature" === f, y = g ? t.features.length : 1, v = 0; v < y; v++) {
            a = (c = !!(l = g ? t.features[v].geometry : d ? t.geometry : t) && "GeometryCollection" === l.type) ? l.geometries.length : 1;
            for (var _ = 0; _ < a; _++) {
                var m = 0, x = 0;
                if (null !== (s = c ? l.geometries[_] : l)) {
                    u = s.coordinates;
                    var E = s.type;
                    switch (h = !n || "Polygon" !== E && "MultiPolygon" !== E ? 0 : 1, E) {
                        case null:
                            break;
                        case"Point":
                            if (!1 === e(u, p, v, m, x)) return !1;
                            p++, m++;
                            break;
                        case"LineString":
                        case"MultiPoint":
                            for (r = 0; r < u.length; r++) {
                                if (!1 === e(u[r], p, v, m, x)) return !1;
                                p++, "MultiPoint" === E && m++
                            }
                            "LineString" === E && m++;
                            break;
                        case"Polygon":
                        case"MultiLineString":
                            for (r = 0; r < u.length; r++) {
                                for (i = 0; i < u[r].length - h; i++) {
                                    if (!1 === e(u[r][i], p, v, m, x)) return !1;
                                    p++
                                }
                                "MultiLineString" === E && m++, "Polygon" === E && x++
                            }
                            "Polygon" === E && m++;
                            break;
                        case"MultiPolygon":
                            for (r = 0; r < u.length; r++) {
                                for (x = 0, i = 0; i < u[r].length; i++) {
                                    for (o = 0; o < u[r][i].length - h; o++) {
                                        if (!1 === e(u[r][i][o], p, v, m, x)) return !1;
                                        p++
                                    }
                                    x++
                                }
                                m++
                            }
                            break;
                        case"GeometryCollection":
                            for (r = 0; r < s.geometries.length; r++) if (!1 === z(s.geometries[r], e, n)) return !1;
                            break;
                        default:
                            throw new Error("Unknown Geometry Type")
                    }
                }
            }
        }
    }

    function j(t, e, n, r) {
        var i = n;
        return z(t, (function (t, r, o, s, a) {
            i = 0 === r && void 0 === n ? t : e(i, t, r, o, s, a)
        }), r), i
    }

    function U(t, e) {
        var n;
        switch (t.type) {
            case"FeatureCollection":
                for (n = 0; n < t.features.length && !1 !== e(t.features[n].properties, n); n++) ;
                break;
            case"Feature":
                e(t.properties, 0)
        }
    }

    function V(t, e, n) {
        var r = n;
        return U(t, (function (t, i) {
            r = 0 === i && void 0 === n ? t : e(r, t, i)
        })), r
    }

    function X(t, e) {
        if ("Feature" === t.type) e(t, 0); else if ("FeatureCollection" === t.type) for (var n = 0; n < t.features.length && !1 !== e(t.features[n], n); n++) ;
    }

    function Y(t, e, n) {
        var r = n;
        return X(t, (function (t, i) {
            r = 0 === i && void 0 === n ? t : e(r, t, i)
        })), r
    }

    function H(t) {
        var e = [];
        return z(t, (function (t) {
            e.push(t)
        })), e
    }

    function W(t, e) {
        var n, r, i, o, s, a, u, l, c, h, p = 0, f = "FeatureCollection" === t.type, g = "Feature" === t.type,
            d = f ? t.features.length : 1;
        for (n = 0; n < d; n++) {
            for (a = f ? t.features[n].geometry : g ? t.geometry : t, l = f ? t.features[n].properties : g ? t.properties : {}, c = f ? t.features[n].bbox : g ? t.bbox : void 0, h = f ? t.features[n].id : g ? t.id : void 0, s = (u = !!a && "GeometryCollection" === a.type) ? a.geometries.length : 1, i = 0; i < s; i++) if (null !== (o = u ? a.geometries[i] : a)) switch (o.type) {
                case"Point":
                case"LineString":
                case"MultiPoint":
                case"Polygon":
                case"MultiLineString":
                case"MultiPolygon":
                    if (!1 === e(o, p, l, c, h)) return !1;
                    break;
                case"GeometryCollection":
                    for (r = 0; r < o.geometries.length; r++) if (!1 === e(o.geometries[r], p, l, c, h)) return !1;
                    break;
                default:
                    throw new Error("Unknown Geometry Type")
            } else if (!1 === e(null, p, l, c, h)) return !1;
            p++
        }
    }

    function J(t, e, n) {
        var r = n;
        return W(t, (function (t, i, o, s, a) {
            r = 0 === i && void 0 === n ? t : e(r, t, i, o, s, a)
        })), r
    }

    function Z(t, e) {
        W(t, (function (t, n, r, i, s) {
            var a, u = null === t ? null : t.type;
            switch (u) {
                case null:
                case"Point":
                case"LineString":
                case"Polygon":
                    return !1 !== e(o(t, r, {bbox: i, id: s}), n, 0) && void 0
            }
            switch (u) {
                case"MultiPoint":
                    a = "Point";
                    break;
                case"MultiLineString":
                    a = "LineString";
                    break;
                case"MultiPolygon":
                    a = "Polygon"
            }
            for (var l = 0; l < t.coordinates.length; l++) {
                var c = t.coordinates[l];
                if (!1 === e(o({type: a, coordinates: c}, r), n, l)) return !1
            }
        }))
    }

    function K(t, e, n) {
        var r = n;
        return Z(t, (function (t, i, o) {
            r = 0 === i && 0 === o && void 0 === n ? t : e(r, t, i, o)
        })), r
    }

    function Q(t, e) {
        Z(t, (function (t, n, r) {
            var i = 0;
            if (t.geometry) {
                var o = t.geometry.type;
                if ("Point" !== o && "MultiPoint" !== o) {
                    var s, a = 0, u = 0, l = 0;
                    return !1 !== z(t, (function (o, c, p, f, g) {
                        if (void 0 === s || n > a || f > u || g > l) return s = o, a = n, u = f, l = g, void (i = 0);
                        var d = h([s, o], t.properties);
                        if (!1 === e(d, n, r, g, i)) return !1;
                        i++, s = o
                    })) && void 0
                }
            }
        }))
    }

    function $(t, e, n) {
        var r = n, i = !1;
        return Q(t, (function (t, o, s, a, u) {
            r = !1 === i && void 0 === n ? t : e(r, t, o, s, a, u), i = !0
        })), r
    }

    function tt(t, e) {
        if (!t) throw new Error("geojson is required");
        Z(t, (function (t, n, r) {
            if (null !== t.geometry) {
                var i = t.geometry.type, o = t.geometry.coordinates;
                switch (i) {
                    case"LineString":
                        if (!1 === e(t, n, r, 0, 0)) return !1;
                        break;
                    case"Polygon":
                        for (var s = 0; s < o.length; s++) if (!1 === e(h(o[s], t.properties), n, r, s)) return !1
                }
            }
        }))
    }

    function et(t, e, n) {
        var r = n;
        return tt(t, (function (t, i, o, s) {
            r = 0 === i && void 0 === n ? t : e(r, t, i, o, s)
        })), r
    }

    function nt(t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n, r = e.featureIndex || 0, i = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, s = e.segmentIndex || 0,
            a = e.properties;
        switch (t.type) {
            case"FeatureCollection":
                r < 0 && (r = t.features.length + r), a = a || t.features[r].properties, n = t.features[r].geometry;
                break;
            case"Feature":
                a = a || t.properties, n = t.geometry;
                break;
            case"Point":
            case"MultiPoint":
                return null;
            case"LineString":
            case"Polygon":
            case"MultiLineString":
            case"MultiPolygon":
                n = t;
                break;
            default:
                throw new Error("geojson is invalid")
        }
        if (null === n) return null;
        var u = n.coordinates;
        switch (n.type) {
            case"Point":
            case"MultiPoint":
                return null;
            case"LineString":
                return s < 0 && (s = u.length + s - 1), h([u[s], u[s + 1]], a, e);
            case"Polygon":
                return o < 0 && (o = u.length + o), s < 0 && (s = u[o].length + s - 1), h([u[o][s], u[o][s + 1]], a, e);
            case"MultiLineString":
                return i < 0 && (i = u.length + i), s < 0 && (s = u[i].length + s - 1), h([u[i][s], u[i][s + 1]], a, e);
            case"MultiPolygon":
                return i < 0 && (i = u.length + i), o < 0 && (o = u[i].length + o), s < 0 && (s = u[i][o].length - s - 1), h([u[i][o][s], u[i][o][s + 1]], a, e)
        }
        throw new Error("geojson is invalid")
    }

    function rt(t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n, r = e.featureIndex || 0, i = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, s = e.coordIndex || 0,
            u = e.properties;
        switch (t.type) {
            case"FeatureCollection":
                r < 0 && (r = t.features.length + r), u = u || t.features[r].properties, n = t.features[r].geometry;
                break;
            case"Feature":
                u = u || t.properties, n = t.geometry;
                break;
            case"Point":
            case"MultiPoint":
                return null;
            case"LineString":
            case"Polygon":
            case"MultiLineString":
            case"MultiPolygon":
                n = t;
                break;
            default:
                throw new Error("geojson is invalid")
        }
        if (null === n) return null;
        var l = n.coordinates;
        switch (n.type) {
            case"Point":
                return a(l, u, e);
            case"MultiPoint":
                return i < 0 && (i = l.length + i), a(l[i], u, e);
            case"LineString":
                return s < 0 && (s = l.length + s), a(l[s], u, e);
            case"Polygon":
                return o < 0 && (o = l.length + o), s < 0 && (s = l[o].length + s), a(l[o][s], u, e);
            case"MultiLineString":
                return i < 0 && (i = l.length + i), s < 0 && (s = l[i].length + s), a(l[i][s], u, e);
            case"MultiPolygon":
                return i < 0 && (i = l.length + i), o < 0 && (o = l[i].length + o), s < 0 && (s = l[i][o].length - s), a(l[i][o][s], u, e)
        }
        throw new Error("geojson is invalid")
    }

    var it = Object.freeze({
        __proto__: null,
        coordEach: z,
        coordReduce: j,
        propEach: U,
        propReduce: V,
        featureEach: X,
        featureReduce: Y,
        coordAll: H,
        geomEach: W,
        geomReduce: J,
        flattenEach: Z,
        flattenReduce: K,
        segmentEach: Q,
        segmentReduce: $,
        lineEach: tt,
        lineReduce: et,
        findSegment: nt,
        findPoint: rt
    });

    function ot(t) {
        var e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
        return z(t, (function (t) {
            e[0] > t[0] && (e[0] = t[0]), e[1] > t[1] && (e[1] = t[1]), e[2] < t[0] && (e[2] = t[0]), e[3] < t[1] && (e[3] = t[1])
        })), e
    }

    ot.default = ot;
    /*
        object-assign
        (c) Sindre Sorhus
        @license MIT
        */
    var st = Object.getOwnPropertySymbols, at = Object.prototype.hasOwnProperty,
        ut = Object.prototype.propertyIsEnumerable;

    function lt(t) {
        if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(t)
    }

    var ct = function () {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
            for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map((function (t) {
                return e[t]
            })).join("")) return !1;
            var r = {};
            return "abcdefghijklmnopqrst".split("").forEach((function (t) {
                r[t] = t
            })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        } catch (t) {
            return !1
        }
    }() ? Object.assign : function (t, e) {
        for (var n, r, i = lt(t), o = 1; o < arguments.length; o++) {
            for (var s in n = Object(arguments[o])) at.call(n, s) && (i[s] = n[s]);
            if (st) {
                r = st(n);
                for (var a = 0; a < r.length; a++) ut.call(n, r[a]) && (i[r[a]] = n[r[a]])
            }
        }
        return i
    }, ht = {successCallback: null, verbose: !1}, pt = {};

    /**
     * @license GNU Affero General Public License.
     * Copyright (c) 2015, 2015 Ronny Lorenz <ronny@tbi.univie.ac.at>
     * v. 1.2.0
     * https://github.com/RaumZeit/MarchingSquares.js
     *
     * MarchingSquaresJS is free software: you can redistribute it and/or modify
     * it under the terms of the GNU Affero General Public License as published by
     * the Free Software Foundation, either version 3 of the License, or
     * (at your option) any later version.
     *
     * MarchingSquaresJS is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * As additional permission under GNU Affero General Public License version 3
     * section 7, third-party projects (personal or commercial) may distribute,
     * include, or link against UNMODIFIED VERSIONS of MarchingSquaresJS without the
     * requirement that said third-party project for that reason alone becomes
     * subject to any requirement of the GNU Affero General Public License version 3.
     * Any modifications to MarchingSquaresJS, however, must be shared with the public
     * and made available.
     *
     * In summary this:
     * - allows you to use MarchingSquaresJS at no cost
     * - allows you to use MarchingSquaresJS for both personal and commercial purposes
     * - allows you to distribute UNMODIFIED VERSIONS of MarchingSquaresJS under any
     *   license as long as this license notice is included
     * - enables you to keep the source code of your program that uses MarchingSquaresJS
     *   undisclosed
     * - forces you to share any modifications you have made to MarchingSquaresJS,
     *   e.g. bug-fixes
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with MarchingSquaresJS.  If not, see <http://www.gnu.org/licenses/>.
     */function ft(t, e, n) {
        n = n || {};
        for (var r = Object.keys(ht), i = 0; i < r.length; i++) {
            var o = r[i], s = n[o];
            s = null != s ? s : ht[o], pt[o] = s
        }
        pt.verbose && console.log("MarchingSquaresJS-isoContours: computing isocontour for " + e);
        var a = function (t) {
            var e = [], n = 0, r = 1e-7;
            return t.cells.forEach((function (i, o) {
                i.forEach((function (i, s) {
                    if (void 0 !== i && (5 !== (f = i).cval && 10 !== f.cval) && !dt(i)) {
                        var a = function (t, e, n) {
                            var r, i, o = t.length, s = [], a = [0, 0, 1, 1, 0, 0, 0, 0, -1, 0, 1, 1, -1, 0, -1, 0],
                                u = [0, -1, 0, 0, 1, 1, 1, 1, 0, -1, 0, 0, 0, -1, 0, 0],
                                l = ["none", "left", "bottom", "left", "right", "none", "bottom", "left", "top", "top", "none", "top", "right", "right", "bottom", "none"],
                                c = ["none", "bottom", "right", "right", "top", "top", "top", "top", "left", "bottom", "right", "right", "left", "bottom", "left", "none"],
                                h = t[e][n], p = h.cval, f = l[p], g = vt(h, f);
                            s.push([n + g[0], e + g[1]]), f = c[p], g = vt(h, f), s.push([n + g[0], e + g[1]]), yt(h);
                            var d = n + a[p], y = e + u[p], v = p;
                            for (; d >= 0 && y >= 0 && y < o && (d != n || y != e) && void 0 !== (h = t[y][d]);) {
                                if (0 === (p = h.cval) || 15 === p) return {path: s, info: "mergeable"};
                                f = c[p], r = a[p], i = u[p], 5 !== p && 10 !== p || (5 === p ? h.flipped ? -1 === u[v] ? (f = "left", r = -1, i = 0) : (f = "right", r = 1, i = 0) : -1 === a[v] && (f = "bottom", r = 0, i = -1) : 10 === p && (h.flipped ? -1 === a[v] ? (f = "top", r = 0, i = 1) : (f = "bottom", r = 0, i = -1) : 1 === u[v] && (f = "left", r = -1, i = 0))), g = vt(h, f), s.push([d + g[0], y + g[1]]), yt(h), d += r, y += i, v = p
                            }
                            return {path: s, info: "closed"}
                        }(t.cells, o, s), u = !1;
                        if ("mergeable" === a.info) for (var l = a.path[a.path.length - 1][0], c = a.path[a.path.length - 1][1], h = n - 1; h >= 0; h--) if (Math.abs(e[h][0][0] - l) <= r && Math.abs(e[h][0][1] - c) <= r) {
                            for (var p = a.path.length - 2; p >= 0; --p) e[h].unshift(a.path[p]);
                            u = !0;
                            break
                        }
                        u || (e[n++] = a.path)
                    }
                    var f
                }))
            })), e
        }(function (t, e) {
            for (var n = t.length - 1, r = t[0].length - 1, i = {rows: n, cols: r, cells: []}, o = 0; o < n; ++o) {
                i.cells[o] = [];
                for (var s = 0; s < r; ++s) {
                    var a = 0, u = t[o + 1][s], l = t[o + 1][s + 1], c = t[o][s + 1], h = t[o][s];
                    if (!(isNaN(u) || isNaN(l) || isNaN(c) || isNaN(h))) {
                        a |= u >= e ? 8 : 0, a |= l >= e ? 4 : 0, a |= c >= e ? 2 : 0;
                        var p, f, g, d, y = !1;
                        if (5 === (a |= h >= e ? 1 : 0) || 10 === a) {
                            var v = (u + l + c + h) / 4;
                            5 === a && v < e ? (a = 10, y = !0) : 10 === a && v < e && (a = 5, y = !0)
                        }
                        if (0 !== a && 15 !== a) p = f = g = d = .5, 1 === a ? (g = 1 - gt(e, u, h), f = 1 - gt(e, c, h)) : 2 === a ? (f = gt(e, h, c), d = 1 - gt(e, l, c)) : 3 === a ? (g = 1 - gt(e, u, h), d = 1 - gt(e, l, c)) : 4 === a ? (p = gt(e, u, l), d = gt(e, c, l)) : 5 === a ? (p = gt(e, u, l), d = gt(e, c, l), f = 1 - gt(e, c, h), g = 1 - gt(e, u, h)) : 6 === a ? (f = gt(e, h, c), p = gt(e, u, l)) : 7 === a ? (g = 1 - gt(e, u, h), p = gt(e, u, l)) : 8 === a ? (g = gt(e, h, u), p = 1 - gt(e, l, u)) : 9 === a ? (f = 1 - gt(e, c, h), p = 1 - gt(e, l, u)) : 10 === a ? (p = 1 - gt(e, l, u), d = 1 - gt(e, l, c), f = gt(e, h, c), g = gt(e, h, u)) : 11 === a ? (p = 1 - gt(e, l, u), d = 1 - gt(e, l, c)) : 12 === a ? (g = gt(e, h, u), d = gt(e, c, l)) : 13 === a ? (f = 1 - gt(e, c, h), d = gt(e, c, l)) : 14 === a ? (g = gt(e, h, u), f = gt(e, h, c)) : console.log("MarchingSquaresJS-isoContours: Illegal cval detected: " + a), i.cells[o][s] = {
                            cval: a,
                            flipped: y,
                            top: p,
                            right: d,
                            bottom: f,
                            left: g
                        }
                    }
                }
            }
            return i
        }(t, e));
        return "function" == typeof pt.successCallback && pt.successCallback(a), a
    }

    function gt(t, e, n) {
        return (t - e) / (n - e)
    }

    function dt(t) {
        return 0 === t.cval || 15 === t.cval
    }

    function yt(t) {
        dt(t) || 5 === t.cval || 10 === t.cval || (t.cval = 15)
    }

    function vt(t, e) {
        return "top" === e ? [t.top, 1] : "bottom" === e ? [t.bottom, 0] : "right" === e ? [1, t.right] : "left" === e ? [0, t.left] : void 0
    }

    function _t(t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = e.zProperty || "elevation", r = e.flip, i = e.flags;
        k(t, "Point", "input must contain Points");
        for (var o = function (t, e) {
            var n = {};
            return X(t, (function (t) {
                var e = T(t)[1];
                n[e] || (n[e] = []), n[e].push(t)
            })), Object.keys(n).map((function (t) {
                return n[t].sort((function (t, e) {
                    return T(t)[0] - T(e)[0]
                }))
            })).sort((function (t, n) {
                return e ? T(t[0])[1] - T(n[0])[1] : T(n[0])[1] - T(t[0])[1]
            }))
        }(t, r), s = [], a = 0; a < o.length; a++) {
            for (var u = o[a], l = [], c = 0; c < u.length; c++) {
                var h = u[c];
                h.properties[n] ? l.push(h.properties[n]) : l.push(0), !0 === i && (h.properties.matrixPosition = [a, c])
            }
            s.push(l)
        }
        return s
    }

    var mt = Et, xt = Et;

    function Et(t, e, n, r, i) {
        bt(t, e, n || 0, r || t.length - 1, i || It)
    }

    function bt(t, e, n, r, i) {
        for (; r > n;) {
            if (r - n > 600) {
                var o = r - n + 1, s = e - n + 1, a = Math.log(o), u = .5 * Math.exp(2 * a / 3),
                    l = .5 * Math.sqrt(a * u * (o - u) / o) * (s - o / 2 < 0 ? -1 : 1);
                bt(t, e, Math.max(n, Math.floor(e - s * u / o + l)), Math.min(r, Math.floor(e + (o - s) * u / o + l)), i)
            }
            var c = t[e], h = n, p = r;
            for (wt(t, n, e), i(t[r], c) > 0 && wt(t, n, r); h < p;) {
                for (wt(t, h, p), h++, p--; i(t[h], c) < 0;) h++;
                for (; i(t[p], c) > 0;) p--
            }
            0 === i(t[n], c) ? wt(t, n, p) : wt(t, ++p, r), p <= e && (n = p + 1), e <= p && (r = p - 1)
        }
    }

    function wt(t, e, n) {
        var r = t[e];
        t[e] = t[n], t[n] = r
    }

    function It(t, e) {
        return t < e ? -1 : t > e ? 1 : 0
    }

    mt.default = xt;
    var Nt = Ct, St = Ct;

    function Ct(t, e) {
        if (!(this instanceof Ct)) return new Ct(t, e);
        this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), e && this._initFormat(e), this.clear()
    }

    function Pt(t, e, n) {
        if (!n) return e.indexOf(t);
        for (var r = 0; r < e.length; r++) if (n(t, e[r])) return r;
        return -1
    }

    function Lt(t, e) {
        Mt(t, 0, t.children.length, e, t)
    }

    function Mt(t, e, n, r, i) {
        i || (i = Gt(null)), i.minX = 1 / 0, i.minY = 1 / 0, i.maxX = -1 / 0, i.maxY = -1 / 0;
        for (var o, s = e; s < n; s++) o = t.children[s], Ot(i, t.leaf ? r(o) : o);
        return i
    }

    function Ot(t, e) {
        return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t
    }

    function Rt(t, e) {
        return t.minX - e.minX
    }

    function Tt(t, e) {
        return t.minY - e.minY
    }

    function At(t) {
        return (t.maxX - t.minX) * (t.maxY - t.minY)
    }

    function Dt(t) {
        return t.maxX - t.minX + (t.maxY - t.minY)
    }

    function Ft(t, e) {
        return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY
    }

    function kt(t, e) {
        return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY
    }

    function Gt(t) {
        return {children: t, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0}
    }

    function qt(t, e, n, r, i) {
        for (var o, s = [e, n]; s.length;) (n = s.pop()) - (e = s.pop()) <= r || (o = e + Math.ceil((n - e) / r / 2) * r, mt(t, o, e, n, i), s.push(e, o, o, n))
    }

    function Bt(t) {
        var e = {exports: {}};
        return t(e, e.exports), e.exports
    }

    Ct.prototype = {
        all: function () {
            return this._all(this.data, [])
        }, search: function (t) {
            var e = this.data, n = [], r = this.toBBox;
            if (!kt(t, e)) return n;
            for (var i, o, s, a, u = []; e;) {
                for (i = 0, o = e.children.length; i < o; i++) s = e.children[i], kt(t, a = e.leaf ? r(s) : s) && (e.leaf ? n.push(s) : Ft(t, a) ? this._all(s, n) : u.push(s));
                e = u.pop()
            }
            return n
        }, collides: function (t) {
            var e = this.data, n = this.toBBox;
            if (!kt(t, e)) return !1;
            for (var r, i, o, s, a = []; e;) {
                for (r = 0, i = e.children.length; r < i; r++) if (o = e.children[r], kt(t, s = e.leaf ? n(o) : o)) {
                    if (e.leaf || Ft(t, s)) return !0;
                    a.push(o)
                }
                e = a.pop()
            }
            return !1
        }, load: function (t) {
            if (!t || !t.length) return this;
            if (t.length < this._minEntries) {
                for (var e = 0, n = t.length; e < n; e++) this.insert(t[e]);
                return this
            }
            var r = this._build(t.slice(), 0, t.length - 1, 0);
            if (this.data.children.length) if (this.data.height === r.height) this._splitRoot(this.data, r); else {
                if (this.data.height < r.height) {
                    var i = this.data;
                    this.data = r, r = i
                }
                this._insert(r, this.data.height - r.height - 1, !0)
            } else this.data = r;
            return this
        }, insert: function (t) {
            return t && this._insert(t, this.data.height - 1), this
        }, clear: function () {
            return this.data = Gt([]), this
        }, remove: function (t, e) {
            if (!t) return this;
            for (var n, r, i, o, s = this.data, a = this.toBBox(t), u = [], l = []; s || u.length;) {
                if (s || (s = u.pop(), r = u[u.length - 1], n = l.pop(), o = !0), s.leaf && -1 !== (i = Pt(t, s.children, e))) return s.children.splice(i, 1), u.push(s), this._condense(u), this;
                o || s.leaf || !Ft(s, a) ? r ? (n++, s = r.children[n], o = !1) : s = null : (u.push(s), l.push(n), n = 0, r = s, s = s.children[0])
            }
            return this
        }, toBBox: function (t) {
            return t
        }, compareMinX: Rt, compareMinY: Tt, toJSON: function () {
            return this.data
        }, fromJSON: function (t) {
            return this.data = t, this
        }, _all: function (t, e) {
            for (var n = []; t;) t.leaf ? e.push.apply(e, t.children) : n.push.apply(n, t.children), t = n.pop();
            return e
        }, _build: function (t, e, n, r) {
            var i, o = n - e + 1, s = this._maxEntries;
            if (o <= s) return Lt(i = Gt(t.slice(e, n + 1)), this.toBBox), i;
            r || (r = Math.ceil(Math.log(o) / Math.log(s)), s = Math.ceil(o / Math.pow(s, r - 1))), (i = Gt([])).leaf = !1, i.height = r;
            var a, u, l, c, h = Math.ceil(o / s), p = h * Math.ceil(Math.sqrt(s));
            for (qt(t, e, n, p, this.compareMinX), a = e; a <= n; a += p) for (qt(t, a, l = Math.min(a + p - 1, n), h, this.compareMinY), u = a; u <= l; u += h) c = Math.min(u + h - 1, l), i.children.push(this._build(t, u, c, r - 1));
            return Lt(i, this.toBBox), i
        }, _chooseSubtree: function (t, e, n, r) {
            for (var i, o, s, a, u, l, c, h, p, f; r.push(e), !e.leaf && r.length - 1 !== n;) {
                for (c = h = 1 / 0, i = 0, o = e.children.length; i < o; i++) u = At(s = e.children[i]), p = t, f = s, (l = (Math.max(f.maxX, p.maxX) - Math.min(f.minX, p.minX)) * (Math.max(f.maxY, p.maxY) - Math.min(f.minY, p.minY)) - u) < h ? (h = l, c = u < c ? u : c, a = s) : l === h && u < c && (c = u, a = s);
                e = a || e.children[0]
            }
            return e
        }, _insert: function (t, e, n) {
            var r = this.toBBox, i = n ? t : r(t), o = [], s = this._chooseSubtree(i, this.data, e, o);
            for (s.children.push(t), Ot(s, i); e >= 0 && o[e].children.length > this._maxEntries;) this._split(o, e), e--;
            this._adjustParentBBoxes(i, o, e)
        }, _split: function (t, e) {
            var n = t[e], r = n.children.length, i = this._minEntries;
            this._chooseSplitAxis(n, i, r);
            var o = this._chooseSplitIndex(n, i, r), s = Gt(n.children.splice(o, n.children.length - o));
            s.height = n.height, s.leaf = n.leaf, Lt(n, this.toBBox), Lt(s, this.toBBox), e ? t[e - 1].children.push(s) : this._splitRoot(n, s)
        }, _splitRoot: function (t, e) {
            this.data = Gt([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, Lt(this.data, this.toBBox)
        }, _chooseSplitIndex: function (t, e, n) {
            var r, i, o, s, a, u, l, c, h, p, f, g, d, y;
            for (u = l = 1 / 0, r = e; r <= n - e; r++) i = Mt(t, 0, r, this.toBBox), o = Mt(t, r, n, this.toBBox), h = i, p = o, f = void 0, g = void 0, d = void 0, y = void 0, f = Math.max(h.minX, p.minX), g = Math.max(h.minY, p.minY), d = Math.min(h.maxX, p.maxX), y = Math.min(h.maxY, p.maxY), s = Math.max(0, d - f) * Math.max(0, y - g), a = At(i) + At(o), s < u ? (u = s, c = r, l = a < l ? a : l) : s === u && a < l && (l = a, c = r);
            return c
        }, _chooseSplitAxis: function (t, e, n) {
            var r = t.leaf ? this.compareMinX : Rt, i = t.leaf ? this.compareMinY : Tt;
            this._allDistMargin(t, e, n, r) < this._allDistMargin(t, e, n, i) && t.children.sort(r)
        }, _allDistMargin: function (t, e, n, r) {
            t.children.sort(r);
            var i, o, s = this.toBBox, a = Mt(t, 0, e, s), u = Mt(t, n - e, n, s), l = Dt(a) + Dt(u);
            for (i = e; i < n - e; i++) o = t.children[i], Ot(a, t.leaf ? s(o) : o), l += Dt(a);
            for (i = n - e - 1; i >= e; i--) o = t.children[i], Ot(u, t.leaf ? s(o) : o), l += Dt(u);
            return l
        }, _adjustParentBBoxes: function (t, e, n) {
            for (var r = n; r >= 0; r--) Ot(e[r], t)
        }, _condense: function (t) {
            for (var e, n = t.length - 1; n >= 0; n--) 0 === t[n].children.length ? n > 0 ? (e = t[n - 1].children).splice(e.indexOf(t[n]), 1) : this.clear() : Lt(t[n], this.toBBox)
        }, _initFormat: function (t) {
            var e = ["return a", " - b", ";"];
            this.compareMinX = new Function("a", "b", e.join(t[0])), this.compareMinY = new Function("a", "b", e.join(t[1])), this.toBBox = new Function("a", "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};")
        }
    }, Nt.default = St;
    var zt = function (t, e, n) {
        var r = t * e, i = jt * t, o = i - (i - t), s = t - o, a = jt * e, u = a - (a - e), l = e - u,
            c = s * l - (r - o * u - s * u - o * l);
        if (n) return n[0] = c, n[1] = r, n;
        return [c, r]
    }, jt = +(Math.pow(2, 27) + 1);
    var Ut = function (t, e) {
        var n = 0 | t.length, r = 0 | e.length;
        if (1 === n && 1 === r) return function (t, e) {
            var n = t + e, r = n - t, i = t - (n - r) + (e - r);
            if (i) return [i, n];
            return [n]
        }(t[0], e[0]);
        var i, o, s = new Array(n + r), a = 0, u = 0, l = 0, c = Math.abs, h = t[u], p = c(h), f = e[l], g = c(f);
        p < g ? (o = h, (u += 1) < n && (h = t[u], p = c(h))) : (o = f, (l += 1) < r && (f = e[l], g = c(f)));
        u < n && p < g || l >= r ? (i = h, (u += 1) < n && (h = t[u], p = c(h))) : (i = f, (l += 1) < r && (f = e[l], g = c(f)));
        var d, y, v = i + o, _ = v - i, m = o - _, x = m, E = v;
        for (; u < n && l < r;) p < g ? (i = h, (u += 1) < n && (h = t[u], p = c(h))) : (i = f, (l += 1) < r && (f = e[l], g = c(f))), (m = (o = x) - (_ = (v = i + o) - i)) && (s[a++] = m), x = E - ((d = E + v) - (y = d - E)) + (v - y), E = d;
        for (; u < n;) (m = (o = x) - (_ = (v = (i = h) + o) - i)) && (s[a++] = m), x = E - ((d = E + v) - (y = d - E)) + (v - y), E = d, (u += 1) < n && (h = t[u]);
        for (; l < r;) (m = (o = x) - (_ = (v = (i = f) + o) - i)) && (s[a++] = m), x = E - ((d = E + v) - (y = d - E)) + (v - y), E = d, (l += 1) < r && (f = e[l]);
        x && (s[a++] = x);
        E && (s[a++] = E);
        a || (s[a++] = 0);
        return s.length = a, s
    };
    var Vt = function (t, e, n) {
        var r = t + e, i = r - t, o = e - i, s = t - (r - i);
        if (n) return n[0] = s + o, n[1] = r, n;
        return [s + o, r]
    };
    var Xt = function (t, e) {
        var n = t.length;
        if (1 === n) {
            var r = zt(t[0], e);
            return r[0] ? r : [r[1]]
        }
        var i = new Array(2 * n), o = [.1, .1], s = [.1, .1], a = 0;
        zt(t[0], e, o), o[0] && (i[a++] = o[0]);
        for (var u = 1; u < n; ++u) {
            zt(t[u], e, s);
            var l = o[1];
            Vt(l, s[0], o), o[0] && (i[a++] = o[0]);
            var c = s[1], h = o[1], p = c + h, f = h - (p - c);
            o[1] = p, f && (i[a++] = f)
        }
        o[1] && (i[a++] = o[1]);
        0 === a && (i[a++] = 0);
        return i.length = a, i
    };
    var Yt = function (t, e) {
        var n = 0 | t.length, r = 0 | e.length;
        if (1 === n && 1 === r) return function (t, e) {
            var n = t + e, r = n - t, i = t - (n - r) + (e - r);
            if (i) return [i, n];
            return [n]
        }(t[0], -e[0]);
        var i, o, s = new Array(n + r), a = 0, u = 0, l = 0, c = Math.abs, h = t[u], p = c(h), f = -e[l], g = c(f);
        p < g ? (o = h, (u += 1) < n && (h = t[u], p = c(h))) : (o = f, (l += 1) < r && (f = -e[l], g = c(f)));
        u < n && p < g || l >= r ? (i = h, (u += 1) < n && (h = t[u], p = c(h))) : (i = f, (l += 1) < r && (f = -e[l], g = c(f)));
        var d, y, v = i + o, _ = v - i, m = o - _, x = m, E = v;
        for (; u < n && l < r;) p < g ? (i = h, (u += 1) < n && (h = t[u], p = c(h))) : (i = f, (l += 1) < r && (f = -e[l], g = c(f))), (m = (o = x) - (_ = (v = i + o) - i)) && (s[a++] = m), x = E - ((d = E + v) - (y = d - E)) + (v - y), E = d;
        for (; u < n;) (m = (o = x) - (_ = (v = (i = h) + o) - i)) && (s[a++] = m), x = E - ((d = E + v) - (y = d - E)) + (v - y), E = d, (u += 1) < n && (h = t[u]);
        for (; l < r;) (m = (o = x) - (_ = (v = (i = f) + o) - i)) && (s[a++] = m), x = E - ((d = E + v) - (y = d - E)) + (v - y), E = d, (l += 1) < r && (f = -e[l]);
        x && (s[a++] = x);
        E && (s[a++] = E);
        a || (s[a++] = 0);
        return s.length = a, s
    };
    var Ht = Bt((function (t) {
        function e(t, e) {
            for (var n = new Array(t.length - 1), r = 1; r < t.length; ++r) for (var i = n[r - 1] = new Array(t.length - 1), o = 0, s = 0; o < t.length; ++o) o !== e && (i[s++] = t[r][o]);
            return n
        }

        function n(t) {
            if (1 === t.length) return t[0];
            if (2 === t.length) return ["sum(", t[0], ",", t[1], ")"].join("");
            var e = t.length >> 1;
            return ["sum(", n(t.slice(0, e)), ",", n(t.slice(e)), ")"].join("")
        }

        function r(t) {
            if (2 === t.length) return [["sum(prod(", t[0][0], ",", t[1][1], "),prod(-", t[0][1], ",", t[1][0], "))"].join("")];
            for (var i = [], o = 0; o < t.length; ++o) i.push(["scale(", n(r(e(t, o))), ",", (s = o, 1 & s ? "-" : ""), t[0][o], ")"].join(""));
            return i;
            var s
        }

        function i(t) {
            for (var i = [], o = [], s = function (t) {
                for (var e = new Array(t), n = 0; n < t; ++n) {
                    e[n] = new Array(t);
                    for (var r = 0; r < t; ++r) e[n][r] = ["m", r, "[", t - n - 1, "]"].join("")
                }
                return e
            }(t), a = [], u = 0; u < t; ++u) 0 == (1 & u) ? i.push.apply(i, r(e(s, u))) : o.push.apply(o, r(e(s, u))), a.push("m" + u);
            var l = n(i), c = n(o), h = "orientation" + t + "Exact",
                p = ["function ", h, "(", a.join(), "){var p=", l, ",n=", c, ",d=sub(p,n);return d[d.length-1];};return ", h].join("");
            return new Function("sum", "prod", "scale", "sub", p)(Ut, zt, Xt, Yt)
        }

        var o = i(3), s = i(4), a = [function () {
            return 0
        }, function () {
            return 0
        }, function (t, e) {
            return e[0] - t[0]
        }, function (t, e, n) {
            var r, i = (t[1] - n[1]) * (e[0] - n[0]), s = (t[0] - n[0]) * (e[1] - n[1]), a = i - s;
            if (i > 0) {
                if (s <= 0) return a;
                r = i + s
            } else {
                if (!(i < 0)) return a;
                if (s >= 0) return a;
                r = -(i + s)
            }
            var u = 33306690738754716e-32 * r;
            return a >= u || a <= -u ? a : o(t, e, n)
        }, function (t, e, n, r) {
            var i = t[0] - r[0], o = e[0] - r[0], a = n[0] - r[0], u = t[1] - r[1], l = e[1] - r[1], c = n[1] - r[1],
                h = t[2] - r[2], p = e[2] - r[2], f = n[2] - r[2], g = o * c, d = a * l, y = a * u, v = i * c,
                _ = i * l, m = o * u, x = h * (g - d) + p * (y - v) + f * (_ - m),
                E = 7771561172376103e-31 * ((Math.abs(g) + Math.abs(d)) * Math.abs(h) + (Math.abs(y) + Math.abs(v)) * Math.abs(p) + (Math.abs(_) + Math.abs(m)) * Math.abs(f));
            return x > E || -x > E ? x : s(t, e, n, r)
        }];

        function u(t) {
            var e = a[t.length];
            return e || (e = a[t.length] = i(t.length)), e.apply(void 0, t)
        }

        !function () {
            for (; a.length <= 5;) a.push(i(a.length));
            for (var e = [], n = ["slow"], r = 0; r <= 5; ++r) e.push("a" + r), n.push("o" + r);
            var o = ["function getOrientation(", e.join(), "){switch(arguments.length){case 0:case 1:return 0;"];
            for (r = 2; r <= 5; ++r) o.push("case ", r, ":return o", r, "(", e.slice(0, r).join(), ");");
            o.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation"), n.push(o.join(""));
            var s = Function.apply(void 0, n);
            for (t.exports = s.apply(void 0, [u].concat(a)), r = 0; r <= 5; ++r) t.exports[r] = a[r]
        }()
    })), Wt = function (t) {
        var e = t.length;
        if (e < 3) {
            for (var n = new Array(e), r = 0; r < e; ++r) n[r] = r;
            return 2 === e && t[0][0] === t[1][0] && t[0][1] === t[1][1] ? [0] : n
        }
        var i = new Array(e);
        for (r = 0; r < e; ++r) i[r] = r;
        i.sort((function (e, n) {
            var r = t[e][0] - t[n][0];
            return r || t[e][1] - t[n][1]
        }));
        var o = [i[0], i[1]], s = [i[0], i[1]];
        for (r = 2; r < e; ++r) {
            for (var a = i[r], u = t[a], l = o.length; l > 1 && Jt(t[o[l - 2]], t[o[l - 1]], u) <= 0;) l -= 1, o.pop();
            for (o.push(a), l = s.length; l > 1 && Jt(t[s[l - 2]], t[s[l - 1]], u) >= 0;) l -= 1, s.pop();
            s.push(a)
        }
        n = new Array(s.length + o.length - 2);
        for (var c = 0, h = (r = 0, o.length); r < h; ++r) n[c++] = o[r];
        for (var p = s.length - 2; p > 0; --p) n[c++] = s[p];
        return n
    }, Jt = Ht[3];
    var Zt = Qt, Kt = Qt;

    function Qt(t, e) {
        if (!(this instanceof Qt)) return new Qt(t, e);
        if (this.data = t || [], this.length = this.data.length, this.compare = e || $t, this.length > 0) for (var n = (this.length >> 1) - 1; n >= 0; n--) this._down(n)
    }

    function $t(t, e) {
        return t < e ? -1 : t > e ? 1 : 0
    }

    Qt.prototype = {
        push: function (t) {
            this.data.push(t), this.length++, this._up(this.length - 1)
        }, pop: function () {
            if (0 !== this.length) {
                var t = this.data[0];
                return this.length--, this.length > 0 && (this.data[0] = this.data[this.length], this._down(0)), this.data.pop(), t
            }
        }, peek: function () {
            return this.data[0]
        }, _up: function (t) {
            for (var e = this.data, n = this.compare, r = e[t]; t > 0;) {
                var i = t - 1 >> 1, o = e[i];
                if (n(r, o) >= 0) break;
                e[t] = o, t = i
            }
            e[t] = r
        }, _down: function (t) {
            for (var e = this.data, n = this.compare, r = this.length >> 1, i = e[t]; t < r;) {
                var o = 1 + (t << 1), s = o + 1, a = e[o];
                if (s < this.length && n(e[s], a) < 0 && (o = s, a = e[s]), n(a, i) >= 0) break;
                e[t] = a, t = o
            }
            e[t] = i
        }
    }, Zt.default = Kt;
    var te = function (t, e) {
        for (var n = t[0], r = t[1], i = !1, o = 0, s = e.length - 1; o < e.length; s = o++) {
            var a = e[o][0], u = e[o][1], l = e[s][0], c = e[s][1];
            u > r != c > r && n < (l - a) * (r - u) / (c - u) + a && (i = !i)
        }
        return i
    }, ee = Ht[3], ne = ie, re = ie;

    function ie(t, e, n) {
        e = Math.max(0, void 0 === e ? 2 : e), n = n || 0;
        for (var r, i = function (t) {
            for (var e = t[0], n = t[0], r = t[0], i = t[0], o = 0; o < t.length; o++) {
                var s = t[o];
                s[0] < e[0] && (e = s), s[0] > r[0] && (r = s), s[1] < n[1] && (n = s), s[1] > i[1] && (i = s)
            }
            var a = [e, n, r, i], u = a.slice();
            for (o = 0; o < t.length; o++) te(t[o], a) || u.push(t[o]);
            var l = Wt(u), c = [];
            for (o = 0; o < l.length; o++) c.push(u[l[o]]);
            return c
        }(t), o = Nt(16, ["[0]", "[1]", "[0]", "[1]"]).load(t), s = [], a = 0; a < i.length; a++) {
            var u = i[a];
            o.remove(u), r = he(u, r), s.push(r)
        }
        var l = Nt(16);
        for (a = 0; a < s.length; a++) l.insert(ce(s[a]));
        for (var c = e * e, h = n * n; s.length;) {
            var p = s.shift(), f = p.p, g = p.next.p, d = pe(f, g);
            if (!(d < h)) {
                var y = d / c;
                (u = oe(o, p.prev.p, f, g, p.next.next.p, y, l)) && Math.min(pe(u, f), pe(u, g)) <= y && (s.push(p), s.push(he(u, p)), o.remove(u), l.remove(p), l.insert(ce(p)), l.insert(ce(p.next)))
            }
        }
        p = r;
        var v = [];
        do {
            v.push(p.p), p = p.next
        } while (p !== r);
        return v.push(p.p), v
    }

    function oe(t, e, n, r, i, o, s) {
        for (var a = new Zt(null, se), u = t.data; u;) {
            for (var l = 0; l < u.children.length; l++) {
                var c = u.children[l], h = u.leaf ? fe(c, n, r) : ae(n, r, c);
                h > o || a.push({node: c, dist: h})
            }
            for (; a.length && !a.peek().node.children;) {
                var p = a.pop(), f = p.node, g = fe(f, e, n), d = fe(f, r, i);
                if (p.dist < g && p.dist < d && le(n, f, s) && le(r, f, s)) return f
            }
            (u = a.pop()) && (u = u.node)
        }
        return null
    }

    function se(t, e) {
        return t.dist - e.dist
    }

    function ae(t, e, n) {
        if (ue(t, n) || ue(e, n)) return 0;
        var r = ge(t[0], t[1], e[0], e[1], n.minX, n.minY, n.maxX, n.minY);
        if (0 === r) return 0;
        var i = ge(t[0], t[1], e[0], e[1], n.minX, n.minY, n.minX, n.maxY);
        if (0 === i) return 0;
        var o = ge(t[0], t[1], e[0], e[1], n.maxX, n.minY, n.maxX, n.maxY);
        if (0 === o) return 0;
        var s = ge(t[0], t[1], e[0], e[1], n.minX, n.maxY, n.maxX, n.maxY);
        return 0 === s ? 0 : Math.min(r, i, o, s)
    }

    function ue(t, e) {
        return t[0] >= e.minX && t[0] <= e.maxX && t[1] >= e.minY && t[1] <= e.maxY
    }

    function le(t, e, n) {
        for (var r, i, o, s, a = Math.min(t[0], e[0]), u = Math.min(t[1], e[1]), l = Math.max(t[0], e[0]), c = Math.max(t[1], e[1]), h = n.search({
            minX: a,
            minY: u,
            maxX: l,
            maxY: c
        }), p = 0; p < h.length; p++) if (r = h[p].p, i = h[p].next.p, o = t, r !== (s = e) && i !== o && ee(r, i, o) > 0 != ee(r, i, s) > 0 && ee(o, s, r) > 0 != ee(o, s, i) > 0) return !1;
        return !0
    }

    function ce(t) {
        var e = t.p, n = t.next.p;
        return t.minX = Math.min(e[0], n[0]), t.minY = Math.min(e[1], n[1]), t.maxX = Math.max(e[0], n[0]), t.maxY = Math.max(e[1], n[1]), t
    }

    function he(t, e) {
        var n = {p: t, prev: null, next: null, minX: 0, minY: 0, maxX: 0, maxY: 0};
        return e ? (n.next = e.next, n.prev = e, e.next.prev = n, e.next = n) : (n.prev = n, n.next = n), n
    }

    function pe(t, e) {
        var n = t[0] - e[0], r = t[1] - e[1];
        return n * n + r * r
    }

    function fe(t, e, n) {
        var r = e[0], i = e[1], o = n[0] - r, s = n[1] - i;
        if (0 !== o || 0 !== s) {
            var a = ((t[0] - r) * o + (t[1] - i) * s) / (o * o + s * s);
            a > 1 ? (r = n[0], i = n[1]) : a > 0 && (r += o * a, i += s * a)
        }
        return (o = t[0] - r) * o + (s = t[1] - i) * s
    }

    function ge(t, e, n, r, i, o, s, a) {
        var u, l, c, h, p = n - t, f = r - e, g = s - i, d = a - o, y = t - i, v = e - o, _ = p * p + f * f,
            m = p * g + f * d, x = g * g + d * d, E = p * y + f * v, b = g * y + d * v, w = _ * x - m * m, I = w, N = w;
        0 === w ? (l = 0, I = 1, h = b, N = x) : (h = _ * b - m * E, (l = m * b - x * E) < 0 ? (l = 0, h = b, N = x) : l > I && (l = I, h = b + m, N = x)), h < 0 ? (h = 0, -E < 0 ? l = 0 : -E > _ ? l = I : (l = -E, I = _)) : h > N && (h = N, -E + m < 0 ? l = 0 : -E + m > _ ? l = I : (l = -E + m, I = _));
        var S = (1 - (c = 0 === h ? 0 : h / N)) * i + c * s - ((1 - (u = 0 === l ? 0 : l / I)) * t + u * n),
            C = (1 - c) * o + c * a - ((1 - u) * e + u * r);
        return S * S + C * C
    }

    function de(t, e) {
        void 0 === e && (e = {}), e.concavity = e.concavity || 1 / 0;
        var n = [];
        if (z(t, (function (t) {
            n.push([t[0], t[1]])
        })), !n.length) return null;
        var r = ne(n, e.concavity);
        return r.length > 3 ? l([r]) : null
    }

    function ye(t, e, n) {
        if (void 0 === n && (n = {}), !t) throw new Error("point is required");
        if (!e) throw new Error("polygon is required");
        var r = R(t), i = G(e), o = i.type, s = e.bbox, a = i.coordinates;
        if (s && !1 === function (t, e) {
            return e[0] <= t[0] && e[1] <= t[1] && e[2] >= t[0] && e[3] >= t[1]
        }(r, s)) return !1;
        "Polygon" === o && (a = [a]);
        for (var u = !1, l = 0; l < a.length && !u; l++) if (ve(r, a[l][0], n.ignoreBoundary)) {
            for (var c = !1, h = 1; h < a[l].length && !c;) ve(r, a[l][h], !n.ignoreBoundary) && (c = !0), h++;
            c || (u = !0)
        }
        return u
    }

    function ve(t, e, n) {
        var r = !1;
        e[0][0] === e[e.length - 1][0] && e[0][1] === e[e.length - 1][1] && (e = e.slice(0, e.length - 1));
        for (var i = 0, o = e.length - 1; i < e.length; o = i++) {
            var s = e[i][0], a = e[i][1], u = e[o][0], l = e[o][1];
            if (t[1] * (s - u) + a * (u - t[0]) + l * (t[0] - s) == 0 && (s - t[0]) * (u - t[0]) <= 0 && (a - t[1]) * (l - t[1]) <= 0) return !n;
            a > t[1] != l > t[1] && t[0] < (u - s) * (t[1] - a) / (l - a) + s && (r = !r)
        }
        return r
    }

    function _e(t, e) {
        var n = [];
        return X(t, (function (t) {
            var r = !1;
            W(e, (function (e) {
                ye(t, e) && (r = !0)
            })), r && n.push(t)
        })), f(n)
    }

    function me(t, e, n) {
        void 0 === n && (n = {});
        var r = R(t), i = R(e), o = I(i[1] - r[1]), s = I(i[0] - r[0]), a = I(r[1]), u = I(i[1]),
            l = Math.pow(Math.sin(o / 2), 2) + Math.pow(Math.sin(s / 2), 2) * Math.cos(a) * Math.cos(u);
        return m(2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l)), n.units)
    }

    function xe(t, e) {
        var n = !1;
        return f(function (t) {
            if (t.length < 3) return [];
            t.sort(be);
            var e, n, r, i, o, s, a = t.length - 1, u = t[a].x, l = t[0].x, c = t[a].y, h = c, p = 1e-12;
            for (; a--;) t[a].y < c && (c = t[a].y), t[a].y > h && (h = t[a].y);
            var f, g = l - u, d = h - c, y = g > d ? g : d, v = .5 * (l + u), _ = .5 * (h + c),
                m = [new Ee({__sentinel: !0, x: v - 20 * y, y: _ - y}, {
                    __sentinel: !0,
                    x: v,
                    y: _ + 20 * y
                }, {__sentinel: !0, x: v + 20 * y, y: _ - y})], x = [], E = [];
            a = t.length;
            for (; a--;) {
                for (E.length = 0, f = m.length; f--;) (g = t[a].x - m[f].x) > 0 && g * g > m[f].r ? (x.push(m[f]), m.splice(f, 1)) : g * g + (d = t[a].y - m[f].y) * d > m[f].r || (E.push(m[f].a, m[f].b, m[f].b, m[f].c, m[f].c, m[f].a), m.splice(f, 1));
                for (we(E), f = E.length; f;) n = E[--f], e = E[--f], r = t[a], i = n.x - e.x, o = n.y - e.y, s = 2 * (i * (r.y - n.y) - o * (r.x - n.x)), Math.abs(s) > p && m.push(new Ee(e, n, r))
            }
            Array.prototype.push.apply(x, m), a = x.length;
            for (; a--;) (x[a].a.__sentinel || x[a].b.__sentinel || x[a].c.__sentinel) && x.splice(a, 1);
            return x
        }(t.features.map((function (t) {
            var r = {x: t.geometry.coordinates[0], y: t.geometry.coordinates[1]};
            return e ? r.z = t.properties[e] : 3 === t.geometry.coordinates.length && (n = !0, r.z = t.geometry.coordinates[2]), r
        }))).map((function (t) {
            var e = [t.a.x, t.a.y], r = [t.b.x, t.b.y], i = [t.c.x, t.c.y], o = {};
            return n ? (e.push(t.a.z), r.push(t.b.z), i.push(t.c.z)) : o = {
                a: t.a.z,
                b: t.b.z,
                c: t.c.z
            }, l([[e, r, i, e]], o)
        })))
    }

    ne.default = re;
    var Ee = function (t, e, n) {
        this.a = t, this.b = e, this.c = n;
        var r, i, o = e.x - t.x, s = e.y - t.y, a = n.x - t.x, u = n.y - t.y, l = o * (t.x + e.x) + s * (t.y + e.y),
            c = a * (t.x + n.x) + u * (t.y + n.y), h = 2 * (o * (n.y - e.y) - s * (n.x - e.x));
        this.x = (u * l - s * c) / h, this.y = (o * c - a * l) / h, r = this.x - t.x, i = this.y - t.y, this.r = r * r + i * i
    };

    function be(t, e) {
        return e.x - t.x
    }

    function we(t) {
        var e, n, r, i, o, s = t.length;
        t:for (; s;) for (n = t[--s], e = t[--s], r = s; r;) if (o = t[--r], e === (i = t[--r]) && n === o || e === o && n === i) {
            t.splice(s, 2), t.splice(r, 2), s -= 2;
            continue t
        }
    }

    function Ie(t) {
        if (!t) throw new Error("geojson is required");
        switch (t.type) {
            case"Feature":
                return Ne(t);
            case"FeatureCollection":
                return function (t) {
                    var e = {type: "FeatureCollection"};
                    return Object.keys(t).forEach((function (n) {
                        switch (n) {
                            case"type":
                            case"features":
                                return;
                            default:
                                e[n] = t[n]
                        }
                    })), e.features = t.features.map((function (t) {
                        return Ne(t)
                    })), e
                }(t);
            case"Point":
            case"LineString":
            case"Polygon":
            case"MultiPoint":
            case"MultiLineString":
            case"MultiPolygon":
            case"GeometryCollection":
                return Ce(t);
            default:
                throw new Error("unknown GeoJSON type")
        }
    }

    function Ne(t) {
        var e = {type: "Feature"};
        return Object.keys(t).forEach((function (n) {
            switch (n) {
                case"type":
                case"properties":
                case"geometry":
                    return;
                default:
                    e[n] = t[n]
            }
        })), e.properties = Se(t.properties), e.geometry = Ce(t.geometry), e
    }

    function Se(t) {
        var e = {};
        return t ? (Object.keys(t).forEach((function (n) {
            var r = t[n];
            "object" == typeof r ? null === r ? e[n] = null : Array.isArray(r) ? e[n] = r.map((function (t) {
                return t
            })) : e[n] = Se(r) : e[n] = r
        })), e) : e
    }

    function Ce(t) {
        var e = {type: t.type};
        return t.bbox && (e.bbox = t.bbox), "GeometryCollection" === t.type ? (e.geometries = t.geometries.map((function (t) {
            return Ce(t)
        })), e) : (e.coordinates = Pe(t.coordinates), e)
    }

    function Pe(t) {
        var e = t;
        return "object" != typeof e[0] ? e.slice() : e.map((function (t) {
            return Pe(t)
        }))
    }

    function Le(t, e) {
        if (void 0 === e && (e = {}), !P(e = e || {})) throw new Error("options is invalid");
        var n = e.mutate;
        if ("FeatureCollection" !== q(t)) throw new Error("geojson must be a FeatureCollection");
        if (!t.features.length) throw new Error("geojson is empty");
        !1 !== n && void 0 !== n || (t = Ie(t));
        var r = [], i = et(t, (function (t, e) {
            var n = function (t, e) {
                var n, r = t.geometry.coordinates, i = e.geometry.coordinates, o = Me(r[0]), s = Me(r[r.length - 1]),
                    a = Me(i[0]), u = Me(i[i.length - 1]);
                if (o === u) n = i.concat(r.slice(1)); else if (a === s) n = r.concat(i.slice(1)); else if (o === a) n = r.slice(1).reverse().concat(i); else {
                    if (s !== u) return null;
                    n = r.concat(i.reverse().slice(1))
                }
                return h(n)
            }(t, e);
            return n || (r.push(t), e)
        }));
        return i && r.push(i), r.length ? 1 === r.length ? r[0] : g(r.map((function (t) {
            return t.coordinates
        }))) : null
    }

    function Me(t) {
        return t[0].toString() + "," + t[1].toString()
    }

    function Oe(t) {
        return t
    }

    function Re(t, e) {
        var n = function (t) {
            if (null == t) return Oe;
            var e, n, r = t.scale[0], i = t.scale[1], o = t.translate[0], s = t.translate[1];
            return function (t, a) {
                a || (e = n = 0);
                var u = 2, l = t.length, c = new Array(l);
                for (c[0] = (e += t[0]) * r + o, c[1] = (n += t[1]) * i + s; u < l;) c[u] = t[u], ++u;
                return c
            }
        }(t.transform), r = t.arcs;

        function i(t, e) {
            e.length && e.pop();
            for (var i = r[t < 0 ? ~t : t], o = 0, s = i.length; o < s; ++o) e.push(n(i[o], o));
            t < 0 && function (t, e) {
                for (var n, r = t.length, i = r - e; i < --r;) n = t[i], t[i++] = t[r], t[r] = n
            }(e, s)
        }

        function o(t) {
            return n(t)
        }

        function s(t) {
            for (var e = [], n = 0, r = t.length; n < r; ++n) i(t[n], e);
            return e.length < 2 && e.push(e[0]), e
        }

        function a(t) {
            for (var e = s(t); e.length < 4;) e.push(e[0]);
            return e
        }

        function u(t) {
            return t.map(a)
        }

        return function t(e) {
            var n, r = e.type;
            switch (r) {
                case"GeometryCollection":
                    return {type: r, geometries: e.geometries.map(t)};
                case"Point":
                    n = o(e.coordinates);
                    break;
                case"MultiPoint":
                    n = e.coordinates.map(o);
                    break;
                case"LineString":
                    n = s(e.arcs);
                    break;
                case"MultiLineString":
                    n = e.arcs.map(s);
                    break;
                case"Polygon":
                    n = u(e.arcs);
                    break;
                case"MultiPolygon":
                    n = e.arcs.map(u);
                    break;
                default:
                    return null
            }
            return {type: r, coordinates: n}
        }(e)
    }

    function Te(t, e) {
        var n = {}, r = {}, i = {}, o = [], s = -1;

        function a(t, e) {
            for (var r in t) {
                var i = t[r];
                delete e[i.start], delete i.start, delete i.end, i.forEach((function (t) {
                    n[t < 0 ? ~t : t] = 1
                })), o.push(i)
            }
        }

        return e.forEach((function (n, r) {
            var i, o = t.arcs[n < 0 ? ~n : n];
            o.length < 3 && !o[1][0] && !o[1][1] && (i = e[++s], e[s] = n, e[r] = i)
        })), e.forEach((function (e) {
            var n, o, s = function (e) {
                var n, r = t.arcs[e < 0 ? ~e : e], i = r[0];
                t.transform ? (n = [0, 0], r.forEach((function (t) {
                    n[0] += t[0], n[1] += t[1]
                }))) : n = r[r.length - 1];
                return e < 0 ? [n, i] : [i, n]
            }(e), a = s[0], u = s[1];
            if (n = i[a]) if (delete i[n.end], n.push(e), n.end = u, o = r[u]) {
                delete r[o.start];
                var l = o === n ? n : n.concat(o);
                r[l.start = n.start] = i[l.end = o.end] = l
            } else r[n.start] = i[n.end] = n; else if (n = r[u]) if (delete r[n.start], n.unshift(e), n.start = a, o = i[a]) {
                delete i[o.end];
                var c = o === n ? n : o.concat(n);
                r[c.start = o.start] = i[c.end = n.end] = c
            } else r[n.start] = i[n.end] = n; else r[(n = [e]).start = a] = i[n.end = u] = n
        })), a(i, r), a(r, i), e.forEach((function (t) {
            n[t < 0 ? ~t : t] || o.push([t])
        })), o
    }

    function Ae(t, e) {
        var n = {}, r = [], i = [];

        function o(t) {
            t.forEach((function (e) {
                e.forEach((function (e) {
                    (n[e = e < 0 ? ~e : e] || (n[e] = [])).push(t)
                }))
            })), r.push(t)
        }

        function s(e) {
            return function (t) {
                for (var e, n = -1, r = t.length, i = t[r - 1], o = 0; ++n < r;) e = i, i = t[n], o += e[0] * i[1] - e[1] * i[0];
                return Math.abs(o)
            }(Re(t, {type: "Polygon", arcs: [e]}).coordinates[0])
        }

        return e.forEach((function t(e) {
            switch (e.type) {
                case"GeometryCollection":
                    e.geometries.forEach(t);
                    break;
                case"Polygon":
                    o(e.arcs);
                    break;
                case"MultiPolygon":
                    e.arcs.forEach(o)
            }
        })), r.forEach((function (t) {
            if (!t._) {
                var e = [], r = [t];
                for (t._ = 1, i.push(e); t = r.pop();) e.push(t), t.forEach((function (t) {
                    t.forEach((function (t) {
                        n[t < 0 ? ~t : t].forEach((function (t) {
                            t._ || (t._ = 1, r.push(t))
                        }))
                    }))
                }))
            }
        })), r.forEach((function (t) {
            delete t._
        })), {
            type: "MultiPolygon", arcs: i.map((function (e) {
                var r, i = [];
                if (e.forEach((function (t) {
                    t.forEach((function (t) {
                        t.forEach((function (t) {
                            n[t < 0 ? ~t : t].length < 2 && i.push(t)
                        }))
                    }))
                })), (r = (i = Te(t, i)).length) > 1) for (var o, a, u = 1, l = s(i[0]); u < r; ++u) (o = s(i[u])) > l && (a = i[0], i[0] = i[u], i[u] = a, l = o);
                return i
            }))
        }
    }

    function De(t, e, n, r, i, o) {
        3 === arguments.length && (r = o = Array, i = null);
        for (var s = new r(t = 1 << Math.max(4, Math.ceil(Math.log(t) / Math.LN2))), a = new o(t), u = t - 1, l = 0; l < t; ++l) s[l] = i;

        function c(r, o) {
            for (var l = e(r) & u, c = s[l], h = 0; c != i;) {
                if (n(c, r)) return a[l] = o;
                if (++h >= t) throw new Error("full hashmap");
                c = s[l = l + 1 & u]
            }
            return s[l] = r, a[l] = o, o
        }

        function h(r, o) {
            for (var l = e(r) & u, c = s[l], h = 0; c != i;) {
                if (n(c, r)) return a[l];
                if (++h >= t) throw new Error("full hashmap");
                c = s[l = l + 1 & u]
            }
            return s[l] = r, a[l] = o, o
        }

        function p(r, o) {
            for (var l = e(r) & u, c = s[l], h = 0; c != i;) {
                if (n(c, r)) return a[l];
                if (++h >= t) break;
                c = s[l = l + 1 & u]
            }
            return o
        }

        function f() {
            for (var t = [], e = 0, n = s.length; e < n; ++e) {
                var r = s[e];
                r != i && t.push(r)
            }
            return t
        }

        return {set: c, maybeSet: h, get: p, keys: f}
    }

    function Fe(t, e) {
        return t[0] === e[0] && t[1] === e[1]
    }

    var ke = new ArrayBuffer(16), Ge = new Float64Array(ke), qe = new Uint32Array(ke);

    function Be(t) {
        Ge[0] = t[0], Ge[1] = t[1];
        var e = qe[0] ^ qe[1];
        return 2147483647 & (e = e << 5 ^ e >> 7 ^ qe[2] ^ qe[3])
    }

    function ze(t) {
        var e, n, r, i, o = t.coordinates, s = t.lines, a = t.rings, u = function () {
                for (var t = De(1.4 * o.length, E, b, Int32Array, -1, Int32Array), e = new Int32Array(o.length), n = 0, r = o.length; n < r; ++n) e[n] = t.maybeSet(n, n);
                return e
            }(), l = new Int32Array(o.length), c = new Int32Array(o.length), h = new Int32Array(o.length),
            p = new Int8Array(o.length), f = 0;
        for (e = 0, n = o.length; e < n; ++e) l[e] = c[e] = h[e] = -1;
        for (e = 0, n = s.length; e < n; ++e) {
            var g = s[e], d = g[0], y = g[1];
            for (r = u[d], i = u[++d], ++f, p[r] = 1; ++d <= y;) x(e, r, r = i, i = u[d]);
            ++f, p[i] = 1
        }
        for (e = 0, n = o.length; e < n; ++e) l[e] = -1;
        for (e = 0, n = a.length; e < n; ++e) {
            var v = a[e], _ = v[0] + 1, m = v[1];
            for (x(e, u[m - 1], r = u[_ - 1], i = u[_]); ++_ <= m;) x(e, r, r = i, i = u[_])
        }

        function x(t, e, n, r) {
            if (l[n] !== t) {
                l[n] = t;
                var i = c[n];
                if (i >= 0) {
                    var o = h[n];
                    i === e && o === r || i === r && o === e || (++f, p[n] = 1)
                } else c[n] = e, h[n] = r
            }
        }

        function E(t) {
            return Be(o[t])
        }

        function b(t, e) {
            return Fe(o[t], o[e])
        }

        l = c = h = null;
        var w, I = function (t, e, n, r, i) {
            3 === arguments.length && (r = Array, i = null);
            for (var o = new r(t = 1 << Math.max(4, Math.ceil(Math.log(t) / Math.LN2))), s = t - 1, a = 0; a < t; ++a) o[a] = i;

            function u(r) {
                for (var a = e(r) & s, u = o[a], l = 0; u != i;) {
                    if (n(u, r)) return !0;
                    if (++l >= t) throw new Error("full hashset");
                    u = o[a = a + 1 & s]
                }
                return o[a] = r, !0
            }

            function l(r) {
                for (var a = e(r) & s, u = o[a], l = 0; u != i;) {
                    if (n(u, r)) return !0;
                    if (++l >= t) break;
                    u = o[a = a + 1 & s]
                }
                return !1
            }

            function c() {
                for (var t = [], e = 0, n = o.length; e < n; ++e) {
                    var r = o[e];
                    r != i && t.push(r)
                }
                return t
            }

            return {add: u, has: l, values: c}
        }(1.4 * f, Be, Fe);
        for (e = 0, n = o.length; e < n; ++e) p[w = u[e]] && I.add(o[w]);
        return I
    }

    function je(t, e, n, r) {
        Ue(t, e, n), Ue(t, e, e + r), Ue(t, e + r, n)
    }

    function Ue(t, e, n) {
        for (var r, i = e + (n-- - e >> 1); e < i; ++e, --n) r = t[e], t[e] = t[n], t[n] = r
    }

    function Ve(t) {
        var e, n, r = {};
        for (e in t) r[e] = null == (n = t[e]) ? {type: null} : ("FeatureCollection" === n.type ? Xe : "Feature" === n.type ? Ye : He)(n);
        return r
    }

    function Xe(t) {
        var e = {type: "GeometryCollection", geometries: t.features.map(Ye)};
        return null != t.bbox && (e.bbox = t.bbox), e
    }

    function Ye(t) {
        var e, n = He(t.geometry);
        for (e in null != t.id && (n.id = t.id), null != t.bbox && (n.bbox = t.bbox), t.properties) {
            n.properties = t.properties;
            break
        }
        return n
    }

    function He(t) {
        if (null == t) return {type: null};
        var e = "GeometryCollection" === t.type ? {
            type: "GeometryCollection",
            geometries: t.geometries.map(He)
        } : "Point" === t.type || "MultiPoint" === t.type ? {type: t.type, coordinates: t.coordinates} : {
            type: t.type,
            arcs: t.coordinates
        };
        return null != t.bbox && (e.bbox = t.bbox), e
    }

    function We(t, e) {
        var n = function (t) {
            var e = 1 / 0, n = 1 / 0, r = -1 / 0, i = -1 / 0;

            function o(t) {
                null != t && s.hasOwnProperty(t.type) && s[t.type](t)
            }

            var s = {
                GeometryCollection: function (t) {
                    t.geometries.forEach(o)
                }, Point: function (t) {
                    a(t.coordinates)
                }, MultiPoint: function (t) {
                    t.coordinates.forEach(a)
                }, LineString: function (t) {
                    u(t.arcs)
                }, MultiLineString: function (t) {
                    t.arcs.forEach(u)
                }, Polygon: function (t) {
                    t.arcs.forEach(u)
                }, MultiPolygon: function (t) {
                    t.arcs.forEach(l)
                }
            };

            function a(t) {
                var o = t[0], s = t[1];
                o < e && (e = o), o > r && (r = o), s < n && (n = s), s > i && (i = s)
            }

            function u(t) {
                t.forEach(a)
            }

            function l(t) {
                t.forEach(u)
            }

            for (var c in t) o(t[c]);
            return r >= e && i >= n ? [e, n, r, i] : void 0
        }(t = Ve(t)), r = e > 0 && n && function (t, e, n) {
            var r = e[0], i = e[1], o = e[2], s = e[3], a = o - r ? (n - 1) / (o - r) : 1,
                u = s - i ? (n - 1) / (s - i) : 1;

            function l(t) {
                return [Math.round((t[0] - r) * a), Math.round((t[1] - i) * u)]
            }

            function c(t, e) {
                for (var n, o, s, l, c, h = -1, p = 0, f = t.length, g = new Array(f); ++h < f;) n = t[h], l = Math.round((n[0] - r) * a), c = Math.round((n[1] - i) * u), l === o && c === s || (g[p++] = [o = l, s = c]);
                for (g.length = p; p < e;) p = g.push([g[0][0], g[0][1]]);
                return g
            }

            function h(t) {
                return c(t, 2)
            }

            function p(t) {
                return c(t, 4)
            }

            function f(t) {
                return t.map(p)
            }

            function g(t) {
                null != t && d.hasOwnProperty(t.type) && d[t.type](t)
            }

            var d = {
                GeometryCollection: function (t) {
                    t.geometries.forEach(g)
                }, Point: function (t) {
                    t.coordinates = l(t.coordinates)
                }, MultiPoint: function (t) {
                    t.coordinates = t.coordinates.map(l)
                }, LineString: function (t) {
                    t.arcs = h(t.arcs)
                }, MultiLineString: function (t) {
                    t.arcs = t.arcs.map(h)
                }, Polygon: function (t) {
                    t.arcs = f(t.arcs)
                }, MultiPolygon: function (t) {
                    t.arcs = t.arcs.map(f)
                }
            };
            for (var y in t) g(t[y]);
            return {scale: [1 / a, 1 / u], translate: [r, i]}
        }(t, n, e), i = function (t) {
            var e, n, r, i, o = t.coordinates, s = t.lines, a = t.rings, u = s.length + a.length;
            for (delete t.lines, delete t.rings, r = 0, i = s.length; r < i; ++r) for (e = s[r]; e = e.next;) ++u;
            for (r = 0, i = a.length; r < i; ++r) for (n = a[r]; n = n.next;) ++u;
            var l = De(2 * u * 1.4, Be, Fe), c = t.arcs = [];
            for (r = 0, i = s.length; r < i; ++r) {
                e = s[r];
                do {
                    h(e)
                } while (e = e.next)
            }
            for (r = 0, i = a.length; r < i; ++r) if ((n = a[r]).next) do {
                h(n)
            } while (n = n.next); else p(n);

            function h(t) {
                var e, n, r, i, s, a, u, h;
                if (r = l.get(e = o[t[0]])) for (u = 0, h = r.length; u < h; ++u) if (f(i = r[u], t)) return t[0] = i[0], void (t[1] = i[1]);
                if (s = l.get(n = o[t[1]])) for (u = 0, h = s.length; u < h; ++u) if (g(a = s[u], t)) return t[1] = a[0], void (t[0] = a[1]);
                r ? r.push(t) : l.set(e, [t]), s ? s.push(t) : l.set(n, [t]), c.push(t)
            }

            function p(t) {
                var e, n, r, i, s;
                if (n = l.get(o[t[0]])) for (i = 0, s = n.length; i < s; ++i) {
                    if (d(r = n[i], t)) return t[0] = r[0], void (t[1] = r[1]);
                    if (y(r, t)) return t[0] = r[1], void (t[1] = r[0])
                }
                if (n = l.get(e = o[t[0] + v(t)])) for (i = 0, s = n.length; i < s; ++i) {
                    if (d(r = n[i], t)) return t[0] = r[0], void (t[1] = r[1]);
                    if (y(r, t)) return t[0] = r[1], void (t[1] = r[0])
                }
                n ? n.push(t) : l.set(e, [t]), c.push(t)
            }

            function f(t, e) {
                var n = t[0], r = e[0], i = t[1];
                if (n - i != r - e[1]) return !1;
                for (; n <= i; ++n, ++r) if (!Fe(o[n], o[r])) return !1;
                return !0
            }

            function g(t, e) {
                var n = t[0], r = e[0], i = t[1], s = e[1];
                if (n - i != r - s) return !1;
                for (; n <= i; ++n, --s) if (!Fe(o[n], o[s])) return !1;
                return !0
            }

            function d(t, e) {
                var n = t[0], r = e[0], i = t[1] - n;
                if (i !== e[1] - r) return !1;
                for (var s = v(t), a = v(e), u = 0; u < i; ++u) if (!Fe(o[n + (u + s) % i], o[r + (u + a) % i])) return !1;
                return !0
            }

            function y(t, e) {
                var n = t[0], r = e[0], i = t[1], s = e[1], a = i - n;
                if (a !== s - r) return !1;
                for (var u = v(t), l = a - v(e), c = 0; c < a; ++c) if (!Fe(o[n + (c + u) % a], o[s - (c + l) % a])) return !1;
                return !0
            }

            function v(t) {
                for (var e = t[0], n = t[1], r = e, i = r, s = o[r]; ++r < n;) {
                    var a = o[r];
                    (a[0] < s[0] || a[0] === s[0] && a[1] < s[1]) && (i = r, s = a)
                }
                return i - e
            }

            return t
        }(function (t) {
            var e, n, r, i = ze(t), o = t.coordinates, s = t.lines, a = t.rings;
            for (n = 0, r = s.length; n < r; ++n) for (var u = s[n], l = u[0], c = u[1]; ++l < c;) i.has(o[l]) && (e = {
                0: l,
                1: u[1]
            }, u[1] = l, u = u.next = e);
            for (n = 0, r = a.length; n < r; ++n) for (var h = a[n], p = h[0], f = p, g = h[1], d = i.has(o[p]); ++f < g;) i.has(o[f]) && (d ? (e = {
                0: f,
                1: h[1]
            }, h[1] = f, h = h.next = e) : (je(o, p, g, g - f), o[g] = o[p], d = !0, f = p));
            return t
        }(function (t) {
            var e = -1, n = [], r = [], i = [];

            function o(t) {
                t && s.hasOwnProperty(t.type) && s[t.type](t)
            }

            var s = {
                GeometryCollection: function (t) {
                    t.geometries.forEach(o)
                }, LineString: function (t) {
                    t.arcs = a(t.arcs)
                }, MultiLineString: function (t) {
                    t.arcs = t.arcs.map(a)
                }, Polygon: function (t) {
                    t.arcs = t.arcs.map(u)
                }, MultiPolygon: function (t) {
                    t.arcs = t.arcs.map(l)
                }
            };

            function a(t) {
                for (var r = 0, o = t.length; r < o; ++r) i[++e] = t[r];
                var s = {0: e - o + 1, 1: e};
                return n.push(s), s
            }

            function u(t) {
                for (var n = 0, o = t.length; n < o; ++n) i[++e] = t[n];
                var s = {0: e - o + 1, 1: e};
                return r.push(s), s
            }

            function l(t) {
                return t.map(u)
            }

            for (var c in t) o(t[c]);
            return {type: "Topology", coordinates: i, lines: n, rings: r, objects: t}
        }(t))), o = i.coordinates, s = De(1.4 * i.arcs.length, Je, Ze);

        function a(t) {
            t && u.hasOwnProperty(t.type) && u[t.type](t)
        }

        t = i.objects, i.bbox = n, i.arcs = i.arcs.map((function (t, e) {
            return s.set(t, e), o.slice(t[0], t[1] + 1)
        })), delete i.coordinates, o = null;
        var u = {
            GeometryCollection: function (t) {
                t.geometries.forEach(a)
            }, LineString: function (t) {
                t.arcs = l(t.arcs)
            }, MultiLineString: function (t) {
                t.arcs = t.arcs.map(l)
            }, Polygon: function (t) {
                t.arcs = t.arcs.map(l)
            }, MultiPolygon: function (t) {
                t.arcs = t.arcs.map(c)
            }
        };

        function l(t) {
            var e = [];
            do {
                var n = s.get(t);
                e.push(t[0] < t[1] ? n : ~n)
            } while (t = t.next);
            return e
        }

        function c(t) {
            return t.map(l)
        }

        for (var h in t) a(t[h]);
        return r && (i.transform = r, i.arcs = function (t) {
            for (var e = -1, n = t.length; ++e < n;) {
                for (var r, i, o = t[e], s = 0, a = 1, u = o.length, l = o[0], c = l[0], h = l[1]; ++s < u;) r = (l = o[s])[0], i = l[1], r === c && i === h || (o[a++] = [r - c, i - h], c = r, h = i);
                1 === a && (o[a++] = [0, 0]), o.length = a
            }
            return t
        }(i.arcs)), i
    }

    function Je(t) {
        var e, n = t[0], r = t[1];
        return r < n && (e = n, n = r, r = e), n + 31 * r
    }

    function Ze(t, e) {
        var n, r = t[0], i = t[1], o = e[0], s = e[1];
        return i < r && (n = r, r = i, i = n), s < o && (n = o, o = s, s = n), r === o && i === s
    }

    function Ke(t, e) {
        if (void 0 === e && (e = {}), "FeatureCollection" !== q(t)) throw new Error("geojson must be a FeatureCollection");
        if (!t.features.length) throw new Error("geojson is empty");
        !1 !== e.mutate && void 0 !== e.mutate || (t = Ie(t));
        var n = [];
        Z(t, (function (t) {
            n.push(t.geometry)
        }));
        var r = We({geoms: v(n).geometry});
        return function (t) {
            return Re(t, Ae.apply(this, arguments))
        }(r, r.objects.geoms.geometries)
    }

    function Qe(t, e) {
        if (void 0 === e && (e = {}), !P(e = e || {})) throw new Error("options is invalid");
        var n = e.mutate;
        if ("FeatureCollection" !== q(t)) throw new Error("geojson must be a FeatureCollection");
        if (!t.features.length) throw new Error("geojson is empty");
        !1 !== n && void 0 !== n || (t = Ie(t));
        var r = function (t) {
            var e = {};
            Z(t, (function (t) {
                e[t.geometry.type] = !0
            }));
            var n = Object.keys(e);
            if (1 === n.length) return n[0];
            return null
        }(t);
        if (!r) throw new Error("geojson must be homogenous");
        var i = t;
        switch (r) {
            case"LineString":
                return Le(i, e);
            case"Polygon":
                return Ke(i, e);
            default:
                throw new Error(r + " is not supported")
        }
    }

    function $e(t, e) {
        void 0 === e && (e = {});
        var n = "object" == typeof e ? e.mutate : e;
        if (!t) throw new Error("geojson is required");
        var r = q(t), i = [];
        switch (r) {
            case"LineString":
                i = tn(t);
                break;
            case"MultiLineString":
            case"Polygon":
                T(t).forEach((function (t) {
                    i.push(tn(t))
                }));
                break;
            case"MultiPolygon":
                T(t).forEach((function (t) {
                    var e = [];
                    t.forEach((function (t) {
                        e.push(tn(t))
                    })), i.push(e)
                }));
                break;
            case"Point":
                return t;
            case"MultiPoint":
                var s = {};
                T(t).forEach((function (t) {
                    var e = t.join("-");
                    s.hasOwnProperty(e) || (i.push(t), s[e] = !0)
                }));
                break;
            default:
                throw new Error(r + " geometry not supported")
        }
        return t.coordinates ? !0 === n ? (t.coordinates = i, t) : {
            type: r,
            coordinates: i
        } : !0 === n ? (t.geometry.coordinates = i, t) : o({type: r, coordinates: i}, t.properties, {
            bbox: t.bbox,
            id: t.id
        })
    }

    function tn(t) {
        var e = T(t);
        if (2 === e.length && !en(e[0], e[1])) return e;
        var n = [], r = e.length - 1, i = n.length;
        n.push(e[0]);
        for (var o = 1; o < r; o++) {
            var s = n[n.length - 1];
            e[o][0] === s[0] && e[o][1] === s[1] || (n.push(e[o]), (i = n.length) > 2 && nn(n[i - 3], n[i - 1], n[i - 2]) && n.splice(n.length - 2, 1))
        }
        if (n.push(e[e.length - 1]), i = n.length, en(e[0], e[e.length - 1]) && i < 4) throw new Error("invalid polygon");
        return nn(n[i - 3], n[i - 1], n[i - 2]) && n.splice(n.length - 2, 1), n
    }

    function en(t, e) {
        return t[0] === e[0] && t[1] === e[1]
    }

    function nn(t, e, n) {
        var r = n[0], i = n[1], o = t[0], s = t[1], a = e[0], u = e[1], l = a - o, c = u - s;
        return 0 === (r - o) * c - (i - s) * l && (Math.abs(l) >= Math.abs(c) ? l > 0 ? o <= r && r <= a : a <= r && r <= o : c > 0 ? s <= i && i <= u : u <= i && i <= s)
    }

    function rn(t, e, n) {
        var r = e.x, i = e.y, o = n.x - r, s = n.y - i;
        if (0 !== o || 0 !== s) {
            var a = ((t.x - r) * o + (t.y - i) * s) / (o * o + s * s);
            a > 1 ? (r = n.x, i = n.y) : a > 0 && (r += o * a, i += s * a)
        }
        return (o = t.x - r) * o + (s = t.y - i) * s
    }

    function on(t, e, n, r, i) {
        for (var o, s = r, a = e + 1; a < n; a++) {
            var u = rn(t[a], t[e], t[n]);
            u > s && (o = a, s = u)
        }
        s > r && (o - e > 1 && on(t, e, o, r, i), i.push(t[o]), n - o > 1 && on(t, o, n, r, i))
    }

    function sn(t, e) {
        var n = t.length - 1, r = [t[0]];
        return on(t, 0, n, e, r), r.push(t[n]), r
    }

    function an(t, e, n) {
        if (t.length <= 2) return t;
        var r = void 0 !== e ? e * e : 1;
        return t = sn(t = n ? t : function (t, e) {
            for (var n, r, i, o, s, a = t[0], u = [a], l = 1, c = t.length; l < c; l++) n = t[l], i = a, o = void 0, s = void 0, o = (r = n).x - i.x, s = r.y - i.y, o * o + s * s > e && (u.push(n), a = n);
            return a !== n && u.push(n), u
        }(t, r), r)
    }

    function un(t, e, n) {
        return an(t.map((function (t) {
            return {x: t[0], y: t[1], z: t[2]}
        })), e, n).map((function (t) {
            return t.z ? [t.x, t.y, t.z] : [t.x, t.y]
        }))
    }

    function ln(t, e, n) {
        return t.map((function (t) {
            var r = t.map((function (t) {
                return {x: t[0], y: t[1]}
            }));
            if (r.length < 4) throw new Error("invalid polygon");
            for (var i = an(r, e, n).map((function (t) {
                return [t.x, t.y]
            })); !cn(i);) i = an(r, e -= .01 * e, n).map((function (t) {
                return [t.x, t.y]
            }));
            return i[i.length - 1][0] === i[0][0] && i[i.length - 1][1] === i[0][1] || i.push(i[0]), i
        }))
    }

    function cn(t) {
        return !(t.length < 3) && !(3 === t.length && t[2][0] === t[0][0] && t[2][1] === t[0][1])
    }

    var hn = function () {
        function t(t) {
            this.points = t.points || [], this.duration = t.duration || 1e4, this.sharpness = t.sharpness || .85, this.centers = [], this.controls = [], this.stepLength = t.stepLength || 60, this.length = this.points.length, this.delay = 0;
            for (var e = 0; e < this.length; e++) this.points[e].z = this.points[e].z || 0;
            for (e = 0; e < this.length - 1; e++) {
                var n = this.points[e], r = this.points[e + 1];
                this.centers.push({x: (n.x + r.x) / 2, y: (n.y + r.y) / 2, z: (n.z + r.z) / 2})
            }
            this.controls.push([this.points[0], this.points[0]]);
            for (e = 0; e < this.centers.length - 1; e++) {
                var i = this.points[e + 1].x - (this.centers[e].x + this.centers[e + 1].x) / 2,
                    o = this.points[e + 1].y - (this.centers[e].y + this.centers[e + 1].y) / 2,
                    s = this.points[e + 1].z - (this.centers[e].y + this.centers[e + 1].z) / 2;
                this.controls.push([{
                    x: (1 - this.sharpness) * this.points[e + 1].x + this.sharpness * (this.centers[e].x + i),
                    y: (1 - this.sharpness) * this.points[e + 1].y + this.sharpness * (this.centers[e].y + o),
                    z: (1 - this.sharpness) * this.points[e + 1].z + this.sharpness * (this.centers[e].z + s)
                }, {
                    x: (1 - this.sharpness) * this.points[e + 1].x + this.sharpness * (this.centers[e + 1].x + i),
                    y: (1 - this.sharpness) * this.points[e + 1].y + this.sharpness * (this.centers[e + 1].y + o),
                    z: (1 - this.sharpness) * this.points[e + 1].z + this.sharpness * (this.centers[e + 1].z + s)
                }])
            }
            return this.controls.push([this.points[this.length - 1], this.points[this.length - 1]]), this.steps = this.cacheSteps(this.stepLength), this
        }

        return t.prototype.cacheSteps = function (t) {
            var e = [], n = this.pos(0);
            e.push(0);
            for (var r = 0; r < this.duration; r += 10) {
                var i = this.pos(r);
                Math.sqrt((i.x - n.x) * (i.x - n.x) + (i.y - n.y) * (i.y - n.y) + (i.z - n.z) * (i.z - n.z)) > t && (e.push(r), n = i)
            }
            return e
        }, t.prototype.vector = function (t) {
            var e = this.pos(t + 10), n = this.pos(t - 10);
            return {
                angle: 180 * Math.atan2(e.y - n.y, e.x - n.x) / 3.14,
                speed: Math.sqrt((n.x - e.x) * (n.x - e.x) + (n.y - e.y) * (n.y - e.y) + (n.z - e.z) * (n.z - e.z))
            }
        }, t.prototype.pos = function (t) {
            var e = t - this.delay;
            e < 0 && (e = 0), e > this.duration && (e = this.duration - 1);
            var n = e / this.duration;
            if (n >= 1) return this.points[this.length - 1];
            var r = Math.floor((this.points.length - 1) * n);
            return function (t, e, n, r, i) {
                var o = function (t) {
                    var e = t * t;
                    return [e * t, 3 * e * (1 - t), 3 * t * (1 - t) * (1 - t), (1 - t) * (1 - t) * (1 - t)]
                }(t);
                return {
                    x: i.x * o[0] + r.x * o[1] + n.x * o[2] + e.x * o[3],
                    y: i.y * o[0] + r.y * o[1] + n.y * o[2] + e.y * o[3],
                    z: i.z * o[0] + r.z * o[1] + n.z * o[2] + e.z * o[3]
                }
            }((this.length - 1) * n - r, this.points[r], this.controls[r][1], this.controls[r + 1][0], this.points[r + 1])
        }, t
    }();

    function pn(t, e) {
        void 0 === e && (e = {});
        for (var n = e.resolution || 1e4, r = e.sharpness || .85, i = [], o = G(t).coordinates.map((function (t) {
            return {x: t[0], y: t[1]}
        })), s = new hn({duration: n, points: o, sharpness: r}), a = 0; a < s.duration; a += 10) {
            var u = s.pos(a);
            Math.floor(a / 100) % 2 == 0 && i.push([u.x, u.y])
        }
        return h(i, e.properties)
    }

    function fn(t, e) {
        void 0 === e && (e = {});
        var n = Number(t[0]), r = Number(t[1]), i = Number(t[2]), o = Number(t[3]);
        if (6 === t.length) throw new Error("@turf/bbox-polygon does not support BBox with 6 positions");
        var s = [n, r];
        return l([[s, [i, r], [i, o], [n, o], s]], e.properties, {bbox: t, id: e.id})
    }

    function gn(t) {
        return fn(ot(t))
    }

    function dn(t) {
        var e = t[0], n = t[1], r = t[2], i = t[3];
        if (me(t.slice(0, 2), [r, n]) >= me(t.slice(0, 2), [e, i])) {
            var o = (n + i) / 2;
            return [e, o - (r - e) / 2, r, o + (r - e) / 2]
        }
        var s = (e + r) / 2;
        return [s - (i - n) / 2, n, s + (i - n) / 2, i]
    }

    function yn(t, e, n, r) {
        void 0 === r && (r = {});
        var i = R(t), o = I(i[0]), s = I(i[1]), u = I(n), l = x(e, r.units),
            c = Math.asin(Math.sin(s) * Math.cos(l) + Math.cos(s) * Math.sin(l) * Math.cos(u));
        return a([w(o + Math.atan2(Math.sin(u) * Math.sin(l) * Math.cos(s), Math.cos(l) - Math.sin(s) * Math.sin(c))), w(c)], r.properties)
    }

    function vn(t, e, n) {
        void 0 === n && (n = {});
        for (var r = n.steps || 64, i = n.properties ? n.properties : !Array.isArray(t) && "Feature" === t.type && t.properties ? t.properties : {}, o = [], s = 0; s < r; s++) o.push(yn(t, e, -360 * s / r, n).geometry.coordinates);
        return o.push(o[0]), l([o], i)
    }

    function _n(t, e, n) {
        if (void 0 === n && (n = {}), !0 === n.final) return function (t, e) {
            var n = _n(e, t);
            return n = (n + 180) % 360
        }(t, e);
        var r = R(t), i = R(e), o = I(r[0]), s = I(i[0]), a = I(r[1]), u = I(i[1]), l = Math.sin(s - o) * Math.cos(u),
            c = Math.cos(a) * Math.sin(u) - Math.sin(a) * Math.cos(u) * Math.cos(s - o);
        return w(Math.atan2(l, c))
    }

    function mn(t, e) {
        void 0 === e && (e = {});
        var n = ot(t);
        return a([(n[0] + n[2]) / 2, (n[1] + n[3]) / 2], e.properties, e)
    }

    function xn(t, e) {
        void 0 === e && (e = {});
        var n = 0, r = 0, i = 0;
        return z(t, (function (t) {
            n += t[0], r += t[1], i++
        }), !0), a([n / i, r / i], e.properties)
    }

    function En(t) {
        var e = [];
        return "FeatureCollection" === t.type ? X(t, (function (t) {
            z(t, (function (n) {
                e.push(a(n, t.properties))
            }))
        })) : z(t, (function (n) {
            e.push(a(n, t.properties))
        })), f(e)
    }

    var bn = In, wn = In;

    function In(t, e, n) {
        n = n || 2;
        var r, i, o, s, a, u, l, c = e && e.length, h = c ? e[0] * n : t.length, p = Nn(t, 0, h, n, !0), f = [];
        if (!p) return f;
        if (c && (p = function (t, e, n, r) {
            var i, o, s, a = [];
            for (i = 0, o = e.length; i < o; i++) (s = Nn(t, e[i] * r, i < o - 1 ? e[i + 1] * r : t.length, r, !1)) === s.next && (s.steiner = !0), a.push(Dn(s));
            for (a.sort(Rn), i = 0; i < a.length; i++) Tn(a[i], n), n = Sn(n, n.next);
            return n
        }(t, e, p, n)), t.length > 80 * n) {
            r = o = t[0], i = s = t[1];
            for (var g = n; g < h; g += n) (a = t[g]) < r && (r = a), (u = t[g + 1]) < i && (i = u), a > o && (o = a), u > s && (s = u);
            l = 0 !== (l = Math.max(o - r, s - i)) ? 1 / l : 0
        }
        return Cn(p, f, n, r, i, l), f
    }

    function Nn(t, e, n, r, i) {
        var o, s;
        if (i === Yn(t, e, n, r) > 0) for (o = e; o < n; o += r) s = Un(o, t[o], t[o + 1], s); else for (o = n - r; o >= e; o -= r) s = Un(o, t[o], t[o + 1], s);
        return s && qn(s, s.next) && (Vn(s), s = s.next), s
    }

    function Sn(t, e) {
        if (!t) return t;
        e || (e = t);
        var n, r = t;
        do {
            if (n = !1, r.steiner || !qn(r, r.next) && 0 !== Gn(r.prev, r, r.next)) r = r.next; else {
                if (Vn(r), (r = e = r.prev) === r.next) break;
                n = !0
            }
        } while (n || r !== e);
        return e
    }

    function Cn(t, e, n, r, i, o, s) {
        if (t) {
            !s && o && function (t, e, n, r) {
                var i = t;
                do {
                    null === i.z && (i.z = An(i.x, i.y, e, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next
                } while (i !== t);
                i.prevZ.nextZ = null, i.prevZ = null, function (t) {
                    var e, n, r, i, o, s, a, u, l = 1;
                    do {
                        for (n = t, t = null, o = null, s = 0; n;) {
                            for (s++, r = n, a = 0, e = 0; e < l && (a++, r = r.nextZ); e++) ;
                            for (u = l; a > 0 || u > 0 && r;) 0 !== a && (0 === u || !r || n.z <= r.z) ? (i = n, n = n.nextZ, a--) : (i = r, r = r.nextZ, u--), o ? o.nextZ = i : t = i, i.prevZ = o, o = i;
                            n = r
                        }
                        o.nextZ = null, l *= 2
                    } while (s > 1)
                }(i)
            }(t, r, i, o);
            for (var a, u, l = t; t.prev !== t.next;) if (a = t.prev, u = t.next, o ? Ln(t, r, i, o) : Pn(t)) e.push(a.i / n), e.push(t.i / n), e.push(u.i / n), Vn(t), t = u.next, l = u.next; else if ((t = u) === l) {
                s ? 1 === s ? Cn(t = Mn(t, e, n), e, n, r, i, o, 2) : 2 === s && On(t, e, n, r, i, o) : Cn(Sn(t), e, n, r, i, o, 1);
                break
            }
        }
    }

    function Pn(t) {
        var e = t.prev, n = t, r = t.next;
        if (Gn(e, n, r) >= 0) return !1;
        for (var i = t.next.next; i !== t.prev;) {
            if (Fn(e.x, e.y, n.x, n.y, r.x, r.y, i.x, i.y) && Gn(i.prev, i, i.next) >= 0) return !1;
            i = i.next
        }
        return !0
    }

    function Ln(t, e, n, r) {
        var i = t.prev, o = t, s = t.next;
        if (Gn(i, o, s) >= 0) return !1;
        for (var a = i.x < o.x ? i.x < s.x ? i.x : s.x : o.x < s.x ? o.x : s.x, u = i.y < o.y ? i.y < s.y ? i.y : s.y : o.y < s.y ? o.y : s.y, l = i.x > o.x ? i.x > s.x ? i.x : s.x : o.x > s.x ? o.x : s.x, c = i.y > o.y ? i.y > s.y ? i.y : s.y : o.y > s.y ? o.y : s.y, h = An(a, u, e, n, r), p = An(l, c, e, n, r), f = t.prevZ, g = t.nextZ; f && f.z >= h && g && g.z <= p;) {
            if (f !== t.prev && f !== t.next && Fn(i.x, i.y, o.x, o.y, s.x, s.y, f.x, f.y) && Gn(f.prev, f, f.next) >= 0) return !1;
            if (f = f.prevZ, g !== t.prev && g !== t.next && Fn(i.x, i.y, o.x, o.y, s.x, s.y, g.x, g.y) && Gn(g.prev, g, g.next) >= 0) return !1;
            g = g.nextZ
        }
        for (; f && f.z >= h;) {
            if (f !== t.prev && f !== t.next && Fn(i.x, i.y, o.x, o.y, s.x, s.y, f.x, f.y) && Gn(f.prev, f, f.next) >= 0) return !1;
            f = f.prevZ
        }
        for (; g && g.z <= p;) {
            if (g !== t.prev && g !== t.next && Fn(i.x, i.y, o.x, o.y, s.x, s.y, g.x, g.y) && Gn(g.prev, g, g.next) >= 0) return !1;
            g = g.nextZ
        }
        return !0
    }

    function Mn(t, e, n) {
        var r = t;
        do {
            var i = r.prev, o = r.next.next;
            !qn(i, o) && Bn(i, r, r.next, o) && zn(i, o) && zn(o, i) && (e.push(i.i / n), e.push(r.i / n), e.push(o.i / n), Vn(r), Vn(r.next), r = t = o), r = r.next
        } while (r !== t);
        return r
    }

    function On(t, e, n, r, i, o) {
        var s = t;
        do {
            for (var a = s.next.next; a !== s.prev;) {
                if (s.i !== a.i && kn(s, a)) {
                    var u = jn(s, a);
                    return s = Sn(s, s.next), u = Sn(u, u.next), Cn(s, e, n, r, i, o), void Cn(u, e, n, r, i, o)
                }
                a = a.next
            }
            s = s.next
        } while (s !== t)
    }

    function Rn(t, e) {
        return t.x - e.x
    }

    function Tn(t, e) {
        if (e = function (t, e) {
            var n, r = e, i = t.x, o = t.y, s = -1 / 0;
            do {
                if (o <= r.y && o >= r.next.y && r.next.y !== r.y) {
                    var a = r.x + (o - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                    if (a <= i && a > s) {
                        if (s = a, a === i) {
                            if (o === r.y) return r;
                            if (o === r.next.y) return r.next
                        }
                        n = r.x < r.next.x ? r : r.next
                    }
                }
                r = r.next
            } while (r !== e);
            if (!n) return null;
            if (i === s) return n.prev;
            var u, l = n, c = n.x, h = n.y, p = 1 / 0;
            r = n.next;
            for (; r !== l;) i >= r.x && r.x >= c && i !== r.x && Fn(o < h ? i : s, o, c, h, o < h ? s : i, o, r.x, r.y) && ((u = Math.abs(o - r.y) / (i - r.x)) < p || u === p && r.x > n.x) && zn(r, t) && (n = r, p = u), r = r.next;
            return n
        }(t, e)) {
            var n = jn(e, t);
            Sn(n, n.next)
        }
    }

    function An(t, e, n, r, i) {
        return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - n) * i) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - r) * i) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
    }

    function Dn(t) {
        var e = t, n = t;
        do {
            e.x < n.x && (n = e), e = e.next
        } while (e !== t);
        return n
    }

    function Fn(t, e, n, r, i, o, s, a) {
        return (i - s) * (e - a) - (t - s) * (o - a) >= 0 && (t - s) * (r - a) - (n - s) * (e - a) >= 0 && (n - s) * (o - a) - (i - s) * (r - a) >= 0
    }

    function kn(t, e) {
        return t.next.i !== e.i && t.prev.i !== e.i && !function (t, e) {
            var n = t;
            do {
                if (n.i !== t.i && n.next.i !== t.i && n.i !== e.i && n.next.i !== e.i && Bn(n, n.next, t, e)) return !0;
                n = n.next
            } while (n !== t);
            return !1
        }(t, e) && zn(t, e) && zn(e, t) && function (t, e) {
            var n = t, r = !1, i = (t.x + e.x) / 2, o = (t.y + e.y) / 2;
            do {
                n.y > o != n.next.y > o && n.next.y !== n.y && i < (n.next.x - n.x) * (o - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next
            } while (n !== t);
            return r
        }(t, e)
    }

    function Gn(t, e, n) {
        return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y)
    }

    function qn(t, e) {
        return t.x === e.x && t.y === e.y
    }

    function Bn(t, e, n, r) {
        return !!(qn(t, e) && qn(n, r) || qn(t, r) && qn(n, e)) || Gn(t, e, n) > 0 != Gn(t, e, r) > 0 && Gn(n, r, t) > 0 != Gn(n, r, e) > 0
    }

    function zn(t, e) {
        return Gn(t.prev, t, t.next) < 0 ? Gn(t, e, t.next) >= 0 && Gn(t, t.prev, e) >= 0 : Gn(t, e, t.prev) < 0 || Gn(t, t.next, e) < 0
    }

    function jn(t, e) {
        var n = new Xn(t.i, t.x, t.y), r = new Xn(e.i, e.x, e.y), i = t.next, o = e.prev;
        return t.next = e, e.prev = t, n.next = i, i.prev = n, r.next = n, n.prev = r, o.next = r, r.prev = o, r
    }

    function Un(t, e, n, r) {
        var i = new Xn(t, e, n);
        return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i
    }

    function Vn(t) {
        t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
    }

    function Xn(t, e, n) {
        this.i = t, this.x = e, this.y = n, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
    }

    function Yn(t, e, n, r) {
        for (var i = 0, o = e, s = n - r; o < n; o += r) i += (t[s] - t[o]) * (t[o + 1] + t[s + 1]), s = o;
        return i
    }

    function Hn(t) {
        var e = function (t) {
            for (var e = t[0][0].length, n = {
                vertices: [],
                holes: [],
                dimensions: e
            }, r = 0, i = 0; i < t.length; i++) {
                for (var o = 0; o < t[i].length; o++) for (var s = 0; s < e; s++) n.vertices.push(t[i][o][s]);
                i > 0 && (r += t[i - 1].length, n.holes.push(r))
            }
            return n
        }(t), n = bn(e.vertices, e.holes, 2), r = [], i = [];
        n.forEach((function (t, r) {
            var o = n[r];
            i.push([e.vertices[2 * o], e.vertices[2 * o + 1]])
        }));
        for (var o = 0; o < i.length; o += 3) {
            var s = i.slice(o, o + 3);
            s.push(i[o]), r.push(l([s]))
        }
        return r
    }

    function Wn(t, e) {
        if (!t) throw new Error("targetPoint is required");
        if (!e) throw new Error("points is required");
        var n, r = 1 / 0, i = 0;
        return X(e, (function (e, n) {
            var o = me(t, e);
            o < r && (i = n, r = o)
        })), (n = Ie(e.features[i])).properties.featureIndex = i, n.properties.distanceToPoint = r, n
    }

    function Jn(t) {
        if (!t) throw new Error("geojson is required");
        var e = [];
        return Z(t, (function (t) {
            !function (t, e) {
                var n = [], r = t.geometry;
                if (null !== r) {
                    switch (r.type) {
                        case"Polygon":
                            n = T(r);
                            break;
                        case"LineString":
                            n = [T(r)]
                    }
                    n.forEach((function (n) {
                        (function (t, e) {
                            var n = [];
                            return t.reduce((function (t, r) {
                                var i = h([t, r], e);
                                return i.bbox = function (t, e) {
                                    var n = t[0], r = t[1], i = e[0], o = e[1];
                                    return [n < i ? n : i, r < o ? r : o, n > i ? n : i, r > o ? r : o]
                                }(t, r), n.push(i), r
                            })), n
                        })(n, t.properties).forEach((function (t) {
                            t.id = e.length, e.push(t)
                        }))
                    }))
                }
            }(t, e)
        })), f(e)
    }

    In.deviation = function (t, e, n, r) {
        var i = e && e.length, o = i ? e[0] * n : t.length, s = Math.abs(Yn(t, 0, o, n));
        if (i) for (var a = 0, u = e.length; a < u; a++) {
            var l = e[a] * n, c = a < u - 1 ? e[a + 1] * n : t.length;
            s -= Math.abs(Yn(t, l, c, n))
        }
        var h = 0;
        for (a = 0; a < r.length; a += 3) {
            var p = r[a] * n, f = r[a + 1] * n, g = r[a + 2] * n;
            h += Math.abs((t[p] - t[g]) * (t[f + 1] - t[p + 1]) - (t[p] - t[f]) * (t[g + 1] - t[p + 1]))
        }
        return 0 === s && 0 === h ? 0 : Math.abs((h - s) / s)
    }, In.flatten = function (t) {
        for (var e = t[0][0].length, n = {vertices: [], holes: [], dimensions: e}, r = 0, i = 0; i < t.length; i++) {
            for (var o = 0; o < t[i].length; o++) for (var s = 0; s < e; s++) n.vertices.push(t[i][o][s]);
            i > 0 && (r += t[i - 1].length, n.holes.push(r))
        }
        return n
    }, bn.default = wn;
    var Zn = Bt((function (t, e) {
        function n(t, e, n) {
            void 0 === n && (n = {});
            var r = {type: "Feature"};
            return (0 === n.id || n.id) && (r.id = n.id), n.bbox && (r.bbox = n.bbox), r.properties = e || {}, r.geometry = t, r
        }

        function r(t, e, r) {
            if (void 0 === r && (r = {}), !t) throw new Error("coordinates is required");
            if (!Array.isArray(t)) throw new Error("coordinates must be an Array");
            if (t.length < 2) throw new Error("coordinates must be at least 2 numbers long");
            if (!f(t[0]) || !f(t[1])) throw new Error("coordinates must contain numbers");
            return n({type: "Point", coordinates: t}, e, r)
        }

        function i(t, e, r) {
            void 0 === r && (r = {});
            for (var i = 0, o = t; i < o.length; i++) {
                var s = o[i];
                if (s.length < 4) throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
                for (var a = 0; a < s[s.length - 1].length; a++) if (s[s.length - 1][a] !== s[0][a]) throw new Error("First and last Position are not equivalent.")
            }
            return n({type: "Polygon", coordinates: t}, e, r)
        }

        function o(t, e, r) {
            if (void 0 === r && (r = {}), t.length < 2) throw new Error("coordinates must be an array of two or more positions");
            return n({type: "LineString", coordinates: t}, e, r)
        }

        function s(t, e) {
            void 0 === e && (e = {});
            var n = {type: "FeatureCollection"};
            return e.id && (n.id = e.id), e.bbox && (n.bbox = e.bbox), n.features = t, n
        }

        function a(t, e, r) {
            return void 0 === r && (r = {}), n({type: "MultiLineString", coordinates: t}, e, r)
        }

        function u(t, e, r) {
            return void 0 === r && (r = {}), n({type: "MultiPoint", coordinates: t}, e, r)
        }

        function l(t, e, r) {
            return void 0 === r && (r = {}), n({type: "MultiPolygon", coordinates: t}, e, r)
        }

        function c(t, n) {
            void 0 === n && (n = "kilometers");
            var r = e.factors[n];
            if (!r) throw new Error(n + " units is invalid");
            return t * r
        }

        function h(t, n) {
            void 0 === n && (n = "kilometers");
            var r = e.factors[n];
            if (!r) throw new Error(n + " units is invalid");
            return t / r
        }

        function p(t) {
            return 180 * (t % (2 * Math.PI)) / Math.PI
        }

        function f(t) {
            return !isNaN(t) && null !== t && !Array.isArray(t)
        }

        Object.defineProperty(e, "__esModule", {value: !0}), e.earthRadius = 6371008.8, e.factors = {
            centimeters: 100 * e.earthRadius,
            centimetres: 100 * e.earthRadius,
            degrees: e.earthRadius / 111325,
            feet: 3.28084 * e.earthRadius,
            inches: 39.37 * e.earthRadius,
            kilometers: e.earthRadius / 1e3,
            kilometres: e.earthRadius / 1e3,
            meters: e.earthRadius,
            metres: e.earthRadius,
            miles: e.earthRadius / 1609.344,
            millimeters: 1e3 * e.earthRadius,
            millimetres: 1e3 * e.earthRadius,
            nauticalmiles: e.earthRadius / 1852,
            radians: 1,
            yards: e.earthRadius / 1.0936
        }, e.unitsFactors = {
            centimeters: 100,
            centimetres: 100,
            degrees: 1 / 111325,
            feet: 3.28084,
            inches: 39.37,
            kilometers: .001,
            kilometres: .001,
            meters: 1,
            metres: 1,
            miles: 1 / 1609.344,
            millimeters: 1e3,
            millimetres: 1e3,
            nauticalmiles: 1 / 1852,
            radians: 1 / e.earthRadius,
            yards: 1 / 1.0936
        }, e.areaFactors = {
            acres: 247105e-9,
            centimeters: 1e4,
            centimetres: 1e4,
            feet: 10.763910417,
            hectares: 1e-4,
            inches: 1550.003100006,
            kilometers: 1e-6,
            kilometres: 1e-6,
            meters: 1,
            metres: 1,
            miles: 386e-9,
            millimeters: 1e6,
            millimetres: 1e6,
            yards: 1.195990046
        }, e.feature = n, e.geometry = function (t, e, n) {
            switch (t) {
                case"Point":
                    return r(e).geometry;
                case"LineString":
                    return o(e).geometry;
                case"Polygon":
                    return i(e).geometry;
                case"MultiPoint":
                    return u(e).geometry;
                case"MultiLineString":
                    return a(e).geometry;
                case"MultiPolygon":
                    return l(e).geometry;
                default:
                    throw new Error(t + " is invalid")
            }
        }, e.point = r, e.points = function (t, e, n) {
            return void 0 === n && (n = {}), s(t.map((function (t) {
                return r(t, e)
            })), n)
        }, e.polygon = i, e.polygons = function (t, e, n) {
            return void 0 === n && (n = {}), s(t.map((function (t) {
                return i(t, e)
            })), n)
        }, e.lineString = o, e.lineStrings = function (t, e, n) {
            return void 0 === n && (n = {}), s(t.map((function (t) {
                return o(t, e)
            })), n)
        }, e.featureCollection = s, e.multiLineString = a, e.multiPoint = u, e.multiPolygon = l, e.geometryCollection = function (t, e, r) {
            return void 0 === r && (r = {}), n({type: "GeometryCollection", geometries: t}, e, r)
        }, e.round = function (t, e) {
            if (void 0 === e && (e = 0), e && !(e >= 0)) throw new Error("precision must be a positive number");
            var n = Math.pow(10, e || 0);
            return Math.round(t * n) / n
        }, e.radiansToLength = c, e.lengthToRadians = h, e.lengthToDegrees = function (t, e) {
            return p(h(t, e))
        }, e.bearingToAzimuth = function (t) {
            var e = t % 360;
            return e < 0 && (e += 360), e
        }, e.radiansToDegrees = p, e.degreesToRadians = function (t) {
            return t % 360 * Math.PI / 180
        }, e.convertLength = function (t, e, n) {
            if (void 0 === e && (e = "kilometers"), void 0 === n && (n = "kilometers"), !(t >= 0)) throw new Error("length must be a positive number");
            return c(h(t, e), n)
        }, e.convertArea = function (t, n, r) {
            if (void 0 === n && (n = "meters"), void 0 === r && (r = "kilometers"), !(t >= 0)) throw new Error("area must be a positive number");
            var i = e.areaFactors[n];
            if (!i) throw new Error("invalid original units");
            var o = e.areaFactors[r];
            if (!o) throw new Error("invalid final units");
            return t / i * o
        }, e.isNumber = f, e.isObject = function (t) {
            return !!t && t.constructor === Object
        }, e.validateBBox = function (t) {
            if (!t) throw new Error("bbox is required");
            if (!Array.isArray(t)) throw new Error("bbox must be an Array");
            if (4 !== t.length && 6 !== t.length) throw new Error("bbox must be an Array of 4 or 6 numbers");
            t.forEach((function (t) {
                if (!f(t)) throw new Error("bbox must only contain numbers")
            }))
        }, e.validateId = function (t) {
            if (!t) throw new Error("id is required");
            if (-1 === ["string", "number"].indexOf(typeof t)) throw new Error("id must be a number or a string")
        }
    }));

    function Kn(t, e, n) {
        if (null !== t) for (var r, i, o, s, a, u, l, c, h = 0, p = 0, f = t.type, g = "FeatureCollection" === f, d = "Feature" === f, y = g ? t.features.length : 1, v = 0; v < y; v++) {
            a = (c = !!(l = g ? t.features[v].geometry : d ? t.geometry : t) && "GeometryCollection" === l.type) ? l.geometries.length : 1;
            for (var _ = 0; _ < a; _++) {
                var m = 0, x = 0;
                if (null !== (s = c ? l.geometries[_] : l)) {
                    u = s.coordinates;
                    var E = s.type;
                    switch (h = !n || "Polygon" !== E && "MultiPolygon" !== E ? 0 : 1, E) {
                        case null:
                            break;
                        case"Point":
                            if (!1 === e(u, p, v, m, x)) return !1;
                            p++, m++;
                            break;
                        case"LineString":
                        case"MultiPoint":
                            for (r = 0; r < u.length; r++) {
                                if (!1 === e(u[r], p, v, m, x)) return !1;
                                p++, "MultiPoint" === E && m++
                            }
                            "LineString" === E && m++;
                            break;
                        case"Polygon":
                        case"MultiLineString":
                            for (r = 0; r < u.length; r++) {
                                for (i = 0; i < u[r].length - h; i++) {
                                    if (!1 === e(u[r][i], p, v, m, x)) return !1;
                                    p++
                                }
                                "MultiLineString" === E && m++, "Polygon" === E && x++
                            }
                            "Polygon" === E && m++;
                            break;
                        case"MultiPolygon":
                            for (r = 0; r < u.length; r++) {
                                for (x = 0, i = 0; i < u[r].length; i++) {
                                    for (o = 0; o < u[r][i].length - h; o++) {
                                        if (!1 === e(u[r][i][o], p, v, m, x)) return !1;
                                        p++
                                    }
                                    x++
                                }
                                m++
                            }
                            break;
                        case"GeometryCollection":
                            for (r = 0; r < s.geometries.length; r++) if (!1 === Kn(s.geometries[r], e, n)) return !1;
                            break;
                        default:
                            throw new Error("Unknown Geometry Type")
                    }
                }
            }
        }
    }

    function Qn(t, e) {
        var n;
        switch (t.type) {
            case"FeatureCollection":
                for (n = 0; n < t.features.length && !1 !== e(t.features[n].properties, n); n++) ;
                break;
            case"Feature":
                e(t.properties, 0)
        }
    }

    function $n(t, e) {
        if ("Feature" === t.type) e(t, 0); else if ("FeatureCollection" === t.type) for (var n = 0; n < t.features.length && !1 !== e(t.features[n], n); n++) ;
    }

    function tr(t, e) {
        var n, r, i, o, s, a, u, l, c, h, p = 0, f = "FeatureCollection" === t.type, g = "Feature" === t.type,
            d = f ? t.features.length : 1;
        for (n = 0; n < d; n++) {
            for (a = f ? t.features[n].geometry : g ? t.geometry : t, l = f ? t.features[n].properties : g ? t.properties : {}, c = f ? t.features[n].bbox : g ? t.bbox : void 0, h = f ? t.features[n].id : g ? t.id : void 0, s = (u = !!a && "GeometryCollection" === a.type) ? a.geometries.length : 1, i = 0; i < s; i++) if (null !== (o = u ? a.geometries[i] : a)) switch (o.type) {
                case"Point":
                case"LineString":
                case"MultiPoint":
                case"Polygon":
                case"MultiLineString":
                case"MultiPolygon":
                    if (!1 === e(o, p, l, c, h)) return !1;
                    break;
                case"GeometryCollection":
                    for (r = 0; r < o.geometries.length; r++) if (!1 === e(o.geometries[r], p, l, c, h)) return !1;
                    break;
                default:
                    throw new Error("Unknown Geometry Type")
            } else if (!1 === e(null, p, l, c, h)) return !1;
            p++
        }
    }

    function er(t, e) {
        tr(t, (function (t, n, r, i, o) {
            var s, a = null === t ? null : t.type;
            switch (a) {
                case null:
                case"Point":
                case"LineString":
                case"Polygon":
                    return !1 !== e(Zn.feature(t, r, {bbox: i, id: o}), n, 0) && void 0
            }
            switch (a) {
                case"MultiPoint":
                    s = "Point";
                    break;
                case"MultiLineString":
                    s = "LineString";
                    break;
                case"MultiPolygon":
                    s = "Polygon"
            }
            for (var u = 0; u < t.coordinates.length; u++) {
                var l = {type: s, coordinates: t.coordinates[u]};
                if (!1 === e(Zn.feature(l, r), n, u)) return !1
            }
        }))
    }

    function nr(t, e) {
        er(t, (function (t, n, r) {
            var i = 0;
            if (t.geometry) {
                var o = t.geometry.type;
                if ("Point" !== o && "MultiPoint" !== o) {
                    var s, a = 0, u = 0, l = 0;
                    return !1 !== Kn(t, (function (o, c, h, p, f) {
                        if (void 0 === s || n > a || p > u || f > l) return s = o, a = n, u = p, l = f, void (i = 0);
                        var g = Zn.lineString([s, o], t.properties);
                        if (!1 === e(g, n, r, f, i)) return !1;
                        i++, s = o
                    })) && void 0
                }
            }
        }))
    }

    function rr(t, e) {
        if (!t) throw new Error("geojson is required");
        er(t, (function (t, n, r) {
            if (null !== t.geometry) {
                var i = t.geometry.type, o = t.geometry.coordinates;
                switch (i) {
                    case"LineString":
                        if (!1 === e(t, n, r, 0, 0)) return !1;
                        break;
                    case"Polygon":
                        for (var s = 0; s < o.length; s++) if (!1 === e(Zn.lineString(o[s], t.properties), n, r, s)) return !1
                }
            }
        }))
    }

    var ir = Kn, or = function (t, e, n, r) {
        var i = n;
        return Kn(t, (function (t, r, o, s, a) {
            i = 0 === r && void 0 === n ? t : e(i, t, r, o, s, a)
        }), r), i
    }, sr = Qn, ar = function (t, e, n) {
        var r = n;
        return Qn(t, (function (t, i) {
            r = 0 === i && void 0 === n ? t : e(r, t, i)
        })), r
    }, ur = $n, lr = function (t, e, n) {
        var r = n;
        return $n(t, (function (t, i) {
            r = 0 === i && void 0 === n ? t : e(r, t, i)
        })), r
    }, cr = function (t) {
        var e = [];
        return Kn(t, (function (t) {
            e.push(t)
        })), e
    }, hr = tr, pr = function (t, e, n) {
        var r = n;
        return tr(t, (function (t, i, o, s, a) {
            r = 0 === i && void 0 === n ? t : e(r, t, i, o, s, a)
        })), r
    }, fr = er, gr = function (t, e, n) {
        var r = n;
        return er(t, (function (t, i, o) {
            r = 0 === i && 0 === o && void 0 === n ? t : e(r, t, i, o)
        })), r
    }, dr = nr, yr = function (t, e, n) {
        var r = n, i = !1;
        return nr(t, (function (t, o, s, a, u) {
            r = !1 === i && void 0 === n ? t : e(r, t, o, s, a, u), i = !0
        })), r
    }, vr = rr, _r = function (t, e, n) {
        var r = n;
        return rr(t, (function (t, i, o, s) {
            r = 0 === i && void 0 === n ? t : e(r, t, i, o, s)
        })), r
    }, mr = function (t, e) {
        if (e = e || {}, !Zn.isObject(e)) throw new Error("options is invalid");
        var n, r = e.featureIndex || 0, i = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, s = e.segmentIndex || 0,
            a = e.properties;
        switch (t.type) {
            case"FeatureCollection":
                r < 0 && (r = t.features.length + r), a = a || t.features[r].properties, n = t.features[r].geometry;
                break;
            case"Feature":
                a = a || t.properties, n = t.geometry;
                break;
            case"Point":
            case"MultiPoint":
                return null;
            case"LineString":
            case"Polygon":
            case"MultiLineString":
            case"MultiPolygon":
                n = t;
                break;
            default:
                throw new Error("geojson is invalid")
        }
        if (null === n) return null;
        var u = n.coordinates;
        switch (n.type) {
            case"Point":
            case"MultiPoint":
                return null;
            case"LineString":
                return s < 0 && (s = u.length + s - 1), Zn.lineString([u[s], u[s + 1]], a, e);
            case"Polygon":
                return o < 0 && (o = u.length + o), s < 0 && (s = u[o].length + s - 1), Zn.lineString([u[o][s], u[o][s + 1]], a, e);
            case"MultiLineString":
                return i < 0 && (i = u.length + i), s < 0 && (s = u[i].length + s - 1), Zn.lineString([u[i][s], u[i][s + 1]], a, e);
            case"MultiPolygon":
                return i < 0 && (i = u.length + i), o < 0 && (o = u[i].length + o), s < 0 && (s = u[i][o].length - s - 1), Zn.lineString([u[i][o][s], u[i][o][s + 1]], a, e)
        }
        throw new Error("geojson is invalid")
    }, xr = function (t, e) {
        if (e = e || {}, !Zn.isObject(e)) throw new Error("options is invalid");
        var n, r = e.featureIndex || 0, i = e.multiFeatureIndex || 0, o = e.geometryIndex || 0, s = e.coordIndex || 0,
            a = e.properties;
        switch (t.type) {
            case"FeatureCollection":
                r < 0 && (r = t.features.length + r), a = a || t.features[r].properties, n = t.features[r].geometry;
                break;
            case"Feature":
                a = a || t.properties, n = t.geometry;
                break;
            case"Point":
            case"MultiPoint":
                return null;
            case"LineString":
            case"Polygon":
            case"MultiLineString":
            case"MultiPolygon":
                n = t;
                break;
            default:
                throw new Error("geojson is invalid")
        }
        if (null === n) return null;
        var u = n.coordinates;
        switch (n.type) {
            case"Point":
                return Zn.point(u, a, e);
            case"MultiPoint":
                return i < 0 && (i = u.length + i), Zn.point(u[i], a, e);
            case"LineString":
                return s < 0 && (s = u.length + s), Zn.point(u[s], a, e);
            case"Polygon":
                return o < 0 && (o = u.length + o), s < 0 && (s = u[o].length + s), Zn.point(u[o][s], a, e);
            case"MultiLineString":
                return i < 0 && (i = u.length + i), s < 0 && (s = u[i].length + s), Zn.point(u[i][s], a, e);
            case"MultiPolygon":
                return i < 0 && (i = u.length + i), o < 0 && (o = u[i].length + o), s < 0 && (s = u[i][o].length - s), Zn.point(u[i][o][s], a, e)
        }
        throw new Error("geojson is invalid")
    }, Er = Object.defineProperty({
        coordEach: ir,
        coordReduce: or,
        propEach: sr,
        propReduce: ar,
        featureEach: ur,
        featureReduce: lr,
        coordAll: cr,
        geomEach: hr,
        geomReduce: pr,
        flattenEach: fr,
        flattenReduce: gr,
        segmentEach: dr,
        segmentReduce: yr,
        lineEach: vr,
        lineReduce: _r,
        findSegment: mr,
        findPoint: xr
    }, "__esModule", {value: !0});

    function br(t) {
        var e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
        return Er.coordEach(t, (function (t) {
            e[0] > t[0] && (e[0] = t[0]), e[1] > t[1] && (e[1] = t[1]), e[2] < t[0] && (e[2] = t[0]), e[3] < t[1] && (e[3] = t[1])
        })), e
    }

    br.default = br;
    var wr = br, Ir = Object.defineProperty({default: wr}, "__esModule", {value: !0}).default, Nr = Er.featureEach,
        Sr = (Er.coordEach, Zn.polygon, Zn.featureCollection);

    function Cr(t) {
        var e = Nt(t);
        return e.insert = function (t) {
            if ("Feature" !== t.type) throw new Error("invalid feature");
            return t.bbox = t.bbox ? t.bbox : Ir(t), Nt.prototype.insert.call(this, t)
        }, e.load = function (t) {
            var e = [];
            return Array.isArray(t) ? t.forEach((function (t) {
                if ("Feature" !== t.type) throw new Error("invalid features");
                t.bbox = t.bbox ? t.bbox : Ir(t), e.push(t)
            })) : Nr(t, (function (t) {
                if ("Feature" !== t.type) throw new Error("invalid features");
                t.bbox = t.bbox ? t.bbox : Ir(t), e.push(t)
            })), Nt.prototype.load.call(this, e)
        }, e.remove = function (t, e) {
            if ("Feature" !== t.type) throw new Error("invalid feature");
            return t.bbox = t.bbox ? t.bbox : Ir(t), Nt.prototype.remove.call(this, t, e)
        }, e.clear = function () {
            return Nt.prototype.clear.call(this)
        }, e.search = function (t) {
            var e = Nt.prototype.search.call(this, this.toBBox(t));
            return Sr(e)
        }, e.collides = function (t) {
            return Nt.prototype.collides.call(this, this.toBBox(t))
        }, e.all = function () {
            var t = Nt.prototype.all.call(this);
            return Sr(t)
        }, e.toJSON = function () {
            return Nt.prototype.toJSON.call(this)
        }, e.fromJSON = function (t) {
            return Nt.prototype.fromJSON.call(this, t)
        }, e.toBBox = function (t) {
            var e;
            if (t.bbox) e = t.bbox; else if (Array.isArray(t) && 4 === t.length) e = t; else if (Array.isArray(t) && 6 === t.length) e = [t[0], t[1], t[3], t[4]]; else if ("Feature" === t.type) e = Ir(t); else {
                if ("FeatureCollection" !== t.type) throw new Error("invalid geojson");
                e = Ir(t)
            }
            return {minX: e[0], minY: e[1], maxX: e[2], maxY: e[3]}
        }, e
    }

    var Pr = Cr, Lr = Cr;

    function Mr(t, e) {
        var n = {}, r = [];
        if ("LineString" === t.type && (t = o(t)), "LineString" === e.type && (e = o(e)), "Feature" === t.type && "Feature" === e.type && null !== t.geometry && null !== e.geometry && "LineString" === t.geometry.type && "LineString" === e.geometry.type && 2 === t.geometry.coordinates.length && 2 === e.geometry.coordinates.length) {
            var i = Or(t, e);
            return i && r.push(i), f(r)
        }
        var s = Pr();
        return s.load(Jn(e)), X(Jn(t), (function (t) {
            X(s.search(t), (function (e) {
                var i = Or(t, e);
                if (i) {
                    var o = T(i).join(",");
                    n[o] || (n[o] = !0, r.push(i))
                }
            }))
        })), f(r)
    }

    function Or(t, e) {
        var n = T(t), r = T(e);
        if (2 !== n.length) throw new Error("<intersects> line1 must only contain 2 coordinates");
        if (2 !== r.length) throw new Error("<intersects> line2 must only contain 2 coordinates");
        var i = n[0][0], o = n[0][1], s = n[1][0], u = n[1][1], l = r[0][0], c = r[0][1], h = r[1][0], p = r[1][1],
            f = (p - c) * (s - i) - (h - l) * (u - o), g = (h - l) * (o - c) - (p - c) * (i - l),
            d = (s - i) * (o - c) - (u - o) * (i - l);
        if (0 === f) return null;
        var y = g / f, v = d / f;
        return y >= 0 && y <= 1 && v >= 0 && v <= 1 ? a([i + y * (s - i), o + y * (u - o)]) : null
    }

    function Rr(t, e, n) {
        void 0 === n && (n = {});
        var r = a([1 / 0, 1 / 0], {dist: 1 / 0}), i = 0;
        return Z(t, (function (t) {
            for (var o = T(t), s = 0; s < o.length - 1; s++) {
                var u = a(o[s]);
                u.properties.dist = me(e, u, n);
                var l = a(o[s + 1]);
                l.properties.dist = me(e, l, n);
                var c = me(u, l, n), p = Math.max(u.properties.dist, l.properties.dist), f = _n(u, l),
                    g = yn(e, p, f + 90, n), d = yn(e, p, f - 90, n),
                    y = Mr(h([g.geometry.coordinates, d.geometry.coordinates]), h([u.geometry.coordinates, l.geometry.coordinates])),
                    v = null;
                y.features.length > 0 && ((v = y.features[0]).properties.dist = me(e, v, n), v.properties.location = i + me(u, v, n)), u.properties.dist < r.properties.dist && ((r = u).properties.index = s, r.properties.location = i), l.properties.dist < r.properties.dist && ((r = l).properties.index = s + 1, r.properties.location = i + c), v && v.properties.dist < r.properties.dist && ((r = v).properties.index = s), i += c
            }
        })), r
    }

    function Tr(t, n, r) {
        void 0 === r && (r = {});
        var i = R(t), o = R(n);
        return o[0] += o[0] - i[0] > 180 ? -360 : i[0] - o[0] > 180 ? 360 : 0, N(function (t, n, r) {
            var i = r = void 0 === r ? e : Number(r), o = t[1] * Math.PI / 180, s = n[1] * Math.PI / 180, a = s - o,
                u = Math.abs(n[0] - t[0]) * Math.PI / 180;
            u > Math.PI && (u -= 2 * Math.PI);
            var l = Math.log(Math.tan(s / 2 + Math.PI / 4) / Math.tan(o / 2 + Math.PI / 4)),
                c = Math.abs(l) > 1e-11 ? a / l : Math.cos(o);
            return Math.sqrt(a * a + c * c * u * u) * i
        }(i, o), "meters", r.units)
    }

    function Ar(t, e, n) {
        if (void 0 === n && (n = {}), n.method || (n.method = "geodesic"), n.units || (n.units = "kilometers"), !t) throw new Error("pt is required");
        if (Array.isArray(t) ? t = a(t) : "Point" === t.type ? t = o(t) : F(t, "Point", "point"), !e) throw new Error("line is required");
        Array.isArray(e) ? e = h(e) : "LineString" === e.type ? e = o(e) : F(e, "LineString", "line");
        var r = 1 / 0, i = t.geometry.coordinates;
        return Q(e, (function (t) {
            var e = t.geometry.coordinates[0], o = t.geometry.coordinates[1], s = function (t, e, n, r) {
                var i = [n[0] - e[0], n[1] - e[1]], o = Dr([t[0] - e[0], t[1] - e[1]], i);
                if (o <= 0) return Fr(t, e, {method: r.method, units: "degrees"});
                var s = Dr(i, i);
                if (s <= o) return Fr(t, n, {method: r.method, units: "degrees"});
                var a = o / s, u = [e[0] + a * i[0], e[1] + a * i[1]];
                return Fr(t, u, {method: r.method, units: "degrees"})
            }(i, e, o, n);
            s < r && (r = s)
        })), N(r, "degrees", n.units)
    }

    function Dr(t, e) {
        return t[0] * e[0] + t[1] * e[1]
    }

    function Fr(t, e, n) {
        return "planar" === n.method ? Tr(t, e, n) : me(t, e, n)
    }

    function kr(t, e, n, r, i, o, s, a) {
        var u, l, c, h, p = {x: null, y: null, onLine1: !1, onLine2: !1};
        return 0 === (u = (a - o) * (n - t) - (s - i) * (r - e)) ? null !== p.x && null !== p.y && p : (h = (n - t) * (l = e - o) - (r - e) * (c = t - i), l = ((s - i) * l - (a - o) * c) / u, c = h / u, p.x = t + l * (n - t), p.y = e + l * (r - e), l >= 0 && l <= 1 && (p.onLine1 = !0), c >= 0 && c <= 1 && (p.onLine2 = !0), !(!p.onLine1 || !p.onLine2) && [p.x, p.y])
    }

    function Gr(t) {
        for (var e = function (t) {
            if ("FeatureCollection" !== t.type) return "Feature" !== t.type ? f([o(t)]) : f([t]);
            return t
        }(t), n = mn(e), r = !1, i = 0; !r && i < e.features.length;) {
            var s, u = e.features[i].geometry, l = !1;
            if ("Point" === u.type) n.geometry.coordinates[0] === u.coordinates[0] && n.geometry.coordinates[1] === u.coordinates[1] && (r = !0); else if ("MultiPoint" === u.type) {
                var c = !1;
                for (s = 0; !c && s < u.coordinates.length;) n.geometry.coordinates[0] === u.coordinates[s][0] && n.geometry.coordinates[1] === u.coordinates[s][1] && (r = !0, c = !0), s++
            } else if ("LineString" === u.type) for (s = 0; !l && s < u.coordinates.length - 1;) qr(n.geometry.coordinates[0], n.geometry.coordinates[1], u.coordinates[s][0], u.coordinates[s][1], u.coordinates[s + 1][0], u.coordinates[s + 1][1]) && (l = !0, r = !0), s++; else if ("MultiLineString" === u.type) for (var h = 0; h < u.coordinates.length;) {
                l = !1, s = 0;
                for (var p = u.coordinates[h]; !l && s < p.length - 1;) qr(n.geometry.coordinates[0], n.geometry.coordinates[1], p[s][0], p[s][1], p[s + 1][0], p[s + 1][1]) && (l = !0, r = !0), s++;
                h++
            } else "Polygon" !== u.type && "MultiPolygon" !== u.type || ye(n, u) && (r = !0);
            i++
        }
        if (r) return n;
        var g = f([]);
        for (i = 0; i < e.features.length; i++) g.features = g.features.concat(En(e.features[i]).features);
        return a(Wn(n, g).geometry.coordinates)
    }

    function qr(t, e, n, r, i, o) {
        return Math.sqrt((i - n) * (i - n) + (o - r) * (o - r)) === Math.sqrt((t - n) * (t - n) + (e - r) * (e - r)) + Math.sqrt((i - t) * (i - t) + (o - e) * (o - e))
    }

    Pr.default = Lr;
    var Br = 6378137;

    function zr(t) {
        return J(t, (function (t, e) {
            return t + function (t) {
                var e, n = 0;
                switch (t.type) {
                    case"Polygon":
                        return jr(t.coordinates);
                    case"MultiPolygon":
                        for (e = 0; e < t.coordinates.length; e++) n += jr(t.coordinates[e]);
                        return n;
                    case"Point":
                    case"MultiPoint":
                    case"LineString":
                    case"MultiLineString":
                        return 0
                }
                return 0
            }(e)
        }), 0)
    }

    function jr(t) {
        var e = 0;
        if (t && t.length > 0) {
            e += Math.abs(Ur(t[0]));
            for (var n = 1; n < t.length; n++) e -= Math.abs(Ur(t[n]))
        }
        return e
    }

    function Ur(t) {
        var e, n, r, i, o, s, a = 0, u = t.length;
        if (u > 2) {
            for (s = 0; s < u; s++) s === u - 2 ? (r = u - 2, i = u - 1, o = 0) : s === u - 1 ? (r = u - 1, i = 0, o = 1) : (r = s, i = s + 1, o = s + 2), e = t[r], n = t[i], a += (Vr(t[o][0]) - Vr(e[0])) * Math.sin(Vr(n[1]));
            a = a * Br * Br / 2
        }
        return a
    }

    function Vr(t) {
        return t * Math.PI / 180
    }

    function Xr(t, e) {
        return void 0 === e && (e = {}), $(t, (function (t, n) {
            var r = n.geometry.coordinates;
            return t + me(r[0], r[1], e)
        }), 0)
    }

    function Yr(t, e, n, r) {
        if (!P(r = r || {})) throw new Error("options is invalid");
        var i, o = [];
        if ("Feature" === t.type) i = t.geometry.coordinates; else {
            if ("LineString" !== t.type) throw new Error("input must be a LineString Feature or Geometry");
            i = t.coordinates
        }
        for (var s, a, u, l = i.length, c = 0, p = 0; p < i.length && !(e >= c && p === i.length - 1); p++) {
            if (c > e && 0 === o.length) {
                if (!(s = e - c)) return o.push(i[p]), h(o);
                a = _n(i[p], i[p - 1]) - 180, u = yn(i[p], s, a, r), o.push(u.geometry.coordinates)
            }
            if (c >= n) return (s = n - c) ? (a = _n(i[p], i[p - 1]) - 180, u = yn(i[p], s, a, r), o.push(u.geometry.coordinates), h(o)) : (o.push(i[p]), h(o));
            if (c >= e && o.push(i[p]), p === i.length - 1) return h(o);
            c += me(i[p], i[p + 1], r)
        }
        if (c < e && i.length === l) throw new Error("Start position is beyond line");
        return h(i[i.length - 1])
    }

    function Hr(t, e, n) {
        void 0 === n && (n = {});
        for (var r = R(t), i = T(e), o = 0; o < i.length - 1; o++) {
            var s = !1;
            if (n.ignoreEndVertices && (0 === o && (s = "start"), o === i.length - 2 && (s = "end"), 0 === o && o + 1 === i.length - 1 && (s = "both")), Wr(i[o], i[o + 1], r, s)) return !0
        }
        return !1
    }

    function Wr(t, e, n, r) {
        var i = n[0], o = n[1], s = t[0], a = t[1], u = e[0], l = e[1], c = u - s, h = l - a;
        return 0 == (n[0] - s) * h - (n[1] - a) * c && (r ? "start" === r ? Math.abs(c) >= Math.abs(h) ? c > 0 ? s < i && i <= u : u <= i && i < s : h > 0 ? a < o && o <= l : l <= o && o < a : "end" === r ? Math.abs(c) >= Math.abs(h) ? c > 0 ? s <= i && i < u : u < i && i <= s : h > 0 ? a <= o && o < l : l < o && o <= a : "both" === r && (Math.abs(c) >= Math.abs(h) ? c > 0 ? s < i && i < u : u < i && i < s : h > 0 ? a < o && o < l : l < o && o < a) : Math.abs(c) >= Math.abs(h) ? c > 0 ? s <= i && i <= u : u <= i && i <= s : h > 0 ? a <= o && o <= l : l <= o && o <= a)
    }

    function Jr(t, e) {
        var n = G(t), r = G(e), i = n.type, o = r.type;
        switch (i) {
            case"Point":
                switch (o) {
                    case"MultiPoint":
                        return function (t, e) {
                            var n, r = !1;
                            for (n = 0; n < e.coordinates.length; n++) if (Kr(e.coordinates[n], t.coordinates)) {
                                r = !0;
                                break
                            }
                            return r
                        }(n, r);
                    case"LineString":
                        return Hr(n, r, {ignoreEndVertices: !0});
                    case"Polygon":
                    case"MultiPolygon":
                        return ye(n, r, {ignoreBoundary: !0});
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"MultiPoint":
                switch (o) {
                    case"MultiPoint":
                        return function (t, e) {
                            for (var n = 0; n < t.coordinates.length; n++) {
                                for (var r = !1, i = 0; i < e.coordinates.length; i++) Kr(t.coordinates[n], e.coordinates[i]) && (r = !0);
                                if (!r) return !1
                            }
                            return !0
                        }(n, r);
                    case"LineString":
                        return function (t, e) {
                            for (var n = !1, r = 0; r < t.coordinates.length; r++) {
                                if (!Hr(t.coordinates[r], e)) return !1;
                                n || (n = Hr(t.coordinates[r], e, {ignoreEndVertices: !0}))
                            }
                            return n
                        }(n, r);
                    case"Polygon":
                    case"MultiPolygon":
                        return function (t, e) {
                            for (var n = !0, r = 0; r < t.coordinates.length; r++) {
                                var i = ye(t.coordinates[1], e);
                                if (!i) {
                                    n = !1;
                                    break
                                }
                                i = ye(t.coordinates[1], e, {ignoreBoundary: !0})
                            }
                            return n && i
                        }(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"LineString":
                switch (o) {
                    case"LineString":
                        return function (t, e) {
                            for (var n = 0; n < t.coordinates.length; n++) if (!Hr(t.coordinates[n], e)) return !1;
                            return !0
                        }(n, r);
                    case"Polygon":
                    case"MultiPolygon":
                        return function (t, e) {
                            var n = ot(e), r = ot(t);
                            if (!Zr(n, r)) return !1;
                            for (var i = !1, o = 0; o < t.coordinates.length - 1; o++) {
                                if (!ye(t.coordinates[o], e)) return !1;
                                if (i || (i = ye(t.coordinates[o], e, {ignoreBoundary: !0})), !i) i = ye(Qr(t.coordinates[o], t.coordinates[o + 1]), e, {ignoreBoundary: !0})
                            }
                            return i
                        }(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"Polygon":
                switch (o) {
                    case"Polygon":
                    case"MultiPolygon":
                        return function (t, e) {
                            var n = ot(t);
                            if (!Zr(ot(e), n)) return !1;
                            for (var r = 0; r < t.coordinates[0].length; r++) if (!ye(t.coordinates[0][r], e)) return !1;
                            return !0
                        }(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            default:
                throw new Error("feature1 " + i + " geometry not supported")
        }
    }

    function Zr(t, e) {
        return !(t[0] > e[0]) && (!(t[2] < e[2]) && (!(t[1] > e[1]) && !(t[3] < e[3])))
    }

    function Kr(t, e) {
        return t[0] === e[0] && t[1] === e[1]
    }

    function Qr(t, e) {
        return [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2]
    }

    function $r(t, e, n) {
        void 0 === n && (n = {}), n.mask && !n.units && (n.units = "kilometers");
        for (var r = [], i = t[0], o = t[1], s = t[2], u = t[3], l = e / me([i, o], [s, o], n) * (s - i), c = e / me([i, o], [i, u], n) * (u - o), h = s - i, p = u - o, g = Math.floor(h / l), d = (p - Math.floor(p / c) * c) / 2, y = i + (h - g * l) / 2; y <= s;) {
            for (var v = o + d; v <= u;) {
                var _ = a([y, v], n.properties);
                n.mask ? Jr(_, n.mask) && r.push(_) : r.push(_), v += c
            }
            y += l
        }
        return f(r)
    }

    function ti(t, e) {
        void 0 === e && (e = {});
        var n = e.precision, r = e.coordinates, i = e.mutate;
        if (n = null == n || isNaN(n) ? 6 : n, r = null == r || isNaN(r) ? 3 : r, !t) throw new Error("<geojson> is required");
        if ("number" != typeof n) throw new Error("<precision> must be a number");
        if ("number" != typeof r) throw new Error("<coordinates> must be a number");
        !1 !== i && void 0 !== i || (t = JSON.parse(JSON.stringify(t)));
        var o = Math.pow(10, n);
        return z(t, (function (t) {
            !function (t, e, n) {
                t.length > n && t.splice(n, t.length);
                for (var r = 0; r < t.length; r++) t[r] = Math.round(t[r] * e) / e
            }(t, o, r)
        })), t
    }

    function ei(t, e, n) {
        if ("Polygon" !== t.geometry.type) throw new Error("The input feature must be a Polygon");
        void 0 === n && (n = 1);
        var r = t.geometry.coordinates, i = [], o = {};
        if (n) {
            for (var s = [], a = 0; a < r.length; a++) for (var u = 0; u < r[a].length - 1; u++) s.push(d(a, u));
            var l = Nt();
            l.load(s)
        }
        for (var c = 0; c < r.length; c++) for (var h = 0; h < r[c].length - 1; h++) {
            if (n) l.search(d(c, h)).forEach((function (t) {
                var e = t.ring, n = t.edge;
                g(c, h, e, n)
            })); else for (var p = 0; p < r.length; p++) for (var f = 0; f < r[p].length - 1; f++) g(c, h, p, f)
        }
        return e || (i = {type: "Feature", geometry: {type: "MultiPoint", coordinates: i}}), i;

        function g(t, n, s, a) {
            var u, l, c = r[t][n], h = r[t][n + 1], p = r[s][a], f = r[s][a + 1], g = function (t, e, n, r) {
                if (ni(t, n) || ni(t, r) || ni(e, n) || ni(r, n)) return null;
                var i = t[0], o = t[1], s = e[0], a = e[1], u = n[0], l = n[1], c = r[0], h = r[1],
                    p = (i - s) * (l - h) - (o - a) * (u - c);
                return 0 === p ? null : [((i * a - o * s) * (u - c) - (i - s) * (u * h - l * c)) / p, ((i * a - o * s) * (l - h) - (o - a) * (u * h - l * c)) / p]
            }(c, h, p, f);
            if (null !== g && (u = h[0] !== c[0] ? (g[0] - c[0]) / (h[0] - c[0]) : (g[1] - c[1]) / (h[1] - c[1]), l = f[0] !== p[0] ? (g[0] - p[0]) / (f[0] - p[0]) : (g[1] - p[1]) / (f[1] - p[1]), !(u >= 1 || u <= 0 || l >= 1 || l <= 0))) {
                var d = g, y = !o[d];
                y && (o[d] = !0), e ? i.push(e(g, t, n, c, h, u, s, a, p, f, l, y)) : i.push(g)
            }
        }

        function d(t, e) {
            var n, i, o, s, a = r[t][e], u = r[t][e + 1];
            return a[0] < u[0] ? (n = a[0], i = u[0]) : (n = u[0], i = a[0]), a[1] < u[1] ? (o = a[1], s = u[1]) : (o = u[1], s = a[1]), {
                minX: n,
                minY: o,
                maxX: i,
                maxY: s,
                ring: t,
                edge: e
            }
        }
    }

    function ni(t, e) {
        if (!t || !e) return !1;
        if (t.length !== e.length) return !1;
        for (var n = 0, r = t.length; n < r; n++) if (t[n] instanceof Array && e[n] instanceof Array) {
            if (!ni(t[n], e[n])) return !1
        } else if (t[n] !== e[n]) return !1;
        return !0
    }

    var ri = function (t, e, n, r, i) {
        this.coord = t, this.param = e, this.ringAndEdgeIn = n, this.ringAndEdgeOut = r, this.nxtIsectAlongEdgeIn = i
    }, ii = function (t, e, n, r, i, o, s) {
        this.coord = t, this.ringAndEdge1 = e, this.ringAndEdge2 = n, this.nxtIsectAlongRingAndEdge1 = r, this.nxtIsectAlongRingAndEdge2 = i, this.ringAndEdge1Walkable = o, this.ringAndEdge2Walkable = s
    };

    function oi(t, e) {
        if (void 0 === e && (e = !0), 3 != t.length) throw new Error("This function requires an array of three points [x,y]");
        return (t[1][0] - t[0][0]) * (t[2][1] - t[0][1]) - (t[1][1] - t[0][1]) * (t[2][0] - t[0][0]) >= 0 == e
    }

    function si(t) {
        for (var e = 0, n = 0; n < t.length - 1; n++) t[n][0] < t[e][0] && (e = n);
        if (oi([t[ui(e - 1, t.length - 1)], t[e], t[ui(e + 1, t.length - 1)]], !0)) var r = 1; else r = -1;
        return r
    }

    function ai(t, e) {
        if (!t || !e) return !1;
        if (t.length != e.length) return !1;
        for (var n = 0, r = t.length; n < r; n++) if (t[n] instanceof Array && e[n] instanceof Array) {
            if (!ai(t[n], e[n])) return !1
        } else if (t[n] != e[n]) return !1;
        return !0
    }

    function ui(t, e) {
        return (t % e + e) % e
    }

    var li = Math.PI / 180, ci = 180 / Math.PI, hi = function (t, e) {
        this.lon = t, this.lat = e, this.x = li * t, this.y = li * e
    };
    hi.prototype.view = function () {
        return String(this.lon).slice(0, 4) + "," + String(this.lat).slice(0, 4)
    }, hi.prototype.antipode = function () {
        var t = -1 * this.lat, e = this.lon < 0 ? 180 + this.lon : -1 * (180 - this.lon);
        return new hi(e, t)
    };
    var pi = function () {
        this.coords = [], this.length = 0
    };
    pi.prototype.move_to = function (t) {
        this.length++, this.coords.push(t)
    };
    var fi = function (t) {
        this.properties = t || {}, this.geometries = []
    };
    fi.prototype.json = function () {
        if (this.geometries.length <= 0) return {
            geometry: {type: "LineString", coordinates: null},
            type: "Feature",
            properties: this.properties
        };
        if (1 === this.geometries.length) return {
            geometry: {
                type: "LineString",
                coordinates: this.geometries[0].coords
            }, type: "Feature", properties: this.properties
        };
        for (var t = [], e = 0; e < this.geometries.length; e++) t.push(this.geometries[e].coords);
        return {geometry: {type: "MultiLineString", coordinates: t}, type: "Feature", properties: this.properties}
    }, fi.prototype.wkt = function () {
        for (var t = "", e = "LINESTRING(", n = function (t) {
            e += t[0] + " " + t[1] + ","
        }, r = 0; r < this.geometries.length; r++) {
            if (0 === this.geometries[r].coords.length) return "LINESTRING(empty)";
            this.geometries[r].coords.forEach(n), t += e.substring(0, e.length - 1) + ")"
        }
        return t
    };
    var gi = function (t, e, n) {
        if (!t || void 0 === t.x || void 0 === t.y) throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
        if (!e || void 0 === e.x || void 0 === e.y) throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
        this.start = new hi(t.x, t.y), this.end = new hi(e.x, e.y), this.properties = n || {};
        var r = this.start.x - this.end.x, i = this.start.y - this.end.y,
            o = Math.pow(Math.sin(i / 2), 2) + Math.cos(this.start.y) * Math.cos(this.end.y) * Math.pow(Math.sin(r / 2), 2);
        if (this.g = 2 * Math.asin(Math.sqrt(o)), this.g === Math.PI) throw new Error("it appears " + t.view() + " and " + e.view() + " are 'antipodal', e.g diametrically opposite, thus there is no single route but rather infinite");
        if (isNaN(this.g)) throw new Error("could not calculate great circle between " + t + " and " + e)
    };

    function di(t, e) {
        var n = [], r = Pr();
        return Z(e, (function (e) {
            if (n.forEach((function (t, e) {
                t.id = e
            })), n.length) {
                var i = r.search(e);
                if (i.features.length) {
                    var o = vi(e, i);
                    n = n.filter((function (t) {
                        return t.id !== o.id
                    })), r.remove(o), X(yi(o, e), (function (t) {
                        n.push(t), r.insert(t)
                    }))
                }
            } else (n = yi(t, e).features).forEach((function (t) {
                t.bbox || (t.bbox = dn(ot(t)))
            })), r.load(f(n))
        })), f(n)
    }

    function yi(t, e) {
        var n = [], r = T(t)[0], i = T(t)[t.geometry.coordinates.length - 1];
        if (_i(r, R(e)) || _i(i, R(e))) return f([t]);
        var o = Pr(), s = Jn(t);
        o.load(s);
        var a = o.search(e);
        if (!a.features.length) return f([t]);
        var u = vi(e, a), l = Y(s, (function (t, r, i) {
            var o = T(r)[1], s = R(e);
            return i === u.id ? (t.push(s), n.push(h(t)), _i(s, o) ? [s] : [s, o]) : (t.push(o), t)
        }), [r]);
        return l.length > 1 && n.push(h(l)), f(n)
    }

    function vi(t, e) {
        if (!e.features.length) throw new Error("lines must contain features");
        if (1 === e.features.length) return e.features[0];
        var n, r = 1 / 0;
        return X(e, (function (e) {
            var i = Rr(e, t).properties.dist;
            i < r && (n = e, r = i)
        })), n
    }

    function _i(t, e) {
        return t[0] === e[0] && t[1] === e[1]
    }

    function mi(t, e, n, r, i) {
        void 0 === i && (i = {});
        var o = i.steps || 64, s = xi(n), a = xi(r), u = Array.isArray(t) || "Feature" !== t.type ? {} : t.properties;
        if (s === a) return h(vn(t, e, i).geometry.coordinates[0], u);
        for (var l = s, c = s < a ? a : a + 360, p = l, f = [], g = 0; p < c;) f.push(yn(t, e, p, i).geometry.coordinates), p = l + 360 * ++g / o;
        return p > c && f.push(yn(t, e, c, i).geometry.coordinates), h(f, u)
    }

    function xi(t) {
        var e = t % 360;
        return e < 0 && (e += 360), e
    }

    function Ei(t, e) {
        void 0 === e && (e = {});
        var n = G(t);
        switch (e.properties || "Feature" !== t.type || (e.properties = t.properties), n.type) {
            case"Polygon":
                return bi(n, e);
            case"MultiPolygon":
                return function (t, e) {
                    void 0 === e && (e = {});
                    var n = G(t).coordinates,
                        r = e.properties ? e.properties : "Feature" === t.type ? t.properties : {}, i = [];
                    return n.forEach((function (t) {
                        i.push(wi(t, r))
                    })), f(i)
                }(n, e);
            default:
                throw new Error("invalid poly")
        }
    }

    function bi(t, e) {
        return void 0 === e && (e = {}), wi(G(t).coordinates, e.properties ? e.properties : "Feature" === t.type ? t.properties : {})
    }

    function wi(t, e) {
        return t.length > 1 ? g(t, e) : h(t[0], e)
    }

    function Ii(t, e) {
        void 0 === e && (e = {});
        var n = e.properties, r = e.autoComplete, i = e.orderCoords, o = e.mutate;
        switch (r = void 0 === r || r, i = void 0 === i || i, (o = void 0 !== o && o) || (t = Ie(t)), t.type) {
            case"FeatureCollection":
                var s = [];
                return t.features.forEach((function (t) {
                    s.push(T(Ni(t, {}, r, i)))
                })), y(s, n);
            default:
                return Ni(t, n, r, i)
        }
    }

    function Ni(t, e, n, r) {
        e = e || ("Feature" === t.type ? t.properties : {});
        var i = G(t), o = i.coordinates, s = i.type;
        if (!o.length) throw new Error("line must contain coordinates");
        switch (s) {
            case"LineString":
                return n && (o = Si(o)), l([o], e);
            case"MultiLineString":
                var a = [], u = 0;
                return o.forEach((function (t) {
                    if (n && (t = Si(t)), r) {
                        var e = function (t) {
                            var e = t[0], n = t[1], r = t[2], i = t[3];
                            return Math.abs(e - r) * Math.abs(n - i)
                        }(ot(h(t)));
                        e > u ? (a.unshift(t), u = e) : a.push(t)
                    } else a.push(t)
                })), l(a, e);
            default:
                throw new Error("geometry type " + s + " is not supported")
        }
    }

    function Si(t) {
        var e = t[0], n = e[0], r = e[1], i = t[t.length - 1], o = i[0], s = i[1];
        return n === o && r === s || t.push(e), t
    }

    function Ci(t, e) {
        var n, r, i, o, s, a, u;
        for (r = 1; r <= 8; r *= 2) {
            for (n = [], o = !(Li(i = t[t.length - 1], e) & r), s = 0; s < t.length; s++) (u = !(Li(a = t[s], e) & r)) !== o && n.push(Pi(i, a, r, e)), u && n.push(a), i = a, o = u;
            if (!(t = n).length) break
        }
        return n
    }

    function Pi(t, e, n, r) {
        return 8 & n ? [t[0] + (e[0] - t[0]) * (r[3] - t[1]) / (e[1] - t[1]), r[3]] : 4 & n ? [t[0] + (e[0] - t[0]) * (r[1] - t[1]) / (e[1] - t[1]), r[1]] : 2 & n ? [r[2], t[1] + (e[1] - t[1]) * (r[2] - t[0]) / (e[0] - t[0])] : 1 & n ? [r[0], t[1] + (e[1] - t[1]) * (r[0] - t[0]) / (e[0] - t[0])] : null
    }

    function Li(t, e) {
        var n = 0;
        return t[0] < e[0] ? n |= 1 : t[0] > e[2] && (n |= 2), t[1] < e[1] ? n |= 4 : t[1] > e[3] && (n |= 8), n
    }

    function Mi(t, e) {
        for (var n = [], r = 0, i = t; r < i.length; r++) {
            var o = Ci(i[r], e);
            o.length > 0 && (o[0][0] === o[o.length - 1][0] && o[0][1] === o[o.length - 1][1] || o.push(o[0]), o.length >= 4 && n.push(o))
        }
        return n
    }

    gi.prototype.interpolate = function (t) {
        var e = Math.sin((1 - t) * this.g) / Math.sin(this.g), n = Math.sin(t * this.g) / Math.sin(this.g),
            r = e * Math.cos(this.start.y) * Math.cos(this.start.x) + n * Math.cos(this.end.y) * Math.cos(this.end.x),
            i = e * Math.cos(this.start.y) * Math.sin(this.start.x) + n * Math.cos(this.end.y) * Math.sin(this.end.x),
            o = e * Math.sin(this.start.y) + n * Math.sin(this.end.y),
            s = ci * Math.atan2(o, Math.sqrt(Math.pow(r, 2) + Math.pow(i, 2)));
        return [ci * Math.atan2(i, r), s]
    }, gi.prototype.Arc = function (t, e) {
        var n = [];
        if (!t || t <= 2) n.push([this.start.lon, this.start.lat]), n.push([this.end.lon, this.end.lat]); else for (var r = 1 / (t - 1), i = 0; i < t; ++i) {
            var o = r * i, s = this.interpolate(o);
            n.push(s)
        }
        for (var a = !1, u = 0, l = e && e.offset ? e.offset : 10, c = 180 - l, h = -180 + l, p = 360 - l, f = 1; f < n.length; ++f) {
            var g = n[f - 1][0], d = n[f][0], y = Math.abs(d - g);
            y > p && (d > c && g < h || g > c && d < h) ? a = !0 : y > u && (u = y)
        }
        var v = [];
        if (a && u < l) {
            var _ = [];
            v.push(_);
            for (var m = 0; m < n.length; ++m) {
                var x = parseFloat(n[m][0]);
                if (m > 0 && Math.abs(x - n[m - 1][0]) > p) {
                    var E = parseFloat(n[m - 1][0]), b = parseFloat(n[m - 1][1]), w = parseFloat(n[m][0]),
                        I = parseFloat(n[m][1]);
                    if (E > -180 && E < h && 180 === w && m + 1 < n.length && n[m - 1][0] > -180 && n[m - 1][0] < h) {
                        _.push([-180, n[m][1]]), m++, _.push([n[m][0], n[m][1]]);
                        continue
                    }
                    if (E > c && E < 180 && -180 === w && m + 1 < n.length && n[m - 1][0] > c && n[m - 1][0] < 180) {
                        _.push([180, n[m][1]]), m++, _.push([n[m][0], n[m][1]]);
                        continue
                    }
                    if (E < h && w > c) {
                        var N = E;
                        E = w, w = N;
                        var S = b;
                        b = I, I = S
                    }
                    if (E > c && w < h && (w += 360), E <= 180 && w >= 180 && E < w) {
                        var C = (180 - E) / (w - E), P = C * I + (1 - C) * b;
                        _.push([n[m - 1][0] > c ? 180 : -180, P]), (_ = []).push([n[m - 1][0] > c ? -180 : 180, P]), v.push(_)
                    } else _ = [], v.push(_);
                    _.push([x, n[m][1]])
                } else _.push([n[m][0], n[m][1]])
            }
        } else {
            var L = [];
            v.push(L);
            for (var M = 0; M < n.length; ++M) L.push([n[M][0], n[M][1]])
        }
        for (var O = new fi(this.properties), R = 0; R < v.length; ++R) {
            var T = new pi;
            O.geometries.push(T);
            for (var A = v[R], D = 0; D < A.length; ++D) T.move_to(A[D])
        }
        return O
    };
    var Oi = Bt((function (t, e) {
        function n(t) {
            var e = [];
            for (var n in t) e.push(n);
            return e
        }

        (t.exports = "function" == typeof Object.keys ? Object.keys : n).shim = n
    })), Ri = Bt((function (t, e) {
        var n = "[object Arguments]" == function () {
            return Object.prototype.toString.call(arguments)
        }();

        function r(t) {
            return "[object Arguments]" == Object.prototype.toString.call(t)
        }

        function i(t) {
            return t && "object" == typeof t && "number" == typeof t.length && Object.prototype.hasOwnProperty.call(t, "callee") && !Object.prototype.propertyIsEnumerable.call(t, "callee") || !1
        }

        (e = t.exports = n ? r : i).supported = r, e.unsupported = i
    })), Ti = Bt((function (t) {
        var e = Array.prototype.slice, n = t.exports = function (t, o, s) {
            return s || (s = {}), t === o || (t instanceof Date && o instanceof Date ? t.getTime() === o.getTime() : !t || !o || "object" != typeof t && "object" != typeof o ? s.strict ? t === o : t == o : function (t, o, s) {
                var a, u;
                if (r(t) || r(o)) return !1;
                if (t.prototype !== o.prototype) return !1;
                if (Ri(t)) return !!Ri(o) && (t = e.call(t), o = e.call(o), n(t, o, s));
                if (i(t)) {
                    if (!i(o)) return !1;
                    if (t.length !== o.length) return !1;
                    for (a = 0; a < t.length; a++) if (t[a] !== o[a]) return !1;
                    return !0
                }
                try {
                    var l = Oi(t), c = Oi(o)
                } catch (t) {
                    return !1
                }
                if (l.length != c.length) return !1;
                for (l.sort(), c.sort(), a = l.length - 1; a >= 0; a--) if (l[a] != c[a]) return !1;
                for (a = l.length - 1; a >= 0; a--) if (u = l[a], !n(t[u], o[u], s)) return !1;
                return typeof t == typeof o
            }(t, o, s))
        };

        function r(t) {
            return null == t
        }

        function i(t) {
            return !(!t || "object" != typeof t || "number" != typeof t.length) && ("function" == typeof t.copy && "function" == typeof t.slice && !(t.length > 0 && "number" != typeof t[0]))
        }
    }));

    function Ai(t, e, n) {
        if (void 0 === n && (n = {}), !P(n = n || {})) throw new Error("options is invalid");
        var r, i = n.tolerance || 0, o = [], s = Pr(), a = Jn(t);
        return s.load(a), Q(e, (function (t) {
            var e = !1;
            X(s.search(t), (function (n) {
                if (!1 === e) {
                    var o = T(t).sort(), s = T(n).sort();
                    Ti(o, s) || (0 === i ? Hr(o[0], n) && Hr(o[1], n) : Rr(n, o[0]).properties.dist <= i && Rr(n, o[1]).properties.dist <= i) ? (e = !0, r = r ? Di(r, t) : t) : (0 === i ? Hr(s[0], t) && Hr(s[1], t) : Rr(t, s[0]).properties.dist <= i && Rr(t, s[1]).properties.dist <= i) && (r = r ? Di(r, n) : n)
                }
            })), !1 === e && r && (o.push(r), r = void 0)
        })), r && o.push(r), f(o)
    }

    function Di(t, e) {
        var n = T(e), r = T(t), i = r[0], o = r[r.length - 1], s = t.geometry.coordinates;
        return Ti(n[0], i) ? s.unshift(n[1]) : Ti(n[0], o) ? s.push(n[1]) : Ti(n[1], i) ? s.unshift(n[0]) : Ti(n[1], o) && s.push(n[0]), t
    }

    function Fi(t) {
        var e = t % 360;
        return e < 0 && (e += 360), e
    }

    function ki(t, e, n) {
        var r;
        return void 0 === n && (n = {}), (r = n.final ? Gi(R(e), R(t)) : Gi(R(t), R(e))) > 180 ? -(360 - r) : r
    }

    function Gi(t, e) {
        var n = I(t[1]), r = I(e[1]), i = I(e[0] - t[0]);
        i > Math.PI && (i -= 2 * Math.PI), i < -Math.PI && (i += 2 * Math.PI);
        var o = Math.log(Math.tan(r / 2 + Math.PI / 4) / Math.tan(n / 2 + Math.PI / 4));
        return (w(Math.atan2(i, o)) + 360) % 360
    }

    function qi(t, n, r, i) {
        void 0 === i && (i = {});
        var o = n < 0, s = N(Math.abs(n), i.units, "meters");
        o && (s = -Math.abs(s));
        var u = R(t), l = function (t, n, r, i) {
            i = void 0 === i ? e : Number(i);
            var o = n / i, s = t[0] * Math.PI / 180, a = I(t[1]), u = I(r), l = o * Math.cos(u), c = a + l;
            Math.abs(c) > Math.PI / 2 && (c = c > 0 ? Math.PI - c : -Math.PI - c);
            var h = Math.log(Math.tan(c / 2 + Math.PI / 4) / Math.tan(a / 2 + Math.PI / 4)),
                p = Math.abs(h) > 1e-11 ? l / h : Math.cos(a), f = o * Math.sin(u) / p;
            return [(180 * (s + f) / Math.PI + 540) % 360 - 180, 180 * c / Math.PI]
        }(u, s, r);
        return l[0] += l[0] - u[0] > 180 ? -360 : u[0] - l[0] > 180 ? 360 : 0, a(l, i.properties)
    }

    function Bi(t, e, n, r, i, o) {
        for (var s = 0; s < t.length; s++) {
            var a = t[s], u = t[s + 1];
            s === t.length - 1 && (u = t[0]), r = ji(a, u, e), n <= 0 && r > 0 ? ji(e, a, i) < 0 || (i = a) : n > 0 && r <= 0 && (zi(e, a, o) || (o = a)), n = r
        }
        return [i, o]
    }

    function zi(t, e, n) {
        return ji(t, e, n) > 0
    }

    function ji(t, e, n) {
        return (e[0] - t[0]) * (n[1] - t[1]) - (n[0] - t[0]) * (e[1] - t[1])
    }

    function Ui(t) {
        for (var e, n, r = T(t), i = 0, o = 1; o < r.length;) e = n || r[0], i += ((n = r[o])[0] - e[0]) * (n[1] + e[1]), o++;
        return i > 0
    }

    function Vi(t, e) {
        switch ("Feature" === t.type ? t.geometry.type : t.type) {
            case"GeometryCollection":
                return W(t, (function (t) {
                    Vi(t, e)
                })), t;
            case"LineString":
                return Xi(T(t), e), t;
            case"Polygon":
                return Yi(T(t), e), t;
            case"MultiLineString":
                return T(t).forEach((function (t) {
                    Xi(t, e)
                })), t;
            case"MultiPolygon":
                return T(t).forEach((function (t) {
                    Yi(t, e)
                })), t;
            case"Point":
            case"MultiPoint":
                return t
        }
    }

    function Xi(t, e) {
        Ui(t) === e && t.reverse()
    }

    function Yi(t, e) {
        Ui(t[0]) !== e && t[0].reverse();
        for (var n = 1; n < t.length; n++) Ui(t[n]) === e && t[n].reverse()
    }

    function Hi(t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = e.zProperty || "elevation", r = e.flip, i = e.flags;
        k(t, "Point", "input must contain Points");
        for (var o = function (t, e) {
            var n = {};
            return X(t, (function (t) {
                var e = T(t)[1];
                n[e] || (n[e] = []), n[e].push(t)
            })), Object.keys(n).map((function (t) {
                return n[t].sort((function (t, e) {
                    return T(t)[0] - T(e)[0]
                }))
            })).sort((function (t, n) {
                return e ? T(t[0])[1] - T(n[0])[1] : T(n[0])[1] - T(t[0])[1]
            }))
        }
            /*!
             * @license GNU Affero General Public License.
             * Copyright (c) 2015, 2015 Ronny Lorenz <ronny@tbi.univie.ac.at>
             * v. 1.2.0
             * https://github.com/RaumZeit/MarchingSquares.js
             *
             * MarchingSquaresJS is free software: you can redistribute it and/or modify
             * it under the terms of the GNU Affero General Public License as published by
             * the Free Software Foundation, either version 3 of the License, or
             * (at your option) any later version.
             *
             * MarchingSquaresJS is distributed in the hope that it will be useful,
             * but WITHOUT ANY WARRANTY; without even the implied warranty of
             * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
             * GNU Affero General Public License for more details.
             *
             * As additional permission under GNU Affero General Public License version 3
             * section 7, third-party projects (personal or commercial) may distribute,
             * include, or link against UNMODIFIED VERSIONS of MarchingSquaresJS without the
             * requirement that said third-party project for that reason alone becomes
             * subject to any requirement of the GNU Affero General Public License version 3.
             * Any modifications to MarchingSquaresJS, however, must be shared with the public
             * and made available.
             *
             * In summary this:
             * - allows you to use MarchingSquaresJS at no cost
             * - allows you to use MarchingSquaresJS for both personal and commercial purposes
             * - allows you to distribute UNMODIFIED VERSIONS of MarchingSquaresJS under any
             *   license as long as this license notice is included
             * - enables you to keep the source code of your program that uses MarchingSquaresJS
             *   undisclosed
             * - forces you to share any modifications you have made to MarchingSquaresJS,
             *   e.g. bug-fixes
             *
             * You should have received a copy of the GNU Affero General Public License
             * along with MarchingSquaresJS.  If not, see <http://www.gnu.org/licenses/>.
             */(t, r), s = [], a = 0; a < o.length; a++) {
            for (var u = o[a], l = [], c = 0; c < u.length; c++) {
                var h = u[c];
                h.properties[n] ? l.push(h.properties[n]) : l.push(0), !0 === i && (h.properties.matrixPosition = [a, c])
            }
            s.push(l)
        }
        return s
    }

    var Wi = {successCallback: null, verbose: !1, polygons: !1}, Ji = {};

    function Zi(t, e, n, r) {
        r = r || {};
        for (var i = Object.keys(Wi), o = 0; o < i.length; o++) {
            var s = i[o], a = r[s];
            a = null != a ? a : Wi[s], Ji[s] = a
        }
        Ji.verbose && console.log("MarchingSquaresJS-isoBands: computing isobands for [" + e + ":" + (e + n) + "]");
        var u, l = function (t, e, n) {
            for (var r = t.length - 1, i = t[0].length - 1, o = {
                rows: r,
                cols: i,
                cells: []
            }, s = e + Math.abs(n), a = 0; a < r; ++a) {
                o.cells[a] = [];
                for (var u = 0; u < i; ++u) {
                    var l = 0, c = t[a + 1][u], h = t[a + 1][u + 1], p = t[a][u + 1], f = t[a][u];
                    if (!(isNaN(c) || isNaN(h) || isNaN(p) || isNaN(f))) {
                        l |= c < e ? 0 : c > s ? 128 : 64, l |= h < e ? 0 : h > s ? 32 : 16, l |= p < e ? 0 : p > s ? 8 : 4;
                        var g = +(l |= f < e ? 0 : f > s ? 2 : 1), d = 0;
                        if (17 === l || 18 === l || 33 === l || 34 === l || 38 === l || 68 === l || 72 === l || 98 === l || 102 === l || 132 === l || 136 === l || 137 === l || 152 === l || 153 === l) {
                            var y = (c + h + p + f) / 4;
                            d = y > s ? 2 : y < e ? 0 : 1, 34 === l ? 1 === d ? l = 35 : 0 === d && (l = 136) : 136 === l ? 1 === d ? (l = 35, d = 4) : 0 === d && (l = 34) : 17 === l ? 1 === d ? (l = 155, d = 4) : 0 === d && (l = 153) : 68 === l ? 1 === d ? (l = 103, d = 4) : 0 === d && (l = 102) : 153 === l ? 1 === d && (l = 155) : 102 === l ? 1 === d && (l = 103) : 152 === l ? d < 2 && (l = 156, d = 1) : 137 === l ? d < 2 && (l = 139, d = 1) : 98 === l ? d < 2 && (l = 99, d = 1) : 38 === l ? d < 2 && (l = 39, d = 1) : 18 === l ? d > 0 ? (l = 156, d = 4) : l = 152 : 33 === l ? d > 0 ? (l = 139, d = 4) : l = 137 : 72 === l ? d > 0 ? (l = 99, d = 4) : l = 98 : 132 === l && (d > 0 ? (l = 39, d = 4) : l = 38)
                        }
                        if (0 != l && 170 != l) {
                            var v, _, m, x, E, b, w, I;
                            v = _ = m = x = E = b = w = I = .5;
                            var N = [];
                            1 === l ? (m = 1 - zo(e, p, f), I = 1 - zo(e, c, f), N.push(Do[l])) : 169 === l ? (m = zo(s, f, p), I = zo(s, f, c), N.push(Do[l])) : 4 === l ? (b = 1 - zo(e, h, p), x = zo(e, f, p), N.push(To[l])) : 166 === l ? (b = zo(s, p, h), x = 1 - zo(s, p, f), N.push(To[l])) : 16 === l ? (E = zo(e, p, h), _ = zo(e, c, h), N.push(Ro[l])) : 154 === l ? (E = 1 - zo(s, h, p), _ = 1 - zo(s, h, c), N.push(Ro[l])) : 64 === l ? (w = zo(e, f, c), v = 1 - zo(e, h, c), N.push(ko[l])) : 106 === l ? (w = 1 - zo(s, c, f), v = zo(s, c, h), N.push(ko[l])) : 168 === l ? (x = zo(s, f, p), m = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), N.push(Ao[l]), N.push(Do[l])) : 2 === l ? (x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), N.push(Ao[l]), N.push(Do[l])) : 162 === l ? (E = zo(s, p, h), b = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), N.push(Ao[l]), N.push(Do[l])) : 8 === l ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), N.push(Ro[l]), N.push(To[l])) : 138 === l ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c), N.push(Ro[l]), N.push(To[l])) : 32 === l ? (E = zo(s, p, h), b = zo(e, p, h), v = zo(e, c, h), _ = zo(s, c, h), N.push(Ro[l]), N.push(To[l])) : 42 === l ? (I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h), N.push(Fo[l]), N.push(ko[l])) : 128 === l && (I = zo(e, f, c), w = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c), N.push(Fo[l]), N.push(ko[l])), 5 === l ? (b = 1 - zo(e, h, p), I = 1 - zo(e, c, f), N.push(To[l])) : 165 === l ? (b = zo(s, p, h), I = zo(s, f, c), N.push(To[l])) : 20 === l ? (x = zo(e, f, p), _ = zo(e, c, h), N.push(Ao[l])) : 150 === l ? (x = 1 - zo(s, p, f), _ = 1 - zo(s, h, c), N.push(Ao[l])) : 80 === l ? (E = zo(e, p, h), w = zo(e, f, c), N.push(Ro[l])) : 90 === l ? (E = 1 - zo(s, h, p), w = 1 - zo(s, c, f), N.push(Ro[l])) : 65 === l ? (m = 1 - zo(e, p, f), v = 1 - zo(e, h, c), N.push(Do[l])) : 105 === l ? (m = zo(s, f, p), v = zo(s, c, h), N.push(Do[l])) : 160 === l ? (E = zo(s, p, h), b = zo(e, p, h), I = zo(e, f, c), w = zo(s, f, c), N.push(Ro[l]), N.push(To[l])) : 10 === l ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), N.push(Ro[l]), N.push(To[l])) : 130 === l ? (x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c), N.push(Ao[l]), N.push(Do[l])) : 40 === l ? (x = zo(s, f, p), m = zo(e, f, p), v = zo(e, c, h), _ = zo(s, c, h), N.push(Ao[l]), N.push(Do[l])) : 101 === l ? (b = zo(s, p, h), v = zo(s, c, h), N.push(To[l])) : 69 === l ? (b = 1 - zo(e, h, p), v = 1 - zo(e, h, c), N.push(To[l])) : 149 === l ? (I = zo(s, f, c), _ = 1 - zo(s, h, c), N.push(Fo[l])) : 21 === l ? (I = 1 - zo(e, c, f), _ = zo(e, c, h), N.push(Fo[l])) : 86 === l ? (x = 1 - zo(s, p, f), w = 1 - zo(s, c, f), N.push(Ao[l])) : 84 === l ? (x = zo(e, f, p), w = zo(e, f, c), N.push(Ao[l])) : 89 === l ? (E = 1 - zo(s, h, p), m = zo(s, f, p), N.push(Do[l])) : 81 === l ? (E = zo(e, p, h), m = 1 - zo(e, p, f), N.push(Do[l])) : 96 === l ? (E = zo(s, p, h), b = zo(e, p, h), w = zo(e, f, c), v = zo(s, c, h), N.push(Ro[l]), N.push(To[l])) : 74 === l ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), w = 1 - zo(s, c, f), v = 1 - zo(e, h, c), N.push(Ro[l]), N.push(To[l])) : 24 === l ? (E = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), _ = zo(e, c, h), N.push(Ro[l]), N.push(Do[l])) : 146 === l ? (E = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), _ = 1 - zo(s, h, c), N.push(Ro[l]), N.push(Do[l])) : 6 === l ? (b = 1 - zo(e, h, p), x = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), N.push(To[l]), N.push(Ao[l])) : 164 === l ? (b = zo(s, p, h), x = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), N.push(To[l]), N.push(Ao[l])) : 129 === l ? (m = 1 - zo(e, p, f), I = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c), N.push(Do[l]), N.push(Fo[l])) : 41 === l ? (m = zo(s, f, p), I = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h), N.push(Do[l]), N.push(Fo[l])) : 66 === l ? (x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), w = 1 - zo(s, c, f), v = 1 - zo(e, h, c), N.push(Ao[l]), N.push(Do[l])) : 104 === l ? (x = zo(s, f, p), m = zo(e, f, p), w = zo(e, f, c), v = zo(s, c, h), N.push(Do[l]), N.push(Go[l])) : 144 === l ? (E = zo(e, p, h), I = zo(e, f, c), w = zo(s, f, c), _ = 1 - zo(s, h, c), N.push(Ro[l]), N.push(ko[l])) : 26 === l ? (E = 1 - zo(s, h, p), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), _ = zo(e, c, h), N.push(Ro[l]), N.push(ko[l])) : 36 === l ? (b = zo(s, p, h), x = zo(e, f, p), v = zo(e, c, h), _ = zo(s, c, h), N.push(To[l]), N.push(Ao[l])) : 134 === l ? (b = 1 - zo(e, h, p), x = 1 - zo(s, p, f), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c), N.push(To[l]), N.push(Ao[l])) : 9 === l ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), m = zo(s, f, p), I = 1 - zo(e, c, f), N.push(Ro[l]), N.push(To[l])) : 161 === l ? (E = zo(s, p, h), b = zo(e, p, h), m = 1 - zo(e, p, f), I = zo(s, f, c), N.push(Ro[l]), N.push(To[l])) : 37 === l ? (b = zo(s, p, h), I = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h), N.push(To[l]), N.push(Fo[l])) : 133 === l ? (b = 1 - zo(e, h, p), I = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c), N.push(To[l]), N.push(Fo[l])) : 148 === l ? (x = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), _ = 1 - zo(s, h, c), N.push(Ao[l]), N.push(ko[l])) : 22 === l ? (x = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), _ = zo(e, c, h), N.push(Ao[l]), N.push(ko[l])) : 82 === l ? (E = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), w = 1 - zo(s, c, f), N.push(Ro[l]), N.push(Do[l])) : 88 === l ? (E = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), w = zo(e, f, c), N.push(Ro[l]), N.push(Do[l])) : 73 === l ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), m = zo(s, f, p), v = 1 - zo(e, h, c), N.push(Ro[l]), N.push(To[l])) : 97 === l ? (E = zo(s, p, h), b = zo(e, p, h), m = 1 - zo(e, p, f), v = zo(s, c, h), N.push(Ro[l]), N.push(To[l])) : 145 === l ? (E = zo(e, p, h), m = 1 - zo(e, p, f), I = zo(s, f, c), _ = 1 - zo(s, h, c), N.push(Ro[l]), N.push(Fo[l])) : 25 === l ? (E = 1 - zo(s, h, p), m = zo(s, f, p), I = 1 - zo(e, c, f), _ = zo(e, c, h), N.push(Ro[l]), N.push(Fo[l])) : 70 === l ? (b = 1 - zo(e, h, p), x = 1 - zo(s, p, f), w = 1 - zo(s, c, f), v = 1 - zo(e, h, c), N.push(To[l]), N.push(Ao[l])) : 100 === l ? (b = zo(s, p, h), x = zo(e, f, p), w = zo(e, f, c), v = zo(s, c, h), N.push(To[l]), N.push(Ao[l])) : 34 === l ? (0 === d ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c)) : (E = zo(s, p, h), b = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h)), N.push(Ro[l]), N.push(To[l]), N.push(Fo[l]), N.push(ko[l])) : 35 === l ? (4 === d ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c)) : (E = zo(s, p, h), b = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h)), N.push(Ro[l]), N.push(To[l]), N.push(Do[l]), N.push(ko[l])) : 136 === l ? (0 === d ? (E = zo(s, p, h), b = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h)) : (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c)), N.push(Ro[l]), N.push(To[l]), N.push(Fo[l]), N.push(ko[l])) : 153 === l ? (0 === d ? (E = zo(e, p, h), m = 1 - zo(e, p, f), I = 1 - zo(e, c, f), _ = zo(e, c, h)) : (E = 1 - zo(s, h, p), m = zo(s, f, p), I = zo(s, f, c), _ = 1 - zo(s, h, c)), N.push(Ro[l]), N.push(Do[l])) : 102 === l ? (0 === d ? (b = 1 - zo(e, h, p), x = zo(e, f, p), w = zo(e, f, c), v = 1 - zo(e, h, c)) : (b = zo(s, p, h), x = 1 - zo(s, p, f), w = 1 - zo(s, c, f), v = zo(s, c, h)), N.push(To[l]), N.push(ko[l])) : 155 === l ? (4 === d ? (E = zo(e, p, h), m = 1 - zo(e, p, f), I = 1 - zo(e, c, f), _ = zo(e, c, h)) : (E = 1 - zo(s, h, p), m = zo(s, f, p), I = zo(s, f, c), _ = 1 - zo(s, h, c)), N.push(Ro[l]), N.push(Fo[l])) : 103 === l ? (4 === d ? (b = 1 - zo(e, h, p), x = zo(e, f, p), w = zo(e, f, c), v = 1 - zo(e, h, c)) : (b = zo(s, p, h), x = 1 - zo(s, p, f), w = 1 - zo(s, c, f), v = zo(s, c, h)), N.push(To[l]), N.push(Ao[l])) : 152 === l ? (0 === d ? (E = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), _ = zo(e, c, h)) : (E = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), _ = 1 - zo(s, h, c)), N.push(Ro[l]), N.push(Ao[l]), N.push(Do[l])) : 156 === l ? (4 === d ? (E = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), _ = zo(e, c, h)) : (E = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), _ = 1 - zo(s, h, c)), N.push(Ro[l]), N.push(Do[l]), N.push(ko[l])) : 137 === l ? (0 === d ? (E = zo(s, p, h), b = zo(e, p, h), m = 1 - zo(e, p, f), I = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h)) : (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), m = zo(s, f, p), I = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c)), N.push(Ro[l]), N.push(To[l]), N.push(Do[l])) : 139 === l ? (4 === d ? (E = zo(s, p, h), b = zo(e, p, h), m = 1 - zo(e, p, f), I = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h)) : (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), m = zo(s, f, p), I = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c)), N.push(Ro[l]), N.push(To[l]), N.push(Fo[l])) : 98 === l ? (0 === d ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), w = zo(e, f, c), v = 1 - zo(e, h, c)) : (E = zo(s, p, h), b = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), w = 1 - zo(s, c, f), v = zo(s, c, h)), N.push(Ro[l]), N.push(To[l]), N.push(ko[l])) : 99 === l ? (4 === d ? (E = 1 - zo(e, h, p), b = 1 - zo(s, h, p), x = zo(s, f, p), m = zo(e, f, p), w = zo(e, f, c), v = 1 - zo(e, h, c)) : (E = zo(s, p, h), b = zo(e, p, h), x = 1 - zo(e, p, f), m = 1 - zo(s, p, f), w = 1 - zo(s, c, f), v = zo(s, c, h)), N.push(Ro[l]), N.push(To[l]), N.push(Do[l])) : 38 === l ? (0 === d ? (b = 1 - zo(e, h, p), x = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c)) : (b = zo(s, p, h), x = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h)), N.push(To[l]), N.push(Fo[l]), N.push(ko[l])) : 39 === l ? (4 === d ? (b = 1 - zo(e, h, p), x = zo(e, f, p), I = zo(e, f, c), w = zo(s, f, c), v = 1 - zo(s, h, c), _ = 1 - zo(e, h, c)) : (b = zo(s, p, h), x = 1 - zo(s, p, f), I = 1 - zo(s, c, f), w = 1 - zo(e, c, f), v = zo(e, c, h), _ = zo(s, c, h)), N.push(To[l]), N.push(Ao[l]), N.push(ko[l])) : 85 === l && (E = 1, b = 0, x = 1, m = 0, I = 0, w = 1, v = 0, _ = 1), (v < 0 || v > 1 || _ < 0 || _ > 1 || E < 0 || E > 1 || x < 0 || x > 1 || I < 0 || I > 1 || w < 0 || w > 1) && console.log("MarchingSquaresJS-isoBands: " + l + " " + g + " " + c + "," + h + "," + p + "," + f + " " + d + " " + v + " " + _ + " " + E + " " + b + " " + x + " " + m + " " + I + " " + w), o.cells[a][u] = {
                                cval: l,
                                cval_real: g,
                                flipped: d,
                                topleft: v,
                                topright: _,
                                righttop: E,
                                rightbottom: b,
                                bottomright: x,
                                bottomleft: m,
                                leftbottom: I,
                                lefttop: w,
                                edges: N
                            }
                        }
                    }
                }
            }
            return o
        }(t, e, n);
        return Ji.polygons ? (Ji.verbose && console.log("MarchingSquaresJS-isoBands: returning single polygons for each grid cell"), u = function (t) {
            var e = [], n = 0;
            return t.cells.forEach((function (t, r) {
                t.forEach((function (t, i) {
                    if (void 0 !== t) {
                        var o = Bo[t.cval](t);
                        "object" == typeof o && jo(o) ? "object" == typeof o[0] && jo(o[0]) ? "object" == typeof o[0][0] && jo(o[0][0]) ? o.forEach((function (t) {
                            t.forEach((function (t) {
                                t[0] += i, t[1] += r
                            })), e[n++] = t
                        })) : (o.forEach((function (t) {
                            t[0] += i, t[1] += r
                        })), e[n++] = o) : console.log("MarchingSquaresJS-isoBands: bandcell polygon with malformed coordinates") : console.log("MarchingSquaresJS-isoBands: bandcell polygon with null coordinates")
                    }
                }))
            })), e
        }(l)) : (Ji.verbose && console.log("MarchingSquaresJS-isoBands: returning polygon paths for entire data grid"), u = function (t) {
            for (var e = [], n = t.rows, r = t.cols, i = [], o = 0; o < n; o++) for (var s = 0; s < r; s++) if (void 0 !== t.cells[o][s] && t.cells[o][s].edges.length > 0) {
                var a = Vo(t.cells[o][s]), u = null, l = s, c = o;
                null !== a && i.push([a.p[0] + l, a.p[1] + c]);
                do {
                    if (null === (u = Xo(t.cells[c][l], a.x, a.y, a.o))) break;
                    if (i.push([u.p[0] + l, u.p[1] + c]), l += u.x, a = u, (c += u.y) < 0 || c >= n || l < 0 || l >= r || void 0 === t.cells[c][l]) {
                        var h = Uo(t, l -= u.x, c -= u.y, u.x, u.y, u.o);
                        if (null === h) break;
                        h.path.forEach((function (t) {
                            i.push(t)
                        })), l = h.i, c = h.j, a = h
                    }
                } while (void 0 !== t.cells[c][l] && t.cells[c][l].edges.length > 0);
                e.push(i), i = [], t.cells[o][s].edges.length > 0 && s--
            }
            return e
        }(l)), "function" == typeof Ji.successCallback && Ji.successCallback(u), u
    }

    var Ki = 64, Qi = 16, $i = [], to = [], eo = [], no = [], ro = [], io = [], oo = [], so = [], ao = [], uo = [],
        lo = [], co = [], ho = [], po = [], fo = [], go = [], yo = [], vo = [], _o = [], mo = [], xo = [], Eo = [],
        bo = [], wo = [];
    oo[85] = uo[85] = -1, so[85] = lo[85] = 0, ao[85] = co[85] = 1, _o[85] = Eo[85] = 1, mo[85] = bo[85] = 0, xo[85] = wo[85] = 1, $i[85] = no[85] = 0, to[85] = ro[85] = -1, eo[85] = fo[85] = 0, go[85] = ho[85] = 0, yo[85] = po[85] = 1, io[85] = vo[85] = 1, Eo[1] = Eo[169] = 0, bo[1] = bo[169] = -1, wo[1] = wo[169] = 0, ho[1] = ho[169] = -1, po[1] = po[169] = 0, fo[1] = fo[169] = 0, uo[4] = uo[166] = 0, lo[4] = lo[166] = -1, co[4] = co[166] = 1, go[4] = go[166] = 1, yo[4] = yo[166] = 0, vo[4] = vo[166] = 0, oo[16] = oo[154] = 0, so[16] = so[154] = 1, ao[16] = ao[154] = 1, no[16] = no[154] = 1, ro[16] = ro[154] = 0, io[16] = io[154] = 1, _o[64] = _o[106] = 0, mo[64] = mo[106] = 1, xo[64] = xo[106] = 0, $i[64] = $i[106] = -1, to[64] = to[106] = 0, eo[64] = eo[106] = 1, _o[2] = _o[168] = 0, mo[2] = mo[168] = -1, xo[2] = xo[168] = 1, Eo[2] = Eo[168] = 0, bo[2] = bo[168] = -1, wo[2] = wo[168] = 0, ho[2] = ho[168] = -1, po[2] = po[168] = 0, fo[2] = fo[168] = 0, go[2] = go[168] = -1, yo[2] = yo[168] = 0, vo[2] = vo[168] = 1, oo[8] = oo[162] = 0, so[8] = so[162] = -1, ao[8] = ao[162] = 0, uo[8] = uo[162] = 0, lo[8] = lo[162] = -1, co[8] = co[162] = 1, ho[8] = ho[162] = 1, po[8] = po[162] = 0, fo[8] = fo[162] = 1, go[8] = go[162] = 1, yo[8] = yo[162] = 0, vo[8] = vo[162] = 0, oo[32] = oo[138] = 0, so[32] = so[138] = 1, ao[32] = ao[138] = 1, uo[32] = uo[138] = 0, lo[32] = lo[138] = 1, co[32] = co[138] = 0, $i[32] = $i[138] = 1, to[32] = to[138] = 0, eo[32] = eo[138] = 0, no[32] = no[138] = 1, ro[32] = ro[138] = 0, io[32] = io[138] = 1, Eo[128] = Eo[42] = 0, bo[128] = bo[42] = 1, wo[128] = wo[42] = 1, _o[128] = _o[42] = 0, mo[128] = mo[42] = 1, xo[128] = xo[42] = 0, $i[128] = $i[42] = -1, to[128] = to[42] = 0, eo[128] = eo[42] = 1, no[128] = no[42] = -1, ro[128] = ro[42] = 0, io[128] = io[42] = 0, uo[5] = uo[165] = -1, lo[5] = lo[165] = 0, co[5] = co[165] = 0, Eo[5] = Eo[165] = 1, bo[5] = bo[165] = 0, wo[5] = wo[165] = 0, go[20] = go[150] = 0, yo[20] = yo[150] = 1, vo[20] = vo[150] = 1, no[20] = no[150] = 0, ro[20] = ro[150] = -1, io[20] = io[150] = 1, oo[80] = oo[90] = -1, so[80] = so[90] = 0, ao[80] = ao[90] = 1, _o[80] = _o[90] = 1, mo[80] = mo[90] = 0,xo[80] = xo[90] = 1,ho[65] = ho[105] = 0,po[65] = po[105] = 1,fo[65] = fo[105] = 0,$i[65] = $i[105] = 0,to[65] = to[105] = -1,eo[65] = eo[105] = 0,oo[160] = oo[10] = -1,so[160] = so[10] = 0,ao[160] = ao[10] = 1,uo[160] = uo[10] = -1,lo[160] = lo[10] = 0,co[160] = co[10] = 0,Eo[160] = Eo[10] = 1,bo[160] = bo[10] = 0,wo[160] = wo[10] = 0,_o[160] = _o[10] = 1,mo[160] = mo[10] = 0,xo[160] = xo[10] = 1,go[130] = go[40] = 0,yo[130] = yo[40] = 1,vo[130] = vo[40] = 1,ho[130] = ho[40] = 0,po[130] = po[40] = 1,fo[130] = fo[40] = 0,$i[130] = $i[40] = 0,to[130] = to[40] = -1,eo[130] = eo[40] = 0,no[130] = no[40] = 0,ro[130] = ro[40] = -1,io[130] = io[40] = 1,uo[37] = uo[133] = 0,lo[37] = lo[133] = 1,co[37] = co[133] = 1,Eo[37] = Eo[133] = 0,bo[37] = bo[133] = 1,wo[37] = wo[133] = 0,$i[37] = $i[133] = -1,to[37] = to[133] = 0,eo[37] = eo[133] = 0,no[37] = no[133] = 1,ro[37] = ro[133] = 0,io[37] = io[133] = 0,go[148] = go[22] = -1,yo[148] = yo[22] = 0,vo[148] = vo[22] = 0,Eo[148] = Eo[22] = 0,bo[148] = bo[22] = -1,wo[148] = wo[22] = 1,_o[148] = _o[22] = 0,mo[148] = mo[22] = 1,xo[148] = xo[22] = 1,no[148] = no[22] = -1,ro[148] = ro[22] = 0,io[148] = io[22] = 1,oo[82] = oo[88] = 0,so[82] = so[88] = -1,ao[82] = ao[88] = 1,go[82] = go[88] = 1,yo[82] = yo[88] = 0,vo[82] = vo[88] = 1,ho[82] = ho[88] = -1,po[82] = po[88] = 0,fo[82] = fo[88] = 1,_o[82] = _o[88] = 0,mo[82] = mo[88] = -1,xo[82] = xo[88] = 0,oo[73] = oo[97] = 0,so[73] = so[97] = 1,ao[73] = ao[97] = 0,uo[73] = uo[97] = 0,lo[73] = lo[97] = -1,co[73] = co[97] = 0,ho[73] = ho[97] = 1,po[73] = po[97] = 0,fo[73] = fo[97] = 0,$i[73] = $i[97] = 1,to[73] = to[97] = 0,eo[73] = eo[97] = 1,oo[145] = oo[25] = 0,so[145] = so[25] = -1,ao[145] = ao[25] = 0,ho[145] = ho[25] = 1,po[145] = po[25] = 0,fo[145] = fo[25] = 1,Eo[145] = Eo[25] = 0,bo[145] = bo[25] = 1,wo[145] = wo[25] = 1,no[145] = no[25] = -1,ro[145] = ro[25] = 0,io[145] = io[25] = 0,uo[70] = uo[100] = 0,lo[70] = lo[100] = 1,co[70] = co[100] = 0,go[70] = go[100] = -1,yo[70] = yo[100] = 0,vo[70] = vo[100] = 1,_o[70] = _o[100] = 0,mo[70] = mo[100] = -1,xo[70] = xo[100] = 1,$i[70] = $i[100] = 1,to[70] = to[100] = 0,eo[70] = eo[100] = 0,uo[101] = uo[69] = 0,lo[101] = lo[69] = 1,co[101] = co[69] = 0,$i[101] = $i[69] = 1,to[101] = to[69] = 0,eo[101] = eo[69] = 0,Eo[149] = Eo[21] = 0,bo[149] = bo[21] = 1,wo[149] = wo[21] = 1,no[149] = no[21] = -1,ro[149] = ro[21] = 0,io[149] = io[21] = 0,go[86] = go[84] = -1,yo[86] = yo[84] = 0,vo[86] = vo[84] = 1,_o[86] = _o[84] = 0,mo[86] = mo[84] = -1,xo[86] = xo[84] = 1,oo[89] = oo[81] = 0,so[89] = so[81] = -1,ao[89] = ao[81] = 0,ho[89] = ho[81] = 1,po[89] = po[81] = 0,fo[89] = fo[81] = 1,oo[96] = oo[74] = 0,so[96] = so[74] = 1,ao[96] = ao[74] = 0,uo[96] = uo[74] = -1,lo[96] = lo[74] = 0,co[96] = co[74] = 1,_o[96] = _o[74] = 1,mo[96] = mo[74] = 0,xo[96] = xo[74] = 0,$i[96] = $i[74] = 1,to[96] = to[74] = 0,eo[96] = eo[74] = 1,oo[24] = oo[146] = 0,so[24] = so[146] = -1,ao[24] = ao[146] = 1,go[24] = go[146] = 1,yo[24] = yo[146] = 0,vo[24] = vo[146] = 1,ho[24] = ho[146] = 0,po[24] = po[146] = 1,fo[24] = fo[146] = 1,no[24] = no[146] = 0,ro[24] = ro[146] = -1,io[24] = io[146] = 0,uo[6] = uo[164] = -1,lo[6] = lo[164] = 0,co[6] = co[164] = 1,go[6] = go[164] = -1,yo[6] = yo[164] = 0,vo[6] = vo[164] = 0,Eo[6] = Eo[164] = 0,bo[6] = bo[164] = -1,wo[6] = wo[164] = 1,_o[6] = _o[164] = 1,mo[6] = mo[164] = 0,xo[6] = xo[164] = 0,ho[129] = ho[41] = 0,po[129] = po[41] = 1,fo[129] = fo[41] = 1,Eo[129] = Eo[41] = 0,bo[129] = bo[41] = 1,wo[129] = wo[41] = 0,$i[129] = $i[41] = -1,to[129] = to[41] = 0,eo[129] = eo[41] = 0,no[129] = no[41] = 0,ro[129] = ro[41] = -1,io[129] = io[41] = 0,go[66] = go[104] = 0,yo[66] = yo[104] = 1,vo[66] = vo[104] = 0,ho[66] = ho[104] = -1,po[66] = po[104] = 0,fo[66] = fo[104] = 1,_o[66] = _o[104] = 0,mo[66] = mo[104] = -1,xo[66] = xo[104] = 0,$i[66] = $i[104] = 0,to[66] = to[104] = -1,eo[66] = eo[104] = 1,oo[144] = oo[26] = -1,so[144] = so[26] = 0,ao[144] = ao[26] = 0,Eo[144] = Eo[26] = 1,bo[144] = bo[26] = 0,wo[144] = wo[26] = 1,_o[144] = _o[26] = 0,mo[144] = mo[26] = 1,xo[144] = xo[26] = 1,no[144] = no[26] = -1,ro[144] = ro[26] = 0,io[144] = io[26] = 1,uo[36] = uo[134] = 0,lo[36] = lo[134] = 1,co[36] = co[134] = 1,go[36] = go[134] = 0,yo[36] = yo[134] = 1,vo[36] = vo[134] = 0,$i[36] = $i[134] = 0,to[36] = to[134] = -1,eo[36] = eo[134] = 1,no[36] = no[134] = 1,ro[36] = ro[134] = 0,io[36] = io[134] = 0,oo[9] = oo[161] = -1,so[9] = so[161] = 0,ao[9] = ao[161] = 0,uo[9] = uo[161] = 0,lo[9] = lo[161] = -1,co[9] = co[161] = 0,ho[9] = ho[161] = 1,po[9] = po[161] = 0,fo[9] = fo[161] = 0,Eo[9] = Eo[161] = 1,bo[9] = bo[161] = 0,wo[9] = wo[161] = 1,oo[136] = 0,so[136] = 1,ao[136] = 1,uo[136] = 0,lo[136] = 1,co[136] = 0,go[136] = -1,yo[136] = 0,vo[136] = 1,ho[136] = -1,po[136] = 0,fo[136] = 0,Eo[136] = 0,bo[136] = -1,wo[136] = 0,_o[136] = 0,mo[136] = -1,xo[136] = 1,$i[136] = 1,to[136] = 0,eo[136] = 0,no[136] = 1,ro[136] = 0,io[136] = 1,oo[34] = 0,so[34] = -1,ao[34] = 0,uo[34] = 0,lo[34] = -1,co[34] = 1,go[34] = 1,yo[34] = 0,vo[34] = 0,ho[34] = 1,po[34] = 0,fo[34] = 1,Eo[34] = 0,bo[34] = 1,wo[34] = 1,_o[34] = 0,mo[34] = 1,xo[34] = 0,$i[34] = -1,to[34] = 0,eo[34] = 1,no[34] = -1,ro[34] = 0,io[34] = 0,oo[35] = 0,so[35] = 1,ao[35] = 1,uo[35] = 0,lo[35] = -1,co[35] = 1,go[35] = 1,yo[35] = 0,vo[35] = 0,ho[35] = -1,po[35] = 0,fo[35] = 0,Eo[35] = 0,bo[35] = -1,wo[35] = 0,_o[35] = 0,mo[35] = 1,xo[35] = 0,$i[35] = -1,to[35] = 0,eo[35] = 1,no[35] = 1,ro[35] = 0,io[35] = 1,oo[153] = 0,so[153] = 1,ao[153] = 1,ho[153] = -1,po[153] = 0,fo[153] = 0,Eo[153] = 0,bo[153] = -1,wo[153] = 0,no[153] = 1,ro[153] = 0,io[153] = 1,uo[102] = 0,lo[102] = -1,co[102] = 1,go[102] = 1,yo[102] = 0,vo[102] = 0,_o[102] = 0,mo[102] = 1,xo[102] = 0,$i[102] = -1,to[102] = 0,eo[102] = 1,oo[155] = 0,so[155] = -1,ao[155] = 0,ho[155] = 1,po[155] = 0,fo[155] = 1,Eo[155] = 0,bo[155] = 1,wo[155] = 1,no[155] = -1,ro[155] = 0,io[155] = 0,uo[103] = 0,lo[103] = 1,co[103] = 0,go[103] = -1,yo[103] = 0,vo[103] = 1,_o[103] = 0,mo[103] = -1,xo[103] = 1,$i[103] = 1,to[103] = 0,eo[103] = 0,oo[152] = 0,so[152] = 1,ao[152] = 1,go[152] = -1,yo[152] = 0,vo[152] = 1,ho[152] = -1,po[152] = 0,fo[152] = 0,Eo[152] = 0,bo[152] = -1,wo[152] = 0,_o[152] = 0,mo[152] = -1,xo[152] = 1,no[152] = 1,ro[152] = 0,io[152] = 1,oo[156] = 0,so[156] = -1,ao[156] = 1,go[156] = 1,yo[156] = 0,vo[156] = 1,ho[156] = -1,po[156] = 0,fo[156] = 0,Eo[156] = 0,bo[156] = -1,wo[156] = 0,_o[156] = 0,mo[156] = 1,xo[156] = 1,no[156] = -1,ro[156] = 0,io[156] = 1,oo[137] = 0,so[137] = 1,ao[137] = 1,uo[137] = 0,lo[137] = 1,co[137] = 0,ho[137] = -1,po[137] = 0,fo[137] = 0,Eo[137] = 0,bo[137] = -1,wo[137] = 0,$i[137] = 1,to[137] = 0,eo[137] = 0,no[137] = 1,ro[137] = 0,io[137] = 1,oo[139] = 0,so[139] = 1,ao[139] = 1,uo[139] = 0,lo[139] = -1,co[139] = 0,ho[139] = 1,po[139] = 0,fo[139] = 0,Eo[139] = 0,bo[139] = 1,wo[139] = 0,$i[139] = -1,to[139] = 0,eo[139] = 0,no[139] = 1,ro[139] = 0,io[139] = 1,oo[98] = 0,so[98] = -1,ao[98] = 0,uo[98] = 0,lo[98] = -1,co[98] = 1,go[98] = 1,yo[98] = 0,vo[98] = 0,ho[98] = 1,po[98] = 0,fo[98] = 1,_o[98] = 0,mo[98] = 1,xo[98] = 0,$i[98] = -1,to[98] = 0,eo[98] = 1,oo[99] = 0,so[99] = 1,ao[99] = 0,uo[99] = 0,lo[99] = -1,co[99] = 1,go[99] = 1,yo[99] = 0,vo[99] = 0,ho[99] = -1,po[99] = 0,fo[99] = 1,_o[99] = 0,mo[99] = -1,xo[99] = 0,$i[99] = 1,to[99] = 0,eo[99] = 1,uo[38] = 0,lo[38] = -1,co[38] = 1,go[38] = 1,yo[38] = 0,vo[38] = 0,Eo[38] = 0,bo[38] = 1,wo[38] = 1,_o[38] = 0,mo[38] = 1,xo[38] = 0,$i[38] = -1,to[38] = 0,eo[38] = 1,no[38] = -1,ro[38] = 0,io[38] = 0,uo[39] = 0,lo[39] = 1,co[39] = 1,go[39] = -1,yo[39] = 0,vo[39] = 0,Eo[39] = 0,bo[39] = -1,wo[39] = 1,_o[39] = 0,mo[39] = 1,xo[39] = 0,$i[39] = -1,to[39] = 0,eo[39] = 1,no[39] = 1,ro[39] = 0,io[39] = 0;
    var Io = function (t) {
        return [[t.bottomleft, 0], [0, 0], [0, t.leftbottom]]
    }, No = function (t) {
        return [[1, t.rightbottom], [1, 0], [t.bottomright, 0]]
    }, So = function (t) {
        return [[t.topright, 1], [1, 1], [1, t.righttop]]
    }, Co = function (t) {
        return [[0, t.lefttop], [0, 1], [t.topleft, 1]]
    }, Po = function (t) {
        return [[t.bottomright, 0], [t.bottomleft, 0], [0, t.leftbottom], [0, t.lefttop]]
    }, Lo = function (t) {
        return [[t.bottomright, 0], [t.bottomleft, 0], [1, t.righttop], [1, t.rightbottom]]
    }, Mo = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [t.topleft, 1], [t.topright, 1]]
    }, Oo = function (t) {
        return [[0, t.leftbottom], [0, t.lefttop], [t.topleft, 1], [t.topright, 1]]
    }, Ro = [], To = [], Ao = [], Do = [], Fo = [], ko = [], Go = [], qo = [];
    Do[1] = Fo[1] = 18, Do[169] = Fo[169] = 18, Ao[4] = To[4] = 12, Ao[166] = To[166] = 12, Ro[16] = qo[16] = 4, Ro[154] = qo[154] = 4, ko[64] = Go[64] = 22, ko[106] = Go[106] = 22, Ao[2] = ko[2] = 17, Do[2] = Fo[2] = 18, Ao[168] = ko[168] = 17, Do[168] = Fo[168] = 18, Ro[8] = Do[8] = 9, To[8] = Ao[8] = 12, Ro[162] = Do[162] = 9, To[162] = Ao[162] = 12, Ro[32] = qo[32] = 4, To[32] = Go[32] = 1, Ro[138] = qo[138] = 4, To[138] = Go[138] = 1, Fo[128] = qo[128] = 21, ko[128] = Go[128] = 22, Fo[42] = qo[42] = 21, ko[42] = Go[42] = 22, To[5] = Fo[5] = 14, To[165] = Fo[165] = 14, Ao[20] = qo[20] = 6, Ao[150] = qo[150] = 6, Ro[80] = ko[80] = 11, Ro[90] = ko[90] = 11, Do[65] = Go[65] = 3, Do[105] = Go[105] = 3, Ro[160] = ko[160] = 11, To[160] = Fo[160] = 14, Ro[10] = ko[10] = 11, To[10] = Fo[10] = 14, Ao[130] = qo[130] = 6, Do[130] = Go[130] = 3, Ao[40] = qo[40] = 6, Do[40] = Go[40] = 3, To[101] = Go[101] = 1, To[69] = Go[69] = 1, Fo[149] = qo[149] = 21, Fo[21] = qo[21] = 21, Ao[86] = ko[86] = 17, Ao[84] = ko[84] = 17, Ro[89] = Do[89] = 9, Ro[81] = Do[81] = 9, Ro[96] = Go[96] = 0, To[96] = ko[96] = 15, Ro[74] = Go[74] = 0, To[74] = ko[74] = 15, Ro[24] = Ao[24] = 8, Do[24] = qo[24] = 7, Ro[146] = Ao[146] = 8, Do[146] = qo[146] = 7, To[6] = ko[6] = 15, Ao[6] = Fo[6] = 16, To[164] = ko[164] = 15, Ao[164] = Fo[164] = 16, Do[129] = qo[129] = 7, Fo[129] = Go[129] = 20, Do[41] = qo[41] = 7, Fo[41] = Go[41] = 20, Ao[66] = Go[66] = 2, Do[66] = ko[66] = 19, Ao[104] = Go[104] = 2, Do[104] = ko[104] = 19, Ro[144] = Fo[144] = 10, ko[144] = qo[144] = 23, Ro[26] = Fo[26] = 10, ko[26] = qo[26] = 23, To[36] = qo[36] = 5, Ao[36] = Go[36] = 2, To[134] = qo[134] = 5, Ao[134] = Go[134] = 2, Ro[9] = Fo[9] = 10, To[9] = Do[9] = 13, Ro[161] = Fo[161] = 10, To[161] = Do[161] = 13, To[37] = qo[37] = 5, Fo[37] = Go[37] = 20, To[133] = qo[133] = 5, Fo[133] = Go[133] = 20, Ao[148] = Fo[148] = 16, ko[148] = qo[148] = 23, Ao[22] = Fo[22] = 16, ko[22] = qo[22] = 23, Ro[82] = Ao[82] = 8, Do[82] = ko[82] = 19, Ro[88] = Ao[88] = 8, Do[88] = ko[88] = 19, Ro[73] = Go[73] = 0, To[73] = Do[73] = 13, Ro[97] = Go[97] = 0, To[97] = Do[97] = 13, Ro[145] = Do[145] = 9, Fo[145] = qo[145] = 21, Ro[25] = Do[25] = 9, Fo[25] = qo[25] = 21, To[70] = Go[70] = 1,Ao[70] = ko[70] = 17,To[100] = Go[100] = 1,Ao[100] = ko[100] = 17,Ro[34] = Do[34] = 9,To[34] = Ao[34] = 12,Fo[34] = qo[34] = 21,ko[34] = Go[34] = 22,Ro[136] = qo[136] = 4,To[136] = Go[136] = 1,Ao[136] = ko[136] = 17,Do[136] = Fo[136] = 18,Ro[35] = qo[35] = 4,To[35] = Ao[35] = 12,Do[35] = Fo[35] = 18,ko[35] = Go[35] = 22,Ro[153] = qo[153] = 4,Do[153] = Fo[153] = 18,To[102] = Ao[102] = 12,ko[102] = Go[102] = 22,Ro[155] = Do[155] = 9,Fo[155] = qo[155] = 23,To[103] = Go[103] = 1,Ao[103] = ko[103] = 17,Ro[152] = qo[152] = 4,Ao[152] = ko[152] = 17,Do[152] = Fo[152] = 18,Ro[156] = Ao[156] = 8,Do[156] = Fo[156] = 18,ko[156] = qo[156] = 23,Ro[137] = qo[137] = 4,To[137] = Go[137] = 1,Do[137] = Fo[137] = 18,Ro[139] = qo[139] = 4,To[139] = Do[139] = 13,Fo[139] = Go[139] = 20,Ro[98] = Do[98] = 9,To[98] = Ao[98] = 12,ko[98] = Go[98] = 22,Ro[99] = Go[99] = 0,To[99] = Ao[99] = 12,Do[99] = ko[99] = 19,To[38] = Ao[38] = 12,Fo[38] = qo[38] = 21,ko[38] = Go[38] = 22,To[39] = qo[39] = 5,Ao[39] = Fo[39] = 16,ko[39] = Go[39] = 22;
    var Bo = [];

    function zo(t, e, n) {
        return (t - e) / (n - e)
    }

    function jo(t) {
        return t.constructor.toString().indexOf("Array") > -1
    }

    function Uo(t, e, n, r, i, o) {
        for (var s = t.cells[n][e], a = s.cval_real, u = e + r, l = n + i, c = [], h = !1; !h;) {
            if (void 0 === t.cells[l] || void 0 === t.cells[l][u]) if (l -= i, u -= r, a = (s = t.cells[l][u]).cval_real, -1 === i) if (0 === o) if (1 & a) c.push([u, l]), r = -1, i = 0, o = 0; else {
                if (!(4 & a)) {
                    c.push([u + s.bottomright, l]), r = 0, i = 1, o = 1, h = !0;
                    break
                }
                c.push([u + 1, l]), r = 1, i = 0, o = 0
            } else {
                if (!(1 & a)) {
                    if (4 & a) {
                        c.push([u + s.bottomright, l]), r = 0, i = 1, o = 1, h = !0;
                        break
                    }
                    c.push([u + s.bottomleft, l]), r = 0, i = 1, o = 0, h = !0;
                    break
                }
                c.push([u, l]), r = -1, i = 0, o = 0
            } else if (1 === i) if (0 === o) {
                if (!(a & Qi)) {
                    if (a & Ki) {
                        c.push([u + s.topleft, l + 1]), r = 0, i = -1, o = 0, h = !0;
                        break
                    }
                    c.push([u + s.topright, l + 1]), r = 0, i = -1, o = 1, h = !0;
                    break
                }
                c.push([u + 1, l + 1]), r = 1, i = 0, o = 1
            } else c.push([u + 1, l + 1]), r = 1, i = 0, o = 1; else if (-1 === r) if (0 === o) {
                if (!(a & Ki)) {
                    if (1 & a) {
                        c.push([u, l + s.leftbottom]), r = 1, i = 0, o = 0, h = !0;
                        break
                    }
                    c.push([u, l + s.lefttop]), r = 1, i = 0, o = 1, h = !0;
                    break
                }
                c.push([u, l + 1]), r = 0, i = 1, o = 0
            } else {
                if (!(a & Ki)) {
                    console.log("MarchingSquaresJS-isoBands: wtf");
                    break
                }
                c.push([u, l + 1]), r = 0, i = 1, o = 0
            } else {
                if (1 !== r) {
                    console.log("MarchingSquaresJS-isoBands: we came from nowhere!");
                    break
                }
                if (0 === o) {
                    if (!(4 & a)) {
                        c.push([u + 1, l + s.rightbottom]), r = -1, i = 0, o = 0, h = !0;
                        break
                    }
                    c.push([u + 1, l]), r = 0, i = -1, o = 1
                } else {
                    if (!(4 & a)) {
                        if (a & Qi) {
                            c.push([u + 1, l + s.righttop]), r = -1, i = 0, o = 1;
                            break
                        }
                        c.push([u + 1, l + s.rightbottom]), r = -1, i = 0, o = 0, h = !0;
                        break
                    }
                    c.push([u + 1, l]), r = 0, i = -1, o = 1
                }
            } else if (a = (s = t.cells[l][u]).cval_real, -1 === r) if (0 === o) if (void 0 !== t.cells[l - 1] && void 0 !== t.cells[l - 1][u]) r = 0, i = -1, o = 1; else {
                if (!(1 & a)) {
                    c.push([u + s.bottomright, l]), r = 0, i = 1, o = 1, h = !0;
                    break
                }
                c.push([u, l])
            } else {
                if (!(a & Ki)) {
                    console.log("MarchingSquaresJS-isoBands: found entry from top at " + u + "," + l);
                    break
                }
                console.log("MarchingSquaresJS-isoBands: proceeding in x-direction!")
            } else if (1 === r) {
                if (0 === o) {
                    console.log("MarchingSquaresJS-isoBands: wtf");
                    break
                }
                if (void 0 !== t.cells[l + 1] && void 0 !== t.cells[l + 1][u]) r = 0, i = 1, o = 0; else {
                    if (!(a & Qi)) {
                        c.push([u + s.topleft, l + 1]), r = 0, i = -1, o = 0, h = !0;
                        break
                    }
                    c.push([u + 1, l + 1]), r = 1, i = 0, o = 1
                }
            } else if (-1 === i) {
                if (1 !== o) {
                    console.log("MarchingSquaresJS-isoBands: wtf");
                    break
                }
                if (void 0 !== t.cells[l][u + 1]) r = 1, i = 0, o = 1; else {
                    if (!(4 & a)) {
                        c.push([u + 1, l + s.righttop]), r = -1, i = 0, o = 1, h = !0;
                        break
                    }
                    c.push([u + 1, l]), r = 0, i = -1, o = 1
                }
            } else {
                if (1 !== i) {
                    console.log("MarchingSquaresJS-isoBands: where did we came from???");
                    break
                }
                if (0 !== o) {
                    console.log("MarchingSquaresJS-isoBands: wtf");
                    break
                }
                if (void 0 !== t.cells[l][u - 1]) r = -1, i = 0, o = 0; else {
                    if (!(a & Ki)) {
                        c.push([u, l + s.leftbottom]), r = 1, i = 0, o = 0, h = !0;
                        break
                    }
                    c.push([u, l + 1]), r = 0, i = 1, o = 0
                }
            }
            if (l += i, (u += r) === e && l === n) break
        }
        return {path: c, i: u, j: l, x: r, y: i, o: o}
    }

    function Vo(t) {
        if (t.edges.length > 0) {
            var e = t.edges[t.edges.length - 1], n = t.cval_real;
            switch (e) {
                case 0:
                    return n & Qi ? {p: [1, t.righttop], x: -1, y: 0, o: 1} : {p: [t.topleft, 1], x: 0, y: -1, o: 0};
                case 1:
                    return 4 & n ? {p: [t.topleft, 1], x: 0, y: -1, o: 0} : {p: [1, t.rightbottom], x: -1, y: 0, o: 0};
                case 2:
                    return 4 & n ? {p: [t.bottomright, 0], x: 0, y: 1, o: 1} : {p: [t.topleft, 1], x: 0, y: -1, o: 0};
                case 3:
                    return 1 & n ? {p: [t.topleft, 1], x: 0, y: -1, o: 0} : {p: [t.bottomleft, 0], x: 0, y: 1, o: 0};
                case 4:
                    return n & Qi ? {p: [1, t.righttop], x: -1, y: 0, o: 1} : {p: [t.topright, 1], x: 0, y: -1, o: 1};
                case 5:
                    return 4 & n ? {p: [t.topright, 1], x: 0, y: -1, o: 1} : {p: [1, t.rightbottom], x: -1, y: 0, o: 0};
                case 6:
                    return 4 & n ? {p: [t.bottomright, 0], x: 0, y: 1, o: 1} : {p: [t.topright, 1], x: 0, y: -1, o: 1};
                case 7:
                    return 1 & n ? {p: [t.topright, 1], x: 0, y: -1, o: 1} : {p: [t.bottomleft, 0], x: 0, y: 1, o: 0};
                case 8:
                    return 4 & n ? {p: [t.bottomright, 0], x: 0, y: 1, o: 1} : {p: [1, t.righttop], x: -1, y: 0, o: 1};
                case 9:
                    return 1 & n ? {p: [1, t.righttop], x: -1, y: 0, o: 1} : {p: [t.bottomleft, 0], x: 0, y: 1, o: 0};
                case 10:
                    return 1 & n ? {p: [0, t.leftbottom], x: 1, y: 0, o: 0} : {p: [1, t.righttop], x: -1, y: 0, o: 1};
                case 11:
                    return n & Ki ? {p: [1, t.righttop], x: -1, y: 0, o: 1} : {p: [0, t.lefttop], x: 1, y: 0, o: 1};
                case 12:
                    return 4 & n ? {p: [t.bottomright, 0], x: 0, y: 1, o: 1} : {
                        p: [1, t.rightbottom],
                        x: -1,
                        y: 0,
                        o: 0
                    };
                case 13:
                    return 1 & n ? {p: [1, t.rightbottom], x: -1, y: 0, o: 0} : {
                        p: [t.bottomleft, 0],
                        x: 0,
                        y: 1,
                        o: 0
                    };
                case 14:
                    return 1 & n ? {p: [0, t.leftbottom], x: 1, y: 0, o: 0} : {
                        p: [1, t.rightbottom],
                        x: -1,
                        y: 0,
                        o: 0
                    };
                case 15:
                    return n & Ki ? {p: [1, t.rightbottom], x: -1, y: 0, o: 0} : {p: [0, t.lefttop], x: 1, y: 0, o: 1};
                case 16:
                    return 4 & n ? {p: [t.bottomright, 0], x: 0, y: 1, o: 1} : {p: [0, t.leftbottom], x: 1, y: 0, o: 0};
                case 17:
                    return n & Ki ? {p: [t.bottomright, 0], x: 0, y: 1, o: 1} : {p: [0, t.lefttop], x: 1, y: 0, o: 1};
                case 18:
                    return 1 & n ? {p: [0, t.leftbottom], x: 1, y: 0, o: 0} : {p: [t.bottomleft, 0], x: 0, y: 1, o: 0};
                case 19:
                    return n & Ki ? {p: [t.bottomleft, 0], x: 0, y: 1, o: 0} : {p: [0, t.lefttop], x: 1, y: 0, o: 1};
                case 20:
                    return n & Ki ? {p: [t.topleft, 1], x: 0, y: -1, o: 0} : {p: [0, t.leftbottom], x: 1, y: 0, o: 0};
                case 21:
                    return n & Qi ? {p: [0, t.leftbottom], x: 1, y: 0, o: 0} : {p: [t.topright, 1], x: 0, y: -1, o: 1};
                case 22:
                    return n & Ki ? {p: [t.topleft, 1], x: 0, y: -1, o: 0} : {p: [0, t.lefttop], x: 1, y: 0, o: 1};
                case 23:
                    return n & Qi ? {p: [0, t.lefttop], x: 1, y: 0, o: 1} : {p: [t.topright, 1], x: 0, y: -1, o: 1};
                default:
                    console.log("MarchingSquaresJS-isoBands: edge index out of range!"), console.log(t)
            }
        }
        return null
    }

    function Xo(t, e, n, r) {
        var i, o, s, a, u, l = t.cval;
        switch (e) {
            case-1:
                switch (r) {
                    case 0:
                        i = To[l], s = uo[l], a = lo[l], u = co[l];
                        break;
                    default:
                        i = Ro[l], s = oo[l], a = so[l], u = ao[l]
                }
                break;
            case 1:
                switch (r) {
                    case 0:
                        i = Fo[l], s = Eo[l], a = bo[l], u = wo[l];
                        break;
                    default:
                        i = ko[l], s = _o[l], a = mo[l], u = xo[l]
                }
                break;
            default:
                switch (n) {
                    case-1:
                        switch (r) {
                            case 0:
                                i = Go[l], s = $i[l], a = to[l], u = eo[l];
                                break;
                            default:
                                i = qo[l], s = no[l], a = ro[l], u = io[l]
                        }
                        break;
                    case 1:
                        switch (r) {
                            case 0:
                                i = Do[l], s = ho[l], a = po[l], u = fo[l];
                                break;
                            default:
                                i = Ao[l], s = go[l], a = yo[l], u = vo[l]
                        }
                }
        }
        if (o = t.edges.indexOf(i), void 0 === t.edges[o]) return null;
        switch (function (t, e) {
            delete t.edges[e];
            for (var n = e + 1; n < t.edges.length; n++) t.edges[n - 1] = t.edges[n];
            t.edges.pop()
        }(t, o), l = t.cval_real, i) {
            case 0:
                l & Qi ? (e = t.topleft, n = 1) : (e = 1, n = t.righttop);
                break;
            case 1:
                4 & l ? (e = 1, n = t.rightbottom) : (e = t.topleft, n = 1);
                break;
            case 2:
                4 & l ? (e = t.topleft, n = 1) : (e = t.bottomright, n = 0);
                break;
            case 3:
                1 & l ? (e = t.bottomleft, n = 0) : (e = t.topleft, n = 1);
                break;
            case 4:
                l & Qi ? (e = t.topright, n = 1) : (e = 1, n = t.righttop);
                break;
            case 5:
                4 & l ? (e = 1, n = t.rightbottom) : (e = t.topright, n = 1);
                break;
            case 6:
                4 & l ? (e = t.topright, n = 1) : (e = t.bottomright, n = 0);
                break;
            case 7:
                1 & l ? (e = t.bottomleft, n = 0) : (e = t.topright, n = 1);
                break;
            case 8:
                4 & l ? (e = 1, n = t.righttop) : (e = t.bottomright, n = 0);
                break;
            case 9:
                1 & l ? (e = t.bottomleft, n = 0) : (e = 1, n = t.righttop);
                break;
            case 10:
                1 & l ? (e = 1, n = t.righttop) : (e = 0, n = t.leftbottom);
                break;
            case 11:
                l & Ki ? (e = 0, n = t.lefttop) : (e = 1, n = t.righttop);
                break;
            case 12:
                4 & l ? (e = 1, n = t.rightbottom) : (e = t.bottomright, n = 0);
                break;
            case 13:
                1 & l ? (e = t.bottomleft, n = 0) : (e = 1, n = t.rightbottom);
                break;
            case 14:
                1 & l ? (e = 1, n = t.rightbottom) : (e = 0, n = t.leftbottom);
                break;
            case 15:
                l & Ki ? (e = 0, n = t.lefttop) : (e = 1, n = t.rightbottom);
                break;
            case 16:
                4 & l ? (e = 0, n = t.leftbottom) : (e = t.bottomright, n = 0);
                break;
            case 17:
                l & Ki ? (e = 0, n = t.lefttop) : (e = t.bottomright, n = 0);
                break;
            case 18:
                1 & l ? (e = t.bottomleft, n = 0) : (e = 0, n = t.leftbottom);
                break;
            case 19:
                l & Ki ? (e = 0, n = t.lefttop) : (e = t.bottomleft, n = 0);
                break;
            case 20:
                l & Ki ? (e = 0, n = t.leftbottom) : (e = t.topleft, n = 1);
                break;
            case 21:
                l & Qi ? (e = t.topright, n = 1) : (e = 0, n = t.leftbottom);
                break;
            case 22:
                l & Ki ? (e = 0, n = t.lefttop) : (e = t.topleft, n = 1);
                break;
            case 23:
                l & Qi ? (e = t.topright, n = 1) : (e = 0, n = t.lefttop);
                break;
            default:
                return console.log("MarchingSquaresJS-isoBands: edge index out of range!"), console.log(t), null
        }
        return void 0 !== e && void 0 !== n && void 0 !== s && void 0 !== a && void 0 !== u || (console.log("MarchingSquaresJS-isoBands: undefined value!"), console.log(t), console.log(e + " " + n + " " + s + " " + a + " " + u)), {
            p: [e, n],
            x: s,
            y: a,
            o: u
        }
    }

    function Yo(t) {
        var e = [], n = [];
        t.forEach((function (t) {
            var r = zr(l([t]));
            n.push(r), e.push({ring: t, area: r})
        })), n.sort((function (t, e) {
            return e - t
        }));
        var r = [];
        return n.forEach((function (t) {
            for (var n = 0; n < e.length; n++) if (e[n].area === t) {
                r.push(e[n].ring), e.splice(n, 1);
                break
            }
        })), r
    }

    function Ho(t) {
        for (var e = t.map((function (t) {
            return {lrCoordinates: t, grouped: !1}
        })), n = []; !Jo(e);) for (var r = 0; r < e.length; r++) if (!e[r].grouped) {
            var i = [];
            i.push(e[r].lrCoordinates), e[r].grouped = !0;
            for (var o = l([e[r].lrCoordinates]), s = r + 1; s < e.length; s++) {
                if (!e[s].grouped) Wo(l([e[s].lrCoordinates]), o) && (i.push(e[s].lrCoordinates), e[s].grouped = !0)
            }
            n.push(i)
        }
        return n
    }

    function Wo(t, e) {
        for (var n = En(t), r = 0; r < n.features.length; r++) if (!ye(n.features[r], e)) return !1;
        return !0
    }

    function Jo(t) {
        for (var e = 0; e < t.length; e++) if (!1 === t[e].grouped) return !1;
        return !0
    }

    function Zo(t, e, n) {
        if (!P(n = n || {})) throw new Error("options is invalid");
        var r = n.pivot, i = n.mutate;
        if (!t) throw new Error("geojson is required");
        if (null == e || isNaN(e)) throw new Error("angle is required");
        return 0 === e || (r || (r = xn(t)), !1 !== i && void 0 !== i || (t = Ie(t)), z(t, (function (t) {
            var n = ki(r, t) + e, i = Tr(r, t), o = T(qi(r, i, n));
            t[0] = o[0], t[1] = o[1]
        }))), t
    }

    function Ko(t, e, n) {
        if (!P(n = n || {})) throw new Error("options is invalid");
        var r = n.origin, i = n.mutate;
        if (!t) throw new Error("geojson required");
        if ("number" != typeof e || 0 === e) throw new Error("invalid factor");
        var o = Array.isArray(r) || "object" == typeof r;
        return !0 !== i && (t = Ie(t)), "FeatureCollection" !== t.type || o ? Qo(t, e, r) : (X(t, (function (n, i) {
            t.features[i] = Qo(n, e, r)
        })), t)
    }

    function Qo(t, e, n) {
        var r = "Point" === q(t);
        return n = function (t, e) {
            null == e && (e = "centroid");
            if (Array.isArray(e) || "object" == typeof e) return R(e);
            var n = t.bbox ? t.bbox : ot(t), r = n[0], i = n[1], o = n[2], s = n[3];
            switch (e) {
                case"sw":
                case"southwest":
                case"westsouth":
                case"bottomleft":
                    return a([r, i]);
                case"se":
                case"southeast":
                case"eastsouth":
                case"bottomright":
                    return a([o, i]);
                case"nw":
                case"northwest":
                case"westnorth":
                case"topleft":
                    return a([r, s]);
                case"ne":
                case"northeast":
                case"eastnorth":
                case"topright":
                    return a([o, s]);
                case"center":
                    return mn(t);
                case void 0:
                case null:
                case"centroid":
                    return xn(t);
                default:
                    throw new Error("invalid origin")
            }
        }(t, n), 1 === e || r || z(t, (function (t) {
            var r = Tr(n, t), i = ki(n, t), o = T(qi(n, r * e, i));
            t[0] = o[0], t[1] = o[1], 3 === t.length && (t[2] *= e)
        })), t
    }

    function $o(t) {
        var e = t[0], n = t[1];
        return [n[0] - e[0], n[1] - e[1]]
    }

    function ts(t, e) {
        return t[0] * e[1] - e[0] * t[1]
    }

    function es(t, e) {
        return !function (t, e) {
            return 0 === ts($o(t), $o(e))
        }(t, e) && function (t, e) {
            var n, r, i = t[0], o = $o(t), s = e[0], a = $o(e), u = ts(o, a);
            return function (t, e) {
                return [t[0] + e[0], t[1] + e[1]]
            }(i, function (t, e) {
                return [t * e[0], t * e[1]]
            }(ts((r = i, [(n = s)[0] - r[0], n[1] - r[1]]), a) / u, o))
        }(t, e)
    }

    function ns(t, e, n) {
        var r = [], i = E(e, n), o = T(t), s = [];
        return o.forEach((function (t, e) {
            if (e !== o.length - 1) {
                var n = (l = t, c = o[e + 1], h = i, p = Math.sqrt((l[0] - c[0]) * (l[0] - c[0]) + (l[1] - c[1]) * (l[1] - c[1])), f = l[0] + h * (c[1] - l[1]) / p, g = c[0] + h * (c[1] - l[1]) / p, d = l[1] + h * (l[0] - c[0]) / p, y = c[1] + h * (l[0] - c[0]) / p, [[f, d], [g, y]]);
                if (r.push(n), e > 0) {
                    var a = r[e - 1], u = es(n, a);
                    !1 !== u && (a[1] = u, n[0] = u), s.push(a[0]), e === o.length - 2 && (s.push(n[0]), s.push(n[1]))
                }
                2 === o.length && (s.push(n[0]), s.push(n[1]))
            }
            var l, c, h, p, f, g, d, y
        })), h(s, t.properties)
    }

    function rs(t, e, n) {
        var r = e[0] - t[0], i = e[1] - t[1], o = n[0] - e[0];
        return function (t) {
            return (t > 0) - (t < 0) || +t
        }(r * (n[1] - e[1]) - o * i)
    }

    function is(t, e) {
        return e.geometry.coordinates[0].every((function (e) {
            return ye(a(e), t)
        }))
    }

    Bo[1] = Bo[169] = Io, Bo[4] = Bo[166] = No, Bo[16] = Bo[154] = So, Bo[64] = Bo[106] = Co, Bo[168] = Bo[2] = Po, Bo[162] = Bo[8] = Lo, Bo[138] = Bo[32] = Mo, Bo[42] = Bo[128] = Oo, Bo[5] = Bo[165] = function (t) {
        return [[0, 0], [0, t.leftbottom], [1, t.rightbottom], [1, 0]]
    }, Bo[20] = Bo[150] = function (t) {
        return [[1, 0], [t.bottomright, 0], [t.topright, 1], [1, 1]]
    }, Bo[80] = Bo[90] = function (t) {
        return [[1, 1], [1, t.righttop], [0, t.lefttop], [0, 1]]
    }, Bo[65] = Bo[105] = function (t) {
        return [[t.bottomleft, 0], [0, 0], [0, 1], [t.topleft, 1]]
    }, Bo[160] = Bo[10] = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [0, t.leftbottom], [0, t.lefttop]]
    }, Bo[130] = Bo[40] = function (t) {
        return [[t.topleft, 1], [t.topright, 1], [t.bottomright, 0], [t.bottomleft, 0]]
    }, Bo[85] = function () {
        return [[0, 0], [0, 1], [1, 1], [1, 0]]
    }, Bo[101] = Bo[69] = function (t) {
        return [[1, t.rightbottom], [1, 0], [0, 0], [0, 1], [t.topleft, 1]]
    }, Bo[149] = Bo[21] = function (t) {
        return [[t.topright, 1], [1, 1], [1, 0], [0, 0], [0, t.leftbottom]]
    }, Bo[86] = Bo[84] = function (t) {
        return [[1, 0], [t.bottomright, 0], [0, t.lefttop], [0, 1], [1, 1]]
    }, Bo[89] = Bo[81] = function (t) {
        return [[1, 1], [1, t.righttop], [t.bottomleft, 0], [0, 0], [0, 1]]
    }, Bo[96] = Bo[74] = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [0, t.lefttop], [0, 1], [t.topleft, 1]]
    }, Bo[24] = Bo[146] = function (t) {
        return [[1, 1], [1, t.righttop], [t.bottomright, 0], [t.bottomleft, 0], [t.topright, 1]]
    }, Bo[6] = Bo[164] = function (t) {
        return [[1, t.rightbottom], [1, 0], [t.bottomright, 0], [0, t.leftbottom], [0, t.lefttop]]
    }, Bo[129] = Bo[41] = function (t) {
        return [[t.topright, 1], [t.bottomleft, 0], [0, 0], [0, t.leftbottom], [t.topleft, 1]]
    }, Bo[66] = Bo[104] = function (t) {
        return [[t.bottomright, 0], [t.bottomleft, 0], [0, t.lefttop], [0, 1], [t.topleft, 1]]
    }, Bo[144] = Bo[26] = function (t) {
        return [[1, 1], [1, t.righttop], [0, t.leftbottom], [0, t.lefttop], [t.topright, 1]]
    }, Bo[36] = Bo[134] = function (t) {
        return [[1, t.rightbottom], [1, 0], [t.bottomright, 0], [t.topleft, 1], [t.topright, 1]]
    }, Bo[9] = Bo[161] = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [t.bottomleft, 0], [0, 0], [0, t.leftbottom]]
    }, Bo[37] = Bo[133] = function (t) {
        return [[1, t.rightbottom], [1, 0], [0, 0], [0, t.leftbottom], [t.topleft, 1], [t.topright, 1]]
    }, Bo[148] = Bo[22] = function (t) {
        return [[1, 1], [1, 0], [t.bottomright, 0], [0, t.leftbottom], [0, t.lefttop], [t.topright, 1]]
    }, Bo[82] = Bo[88] = function (t) {
        return [[1, 1], [1, t.righttop], [t.bottomright, 0], [t.bottomleft, 0], [0, t.lefttop], [0, 1]]
    }, Bo[73] = Bo[97] = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [t.bottomleft, 0], [0, 0], [0, 1], [t.topleft, 1]]
    }, Bo[145] = Bo[25] = function (t) {
        return [[1, 1], [1, t.righttop], [t.bottomleft, 0], [0, 0], [0, t.leftbottom], [t.topright, 1]]
    }, Bo[70] = Bo[100] = function (t) {
        return [[1, t.rightbottom], [1, 0], [t.bottomright, 0], [0, t.lefttop], [0, 1], [t.topleft, 1]]
    }, Bo[34] = function (t) {
        return [Oo(t), Lo(t)]
    }, Bo[35] = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [t.bottomright, 0], [t.bottomleft, 0], [0, t.leftbottom], [0, t.lefttop], [t.topleft, 1], [t.topright, 1]]
    }, Bo[136] = function (t) {
        return [Mo(t), Po(t)]
    }, Bo[153] = function (t) {
        return [So(t), Io(t)]
    }, Bo[102] = function (t) {
        return [No(t), Co(t)]
    }, Bo[155] = function (t) {
        return [[1, 1], [1, t.righttop], [t.bottomleft, 0], [0, 0], [0, t.leftbottom], [t.topright, 1]]
    }, Bo[103] = function (t) {
        return [[1, t.rightbottom], [1, 0], [t.bottomright, 0], [0, t.lefttop], [0, 1], [t.topleft, 1]]
    }, Bo[152] = function (t) {
        return [So(t), Po(t)]
    }, Bo[156] = function (t) {
        return [[1, 1], [1, t.righttop], [t.bottomright, 0], [t.bottomleft, 0], [0, t.leftbottom], [0, t.lefttop], [t.topright, 1]]
    }, Bo[137] = function (t) {
        return [Mo(t), Io(t)]
    }, Bo[139] = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [t.bottomleft, 0], [0, 0], [0, t.leftbottom], [t.topleft, 1], [t.topright, 1]]
    }, Bo[98] = function (t) {
        return [Lo(t), Co(t)]
    }, Bo[99] = function (t) {
        return [[1, t.righttop], [1, t.rightbottom], [t.bottomright, 0], [t.bottomleft, 0], [0, t.lefttop], [0, 1], [t.topleft, 1]]
    }, Bo[38] = function (t) {
        return [No(t), Oo(t)]
    }, Bo[39] = function (t) {
        return [[1, t.rightbottom], [1, 0], [t.bottomright, 0], [0, t.leftbottom], [0, t.lefttop], [t.topleft, 1], [t.topright, 1]]
    };
    var os = function () {
        function t(e) {
            this.id = t.buildId(e), this.coordinates = e, this.innerEdges = [], this.outerEdges = [], this.outerEdgesSorted = !1
        }

        return t.buildId = function (t) {
            return t.join(",")
        }, t.prototype.removeInnerEdge = function (t) {
            this.innerEdges = this.innerEdges.filter((function (e) {
                return e.from.id !== t.from.id
            }))
        }, t.prototype.removeOuterEdge = function (t) {
            this.outerEdges = this.outerEdges.filter((function (e) {
                return e.to.id !== t.to.id
            }))
        }, t.prototype.addOuterEdge = function (t) {
            this.outerEdges.push(t), this.outerEdgesSorted = !1
        }, t.prototype.sortOuterEdges = function () {
            var t = this;
            this.outerEdgesSorted || (this.outerEdges.sort((function (e, n) {
                var r = e.to, i = n.to;
                if (r.coordinates[0] - t.coordinates[0] >= 0 && i.coordinates[0] - t.coordinates[0] < 0) return 1;
                if (r.coordinates[0] - t.coordinates[0] < 0 && i.coordinates[0] - t.coordinates[0] >= 0) return -1;
                if (r.coordinates[0] - t.coordinates[0] == 0 && i.coordinates[0] - t.coordinates[0] == 0) return r.coordinates[1] - t.coordinates[1] >= 0 || i.coordinates[1] - t.coordinates[1] >= 0 ? r.coordinates[1] - i.coordinates[1] : i.coordinates[1] - r.coordinates[1];
                var o = rs(t.coordinates, r.coordinates, i.coordinates);
                return o < 0 ? 1 : o > 0 ? -1 : Math.pow(r.coordinates[0] - t.coordinates[0], 2) + Math.pow(r.coordinates[1] - t.coordinates[1], 2) - (Math.pow(i.coordinates[0] - t.coordinates[0], 2) + Math.pow(i.coordinates[1] - t.coordinates[1], 2))
            })), this.outerEdgesSorted = !0)
        }, t.prototype.getOuterEdges = function () {
            return this.sortOuterEdges(), this.outerEdges
        }, t.prototype.getOuterEdge = function (t) {
            return this.sortOuterEdges(), this.outerEdges[t]
        }, t.prototype.addInnerEdge = function (t) {
            this.innerEdges.push(t)
        }, t
    }(), ss = function () {
        function t(t, e) {
            this.from = t, this.to = e, this.next = void 0, this.label = void 0, this.symetric = void 0, this.ring = void 0, this.from.addOuterEdge(this), this.to.addInnerEdge(this)
        }

        return t.prototype.getSymetric = function () {
            return this.symetric || (this.symetric = new t(this.to, this.from), this.symetric.symetric = this), this.symetric
        }, t.prototype.deleteEdge = function () {
            this.from.removeOuterEdge(this), this.to.removeInnerEdge(this)
        }, t.prototype.isEqual = function (t) {
            return this.from.id === t.from.id && this.to.id === t.to.id
        }, t.prototype.toString = function () {
            return "Edge { " + this.from.id + " -> " + this.to.id + " }"
        }, t.prototype.toLineString = function () {
            return h([this.from.coordinates, this.to.coordinates])
        }, t.prototype.compareTo = function (t) {
            return rs(t.from.coordinates, t.to.coordinates, this.to.coordinates)
        }, t
    }(), as = function () {
        function t() {
            this.edges = [], this.polygon = void 0, this.envelope = void 0
        }

        return t.prototype.push = function (t) {
            this[this.edges.length] = t, this.edges.push(t), this.polygon = this.envelope = void 0
        }, t.prototype.get = function (t) {
            return this.edges[t]
        }, Object.defineProperty(t.prototype, "length", {
            get: function () {
                return this.edges.length
            }, enumerable: !0, configurable: !0
        }), t.prototype.forEach = function (t) {
            this.edges.forEach(t)
        }, t.prototype.map = function (t) {
            return this.edges.map(t)
        }, t.prototype.some = function (t) {
            return this.edges.some(t)
        }, t.prototype.isValid = function () {
            return !0
        }, t.prototype.isHole = function () {
            var t = this, e = this.edges.reduce((function (e, n, r) {
                    return n.from.coordinates[1] > t.edges[e].from.coordinates[1] && (e = r), e
                }), 0), n = (0 === e ? this.length : e) - 1, r = (e + 1) % this.length,
                i = rs(this.edges[n].from.coordinates, this.edges[e].from.coordinates, this.edges[r].from.coordinates);
            return 0 === i ? this.edges[n].from.coordinates[0] > this.edges[r].from.coordinates[0] : i > 0
        }, t.prototype.toMultiPoint = function () {
            return d(this.edges.map((function (t) {
                return t.from.coordinates
            })))
        }, t.prototype.toPolygon = function () {
            if (this.polygon) return this.polygon;
            var t = this.edges.map((function (t) {
                return t.from.coordinates
            }));
            return t.push(this.edges[0].from.coordinates), this.polygon = l([t])
        }, t.prototype.getEnvelope = function () {
            return this.envelope ? this.envelope : this.envelope = gn(this.toPolygon())
        }, t.findEdgeRingContaining = function (t, e) {
            var n, r, i = t.getEnvelope();
            return e.forEach((function (e) {
                var o, s, u, l, c, h, p = e.getEnvelope();
                if ((r && (n = r.getEnvelope()), s = i, u = (o = p).geometry.coordinates.map((function (t) {
                    return t[0]
                })), l = o.geometry.coordinates.map((function (t) {
                    return t[1]
                })), c = s.geometry.coordinates.map((function (t) {
                    return t[0]
                })), h = s.geometry.coordinates.map((function (t) {
                    return t[1]
                })), Math.max(null, u) !== Math.max(null, c) || Math.max(null, l) !== Math.max(null, h) || Math.min(null, u) !== Math.min(null, c) || Math.min(null, l) !== Math.min(null, h)) && is(p, i)) {
                    var f = t.map((function (t) {
                        return t.from.coordinates
                    })).find((function (t) {
                        return !e.some((function (e) {
                            return n = t, r = e.from.coordinates, n[0] === r[0] && n[1] === r[1];
                            var n, r
                        }))
                    }));
                    f && e.inside(a(f)) && (r && !is(n, p) || (r = e))
                }
            })), r
        }, t.prototype.inside = function (t) {
            return ye(t, this.toPolygon())
        }, t
    }();
    var us = function () {
        function t() {
            this.edges = [], this.nodes = {}
        }

        return t.fromGeoJson = function (e) {
            !function (t) {
                if (!t) throw new Error("No geojson passed");
                if ("FeatureCollection" !== t.type && "GeometryCollection" !== t.type && "MultiLineString" !== t.type && "LineString" !== t.type && "Feature" !== t.type) throw new Error("Invalid input type '" + t.type + "'. Geojson must be FeatureCollection, GeometryCollection, LineString, MultiLineString or Feature")
            }(e);
            var n = new t;
            return Z(e, (function (t) {
                F(t, "LineString", "Graph::fromGeoJson"), j(t, (function (t, e) {
                    if (t) {
                        var r = n.getNode(t), i = n.getNode(e);
                        n.addEdge(r, i)
                    }
                    return e
                }))
            })), n
        }, t.prototype.getNode = function (t) {
            var e = os.buildId(t), n = this.nodes[e];
            return n || (n = this.nodes[e] = new os(t)), n
        }, t.prototype.addEdge = function (t, e) {
            var n = new ss(t, e), r = n.getSymetric();
            this.edges.push(n), this.edges.push(r)
        }, t.prototype.deleteDangles = function () {
            var t = this;
            Object.keys(this.nodes).map((function (e) {
                return t.nodes[e]
            })).forEach((function (e) {
                return t._removeIfDangle(e)
            }))
        }, t.prototype._removeIfDangle = function (t) {
            var e = this;
            if (t.innerEdges.length <= 1) {
                var n = t.getOuterEdges().map((function (t) {
                    return t.to
                }));
                this.removeNode(t), n.forEach((function (t) {
                    return e._removeIfDangle(t)
                }))
            }
        }, t.prototype.deleteCutEdges = function () {
            var t = this;
            this._computeNextCWEdges(), this._findLabeledEdgeRings(), this.edges.forEach((function (e) {
                e.label === e.symetric.label && (t.removeEdge(e.symetric), t.removeEdge(e))
            }))
        }, t.prototype._computeNextCWEdges = function (t) {
            var e = this;
            void 0 === t ? Object.keys(this.nodes).forEach((function (t) {
                return e._computeNextCWEdges(e.nodes[t])
            })) : t.getOuterEdges().forEach((function (e, n) {
                t.getOuterEdge((0 === n ? t.getOuterEdges().length : n) - 1).symetric.next = e
            }))
        }, t.prototype._computeNextCCWEdges = function (t, e) {
            for (var n, r, i = t.getOuterEdges(), o = i.length - 1; o >= 0; --o) {
                var s = i[o], a = s.symetric, u = void 0, l = void 0;
                s.label === e && (u = s), a.label === e && (l = a), u && l && (l && (r = l), u && (r && (r.next = u, r = void 0), n || (n = u)))
            }
            r && (r.next = n)
        }, t.prototype._findLabeledEdgeRings = function () {
            var t = [], e = 0;
            return this.edges.forEach((function (n) {
                if (!(n.label >= 0)) {
                    t.push(n);
                    var r = n;
                    do {
                        r.label = e, r = r.next
                    } while (!n.isEqual(r));
                    e++
                }
            })), t
        }, t.prototype.getEdgeRings = function () {
            var t = this;
            this._computeNextCWEdges(), this.edges.forEach((function (t) {
                t.label = void 0
            })), this._findLabeledEdgeRings().forEach((function (e) {
                t._findIntersectionNodes(e).forEach((function (n) {
                    t._computeNextCCWEdges(n, e.label)
                }))
            }));
            var e = [];
            return this.edges.forEach((function (n) {
                n.ring || e.push(t._findEdgeRing(n))
            })), e
        }, t.prototype._findIntersectionNodes = function (t) {
            var e = [], n = t, r = function () {
                var r = 0;
                n.from.getOuterEdges().forEach((function (e) {
                    e.label === t.label && ++r
                })), r > 1 && e.push(n.from), n = n.next
            };
            do {
                r()
            } while (!t.isEqual(n));
            return e
        }, t.prototype._findEdgeRing = function (t) {
            var e = t, n = new as;
            do {
                n.push(e), e.ring = n, e = e.next
            } while (!t.isEqual(e));
            return n
        }, t.prototype.removeNode = function (t) {
            var e = this;
            t.getOuterEdges().forEach((function (t) {
                return e.removeEdge(t)
            })), t.innerEdges.forEach((function (t) {
                return e.removeEdge(t)
            })), delete this.nodes[t.id]
        }, t.prototype.removeEdge = function (t) {
            this.edges = this.edges.filter((function (e) {
                return !e.isEqual(t)
            })), t.deleteEdge()
        }, t
    }();

    function ls(t, e) {
        var n = !0;
        return Z(t, (function (t) {
            Z(e, (function (e) {
                if (!1 === n) return !1;
                n = function (t, e) {
                    switch (t.type) {
                        case"Point":
                            switch (e.type) {
                                case"Point":
                                    return n = t.coordinates, r = e.coordinates, !(n[0] === r[0] && n[1] === r[1]);
                                case"LineString":
                                    return !cs(e, t);
                                case"Polygon":
                                    return !ye(t, e)
                            }
                            break;
                        case"LineString":
                            switch (e.type) {
                                case"Point":
                                    return !cs(t, e);
                                case"LineString":
                                    return !function (t, e) {
                                        if (Mr(t, e).features.length > 0) return !0;
                                        return !1
                                    }(t, e);
                                case"Polygon":
                                    return !hs(e, t)
                            }
                            break;
                        case"Polygon":
                            switch (e.type) {
                                case"Point":
                                    return !ye(e, t);
                                case"LineString":
                                    return !hs(t, e);
                                case"Polygon":
                                    return !function (t, e) {
                                        for (var n = 0, r = t.coordinates[0]; n < r.length; n++) {
                                            if (ye(r[n], e)) return !0
                                        }
                                        for (var i = 0, o = e.coordinates[0]; i < o.length; i++) {
                                            if (ye(o[i], t)) return !0
                                        }
                                        if (Mr(Ei(t), Ei(e)).features.length > 0) return !0;
                                        return !1
                                    }(e, t)
                            }
                    }
                    var n, r;
                    return !1
                }(t.geometry, e.geometry)
            }))
        })), n
    }

    function cs(t, e) {
        for (var n = 0; n < t.coordinates.length - 1; n++) if (ps(t.coordinates[n], t.coordinates[n + 1], e.coordinates)) return !0;
        return !1
    }

    function hs(t, e) {
        for (var n = 0, r = e.coordinates; n < r.length; n++) {
            if (ye(r[n], t)) return !0
        }
        return Mr(e, Ei(t)).features.length > 0
    }

    function ps(t, e, n) {
        var r = n[0] - t[0], i = n[1] - t[1], o = e[0] - t[0], s = e[1] - t[1];
        return 0 == r * s - i * o && (Math.abs(o) >= Math.abs(s) ? o > 0 ? t[0] <= n[0] && n[0] <= e[0] : e[0] <= n[0] && n[0] <= t[0] : s > 0 ? t[1] <= n[1] && n[1] <= e[1] : e[1] <= n[1] && n[1] <= t[1])
    }

    function fs(t, e) {
        return !(t[0] > e[0]) && (!(t[2] < e[2]) && (!(t[1] > e[1]) && !(t[3] < e[3])))
    }

    function gs(t, e) {
        return t[0] === e[0] && t[1] === e[1]
    }

    function ds(t, e) {
        return [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2]
    }

    function ys(t, e) {
        for (var n = !1, r = !1, i = t.coordinates.length, o = 0; o < i && !n && !r;) {
            for (var s = 0; s < e.coordinates.length - 1; s++) {
                var a = !0;
                0 !== s && s !== e.coordinates.length - 2 || (a = !1), ms(e.coordinates[s], e.coordinates[s + 1], t.coordinates[o], a) ? n = !0 : r = !0
            }
            o++
        }
        return n && r
    }

    function vs(t, e) {
        return Mr(t, bi(e)).features.length > 0
    }

    function _s(t, e) {
        for (var n = !1, r = !1, i = t.coordinates[0].length, o = 0; o < i && n && r;) ye(a(t.coordinates[0][o]), e) ? n = !0 : r = !0, o++;
        return r && r
    }

    function ms(t, e, n, r) {
        var i = n[0] - t[0], o = n[1] - t[1], s = e[0] - t[0], a = e[1] - t[1];
        return 0 == i * a - o * s && (r ? Math.abs(s) >= Math.abs(a) ? s > 0 ? t[0] <= n[0] && n[0] <= e[0] : e[0] <= n[0] && n[0] <= t[0] : a > 0 ? t[1] <= n[1] && n[1] <= e[1] : e[1] <= n[1] && n[1] <= t[1] : Math.abs(s) >= Math.abs(a) ? s > 0 ? t[0] < n[0] && n[0] < e[0] : e[0] < n[0] && n[0] < t[0] : a > 0 ? t[1] < n[1] && n[1] < e[1] : e[1] < n[1] && n[1] < t[1])
    }

    var xs = function (t) {
        this.precision = t && t.precision ? t.precision : 17, this.direction = !(!t || !t.direction) && t.direction, this.pseudoNode = !(!t || !t.pseudoNode) && t.pseudoNode, this.objectComparator = t && t.objectComparator ? t.objectComparator : ws
    };

    function Es(t) {
        return t.coordinates.map((function (e) {
            return {type: t.type.replace("Multi", ""), coordinates: e}
        }))
    }

    function bs(t, e) {
        return t.hasOwnProperty("coordinates") ? t.coordinates.length === e.coordinates.length : t.length === e.length
    }

    function ws(t, e) {
        return Ti(t, e, {strict: !0})
    }

    xs.prototype.compare = function (t, e) {
        if (t.type !== e.type || !bs(t, e)) return !1;
        switch (t.type) {
            case"Point":
                return this.compareCoord(t.coordinates, e.coordinates);
            case"LineString":
                return this.compareLine(t.coordinates, e.coordinates, 0, !1);
            case"Polygon":
                return this.comparePolygon(t, e);
            case"Feature":
                return this.compareFeature(t, e);
            default:
                if (0 === t.type.indexOf("Multi")) {
                    var n = this, r = Es(t), i = Es(e);
                    return r.every((function (t) {
                        return this.some((function (e) {
                            return n.compare(t, e)
                        }))
                    }), i)
                }
        }
        return !1
    }, xs.prototype.compareCoord = function (t, e) {
        if (t.length !== e.length) return !1;
        for (var n = 0; n < t.length; n++) if (t[n].toFixed(this.precision) !== e[n].toFixed(this.precision)) return !1;
        return !0
    }, xs.prototype.compareLine = function (t, e, n, r) {
        if (!bs(t, e)) return !1;
        var i = this.pseudoNode ? t : this.removePseudo(t), o = this.pseudoNode ? e : this.removePseudo(e);
        if (!r || this.compareCoord(i[0], o[0]) || (o = this.fixStartIndex(o, i))) {
            var s = this.compareCoord(i[n], o[n]);
            return this.direction || s ? this.comparePath(i, o) : !!this.compareCoord(i[n], o[o.length - (1 + n)]) && this.comparePath(i.slice().reverse(), o)
        }
    }, xs.prototype.fixStartIndex = function (t, e) {
        for (var n, r = -1, i = 0; i < t.length; i++) if (this.compareCoord(t[i], e[0])) {
            r = i;
            break
        }
        return r >= 0 && (n = [].concat(t.slice(r, t.length), t.slice(1, r + 1))), n
    }, xs.prototype.comparePath = function (t, e) {
        var n = this;
        return t.every((function (t, e) {
            return n.compareCoord(t, this[e])
        }), e)
    }, xs.prototype.comparePolygon = function (t, e) {
        if (this.compareLine(t.coordinates[0], e.coordinates[0], 1, !0)) {
            var n = t.coordinates.slice(1, t.coordinates.length), r = e.coordinates.slice(1, e.coordinates.length),
                i = this;
            return n.every((function (t) {
                return this.some((function (e) {
                    return i.compareLine(t, e, 1, !0)
                }))
            }), r)
        }
        return !1
    }, xs.prototype.compareFeature = function (t, e) {
        return !(t.id !== e.id || !this.objectComparator(t.properties, e.properties) || !this.compareBBox(t, e)) && this.compare(t.geometry, e.geometry)
    }, xs.prototype.compareBBox = function (t, e) {
        return !!(!t.bbox && !e.bbox || t.bbox && e.bbox && this.compareCoord(t.bbox, e.bbox))
    }, xs.prototype.removePseudo = function (t) {
        return t
    };
    var Is = xs;

    function Ns(t, e) {
        var n = G(t), r = G(e), i = n.type, o = r.type;
        if ("MultiPoint" === i && "MultiPoint" !== o || ("LineString" === i || "MultiLineString" === i) && "LineString" !== o && "MultiLineString" !== o || ("Polygon" === i || "MultiPolygon" === i) && "Polygon" !== o && "MultiPolygon" !== o) throw new Error("features must be of the same type");
        if ("Point" === i) throw new Error("Point geometry not supported");
        if (new Is({precision: 6}).compare(t, e)) return !1;
        var s = 0;
        switch (i) {
            case"MultiPoint":
                for (var a = 0; a < n.coordinates.length; a++) for (var u = 0; u < r.coordinates.length; u++) {
                    var l = n.coordinates[a], c = r.coordinates[u];
                    if (l[0] === c[0] && l[1] === c[1]) return !0
                }
                return !1;
            case"LineString":
            case"MultiLineString":
                Q(t, (function (t) {
                    Q(e, (function (e) {
                        Ai(t, e).features.length && s++
                    }))
                }));
                break;
            case"Polygon":
            case"MultiPolygon":
                Q(t, (function (t) {
                    Q(e, (function (e) {
                        Mr(t, e).features.length && s++
                    }))
                }))
        }
        return s > 0
    }

    function Ss(t, e) {
        var n = !1;
        return Z(t, (function (t) {
            Z(e, (function (e) {
                if (!0 === n) return !0;
                n = !ls(t.geometry, e.geometry)
            }))
        })), n
    }

    var Cs = Bt((function (t) {
        function e(t, e, n, r) {
            this.dataset = [], this.epsilon = 1, this.minPts = 2, this.distance = this._euclideanDistance, this.clusters = [], this.noise = [], this._visited = [], this._assigned = [], this._datasetLength = 0, this._init(t, e, n, r)
        }

        e.prototype.run = function (t, e, n, r) {
            this._init(t, e, n, r);
            for (var i = 0; i < this._datasetLength; i++) if (1 !== this._visited[i]) {
                this._visited[i] = 1;
                var o = this._regionQuery(i);
                if (o.length < this.minPts) this.noise.push(i); else {
                    var s = this.clusters.length;
                    this.clusters.push([]), this._addToCluster(i, s), this._expandCluster(s, o)
                }
            }
            return this.clusters
        }, e.prototype._init = function (t, e, n, r) {
            if (t) {
                if (!(t instanceof Array)) throw Error("Dataset must be of type array, " + typeof t + " given");
                this.dataset = t, this.clusters = [], this.noise = [], this._datasetLength = t.length, this._visited = new Array(this._datasetLength), this._assigned = new Array(this._datasetLength)
            }
            e && (this.epsilon = e), n && (this.minPts = n), r && (this.distance = r)
        }, e.prototype._expandCluster = function (t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                if (1 !== this._visited[r]) {
                    this._visited[r] = 1;
                    var i = this._regionQuery(r);
                    i.length >= this.minPts && (e = this._mergeArrays(e, i))
                }
                1 !== this._assigned[r] && this._addToCluster(r, t)
            }
        }, e.prototype._addToCluster = function (t, e) {
            this.clusters[e].push(t), this._assigned[t] = 1
        }, e.prototype._regionQuery = function (t) {
            for (var e = [], n = 0; n < this._datasetLength; n++) {
                this.distance(this.dataset[t], this.dataset[n]) < this.epsilon && e.push(n)
            }
            return e
        }, e.prototype._mergeArrays = function (t, e) {
            for (var n = e.length, r = 0; r < n; r++) {
                var i = e[r];
                t.indexOf(i) < 0 && t.push(i)
            }
            return t
        }, e.prototype._euclideanDistance = function (t, e) {
            for (var n = 0, r = Math.min(t.length, e.length); r--;) n += (t[r] - e[r]) * (t[r] - e[r]);
            return Math.sqrt(n)
        }, t.exports && (t.exports = e)
    })), Ps = Bt((function (t) {
        function e(t, e, n) {
            this.k = 3, this.dataset = [], this.assignments = [], this.centroids = [], this.init(t, e, n)
        }

        e.prototype.init = function (t, e, n) {
            this.assignments = [], this.centroids = [], void 0 !== t && (this.dataset = t), void 0 !== e && (this.k = e), void 0 !== n && (this.distance = n)
        }, e.prototype.run = function (t, e) {
            this.init(t, e);
            for (var n = this.dataset.length, r = 0; r < this.k; r++) this.centroids[r] = this.randomCentroid();
            for (var i = !0; i;) {
                i = this.assign();
                for (var o = 0; o < this.k; o++) {
                    for (var s = new Array(c), a = 0, u = 0; u < c; u++) s[u] = 0;
                    for (var l = 0; l < n; l++) {
                        var c = this.dataset[l].length;
                        if (o === this.assignments[l]) {
                            for (u = 0; u < c; u++) s[u] += this.dataset[l][u];
                            a++
                        }
                    }
                    if (a > 0) {
                        for (u = 0; u < c; u++) s[u] /= a;
                        this.centroids[o] = s
                    } else this.centroids[o] = this.randomCentroid(), i = !0
                }
            }
            return this.getClusters()
        }, e.prototype.randomCentroid = function () {
            var t, e, n = this.dataset.length - 1;
            do {
                e = Math.round(Math.random() * n), t = this.dataset[e]
            } while (this.centroids.indexOf(t) >= 0);
            return t
        }, e.prototype.assign = function () {
            for (var t, e = !1, n = this.dataset.length, r = 0; r < n; r++) (t = this.argmin(this.dataset[r], this.centroids, this.distance)) != this.assignments[r] && (this.assignments[r] = t, e = !0);
            return e
        }, e.prototype.getClusters = function () {
            for (var t, e = new Array(this.k), n = 0; n < this.assignments.length; n++) void 0 === e[t = this.assignments[n]] && (e[t] = []), e[t].push(n);
            return e
        }, e.prototype.argmin = function (t, e, n) {
            for (var r, i = Number.MAX_VALUE, o = 0, s = e.length, a = 0; a < s; a++) (r = n(t, e[a])) < i && (i = r, o = a);
            return o
        }, e.prototype.distance = function (t, e) {
            for (var n = 0, r = Math.min(t.length, e.length); r--;) {
                var i = t[r] - e[r];
                n += i * i
            }
            return Math.sqrt(n)
        }, t.exports && (t.exports = e)
    })), Ls = Bt((function (t) {
        function e(t, e, n) {
            this._queue = [], this._priorities = [], this._sorting = "desc", this._init(t, e, n)
        }

        e.prototype.insert = function (t, e) {
            for (var n = this._queue.length, r = n; r--;) {
                var i = this._priorities[r];
                "desc" === this._sorting ? e > i && (n = r) : e < i && (n = r)
            }
            this._insertAt(t, e, n)
        }, e.prototype.remove = function (t) {
            for (var e = this._queue.length; e--;) {
                if (t === this._queue[e]) {
                    this._queue.splice(e, 1), this._priorities.splice(e, 1);
                    break
                }
            }
        }, e.prototype.forEach = function (t) {
            this._queue.forEach(t)
        }, e.prototype.getElements = function () {
            return this._queue
        }, e.prototype.getElementPriority = function (t) {
            return this._priorities[t]
        }, e.prototype.getPriorities = function () {
            return this._priorities
        }, e.prototype.getElementsWithPriorities = function () {
            for (var t = [], e = 0, n = this._queue.length; e < n; e++) t.push([this._queue[e], this._priorities[e]]);
            return t
        }, e.prototype._init = function (t, e, n) {
            if (t && e) {
                if (this._queue = [], this._priorities = [], t.length !== e.length) throw new Error("Arrays must have the same length");
                for (var r = 0; r < t.length; r++) this.insert(t[r], e[r])
            }
            n && (this._sorting = n)
        }, e.prototype._insertAt = function (t, e, n) {
            this._queue.length === n ? (this._queue.push(t), this._priorities.push(e)) : (this._queue.splice(n, 0, t), this._priorities.splice(n, 0, e))
        }, t.exports && (t.exports = e)
    })), Ms = Bt((function (t) {
        if (t.exports) var e = Ls;

        function n(t, e, n, r) {
            this.epsilon = 1, this.minPts = 1, this.distance = this._euclideanDistance, this._reachability = [], this._processed = [], this._coreDistance = 0, this._orderedList = [], this._init(t, e, n, r)
        }

        n.prototype.run = function (t, n, r, i) {
            this._init(t, n, r, i);
            for (var o = 0, s = this.dataset.length; o < s; o++) if (1 !== this._processed[o]) {
                this._processed[o] = 1, this.clusters.push([o]);
                var a = this.clusters.length - 1;
                this._orderedList.push(o);
                var u = new e(null, null, "asc"), l = this._regionQuery(o);
                void 0 !== this._distanceToCore(o) && (this._updateQueue(o, l, u), this._expandCluster(a, u))
            }
            return this.clusters
        }, n.prototype.getReachabilityPlot = function () {
            for (var t = [], e = 0, n = this._orderedList.length; e < n; e++) {
                var r = this._orderedList[e], i = this._reachability[r];
                t.push([r, i])
            }
            return t
        }, n.prototype._init = function (t, e, n, r) {
            if (t) {
                if (!(t instanceof Array)) throw Error("Dataset must be of type array, " + typeof t + " given");
                this.dataset = t, this.clusters = [], this._reachability = new Array(this.dataset.length), this._processed = new Array(this.dataset.length), this._coreDistance = 0, this._orderedList = []
            }
            e && (this.epsilon = e), n && (this.minPts = n), r && (this.distance = r)
        }, n.prototype._updateQueue = function (t, e, n) {
            var r = this;
            this._coreDistance = this._distanceToCore(t), e.forEach((function (e) {
                if (void 0 === r._processed[e]) {
                    var i = r.distance(r.dataset[t], r.dataset[e]), o = Math.max(r._coreDistance, i);
                    void 0 === r._reachability[e] ? (r._reachability[e] = o, n.insert(e, o)) : o < r._reachability[e] && (r._reachability[e] = o, n.remove(e), n.insert(e, o))
                }
            }))
        }, n.prototype._expandCluster = function (t, e) {
            for (var n = e.getElements(), r = 0, i = n.length; r < i; r++) {
                var o = n[r];
                if (void 0 === this._processed[o]) {
                    var s = this._regionQuery(o);
                    this._processed[o] = 1, this.clusters[t].push(o), this._orderedList.push(o), void 0 !== this._distanceToCore(o) && (this._updateQueue(o, s, e), this._expandCluster(t, e))
                }
            }
        }, n.prototype._distanceToCore = function (t) {
            for (var e = this.epsilon, n = 0; n < e; n++) {
                if (this._regionQuery(t, n).length >= this.minPts) return n
            }
        }, n.prototype._regionQuery = function (t, e) {
            e = e || this.epsilon;
            for (var n = [], r = 0, i = this.dataset.length; r < i; r++) this.distance(this.dataset[t], this.dataset[r]) < e && n.push(r);
            return n
        }, n.prototype._euclideanDistance = function (t, e) {
            for (var n = 0, r = Math.min(t.length, e.length); r--;) n += (t[r] - e[r]) * (t[r] - e[r]);
            return Math.sqrt(n)
        }, t.exports && (t.exports = n)
    })), Os = Bt((function (t) {
        t.exports && (t.exports = {DBSCAN: Cs, KMEANS: Ps, OPTICS: Ms, PriorityQueue: Ls})
    }));
    var Rs = function (t, e, n) {
        for (var r = t.length, i = 0, o = 0; o < r; o++) {
            var s = (t[o] || 0) - (e[o] || 0);
            i += s * s
        }
        return n ? Math.sqrt(i) : i
    }, Ts = Rs, As = function (t, e, n) {
        var r = Math.abs(t - e);
        return n ? r : r * r
    }, Ds = Rs, Fs = function (t, e) {
        for (var n = {}, r = [], i = e << 2, o = t.length, s = t[0].length > 0; r.length < e && i-- > 0;) {
            var a = t[Math.floor(Math.random() * o)], u = s ? a.join("_") : "" + a;
            n[u] || (n[u] = !0, r.push(a))
        }
        if (r.length < e) throw new Error("Error initializating clusters");
        return r
    }, ks = function (t, e) {
        var n = t[0].length ? Ts : As, r = [], i = t.length, o = t[0].length > 0, s = t[Math.floor(Math.random() * i)];
        o && s.join("_");
        for (r.push(s); r.length < e;) {
            for (var a = [], u = r.length, l = 0, c = [], h = 0; h < i; h++) {
                for (var p = 1 / 0, f = 0; f < u; f++) {
                    var g = n(t[h], r[f]);
                    g <= p && (p = g)
                }
                a[h] = p
            }
            for (var d = 0; d < i; d++) l += a[d];
            for (var y = 0; y < i; y++) c[y] = {i: y, v: t[y], pr: a[y] / l, cs: 0};
            c.sort((function (t, e) {
                return t.pr - e.pr
            })), c[0].cs = c[0].pr;
            for (var v = 1; v < i; v++) c[v].cs = c[v - 1].cs + c[v].pr;
            for (var _ = Math.random(), m = 0; m < i - 1 && c[m++].cs < _;) ;
            r.push(c[m - 1].v)
        }
        return r
    };

    function Gs(t, e, n) {
        n = n || [];
        for (var r = 0; r < t; r++) n[r] = e;
        return n
    }

    var qs = function (t, e, n, r) {
        var i = [], o = [], s = [], a = [], u = !1, l = r || 1e4, c = t.length, h = t[0].length, p = h > 0, f = [];
        if (n) i = "kmrand" == n ? Fs(t, e) : "kmpp" == n ? ks(t, e) : n; else for (var g = {}; i.length < e;) {
            var d = Math.floor(Math.random() * c);
            g[d] || (g[d] = !0, i.push(t[d]))
        }
        do {
            Gs(e, 0, f);
            for (var y = 0; y < c; y++) {
                for (var v = 1 / 0, _ = 0, m = 0; m < e; m++) {
                    (a = p ? Ds(t[y], i[m]) : Math.abs(t[y] - i[m])) <= v && (v = a, _ = m)
                }
                s[y] = _, f[_]++
            }
            for (var x = [], E = (o = [], 0); E < e; E++) x[E] = p ? Gs(h, 0, x[E]) : 0, o[E] = i[E];
            if (p) {
                for (var b = 0; b < e; b++) i[b] = [];
                for (var w = 0; w < c; w++) for (var I = x[s[w]], N = t[w], S = 0; S < h; S++) I[S] += N[S];
                u = !0;
                for (var C = 0; C < e; C++) {
                    for (var P = i[C], L = x[C], M = o[C], O = f[C], R = 0; R < h; R++) P[R] = L[R] / O || 0;
                    if (u) for (var T = 0; T < h; T++) if (M[T] != P[T]) {
                        u = !1;
                        break
                    }
                }
            } else {
                for (var A = 0; A < c; A++) {
                    x[s[A]] += t[A]
                }
                for (var D = 0; D < e; D++) i[D] = x[D] / f[D] || 0;
                u = !0;
                for (var F = 0; F < e; F++) if (o[F] != i[F]) {
                    u = !1;
                    break
                }
            }
            u = u || --l <= 0
        } while (!u);
        return {it: 1e4 - l, k: e, idxs: s, centroids: i}
    };

    function Bs(t, e) {
        return b(ki(t[0], t[1])) === b(ki(e[0], e[1]))
    }

    function zs(t, e) {
        if (t.geometry && t.geometry.type) return t.geometry.type;
        if (t.type) return t.type;
        throw new Error("Invalid GeoJSON object for " + e)
    }

    function js(t) {
        for (var e = t, n = []; e.parent;) n.unshift(e), e = e.parent;
        return n
    }

    var Us = {
        search: function (t, e, n, r) {
            t.cleanDirty();
            var i = (r = r || {}).heuristic || Us.heuristics.manhattan, o = r.closest || !1, s = new Ys((function (t) {
                return t.f
            })), a = e;
            for (e.h = i(e, n), s.push(e); s.size() > 0;) {
                var u = s.pop();
                if (u === n) return js(u);
                u.closed = !0;
                for (var l = t.neighbors(u), c = 0, h = l.length; c < h; ++c) {
                    var p = l[c];
                    if (!p.closed && !p.isWall()) {
                        var f = u.g + p.getCost(u), g = p.visited;
                        (!g || f < p.g) && (p.visited = !0, p.parent = u, p.h = p.h || i(p, n), p.g = f, p.f = p.g + p.h, t.markDirty(p), o && (p.h < a.h || p.h === a.h && p.g < a.g) && (a = p), g ? s.rescoreElement(p) : s.push(p))
                    }
                }
            }
            return o ? js(a) : []
        }, heuristics: {
            manhattan: function (t, e) {
                return Math.abs(e.x - t.x) + Math.abs(e.y - t.y)
            }, diagonal: function (t, e) {
                var n = Math.sqrt(2), r = Math.abs(e.x - t.x), i = Math.abs(e.y - t.y);
                return 1 * (r + i) + (n - 2) * Math.min(r, i)
            }
        }, cleanNode: function (t) {
            t.f = 0, t.g = 0, t.h = 0, t.visited = !1, t.closed = !1, t.parent = null
        }
    };

    function Vs(t, e) {
        e = e || {}, this.nodes = [], this.diagonal = !!e.diagonal, this.grid = [];
        for (var n = 0; n < t.length; n++) {
            this.grid[n] = [];
            for (var r = 0, i = t[n]; r < i.length; r++) {
                var o = new Xs(n, r, i[r]);
                this.grid[n][r] = o, this.nodes.push(o)
            }
        }
        this.init()
    }

    function Xs(t, e, n) {
        this.x = t, this.y = e, this.weight = n
    }

    function Ys(t) {
        this.content = [], this.scoreFunction = t
    }

    function Hs(t, e) {
        for (var n = 0; n < e.features.length; n++) if (ye(t, e.features[n])) return !0;
        return !1
    }

    function Ws(t) {
        return function () {
            return t
        }
    }

    function Js(t) {
        return t[0]
    }

    function Zs(t) {
        return t[1]
    }

    function Ks() {
        this._ = null
    }

    function Qs(t) {
        t.U = t.C = t.L = t.R = t.P = t.N = null
    }

    function $s(t, e) {
        var n = e, r = e.R, i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.R = r.L, n.R && (n.R.U = n), r.L = n
    }

    function ta(t, e) {
        var n = e, r = e.L, i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.L = r.R, n.L && (n.L.U = n), r.R = n
    }

    function ea(t) {
        for (; t.L;) t = t.L;
        return t
    }

    function na(t, e, n, r) {
        var i = [null, null], o = Sa.push(i) - 1;
        return i.left = t, i.right = e, n && ia(i, t, e, n), r && ia(i, e, t, r), Ia[t.index].halfedges.push(o), Ia[e.index].halfedges.push(o), i
    }

    function ra(t, e, n) {
        var r = [e, n];
        return r.left = t, r
    }

    function ia(t, e, n, r) {
        t[0] || t[1] ? t.left === n ? t[1] = r : t[0] = r : (t[0] = r, t.left = e, t.right = n)
    }

    function oa(t, e, n, r, i) {
        var o, s = t[0], a = t[1], u = s[0], l = s[1], c = 0, h = 1, p = a[0] - u, f = a[1] - l;
        if (o = e - u, p || !(o > 0)) {
            if (o /= p, p < 0) {
                if (o < c) return;
                o < h && (h = o)
            } else if (p > 0) {
                if (o > h) return;
                o > c && (c = o)
            }
            if (o = r - u, p || !(o < 0)) {
                if (o /= p, p < 0) {
                    if (o > h) return;
                    o > c && (c = o)
                } else if (p > 0) {
                    if (o < c) return;
                    o < h && (h = o)
                }
                if (o = n - l, f || !(o > 0)) {
                    if (o /= f, f < 0) {
                        if (o < c) return;
                        o < h && (h = o)
                    } else if (f > 0) {
                        if (o > h) return;
                        o > c && (c = o)
                    }
                    if (o = i - l, f || !(o < 0)) {
                        if (o /= f, f < 0) {
                            if (o > h) return;
                            o > c && (c = o)
                        } else if (f > 0) {
                            if (o < c) return;
                            o < h && (h = o)
                        }
                        return !(c > 0 || h < 1) || (c > 0 && (t[0] = [u + c * p, l + c * f]), h < 1 && (t[1] = [u + h * p, l + h * f]), !0)
                    }
                }
            }
        }
    }

    function sa(t, e, n, r, i) {
        var o = t[1];
        if (o) return !0;
        var s, a, u = t[0], l = t.left, c = t.right, h = l[0], p = l[1], f = c[0], g = c[1], d = (h + f) / 2,
            y = (p + g) / 2;
        if (g === p) {
            if (d < e || d >= r) return;
            if (h > f) {
                if (u) {
                    if (u[1] >= i) return
                } else u = [d, n];
                o = [d, i]
            } else {
                if (u) {
                    if (u[1] < n) return
                } else u = [d, i];
                o = [d, n]
            }
        } else if (a = y - (s = (h - f) / (g - p)) * d, s < -1 || s > 1) if (h > f) {
            if (u) {
                if (u[1] >= i) return
            } else u = [(n - a) / s, n];
            o = [(i - a) / s, i]
        } else {
            if (u) {
                if (u[1] < n) return
            } else u = [(i - a) / s, i];
            o = [(n - a) / s, n]
        } else if (p < g) {
            if (u) {
                if (u[0] >= r) return
            } else u = [e, s * e + a];
            o = [r, s * r + a]
        } else {
            if (u) {
                if (u[0] < e) return
            } else u = [r, s * r + a];
            o = [e, s * e + a]
        }
        return t[0] = u, t[1] = o, !0
    }

    function aa(t, e) {
        var n = t.site, r = e.left, i = e.right;
        return n === i && (i = r, r = n), i ? Math.atan2(i[1] - r[1], i[0] - r[0]) : (n === r ? (r = e[1], i = e[0]) : (r = e[0], i = e[1]), Math.atan2(r[0] - i[0], i[1] - r[1]))
    }

    function ua(t, e) {
        return e[+(e.left !== t.site)]
    }

    function la(t, e) {
        return e[+(e.left === t.site)]
    }

    Vs.prototype.init = function () {
        this.dirtyNodes = [];
        for (var t = 0; t < this.nodes.length; t++) Us.cleanNode(this.nodes[t])
    }, Vs.prototype.cleanDirty = function () {
        for (var t = 0; t < this.dirtyNodes.length; t++) Us.cleanNode(this.dirtyNodes[t]);
        this.dirtyNodes = []
    }, Vs.prototype.markDirty = function (t) {
        this.dirtyNodes.push(t)
    }, Vs.prototype.neighbors = function (t) {
        var e = [], n = t.x, r = t.y, i = this.grid;
        return i[n - 1] && i[n - 1][r] && e.push(i[n - 1][r]), i[n + 1] && i[n + 1][r] && e.push(i[n + 1][r]), i[n] && i[n][r - 1] && e.push(i[n][r - 1]), i[n] && i[n][r + 1] && e.push(i[n][r + 1]), this.diagonal && (i[n - 1] && i[n - 1][r - 1] && e.push(i[n - 1][r - 1]), i[n + 1] && i[n + 1][r - 1] && e.push(i[n + 1][r - 1]), i[n - 1] && i[n - 1][r + 1] && e.push(i[n - 1][r + 1]), i[n + 1] && i[n + 1][r + 1] && e.push(i[n + 1][r + 1])), e
    }, Vs.prototype.toString = function () {
        for (var t, e, n, r, i = [], o = this.grid, s = 0, a = o.length; s < a; s++) {
            for (t = [], n = 0, r = (e = o[s]).length; n < r; n++) t.push(e[n].weight);
            i.push(t.join(" "))
        }
        return i.join("\n")
    }, Xs.prototype.toString = function () {
        return "[" + this.x + " " + this.y + "]"
    }, Xs.prototype.getCost = function (t) {
        return t && t.x !== this.x && t.y !== this.y ? 1.41421 * this.weight : this.weight
    }, Xs.prototype.isWall = function () {
        return 0 === this.weight
    }, Ys.prototype = {
        push: function (t) {
            this.content.push(t), this.sinkDown(this.content.length - 1)
        }, pop: function () {
            var t = this.content[0], e = this.content.pop();
            return this.content.length > 0 && (this.content[0] = e, this.bubbleUp(0)), t
        }, remove: function (t) {
            var e = this.content.indexOf(t), n = this.content.pop();
            e !== this.content.length - 1 && (this.content[e] = n, this.scoreFunction(n) < this.scoreFunction(t) ? this.sinkDown(e) : this.bubbleUp(e))
        }, size: function () {
            return this.content.length
        }, rescoreElement: function (t) {
            this.sinkDown(this.content.indexOf(t))
        }, sinkDown: function (t) {
            for (var e = this.content[t]; t > 0;) {
                var n = (t + 1 >> 1) - 1, r = this.content[n];
                if (!(this.scoreFunction(e) < this.scoreFunction(r))) break;
                this.content[n] = e, this.content[t] = r, t = n
            }
        }, bubbleUp: function (t) {
            for (var e = this.content.length, n = this.content[t], r = this.scoreFunction(n); ;) {
                var i, o = t + 1 << 1, s = o - 1, a = null;
                if (s < e) {
                    var u = this.content[s];
                    (i = this.scoreFunction(u)) < r && (a = s)
                }
                if (o < e) {
                    var l = this.content[o];
                    this.scoreFunction(l) < (null === a ? r : i) && (a = o)
                }
                if (null === a) break;
                this.content[t] = this.content[a], this.content[a] = n, t = a
            }
        }
    }, Ks.prototype = {
        constructor: Ks, insert: function (t, e) {
            var n, r, i;
            if (t) {
                if (e.P = t, e.N = t.N, t.N && (t.N.P = e), t.N = e, t.R) {
                    for (t = t.R; t.L;) t = t.L;
                    t.L = e
                } else t.R = e;
                n = t
            } else this._ ? (t = ea(this._), e.P = null, e.N = t, t.P = t.L = e, n = t) : (e.P = e.N = null, this._ = e, n = null);
            for (e.L = e.R = null, e.U = n, e.C = !0, t = e; n && n.C;) n === (r = n.U).L ? (i = r.R) && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.R && ($s(this, n), n = (t = n).U), n.C = !1, r.C = !0, ta(this, r)) : (i = r.L) && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.L && (ta(this, n), n = (t = n).U), n.C = !1, r.C = !0, $s(this, r)), n = t.U;
            this._.C = !1
        }, remove: function (t) {
            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
            var e, n, r, i = t.U, o = t.L, s = t.R;
            if (n = o ? s ? ea(s) : o : s, i ? i.L === t ? i.L = n : i.R = n : this._ = n, o && s ? (r = n.C, n.C = t.C, n.L = o, o.U = n, n !== s ? (i = n.U, n.U = t.U, t = n.R, i.L = t, n.R = s, s.U = n) : (n.U = i, i = n, t = n.R)) : (r = t.C, t = n), t && (t.U = i), !r) if (t && t.C) t.C = !1; else {
                do {
                    if (t === this._) break;
                    if (t === i.L) {
                        if ((e = i.R).C && (e.C = !1, i.C = !0, $s(this, i), e = i.R), e.L && e.L.C || e.R && e.R.C) {
                            e.R && e.R.C || (e.L.C = !1, e.C = !0, ta(this, e), e = i.R), e.C = i.C, i.C = e.R.C = !1, $s(this, i), t = this._;
                            break
                        }
                    } else if ((e = i.L).C && (e.C = !1, i.C = !0, ta(this, i), e = i.L), e.L && e.L.C || e.R && e.R.C) {
                        e.L && e.L.C || (e.R.C = !1, e.C = !0, $s(this, e), e = i.L), e.C = i.C, i.C = e.L.C = !1, ta(this, i), t = this._;
                        break
                    }
                    e.C = !0, t = i, i = i.U
                } while (!t.C);
                t && (t.C = !1)
            }
        }
    };
    var ca, ha = [];

    function pa() {
        Qs(this), this.x = this.y = this.arc = this.site = this.cy = null
    }

    function fa(t) {
        var e = t.P, n = t.N;
        if (e && n) {
            var r = e.site, i = t.site, o = n.site;
            if (r !== o) {
                var s = i[0], a = i[1], u = r[0] - s, l = r[1] - a, c = o[0] - s, h = o[1] - a, p = 2 * (u * h - l * c);
                if (!(p >= -Pa)) {
                    var f = u * u + l * l, g = c * c + h * h, d = (h * f - l * g) / p, y = (u * g - c * f) / p,
                        v = ha.pop() || new pa;
                    v.arc = t, v.site = i, v.x = d + s, v.y = (v.cy = y + a) + Math.sqrt(d * d + y * y), t.circle = v;
                    for (var _ = null, m = Na._; m;) if (v.y < m.y || v.y === m.y && v.x <= m.x) {
                        if (!m.L) {
                            _ = m.P;
                            break
                        }
                        m = m.L
                    } else {
                        if (!m.R) {
                            _ = m;
                            break
                        }
                        m = m.R
                    }
                    Na.insert(_, v), _ || (ca = v)
                }
            }
        }
    }

    function ga(t) {
        var e = t.circle;
        e && (e.P || (ca = e.N), Na.remove(e), ha.push(e), Qs(e), t.circle = null)
    }

    var da = [];

    function ya() {
        Qs(this), this.edge = this.site = this.circle = null
    }

    function va(t) {
        var e = da.pop() || new ya;
        return e.site = t, e
    }

    function _a(t) {
        ga(t), wa.remove(t), da.push(t), Qs(t)
    }

    function ma(t) {
        var e = t.circle, n = e.x, r = e.cy, i = [n, r], o = t.P, s = t.N, a = [t];
        _a(t);
        for (var u = o; u.circle && Math.abs(n - u.circle.x) < Ca && Math.abs(r - u.circle.cy) < Ca;) o = u.P, a.unshift(u), _a(u), u = o;
        a.unshift(u), ga(u);
        for (var l = s; l.circle && Math.abs(n - l.circle.x) < Ca && Math.abs(r - l.circle.cy) < Ca;) s = l.N, a.push(l), _a(l), l = s;
        a.push(l), ga(l);
        var c, h = a.length;
        for (c = 1; c < h; ++c) l = a[c], u = a[c - 1], ia(l.edge, u.site, l.site, i);
        u = a[0], (l = a[h - 1]).edge = na(u.site, l.site, null, i), fa(u), fa(l)
    }

    function xa(t) {
        for (var e, n, r, i, o = t[0], s = t[1], a = wa._; a;) if ((r = Ea(a, s) - o) > Ca) a = a.L; else {
            if (!((i = o - ba(a, s)) > Ca)) {
                r > -Ca ? (e = a.P, n = a) : i > -Ca ? (e = a, n = a.N) : e = n = a;
                break
            }
            if (!a.R) {
                e = a;
                break
            }
            a = a.R
        }
        !function (t) {
            Ia[t.index] = {site: t, halfedges: []}
        }(t);
        var u = va(t);
        if (wa.insert(e, u), e || n) {
            if (e === n) return ga(e), n = va(e.site), wa.insert(u, n), u.edge = n.edge = na(e.site, u.site), fa(e), void fa(n);
            if (n) {
                ga(e), ga(n);
                var l = e.site, c = l[0], h = l[1], p = t[0] - c, f = t[1] - h, g = n.site, d = g[0] - c, y = g[1] - h,
                    v = 2 * (p * y - f * d), _ = p * p + f * f, m = d * d + y * y,
                    x = [(y * _ - f * m) / v + c, (p * m - d * _) / v + h];
                ia(n.edge, l, g, x), u.edge = na(l, t, null, x), n.edge = na(t, g, null, x), fa(e), fa(n)
            } else u.edge = na(e.site, u.site)
        }
    }

    function Ea(t, e) {
        var n = t.site, r = n[0], i = n[1], o = i - e;
        if (!o) return r;
        var s = t.P;
        if (!s) return -1 / 0;
        var a = (n = s.site)[0], u = n[1], l = u - e;
        if (!l) return a;
        var c = a - r, h = 1 / o - 1 / l, p = c / l;
        return h ? (-p + Math.sqrt(p * p - 2 * h * (c * c / (-2 * l) - u + l / 2 + i - o / 2))) / h + r : (r + a) / 2
    }

    function ba(t, e) {
        var n = t.N;
        if (n) return Ea(n, e);
        var r = t.site;
        return r[1] === e ? r[0] : 1 / 0
    }

    var wa, Ia, Na, Sa, Ca = 1e-6, Pa = 1e-12;

    function La(t, e) {
        return e[1] - t[1] || e[0] - t[0]
    }

    function Ma(t, e) {
        var n, r, i, o = t.sort(La).pop();
        for (Sa = [], Ia = new Array(t.length), wa = new Ks, Na = new Ks; ;) if (i = ca, o && (!i || o[1] < i.y || o[1] === i.y && o[0] < i.x)) o[0] === n && o[1] === r || (xa(o), n = o[0], r = o[1]), o = t.pop(); else {
            if (!i) break;
            ma(i.arc)
        }
        if (function () {
            for (var t, e, n, r, i = 0, o = Ia.length; i < o; ++i) if ((t = Ia[i]) && (r = (e = t.halfedges).length)) {
                var s = new Array(r), a = new Array(r);
                for (n = 0; n < r; ++n) s[n] = n, a[n] = aa(t, Sa[e[n]]);
                for (s.sort((function (t, e) {
                    return a[e] - a[t]
                })), n = 0; n < r; ++n) a[n] = e[s[n]];
                for (n = 0; n < r; ++n) e[n] = a[n]
            }
        }(), e) {
            var s = +e[0][0], a = +e[0][1], u = +e[1][0], l = +e[1][1];
            !function (t, e, n, r) {
                for (var i, o = Sa.length; o--;) sa(i = Sa[o], t, e, n, r) && oa(i, t, e, n, r) && (Math.abs(i[0][0] - i[1][0]) > Ca || Math.abs(i[0][1] - i[1][1]) > Ca) || delete Sa[o]
            }(s, a, u, l), function (t, e, n, r) {
                var i, o, s, a, u, l, c, h, p, f, g, d, y = Ia.length, v = !0;
                for (i = 0; i < y; ++i) if (o = Ia[i]) {
                    for (s = o.site, a = (u = o.halfedges).length; a--;) Sa[u[a]] || u.splice(a, 1);
                    for (a = 0, l = u.length; a < l;) g = (f = la(o, Sa[u[a]]))[0], d = f[1], h = (c = ua(o, Sa[u[++a % l]]))[0], p = c[1], (Math.abs(g - h) > Ca || Math.abs(d - p) > Ca) && (u.splice(a, 0, Sa.push(ra(s, f, Math.abs(g - t) < Ca && r - d > Ca ? [t, Math.abs(h - t) < Ca ? p : r] : Math.abs(d - r) < Ca && n - g > Ca ? [Math.abs(p - r) < Ca ? h : n, r] : Math.abs(g - n) < Ca && d - e > Ca ? [n, Math.abs(h - n) < Ca ? p : e] : Math.abs(d - e) < Ca && g - t > Ca ? [Math.abs(p - e) < Ca ? h : t, e] : null)) - 1), ++l);
                    l && (v = !1)
                }
                if (v) {
                    var _, m, x, E = 1 / 0;
                    for (i = 0, v = null; i < y; ++i) (o = Ia[i]) && (x = (_ = (s = o.site)[0] - t) * _ + (m = s[1] - e) * m) < E && (E = x, v = o);
                    if (v) {
                        var b = [t, e], w = [t, r], I = [n, r], N = [n, e];
                        v.halfedges.push(Sa.push(ra(s = v.site, b, w)) - 1, Sa.push(ra(s, w, I)) - 1, Sa.push(ra(s, I, N)) - 1, Sa.push(ra(s, N, b)) - 1)
                    }
                }
                for (i = 0; i < y; ++i) (o = Ia[i]) && (o.halfedges.length || delete Ia[i])
            }(s, a, u, l)
        }
        this.edges = Sa, this.cells = Ia, wa = Na = Sa = Ia = null
    }

    function Oa(t) {
        return (t = t.slice()).push(t[0]), l([t])
    }

    function Ra(t, e, n, r) {
        var i = (r = r || {}).steps || 64, o = r.units || "kilometers", s = r.angle || 0, a = r.pivot || t,
            u = r.properties || t.properties || {};
        if (!t) throw new Error("center is required");
        if (!e) throw new Error("xSemiAxis is required");
        if (!n) throw new Error("ySemiAxis is required");
        if (!P(r)) throw new Error("options must be an object");
        if (!C(i)) throw new Error("steps must be a number");
        if (!C(s)) throw new Error("angle must be a number");
        var c = R(t);
        if ("degrees" === o) var h = I(s); else e = qi(t, e, 90, {units: o}), n = qi(t, n, 0, {units: o}), e = R(e)[0] - c[0], n = R(n)[1] - c[1];
        for (var p = [], f = 0; f < i; f += 1) {
            var g = -360 * f / i, d = e * n / Math.sqrt(Math.pow(n, 2) + Math.pow(e, 2) * Math.pow(Ta(g), 2)),
                y = e * n / Math.sqrt(Math.pow(e, 2) + Math.pow(n, 2) / Math.pow(Ta(g), 2));
            if (g < -90 && g >= -270 && (d = -d), g < -180 && g >= -360 && (y = -y), "degrees" === o) {
                var v = d * Math.cos(h) + y * Math.sin(h), _ = y * Math.cos(h) - d * Math.sin(h);
                d = v, y = _
            }
            p.push([d + c[0], y + c[1]])
        }
        return p.push(p[0]), "degrees" === o ? l([p], u) : Zo(l([p], u), s, {pivot: a})
    }

    function Ta(t) {
        var e = t * Math.PI / 180;
        return Math.tan(e)
    }

    function Aa(t, e) {
        void 0 === e && (e = {});
        var n = 0, r = 0, i = 0;
        return W(t, (function (t, o, s) {
            var a = s[e.weight];
            if (!C(a = null == a ? 1 : a)) throw new Error("weight value must be a number for feature index " + o);
            (a = Number(a)) > 0 && z(t, (function (t) {
                n += t[0] * a, r += t[1] * a, i += a
            }))
        })), a([n / i, r / i], e.properties, e)
    }

    function Da(t, e, n, r) {
        var i = n.properties.tolerance || .001, o = 0, s = 0, u = 0, l = 0;
        if (X(n, (function (e) {
            var n = e.properties.weight, r = null == n ? 1 : n;
            if (!C(r = Number(r))) throw new Error("weight value must be a number");
            if (r > 0) {
                l += 1;
                var i = r * me(e, t);
                0 === i && (i = 1);
                var a = r / i;
                o += e.geometry.coordinates[0] * a, s += e.geometry.coordinates[1] * a, u += a
            }
        })), l < 1) throw new Error("no features to measure");
        var c = o / u, h = s / u;
        return 1 === l || 0 === r || Math.abs(c - e[0]) < i && Math.abs(h - e[1]) < i ? a([c, h], {medianCandidates: n.properties.medianCandidates}) : (n.properties.medianCandidates.push([c, h]), Da([c, h], t, n, r - 1))
    }

    function Fa(t, e) {
        return {x: t[0] - e[0], y: t[1] - e[1]}
    }

    function ka(t, e) {
        var n = 0, r = 0;
        z(t, (function (i, o, s, a, u) {
            u > n && (n = u, r = o, e.push([]));
            var l = o - r, c = t.coordinates[u][l + 1], h = i[0], p = i[1], f = c[0], g = c[1];
            e[u].push([.75 * h + .25 * f, .75 * p + .25 * g]), e[u].push([.25 * h + .75 * f, .25 * p + .75 * g])
        }), !0), e.forEach((function (t) {
            t.push(t[0])
        }))
    }

    function Ga(t, e) {
        var n = 0, r = 0, i = 0;
        z(t, (function (o, s, a, u, l) {
            u > i && (i = u, r = s, e.push([[]])), l > n && (n = l, r = s, e[u].push([]));
            var c = s - r, h = t.coordinates[u][l][c + 1], p = o[0], f = o[1], g = h[0], d = h[1];
            e[u][l].push([.75 * p + .25 * g, .75 * f + .25 * d]), e[u][l].push([.25 * p + .75 * g, .25 * f + .75 * d])
        }), !0), e.forEach((function (t) {
            t.forEach((function (t) {
                t.push(t[0])
            }))
        }))
    }

    function qa(t, e, n) {
        void 0 === n && (n = 2);
        var r = R(t), i = R(e), o = r[0] - i[0], s = r[1] - i[1];
        return 1 === n ? Math.abs(o) + Math.abs(s) : Math.pow(Math.pow(o, n) + Math.pow(s, n), 1 / n)
    }

    function Ba(t, e) {
        var n = (e = e || {}).threshold || 1e4, r = e.p || 2, i = e.binary || !1, o = e.alpha || -1,
            s = e.standardization || !1, a = [];
        X(t, (function (t) {
            a.push(xn(t))
        }));
        for (var u = [], l = 0; l < a.length; l++) u[l] = [];
        for (l = 0; l < a.length; l++) for (var c = l; c < a.length; c++) {
            l === c && (u[l][c] = 0);
            var h = qa(a[l], a[c], r);
            u[l][c] = h, u[c][l] = h
        }
        for (l = 0; l < a.length; l++) for (c = 0; c < a.length; c++) {
            0 !== (h = u[l][c]) && (u[l][c] = i ? h <= n ? 1 : 0 : h <= n ? Math.pow(h, o) : 0)
        }
        if (s) for (l = 0; l < a.length; l++) {
            var p = u[l].reduce((function (t, e) {
                return t + e
            }), 0);
            for (c = 0; c < a.length; c++) u[l][c] = u[l][c] / p
        }
        return u
    }

    function za(t) {
        for (var e = 0, n = 0, r = t; n < r.length; n++) {
            e += r[n]
        }
        return e / t.length
    }

    function ja(t, e) {
        return void 0 === e && (e = {}), Va(t, "mercator", e)
    }

    function Ua(t, e) {
        return void 0 === e && (e = {}), Va(t, "wgs84", e)
    }

    function Va(t, e, n) {
        void 0 === n && (n = {});
        var r = (n = n || {}).mutate;
        if (!t) throw new Error("geojson is required");
        return Array.isArray(t) && C(t[0]) ? t = "mercator" === e ? Xa(t) : Ya(t) : (!0 !== r && (t = Ie(t)), z(t, (function (t) {
            var n = "mercator" === e ? Xa(t) : Ya(t);
            t[0] = n[0], t[1] = n[1]
        }))), t
    }

    function Xa(t) {
        var e = Math.PI / 180, n = 6378137, r = 20037508.342789244,
            i = [n * (Math.abs(t[0]) <= 180 ? t[0] : t[0] - 360 * function (t) {
                return t < 0 ? -1 : t > 0 ? 1 : 0
            }(t[0])) * e, n * Math.log(Math.tan(.25 * Math.PI + .5 * t[1] * e))];
        return i[0] > r && (i[0] = r), i[0] < -r && (i[0] = -r), i[1] > r && (i[1] = r), i[1] < -r && (i[1] = -r), i
    }

    function Ya(t) {
        var e = 180 / Math.PI, n = 6378137;
        return [t[0] * e / n, (.5 * Math.PI - 2 * Math.atan(Math.exp(-t[1] / n))) * e]
    }

    Ma.prototype = {
        constructor: Ma, polygons: function () {
            var t = this.edges;
            return this.cells.map((function (e) {
                var n = e.halfedges.map((function (n) {
                    return ua(e, t[n])
                }));
                return n.data = e.site.data, n
            }))
        }, triangles: function () {
            var t = [], e = this.edges;
            return this.cells.forEach((function (n, r) {
                if (o = (i = n.halfedges).length) for (var i, o, s, a, u, l, c = n.site, h = -1, p = e[i[o - 1]], f = p.left === c ? p.right : p.left; ++h < o;) s = f, f = (p = e[i[h]]).left === c ? p.right : p.left, s && f && r < s.index && r < f.index && (u = s, l = f, ((a = c)[0] - l[0]) * (u[1] - a[1]) - (a[0] - u[0]) * (l[1] - a[1]) < 0) && t.push([c.data, s.data, f.data])
            })), t
        }, links: function () {
            return this.edges.filter((function (t) {
                return t.right
            })).map((function (t) {
                return {source: t.left.data, target: t.right.data}
            }))
        }, find: function (t, e, n) {
            for (var r, i, o = this, s = o._found || 0, a = o.cells.length; !(i = o.cells[s]);) if (++s >= a) return null;
            var u = t - i.site[0], l = e - i.site[1], c = u * u + l * l;
            do {
                i = o.cells[r = s], s = null, i.halfedges.forEach((function (n) {
                    var r = o.edges[n], a = r.left;
                    if (a !== i.site && a || (a = r.right)) {
                        var u = t - a[0], l = e - a[1], h = u * u + l * l;
                        h < c && (c = h, s = a.index)
                    }
                }))
            } while (null !== s);
            return o._found = r, null == n || c <= n * n ? i.site : null
        }
    };
    var Ha = Object.freeze({__proto__: null, toMercator: ja, toWgs84: Ua});

    function Wa(t) {
        return Array.isArray(t) ? $a(t) : t && t.bbox ? $a(t.bbox) : [360 * Qa(), 180 * Qa()]
    }

    function Ja(t, e) {
        void 0 === e && (e = {}), null == t && (t = 1);
        for (var n = [], r = 0; r < t; r++) n.push(a(Wa(e.bbox)));
        return f(n)
    }

    function Za(t, e) {
        void 0 === e && (e = {}), null == t && (t = 1), C(e.num_vertices) && void 0 !== e.num_vertices || (e.num_vertices = 10), C(e.max_radial_length) && void 0 !== e.max_radial_length || (e.max_radial_length = 10);
        for (var n = [], r = function (t) {
            var r, i = [], o = Array.apply(null, new Array(e.num_vertices + 1)).map(Math.random);
            o.forEach((function (t, e, n) {
                n[e] = e > 0 ? t + n[e - 1] : t
            })), o.forEach((function (t) {
                t = 2 * t * Math.PI / o[o.length - 1];
                var n = Math.random();
                i.push([n * (e.max_radial_length || 10) * Math.sin(t), n * (e.max_radial_length || 10) * Math.cos(t)])
            })), i[i.length - 1] = i[0], i = i.map((r = Wa(e.bbox), function (t) {
                return [t[0] + r[0], t[1] + r[1]]
            })), n.push(l([i]))
        }, i = 0; i < t; i++) r();
        return f(n)
    }

    function Ka(t, e) {
        if (void 0 === e && (e = {}), !P(e = e || {})) throw new Error("options is invalid");
        var n = e.bbox, r = e.num_vertices, i = e.max_length, o = e.max_rotation;
        null == t && (t = 1), (!C(r) || void 0 === r || r < 2) && (r = 10), C(i) && void 0 !== i || (i = 1e-4), C(o) && void 0 !== o || (o = Math.PI / 8);
        for (var s = [], a = 0; a < t; a++) {
            for (var u = [Wa(n)], l = 0; l < r - 1; l++) {
                var c = (0 === l ? 2 * Math.random() * Math.PI : Math.tan((u[l][1] - u[l - 1][1]) / (u[l][0] - u[l - 1][0]))) + (Math.random() - .5) * o * 2,
                    p = Math.random() * i;
                u.push([u[l][0] + p * Math.cos(c), u[l][1] + p * Math.sin(c)])
            }
            s.push(h(u))
        }
        return f(s)
    }

    function Qa() {
        return Math.random() - .5
    }

    function $a(t) {
        return [Math.random() * (t[2] - t[0]) + t[0], Math.random() * (t[3] - t[1]) + t[1]]
    }

    var tu = Object.freeze({
        __proto__: null,
        randomPosition: Wa,
        randomPoint: Ja,
        randomPolygon: Za,
        randomLineString: Ka
    });

    function eu(t, e) {
        if (!t) throw new Error("geojson is required");
        if ("FeatureCollection" !== t.type) throw new Error("geojson must be a FeatureCollection");
        if (null == e) throw new Error("filter is required");
        var n = [];
        return X(t, (function (t) {
            ou(t.properties, e) && n.push(t)
        })), f(n)
    }

    function nu(t, e, n) {
        if (!t) throw new Error("geojson is required");
        if ("FeatureCollection" !== t.type) throw new Error("geojson must be a FeatureCollection");
        if (null == e) throw new Error("property is required");
        for (var r = iu(t, e), i = Object.keys(r), o = 0; o < i.length; o++) {
            for (var s = i[o], a = r[s], u = [], l = 0; l < a.length; l++) u.push(t.features[a[l]]);
            n(f(u), s, o)
        }
    }

    function ru(t, e, n, r) {
        var i = r;
        return nu(t, e, (function (t, e, o) {
            i = 0 === o && void 0 === r ? t : n(i, t, e, o)
        })), i
    }

    function iu(t, e) {
        var n = {};
        return X(t, (function (t, r) {
            var i = t.properties || {};
            if (i.hasOwnProperty(String(e))) {
                var o = i[e];
                n.hasOwnProperty(o) ? n[o].push(r) : n[o] = [r]
            }
        })), n
    }

    function ou(t, e) {
        if (void 0 === t) return !1;
        var n = typeof e;
        if ("number" === n || "string" === n) return t.hasOwnProperty(e);
        if (Array.isArray(e)) {
            for (var r = 0; r < e.length; r++) if (!ou(t, e[r])) return !1;
            return !0
        }
        return su(t, e)
    }

    function su(t, e) {
        for (var n = Object.keys(e), r = 0; r < n.length; r++) {
            var i = n[r];
            if (t[i] !== e[i]) return !1
        }
        return !0
    }

    function au(t, e) {
        if (!e) return {};
        if (!e.length) return {};
        for (var n = {}, r = 0; r < e.length; r++) {
            var i = e[r];
            t.hasOwnProperty(i) && (n[i] = t[i])
        }
        return n
    }

    var uu = Object.freeze({
        __proto__: null,
        getCluster: eu,
        clusterEach: nu,
        clusterReduce: ru,
        createBins: iu,
        applyFilter: ou,
        propertiesContainsFilter: su,
        filterProperties: au
    }), lu = function (t, e) {
        this.next = null, this.key = t, this.data = e, this.left = null, this.right = null
    };

    /**
     * splaytree v3.1.0
     * Fast Splay tree for Node and browser
     *
     * @author Alexander Milevski <info@w8r.name>
     * @license MIT
     * @preserve
     */function cu(t, e) {
        return t > e ? 1 : t < e ? -1 : 0
    }

    function hu(t, e, n) {
        for (var r = new lu(null, null), i = r, o = r; ;) {
            var s = n(t, e.key);
            if (s < 0) {
                if (null === e.left) break;
                if (n(t, e.left.key) < 0) {
                    var a = e.left;
                    if (e.left = a.right, a.right = e, null === (e = a).left) break
                }
                o.left = e, o = e, e = e.left
            } else {
                if (!(s > 0)) break;
                if (null === e.right) break;
                if (n(t, e.right.key) > 0) {
                    a = e.right;
                    if (e.right = a.left, a.left = e, null === (e = a).right) break
                }
                i.right = e, i = e, e = e.right
            }
        }
        return i.right = e.left, o.left = e.right, e.left = r.right, e.right = r.left, e
    }

    function pu(t, e, n, r) {
        var i = new lu(t, e);
        if (null === n) return i.left = i.right = null, i;
        var o = r(t, (n = hu(t, n, r)).key);
        return o < 0 ? (i.left = n.left, i.right = n, n.left = null) : o >= 0 && (i.right = n.right, i.left = n, n.right = null), i
    }

    function fu(t, e, n) {
        var r = null, i = null;
        if (e) {
            var o = n((e = hu(t, e, n)).key, t);
            0 === o ? (r = e.left, i = e.right) : o < 0 ? (i = e.right, e.right = null, r = e) : (r = e.left, e.left = null, i = e)
        }
        return {left: r, right: i}
    }

    function gu(t, e, n, r, i) {
        if (t) {
            r(e + (n ? "└── " : "├── ") + i(t) + "\n");
            var o = e + (n ? "    " : "│   ");
            t.left && gu(t.left, o, !1, r, i), t.right && gu(t.right, o, !0, r, i)
        }
    }

    var du = function () {
        function t(t) {
            void 0 === t && (t = cu), this._root = null, this._size = 0, this._comparator = t
        }

        return t.prototype.insert = function (t, e) {
            return this._size++, this._root = pu(t, e, this._root, this._comparator)
        }, t.prototype.add = function (t, e) {
            var n = new lu(t, e);
            null === this._root && (n.left = n.right = null, this._size++, this._root = n);
            var r = this._comparator, i = hu(t, this._root, r), o = r(t, i.key);
            return 0 === o ? this._root = i : (o < 0 ? (n.left = i.left, n.right = i, i.left = null) : o > 0 && (n.right = i.right, n.left = i, i.right = null), this._size++, this._root = n), this._root
        }, t.prototype.remove = function (t) {
            this._root = this._remove(t, this._root, this._comparator)
        }, t.prototype._remove = function (t, e, n) {
            var r;
            return null === e ? null : 0 === n(t, (e = hu(t, e, n)).key) ? (null === e.left ? r = e.right : (r = hu(t, e.left, n)).right = e.right, this._size--, r) : e
        }, t.prototype.pop = function () {
            var t = this._root;
            if (t) {
                for (; t.left;) t = t.left;
                return this._root = hu(t.key, this._root, this._comparator), this._root = this._remove(t.key, this._root, this._comparator), {
                    key: t.key,
                    data: t.data
                }
            }
            return null
        }, t.prototype.findStatic = function (t) {
            for (var e = this._root, n = this._comparator; e;) {
                var r = n(t, e.key);
                if (0 === r) return e;
                e = r < 0 ? e.left : e.right
            }
            return null
        }, t.prototype.find = function (t) {
            return this._root && (this._root = hu(t, this._root, this._comparator), 0 !== this._comparator(t, this._root.key)) ? null : this._root
        }, t.prototype.contains = function (t) {
            for (var e = this._root, n = this._comparator; e;) {
                var r = n(t, e.key);
                if (0 === r) return !0;
                e = r < 0 ? e.left : e.right
            }
            return !1
        }, t.prototype.forEach = function (t, e) {
            for (var n = this._root, r = [], i = !1; !i;) null !== n ? (r.push(n), n = n.left) : 0 !== r.length ? (n = r.pop(), t.call(e, n), n = n.right) : i = !0;
            return this
        }, t.prototype.range = function (t, e, n, r) {
            for (var i = [], o = this._comparator, s = this._root; 0 !== i.length || s;) if (s) i.push(s), s = s.left; else {
                if (o((s = i.pop()).key, e) > 0) break;
                if (o(s.key, t) >= 0 && n.call(r, s)) return this;
                s = s.right
            }
            return this
        }, t.prototype.keys = function () {
            var t = [];
            return this.forEach((function (e) {
                var n = e.key;
                return t.push(n)
            })), t
        }, t.prototype.values = function () {
            var t = [];
            return this.forEach((function (e) {
                var n = e.data;
                return t.push(n)
            })), t
        }, t.prototype.min = function () {
            return this._root ? this.minNode(this._root).key : null
        }, t.prototype.max = function () {
            return this._root ? this.maxNode(this._root).key : null
        }, t.prototype.minNode = function (t) {
            if (void 0 === t && (t = this._root), t) for (; t.left;) t = t.left;
            return t
        }, t.prototype.maxNode = function (t) {
            if (void 0 === t && (t = this._root), t) for (; t.right;) t = t.right;
            return t
        }, t.prototype.at = function (t) {
            for (var e = this._root, n = !1, r = 0, i = []; !n;) if (e) i.push(e), e = e.left; else if (i.length > 0) {
                if (e = i.pop(), r === t) return e;
                r++, e = e.right
            } else n = !0;
            return null
        }, t.prototype.next = function (t) {
            var e = this._root, n = null;
            if (t.right) {
                for (n = t.right; n.left;) n = n.left;
                return n
            }
            for (var r = this._comparator; e;) {
                var i = r(t.key, e.key);
                if (0 === i) break;
                i < 0 ? (n = e, e = e.left) : e = e.right
            }
            return n
        }, t.prototype.prev = function (t) {
            var e = this._root, n = null;
            if (null !== t.left) {
                for (n = t.left; n.right;) n = n.right;
                return n
            }
            for (var r = this._comparator; e;) {
                var i = r(t.key, e.key);
                if (0 === i) break;
                i < 0 ? e = e.left : (n = e, e = e.right)
            }
            return n
        }, t.prototype.clear = function () {
            return this._root = null, this._size = 0, this
        }, t.prototype.toList = function () {
            return function (t) {
                var e = t, n = [], r = !1, i = new lu(null, null), o = i;
                for (; !r;) e ? (n.push(e), e = e.left) : n.length > 0 ? e = (e = o = o.next = n.pop()).right : r = !0;
                return o.next = null, i.next
            }(this._root)
        }, t.prototype.load = function (t, e, n) {
            void 0 === e && (e = []), void 0 === n && (n = !1);
            var r = t.length, i = this._comparator;
            if (n && _u(t, e, 0, r - 1, i), null === this._root) this._root = yu(t, e, 0, r), this._size = r; else {
                var o = function (t, e, n) {
                    var r = new lu(null, null), i = r, o = t, s = e;
                    for (; null !== o && null !== s;) n(o.key, s.key) < 0 ? (i.next = o, o = o.next) : (i.next = s, s = s.next), i = i.next;
                    null !== o ? i.next = o : null !== s && (i.next = s);
                    return r.next
                }(this.toList(), function (t, e) {
                    for (var n = new lu(null, null), r = n, i = 0; i < t.length; i++) r = r.next = new lu(t[i], e[i]);
                    return r.next = null, n.next
                }(t, e), i);
                r = this._size + r, this._root = vu({head: o}, 0, r)
            }
            return this
        }, t.prototype.isEmpty = function () {
            return null === this._root
        }, Object.defineProperty(t.prototype, "size", {
            get: function () {
                return this._size
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(t.prototype, "root", {
            get: function () {
                return this._root
            }, enumerable: !0, configurable: !0
        }), t.prototype.toString = function (t) {
            void 0 === t && (t = function (t) {
                return String(t.key)
            });
            var e = [];
            return gu(this._root, "", !0, (function (t) {
                return e.push(t)
            }), t), e.join("")
        }, t.prototype.update = function (t, e, n) {
            var r = this._comparator, i = fu(t, this._root, r), o = i.left, s = i.right;
            r(t, e) < 0 ? s = pu(e, n, s, r) : o = pu(e, n, o, r), this._root = function (t, e, n) {
                return null === e ? t : (null === t || ((e = hu(t.key, e, n)).left = t), e)
            }(o, s, r)
        }, t.prototype.split = function (t) {
            return fu(t, this._root, this._comparator)
        }, t
    }();

    function yu(t, e, n, r) {
        var i = r - n;
        if (i > 0) {
            var o = n + Math.floor(i / 2), s = t[o], a = e[o], u = new lu(s, a);
            return u.left = yu(t, e, n, o), u.right = yu(t, e, o + 1, r), u
        }
        return null
    }

    function vu(t, e, n) {
        var r = n - e;
        if (r > 0) {
            var i = e + Math.floor(r / 2), o = vu(t, e, i), s = t.head;
            return s.left = o, t.head = t.head.next, s.right = vu(t, i + 1, n), s
        }
        return null
    }

    function _u(t, e, n, r, i) {
        if (!(n >= r)) {
            for (var o = t[n + r >> 1], s = n - 1, a = r + 1; ;) {
                do {
                    s++
                } while (i(t[s], o) < 0);
                do {
                    a--
                } while (i(t[a], o) > 0);
                if (s >= a) break;
                var u = t[s];
                t[s] = t[a], t[a] = u, u = e[s], e[s] = e[a], e[a] = u
            }
            _u(t, e, n, a, i), _u(t, e, a + 1, r, i)
        }
    }

    function mu(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function xu(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    function Eu(t, e, n) {
        return e && xu(t.prototype, e), n && xu(t, n), t
    }

    var bu = function (t, e) {
        return t.ll.x <= e.x && e.x <= t.ur.x && t.ll.y <= e.y && e.y <= t.ur.y
    }, wu = function (t, e) {
        if (e.ur.x < t.ll.x || t.ur.x < e.ll.x || e.ur.y < t.ll.y || t.ur.y < e.ll.y) return null;
        var n = t.ll.x < e.ll.x ? e.ll.x : t.ll.x, r = t.ur.x < e.ur.x ? t.ur.x : e.ur.x;
        return {ll: {x: n, y: t.ll.y < e.ll.y ? e.ll.y : t.ll.y}, ur: {x: r, y: t.ur.y < e.ur.y ? t.ur.y : e.ur.y}}
    }, Iu = Number.EPSILON;
    void 0 === Iu && (Iu = Math.pow(2, -52));
    var Nu = Iu * Iu, Su = function (t, e) {
            if (-Iu < t && t < Iu && -Iu < e && e < Iu) return 0;
            var n = t - e;
            return n * n < Nu * t * e ? 0 : t < e ? -1 : 1
        }, Cu = function () {
            function t() {
                mu(this, t), this.reset()
            }

            return Eu(t, [{
                key: "reset", value: function () {
                    this.xRounder = new Pu, this.yRounder = new Pu
                }
            }, {
                key: "round", value: function (t, e) {
                    return {x: this.xRounder.round(t), y: this.yRounder.round(e)}
                }
            }]), t
        }(), Pu = function () {
            function t() {
                mu(this, t), this.tree = new du, this.round(0)
            }

            return Eu(t, [{
                key: "round", value: function (t) {
                    var e = this.tree.add(t), n = this.tree.prev(e);
                    if (null !== n && 0 === Su(e.key, n.key)) return this.tree.remove(t), n.key;
                    var r = this.tree.next(e);
                    return null !== r && 0 === Su(e.key, r.key) ? (this.tree.remove(t), r.key) : t
                }
            }]), t
        }(), Lu = new Cu, Mu = function (t, e) {
            return t.x * e.y - t.y * e.x
        }, Ou = function (t, e) {
            return t.x * e.x + t.y * e.y
        }, Ru = function (t, e, n) {
            var r = {x: e.x - t.x, y: e.y - t.y}, i = {x: n.x - t.x, y: n.y - t.y}, o = Mu(r, i);
            return Su(o, 0)
        }, Tu = function (t) {
            return Math.sqrt(Ou(t, t))
        }, Au = function (t, e, n) {
            var r = {x: e.x - t.x, y: e.y - t.y}, i = {x: n.x - t.x, y: n.y - t.y};
            return Ou(i, r) / Tu(i) / Tu(r)
        }, Du = function (t, e, n) {
            return 0 === e.y ? null : {x: t.x + e.x / e.y * (n - t.y), y: n}
        }, Fu = function (t, e, n) {
            return 0 === e.x ? null : {x: n, y: t.y + e.y / e.x * (n - t.x)}
        }, ku = function () {
            function t(e, n) {
                mu(this, t), void 0 === e.events ? e.events = [this] : e.events.push(this), this.point = e, this.isLeft = n
            }

            return Eu(t, null, [{
                key: "compare", value: function (e, n) {
                    var r = t.comparePoints(e.point, n.point);
                    return 0 !== r ? r : (e.point !== n.point && e.link(n), e.isLeft !== n.isLeft ? e.isLeft ? 1 : -1 : qu.compare(e.segment, n.segment))
                }
            }, {
                key: "comparePoints", value: function (t, e) {
                    return t.x < e.x ? -1 : t.x > e.x ? 1 : t.y < e.y ? -1 : t.y > e.y ? 1 : 0
                }
            }]), Eu(t, [{
                key: "link", value: function (t) {
                    if (t.point === this.point) throw new Error("Tried to link already linked events");
                    for (var e = t.point.events, n = 0, r = e.length; n < r; n++) {
                        var i = e[n];
                        this.point.events.push(i), i.point = this.point
                    }
                    this.checkForConsuming()
                }
            }, {
                key: "checkForConsuming", value: function () {
                    for (var t = this.point.events.length, e = 0; e < t; e++) {
                        var n = this.point.events[e];
                        if (void 0 === n.segment.consumedBy) for (var r = e + 1; r < t; r++) {
                            var i = this.point.events[r];
                            void 0 === i.consumedBy && (n.otherSE.point.events === i.otherSE.point.events && n.segment.consume(i.segment))
                        }
                    }
                }
            }, {
                key: "getAvailableLinkedEvents", value: function () {
                    for (var t = [], e = 0, n = this.point.events.length; e < n; e++) {
                        var r = this.point.events[e];
                        r !== this && !r.segment.ringOut && r.segment.isInResult() && t.push(r)
                    }
                    return t
                }
            }, {
                key: "getLeftmostComparator", value: function (t) {
                    var e = this, n = new Map, r = function (r) {
                        var i, o, s, a, u, l = r.otherSE;
                        n.set(r, {
                            sine: (i = e.point, o = t.point, s = l.point, a = {
                                x: o.x - i.x,
                                y: o.y - i.y
                            }, u = {x: s.x - i.x, y: s.y - i.y}, Mu(u, a) / Tu(u) / Tu(a)),
                            cosine: Au(e.point, t.point, l.point)
                        })
                    };
                    return function (t, e) {
                        n.has(t) || r(t), n.has(e) || r(e);
                        var i = n.get(t), o = i.sine, s = i.cosine, a = n.get(e), u = a.sine, l = a.cosine;
                        return o >= 0 && u >= 0 ? s < l ? 1 : s > l ? -1 : 0 : o < 0 && u < 0 ? s < l ? -1 : s > l ? 1 : 0 : u < o ? -1 : u > o ? 1 : 0
                    }
                }
            }]), t
        }(), Gu = 0, qu = function () {
            function t(e, n, r, i) {
                mu(this, t), this.id = ++Gu, this.leftSE = e, e.segment = this, e.otherSE = n, this.rightSE = n, n.segment = this, n.otherSE = e, this.rings = r, this.windings = i
            }

            return Eu(t, null, [{
                key: "compare", value: function (t, e) {
                    var n = t.leftSE.point.x, r = e.leftSE.point.x, i = t.rightSE.point.x, o = e.rightSE.point.x;
                    if (o < n) return 1;
                    if (i < r) return -1;
                    var s = t.leftSE.point.y, a = e.leftSE.point.y, u = t.rightSE.point.y, l = e.rightSE.point.y;
                    if (n < r) {
                        if (a < s && a < u) return 1;
                        if (a > s && a > u) return -1;
                        var c = t.comparePoint(e.leftSE.point);
                        if (c < 0) return 1;
                        if (c > 0) return -1;
                        var h = e.comparePoint(t.rightSE.point);
                        return 0 !== h ? h : -1
                    }
                    if (n > r) {
                        if (s < a && s < l) return -1;
                        if (s > a && s > l) return 1;
                        var p = e.comparePoint(t.leftSE.point);
                        if (0 !== p) return p;
                        var f = t.comparePoint(e.rightSE.point);
                        return f < 0 ? 1 : f > 0 ? -1 : 1
                    }
                    if (s < a) return -1;
                    if (s > a) return 1;
                    if (i < o) {
                        var g = e.comparePoint(t.rightSE.point);
                        if (0 !== g) return g
                    }
                    if (i > o) {
                        var d = t.comparePoint(e.rightSE.point);
                        if (d < 0) return 1;
                        if (d > 0) return -1
                    }
                    if (i !== o) {
                        var y = u - s, v = i - n, _ = l - a, m = o - r;
                        if (y > v && _ < m) return 1;
                        if (y < v && _ > m) return -1
                    }
                    return i > o ? 1 : i < o || u < l ? -1 : u > l ? 1 : t.id < e.id ? -1 : t.id > e.id ? 1 : 0
                }
            }]), Eu(t, [{
                key: "replaceRightSE", value: function (t) {
                    this.rightSE = t, this.rightSE.segment = this, this.rightSE.otherSE = this.leftSE, this.leftSE.otherSE = this.rightSE
                }
            }, {
                key: "bbox", value: function () {
                    var t = this.leftSE.point.y, e = this.rightSE.point.y;
                    return {ll: {x: this.leftSE.point.x, y: t < e ? t : e}, ur: {x: this.rightSE.point.x, y: t > e ? t : e}}
                }
            }, {
                key: "vector", value: function () {
                    return {x: this.rightSE.point.x - this.leftSE.point.x, y: this.rightSE.point.y - this.leftSE.point.y}
                }
            }, {
                key: "isAnEndpoint", value: function (t) {
                    return t.x === this.leftSE.point.x && t.y === this.leftSE.point.y || t.x === this.rightSE.point.x && t.y === this.rightSE.point.y
                }
            }, {
                key: "comparePoint", value: function (t) {
                    if (this.isAnEndpoint(t)) return 0;
                    var e = this.leftSE.point, n = this.rightSE.point, r = this.vector();
                    if (e.x === n.x) return t.x === e.x ? 0 : t.x < e.x ? 1 : -1;
                    var i = (t.y - e.y) / r.y, o = e.x + i * r.x;
                    if (t.x === o) return 0;
                    var s = (t.x - e.x) / r.x, a = e.y + s * r.y;
                    return t.y === a ? 0 : t.y < a ? -1 : 1
                }
            }, {
                key: "getIntersection", value: function (t) {
                    var e = this.bbox(), n = t.bbox(), r = wu(e, n);
                    if (null === r) return null;
                    var i = this.leftSE.point, o = this.rightSE.point, s = t.leftSE.point, a = t.rightSE.point,
                        u = bu(e, s) && 0 === this.comparePoint(s), l = bu(n, i) && 0 === t.comparePoint(i),
                        c = bu(e, a) && 0 === this.comparePoint(a), h = bu(n, o) && 0 === t.comparePoint(o);
                    if (l && u) return h && !c ? o : !h && c ? a : null;
                    if (l) return c && i.x === a.x && i.y === a.y ? null : i;
                    if (u) return h && o.x === s.x && o.y === s.y ? null : s;
                    if (h && c) return null;
                    if (h) return o;
                    if (c) return a;
                    var p = function (t, e, n, r) {
                        if (0 === e.x) return Fu(n, r, t.x);
                        if (0 === r.x) return Fu(t, e, n.x);
                        if (0 === e.y) return Du(n, r, t.y);
                        if (0 === r.y) return Du(t, e, n.y);
                        var i = Mu(e, r);
                        if (0 == i) return null;
                        var o = {x: n.x - t.x, y: n.y - t.y}, s = Mu(o, e) / i, a = Mu(o, r) / i;
                        return {x: (t.x + a * e.x + (n.x + s * r.x)) / 2, y: (t.y + a * e.y + (n.y + s * r.y)) / 2}
                    }(i, this.vector(), s, t.vector());
                    return null === p ? null : bu(r, p) ? Lu.round(p.x, p.y) : null
                }
            }, {
                key: "split", value: function (e) {
                    var n = [], r = void 0 !== e.events, i = new ku(e, !0), o = new ku(e, !1), s = this.rightSE;
                    this.replaceRightSE(o), n.push(o), n.push(i);
                    var a = new t(i, s, this.rings.slice(), this.windings.slice());
                    return ku.comparePoints(a.leftSE.point, a.rightSE.point) > 0 && a.swapEvents(), ku.comparePoints(this.leftSE.point, this.rightSE.point) > 0 && this.swapEvents(), r && (i.checkForConsuming(), o.checkForConsuming()), n
                }
            }, {
                key: "swapEvents", value: function () {
                    var t = this.rightSE;
                    this.rightSE = this.leftSE, this.leftSE = t, this.leftSE.isLeft = !0, this.rightSE.isLeft = !1;
                    for (var e = 0, n = this.windings.length; e < n; e++) this.windings[e] *= -1
                }
            }, {
                key: "consume", value: function (e) {
                    for (var n = this, r = e; n.consumedBy;) n = n.consumedBy;
                    for (; r.consumedBy;) r = r.consumedBy;
                    var i = t.compare(n, r);
                    if (0 !== i) {
                        if (i > 0) {
                            var o = n;
                            n = r, r = o
                        }
                        if (n.prev === r) {
                            var s = n;
                            n = r, r = s
                        }
                        for (var a = 0, u = r.rings.length; a < u; a++) {
                            var l = r.rings[a], c = r.windings[a], h = n.rings.indexOf(l);
                            -1 === h ? (n.rings.push(l), n.windings.push(c)) : n.windings[h] += c
                        }
                        r.rings = null, r.windings = null, r.consumedBy = n, r.leftSE.consumedBy = n.leftSE, r.rightSE.consumedBy = n.rightSE
                    }
                }
            }, {
                key: "prevInResult", value: function () {
                    return void 0 !== this._prevInResult || (this.prev ? this.prev.isInResult() ? this._prevInResult = this.prev : this._prevInResult = this.prev.prevInResult() : this._prevInResult = null), this._prevInResult
                }
            }, {
                key: "beforeState", value: function () {
                    if (void 0 !== this._beforeState) return this._beforeState;
                    if (this.prev) {
                        var t = this.prev.consumedBy || this.prev;
                        this._beforeState = t.afterState()
                    } else this._beforeState = {rings: [], windings: [], multiPolys: []};
                    return this._beforeState
                }
            }, {
                key: "afterState", value: function () {
                    if (void 0 !== this._afterState) return this._afterState;
                    var t = this.beforeState();
                    this._afterState = {rings: t.rings.slice(0), windings: t.windings.slice(0), multiPolys: []};
                    for (var e = this._afterState.rings, n = this._afterState.windings, r = this._afterState.multiPolys, i = 0, o = this.rings.length; i < o; i++) {
                        var s = this.rings[i], a = this.windings[i], u = e.indexOf(s);
                        -1 === u ? (e.push(s), n.push(a)) : n[u] += a
                    }
                    for (var l = [], c = [], h = 0, p = e.length; h < p; h++) if (0 !== n[h]) {
                        var f = e[h], g = f.poly;
                        if (-1 === c.indexOf(g)) if (f.isExterior) l.push(g); else {
                            -1 === c.indexOf(g) && c.push(g);
                            var d = l.indexOf(f.poly);
                            -1 !== d && l.splice(d, 1)
                        }
                    }
                    for (var y = 0, v = l.length; y < v; y++) {
                        var _ = l[y].multiPoly;
                        -1 === r.indexOf(_) && r.push(_)
                    }
                    return this._afterState
                }
            }, {
                key: "isInResult", value: function () {
                    if (this.consumedBy) return !1;
                    if (void 0 !== this._isInResult) return this._isInResult;
                    var t = this.beforeState().multiPolys, e = this.afterState().multiPolys;
                    switch (Ju.type) {
                        case"union":
                            var n = 0 === t.length, r = 0 === e.length;
                            this._isInResult = n !== r;
                            break;
                        case"intersection":
                            var i, o;
                            t.length < e.length ? (i = t.length, o = e.length) : (i = e.length, o = t.length), this._isInResult = o === Ju.numMultiPolys && i < o;
                            break;
                        case"xor":
                            var s = Math.abs(t.length - e.length);
                            this._isInResult = s % 2 == 1;
                            break;
                        case"difference":
                            var a = function (t) {
                                return 1 === t.length && t[0].isSubject
                            };
                            this._isInResult = a(t) !== a(e);
                            break;
                        default:
                            throw new Error("Unrecognized operation type found ".concat(Ju.type))
                    }
                    return this._isInResult
                }
            }], [{
                key: "fromRing", value: function (e, n, r) {
                    var i, o, s, a = ku.comparePoints(e, n);
                    if (a < 0) i = e, o = n, s = 1; else {
                        if (!(a > 0)) throw new Error("Tried to create degenerate segment at [".concat(e.x, ", ").concat(e.y, "]"));
                        i = n, o = e, s = -1
                    }
                    return new t(new ku(i, !0), new ku(o, !1), [r], [s])
                }
            }]), t
        }(), Bu = function () {
            function t(e, n, r) {
                if (mu(this, t), !Array.isArray(e) || 0 === e.length) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
                if (this.poly = n, this.isExterior = r, this.segments = [], "number" != typeof e[0][0] || "number" != typeof e[0][1]) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
                var i = Lu.round(e[0][0], e[0][1]);
                this.bbox = {ll: {x: i.x, y: i.y}, ur: {x: i.x, y: i.y}};
                for (var o = i, s = 1, a = e.length; s < a; s++) {
                    if ("number" != typeof e[s][0] || "number" != typeof e[s][1]) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
                    var u = Lu.round(e[s][0], e[s][1]);
                    u.x === o.x && u.y === o.y || (this.segments.push(qu.fromRing(o, u, this)), u.x < this.bbox.ll.x && (this.bbox.ll.x = u.x), u.y < this.bbox.ll.y && (this.bbox.ll.y = u.y), u.x > this.bbox.ur.x && (this.bbox.ur.x = u.x), u.y > this.bbox.ur.y && (this.bbox.ur.y = u.y), o = u)
                }
                i.x === o.x && i.y === o.y || this.segments.push(qu.fromRing(o, i, this))
            }

            return Eu(t, [{
                key: "getSweepEvents", value: function () {
                    for (var t = [], e = 0, n = this.segments.length; e < n; e++) {
                        var r = this.segments[e];
                        t.push(r.leftSE), t.push(r.rightSE)
                    }
                    return t
                }
            }]), t
        }(), zu = function () {
            function t(e, n) {
                if (mu(this, t), !Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
                this.exteriorRing = new Bu(e[0], this, !0), this.bbox = {
                    ll: {
                        x: this.exteriorRing.bbox.ll.x,
                        y: this.exteriorRing.bbox.ll.y
                    }, ur: {x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y}
                }, this.interiorRings = [];
                for (var r = 1, i = e.length; r < i; r++) {
                    var o = new Bu(e[r], this, !1);
                    o.bbox.ll.x < this.bbox.ll.x && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y < this.bbox.ll.y && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x > this.bbox.ur.x && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y > this.bbox.ur.y && (this.bbox.ur.y = o.bbox.ur.y), this.interiorRings.push(o)
                }
                this.multiPoly = n
            }

            return Eu(t, [{
                key: "getSweepEvents", value: function () {
                    for (var t = this.exteriorRing.getSweepEvents(), e = 0, n = this.interiorRings.length; e < n; e++) for (var r = this.interiorRings[e].getSweepEvents(), i = 0, o = r.length; i < o; i++) t.push(r[i]);
                    return t
                }
            }]), t
        }(), ju = function () {
            function t(e, n) {
                if (mu(this, t), !Array.isArray(e)) throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
                try {
                    "number" == typeof e[0][0][0] && (e = [e])
                } catch (t) {
                }
                this.polys = [], this.bbox = {
                    ll: {x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY},
                    ur: {x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY}
                };
                for (var r = 0, i = e.length; r < i; r++) {
                    var o = new zu(e[r], this);
                    o.bbox.ll.x < this.bbox.ll.x && (this.bbox.ll.x = o.bbox.ll.x), o.bbox.ll.y < this.bbox.ll.y && (this.bbox.ll.y = o.bbox.ll.y), o.bbox.ur.x > this.bbox.ur.x && (this.bbox.ur.x = o.bbox.ur.x), o.bbox.ur.y > this.bbox.ur.y && (this.bbox.ur.y = o.bbox.ur.y), this.polys.push(o)
                }
                this.isSubject = n
            }

            return Eu(t, [{
                key: "getSweepEvents", value: function () {
                    for (var t = [], e = 0, n = this.polys.length; e < n; e++) for (var r = this.polys[e].getSweepEvents(), i = 0, o = r.length; i < o; i++) t.push(r[i]);
                    return t
                }
            }]), t
        }(), Uu = function () {
            function t(e) {
                mu(this, t), this.events = e;
                for (var n = 0, r = e.length; n < r; n++) e[n].segment.ringOut = this;
                this.poly = null
            }

            return Eu(t, null, [{
                key: "factory", value: function (e) {
                    for (var n = [], r = 0, i = e.length; r < i; r++) {
                        var o = e[r];
                        if (o.isInResult() && !o.ringOut) {
                            for (var s = null, a = o.leftSE, u = o.rightSE, l = [a], c = a.point, h = []; s = a, a = u, l.push(a), a.point !== c;) for (; ;) {
                                var p = a.getAvailableLinkedEvents();
                                if (0 === p.length) {
                                    var f = l[0].point, g = l[l.length - 1].point;
                                    throw new Error("Unable to complete output ring starting at [".concat(f.x, ",") + " ".concat(f.y, "]. Last matching segment found ends at") + " [".concat(g.x, ", ").concat(g.y, "]."))
                                }
                                if (1 === p.length) {
                                    u = p[0].otherSE;
                                    break
                                }
                                for (var d = null, y = 0, v = h.length; y < v; y++) if (h[y].point === a.point) {
                                    d = y;
                                    break
                                }
                                if (null === d) {
                                    h.push({index: l.length, point: a.point});
                                    var _ = a.getLeftmostComparator(s);
                                    u = p.sort(_)[0].otherSE;
                                    break
                                }
                                var m = h.splice(d)[0], x = l.splice(m.index);
                                x.unshift(x[0].otherSE), n.push(new t(x.reverse()))
                            }
                            n.push(new t(l))
                        }
                    }
                    return n
                }
            }]), Eu(t, [{
                key: "getGeom", value: function () {
                    for (var t = this.events[0].point, e = [t], n = 1, r = this.events.length - 1; n < r; n++) {
                        var i = this.events[n].point, o = this.events[n + 1].point;
                        0 !== Ru(i, t, o) && (e.push(i), t = i)
                    }
                    if (1 === e.length) return null;
                    var s = e[0], a = e[1];
                    0 === Ru(s, t, a) && e.shift(), e.push(e[0]);
                    for (var u = this.isExteriorRing() ? 1 : -1, l = this.isExteriorRing() ? 0 : e.length - 1, c = this.isExteriorRing() ? e.length : -1, h = [], p = l; p != c; p += u) h.push([e[p].x, e[p].y]);
                    return h
                }
            }, {
                key: "isExteriorRing", value: function () {
                    if (void 0 === this._isExteriorRing) {
                        var t = this.enclosingRing();
                        this._isExteriorRing = !t || !t.isExteriorRing()
                    }
                    return this._isExteriorRing
                }
            }, {
                key: "enclosingRing", value: function () {
                    return void 0 === this._enclosingRing && (this._enclosingRing = this._calcEnclosingRing()), this._enclosingRing
                }
            }, {
                key: "_calcEnclosingRing", value: function () {
                    for (var t = this.events[0], e = 1, n = this.events.length; e < n; e++) {
                        var r = this.events[e];
                        ku.compare(t, r) > 0 && (t = r)
                    }
                    for (var i = t.segment.prevInResult(), o = i ? i.prevInResult() : null; ;) {
                        if (!i) return null;
                        if (!o) return i.ringOut;
                        if (o.ringOut !== i.ringOut) return o.ringOut.enclosingRing() !== i.ringOut ? i.ringOut : i.ringOut.enclosingRing();
                        i = o.prevInResult(), o = i ? i.prevInResult() : null
                    }
                }
            }]), t
        }(), Vu = function () {
            function t(e) {
                mu(this, t), this.exteriorRing = e, e.poly = this, this.interiorRings = []
            }

            return Eu(t, [{
                key: "addInterior", value: function (t) {
                    this.interiorRings.push(t), t.poly = this
                }
            }, {
                key: "getGeom", value: function () {
                    var t = [this.exteriorRing.getGeom()];
                    if (null === t[0]) return null;
                    for (var e = 0, n = this.interiorRings.length; e < n; e++) {
                        var r = this.interiorRings[e].getGeom();
                        null !== r && t.push(r)
                    }
                    return t
                }
            }]), t
        }(), Xu = function () {
            function t(e) {
                mu(this, t), this.rings = e, this.polys = this._composePolys(e)
            }

            return Eu(t, [{
                key: "getGeom", value: function () {
                    for (var t = [], e = 0, n = this.polys.length; e < n; e++) {
                        var r = this.polys[e].getGeom();
                        null !== r && t.push(r)
                    }
                    return t
                }
            }, {
                key: "_composePolys", value: function (t) {
                    for (var e = [], n = 0, r = t.length; n < r; n++) {
                        var i = t[n];
                        if (!i.poly) if (i.isExteriorRing()) e.push(new Vu(i)); else {
                            var o = i.enclosingRing();
                            o.poly || e.push(new Vu(o)), o.poly.addInterior(i)
                        }
                    }
                    return e
                }
            }]), t
        }(), Yu = function () {
            function t(e) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : qu.compare;
                mu(this, t), this.queue = e, this.tree = new du(n), this.segments = []
            }

            return Eu(t, [{
                key: "process", value: function (t) {
                    var e = t.segment, n = [];
                    if (t.consumedBy) return t.isLeft ? this.queue.remove(t.otherSE) : this.tree.remove(e), n;
                    var r = t.isLeft ? this.tree.insert(e) : this.tree.find(e);
                    if (!r) throw new Error("Unable to find segment #".concat(e.id, " ") + "[".concat(e.leftSE.point.x, ", ").concat(e.leftSE.point.y, "] -> ") + "[".concat(e.rightSE.point.x, ", ").concat(e.rightSE.point.y, "] ") + "in SweepLine tree. Please submit a bug report.");
                    for (var i = r, o = r, s = void 0, a = void 0; void 0 === s;) null === (i = this.tree.prev(i)) ? s = null : void 0 === i.key.consumedBy && (s = i.key);
                    for (; void 0 === a;) null === (o = this.tree.next(o)) ? a = null : void 0 === o.key.consumedBy && (a = o.key);
                    if (t.isLeft) {
                        var u = null;
                        if (s) {
                            var l = s.getIntersection(e);
                            if (null !== l && (e.isAnEndpoint(l) || (u = l), !s.isAnEndpoint(l))) for (var c = this._splitSafely(s, l), h = 0, p = c.length; h < p; h++) n.push(c[h])
                        }
                        var f = null;
                        if (a) {
                            var g = a.getIntersection(e);
                            if (null !== g && (e.isAnEndpoint(g) || (f = g), !a.isAnEndpoint(g))) for (var d = this._splitSafely(a, g), y = 0, v = d.length; y < v; y++) n.push(d[y])
                        }
                        if (null !== u || null !== f) {
                            var _ = null;
                            if (null === u) _ = f; else if (null === f) _ = u; else {
                                _ = ku.comparePoints(u, f) <= 0 ? u : f
                            }
                            this.queue.remove(e.rightSE), n.push(e.rightSE);
                            for (var m = e.split(_), x = 0, E = m.length; x < E; x++) n.push(m[x])
                        }
                        n.length > 0 ? (this.tree.remove(e), n.push(t)) : (this.segments.push(e), e.prev = s)
                    } else {
                        if (s && a) {
                            var b = s.getIntersection(a);
                            if (null !== b) {
                                if (!s.isAnEndpoint(b)) for (var w = this._splitSafely(s, b), I = 0, N = w.length; I < N; I++) n.push(w[I]);
                                if (!a.isAnEndpoint(b)) for (var S = this._splitSafely(a, b), C = 0, P = S.length; C < P; C++) n.push(S[C])
                            }
                        }
                        this.tree.remove(e)
                    }
                    return n
                }
            }, {
                key: "_splitSafely", value: function (t, e) {
                    this.tree.remove(t);
                    var n = t.rightSE;
                    this.queue.remove(n);
                    var r = t.split(e);
                    return r.push(n), void 0 === t.consumedBy && this.tree.insert(t), r
                }
            }]), t
        }(), Hu = "undefined" != typeof process && process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE || 1e6,
        Wu = "undefined" != typeof process && process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS || 1e6,
        Ju = new (function () {
            function t() {
                mu(this, t)
            }

            return Eu(t, [{
                key: "run", value: function (t, e, n) {
                    Ju.type = t, Lu.reset();
                    for (var r = [new ju(e, !0)], i = 0, o = n.length; i < o; i++) r.push(new ju(n[i], !1));
                    if (Ju.numMultiPolys = r.length, "difference" === Ju.type) for (var s = r[0], a = 1; a < r.length;) null !== wu(r[a].bbox, s.bbox) ? a++ : r.splice(a, 1);
                    if ("intersection" === Ju.type) for (var u = 0, l = r.length; u < l; u++) for (var c = r[u], h = u + 1, p = r.length; h < p; h++) if (null === wu(c.bbox, r[h].bbox)) return [];
                    for (var f = new du(ku.compare), g = 0, d = r.length; g < d; g++) for (var y = r[g].getSweepEvents(), v = 0, _ = y.length; v < _; v++) if (f.insert(y[v]), f.size > Hu) throw new Error("Infinite loop when putting segment endpoints in a priority queue (queue size too big). Please file a bug report.");
                    for (var m = new Yu(f), x = f.size, E = f.pop(); E;) {
                        var b = E.key;
                        if (f.size === x) {
                            var w = b.segment;
                            throw new Error("Unable to pop() ".concat(b.isLeft ? "left" : "right", " SweepEvent ") + "[".concat(b.point.x, ", ").concat(b.point.y, "] from segment #").concat(w.id, " ") + "[".concat(w.leftSE.point.x, ", ").concat(w.leftSE.point.y, "] -> ") + "[".concat(w.rightSE.point.x, ", ").concat(w.rightSE.point.y, "] from queue. ") + "Please file a bug report.")
                        }
                        if (f.size > Hu) throw new Error("Infinite loop when passing sweep line over endpoints (queue size too big). Please file a bug report.");
                        if (m.segments.length > Wu) throw new Error("Infinite loop when passing sweep line over endpoints (too many sweep line segments). Please file a bug report.");
                        for (var I = m.process(b), N = 0, S = I.length; N < S; N++) {
                            var C = I[N];
                            void 0 === C.consumedBy && f.insert(C)
                        }
                        x = f.size, E = f.pop()
                    }
                    Lu.reset();
                    var P = Uu.factory(m.segments);
                    return new Xu(P).getGeom()
                }
            }]), t
        }()), Zu = function (t) {
            for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
            return Ju.run("union", t, n)
        }, Ku = function (t) {
            for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
            return Ju.run("intersection", t, n)
        }, Qu = function (t) {
            for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
            return Ju.run("difference", t, n)
        };
    "fill" in Array.prototype || Object.defineProperty(Array.prototype, "fill", {
        configurable: !0, value: function (t) {
            if (null == this) throw new TypeError(this + " is not an object");
            var e = Object(this), n = Math.max(Math.min(e.length, 9007199254740991), 0) || 0,
                r = 1 in arguments && parseInt(Number(arguments[1]), 10) || 0;
            r = r < 0 ? Math.max(n + r, 0) : Math.min(r, n);
            var i = 2 in arguments && void 0 !== arguments[2] ? parseInt(Number(arguments[2]), 10) || 0 : n;
            for (i = i < 0 ? Math.max(n + arguments[2], 0) : Math.min(i, n); r < i;) e[r] = t, ++r;
            return e
        }, writable: !0
    }), Number.isFinite = Number.isFinite || function (t) {
        return "number" == typeof t && isFinite(t)
    }, Number.isInteger = Number.isInteger || function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    }, Number.parseFloat = Number.parseFloat || parseFloat, Number.isNaN = Number.isNaN || function (t) {
        return t != t
    }, Math.trunc = Math.trunc || function (t) {
        return t < 0 ? Math.ceil(t) : Math.floor(t)
    };
    var $u = function () {
    };
    $u.prototype.interfaces_ = function () {
        return []
    }, $u.prototype.getClass = function () {
        return $u
    }, $u.prototype.equalsWithTolerance = function (t, e, n) {
        return Math.abs(t - e) <= n
    };
    var tl = function (t) {
        function e(e) {
            t.call(this, e), this.name = "IllegalArgumentException", this.message = e, this.stack = (new t).stack
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
    }(Error), el = function () {
    }, nl = {MAX_VALUE: {configurable: !0}};
    el.isNaN = function (t) {
        return Number.isNaN(t)
    }, el.doubleToLongBits = function (t) {
        return t
    }, el.longBitsToDouble = function (t) {
        return t
    }, el.isInfinite = function (t) {
        return !Number.isFinite(t)
    }, nl.MAX_VALUE.get = function () {
        return Number.MAX_VALUE
    }, Object.defineProperties(el, nl);
    var rl = function () {
    }, il = function () {
    }, ol = function () {
    };

    function sl() {
    }

    var al = function t() {
        if (this.x = null, this.y = null, this.z = null, 0 === arguments.length) this.x = 0, this.y = 0, this.z = t.NULL_ORDINATE; else if (1 === arguments.length) {
            var e = arguments[0];
            this.x = e.x, this.y = e.y, this.z = e.z
        } else 2 === arguments.length ? (this.x = arguments[0], this.y = arguments[1], this.z = t.NULL_ORDINATE) : 3 === arguments.length && (this.x = arguments[0], this.y = arguments[1], this.z = arguments[2])
    }, ul = {
        DimensionalComparator: {configurable: !0},
        serialVersionUID: {configurable: !0},
        NULL_ORDINATE: {configurable: !0},
        X: {configurable: !0},
        Y: {configurable: !0},
        Z: {configurable: !0}
    };
    al.prototype.setOrdinate = function (t, e) {
        switch (t) {
            case al.X:
                this.x = e;
                break;
            case al.Y:
                this.y = e;
                break;
            case al.Z:
                this.z = e;
                break;
            default:
                throw new tl("Invalid ordinate index: " + t)
        }
    }, al.prototype.equals2D = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return this.x === t.x && this.y === t.y
        }
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            return !!$u.equalsWithTolerance(this.x, e.x, n) && !!$u.equalsWithTolerance(this.y, e.y, n)
        }
    }, al.prototype.getOrdinate = function (t) {
        switch (t) {
            case al.X:
                return this.x;
            case al.Y:
                return this.y;
            case al.Z:
                return this.z
        }
        throw new tl("Invalid ordinate index: " + t)
    }, al.prototype.equals3D = function (t) {
        return this.x === t.x && this.y === t.y && (this.z === t.z || el.isNaN(this.z)) && el.isNaN(t.z)
    }, al.prototype.equals = function (t) {
        return t instanceof al && this.equals2D(t)
    }, al.prototype.equalInZ = function (t, e) {
        return $u.equalsWithTolerance(this.z, t.z, e)
    }, al.prototype.compareTo = function (t) {
        var e = t;
        return this.x < e.x ? -1 : this.x > e.x ? 1 : this.y < e.y ? -1 : this.y > e.y ? 1 : 0
    }, al.prototype.clone = function () {
    }, al.prototype.copy = function () {
        return new al(this)
    }, al.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ", " + this.z + ")"
    }, al.prototype.distance3D = function (t) {
        var e = this.x - t.x, n = this.y - t.y, r = this.z - t.z;
        return Math.sqrt(e * e + n * n + r * r)
    }, al.prototype.distance = function (t) {
        var e = this.x - t.x, n = this.y - t.y;
        return Math.sqrt(e * e + n * n)
    }, al.prototype.hashCode = function () {
        var t = 17;
        return t = 37 * (t = 37 * t + al.hashCode(this.x)) + al.hashCode(this.y)
    }, al.prototype.setCoordinate = function (t) {
        this.x = t.x, this.y = t.y, this.z = t.z
    }, al.prototype.interfaces_ = function () {
        return [rl, il, sl]
    }, al.prototype.getClass = function () {
        return al
    }, al.hashCode = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = el.doubleToLongBits(t);
            return Math.trunc((e ^ e) >>> 32)
        }
    }, ul.DimensionalComparator.get = function () {
        return ll
    }, ul.serialVersionUID.get = function () {
        return 0x5cbf2c235c7e5800
    }, ul.NULL_ORDINATE.get = function () {
        return el.NaN
    }, ul.X.get = function () {
        return 0
    }, ul.Y.get = function () {
        return 1
    }, ul.Z.get = function () {
        return 2
    }, Object.defineProperties(al, ul);
    var ll = function (t) {
        if (this._dimensionsToTest = 2, 0 === arguments.length) ; else if (1 === arguments.length) {
            var e = arguments[0];
            if (2 !== e && 3 !== e) throw new tl("only 2 or 3 dimensions may be specified");
            this._dimensionsToTest = e
        }
    };
    ll.prototype.compare = function (t, e) {
        var n = t, r = e, i = ll.compare(n.x, r.x);
        if (0 !== i) return i;
        var o = ll.compare(n.y, r.y);
        return 0 !== o ? o : this._dimensionsToTest <= 2 ? 0 : ll.compare(n.z, r.z)
    }, ll.prototype.interfaces_ = function () {
        return [ol]
    }, ll.prototype.getClass = function () {
        return ll
    }, ll.compare = function (t, e) {
        return t < e ? -1 : t > e ? 1 : el.isNaN(t) ? el.isNaN(e) ? 0 : -1 : el.isNaN(e) ? 1 : 0
    };
    var cl = function () {
    };
    cl.prototype.create = function () {
    }, cl.prototype.interfaces_ = function () {
        return []
    }, cl.prototype.getClass = function () {
        return cl
    };
    var hl = function () {
    }, pl = {
        INTERIOR: {configurable: !0},
        BOUNDARY: {configurable: !0},
        EXTERIOR: {configurable: !0},
        NONE: {configurable: !0}
    };
    hl.prototype.interfaces_ = function () {
        return []
    }, hl.prototype.getClass = function () {
        return hl
    }, hl.toLocationSymbol = function (t) {
        switch (t) {
            case hl.EXTERIOR:
                return "e";
            case hl.BOUNDARY:
                return "b";
            case hl.INTERIOR:
                return "i";
            case hl.NONE:
                return "-"
        }
        throw new tl("Unknown location value: " + t)
    }, pl.INTERIOR.get = function () {
        return 0
    }, pl.BOUNDARY.get = function () {
        return 1
    }, pl.EXTERIOR.get = function () {
        return 2
    }, pl.NONE.get = function () {
        return -1
    }, Object.defineProperties(hl, pl);
    var fl = function (t, e) {
        return t.interfaces_ && t.interfaces_().indexOf(e) > -1
    }, gl = function () {
    }, dl = {LOG_10: {configurable: !0}};
    gl.prototype.interfaces_ = function () {
        return []
    }, gl.prototype.getClass = function () {
        return gl
    }, gl.log10 = function (t) {
        var e = Math.log(t);
        return el.isInfinite(e) || el.isNaN(e) ? e : e / gl.LOG_10
    }, gl.min = function (t, e, n, r) {
        var i = t;
        return e < i && (i = e), n < i && (i = n), r < i && (i = r), i
    }, gl.clamp = function () {
        if ("number" == typeof arguments[2] && "number" == typeof arguments[0] && "number" == typeof arguments[1]) {
            var t = arguments[0], e = arguments[1], n = arguments[2];
            return t < e ? e : t > n ? n : t
        }
        if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
            var r = arguments[0], i = arguments[1], o = arguments[2];
            return r < i ? i : r > o ? o : r
        }
    }, gl.wrap = function (t, e) {
        return t < 0 ? e - -t % e : t % e
    }, gl.max = function () {
        if (3 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = arguments[2], r = t;
            return e > r && (r = e), n > r && (r = n), r
        }
        if (4 === arguments.length) {
            var i = arguments[0], o = arguments[1], s = arguments[2], a = arguments[3], u = i;
            return o > u && (u = o), s > u && (u = s), a > u && (u = a), u
        }
    }, gl.average = function (t, e) {
        return (t + e) / 2
    }, dl.LOG_10.get = function () {
        return Math.log(10)
    }, Object.defineProperties(gl, dl);
    var yl = function (t) {
        this.str = t
    };
    yl.prototype.append = function (t) {
        this.str += t
    }, yl.prototype.setCharAt = function (t, e) {
        this.str = this.str.substr(0, t) + e + this.str.substr(t + 1)
    }, yl.prototype.toString = function (t) {
        return this.str
    };
    var vl = function (t) {
        this.value = t
    };
    vl.prototype.intValue = function () {
        return this.value
    }, vl.prototype.compareTo = function (t) {
        return this.value < t ? -1 : this.value > t ? 1 : 0
    }, vl.isNaN = function (t) {
        return Number.isNaN(t)
    };
    var _l = function () {
    };
    _l.isWhitespace = function (t) {
        return t <= 32 && t >= 0 || 127 === t
    }, _l.toUpperCase = function (t) {
        return t.toUpperCase()
    };
    var ml = function t() {
        if (this._hi = 0, this._lo = 0, 0 === arguments.length) this.init(0); else if (1 === arguments.length) {
            if ("number" == typeof arguments[0]) {
                var e = arguments[0];
                this.init(e)
            } else if (arguments[0] instanceof t) {
                var n = arguments[0];
                this.init(n)
            } else if ("string" == typeof arguments[0]) {
                var r = arguments[0];
                t.call(this, t.parse(r))
            }
        } else if (2 === arguments.length) {
            var i = arguments[0], o = arguments[1];
            this.init(i, o)
        }
    }, xl = {
        PI: {configurable: !0},
        TWO_PI: {configurable: !0},
        PI_2: {configurable: !0},
        E: {configurable: !0},
        NaN: {configurable: !0},
        EPS: {configurable: !0},
        SPLIT: {configurable: !0},
        MAX_PRINT_DIGITS: {configurable: !0},
        TEN: {configurable: !0},
        ONE: {configurable: !0},
        SCI_NOT_EXPONENT_CHAR: {configurable: !0},
        SCI_NOT_ZERO: {configurable: !0}
    };
    ml.prototype.le = function (t) {
        return (this._hi < t._hi || this._hi === t._hi) && this._lo <= t._lo
    }, ml.prototype.extractSignificantDigits = function (t, e) {
        var n = this.abs(), r = ml.magnitude(n._hi), i = ml.TEN.pow(r);
        (n = n.divide(i)).gt(ml.TEN) ? (n = n.divide(ml.TEN), r += 1) : n.lt(ml.ONE) && (n = n.multiply(ml.TEN), r -= 1);
        for (var o = r + 1, s = new yl, a = ml.MAX_PRINT_DIGITS - 1, u = 0; u <= a; u++) {
            t && u === o && s.append(".");
            var l = Math.trunc(n._hi);
            if (l < 0) break;
            var c = !1, h = 0;
            l > 9 ? (c = !0, h = "9") : h = "0" + l, s.append(h), n = n.subtract(ml.valueOf(l)).multiply(ml.TEN), c && n.selfAdd(ml.TEN);
            var p = !0, f = ml.magnitude(n._hi);
            if (f < 0 && Math.abs(f) >= a - u && (p = !1), !p) break
        }
        return e[0] = r, s.toString()
    }, ml.prototype.sqr = function () {
        return this.multiply(this)
    }, ml.prototype.doubleValue = function () {
        return this._hi + this._lo
    }, ml.prototype.subtract = function () {
        if (arguments[0] instanceof ml) {
            var t = arguments[0];
            return this.add(t.negate())
        }
        if ("number" == typeof arguments[0]) {
            var e = arguments[0];
            return this.add(-e)
        }
    }, ml.prototype.equals = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return this._hi === t._hi && this._lo === t._lo
        }
    }, ml.prototype.isZero = function () {
        return 0 === this._hi && 0 === this._lo
    }, ml.prototype.selfSubtract = function () {
        if (arguments[0] instanceof ml) {
            var t = arguments[0];
            return this.isNaN() ? this : this.selfAdd(-t._hi, -t._lo)
        }
        if ("number" == typeof arguments[0]) {
            var e = arguments[0];
            return this.isNaN() ? this : this.selfAdd(-e, 0)
        }
    }, ml.prototype.getSpecialNumberString = function () {
        return this.isZero() ? "0.0" : this.isNaN() ? "NaN " : null
    }, ml.prototype.min = function (t) {
        return this.le(t) ? this : t
    }, ml.prototype.selfDivide = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof ml) {
                var t = arguments[0];
                return this.selfDivide(t._hi, t._lo)
            }
            if ("number" == typeof arguments[0]) {
                var e = arguments[0];
                return this.selfDivide(e, 0)
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = null, o = null, s = null, a = null, u = null, l = null,
                c = null, h = null;
            return u = this._hi / n, h = (i = (l = ml.SPLIT * u) - (i = l - u)) * (s = (h = ml.SPLIT * n) - (s = h - n)) - (c = u * n) + i * (a = n - s) + (o = u - i) * s + o * a, h = u + (l = (this._hi - c - h + this._lo - u * r) / n), this._hi = h, this._lo = u - h + l, this
        }
    }, ml.prototype.dump = function () {
        return "DD<" + this._hi + ", " + this._lo + ">"
    }, ml.prototype.divide = function () {
        if (arguments[0] instanceof ml) {
            var t = arguments[0], e = null, n = null, r = null, i = null, o = null, s = null, a = null, u = null;
            n = (o = this._hi / t._hi) - (e = (s = ml.SPLIT * o) - (e = s - o)), u = e * (r = (u = ml.SPLIT * t._hi) - (r = u - t._hi)) - (a = o * t._hi) + e * (i = t._hi - r) + n * r + n * i;
            var l = u = o + (s = (this._hi - a - u + this._lo - o * t._lo) / t._hi), c = o - u + s;
            return new ml(l, c)
        }
        if ("number" == typeof arguments[0]) {
            var h = arguments[0];
            return el.isNaN(h) ? ml.createNaN() : ml.copy(this).selfDivide(h, 0)
        }
    }, ml.prototype.ge = function (t) {
        return (this._hi > t._hi || this._hi === t._hi) && this._lo >= t._lo
    }, ml.prototype.pow = function (t) {
        if (0 === t) return ml.valueOf(1);
        var e = new ml(this), n = ml.valueOf(1), r = Math.abs(t);
        if (r > 1) for (; r > 0;) r % 2 == 1 && n.selfMultiply(e), (r /= 2) > 0 && (e = e.sqr()); else n = e;
        return t < 0 ? n.reciprocal() : n
    }, ml.prototype.ceil = function () {
        if (this.isNaN()) return ml.NaN;
        var t = Math.ceil(this._hi), e = 0;
        return t === this._hi && (e = Math.ceil(this._lo)), new ml(t, e)
    }, ml.prototype.compareTo = function (t) {
        var e = t;
        return this._hi < e._hi ? -1 : this._hi > e._hi ? 1 : this._lo < e._lo ? -1 : this._lo > e._lo ? 1 : 0
    }, ml.prototype.rint = function () {
        return this.isNaN() ? this : this.add(.5).floor()
    }, ml.prototype.setValue = function () {
        if (arguments[0] instanceof ml) {
            var t = arguments[0];
            return this.init(t), this
        }
        if ("number" == typeof arguments[0]) {
            var e = arguments[0];
            return this.init(e), this
        }
    }, ml.prototype.max = function (t) {
        return this.ge(t) ? this : t
    }, ml.prototype.sqrt = function () {
        if (this.isZero()) return ml.valueOf(0);
        if (this.isNegative()) return ml.NaN;
        var t = 1 / Math.sqrt(this._hi), e = this._hi * t, n = ml.valueOf(e), r = this.subtract(n.sqr())._hi * (.5 * t);
        return n.add(r)
    }, ml.prototype.selfAdd = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof ml) {
                var t = arguments[0];
                return this.selfAdd(t._hi, t._lo)
            }
            if ("number" == typeof arguments[0]) {
                var e = arguments[0], n = null, r = null, i = null, o = null, s = null, a = null;
                return o = (i = this._hi + e) - (s = i - this._hi), r = (a = (o = e - s + (this._hi - o)) + this._lo) + (i - (n = i + a)), this._hi = n + r, this._lo = r + (n - this._hi), this
            }
        } else if (2 === arguments.length) {
            var u = arguments[0], l = arguments[1], c = null, h = null, p = null, f = null, g = null, d = null,
                y = null;
            f = this._hi + u, h = this._lo + l, g = f - (d = f - this._hi), p = h - (y = h - this._lo);
            var v = (c = f + (d = (g = u - d + (this._hi - g)) + h)) + (d = (p = l - y + (this._lo - p)) + (d + (f - c))),
                _ = d + (c - v);
            return this._hi = v, this._lo = _, this
        }
    }, ml.prototype.selfMultiply = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof ml) {
                var t = arguments[0];
                return this.selfMultiply(t._hi, t._lo)
            }
            if ("number" == typeof arguments[0]) {
                var e = arguments[0];
                return this.selfMultiply(e, 0)
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = null, o = null, s = null, a = null, u = null, l = null;
            i = (u = ml.SPLIT * this._hi) - this._hi, l = ml.SPLIT * n, i = u - i, o = this._hi - i, s = l - n;
            var c = (u = this._hi * n) + (l = i * (s = l - s) - u + i * (a = n - s) + o * s + o * a + (this._hi * r + this._lo * n)),
                h = l + (i = u - c);
            return this._hi = c, this._lo = h, this
        }
    }, ml.prototype.selfSqr = function () {
        return this.selfMultiply(this)
    }, ml.prototype.floor = function () {
        if (this.isNaN()) return ml.NaN;
        var t = Math.floor(this._hi), e = 0;
        return t === this._hi && (e = Math.floor(this._lo)), new ml(t, e)
    }, ml.prototype.negate = function () {
        return this.isNaN() ? this : new ml(-this._hi, -this._lo)
    }, ml.prototype.clone = function () {
    }, ml.prototype.multiply = function () {
        if (arguments[0] instanceof ml) {
            var t = arguments[0];
            return t.isNaN() ? ml.createNaN() : ml.copy(this).selfMultiply(t)
        }
        if ("number" == typeof arguments[0]) {
            var e = arguments[0];
            return el.isNaN(e) ? ml.createNaN() : ml.copy(this).selfMultiply(e, 0)
        }
    }, ml.prototype.isNaN = function () {
        return el.isNaN(this._hi)
    }, ml.prototype.intValue = function () {
        return Math.trunc(this._hi)
    }, ml.prototype.toString = function () {
        var t = ml.magnitude(this._hi);
        return t >= -3 && t <= 20 ? this.toStandardNotation() : this.toSciNotation()
    }, ml.prototype.toStandardNotation = function () {
        var t = this.getSpecialNumberString();
        if (null !== t) return t;
        var e = new Array(1).fill(null), n = this.extractSignificantDigits(!0, e), r = e[0] + 1, i = n;
        if ("." === n.charAt(0)) i = "0" + n; else if (r < 0) i = "0." + ml.stringOfChar("0", -r) + n; else if (-1 === n.indexOf(".")) {
            var o = r - n.length;
            i = n + ml.stringOfChar("0", o) + ".0"
        }
        return this.isNegative() ? "-" + i : i
    }, ml.prototype.reciprocal = function () {
        var t, e, n, r, i = null, o = null, s = null, a = null;
        t = (n = 1 / this._hi) - (i = (s = ml.SPLIT * n) - (i = s - n)), o = (a = ml.SPLIT * this._hi) - this._hi;
        var u = n + (s = (1 - (r = n * this._hi) - (a = i * (o = a - o) - r + i * (e = this._hi - o) + t * o + t * e) - n * this._lo) / this._hi);
        return new ml(u, n - u + s)
    }, ml.prototype.toSciNotation = function () {
        if (this.isZero()) return ml.SCI_NOT_ZERO;
        var t = this.getSpecialNumberString();
        if (null !== t) return t;
        var e = new Array(1).fill(null), n = this.extractSignificantDigits(!1, e), r = ml.SCI_NOT_EXPONENT_CHAR + e[0];
        if ("0" === n.charAt(0)) throw new Error("Found leading zero: " + n);
        var i = "";
        n.length > 1 && (i = n.substring(1));
        var o = n.charAt(0) + "." + i;
        return this.isNegative() ? "-" + o + r : o + r
    }, ml.prototype.abs = function () {
        return this.isNaN() ? ml.NaN : this.isNegative() ? this.negate() : new ml(this)
    }, ml.prototype.isPositive = function () {
        return (this._hi > 0 || 0 === this._hi) && this._lo > 0
    }, ml.prototype.lt = function (t) {
        return (this._hi < t._hi || this._hi === t._hi) && this._lo < t._lo
    }, ml.prototype.add = function () {
        if (arguments[0] instanceof ml) {
            var t = arguments[0];
            return ml.copy(this).selfAdd(t)
        }
        if ("number" == typeof arguments[0]) {
            var e = arguments[0];
            return ml.copy(this).selfAdd(e)
        }
    }, ml.prototype.init = function () {
        if (1 === arguments.length) {
            if ("number" == typeof arguments[0]) {
                var t = arguments[0];
                this._hi = t, this._lo = 0
            } else if (arguments[0] instanceof ml) {
                var e = arguments[0];
                this._hi = e._hi, this._lo = e._lo
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            this._hi = n, this._lo = r
        }
    }, ml.prototype.gt = function (t) {
        return (this._hi > t._hi || this._hi === t._hi) && this._lo > t._lo
    }, ml.prototype.isNegative = function () {
        return (this._hi < 0 || 0 === this._hi) && this._lo < 0
    }, ml.prototype.trunc = function () {
        return this.isNaN() ? ml.NaN : this.isPositive() ? this.floor() : this.ceil()
    }, ml.prototype.signum = function () {
        return this._hi > 0 ? 1 : this._hi < 0 ? -1 : this._lo > 0 ? 1 : this._lo < 0 ? -1 : 0
    }, ml.prototype.interfaces_ = function () {
        return [sl, rl, il]
    }, ml.prototype.getClass = function () {
        return ml
    }, ml.sqr = function (t) {
        return ml.valueOf(t).selfMultiply(t)
    }, ml.valueOf = function () {
        if ("string" == typeof arguments[0]) {
            var t = arguments[0];
            return ml.parse(t)
        }
        if ("number" == typeof arguments[0]) {
            var e = arguments[0];
            return new ml(e)
        }
    }, ml.sqrt = function (t) {
        return ml.valueOf(t).sqrt()
    }, ml.parse = function (t) {
        for (var e = 0, n = t.length; _l.isWhitespace(t.charAt(e));) e++;
        var r = !1;
        if (e < n) {
            var i = t.charAt(e);
            "-" !== i && "+" !== i || (e++, "-" === i && (r = !0))
        }
        for (var o = new ml, s = 0, a = 0, u = 0; !(e >= n);) {
            var l = t.charAt(e);
            if (e++, _l.isDigit(l)) {
                var c = l - "0";
                o.selfMultiply(ml.TEN), o.selfAdd(c), s++
            } else {
                if ("." !== l) {
                    if ("e" === l || "E" === l) {
                        var h = t.substring(e);
                        try {
                            u = vl.parseInt(h)
                        } catch (e) {
                            throw e instanceof Error ? new Error("Invalid exponent " + h + " in string " + t) : e
                        }
                        break
                    }
                    throw new Error("Unexpected character '" + l + "' at position " + e + " in string " + t)
                }
                a = s
            }
        }
        var p = o, f = s - a - u;
        if (0 === f) p = o; else if (f > 0) {
            var g = ml.TEN.pow(f);
            p = o.divide(g)
        } else if (f < 0) {
            var d = ml.TEN.pow(-f);
            p = o.multiply(d)
        }
        return r ? p.negate() : p
    }, ml.createNaN = function () {
        return new ml(el.NaN, el.NaN)
    }, ml.copy = function (t) {
        return new ml(t)
    }, ml.magnitude = function (t) {
        var e = Math.abs(t), n = Math.log(e) / Math.log(10), r = Math.trunc(Math.floor(n));
        return 10 * Math.pow(10, r) <= e && (r += 1), r
    }, ml.stringOfChar = function (t, e) {
        for (var n = new yl, r = 0; r < e; r++) n.append(t);
        return n.toString()
    }, xl.PI.get = function () {
        return new ml(3.141592653589793, 12246467991473532e-32)
    }, xl.TWO_PI.get = function () {
        return new ml(6.283185307179586, 24492935982947064e-32)
    }, xl.PI_2.get = function () {
        return new ml(1.5707963267948966, 6123233995736766e-32)
    }, xl.E.get = function () {
        return new ml(2.718281828459045, 14456468917292502e-32)
    }, xl.NaN.get = function () {
        return new ml(el.NaN, el.NaN)
    }, xl.EPS.get = function () {
        return 123259516440783e-46
    }, xl.SPLIT.get = function () {
        return 134217729
    }, xl.MAX_PRINT_DIGITS.get = function () {
        return 32
    }, xl.TEN.get = function () {
        return ml.valueOf(10)
    }, xl.ONE.get = function () {
        return ml.valueOf(1)
    }, xl.SCI_NOT_EXPONENT_CHAR.get = function () {
        return "E"
    }, xl.SCI_NOT_ZERO.get = function () {
        return "0.0E0"
    }, Object.defineProperties(ml, xl);
    var El = function () {
    }, bl = {DP_SAFE_EPSILON: {configurable: !0}};
    El.prototype.interfaces_ = function () {
        return []
    }, El.prototype.getClass = function () {
        return El
    }, El.orientationIndex = function (t, e, n) {
        var r = El.orientationIndexFilter(t, e, n);
        if (r <= 1) return r;
        var i = ml.valueOf(e.x).selfAdd(-t.x), o = ml.valueOf(e.y).selfAdd(-t.y), s = ml.valueOf(n.x).selfAdd(-e.x),
            a = ml.valueOf(n.y).selfAdd(-e.y);
        return i.selfMultiply(a).selfSubtract(o.selfMultiply(s)).signum()
    }, El.signOfDet2x2 = function (t, e, n, r) {
        return t.multiply(r).selfSubtract(e.multiply(n)).signum()
    }, El.intersection = function (t, e, n, r) {
        var i = ml.valueOf(r.y).selfSubtract(n.y).selfMultiply(ml.valueOf(e.x).selfSubtract(t.x)),
            o = ml.valueOf(r.x).selfSubtract(n.x).selfMultiply(ml.valueOf(e.y).selfSubtract(t.y)), s = i.subtract(o),
            a = ml.valueOf(r.x).selfSubtract(n.x).selfMultiply(ml.valueOf(t.y).selfSubtract(n.y)),
            u = ml.valueOf(r.y).selfSubtract(n.y).selfMultiply(ml.valueOf(t.x).selfSubtract(n.x)),
            l = a.subtract(u).selfDivide(s).doubleValue(),
            c = ml.valueOf(t.x).selfAdd(ml.valueOf(e.x).selfSubtract(t.x).selfMultiply(l)).doubleValue(),
            h = ml.valueOf(e.x).selfSubtract(t.x).selfMultiply(ml.valueOf(t.y).selfSubtract(n.y)),
            p = ml.valueOf(e.y).selfSubtract(t.y).selfMultiply(ml.valueOf(t.x).selfSubtract(n.x)),
            f = h.subtract(p).selfDivide(s).doubleValue(),
            g = ml.valueOf(n.y).selfAdd(ml.valueOf(r.y).selfSubtract(n.y).selfMultiply(f)).doubleValue();
        return new al(c, g)
    }, El.orientationIndexFilter = function (t, e, n) {
        var r = null, i = (t.x - n.x) * (e.y - n.y), o = (t.y - n.y) * (e.x - n.x), s = i - o;
        if (i > 0) {
            if (o <= 0) return El.signum(s);
            r = i + o
        } else {
            if (!(i < 0)) return El.signum(s);
            if (o >= 0) return El.signum(s);
            r = -i - o
        }
        var a = El.DP_SAFE_EPSILON * r;
        return s >= a || -s >= a ? El.signum(s) : 2
    }, El.signum = function (t) {
        return t > 0 ? 1 : t < 0 ? -1 : 0
    }, bl.DP_SAFE_EPSILON.get = function () {
        return 1e-15
    }, Object.defineProperties(El, bl);
    var wl = function () {
    }, Il = {X: {configurable: !0}, Y: {configurable: !0}, Z: {configurable: !0}, M: {configurable: !0}};
    Il.X.get = function () {
        return 0
    }, Il.Y.get = function () {
        return 1
    }, Il.Z.get = function () {
        return 2
    }, Il.M.get = function () {
        return 3
    }, wl.prototype.setOrdinate = function (t, e, n) {
    }, wl.prototype.size = function () {
    }, wl.prototype.getOrdinate = function (t, e) {
    }, wl.prototype.getCoordinate = function () {
    }, wl.prototype.getCoordinateCopy = function (t) {
    }, wl.prototype.getDimension = function () {
    }, wl.prototype.getX = function (t) {
    }, wl.prototype.clone = function () {
    }, wl.prototype.expandEnvelope = function (t) {
    }, wl.prototype.copy = function () {
    }, wl.prototype.getY = function (t) {
    }, wl.prototype.toCoordinateArray = function () {
    }, wl.prototype.interfaces_ = function () {
        return [il]
    }, wl.prototype.getClass = function () {
        return wl
    }, Object.defineProperties(wl, Il);
    var Nl = function () {
    }, Sl = function (t) {
        function e() {
            t.call(this, "Projective point not representable on the Cartesian plane.")
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Nl), Cl = function () {
    };
    Cl.arraycopy = function (t, e, n, r, i) {
        for (var o = 0, s = e; s < e + i; s++) n[r + o] = t[s], o++
    }, Cl.getProperty = function (t) {
        return {"line.separator": "\n"}[t]
    };
    var Pl = function t() {
        if (this.x = null, this.y = null, this.w = null, 0 === arguments.length) this.x = 0, this.y = 0, this.w = 1; else if (1 === arguments.length) {
            var e = arguments[0];
            this.x = e.x, this.y = e.y, this.w = 1
        } else if (2 === arguments.length) {
            if ("number" == typeof arguments[0] && "number" == typeof arguments[1]) {
                var n = arguments[0], r = arguments[1];
                this.x = n, this.y = r, this.w = 1
            } else if (arguments[0] instanceof t && arguments[1] instanceof t) {
                var i = arguments[0], o = arguments[1];
                this.x = i.y * o.w - o.y * i.w, this.y = o.x * i.w - i.x * o.w, this.w = i.x * o.y - o.x * i.y
            } else if (arguments[0] instanceof al && arguments[1] instanceof al) {
                var s = arguments[0], a = arguments[1];
                this.x = s.y - a.y, this.y = a.x - s.x, this.w = s.x * a.y - a.x * s.y
            }
        } else if (3 === arguments.length) {
            var u = arguments[0], l = arguments[1], c = arguments[2];
            this.x = u, this.y = l, this.w = c
        } else if (4 === arguments.length) {
            var h = arguments[0], p = arguments[1], f = arguments[2], g = arguments[3], d = h.y - p.y, y = p.x - h.x,
                v = h.x * p.y - p.x * h.y, _ = f.y - g.y, m = g.x - f.x, x = f.x * g.y - g.x * f.y;
            this.x = y * x - m * v, this.y = _ * v - d * x, this.w = d * m - _ * y
        }
    };
    Pl.prototype.getY = function () {
        var t = this.y / this.w;
        if (el.isNaN(t) || el.isInfinite(t)) throw new Sl;
        return t
    }, Pl.prototype.getX = function () {
        var t = this.x / this.w;
        if (el.isNaN(t) || el.isInfinite(t)) throw new Sl;
        return t
    }, Pl.prototype.getCoordinate = function () {
        var t = new al;
        return t.x = this.getX(), t.y = this.getY(), t
    }, Pl.prototype.interfaces_ = function () {
        return []
    }, Pl.prototype.getClass = function () {
        return Pl
    }, Pl.intersection = function (t, e, n, r) {
        var i = t.y - e.y, o = e.x - t.x, s = t.x * e.y - e.x * t.y, a = n.y - r.y, u = r.x - n.x,
            l = n.x * r.y - r.x * n.y, c = i * u - a * o, h = (o * l - u * s) / c, p = (a * s - i * l) / c;
        if (el.isNaN(h) || el.isInfinite(h) || el.isNaN(p) || el.isInfinite(p)) throw new Sl;
        return new al(h, p)
    };
    var Ll = function t() {
        if (this._minx = null, this._maxx = null, this._miny = null, this._maxy = null, 0 === arguments.length) this.init(); else if (1 === arguments.length) {
            if (arguments[0] instanceof al) {
                var e = arguments[0];
                this.init(e.x, e.x, e.y, e.y)
            } else if (arguments[0] instanceof t) {
                var n = arguments[0];
                this.init(n)
            }
        } else if (2 === arguments.length) {
            var r = arguments[0], i = arguments[1];
            this.init(r.x, i.x, r.y, i.y)
        } else if (4 === arguments.length) {
            var o = arguments[0], s = arguments[1], a = arguments[2], u = arguments[3];
            this.init(o, s, a, u)
        }
    }, Ml = {serialVersionUID: {configurable: !0}};
    Ll.prototype.getArea = function () {
        return this.getWidth() * this.getHeight()
    }, Ll.prototype.equals = function (t) {
        if (!(t instanceof Ll)) return !1;
        var e = t;
        return this.isNull() ? e.isNull() : this._maxx === e.getMaxX() && this._maxy === e.getMaxY() && this._minx === e.getMinX() && this._miny === e.getMinY()
    }, Ll.prototype.intersection = function (t) {
        if (this.isNull() || t.isNull() || !this.intersects(t)) return new Ll;
        var e = this._minx > t._minx ? this._minx : t._minx, n = this._miny > t._miny ? this._miny : t._miny,
            r = this._maxx < t._maxx ? this._maxx : t._maxx, i = this._maxy < t._maxy ? this._maxy : t._maxy;
        return new Ll(e, r, n, i)
    }, Ll.prototype.isNull = function () {
        return this._maxx < this._minx
    }, Ll.prototype.getMaxX = function () {
        return this._maxx
    }, Ll.prototype.covers = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof al) {
                var t = arguments[0];
                return this.covers(t.x, t.y)
            }
            if (arguments[0] instanceof Ll) {
                var e = arguments[0];
                return !this.isNull() && !e.isNull() && (e.getMinX() >= this._minx && e.getMaxX() <= this._maxx && e.getMinY() >= this._miny && e.getMaxY() <= this._maxy)
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            return !this.isNull() && (n >= this._minx && n <= this._maxx && r >= this._miny && r <= this._maxy)
        }
    }, Ll.prototype.intersects = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof Ll) {
                var t = arguments[0];
                return !this.isNull() && !t.isNull() && !(t._minx > this._maxx || t._maxx < this._minx || t._miny > this._maxy || t._maxy < this._miny)
            }
            if (arguments[0] instanceof al) {
                var e = arguments[0];
                return this.intersects(e.x, e.y)
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            return !this.isNull() && !(n > this._maxx || n < this._minx || r > this._maxy || r < this._miny)
        }
    }, Ll.prototype.getMinY = function () {
        return this._miny
    }, Ll.prototype.getMinX = function () {
        return this._minx
    }, Ll.prototype.expandToInclude = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof al) {
                var t = arguments[0];
                this.expandToInclude(t.x, t.y)
            } else if (arguments[0] instanceof Ll) {
                var e = arguments[0];
                if (e.isNull()) return null;
                this.isNull() ? (this._minx = e.getMinX(), this._maxx = e.getMaxX(), this._miny = e.getMinY(), this._maxy = e.getMaxY()) : (e._minx < this._minx && (this._minx = e._minx), e._maxx > this._maxx && (this._maxx = e._maxx), e._miny < this._miny && (this._miny = e._miny), e._maxy > this._maxy && (this._maxy = e._maxy))
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            this.isNull() ? (this._minx = n, this._maxx = n, this._miny = r, this._maxy = r) : (n < this._minx && (this._minx = n), n > this._maxx && (this._maxx = n), r < this._miny && (this._miny = r), r > this._maxy && (this._maxy = r))
        }
    }, Ll.prototype.minExtent = function () {
        if (this.isNull()) return 0;
        var t = this.getWidth(), e = this.getHeight();
        return t < e ? t : e
    }, Ll.prototype.getWidth = function () {
        return this.isNull() ? 0 : this._maxx - this._minx
    }, Ll.prototype.compareTo = function (t) {
        var e = t;
        return this.isNull() ? e.isNull() ? 0 : -1 : e.isNull() ? 1 : this._minx < e._minx ? -1 : this._minx > e._minx ? 1 : this._miny < e._miny ? -1 : this._miny > e._miny ? 1 : this._maxx < e._maxx ? -1 : this._maxx > e._maxx ? 1 : this._maxy < e._maxy ? -1 : this._maxy > e._maxy ? 1 : 0
    }, Ll.prototype.translate = function (t, e) {
        if (this.isNull()) return null;
        this.init(this.getMinX() + t, this.getMaxX() + t, this.getMinY() + e, this.getMaxY() + e)
    }, Ll.prototype.toString = function () {
        return "Env[" + this._minx + " : " + this._maxx + ", " + this._miny + " : " + this._maxy + "]"
    }, Ll.prototype.setToNull = function () {
        this._minx = 0, this._maxx = -1, this._miny = 0, this._maxy = -1
    }, Ll.prototype.getHeight = function () {
        return this.isNull() ? 0 : this._maxy - this._miny
    }, Ll.prototype.maxExtent = function () {
        if (this.isNull()) return 0;
        var t = this.getWidth(), e = this.getHeight();
        return t > e ? t : e
    }, Ll.prototype.expandBy = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.expandBy(t, t)
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            if (this.isNull()) return null;
            this._minx -= e, this._maxx += e, this._miny -= n, this._maxy += n, (this._minx > this._maxx || this._miny > this._maxy) && this.setToNull()
        }
    }, Ll.prototype.contains = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof Ll) {
                var t = arguments[0];
                return this.covers(t)
            }
            if (arguments[0] instanceof al) {
                var e = arguments[0];
                return this.covers(e)
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            return this.covers(n, r)
        }
    }, Ll.prototype.centre = function () {
        return this.isNull() ? null : new al((this.getMinX() + this.getMaxX()) / 2, (this.getMinY() + this.getMaxY()) / 2)
    }, Ll.prototype.init = function () {
        if (0 === arguments.length) this.setToNull(); else if (1 === arguments.length) {
            if (arguments[0] instanceof al) {
                var t = arguments[0];
                this.init(t.x, t.x, t.y, t.y)
            } else if (arguments[0] instanceof Ll) {
                var e = arguments[0];
                this._minx = e._minx, this._maxx = e._maxx, this._miny = e._miny, this._maxy = e._maxy
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            this.init(n.x, r.x, n.y, r.y)
        } else if (4 === arguments.length) {
            var i = arguments[0], o = arguments[1], s = arguments[2], a = arguments[3];
            i < o ? (this._minx = i, this._maxx = o) : (this._minx = o, this._maxx = i), s < a ? (this._miny = s, this._maxy = a) : (this._miny = a, this._maxy = s)
        }
    }, Ll.prototype.getMaxY = function () {
        return this._maxy
    }, Ll.prototype.distance = function (t) {
        if (this.intersects(t)) return 0;
        var e = 0;
        this._maxx < t._minx ? e = t._minx - this._maxx : this._minx > t._maxx && (e = this._minx - t._maxx);
        var n = 0;
        return this._maxy < t._miny ? n = t._miny - this._maxy : this._miny > t._maxy && (n = this._miny - t._maxy), 0 === e ? n : 0 === n ? e : Math.sqrt(e * e + n * n)
    }, Ll.prototype.hashCode = function () {
        var t = 17;
        return t = 37 * (t = 37 * (t = 37 * (t = 37 * t + al.hashCode(this._minx)) + al.hashCode(this._maxx)) + al.hashCode(this._miny)) + al.hashCode(this._maxy)
    }, Ll.prototype.interfaces_ = function () {
        return [rl, sl]
    }, Ll.prototype.getClass = function () {
        return Ll
    }, Ll.intersects = function () {
        if (3 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = arguments[2];
            return n.x >= (t.x < e.x ? t.x : e.x) && n.x <= (t.x > e.x ? t.x : e.x) && n.y >= (t.y < e.y ? t.y : e.y) && n.y <= (t.y > e.y ? t.y : e.y)
        }
        if (4 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2], s = arguments[3], a = Math.min(o.x, s.x),
                u = Math.max(o.x, s.x), l = Math.min(r.x, i.x), c = Math.max(r.x, i.x);
            return !(l > u) && (!(c < a) && (a = Math.min(o.y, s.y), u = Math.max(o.y, s.y), l = Math.min(r.y, i.y), c = Math.max(r.y, i.y), !(l > u) && !(c < a)))
        }
    }, Ml.serialVersionUID.get = function () {
        return 0x51845cd552189800
    }, Object.defineProperties(Ll, Ml);
    var Ol = {
        typeStr: /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
        emptyTypeStr: /^\s*(\w+)\s*EMPTY\s*$/,
        spaces: /\s+/,
        parenComma: /\)\s*,\s*\(/,
        doubleParenComma: /\)\s*\)\s*,\s*\(\s*\(/,
        trimParens: /^\s*\(?(.*?)\)?\s*$/
    }, Rl = function (t) {
        this.geometryFactory = t || new vh
    };
    Rl.prototype.read = function (t) {
        var e, n, r;
        t = t.replace(/[\n\r]/g, " ");
        var i = Ol.typeStr.exec(t);
        if (-1 !== t.search("EMPTY") && ((i = Ol.emptyTypeStr.exec(t))[2] = void 0), i && (n = i[1].toLowerCase(), r = i[2], Al[n] && (e = Al[n].apply(this, [r]))), void 0 === e) throw new Error("Could not parse WKT " + t);
        return e
    }, Rl.prototype.write = function (t) {
        return this.extractGeometry(t)
    }, Rl.prototype.extractGeometry = function (t) {
        var e = t.getGeometryType().toLowerCase();
        if (!Tl[e]) return null;
        var n = e.toUpperCase();
        return t.isEmpty() ? n + " EMPTY" : n + "(" + Tl[e].apply(this, [t]) + ")"
    };
    var Tl = {
        coordinate: function (t) {
            return t.x + " " + t.y
        }, point: function (t) {
            return Tl.coordinate.call(this, t._coordinates._coordinates[0])
        }, multipoint: function (t) {
            for (var e = [], n = 0, r = t._geometries.length; n < r; ++n) e.push("(" + Tl.point.apply(this, [t._geometries[n]]) + ")");
            return e.join(",")
        }, linestring: function (t) {
            for (var e = [], n = 0, r = t._points._coordinates.length; n < r; ++n) e.push(Tl.coordinate.apply(this, [t._points._coordinates[n]]));
            return e.join(",")
        }, linearring: function (t) {
            for (var e = [], n = 0, r = t._points._coordinates.length; n < r; ++n) e.push(Tl.coordinate.apply(this, [t._points._coordinates[n]]));
            return e.join(",")
        }, multilinestring: function (t) {
            for (var e = [], n = 0, r = t._geometries.length; n < r; ++n) e.push("(" + Tl.linestring.apply(this, [t._geometries[n]]) + ")");
            return e.join(",")
        }, polygon: function (t) {
            var e = [];
            e.push("(" + Tl.linestring.apply(this, [t._shell]) + ")");
            for (var n = 0, r = t._holes.length; n < r; ++n) e.push("(" + Tl.linestring.apply(this, [t._holes[n]]) + ")");
            return e.join(",")
        }, multipolygon: function (t) {
            for (var e = [], n = 0, r = t._geometries.length; n < r; ++n) e.push("(" + Tl.polygon.apply(this, [t._geometries[n]]) + ")");
            return e.join(",")
        }, geometrycollection: function (t) {
            for (var e = [], n = 0, r = t._geometries.length; n < r; ++n) e.push(this.extractGeometry(t._geometries[n]));
            return e.join(",")
        }
    }, Al = {
        point: function (t) {
            if (void 0 === t) return this.geometryFactory.createPoint();
            var e = t.trim().split(Ol.spaces);
            return this.geometryFactory.createPoint(new al(Number.parseFloat(e[0]), Number.parseFloat(e[1])))
        }, multipoint: function (t) {
            var e;
            if (void 0 === t) return this.geometryFactory.createMultiPoint();
            for (var n = t.trim().split(","), r = [], i = 0, o = n.length; i < o; ++i) e = n[i].replace(Ol.trimParens, "$1"), r.push(Al.point.apply(this, [e]));
            return this.geometryFactory.createMultiPoint(r)
        }, linestring: function (t) {
            if (void 0 === t) return this.geometryFactory.createLineString();
            for (var e, n = t.trim().split(","), r = [], i = 0, o = n.length; i < o; ++i) e = n[i].trim().split(Ol.spaces), r.push(new al(Number.parseFloat(e[0]), Number.parseFloat(e[1])));
            return this.geometryFactory.createLineString(r)
        }, linearring: function (t) {
            if (void 0 === t) return this.geometryFactory.createLinearRing();
            for (var e, n = t.trim().split(","), r = [], i = 0, o = n.length; i < o; ++i) e = n[i].trim().split(Ol.spaces), r.push(new al(Number.parseFloat(e[0]), Number.parseFloat(e[1])));
            return this.geometryFactory.createLinearRing(r)
        }, multilinestring: function (t) {
            var e;
            if (void 0 === t) return this.geometryFactory.createMultiLineString();
            for (var n = t.trim().split(Ol.parenComma), r = [], i = 0, o = n.length; i < o; ++i) e = n[i].replace(Ol.trimParens, "$1"), r.push(Al.linestring.apply(this, [e]));
            return this.geometryFactory.createMultiLineString(r)
        }, polygon: function (t) {
            var e, n, r;
            if (void 0 === t) return this.geometryFactory.createPolygon();
            for (var i, o = t.trim().split(Ol.parenComma), s = [], a = 0, u = o.length; a < u; ++a) e = o[a].replace(Ol.trimParens, "$1"), n = Al.linestring.apply(this, [e]), r = this.geometryFactory.createLinearRing(n._points), 0 === a ? i = r : s.push(r);
            return this.geometryFactory.createPolygon(i, s)
        }, multipolygon: function (t) {
            var e;
            if (void 0 === t) return this.geometryFactory.createMultiPolygon();
            for (var n = t.trim().split(Ol.doubleParenComma), r = [], i = 0, o = n.length; i < o; ++i) e = n[i].replace(Ol.trimParens, "$1"), r.push(Al.polygon.apply(this, [e]));
            return this.geometryFactory.createMultiPolygon(r)
        }, geometrycollection: function (t) {
            if (void 0 === t) return this.geometryFactory.createGeometryCollection();
            for (var e = (t = t.replace(/,\s*([A-Za-z])/g, "|$1")).trim().split("|"), n = [], r = 0, i = e.length; r < i; ++r) n.push(this.read(e[r]));
            return this.geometryFactory.createGeometryCollection(n)
        }
    }, Dl = function (t) {
        this.parser = new Rl(t)
    };
    Dl.prototype.write = function (t) {
        return this.parser.write(t)
    }, Dl.toLineString = function (t, e) {
        if (2 !== arguments.length) throw new Error("Not implemented");
        return "LINESTRING ( " + t.x + " " + t.y + ", " + e.x + " " + e.y + " )"
    };
    var Fl = function (t) {
        function e(e) {
            t.call(this, e), this.name = "RuntimeException", this.message = e, this.stack = (new t).stack
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
    }(Error), kl = function (t) {
        function e() {
            if (t.call(this), 0 === arguments.length) t.call(this); else if (1 === arguments.length) {
                var e = arguments[0];
                t.call(this, e)
            }
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Fl), Gl = function () {
    };
    Gl.prototype.interfaces_ = function () {
        return []
    }, Gl.prototype.getClass = function () {
        return Gl
    }, Gl.shouldNeverReachHere = function () {
        if (0 === arguments.length) Gl.shouldNeverReachHere(null); else if (1 === arguments.length) {
            var t = arguments[0];
            throw new kl("Should never reach here" + (null !== t ? ": " + t : ""))
        }
    }, Gl.isTrue = function () {
        var t;
        if (1 === arguments.length) Gl.isTrue(arguments[0], null); else if (2 === arguments.length && (t = arguments[1], !arguments[0])) throw null === t ? new kl : new kl(t)
    }, Gl.equals = function () {
        var t, e, n;
        if (2 === arguments.length) Gl.equals(t = arguments[0], e = arguments[1], null); else if (3 === arguments.length && (t = arguments[0], n = arguments[2], !(e = arguments[1]).equals(t))) throw new kl("Expected " + t + " but encountered " + e + (null !== n ? ": " + n : ""))
    };
    var ql = function () {
        this._result = null, this._inputLines = Array(2).fill().map((function () {
            return Array(2)
        })), this._intPt = new Array(2).fill(null), this._intLineIndex = null, this._isProper = null, this._pa = null, this._pb = null, this._precisionModel = null, this._intPt[0] = new al, this._intPt[1] = new al, this._pa = this._intPt[0], this._pb = this._intPt[1], this._result = 0
    }, Bl = {
        DONT_INTERSECT: {configurable: !0},
        DO_INTERSECT: {configurable: !0},
        COLLINEAR: {configurable: !0},
        NO_INTERSECTION: {configurable: !0},
        POINT_INTERSECTION: {configurable: !0},
        COLLINEAR_INTERSECTION: {configurable: !0}
    };
    ql.prototype.getIndexAlongSegment = function (t, e) {
        return this.computeIntLineIndex(), this._intLineIndex[t][e]
    }, ql.prototype.getTopologySummary = function () {
        var t = new yl;
        return this.isEndPoint() && t.append(" endpoint"), this._isProper && t.append(" proper"), this.isCollinear() && t.append(" collinear"), t.toString()
    }, ql.prototype.computeIntersection = function (t, e, n, r) {
        this._inputLines[0][0] = t, this._inputLines[0][1] = e, this._inputLines[1][0] = n, this._inputLines[1][1] = r, this._result = this.computeIntersect(t, e, n, r)
    }, ql.prototype.getIntersectionNum = function () {
        return this._result
    }, ql.prototype.computeIntLineIndex = function () {
        if (0 === arguments.length) null === this._intLineIndex && (this._intLineIndex = Array(2).fill().map((function () {
            return Array(2)
        })), this.computeIntLineIndex(0), this.computeIntLineIndex(1)); else if (1 === arguments.length) {
            var t = arguments[0], e = this.getEdgeDistance(t, 0), n = this.getEdgeDistance(t, 1);
            e > n ? (this._intLineIndex[t][0] = 0, this._intLineIndex[t][1] = 1) : (this._intLineIndex[t][0] = 1, this._intLineIndex[t][1] = 0)
        }
    }, ql.prototype.isProper = function () {
        return this.hasIntersection() && this._isProper
    }, ql.prototype.setPrecisionModel = function (t) {
        this._precisionModel = t
    }, ql.prototype.isInteriorIntersection = function () {
        var t = this;
        if (0 === arguments.length) return !!this.isInteriorIntersection(0) || !!this.isInteriorIntersection(1);
        if (1 === arguments.length) {
            for (var e = arguments[0], n = 0; n < this._result; n++) if (!t._intPt[n].equals2D(t._inputLines[e][0]) && !t._intPt[n].equals2D(t._inputLines[e][1])) return !0;
            return !1
        }
    }, ql.prototype.getIntersection = function (t) {
        return this._intPt[t]
    }, ql.prototype.isEndPoint = function () {
        return this.hasIntersection() && !this._isProper
    }, ql.prototype.hasIntersection = function () {
        return this._result !== ql.NO_INTERSECTION
    }, ql.prototype.getEdgeDistance = function (t, e) {
        return ql.computeEdgeDistance(this._intPt[e], this._inputLines[t][0], this._inputLines[t][1])
    }, ql.prototype.isCollinear = function () {
        return this._result === ql.COLLINEAR_INTERSECTION
    }, ql.prototype.toString = function () {
        return Dl.toLineString(this._inputLines[0][0], this._inputLines[0][1]) + " - " + Dl.toLineString(this._inputLines[1][0], this._inputLines[1][1]) + this.getTopologySummary()
    }, ql.prototype.getEndpoint = function (t, e) {
        return this._inputLines[t][e]
    }, ql.prototype.isIntersection = function (t) {
        for (var e = 0; e < this._result; e++) if (this._intPt[e].equals2D(t)) return !0;
        return !1
    }, ql.prototype.getIntersectionAlongSegment = function (t, e) {
        return this.computeIntLineIndex(), this._intPt[this._intLineIndex[t][e]]
    }, ql.prototype.interfaces_ = function () {
        return []
    }, ql.prototype.getClass = function () {
        return ql
    }, ql.computeEdgeDistance = function (t, e, n) {
        var r = Math.abs(n.x - e.x), i = Math.abs(n.y - e.y), o = -1;
        if (t.equals(e)) o = 0; else if (t.equals(n)) o = r > i ? r : i; else {
            var s = Math.abs(t.x - e.x), a = Math.abs(t.y - e.y);
            0 !== (o = r > i ? s : a) || t.equals(e) || (o = Math.max(s, a))
        }
        return Gl.isTrue(!(0 === o && !t.equals(e)), "Bad distance calculation"), o
    }, ql.nonRobustComputeEdgeDistance = function (t, e, n) {
        var r = t.x - e.x, i = t.y - e.y, o = Math.sqrt(r * r + i * i);
        return Gl.isTrue(!(0 === o && !t.equals(e)), "Invalid distance calculation"), o
    }, Bl.DONT_INTERSECT.get = function () {
        return 0
    }, Bl.DO_INTERSECT.get = function () {
        return 1
    }, Bl.COLLINEAR.get = function () {
        return 2
    }, Bl.NO_INTERSECTION.get = function () {
        return 0
    }, Bl.POINT_INTERSECTION.get = function () {
        return 1
    }, Bl.COLLINEAR_INTERSECTION.get = function () {
        return 2
    }, Object.defineProperties(ql, Bl);
    var zl = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.isInSegmentEnvelopes = function (t) {
            var e = new Ll(this._inputLines[0][0], this._inputLines[0][1]),
                n = new Ll(this._inputLines[1][0], this._inputLines[1][1]);
            return e.contains(t) && n.contains(t)
        }, e.prototype.computeIntersection = function () {
            if (3 !== arguments.length) return t.prototype.computeIntersection.apply(this, arguments);
            var e = arguments[0], n = arguments[1], r = arguments[2];
            if (this._isProper = !1, Ll.intersects(n, r, e) && 0 === Vl.orientationIndex(n, r, e) && 0 === Vl.orientationIndex(r, n, e)) return this._isProper = !0, (e.equals(n) || e.equals(r)) && (this._isProper = !1), this._result = t.POINT_INTERSECTION, null;
            this._result = t.NO_INTERSECTION
        }, e.prototype.normalizeToMinimum = function (t, e, n, r, i) {
            i.x = this.smallestInAbsValue(t.x, e.x, n.x, r.x), i.y = this.smallestInAbsValue(t.y, e.y, n.y, r.y), t.x -= i.x, t.y -= i.y, e.x -= i.x, e.y -= i.y, n.x -= i.x, n.y -= i.y, r.x -= i.x, r.y -= i.y
        }, e.prototype.safeHCoordinateIntersection = function (t, n, r, i) {
            var o = null;
            try {
                o = Pl.intersection(t, n, r, i)
            } catch (s) {
                if (!(s instanceof Sl)) throw s;
                o = e.nearestEndpoint(t, n, r, i)
            }
            return o
        }, e.prototype.intersection = function (t, n, r, i) {
            var o = this.intersectionWithNormalization(t, n, r, i);
            return this.isInSegmentEnvelopes(o) || (o = new al(e.nearestEndpoint(t, n, r, i))), null !== this._precisionModel && this._precisionModel.makePrecise(o), o
        }, e.prototype.smallestInAbsValue = function (t, e, n, r) {
            var i = t, o = Math.abs(i);
            return Math.abs(e) < o && (i = e, o = Math.abs(e)), Math.abs(n) < o && (i = n, o = Math.abs(n)), Math.abs(r) < o && (i = r), i
        }, e.prototype.checkDD = function (t, e, n, r, i) {
            var o = El.intersection(t, e, n, r), s = this.isInSegmentEnvelopes(o);
            Cl.out.println("DD in env = " + s + "  --------------------- " + o), i.distance(o) > 1e-4 && Cl.out.println("Distance = " + i.distance(o))
        }, e.prototype.intersectionWithNormalization = function (t, e, n, r) {
            var i = new al(t), o = new al(e), s = new al(n), a = new al(r), u = new al;
            this.normalizeToEnvCentre(i, o, s, a, u);
            var l = this.safeHCoordinateIntersection(i, o, s, a);
            return l.x += u.x, l.y += u.y, l
        }, e.prototype.computeCollinearIntersection = function (e, n, r, i) {
            var o = Ll.intersects(e, n, r), s = Ll.intersects(e, n, i), a = Ll.intersects(r, i, e),
                u = Ll.intersects(r, i, n);
            return o && s ? (this._intPt[0] = r, this._intPt[1] = i, t.COLLINEAR_INTERSECTION) : a && u ? (this._intPt[0] = e, this._intPt[1] = n, t.COLLINEAR_INTERSECTION) : o && a ? (this._intPt[0] = r, this._intPt[1] = e, !r.equals(e) || s || u ? t.COLLINEAR_INTERSECTION : t.POINT_INTERSECTION) : o && u ? (this._intPt[0] = r, this._intPt[1] = n, !r.equals(n) || s || a ? t.COLLINEAR_INTERSECTION : t.POINT_INTERSECTION) : s && a ? (this._intPt[0] = i, this._intPt[1] = e, !i.equals(e) || o || u ? t.COLLINEAR_INTERSECTION : t.POINT_INTERSECTION) : s && u ? (this._intPt[0] = i, this._intPt[1] = n, !i.equals(n) || o || a ? t.COLLINEAR_INTERSECTION : t.POINT_INTERSECTION) : t.NO_INTERSECTION
        }, e.prototype.normalizeToEnvCentre = function (t, e, n, r, i) {
            var o = t.x < e.x ? t.x : e.x, s = t.y < e.y ? t.y : e.y, a = t.x > e.x ? t.x : e.x,
                u = t.y > e.y ? t.y : e.y, l = n.x < r.x ? n.x : r.x, c = n.y < r.y ? n.y : r.y,
                h = n.x > r.x ? n.x : r.x, p = n.y > r.y ? n.y : r.y, f = ((o > l ? o : l) + (a < h ? a : h)) / 2,
                g = ((s > c ? s : c) + (u < p ? u : p)) / 2;
            i.x = f, i.y = g, t.x -= i.x, t.y -= i.y, e.x -= i.x, e.y -= i.y, n.x -= i.x, n.y -= i.y, r.x -= i.x, r.y -= i.y
        }, e.prototype.computeIntersect = function (e, n, r, i) {
            if (this._isProper = !1, !Ll.intersects(e, n, r, i)) return t.NO_INTERSECTION;
            var o = Vl.orientationIndex(e, n, r), s = Vl.orientationIndex(e, n, i);
            if (o > 0 && s > 0 || o < 0 && s < 0) return t.NO_INTERSECTION;
            var a = Vl.orientationIndex(r, i, e), u = Vl.orientationIndex(r, i, n);
            return a > 0 && u > 0 || a < 0 && u < 0 ? t.NO_INTERSECTION : 0 === o && 0 === s && 0 === a && 0 === u ? this.computeCollinearIntersection(e, n, r, i) : (0 === o || 0 === s || 0 === a || 0 === u ? (this._isProper = !1, e.equals2D(r) || e.equals2D(i) ? this._intPt[0] = e : n.equals2D(r) || n.equals2D(i) ? this._intPt[0] = n : 0 === o ? this._intPt[0] = new al(r) : 0 === s ? this._intPt[0] = new al(i) : 0 === a ? this._intPt[0] = new al(e) : 0 === u && (this._intPt[0] = new al(n))) : (this._isProper = !0, this._intPt[0] = this.intersection(e, n, r, i)), t.POINT_INTERSECTION)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e.nearestEndpoint = function (t, e, n, r) {
            var i = t, o = Vl.distancePointLine(t, n, r), s = Vl.distancePointLine(e, n, r);
            return s < o && (o = s, i = e), (s = Vl.distancePointLine(n, t, e)) < o && (o = s, i = n), (s = Vl.distancePointLine(r, t, e)) < o && (o = s, i = r), i
        }, e
    }(ql), jl = function () {
    };
    jl.prototype.interfaces_ = function () {
        return []
    }, jl.prototype.getClass = function () {
        return jl
    }, jl.orientationIndex = function (t, e, n) {
        var r = e.x - t.x, i = e.y - t.y, o = n.x - e.x, s = n.y - e.y;
        return jl.signOfDet2x2(r, i, o, s)
    }, jl.signOfDet2x2 = function (t, e, n, r) {
        var i = null, o = null, s = null;
        if (i = 1, 0 === t || 0 === r) return 0 === e || 0 === n ? 0 : e > 0 ? n > 0 ? -i : i : n > 0 ? i : -i;
        if (0 === e || 0 === n) return r > 0 ? t > 0 ? i : -i : t > 0 ? -i : i;
        if (e > 0 ? r > 0 ? e <= r || (i = -i, o = t, t = n, n = o, o = e, e = r, r = o) : e <= -r ? (i = -i, n = -n, r = -r) : (o = t, t = -n, n = o, o = e, e = -r, r = o) : r > 0 ? -e <= r ? (i = -i, t = -t, e = -e) : (o = -t, t = n, n = o, o = -e, e = r, r = o) : e >= r ? (t = -t, e = -e, n = -n, r = -r) : (i = -i, o = -t, t = -n, n = o, o = -e, e = -r, r = o), t > 0) {
            if (!(n > 0)) return i;
            if (!(t <= n)) return i
        } else {
            if (n > 0) return -i;
            if (!(t >= n)) return -i;
            i = -i, t = -t, n = -n
        }
        for (; ;) {
            if ((r -= (s = Math.floor(n / t)) * e) < 0) return -i;
            if (r > e) return i;
            if (t > (n -= s * t) + n) {
                if (e < r + r) return i
            } else {
                if (e > r + r) return -i;
                n = t - n, r = e - r, i = -i
            }
            if (0 === r) return 0 === n ? 0 : -i;
            if (0 === n) return i;
            if ((e -= (s = Math.floor(t / n)) * r) < 0) return i;
            if (e > r) return -i;
            if (n > (t -= s * n) + t) {
                if (r < e + e) return -i
            } else {
                if (r > e + e) return i;
                t = n - t, e = r - e, i = -i
            }
            if (0 === e) return 0 === t ? 0 : i;
            if (0 === t) return -i
        }
    };
    var Ul = function () {
        this._p = null, this._crossingCount = 0, this._isPointOnSegment = !1;
        var t = arguments[0];
        this._p = t
    };
    Ul.prototype.countSegment = function (t, e) {
        if (t.x < this._p.x && e.x < this._p.x) return null;
        if (this._p.x === e.x && this._p.y === e.y) return this._isPointOnSegment = !0, null;
        if (t.y === this._p.y && e.y === this._p.y) {
            var n = t.x, r = e.x;
            return n > r && (n = e.x, r = t.x), this._p.x >= n && this._p.x <= r && (this._isPointOnSegment = !0), null
        }
        if (t.y > this._p.y && e.y <= this._p.y || e.y > this._p.y && t.y <= this._p.y) {
            var i = t.x - this._p.x, o = t.y - this._p.y, s = e.x - this._p.x, a = e.y - this._p.y,
                u = jl.signOfDet2x2(i, o, s, a);
            if (0 === u) return this._isPointOnSegment = !0, null;
            a < o && (u = -u), u > 0 && this._crossingCount++
        }
    }, Ul.prototype.isPointInPolygon = function () {
        return this.getLocation() !== hl.EXTERIOR
    }, Ul.prototype.getLocation = function () {
        return this._isPointOnSegment ? hl.BOUNDARY : this._crossingCount % 2 == 1 ? hl.INTERIOR : hl.EXTERIOR
    }, Ul.prototype.isOnSegment = function () {
        return this._isPointOnSegment
    }, Ul.prototype.interfaces_ = function () {
        return []
    }, Ul.prototype.getClass = function () {
        return Ul
    }, Ul.locatePointInRing = function () {
        if (arguments[0] instanceof al && fl(arguments[1], wl)) {
            for (var t = arguments[0], e = arguments[1], n = new Ul(t), r = new al, i = new al, o = 1; o < e.size(); o++) if (e.getCoordinate(o, r), e.getCoordinate(o - 1, i), n.countSegment(r, i), n.isOnSegment()) return n.getLocation();
            return n.getLocation()
        }
        if (arguments[0] instanceof al && arguments[1] instanceof Array) {
            for (var s = arguments[0], a = arguments[1], u = new Ul(s), l = 1; l < a.length; l++) {
                var c = a[l], h = a[l - 1];
                if (u.countSegment(c, h), u.isOnSegment()) return u.getLocation()
            }
            return u.getLocation()
        }
    };
    var Vl = function () {
    }, Xl = {
        CLOCKWISE: {configurable: !0},
        RIGHT: {configurable: !0},
        COUNTERCLOCKWISE: {configurable: !0},
        LEFT: {configurable: !0},
        COLLINEAR: {configurable: !0},
        STRAIGHT: {configurable: !0}
    };
    Vl.prototype.interfaces_ = function () {
        return []
    }, Vl.prototype.getClass = function () {
        return Vl
    }, Vl.orientationIndex = function (t, e, n) {
        return El.orientationIndex(t, e, n)
    }, Vl.signedArea = function () {
        if (arguments[0] instanceof Array) {
            var t = arguments[0];
            if (t.length < 3) return 0;
            for (var e = 0, n = t[0].x, r = 1; r < t.length - 1; r++) {
                var i = t[r].x - n, o = t[r + 1].y, s = t[r - 1].y;
                e += i * (s - o)
            }
            return e / 2
        }
        if (fl(arguments[0], wl)) {
            var a = arguments[0], u = a.size();
            if (u < 3) return 0;
            var l = new al, c = new al, h = new al;
            a.getCoordinate(0, c), a.getCoordinate(1, h);
            var p = c.x;
            h.x -= p;
            for (var f = 0, g = 1; g < u - 1; g++) l.y = c.y, c.x = h.x, c.y = h.y, a.getCoordinate(g + 1, h), h.x -= p, f += c.x * (l.y - h.y);
            return f / 2
        }
    }, Vl.distanceLineLine = function (t, e, n, r) {
        if (t.equals(e)) return Vl.distancePointLine(t, n, r);
        if (n.equals(r)) return Vl.distancePointLine(r, t, e);
        var i = !1;
        if (Ll.intersects(t, e, n, r)) {
            var o = (e.x - t.x) * (r.y - n.y) - (e.y - t.y) * (r.x - n.x);
            if (0 === o) i = !0; else {
                var s = (t.y - n.y) * (r.x - n.x) - (t.x - n.x) * (r.y - n.y),
                    a = ((t.y - n.y) * (e.x - t.x) - (t.x - n.x) * (e.y - t.y)) / o, u = s / o;
                (u < 0 || u > 1 || a < 0 || a > 1) && (i = !0)
            }
        } else i = !0;
        return i ? gl.min(Vl.distancePointLine(t, n, r), Vl.distancePointLine(e, n, r), Vl.distancePointLine(n, t, e), Vl.distancePointLine(r, t, e)) : 0
    }, Vl.isPointInRing = function (t, e) {
        return Vl.locatePointInRing(t, e) !== hl.EXTERIOR
    }, Vl.computeLength = function (t) {
        var e = t.size();
        if (e <= 1) return 0;
        var n = 0, r = new al;
        t.getCoordinate(0, r);
        for (var i = r.x, o = r.y, s = 1; s < e; s++) {
            t.getCoordinate(s, r);
            var a = r.x, u = r.y, l = a - i, c = u - o;
            n += Math.sqrt(l * l + c * c), i = a, o = u
        }
        return n
    }, Vl.isCCW = function (t) {
        var e = t.length - 1;
        if (e < 3) throw new tl("Ring has fewer than 4 points, so orientation cannot be determined");
        for (var n = t[0], r = 0, i = 1; i <= e; i++) {
            var o = t[i];
            o.y > n.y && (n = o, r = i)
        }
        var s = r;
        do {
            (s -= 1) < 0 && (s = e)
        } while (t[s].equals2D(n) && s !== r);
        var a = r;
        do {
            a = (a + 1) % e
        } while (t[a].equals2D(n) && a !== r);
        var u = t[s], l = t[a];
        if (u.equals2D(n) || l.equals2D(n) || u.equals2D(l)) return !1;
        var c = Vl.computeOrientation(u, n, l), h = !1;
        return h = 0 === c ? u.x > l.x : c > 0, h
    }, Vl.locatePointInRing = function (t, e) {
        return Ul.locatePointInRing(t, e)
    }, Vl.distancePointLinePerpendicular = function (t, e, n) {
        var r = (n.x - e.x) * (n.x - e.x) + (n.y - e.y) * (n.y - e.y),
            i = ((e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y)) / r;
        return Math.abs(i) * Math.sqrt(r)
    }, Vl.computeOrientation = function (t, e, n) {
        return Vl.orientationIndex(t, e, n)
    }, Vl.distancePointLine = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            if (0 === e.length) throw new tl("Line array must contain at least one vertex");
            for (var n = t.distance(e[0]), r = 0; r < e.length - 1; r++) {
                var i = Vl.distancePointLine(t, e[r], e[r + 1]);
                i < n && (n = i)
            }
            return n
        }
        if (3 === arguments.length) {
            var o = arguments[0], s = arguments[1], a = arguments[2];
            if (s.x === a.x && s.y === a.y) return o.distance(s);
            var u = (a.x - s.x) * (a.x - s.x) + (a.y - s.y) * (a.y - s.y),
                l = ((o.x - s.x) * (a.x - s.x) + (o.y - s.y) * (a.y - s.y)) / u;
            if (l <= 0) return o.distance(s);
            if (l >= 1) return o.distance(a);
            var c = ((s.y - o.y) * (a.x - s.x) - (s.x - o.x) * (a.y - s.y)) / u;
            return Math.abs(c) * Math.sqrt(u)
        }
    }, Vl.isOnLine = function (t, e) {
        for (var n = new zl, r = 1; r < e.length; r++) {
            var i = e[r - 1], o = e[r];
            if (n.computeIntersection(t, i, o), n.hasIntersection()) return !0
        }
        return !1
    }, Xl.CLOCKWISE.get = function () {
        return -1
    }, Xl.RIGHT.get = function () {
        return Vl.CLOCKWISE
    }, Xl.COUNTERCLOCKWISE.get = function () {
        return 1
    }, Xl.LEFT.get = function () {
        return Vl.COUNTERCLOCKWISE
    }, Xl.COLLINEAR.get = function () {
        return 0
    }, Xl.STRAIGHT.get = function () {
        return Vl.COLLINEAR
    }, Object.defineProperties(Vl, Xl);
    var Yl = function () {
    };
    Yl.prototype.filter = function (t) {
    }, Yl.prototype.interfaces_ = function () {
        return []
    }, Yl.prototype.getClass = function () {
        return Yl
    };
    var Hl = function () {
        var t = arguments[0];
        this._envelope = null, this._factory = null, this._SRID = null, this._userData = null, this._factory = t, this._SRID = t.getSRID()
    }, Wl = {
        serialVersionUID: {configurable: !0},
        SORTINDEX_POINT: {configurable: !0},
        SORTINDEX_MULTIPOINT: {configurable: !0},
        SORTINDEX_LINESTRING: {configurable: !0},
        SORTINDEX_LINEARRING: {configurable: !0},
        SORTINDEX_MULTILINESTRING: {configurable: !0},
        SORTINDEX_POLYGON: {configurable: !0},
        SORTINDEX_MULTIPOLYGON: {configurable: !0},
        SORTINDEX_GEOMETRYCOLLECTION: {configurable: !0},
        geometryChangedFilter: {configurable: !0}
    };
    Hl.prototype.isGeometryCollection = function () {
        return this.getSortIndex() === Hl.SORTINDEX_GEOMETRYCOLLECTION
    }, Hl.prototype.getFactory = function () {
        return this._factory
    }, Hl.prototype.getGeometryN = function (t) {
        return this
    }, Hl.prototype.getArea = function () {
        return 0
    }, Hl.prototype.isRectangle = function () {
        return !1
    }, Hl.prototype.equals = function () {
        if (arguments[0] instanceof Hl) {
            var t = arguments[0];
            return null !== t && this.equalsTopo(t)
        }
        if (arguments[0] instanceof Object) {
            var e = arguments[0];
            if (!(e instanceof Hl)) return !1;
            var n = e;
            return this.equalsExact(n)
        }
    }, Hl.prototype.equalsExact = function (t) {
        return this === t || this.equalsExact(t, 0)
    }, Hl.prototype.geometryChanged = function () {
        this.apply(Hl.geometryChangedFilter)
    }, Hl.prototype.geometryChangedAction = function () {
        this._envelope = null
    }, Hl.prototype.equalsNorm = function (t) {
        return null !== t && this.norm().equalsExact(t.norm())
    }, Hl.prototype.getLength = function () {
        return 0
    }, Hl.prototype.getNumGeometries = function () {
        return 1
    }, Hl.prototype.compareTo = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = t;
            return this.getSortIndex() !== e.getSortIndex() ? this.getSortIndex() - e.getSortIndex() : this.isEmpty() && e.isEmpty() ? 0 : this.isEmpty() ? -1 : e.isEmpty() ? 1 : this.compareToSameClass(t)
        }
        if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            return this.getSortIndex() !== n.getSortIndex() ? this.getSortIndex() - n.getSortIndex() : this.isEmpty() && n.isEmpty() ? 0 : this.isEmpty() ? -1 : n.isEmpty() ? 1 : this.compareToSameClass(n, r)
        }
    }, Hl.prototype.getUserData = function () {
        return this._userData
    }, Hl.prototype.getSRID = function () {
        return this._SRID
    }, Hl.prototype.getEnvelope = function () {
        return this.getFactory().toGeometry(this.getEnvelopeInternal())
    }, Hl.prototype.checkNotGeometryCollection = function (t) {
        if (t.getSortIndex() === Hl.SORTINDEX_GEOMETRYCOLLECTION) throw new tl("This method does not support GeometryCollection arguments")
    }, Hl.prototype.equal = function (t, e, n) {
        return 0 === n ? t.equals(e) : t.distance(e) <= n
    }, Hl.prototype.norm = function () {
        var t = this.copy();
        return t.normalize(), t
    }, Hl.prototype.getPrecisionModel = function () {
        return this._factory.getPrecisionModel()
    }, Hl.prototype.getEnvelopeInternal = function () {
        return null === this._envelope && (this._envelope = this.computeEnvelopeInternal()), new Ll(this._envelope)
    }, Hl.prototype.setSRID = function (t) {
        this._SRID = t
    }, Hl.prototype.setUserData = function (t) {
        this._userData = t
    }, Hl.prototype.compare = function (t, e) {
        for (var n = t.iterator(), r = e.iterator(); n.hasNext() && r.hasNext();) {
            var i = n.next(), o = r.next(), s = i.compareTo(o);
            if (0 !== s) return s
        }
        return n.hasNext() ? 1 : r.hasNext() ? -1 : 0
    }, Hl.prototype.hashCode = function () {
        return this.getEnvelopeInternal().hashCode()
    }, Hl.prototype.isGeometryCollectionOrDerived = function () {
        return this.getSortIndex() === Hl.SORTINDEX_GEOMETRYCOLLECTION || this.getSortIndex() === Hl.SORTINDEX_MULTIPOINT || this.getSortIndex() === Hl.SORTINDEX_MULTILINESTRING || this.getSortIndex() === Hl.SORTINDEX_MULTIPOLYGON
    }, Hl.prototype.interfaces_ = function () {
        return [il, rl, sl]
    }, Hl.prototype.getClass = function () {
        return Hl
    }, Hl.hasNonEmptyElements = function (t) {
        for (var e = 0; e < t.length; e++) if (!t[e].isEmpty()) return !0;
        return !1
    }, Hl.hasNullElements = function (t) {
        for (var e = 0; e < t.length; e++) if (null === t[e]) return !0;
        return !1
    }, Wl.serialVersionUID.get = function () {
        return 0x799ea46522854c00
    }, Wl.SORTINDEX_POINT.get = function () {
        return 0
    }, Wl.SORTINDEX_MULTIPOINT.get = function () {
        return 1
    }, Wl.SORTINDEX_LINESTRING.get = function () {
        return 2
    }, Wl.SORTINDEX_LINEARRING.get = function () {
        return 3
    }, Wl.SORTINDEX_MULTILINESTRING.get = function () {
        return 4
    }, Wl.SORTINDEX_POLYGON.get = function () {
        return 5
    }, Wl.SORTINDEX_MULTIPOLYGON.get = function () {
        return 6
    }, Wl.SORTINDEX_GEOMETRYCOLLECTION.get = function () {
        return 7
    }, Wl.geometryChangedFilter.get = function () {
        return Jl
    }, Object.defineProperties(Hl, Wl);
    var Jl = function () {
    };
    Jl.interfaces_ = function () {
        return [Yl]
    }, Jl.filter = function (t) {
        t.geometryChangedAction()
    };
    var Zl = function () {
    };
    Zl.prototype.filter = function (t) {
    }, Zl.prototype.interfaces_ = function () {
        return []
    }, Zl.prototype.getClass = function () {
        return Zl
    };
    var Kl = function () {
    }, Ql = {
        Mod2BoundaryNodeRule: {configurable: !0},
        EndPointBoundaryNodeRule: {configurable: !0},
        MultiValentEndPointBoundaryNodeRule: {configurable: !0},
        MonoValentEndPointBoundaryNodeRule: {configurable: !0},
        MOD2_BOUNDARY_RULE: {configurable: !0},
        ENDPOINT_BOUNDARY_RULE: {configurable: !0},
        MULTIVALENT_ENDPOINT_BOUNDARY_RULE: {configurable: !0},
        MONOVALENT_ENDPOINT_BOUNDARY_RULE: {configurable: !0},
        OGC_SFS_BOUNDARY_RULE: {configurable: !0}
    };
    Kl.prototype.isInBoundary = function (t) {
    }, Kl.prototype.interfaces_ = function () {
        return []
    }, Kl.prototype.getClass = function () {
        return Kl
    }, Ql.Mod2BoundaryNodeRule.get = function () {
        return $l
    }, Ql.EndPointBoundaryNodeRule.get = function () {
        return tc
    }, Ql.MultiValentEndPointBoundaryNodeRule.get = function () {
        return ec
    }, Ql.MonoValentEndPointBoundaryNodeRule.get = function () {
        return nc
    }, Ql.MOD2_BOUNDARY_RULE.get = function () {
        return new $l
    }, Ql.ENDPOINT_BOUNDARY_RULE.get = function () {
        return new tc
    }, Ql.MULTIVALENT_ENDPOINT_BOUNDARY_RULE.get = function () {
        return new ec
    }, Ql.MONOVALENT_ENDPOINT_BOUNDARY_RULE.get = function () {
        return new nc
    }, Ql.OGC_SFS_BOUNDARY_RULE.get = function () {
        return Kl.MOD2_BOUNDARY_RULE
    }, Object.defineProperties(Kl, Ql);
    var $l = function () {
    };
    $l.prototype.isInBoundary = function (t) {
        return t % 2 == 1
    }, $l.prototype.interfaces_ = function () {
        return [Kl]
    }, $l.prototype.getClass = function () {
        return $l
    };
    var tc = function () {
    };
    tc.prototype.isInBoundary = function (t) {
        return t > 0
    }, tc.prototype.interfaces_ = function () {
        return [Kl]
    }, tc.prototype.getClass = function () {
        return tc
    };
    var ec = function () {
    };
    ec.prototype.isInBoundary = function (t) {
        return t > 1
    }, ec.prototype.interfaces_ = function () {
        return [Kl]
    }, ec.prototype.getClass = function () {
        return ec
    };
    var nc = function () {
    };
    nc.prototype.isInBoundary = function (t) {
        return 1 === t
    }, nc.prototype.interfaces_ = function () {
        return [Kl]
    }, nc.prototype.getClass = function () {
        return nc
    };
    var rc = function () {
    };

    function ic(t) {
        this.message = t || ""
    }

    rc.prototype.add = function () {
    }, rc.prototype.addAll = function () {
    }, rc.prototype.isEmpty = function () {
    }, rc.prototype.iterator = function () {
    }, rc.prototype.size = function () {
    }, rc.prototype.toArray = function () {
    }, rc.prototype.remove = function () {
    }, ic.prototype = new Error, ic.prototype.name = "IndexOutOfBoundsException";
    var oc = function () {
    };
    oc.prototype.hasNext = function () {
    }, oc.prototype.next = function () {
    }, oc.prototype.remove = function () {
    };
    var sc = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function () {
        }, e.prototype.set = function () {
        }, e.prototype.isEmpty = function () {
        }, e
    }(rc);

    function ac(t) {
        this.message = t || ""
    }

    ac.prototype = new Error, ac.prototype.name = "NoSuchElementException";
    var uc = function (t) {
        function e() {
            t.call(this), this.array_ = [], arguments[0] instanceof rc && this.addAll(arguments[0])
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.ensureCapacity = function () {
        }, e.prototype.interfaces_ = function () {
            return [t, rc]
        }, e.prototype.add = function (t) {
            return 1 === arguments.length ? this.array_.push(t) : this.array_.splice(arguments[0], arguments[1]), !0
        }, e.prototype.clear = function () {
            this.array_ = []
        }, e.prototype.addAll = function (t) {
            for (var e = t.iterator(); e.hasNext();) this.add(e.next());
            return !0
        }, e.prototype.set = function (t, e) {
            var n = this.array_[t];
            return this.array_[t] = e, n
        }, e.prototype.iterator = function () {
            return new lc(this)
        }, e.prototype.get = function (t) {
            if (t < 0 || t >= this.size()) throw new ic;
            return this.array_[t]
        }, e.prototype.isEmpty = function () {
            return 0 === this.array_.length
        }, e.prototype.size = function () {
            return this.array_.length
        }, e.prototype.toArray = function () {
            for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
            return t
        }, e.prototype.remove = function (t) {
            for (var e = !1, n = 0, r = this.array_.length; n < r; n++) if (this.array_[n] === t) {
                this.array_.splice(n, 1), e = !0;
                break
            }
            return e
        }, e
    }(sc), lc = function (t) {
        function e(e) {
            t.call(this), this.arrayList_ = e, this.position_ = 0
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.next = function () {
            if (this.position_ === this.arrayList_.size()) throw new ac;
            return this.arrayList_.get(this.position_++)
        }, e.prototype.hasNext = function () {
            return this.position_ < this.arrayList_.size()
        }, e.prototype.set = function (t) {
            return this.arrayList_.set(this.position_ - 1, t)
        }, e.prototype.remove = function () {
            this.arrayList_.remove(this.arrayList_.get(this.position_))
        }, e
    }(oc), cc = function (t) {
        function e() {
            if (t.call(this), 0 === arguments.length) ; else if (1 === arguments.length) {
                var e = arguments[0];
                this.ensureCapacity(e.length), this.add(e, !0)
            } else if (2 === arguments.length) {
                var n = arguments[0], r = arguments[1];
                this.ensureCapacity(n.length), this.add(n, r)
            }
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {coordArrayType: {configurable: !0}};
        return n.coordArrayType.get = function () {
            return new Array(0).fill(null)
        }, e.prototype.getCoordinate = function (t) {
            return this.get(t)
        }, e.prototype.addAll = function () {
            var e = this;
            if (2 === arguments.length) {
                for (var n = arguments[0], r = arguments[1], i = !1, o = n.iterator(); o.hasNext();) e.add(o.next(), r), i = !0;
                return i
            }
            return t.prototype.addAll.apply(this, arguments)
        }, e.prototype.clone = function () {
            for (var e = t.prototype.clone.call(this), n = 0; n < this.size(); n++) e.add(n, this.get(n).copy());
            return e
        }, e.prototype.toCoordinateArray = function () {
            return this.toArray(e.coordArrayType)
        }, e.prototype.add = function () {
            var e = this;
            if (1 === arguments.length) {
                var n = arguments[0];
                t.prototype.add.call(this, n)
            } else if (2 === arguments.length) {
                if (arguments[0] instanceof Array && "boolean" == typeof arguments[1]) {
                    var r = arguments[0], i = arguments[1];
                    return this.add(r, i, !0), !0
                }
                if (arguments[0] instanceof al && "boolean" == typeof arguments[1]) {
                    var o = arguments[0], s = arguments[1];
                    if (!s && this.size() >= 1) {
                        var a = this.get(this.size() - 1);
                        if (a.equals2D(o)) return null
                    }
                    t.prototype.add.call(this, o)
                } else if (arguments[0] instanceof Object && "boolean" == typeof arguments[1]) {
                    var u = arguments[0], l = arguments[1];
                    return this.add(u, l), !0
                }
            } else if (3 === arguments.length) {
                if ("boolean" == typeof arguments[2] && arguments[0] instanceof Array && "boolean" == typeof arguments[1]) {
                    var c = arguments[0], h = arguments[1], p = arguments[2];
                    if (p) for (var f = 0; f < c.length; f++) e.add(c[f], h); else for (var g = c.length - 1; g >= 0; g--) e.add(c[g], h);
                    return !0
                }
                if ("boolean" == typeof arguments[2] && Number.isInteger(arguments[0]) && arguments[1] instanceof al) {
                    var d = arguments[0], y = arguments[1], v = arguments[2];
                    if (!v) {
                        var _ = this.size();
                        if (_ > 0) {
                            if (d > 0) {
                                var m = this.get(d - 1);
                                if (m.equals2D(y)) return null
                            }
                            if (d < _) {
                                var x = this.get(d);
                                if (x.equals2D(y)) return null
                            }
                        }
                    }
                    t.prototype.add.call(this, d, y)
                }
            } else if (4 === arguments.length) {
                var E = arguments[0], b = arguments[1], w = arguments[2], I = arguments[3], N = 1;
                w > I && (N = -1);
                for (var S = w; S !== I; S += N) e.add(E[S], b);
                return !0
            }
        }, e.prototype.closeRing = function () {
            this.size() > 0 && this.add(new al(this.get(0)), !1)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, Object.defineProperties(e, n), e
    }(uc), hc = function () {
    }, pc = {
        ForwardComparator: {configurable: !0},
        BidirectionalComparator: {configurable: !0},
        coordArrayType: {configurable: !0}
    };
    pc.ForwardComparator.get = function () {
        return fc
    }, pc.BidirectionalComparator.get = function () {
        return gc
    }, pc.coordArrayType.get = function () {
        return new Array(0).fill(null)
    }, hc.prototype.interfaces_ = function () {
        return []
    }, hc.prototype.getClass = function () {
        return hc
    }, hc.isRing = function (t) {
        return !(t.length < 4) && !!t[0].equals2D(t[t.length - 1])
    }, hc.ptNotInList = function (t, e) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            if (hc.indexOf(r, e) < 0) return r
        }
        return null
    }, hc.scroll = function (t, e) {
        var n = hc.indexOf(e, t);
        if (n < 0) return null;
        var r = new Array(t.length).fill(null);
        Cl.arraycopy(t, n, r, 0, t.length - n), Cl.arraycopy(t, 0, r, t.length - n, n), Cl.arraycopy(r, 0, t, 0, t.length)
    }, hc.equals = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            if (t === e) return !0;
            if (null === t || null === e) return !1;
            if (t.length !== e.length) return !1;
            for (var n = 0; n < t.length; n++) if (!t[n].equals(e[n])) return !1;
            return !0
        }
        if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2];
            if (r === i) return !0;
            if (null === r || null === i) return !1;
            if (r.length !== i.length) return !1;
            for (var s = 0; s < r.length; s++) if (0 !== o.compare(r[s], i[s])) return !1;
            return !0
        }
    }, hc.intersection = function (t, e) {
        for (var n = new cc, r = 0; r < t.length; r++) e.intersects(t[r]) && n.add(t[r], !0);
        return n.toCoordinateArray()
    }, hc.hasRepeatedPoints = function (t) {
        for (var e = 1; e < t.length; e++) if (t[e - 1].equals(t[e])) return !0;
        return !1
    }, hc.removeRepeatedPoints = function (t) {
        return hc.hasRepeatedPoints(t) ? new cc(t, !1).toCoordinateArray() : t
    }, hc.reverse = function (t) {
        for (var e = t.length - 1, n = Math.trunc(e / 2), r = 0; r <= n; r++) {
            var i = t[r];
            t[r] = t[e - r], t[e - r] = i
        }
    }, hc.removeNull = function (t) {
        for (var e = 0, n = 0; n < t.length; n++) null !== t[n] && e++;
        var r = new Array(e).fill(null);
        if (0 === e) return r;
        for (var i = 0, o = 0; o < t.length; o++) null !== t[o] && (r[i++] = t[o]);
        return r
    }, hc.copyDeep = function () {
        if (1 === arguments.length) {
            for (var t = arguments[0], e = new Array(t.length).fill(null), n = 0; n < t.length; n++) e[n] = new al(t[n]);
            return e
        }
        if (5 === arguments.length) for (var r = arguments[0], i = arguments[1], o = arguments[2], s = arguments[3], a = arguments[4], u = 0; u < a; u++) o[s + u] = new al(r[i + u])
    }, hc.isEqualReversed = function (t, e) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n], i = e[t.length - n - 1];
            if (0 !== r.compareTo(i)) return !1
        }
        return !0
    }, hc.envelope = function (t) {
        for (var e = new Ll, n = 0; n < t.length; n++) e.expandToInclude(t[n]);
        return e
    }, hc.toCoordinateArray = function (t) {
        return t.toArray(hc.coordArrayType)
    }, hc.atLeastNCoordinatesOrNothing = function (t, e) {
        return e.length >= t ? e : []
    }, hc.indexOf = function (t, e) {
        for (var n = 0; n < e.length; n++) if (t.equals(e[n])) return n;
        return -1
    }, hc.increasingDirection = function (t) {
        for (var e = 0; e < Math.trunc(t.length / 2); e++) {
            var n = t.length - 1 - e, r = t[e].compareTo(t[n]);
            if (0 !== r) return r
        }
        return 1
    }, hc.compare = function (t, e) {
        for (var n = 0; n < t.length && n < e.length;) {
            var r = t[n].compareTo(e[n]);
            if (0 !== r) return r;
            n++
        }
        return n < e.length ? -1 : n < t.length ? 1 : 0
    }, hc.minCoordinate = function (t) {
        for (var e = null, n = 0; n < t.length; n++) (null === e || e.compareTo(t[n]) > 0) && (e = t[n]);
        return e
    }, hc.extract = function (t, e, n) {
        e = gl.clamp(e, 0, t.length);
        var r = (n = gl.clamp(n, -1, t.length)) - e + 1;
        n < 0 && (r = 0), e >= t.length && (r = 0), n < e && (r = 0);
        var i = new Array(r).fill(null);
        if (0 === r) return i;
        for (var o = 0, s = e; s <= n; s++) i[o++] = t[s];
        return i
    }, Object.defineProperties(hc, pc);
    var fc = function () {
    };
    fc.prototype.compare = function (t, e) {
        return hc.compare(t, e)
    }, fc.prototype.interfaces_ = function () {
        return [ol]
    }, fc.prototype.getClass = function () {
        return fc
    };
    var gc = function () {
    };
    gc.prototype.compare = function (t, e) {
        var n = t, r = e;
        if (n.length < r.length) return -1;
        if (n.length > r.length) return 1;
        if (0 === n.length) return 0;
        var i = hc.compare(n, r);
        return hc.isEqualReversed(n, r) ? 0 : i
    }, gc.prototype.OLDcompare = function (t, e) {
        var n = t, r = e;
        if (n.length < r.length) return -1;
        if (n.length > r.length) return 1;
        if (0 === n.length) return 0;
        for (var i = hc.increasingDirection(n), o = hc.increasingDirection(r), s = i > 0 ? 0 : n.length - 1, a = o > 0 ? 0 : n.length - 1, u = 0; u < n.length; u++) {
            var l = n[s].compareTo(r[a]);
            if (0 !== l) return l;
            s += i, a += o
        }
        return 0
    }, gc.prototype.interfaces_ = function () {
        return [ol]
    }, gc.prototype.getClass = function () {
        return gc
    };
    var dc = function () {
    };
    dc.prototype.get = function () {
    }, dc.prototype.put = function () {
    }, dc.prototype.size = function () {
    }, dc.prototype.values = function () {
    }, dc.prototype.entrySet = function () {
    };
    var yc = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e
    }(dc);

    function vc(t) {
        this.message = t || ""
    }

    function _c() {
    }

    vc.prototype = new Error, vc.prototype.name = "OperationNotSupported", _c.prototype = new rc, _c.prototype.contains = function () {
    };
    var mc = function (t) {
        function e() {
            t.call(this), this.array_ = [], arguments[0] instanceof rc && this.addAll(arguments[0])
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.contains = function (t) {
            for (var e = 0, n = this.array_.length; e < n; e++) {
                if (this.array_[e] === t) return !0
            }
            return !1
        }, e.prototype.add = function (t) {
            return !this.contains(t) && (this.array_.push(t), !0)
        }, e.prototype.addAll = function (t) {
            for (var e = t.iterator(); e.hasNext();) this.add(e.next());
            return !0
        }, e.prototype.remove = function (t) {
            throw new Error
        }, e.prototype.size = function () {
            return this.array_.length
        }, e.prototype.isEmpty = function () {
            return 0 === this.array_.length
        }, e.prototype.toArray = function () {
            for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
            return t
        }, e.prototype.iterator = function () {
            return new xc(this)
        }, e
    }(_c), xc = function (t) {
        function e(e) {
            t.call(this), this.hashSet_ = e, this.position_ = 0
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.next = function () {
            if (this.position_ === this.hashSet_.size()) throw new ac;
            return this.hashSet_.array_[this.position_++]
        }, e.prototype.hasNext = function () {
            return this.position_ < this.hashSet_.size()
        }, e.prototype.remove = function () {
            throw new vc
        }, e
    }(oc);

    function Ec(t) {
        return null === t ? 0 : t.color
    }

    function bc(t) {
        return null === t ? null : t.parent
    }

    function wc(t, e) {
        null !== t && (t.color = e)
    }

    function Ic(t) {
        return null === t ? null : t.left
    }

    function Nc(t) {
        return null === t ? null : t.right
    }

    function Sc() {
        this.root_ = null, this.size_ = 0
    }

    Sc.prototype = new yc, Sc.prototype.get = function (t) {
        for (var e = this.root_; null !== e;) {
            var n = t.compareTo(e.key);
            if (n < 0) e = e.left; else {
                if (!(n > 0)) return e.value;
                e = e.right
            }
        }
        return null
    }, Sc.prototype.put = function (t, e) {
        if (null === this.root_) return this.root_ = {
            key: t,
            value: e,
            left: null,
            right: null,
            parent: null,
            color: 0,
            getValue: function () {
                return this.value
            },
            getKey: function () {
                return this.key
            }
        }, this.size_ = 1, null;
        var n, r, i = this.root_;
        do {
            if (n = i, (r = t.compareTo(i.key)) < 0) i = i.left; else {
                if (!(r > 0)) {
                    var o = i.value;
                    return i.value = e, o
                }
                i = i.right
            }
        } while (null !== i);
        var s = {
            key: t, left: null, right: null, value: e, parent: n, color: 0, getValue: function () {
                return this.value
            }, getKey: function () {
                return this.key
            }
        };
        return r < 0 ? n.left = s : n.right = s, this.fixAfterInsertion(s), this.size_++, null
    }, Sc.prototype.fixAfterInsertion = function (t) {
        var e = this;
        for (t.color = 1; null != t && t !== this.root_ && 1 === t.parent.color;) if (bc(t) === Ic(bc(bc(t)))) {
            var n = Nc(bc(bc(t)));
            1 === Ec(n) ? (wc(bc(t), 0), wc(n, 0), wc(bc(bc(t)), 1), t = bc(bc(t))) : (t === Nc(bc(t)) && (t = bc(t), e.rotateLeft(t)), wc(bc(t), 0), wc(bc(bc(t)), 1), e.rotateRight(bc(bc(t))))
        } else {
            var r = Ic(bc(bc(t)));
            1 === Ec(r) ? (wc(bc(t), 0), wc(r, 0), wc(bc(bc(t)), 1), t = bc(bc(t))) : (t === Ic(bc(t)) && (t = bc(t), e.rotateRight(t)), wc(bc(t), 0), wc(bc(bc(t)), 1), e.rotateLeft(bc(bc(t))))
        }
        this.root_.color = 0
    }, Sc.prototype.values = function () {
        var t = new uc, e = this.getFirstEntry();
        if (null !== e) for (t.add(e.value); null !== (e = Sc.successor(e));) t.add(e.value);
        return t
    }, Sc.prototype.entrySet = function () {
        var t = new mc, e = this.getFirstEntry();
        if (null !== e) for (t.add(e); null !== (e = Sc.successor(e));) t.add(e);
        return t
    }, Sc.prototype.rotateLeft = function (t) {
        if (null != t) {
            var e = t.right;
            t.right = e.left, null != e.left && (e.left.parent = t), e.parent = t.parent, null === t.parent ? this.root_ = e : t.parent.left === t ? t.parent.left = e : t.parent.right = e, e.left = t, t.parent = e
        }
    }, Sc.prototype.rotateRight = function (t) {
        if (null != t) {
            var e = t.left;
            t.left = e.right, null != e.right && (e.right.parent = t), e.parent = t.parent, null === t.parent ? this.root_ = e : t.parent.right === t ? t.parent.right = e : t.parent.left = e, e.right = t, t.parent = e
        }
    }, Sc.prototype.getFirstEntry = function () {
        var t = this.root_;
        if (null != t) for (; null != t.left;) t = t.left;
        return t
    }, Sc.successor = function (t) {
        if (null === t) return null;
        if (null !== t.right) {
            for (var e = t.right; null !== e.left;) e = e.left;
            return e
        }
        for (var n = t.parent, r = t; null !== n && r === n.right;) r = n, n = n.parent;
        return n
    }, Sc.prototype.size = function () {
        return this.size_
    };
    var Cc = function () {
    };

    function Pc() {
    }

    function Lc() {
        this.array_ = [], arguments[0] instanceof rc && this.addAll(arguments[0])
    }

    Cc.prototype.interfaces_ = function () {
        return []
    }, Cc.prototype.getClass = function () {
        return Cc
    }, Pc.prototype = new _c, Lc.prototype = new Pc, Lc.prototype.contains = function (t) {
        for (var e = 0, n = this.array_.length; e < n; e++) {
            if (0 === this.array_[e].compareTo(t)) return !0
        }
        return !1
    }, Lc.prototype.add = function (t) {
        if (this.contains(t)) return !1;
        for (var e = 0, n = this.array_.length; e < n; e++) {
            if (1 === this.array_[e].compareTo(t)) return this.array_.splice(e, 0, t), !0
        }
        return this.array_.push(t), !0
    }, Lc.prototype.addAll = function (t) {
        for (var e = t.iterator(); e.hasNext();) this.add(e.next());
        return !0
    }, Lc.prototype.remove = function (t) {
        throw new vc
    }, Lc.prototype.size = function () {
        return this.array_.length
    }, Lc.prototype.isEmpty = function () {
        return 0 === this.array_.length
    }, Lc.prototype.toArray = function () {
        for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
        return t
    }, Lc.prototype.iterator = function () {
        return new Mc(this)
    };
    var Mc = function (t) {
        this.treeSet_ = t, this.position_ = 0
    };
    Mc.prototype.next = function () {
        if (this.position_ === this.treeSet_.size()) throw new ac;
        return this.treeSet_.array_[this.position_++]
    }, Mc.prototype.hasNext = function () {
        return this.position_ < this.treeSet_.size()
    }, Mc.prototype.remove = function () {
        throw new vc
    };
    var Oc = function () {
    };
    Oc.sort = function () {
        var t, e, n, r, i = arguments[0];
        if (1 === arguments.length) r = function (t, e) {
            return t.compareTo(e)
        }, i.sort(r); else if (2 === arguments.length) n = arguments[1], r = function (t, e) {
            return n.compare(t, e)
        }, i.sort(r); else if (3 === arguments.length) {
            (e = i.slice(arguments[1], arguments[2])).sort();
            var o = i.slice(0, arguments[1]).concat(e, i.slice(arguments[2], i.length));
            for (i.splice(0, i.length), t = 0; t < o.length; t++) i.push(o[t])
        } else if (4 === arguments.length) for (e = i.slice(arguments[1], arguments[2]), n = arguments[3], r = function (t, e) {
            return n.compare(t, e)
        }, e.sort(r), o = i.slice(0, arguments[1]).concat(e, i.slice(arguments[2], i.length)), i.splice(0, i.length), t = 0; t < o.length; t++) i.push(o[t])
    }, Oc.asList = function (t) {
        for (var e = new uc, n = 0, r = t.length; n < r; n++) e.add(t[n]);
        return e
    };
    var Rc = function () {
    }, Tc = {
        P: {configurable: !0},
        L: {configurable: !0},
        A: {configurable: !0},
        FALSE: {configurable: !0},
        TRUE: {configurable: !0},
        DONTCARE: {configurable: !0},
        SYM_FALSE: {configurable: !0},
        SYM_TRUE: {configurable: !0},
        SYM_DONTCARE: {configurable: !0},
        SYM_P: {configurable: !0},
        SYM_L: {configurable: !0},
        SYM_A: {configurable: !0}
    };
    Tc.P.get = function () {
        return 0
    }, Tc.L.get = function () {
        return 1
    }, Tc.A.get = function () {
        return 2
    }, Tc.FALSE.get = function () {
        return -1
    }, Tc.TRUE.get = function () {
        return -2
    }, Tc.DONTCARE.get = function () {
        return -3
    }, Tc.SYM_FALSE.get = function () {
        return "F"
    }, Tc.SYM_TRUE.get = function () {
        return "T"
    }, Tc.SYM_DONTCARE.get = function () {
        return "*"
    }, Tc.SYM_P.get = function () {
        return "0"
    }, Tc.SYM_L.get = function () {
        return "1"
    }, Tc.SYM_A.get = function () {
        return "2"
    }, Rc.prototype.interfaces_ = function () {
        return []
    }, Rc.prototype.getClass = function () {
        return Rc
    }, Rc.toDimensionSymbol = function (t) {
        switch (t) {
            case Rc.FALSE:
                return Rc.SYM_FALSE;
            case Rc.TRUE:
                return Rc.SYM_TRUE;
            case Rc.DONTCARE:
                return Rc.SYM_DONTCARE;
            case Rc.P:
                return Rc.SYM_P;
            case Rc.L:
                return Rc.SYM_L;
            case Rc.A:
                return Rc.SYM_A
        }
        throw new tl("Unknown dimension value: " + t)
    }, Rc.toDimensionValue = function (t) {
        switch (_l.toUpperCase(t)) {
            case Rc.SYM_FALSE:
                return Rc.FALSE;
            case Rc.SYM_TRUE:
                return Rc.TRUE;
            case Rc.SYM_DONTCARE:
                return Rc.DONTCARE;
            case Rc.SYM_P:
                return Rc.P;
            case Rc.SYM_L:
                return Rc.L;
            case Rc.SYM_A:
                return Rc.A
        }
        throw new tl("Unknown dimension symbol: " + t)
    }, Object.defineProperties(Rc, Tc);
    var Ac = function () {
    };
    Ac.prototype.filter = function (t) {
    }, Ac.prototype.interfaces_ = function () {
        return []
    }, Ac.prototype.getClass = function () {
        return Ac
    };
    var Dc = function () {
    };
    Dc.prototype.filter = function (t, e) {
    }, Dc.prototype.isDone = function () {
    }, Dc.prototype.isGeometryChanged = function () {
    }, Dc.prototype.interfaces_ = function () {
        return []
    }, Dc.prototype.getClass = function () {
        return Dc
    };
    var Fc = function (t) {
        function e(e, n) {
            if (t.call(this, n), this._geometries = e || [], t.hasNullElements(this._geometries)) throw new tl("geometries must not contain null elements")
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {serialVersionUID: {configurable: !0}};
        return e.prototype.computeEnvelopeInternal = function () {
            for (var t = new Ll, e = 0; e < this._geometries.length; e++) t.expandToInclude(this._geometries[e].getEnvelopeInternal());
            return t
        }, e.prototype.getGeometryN = function (t) {
            return this._geometries[t]
        }, e.prototype.getSortIndex = function () {
            return t.SORTINDEX_GEOMETRYCOLLECTION
        }, e.prototype.getCoordinates = function () {
            for (var t = new Array(this.getNumPoints()).fill(null), e = -1, n = 0; n < this._geometries.length; n++) for (var r = this._geometries[n].getCoordinates(), i = 0; i < r.length; i++) t[++e] = r[i];
            return t
        }, e.prototype.getArea = function () {
            for (var t = 0, e = 0; e < this._geometries.length; e++) t += this._geometries[e].getArea();
            return t
        }, e.prototype.equalsExact = function () {
            var e = this;
            if (2 === arguments.length) {
                var n = arguments[0], r = arguments[1];
                if (!this.isEquivalentClass(n)) return !1;
                var i = n;
                if (this._geometries.length !== i._geometries.length) return !1;
                for (var o = 0; o < this._geometries.length; o++) if (!e._geometries[o].equalsExact(i._geometries[o], r)) return !1;
                return !0
            }
            return t.prototype.equalsExact.apply(this, arguments)
        }, e.prototype.normalize = function () {
            for (var t = 0; t < this._geometries.length; t++) this._geometries[t].normalize();
            Oc.sort(this._geometries)
        }, e.prototype.getCoordinate = function () {
            return this.isEmpty() ? null : this._geometries[0].getCoordinate()
        }, e.prototype.getBoundaryDimension = function () {
            for (var t = Rc.FALSE, e = 0; e < this._geometries.length; e++) t = Math.max(t, this._geometries[e].getBoundaryDimension());
            return t
        }, e.prototype.getDimension = function () {
            for (var t = Rc.FALSE, e = 0; e < this._geometries.length; e++) t = Math.max(t, this._geometries[e].getDimension());
            return t
        }, e.prototype.getLength = function () {
            for (var t = 0, e = 0; e < this._geometries.length; e++) t += this._geometries[e].getLength();
            return t
        }, e.prototype.getNumPoints = function () {
            for (var t = 0, e = 0; e < this._geometries.length; e++) t += this._geometries[e].getNumPoints();
            return t
        }, e.prototype.getNumGeometries = function () {
            return this._geometries.length
        }, e.prototype.reverse = function () {
            for (var t = this._geometries.length, e = new Array(t).fill(null), n = 0; n < this._geometries.length; n++) e[n] = this._geometries[n].reverse();
            return this.getFactory().createGeometryCollection(e)
        }, e.prototype.compareToSameClass = function () {
            var t = this;
            if (1 === arguments.length) {
                var e = arguments[0], n = new Lc(Oc.asList(this._geometries)), r = new Lc(Oc.asList(e._geometries));
                return this.compare(n, r)
            }
            if (2 === arguments.length) {
                for (var i = arguments[0], o = arguments[1], s = i, a = this.getNumGeometries(), u = s.getNumGeometries(), l = 0; l < a && l < u;) {
                    var c = t.getGeometryN(l), h = s.getGeometryN(l), p = c.compareToSameClass(h, o);
                    if (0 !== p) return p;
                    l++
                }
                return l < a ? 1 : l < u ? -1 : 0
            }
        }, e.prototype.apply = function () {
            var t = this;
            if (fl(arguments[0], Zl)) for (var e = arguments[0], n = 0; n < this._geometries.length; n++) t._geometries[n].apply(e); else if (fl(arguments[0], Dc)) {
                var r = arguments[0];
                if (0 === this._geometries.length) return null;
                for (var i = 0; i < this._geometries.length && (t._geometries[i].apply(r), !r.isDone()); i++) ;
                r.isGeometryChanged() && this.geometryChanged()
            } else if (fl(arguments[0], Ac)) {
                var o = arguments[0];
                o.filter(this);
                for (var s = 0; s < this._geometries.length; s++) t._geometries[s].apply(o)
            } else if (fl(arguments[0], Yl)) {
                var a = arguments[0];
                a.filter(this);
                for (var u = 0; u < this._geometries.length; u++) t._geometries[u].apply(a)
            }
        }, e.prototype.getBoundary = function () {
            return this.checkNotGeometryCollection(this), Gl.shouldNeverReachHere(), null
        }, e.prototype.clone = function () {
            var e = t.prototype.clone.call(this);
            e._geometries = new Array(this._geometries.length).fill(null);
            for (var n = 0; n < this._geometries.length; n++) e._geometries[n] = this._geometries[n].clone();
            return e
        }, e.prototype.getGeometryType = function () {
            return "GeometryCollection"
        }, e.prototype.copy = function () {
            for (var t = new Array(this._geometries.length).fill(null), n = 0; n < t.length; n++) t[n] = this._geometries[n].copy();
            return new e(t, this._factory)
        }, e.prototype.isEmpty = function () {
            for (var t = 0; t < this._geometries.length; t++) if (!this._geometries[t].isEmpty()) return !1;
            return !0
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, n.serialVersionUID.get = function () {
            return -0x4f07bcb1f857d800
        }, Object.defineProperties(e, n), e
    }(Hl), kc = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {serialVersionUID: {configurable: !0}};
        return e.prototype.getSortIndex = function () {
            return Hl.SORTINDEX_MULTILINESTRING
        }, e.prototype.equalsExact = function () {
            if (2 === arguments.length) {
                var e = arguments[0], n = arguments[1];
                return !!this.isEquivalentClass(e) && t.prototype.equalsExact.call(this, e, n)
            }
            return t.prototype.equalsExact.apply(this, arguments)
        }, e.prototype.getBoundaryDimension = function () {
            return this.isClosed() ? Rc.FALSE : 0
        }, e.prototype.isClosed = function () {
            if (this.isEmpty()) return !1;
            for (var t = 0; t < this._geometries.length; t++) if (!this._geometries[t].isClosed()) return !1;
            return !0
        }, e.prototype.getDimension = function () {
            return 1
        }, e.prototype.reverse = function () {
            for (var t = this._geometries.length, e = new Array(t).fill(null), n = 0; n < this._geometries.length; n++) e[t - 1 - n] = this._geometries[n].reverse();
            return this.getFactory().createMultiLineString(e)
        }, e.prototype.getBoundary = function () {
            return new Gc(this).getBoundary()
        }, e.prototype.getGeometryType = function () {
            return "MultiLineString"
        }, e.prototype.copy = function () {
            for (var t = new Array(this._geometries.length).fill(null), n = 0; n < t.length; n++) t[n] = this._geometries[n].copy();
            return new e(t, this._factory)
        }, e.prototype.interfaces_ = function () {
            return [Cc]
        }, e.prototype.getClass = function () {
            return e
        }, n.serialVersionUID.get = function () {
            return 0x7155d2ab4afa8000
        }, Object.defineProperties(e, n), e
    }(Fc), Gc = function () {
        if (this._geom = null, this._geomFact = null, this._bnRule = null, this._endpointMap = null, 1 === arguments.length) {
            var t = arguments[0], e = Kl.MOD2_BOUNDARY_RULE;
            this._geom = t, this._geomFact = t.getFactory(), this._bnRule = e
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            this._geom = n, this._geomFact = n.getFactory(), this._bnRule = r
        }
    };
    Gc.prototype.boundaryMultiLineString = function (t) {
        if (this._geom.isEmpty()) return this.getEmptyMultiPoint();
        var e = this.computeBoundaryCoordinates(t);
        return 1 === e.length ? this._geomFact.createPoint(e[0]) : this._geomFact.createMultiPointFromCoords(e)
    }, Gc.prototype.getBoundary = function () {
        return this._geom instanceof Jc ? this.boundaryLineString(this._geom) : this._geom instanceof kc ? this.boundaryMultiLineString(this._geom) : this._geom.getBoundary()
    }, Gc.prototype.boundaryLineString = function (t) {
        return this._geom.isEmpty() ? this.getEmptyMultiPoint() : t.isClosed() ? this._bnRule.isInBoundary(2) ? t.getStartPoint() : this._geomFact.createMultiPoint() : this._geomFact.createMultiPoint([t.getStartPoint(), t.getEndPoint()])
    }, Gc.prototype.getEmptyMultiPoint = function () {
        return this._geomFact.createMultiPoint()
    }, Gc.prototype.computeBoundaryCoordinates = function (t) {
        var e = this, n = new uc;
        this._endpointMap = new Sc;
        for (var r = 0; r < t.getNumGeometries(); r++) {
            var i = t.getGeometryN(r);
            0 !== i.getNumPoints() && (e.addEndpoint(i.getCoordinateN(0)), e.addEndpoint(i.getCoordinateN(i.getNumPoints() - 1)))
        }
        for (var o = this._endpointMap.entrySet().iterator(); o.hasNext();) {
            var s = o.next(), a = s.getValue().count;
            e._bnRule.isInBoundary(a) && n.add(s.getKey())
        }
        return hc.toCoordinateArray(n)
    }, Gc.prototype.addEndpoint = function (t) {
        var e = this._endpointMap.get(t);
        null === e && (e = new qc, this._endpointMap.put(t, e)), e.count++
    }, Gc.prototype.interfaces_ = function () {
        return []
    }, Gc.prototype.getClass = function () {
        return Gc
    }, Gc.getBoundary = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = new Gc(t);
            return e.getBoundary()
        }
        if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = new Gc(n, r);
            return i.getBoundary()
        }
    };
    var qc = function () {
        this.count = null
    };

    function Bc() {
    }

    function zc() {
    }

    qc.prototype.interfaces_ = function () {
        return []
    }, qc.prototype.getClass = function () {
        return qc
    };
    var jc = function () {
    };

    function Uc() {
    }

    function Vc() {
    }

    function Xc() {
    }

    var Yc = function () {
    }, Hc = {NEWLINE: {configurable: !0}, SIMPLE_ORDINATE_FORMAT: {configurable: !0}};
    Yc.prototype.interfaces_ = function () {
        return []
    }, Yc.prototype.getClass = function () {
        return Yc
    }, Yc.chars = function (t, e) {
        for (var n = new Array(e).fill(null), r = 0; r < e; r++) n[r] = t;
        return String(n)
    }, Yc.getStackTrace = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = new Uc, n = new Bc(e);
            return t.printStackTrace(n), e.toString()
        }
        if (2 === arguments.length) {
            for (var r = arguments[0], i = arguments[1], o = "", s = new zc(Yc.getStackTrace(r)), a = new Xc(s), u = 0; u < i; u++) try {
                o += a.readLine() + Yc.NEWLINE
            } catch (t) {
                if (!(t instanceof Vc)) throw t;
                Gl.shouldNeverReachHere()
            }
            return o
        }
    }, Yc.split = function (t, e) {
        for (var n = e.length, r = new uc, i = "" + t, o = i.indexOf(e); o >= 0;) {
            var s = i.substring(0, o);
            r.add(s), o = (i = i.substring(o + n)).indexOf(e)
        }
        i.length > 0 && r.add(i);
        for (var a = new Array(r.size()).fill(null), u = 0; u < a.length; u++) a[u] = r.get(u);
        return a
    }, Yc.toString = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return Yc.SIMPLE_ORDINATE_FORMAT.format(t)
        }
    }, Yc.spaces = function (t) {
        return Yc.chars(" ", t)
    }, Hc.NEWLINE.get = function () {
        return Cl.getProperty("line.separator")
    }, Hc.SIMPLE_ORDINATE_FORMAT.get = function () {
        return new jc("0.#")
    }, Object.defineProperties(Yc, Hc);
    var Wc = function () {
    };
    Wc.prototype.interfaces_ = function () {
        return []
    }, Wc.prototype.getClass = function () {
        return Wc
    }, Wc.copyCoord = function (t, e, n, r) {
        for (var i = Math.min(t.getDimension(), n.getDimension()), o = 0; o < i; o++) n.setOrdinate(r, o, t.getOrdinate(e, o))
    }, Wc.isRing = function (t) {
        var e = t.size();
        return 0 === e || !(e <= 3) && (t.getOrdinate(0, wl.X) === t.getOrdinate(e - 1, wl.X) && t.getOrdinate(0, wl.Y) === t.getOrdinate(e - 1, wl.Y))
    }, Wc.isEqual = function (t, e) {
        var n = t.size();
        if (n !== e.size()) return !1;
        for (var r = Math.min(t.getDimension(), e.getDimension()), i = 0; i < n; i++) for (var o = 0; o < r; o++) {
            var s = t.getOrdinate(i, o), a = e.getOrdinate(i, o);
            if (t.getOrdinate(i, o) !== e.getOrdinate(i, o) && (!el.isNaN(s) || !el.isNaN(a))) return !1
        }
        return !0
    }, Wc.extend = function (t, e, n) {
        var r = t.create(n, e.getDimension()), i = e.size();
        if (Wc.copy(e, 0, r, 0, i), i > 0) for (var o = i; o < n; o++) Wc.copy(e, i - 1, r, o, 1);
        return r
    }, Wc.reverse = function (t) {
        for (var e = t.size() - 1, n = Math.trunc(e / 2), r = 0; r <= n; r++) Wc.swap(t, r, e - r)
    }, Wc.swap = function (t, e, n) {
        if (e === n) return null;
        for (var r = 0; r < t.getDimension(); r++) {
            var i = t.getOrdinate(e, r);
            t.setOrdinate(e, r, t.getOrdinate(n, r)), t.setOrdinate(n, r, i)
        }
    }, Wc.copy = function (t, e, n, r, i) {
        for (var o = 0; o < i; o++) Wc.copyCoord(t, e + o, n, r + o)
    }, Wc.toString = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = t.size();
            if (0 === e) return "()";
            var n = t.getDimension(), r = new yl;
            r.append("(");
            for (var i = 0; i < e; i++) {
                i > 0 && r.append(" ");
                for (var o = 0; o < n; o++) o > 0 && r.append(","), r.append(Yc.toString(t.getOrdinate(i, o)))
            }
            return r.append(")"), r.toString()
        }
    }, Wc.ensureValidRing = function (t, e) {
        var n = e.size();
        return 0 === n ? e : n <= 3 ? Wc.createClosedRing(t, e, 4) : e.getOrdinate(0, wl.X) === e.getOrdinate(n - 1, wl.X) && e.getOrdinate(0, wl.Y) === e.getOrdinate(n - 1, wl.Y) ? e : Wc.createClosedRing(t, e, n + 1)
    }, Wc.createClosedRing = function (t, e, n) {
        var r = t.create(n, e.getDimension()), i = e.size();
        Wc.copy(e, 0, r, 0, i);
        for (var o = i; o < n; o++) Wc.copy(e, 0, r, o, 1);
        return r
    };
    var Jc = function (t) {
        function e(e, n) {
            t.call(this, n), this._points = null, this.init(e)
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {serialVersionUID: {configurable: !0}};
        return e.prototype.computeEnvelopeInternal = function () {
            return this.isEmpty() ? new Ll : this._points.expandEnvelope(new Ll)
        }, e.prototype.isRing = function () {
            return this.isClosed() && this.isSimple()
        }, e.prototype.getSortIndex = function () {
            return t.SORTINDEX_LINESTRING
        }, e.prototype.getCoordinates = function () {
            return this._points.toCoordinateArray()
        }, e.prototype.equalsExact = function () {
            var e = this;
            if (2 === arguments.length) {
                var n = arguments[0], r = arguments[1];
                if (!this.isEquivalentClass(n)) return !1;
                var i = n;
                if (this._points.size() !== i._points.size()) return !1;
                for (var o = 0; o < this._points.size(); o++) if (!e.equal(e._points.getCoordinate(o), i._points.getCoordinate(o), r)) return !1;
                return !0
            }
            return t.prototype.equalsExact.apply(this, arguments)
        }, e.prototype.normalize = function () {
            for (var t = this, e = 0; e < Math.trunc(this._points.size() / 2); e++) {
                var n = t._points.size() - 1 - e;
                if (!t._points.getCoordinate(e).equals(t._points.getCoordinate(n))) return t._points.getCoordinate(e).compareTo(t._points.getCoordinate(n)) > 0 && Wc.reverse(t._points), null
            }
        }, e.prototype.getCoordinate = function () {
            return this.isEmpty() ? null : this._points.getCoordinate(0)
        }, e.prototype.getBoundaryDimension = function () {
            return this.isClosed() ? Rc.FALSE : 0
        }, e.prototype.isClosed = function () {
            return !this.isEmpty() && this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1))
        }, e.prototype.getEndPoint = function () {
            return this.isEmpty() ? null : this.getPointN(this.getNumPoints() - 1)
        }, e.prototype.getDimension = function () {
            return 1
        }, e.prototype.getLength = function () {
            return Vl.computeLength(this._points)
        }, e.prototype.getNumPoints = function () {
            return this._points.size()
        }, e.prototype.reverse = function () {
            var t = this._points.copy();
            return Wc.reverse(t), this.getFactory().createLineString(t)
        }, e.prototype.compareToSameClass = function () {
            var t = this;
            if (1 === arguments.length) {
                for (var e = arguments[0], n = e, r = 0, i = 0; r < this._points.size() && i < n._points.size();) {
                    var o = t._points.getCoordinate(r).compareTo(n._points.getCoordinate(i));
                    if (0 !== o) return o;
                    r++, i++
                }
                return r < this._points.size() ? 1 : i < n._points.size() ? -1 : 0
            }
            if (2 === arguments.length) {
                var s = arguments[0], a = arguments[1], u = s;
                return a.compare(this._points, u._points)
            }
        }, e.prototype.apply = function () {
            var t = this;
            if (fl(arguments[0], Zl)) for (var e = arguments[0], n = 0; n < this._points.size(); n++) e.filter(t._points.getCoordinate(n)); else if (fl(arguments[0], Dc)) {
                var r = arguments[0];
                if (0 === this._points.size()) return null;
                for (var i = 0; i < this._points.size() && (r.filter(t._points, i), !r.isDone()); i++) ;
                r.isGeometryChanged() && this.geometryChanged()
            } else if (fl(arguments[0], Ac)) {
                var o = arguments[0];
                o.filter(this)
            } else if (fl(arguments[0], Yl)) {
                var s = arguments[0];
                s.filter(this)
            }
        }, e.prototype.getBoundary = function () {
            return new Gc(this).getBoundary()
        }, e.prototype.isEquivalentClass = function (t) {
            return t instanceof e
        }, e.prototype.clone = function () {
            var e = t.prototype.clone.call(this);
            return e._points = this._points.clone(), e
        }, e.prototype.getCoordinateN = function (t) {
            return this._points.getCoordinate(t)
        }, e.prototype.getGeometryType = function () {
            return "LineString"
        }, e.prototype.copy = function () {
            return new e(this._points.copy(), this._factory)
        }, e.prototype.getCoordinateSequence = function () {
            return this._points
        }, e.prototype.isEmpty = function () {
            return 0 === this._points.size()
        }, e.prototype.init = function (t) {
            if (null === t && (t = this.getFactory().getCoordinateSequenceFactory().create([])), 1 === t.size()) throw new tl("Invalid number of points in LineString (found " + t.size() + " - must be 0 or >= 2)");
            this._points = t
        }, e.prototype.isCoordinate = function (t) {
            for (var e = 0; e < this._points.size(); e++) if (this._points.getCoordinate(e).equals(t)) return !0;
            return !1
        }, e.prototype.getStartPoint = function () {
            return this.isEmpty() ? null : this.getPointN(0)
        }, e.prototype.getPointN = function (t) {
            return this.getFactory().createPoint(this._points.getCoordinate(t))
        }, e.prototype.interfaces_ = function () {
            return [Cc]
        }, e.prototype.getClass = function () {
            return e
        }, n.serialVersionUID.get = function () {
            return 0x2b2b51ba435c8e00
        }, Object.defineProperties(e, n), e
    }(Hl), Zc = function () {
    };
    Zc.prototype.interfaces_ = function () {
        return []
    }, Zc.prototype.getClass = function () {
        return Zc
    };
    var Kc = function (t) {
        function e(e, n) {
            t.call(this, n), this._coordinates = e || null, this.init(this._coordinates)
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {serialVersionUID: {configurable: !0}};
        return e.prototype.computeEnvelopeInternal = function () {
            if (this.isEmpty()) return new Ll;
            var t = new Ll;
            return t.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0)), t
        }, e.prototype.getSortIndex = function () {
            return t.SORTINDEX_POINT
        }, e.prototype.getCoordinates = function () {
            return this.isEmpty() ? [] : [this.getCoordinate()]
        }, e.prototype.equalsExact = function () {
            if (2 === arguments.length) {
                var e = arguments[0], n = arguments[1];
                return !!this.isEquivalentClass(e) && (!(!this.isEmpty() || !e.isEmpty()) || this.isEmpty() === e.isEmpty() && this.equal(e.getCoordinate(), this.getCoordinate(), n))
            }
            return t.prototype.equalsExact.apply(this, arguments)
        }, e.prototype.normalize = function () {
        }, e.prototype.getCoordinate = function () {
            return 0 !== this._coordinates.size() ? this._coordinates.getCoordinate(0) : null
        }, e.prototype.getBoundaryDimension = function () {
            return Rc.FALSE
        }, e.prototype.getDimension = function () {
            return 0
        }, e.prototype.getNumPoints = function () {
            return this.isEmpty() ? 0 : 1
        }, e.prototype.reverse = function () {
            return this.copy()
        }, e.prototype.getX = function () {
            if (null === this.getCoordinate()) throw new Error("getX called on empty Point");
            return this.getCoordinate().x
        }, e.prototype.compareToSameClass = function () {
            if (1 === arguments.length) {
                var t = arguments[0], e = t;
                return this.getCoordinate().compareTo(e.getCoordinate())
            }
            if (2 === arguments.length) {
                var n = arguments[0], r = arguments[1], i = n;
                return r.compare(this._coordinates, i._coordinates)
            }
        }, e.prototype.apply = function () {
            if (fl(arguments[0], Zl)) {
                var t = arguments[0];
                if (this.isEmpty()) return null;
                t.filter(this.getCoordinate())
            } else if (fl(arguments[0], Dc)) {
                var e = arguments[0];
                if (this.isEmpty()) return null;
                e.filter(this._coordinates, 0), e.isGeometryChanged() && this.geometryChanged()
            } else if (fl(arguments[0], Ac)) {
                var n = arguments[0];
                n.filter(this)
            } else if (fl(arguments[0], Yl)) {
                var r = arguments[0];
                r.filter(this)
            }
        }, e.prototype.getBoundary = function () {
            return this.getFactory().createGeometryCollection(null)
        }, e.prototype.clone = function () {
            var e = t.prototype.clone.call(this);
            return e._coordinates = this._coordinates.clone(), e
        }, e.prototype.getGeometryType = function () {
            return "Point"
        }, e.prototype.copy = function () {
            return new e(this._coordinates.copy(), this._factory)
        }, e.prototype.getCoordinateSequence = function () {
            return this._coordinates
        }, e.prototype.getY = function () {
            if (null === this.getCoordinate()) throw new Error("getY called on empty Point");
            return this.getCoordinate().y
        }, e.prototype.isEmpty = function () {
            return 0 === this._coordinates.size()
        }, e.prototype.init = function (t) {
            null === t && (t = this.getFactory().getCoordinateSequenceFactory().create([])), Gl.isTrue(t.size() <= 1), this._coordinates = t
        }, e.prototype.isSimple = function () {
            return !0
        }, e.prototype.interfaces_ = function () {
            return [Zc]
        }, e.prototype.getClass = function () {
            return e
        }, n.serialVersionUID.get = function () {
            return 0x44077bad161cbc00
        }, Object.defineProperties(e, n), e
    }(Hl), Qc = function () {
    };
    Qc.prototype.interfaces_ = function () {
        return []
    }, Qc.prototype.getClass = function () {
        return Qc
    };
    var $c = function (t) {
        function e(e, n, r) {
            if (t.call(this, r), this._shell = null, this._holes = null, null === e && (e = this.getFactory().createLinearRing()), null === n && (n = []), t.hasNullElements(n)) throw new tl("holes must not contain null elements");
            if (e.isEmpty() && t.hasNonEmptyElements(n)) throw new tl("shell is empty but holes are not");
            this._shell = e, this._holes = n
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {serialVersionUID: {configurable: !0}};
        return e.prototype.computeEnvelopeInternal = function () {
            return this._shell.getEnvelopeInternal()
        }, e.prototype.getSortIndex = function () {
            return t.SORTINDEX_POLYGON
        }, e.prototype.getCoordinates = function () {
            if (this.isEmpty()) return [];
            for (var t = new Array(this.getNumPoints()).fill(null), e = -1, n = this._shell.getCoordinates(), r = 0; r < n.length; r++) t[++e] = n[r];
            for (var i = 0; i < this._holes.length; i++) for (var o = this._holes[i].getCoordinates(), s = 0; s < o.length; s++) t[++e] = o[s];
            return t
        }, e.prototype.getArea = function () {
            var t = 0;
            t += Math.abs(Vl.signedArea(this._shell.getCoordinateSequence()));
            for (var e = 0; e < this._holes.length; e++) t -= Math.abs(Vl.signedArea(this._holes[e].getCoordinateSequence()));
            return t
        }, e.prototype.isRectangle = function () {
            if (0 !== this.getNumInteriorRing()) return !1;
            if (null === this._shell) return !1;
            if (5 !== this._shell.getNumPoints()) return !1;
            for (var t = this._shell.getCoordinateSequence(), e = this.getEnvelopeInternal(), n = 0; n < 5; n++) {
                var r = t.getX(n);
                if (r !== e.getMinX() && r !== e.getMaxX()) return !1;
                var i = t.getY(n);
                if (i !== e.getMinY() && i !== e.getMaxY()) return !1
            }
            for (var o = t.getX(0), s = t.getY(0), a = 1; a <= 4; a++) {
                var u = t.getX(a), l = t.getY(a);
                if (u !== o === (l !== s)) return !1;
                o = u, s = l
            }
            return !0
        }, e.prototype.equalsExact = function () {
            var e = this;
            if (2 === arguments.length) {
                var n = arguments[0], r = arguments[1];
                if (!this.isEquivalentClass(n)) return !1;
                var i = n, o = this._shell, s = i._shell;
                if (!o.equalsExact(s, r)) return !1;
                if (this._holes.length !== i._holes.length) return !1;
                for (var a = 0; a < this._holes.length; a++) if (!e._holes[a].equalsExact(i._holes[a], r)) return !1;
                return !0
            }
            return t.prototype.equalsExact.apply(this, arguments)
        }, e.prototype.normalize = function () {
            var t = this;
            if (0 === arguments.length) {
                this.normalize(this._shell, !0);
                for (var e = 0; e < this._holes.length; e++) t.normalize(t._holes[e], !1);
                Oc.sort(this._holes)
            } else if (2 === arguments.length) {
                var n = arguments[0], r = arguments[1];
                if (n.isEmpty()) return null;
                var i = new Array(n.getCoordinates().length - 1).fill(null);
                Cl.arraycopy(n.getCoordinates(), 0, i, 0, i.length);
                var o = hc.minCoordinate(n.getCoordinates());
                hc.scroll(i, o), Cl.arraycopy(i, 0, n.getCoordinates(), 0, i.length), n.getCoordinates()[i.length] = i[0], Vl.isCCW(n.getCoordinates()) === r && hc.reverse(n.getCoordinates())
            }
        }, e.prototype.getCoordinate = function () {
            return this._shell.getCoordinate()
        }, e.prototype.getNumInteriorRing = function () {
            return this._holes.length
        }, e.prototype.getBoundaryDimension = function () {
            return 1
        }, e.prototype.getDimension = function () {
            return 2
        }, e.prototype.getLength = function () {
            var t = 0;
            t += this._shell.getLength();
            for (var e = 0; e < this._holes.length; e++) t += this._holes[e].getLength();
            return t
        }, e.prototype.getNumPoints = function () {
            for (var t = this._shell.getNumPoints(), e = 0; e < this._holes.length; e++) t += this._holes[e].getNumPoints();
            return t
        }, e.prototype.reverse = function () {
            var t = this.copy();
            t._shell = this._shell.copy().reverse(), t._holes = new Array(this._holes.length).fill(null);
            for (var e = 0; e < this._holes.length; e++) t._holes[e] = this._holes[e].copy().reverse();
            return t
        }, e.prototype.convexHull = function () {
            return this.getExteriorRing().convexHull()
        }, e.prototype.compareToSameClass = function () {
            var t = this;
            if (1 === arguments.length) {
                var e = arguments[0], n = this._shell, r = e._shell;
                return n.compareToSameClass(r)
            }
            if (2 === arguments.length) {
                var i = arguments[0], o = arguments[1], s = i, a = this._shell, u = s._shell,
                    l = a.compareToSameClass(u, o);
                if (0 !== l) return l;
                for (var c = this.getNumInteriorRing(), h = s.getNumInteriorRing(), p = 0; p < c && p < h;) {
                    var f = t.getInteriorRingN(p), g = s.getInteriorRingN(p), d = f.compareToSameClass(g, o);
                    if (0 !== d) return d;
                    p++
                }
                return p < c ? 1 : p < h ? -1 : 0
            }
        }, e.prototype.apply = function (t) {
            var e = this;
            if (fl(t, Zl)) {
                this._shell.apply(t);
                for (var n = 0; n < this._holes.length; n++) e._holes[n].apply(t)
            } else if (fl(t, Dc)) {
                if (this._shell.apply(t), !t.isDone()) for (var r = 0; r < this._holes.length && (e._holes[r].apply(t), !t.isDone()); r++) ;
                t.isGeometryChanged() && this.geometryChanged()
            } else if (fl(t, Ac)) t.filter(this); else if (fl(t, Yl)) {
                t.filter(this), this._shell.apply(t);
                for (var i = 0; i < this._holes.length; i++) e._holes[i].apply(t)
            }
        }, e.prototype.getBoundary = function () {
            if (this.isEmpty()) return this.getFactory().createMultiLineString();
            var t = new Array(this._holes.length + 1).fill(null);
            t[0] = this._shell;
            for (var e = 0; e < this._holes.length; e++) t[e + 1] = this._holes[e];
            return t.length <= 1 ? this.getFactory().createLinearRing(t[0].getCoordinateSequence()) : this.getFactory().createMultiLineString(t)
        }, e.prototype.clone = function () {
            var e = t.prototype.clone.call(this);
            e._shell = this._shell.clone(), e._holes = new Array(this._holes.length).fill(null);
            for (var n = 0; n < this._holes.length; n++) e._holes[n] = this._holes[n].clone();
            return e
        }, e.prototype.getGeometryType = function () {
            return "Polygon"
        }, e.prototype.copy = function () {
            for (var t = this._shell.copy(), n = new Array(this._holes.length).fill(null), r = 0; r < n.length; r++) n[r] = this._holes[r].copy();
            return new e(t, n, this._factory)
        }, e.prototype.getExteriorRing = function () {
            return this._shell
        }, e.prototype.isEmpty = function () {
            return this._shell.isEmpty()
        }, e.prototype.getInteriorRingN = function (t) {
            return this._holes[t]
        }, e.prototype.interfaces_ = function () {
            return [Qc]
        }, e.prototype.getClass = function () {
            return e
        }, n.serialVersionUID.get = function () {
            return -0x307ffefd8dc97200
        }, Object.defineProperties(e, n), e
    }(Hl), th = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {serialVersionUID: {configurable: !0}};
        return e.prototype.getSortIndex = function () {
            return Hl.SORTINDEX_MULTIPOINT
        }, e.prototype.isValid = function () {
            return !0
        }, e.prototype.equalsExact = function () {
            if (2 === arguments.length) {
                var e = arguments[0], n = arguments[1];
                return !!this.isEquivalentClass(e) && t.prototype.equalsExact.call(this, e, n)
            }
            return t.prototype.equalsExact.apply(this, arguments)
        }, e.prototype.getCoordinate = function () {
            if (1 === arguments.length) {
                var e = arguments[0];
                return this._geometries[e].getCoordinate()
            }
            return t.prototype.getCoordinate.apply(this, arguments)
        }, e.prototype.getBoundaryDimension = function () {
            return Rc.FALSE
        }, e.prototype.getDimension = function () {
            return 0
        }, e.prototype.getBoundary = function () {
            return this.getFactory().createGeometryCollection(null)
        }, e.prototype.getGeometryType = function () {
            return "MultiPoint"
        }, e.prototype.copy = function () {
            for (var t = new Array(this._geometries.length).fill(null), n = 0; n < t.length; n++) t[n] = this._geometries[n].copy();
            return new e(t, this._factory)
        }, e.prototype.interfaces_ = function () {
            return [Zc]
        }, e.prototype.getClass = function () {
            return e
        }, n.serialVersionUID.get = function () {
            return -0x6fb1ed4162e0fc00
        }, Object.defineProperties(e, n), e
    }(Fc), eh = function (t) {
        function e(e, n) {
            e instanceof al && n instanceof vh && (e = n.getCoordinateSequenceFactory().create(e)), t.call(this, e, n), this.validateConstruction()
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {MINIMUM_VALID_SIZE: {configurable: !0}, serialVersionUID: {configurable: !0}};
        return e.prototype.getSortIndex = function () {
            return Hl.SORTINDEX_LINEARRING
        }, e.prototype.getBoundaryDimension = function () {
            return Rc.FALSE
        }, e.prototype.isClosed = function () {
            return !!this.isEmpty() || t.prototype.isClosed.call(this)
        }, e.prototype.reverse = function () {
            var t = this._points.copy();
            return Wc.reverse(t), this.getFactory().createLinearRing(t)
        }, e.prototype.validateConstruction = function () {
            if (!this.isEmpty() && !t.prototype.isClosed.call(this)) throw new tl("Points of LinearRing do not form a closed linestring");
            if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < e.MINIMUM_VALID_SIZE) throw new tl("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)")
        }, e.prototype.getGeometryType = function () {
            return "LinearRing"
        }, e.prototype.copy = function () {
            return new e(this._points.copy(), this._factory)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, n.MINIMUM_VALID_SIZE.get = function () {
            return 4
        }, n.serialVersionUID.get = function () {
            return -0x3b229e262367a600
        }, Object.defineProperties(e, n), e
    }(Jc), nh = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {serialVersionUID: {configurable: !0}};
        return e.prototype.getSortIndex = function () {
            return Hl.SORTINDEX_MULTIPOLYGON
        }, e.prototype.equalsExact = function () {
            if (2 === arguments.length) {
                var e = arguments[0], n = arguments[1];
                return !!this.isEquivalentClass(e) && t.prototype.equalsExact.call(this, e, n)
            }
            return t.prototype.equalsExact.apply(this, arguments)
        }, e.prototype.getBoundaryDimension = function () {
            return 1
        }, e.prototype.getDimension = function () {
            return 2
        }, e.prototype.reverse = function () {
            for (var t = this._geometries.length, e = new Array(t).fill(null), n = 0; n < this._geometries.length; n++) e[n] = this._geometries[n].reverse();
            return this.getFactory().createMultiPolygon(e)
        }, e.prototype.getBoundary = function () {
            if (this.isEmpty()) return this.getFactory().createMultiLineString();
            for (var t = new uc, e = 0; e < this._geometries.length; e++) for (var n = this._geometries[e].getBoundary(), r = 0; r < n.getNumGeometries(); r++) t.add(n.getGeometryN(r));
            var i = new Array(t.size()).fill(null);
            return this.getFactory().createMultiLineString(t.toArray(i))
        }, e.prototype.getGeometryType = function () {
            return "MultiPolygon"
        }, e.prototype.copy = function () {
            for (var t = new Array(this._geometries.length).fill(null), n = 0; n < t.length; n++) t[n] = this._geometries[n].copy();
            return new e(t, this._factory)
        }, e.prototype.interfaces_ = function () {
            return [Qc]
        }, e.prototype.getClass = function () {
            return e
        }, n.serialVersionUID.get = function () {
            return -0x7a5aa1369171980
        }, Object.defineProperties(e, n), e
    }(Fc), rh = function (t) {
        this._factory = t || null, this._isUserDataCopied = !1
    }, ih = {
        NoOpGeometryOperation: {configurable: !0},
        CoordinateOperation: {configurable: !0},
        CoordinateSequenceOperation: {configurable: !0}
    };
    rh.prototype.setCopyUserData = function (t) {
        this._isUserDataCopied = t
    }, rh.prototype.edit = function (t, e) {
        if (null === t) return null;
        var n = this.editInternal(t, e);
        return this._isUserDataCopied && n.setUserData(t.getUserData()), n
    }, rh.prototype.editInternal = function (t, e) {
        return null === this._factory && (this._factory = t.getFactory()), t instanceof Fc ? this.editGeometryCollection(t, e) : t instanceof $c ? this.editPolygon(t, e) : t instanceof Kc || t instanceof Jc ? e.edit(t, this._factory) : (Gl.shouldNeverReachHere("Unsupported Geometry class: " + t.getClass().getName()), null)
    }, rh.prototype.editGeometryCollection = function (t, e) {
        for (var n = e.edit(t, this._factory), r = new uc, i = 0; i < n.getNumGeometries(); i++) {
            var o = this.edit(n.getGeometryN(i), e);
            null === o || o.isEmpty() || r.add(o)
        }
        return n.getClass() === th ? this._factory.createMultiPoint(r.toArray([])) : n.getClass() === kc ? this._factory.createMultiLineString(r.toArray([])) : n.getClass() === nh ? this._factory.createMultiPolygon(r.toArray([])) : this._factory.createGeometryCollection(r.toArray([]))
    }, rh.prototype.editPolygon = function (t, e) {
        var n = e.edit(t, this._factory);
        if (null === n && (n = this._factory.createPolygon(null)), n.isEmpty()) return n;
        var r = this.edit(n.getExteriorRing(), e);
        if (null === r || r.isEmpty()) return this._factory.createPolygon();
        for (var i = new uc, o = 0; o < n.getNumInteriorRing(); o++) {
            var s = this.edit(n.getInteriorRingN(o), e);
            null === s || s.isEmpty() || i.add(s)
        }
        return this._factory.createPolygon(r, i.toArray([]))
    }, rh.prototype.interfaces_ = function () {
        return []
    }, rh.prototype.getClass = function () {
        return rh
    }, rh.GeometryEditorOperation = function () {
    }, ih.NoOpGeometryOperation.get = function () {
        return oh
    }, ih.CoordinateOperation.get = function () {
        return sh
    }, ih.CoordinateSequenceOperation.get = function () {
        return ah
    }, Object.defineProperties(rh, ih);
    var oh = function () {
    };
    oh.prototype.edit = function (t, e) {
        return t
    }, oh.prototype.interfaces_ = function () {
        return [rh.GeometryEditorOperation]
    }, oh.prototype.getClass = function () {
        return oh
    };
    var sh = function () {
    };
    sh.prototype.edit = function (t, e) {
        var n = this.editCoordinates(t.getCoordinates(), t);
        return null === n ? t : t instanceof eh ? e.createLinearRing(n) : t instanceof Jc ? e.createLineString(n) : t instanceof Kc ? n.length > 0 ? e.createPoint(n[0]) : e.createPoint() : t
    }, sh.prototype.interfaces_ = function () {
        return [rh.GeometryEditorOperation]
    }, sh.prototype.getClass = function () {
        return sh
    };
    var ah = function () {
    };
    ah.prototype.edit = function (t, e) {
        return t instanceof eh ? e.createLinearRing(this.edit(t.getCoordinateSequence(), t)) : t instanceof Jc ? e.createLineString(this.edit(t.getCoordinateSequence(), t)) : t instanceof Kc ? e.createPoint(this.edit(t.getCoordinateSequence(), t)) : t
    }, ah.prototype.interfaces_ = function () {
        return [rh.GeometryEditorOperation]
    }, ah.prototype.getClass = function () {
        return ah
    };
    var uh = function () {
        var t = this;
        if (this._dimension = 3, this._coordinates = null, 1 === arguments.length) {
            if (arguments[0] instanceof Array) this._coordinates = arguments[0], this._dimension = 3; else if (Number.isInteger(arguments[0])) {
                var e = arguments[0];
                this._coordinates = new Array(e).fill(null);
                for (var n = 0; n < e; n++) t._coordinates[n] = new al
            } else if (fl(arguments[0], wl)) {
                var r = arguments[0];
                if (null === r) return this._coordinates = new Array(0).fill(null), null;
                this._dimension = r.getDimension(), this._coordinates = new Array(r.size()).fill(null);
                for (var i = 0; i < this._coordinates.length; i++) t._coordinates[i] = r.getCoordinateCopy(i)
            }
        } else if (2 === arguments.length) if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
            var o = arguments[0], s = arguments[1];
            this._coordinates = o, this._dimension = s, null === o && (this._coordinates = new Array(0).fill(null))
        } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
            var a = arguments[0], u = arguments[1];
            this._coordinates = new Array(a).fill(null), this._dimension = u;
            for (var l = 0; l < a; l++) t._coordinates[l] = new al
        }
    }, lh = {serialVersionUID: {configurable: !0}};
    uh.prototype.setOrdinate = function (t, e, n) {
        switch (e) {
            case wl.X:
                this._coordinates[t].x = n;
                break;
            case wl.Y:
                this._coordinates[t].y = n;
                break;
            case wl.Z:
                this._coordinates[t].z = n;
                break;
            default:
                throw new tl("invalid ordinateIndex")
        }
    }, uh.prototype.size = function () {
        return this._coordinates.length
    }, uh.prototype.getOrdinate = function (t, e) {
        switch (e) {
            case wl.X:
                return this._coordinates[t].x;
            case wl.Y:
                return this._coordinates[t].y;
            case wl.Z:
                return this._coordinates[t].z
        }
        return el.NaN
    }, uh.prototype.getCoordinate = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return this._coordinates[t]
        }
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            n.x = this._coordinates[e].x, n.y = this._coordinates[e].y, n.z = this._coordinates[e].z
        }
    }, uh.prototype.getCoordinateCopy = function (t) {
        return new al(this._coordinates[t])
    }, uh.prototype.getDimension = function () {
        return this._dimension
    }, uh.prototype.getX = function (t) {
        return this._coordinates[t].x
    }, uh.prototype.clone = function () {
        for (var t = new Array(this.size()).fill(null), e = 0; e < this._coordinates.length; e++) t[e] = this._coordinates[e].clone();
        return new uh(t, this._dimension)
    }, uh.prototype.expandEnvelope = function (t) {
        for (var e = 0; e < this._coordinates.length; e++) t.expandToInclude(this._coordinates[e]);
        return t
    }, uh.prototype.copy = function () {
        for (var t = new Array(this.size()).fill(null), e = 0; e < this._coordinates.length; e++) t[e] = this._coordinates[e].copy();
        return new uh(t, this._dimension)
    }, uh.prototype.toString = function () {
        if (this._coordinates.length > 0) {
            var t = new yl(17 * this._coordinates.length);
            t.append("("), t.append(this._coordinates[0]);
            for (var e = 1; e < this._coordinates.length; e++) t.append(", "), t.append(this._coordinates[e]);
            return t.append(")"), t.toString()
        }
        return "()"
    }, uh.prototype.getY = function (t) {
        return this._coordinates[t].y
    }, uh.prototype.toCoordinateArray = function () {
        return this._coordinates
    }, uh.prototype.interfaces_ = function () {
        return [wl, sl]
    }, uh.prototype.getClass = function () {
        return uh
    }, lh.serialVersionUID.get = function () {
        return -0xcb44a778db18e00
    }, Object.defineProperties(uh, lh);
    var ch = function () {
    }, hh = {serialVersionUID: {configurable: !0}, instanceObject: {configurable: !0}};
    ch.prototype.readResolve = function () {
        return ch.instance()
    }, ch.prototype.create = function () {
        if (1 === arguments.length) {
            if (arguments[0] instanceof Array) {
                var t = arguments[0];
                return new uh(t)
            }
            if (fl(arguments[0], wl)) {
                var e = arguments[0];
                return new uh(e)
            }
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            return r > 3 && (r = 3), r < 2 ? new uh(n) : new uh(n, r)
        }
    }, ch.prototype.interfaces_ = function () {
        return [cl, sl]
    }, ch.prototype.getClass = function () {
        return ch
    }, ch.instance = function () {
        return ch.instanceObject
    }, hh.serialVersionUID.get = function () {
        return -0x38e49fa6cf6f2e00
    }, hh.instanceObject.get = function () {
        return new ch
    }, Object.defineProperties(ch, hh);
    var ph = function (t) {
        function e() {
            t.call(this), this.map_ = new Map
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function (t) {
            return this.map_.get(t) || null
        }, e.prototype.put = function (t, e) {
            return this.map_.set(t, e), e
        }, e.prototype.values = function () {
            for (var t = new uc, e = this.map_.values(), n = e.next(); !n.done;) t.add(n.value), n = e.next();
            return t
        }, e.prototype.entrySet = function () {
            var t = new mc;
            return this.map_.entries().forEach((function (e) {
                return t.add(e)
            })), t
        }, e.prototype.size = function () {
            return this.map_.size()
        }, e
    }(dc), fh = function t() {
        if (this._modelType = null, this._scale = null, 0 === arguments.length) this._modelType = t.FLOATING; else if (1 === arguments.length) if (arguments[0] instanceof dh) {
            var e = arguments[0];
            this._modelType = e, e === t.FIXED && this.setScale(1)
        } else if ("number" == typeof arguments[0]) {
            var n = arguments[0];
            this._modelType = t.FIXED, this.setScale(n)
        } else if (arguments[0] instanceof t) {
            var r = arguments[0];
            this._modelType = r._modelType, this._scale = r._scale
        }
    }, gh = {serialVersionUID: {configurable: !0}, maximumPreciseValue: {configurable: !0}};
    fh.prototype.equals = function (t) {
        if (!(t instanceof fh)) return !1;
        var e = t;
        return this._modelType === e._modelType && this._scale === e._scale
    }, fh.prototype.compareTo = function (t) {
        var e = t, n = this.getMaximumSignificantDigits(), r = e.getMaximumSignificantDigits();
        return new vl(n).compareTo(new vl(r))
    }, fh.prototype.getScale = function () {
        return this._scale
    }, fh.prototype.isFloating = function () {
        return this._modelType === fh.FLOATING || this._modelType === fh.FLOATING_SINGLE
    }, fh.prototype.getType = function () {
        return this._modelType
    }, fh.prototype.toString = function () {
        var t = "UNKNOWN";
        return this._modelType === fh.FLOATING ? t = "Floating" : this._modelType === fh.FLOATING_SINGLE ? t = "Floating-Single" : this._modelType === fh.FIXED && (t = "Fixed (Scale=" + this.getScale() + ")"), t
    }, fh.prototype.makePrecise = function () {
        if ("number" == typeof arguments[0]) {
            var t = arguments[0];
            if (el.isNaN(t)) return t;
            if (this._modelType === fh.FLOATING_SINGLE) {
                return t
            }
            return this._modelType === fh.FIXED ? Math.round(t * this._scale) / this._scale : t
        }
        if (arguments[0] instanceof al) {
            var e = arguments[0];
            if (this._modelType === fh.FLOATING) return null;
            e.x = this.makePrecise(e.x), e.y = this.makePrecise(e.y)
        }
    }, fh.prototype.getMaximumSignificantDigits = function () {
        var t = 16;
        return this._modelType === fh.FLOATING ? t = 16 : this._modelType === fh.FLOATING_SINGLE ? t = 6 : this._modelType === fh.FIXED && (t = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)))), t
    }, fh.prototype.setScale = function (t) {
        this._scale = Math.abs(t)
    }, fh.prototype.interfaces_ = function () {
        return [sl, rl]
    }, fh.prototype.getClass = function () {
        return fh
    }, fh.mostPrecise = function (t, e) {
        return t.compareTo(e) >= 0 ? t : e
    }, gh.serialVersionUID.get = function () {
        return 0x6bee6404e9a25c00
    }, gh.maximumPreciseValue.get = function () {
        return 9007199254740992
    }, Object.defineProperties(fh, gh);
    var dh = function t(e) {
        this._name = e || null, t.nameToTypeMap.put(e, this)
    }, yh = {serialVersionUID: {configurable: !0}, nameToTypeMap: {configurable: !0}};
    dh.prototype.readResolve = function () {
        return dh.nameToTypeMap.get(this._name)
    }, dh.prototype.toString = function () {
        return this._name
    }, dh.prototype.interfaces_ = function () {
        return [sl]
    }, dh.prototype.getClass = function () {
        return dh
    }, yh.serialVersionUID.get = function () {
        return -552860263173159e4
    }, yh.nameToTypeMap.get = function () {
        return new ph
    }, Object.defineProperties(dh, yh), fh.Type = dh, fh.FIXED = new dh("FIXED"), fh.FLOATING = new dh("FLOATING"), fh.FLOATING_SINGLE = new dh("FLOATING SINGLE");
    var vh = function t() {
        this._precisionModel = new fh, this._SRID = 0, this._coordinateSequenceFactory = t.getDefaultCoordinateSequenceFactory(), 0 === arguments.length || (1 === arguments.length ? fl(arguments[0], cl) ? this._coordinateSequenceFactory = arguments[0] : arguments[0] instanceof fh && (this._precisionModel = arguments[0]) : 2 === arguments.length ? (this._precisionModel = arguments[0], this._SRID = arguments[1]) : 3 === arguments.length && (this._precisionModel = arguments[0], this._SRID = arguments[1], this._coordinateSequenceFactory = arguments[2]))
    }, _h = {serialVersionUID: {configurable: !0}};
    vh.prototype.toGeometry = function (t) {
        return t.isNull() ? this.createPoint(null) : t.getMinX() === t.getMaxX() && t.getMinY() === t.getMaxY() ? this.createPoint(new al(t.getMinX(), t.getMinY())) : t.getMinX() === t.getMaxX() || t.getMinY() === t.getMaxY() ? this.createLineString([new al(t.getMinX(), t.getMinY()), new al(t.getMaxX(), t.getMaxY())]) : this.createPolygon(this.createLinearRing([new al(t.getMinX(), t.getMinY()), new al(t.getMinX(), t.getMaxY()), new al(t.getMaxX(), t.getMaxY()), new al(t.getMaxX(), t.getMinY()), new al(t.getMinX(), t.getMinY())]), null)
    }, vh.prototype.createLineString = function (t) {
        return t ? t instanceof Array ? new Jc(this.getCoordinateSequenceFactory().create(t), this) : fl(t, wl) ? new Jc(t, this) : void 0 : new Jc(this.getCoordinateSequenceFactory().create([]), this)
    }, vh.prototype.createMultiLineString = function () {
        if (0 === arguments.length) return new kc(null, this);
        if (1 === arguments.length) {
            var t = arguments[0];
            return new kc(t, this)
        }
    }, vh.prototype.buildGeometry = function (t) {
        for (var e = null, n = !1, r = !1, i = t.iterator(); i.hasNext();) {
            var o = i.next(), s = o.getClass();
            null === e && (e = s), s !== e && (n = !0), o.isGeometryCollectionOrDerived() && (r = !0)
        }
        if (null === e) return this.createGeometryCollection();
        if (n || r) return this.createGeometryCollection(vh.toGeometryArray(t));
        var a = t.iterator().next();
        if (t.size() > 1) {
            if (a instanceof $c) return this.createMultiPolygon(vh.toPolygonArray(t));
            if (a instanceof Jc) return this.createMultiLineString(vh.toLineStringArray(t));
            if (a instanceof Kc) return this.createMultiPoint(vh.toPointArray(t));
            Gl.shouldNeverReachHere("Unhandled class: " + a.getClass().getName())
        }
        return a
    }, vh.prototype.createMultiPointFromCoords = function (t) {
        return this.createMultiPoint(null !== t ? this.getCoordinateSequenceFactory().create(t) : null)
    }, vh.prototype.createPoint = function () {
        if (0 === arguments.length) return this.createPoint(this.getCoordinateSequenceFactory().create([]));
        if (1 === arguments.length) {
            if (arguments[0] instanceof al) {
                var t = arguments[0];
                return this.createPoint(null !== t ? this.getCoordinateSequenceFactory().create([t]) : null)
            }
            if (fl(arguments[0], wl)) {
                var e = arguments[0];
                return new Kc(e, this)
            }
        }
    }, vh.prototype.getCoordinateSequenceFactory = function () {
        return this._coordinateSequenceFactory
    }, vh.prototype.createPolygon = function () {
        if (0 === arguments.length) return new $c(null, null, this);
        if (1 === arguments.length) {
            if (fl(arguments[0], wl)) {
                var t = arguments[0];
                return this.createPolygon(this.createLinearRing(t))
            }
            if (arguments[0] instanceof Array) {
                var e = arguments[0];
                return this.createPolygon(this.createLinearRing(e))
            }
            if (arguments[0] instanceof eh) {
                var n = arguments[0];
                return this.createPolygon(n, null)
            }
        } else if (2 === arguments.length) {
            var r = arguments[0], i = arguments[1];
            return new $c(r, i, this)
        }
    }, vh.prototype.getSRID = function () {
        return this._SRID
    }, vh.prototype.createGeometryCollection = function () {
        if (0 === arguments.length) return new Fc(null, this);
        if (1 === arguments.length) {
            var t = arguments[0];
            return new Fc(t, this)
        }
    }, vh.prototype.createGeometry = function (t) {
        return new rh(this).edit(t, {
            edit: function () {
                if (2 === arguments.length) {
                    var t = arguments[0];
                    return this._coordinateSequenceFactory.create(t)
                }
            }
        })
    }, vh.prototype.getPrecisionModel = function () {
        return this._precisionModel
    }, vh.prototype.createLinearRing = function () {
        if (0 === arguments.length) return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));
        if (1 === arguments.length) {
            if (arguments[0] instanceof Array) {
                var t = arguments[0];
                return this.createLinearRing(null !== t ? this.getCoordinateSequenceFactory().create(t) : null)
            }
            if (fl(arguments[0], wl)) {
                var e = arguments[0];
                return new eh(e, this)
            }
        }
    }, vh.prototype.createMultiPolygon = function () {
        if (0 === arguments.length) return new nh(null, this);
        if (1 === arguments.length) {
            var t = arguments[0];
            return new nh(t, this)
        }
    }, vh.prototype.createMultiPoint = function () {
        var t = this;
        if (0 === arguments.length) return new th(null, this);
        if (1 === arguments.length) {
            if (arguments[0] instanceof Array) {
                var e = arguments[0];
                return new th(e, this)
            }
            if (arguments[0] instanceof Array) {
                var n = arguments[0];
                return this.createMultiPoint(null !== n ? this.getCoordinateSequenceFactory().create(n) : null)
            }
            if (fl(arguments[0], wl)) {
                var r = arguments[0];
                if (null === r) return this.createMultiPoint(new Array(0).fill(null));
                for (var i = new Array(r.size()).fill(null), o = 0; o < r.size(); o++) {
                    var s = t.getCoordinateSequenceFactory().create(1, r.getDimension());
                    Wc.copy(r, o, s, 0, 1), i[o] = t.createPoint(s)
                }
                return this.createMultiPoint(i)
            }
        }
    }, vh.prototype.interfaces_ = function () {
        return [sl]
    }, vh.prototype.getClass = function () {
        return vh
    }, vh.toMultiPolygonArray = function (t) {
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.toGeometryArray = function (t) {
        if (null === t) return null;
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.getDefaultCoordinateSequenceFactory = function () {
        return ch.instance()
    }, vh.toMultiLineStringArray = function (t) {
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.toLineStringArray = function (t) {
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.toMultiPointArray = function (t) {
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.toLinearRingArray = function (t) {
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.toPointArray = function (t) {
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.toPolygonArray = function (t) {
        var e = new Array(t.size()).fill(null);
        return t.toArray(e)
    }, vh.createPointFromInternalCoord = function (t, e) {
        return e.getPrecisionModel().makePrecise(t), e.getFactory().createPoint(t)
    }, _h.serialVersionUID.get = function () {
        return -0x5ea75f2051eeb400
    }, Object.defineProperties(vh, _h);
    var mh = ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"], xh = function (t) {
        this.geometryFactory = t || new vh
    };
    xh.prototype.read = function (t) {
        var e, n = (e = "string" == typeof t ? JSON.parse(t) : t).type;
        if (!Eh[n]) throw new Error("Unknown GeoJSON type: " + e.type);
        return -1 !== mh.indexOf(n) ? Eh[n].apply(this, [e.coordinates]) : "GeometryCollection" === n ? Eh[n].apply(this, [e.geometries]) : Eh[n].apply(this, [e])
    }, xh.prototype.write = function (t) {
        var e = t.getGeometryType();
        if (!bh[e]) throw new Error("Geometry is not supported");
        return bh[e].apply(this, [t])
    };
    var Eh = {
        Feature: function (t) {
            var e = {};
            for (var n in t) e[n] = t[n];
            if (t.geometry) {
                var r = t.geometry.type;
                if (!Eh[r]) throw new Error("Unknown GeoJSON type: " + t.type);
                e.geometry = this.read(t.geometry)
            }
            return t.bbox && (e.bbox = Eh.bbox.apply(this, [t.bbox])), e
        }, FeatureCollection: function (t) {
            var e = {};
            if (t.features) {
                e.features = [];
                for (var n = 0; n < t.features.length; ++n) e.features.push(this.read(t.features[n]))
            }
            return t.bbox && (e.bbox = this.parse.bbox.apply(this, [t.bbox])), e
        }, coordinates: function (t) {
            for (var e = [], n = 0; n < t.length; ++n) {
                var r = t[n];
                e.push(new al(r[0], r[1]))
            }
            return e
        }, bbox: function (t) {
            return this.geometryFactory.createLinearRing([new al(t[0], t[1]), new al(t[2], t[1]), new al(t[2], t[3]), new al(t[0], t[3]), new al(t[0], t[1])])
        }, Point: function (t) {
            var e = new al(t[0], t[1]);
            return this.geometryFactory.createPoint(e)
        }, MultiPoint: function (t) {
            for (var e = [], n = 0; n < t.length; ++n) e.push(Eh.Point.apply(this, [t[n]]));
            return this.geometryFactory.createMultiPoint(e)
        }, LineString: function (t) {
            var e = Eh.coordinates.apply(this, [t]);
            return this.geometryFactory.createLineString(e)
        }, MultiLineString: function (t) {
            for (var e = [], n = 0; n < t.length; ++n) e.push(Eh.LineString.apply(this, [t[n]]));
            return this.geometryFactory.createMultiLineString(e)
        }, Polygon: function (t) {
            for (var e = Eh.coordinates.apply(this, [t[0]]), n = this.geometryFactory.createLinearRing(e), r = [], i = 1; i < t.length; ++i) {
                var o = t[i], s = Eh.coordinates.apply(this, [o]), a = this.geometryFactory.createLinearRing(s);
                r.push(a)
            }
            return this.geometryFactory.createPolygon(n, r)
        }, MultiPolygon: function (t) {
            for (var e = [], n = 0; n < t.length; ++n) {
                var r = t[n];
                e.push(Eh.Polygon.apply(this, [r]))
            }
            return this.geometryFactory.createMultiPolygon(e)
        }, GeometryCollection: function (t) {
            for (var e = [], n = 0; n < t.length; ++n) {
                var r = t[n];
                e.push(this.read(r))
            }
            return this.geometryFactory.createGeometryCollection(e)
        }
    }, bh = {
        coordinate: function (t) {
            return [t.x, t.y]
        }, Point: function (t) {
            return {type: "Point", coordinates: bh.coordinate.apply(this, [t.getCoordinate()])}
        }, MultiPoint: function (t) {
            for (var e = [], n = 0; n < t._geometries.length; ++n) {
                var r = t._geometries[n], i = bh.Point.apply(this, [r]);
                e.push(i.coordinates)
            }
            return {type: "MultiPoint", coordinates: e}
        }, LineString: function (t) {
            for (var e = [], n = t.getCoordinates(), r = 0; r < n.length; ++r) {
                var i = n[r];
                e.push(bh.coordinate.apply(this, [i]))
            }
            return {type: "LineString", coordinates: e}
        }, MultiLineString: function (t) {
            for (var e = [], n = 0; n < t._geometries.length; ++n) {
                var r = t._geometries[n], i = bh.LineString.apply(this, [r]);
                e.push(i.coordinates)
            }
            return {type: "MultiLineString", coordinates: e}
        }, Polygon: function (t) {
            var e = [], n = bh.LineString.apply(this, [t._shell]);
            e.push(n.coordinates);
            for (var r = 0; r < t._holes.length; ++r) {
                var i = t._holes[r], o = bh.LineString.apply(this, [i]);
                e.push(o.coordinates)
            }
            return {type: "Polygon", coordinates: e}
        }, MultiPolygon: function (t) {
            for (var e = [], n = 0; n < t._geometries.length; ++n) {
                var r = t._geometries[n], i = bh.Polygon.apply(this, [r]);
                e.push(i.coordinates)
            }
            return {type: "MultiPolygon", coordinates: e}
        }, GeometryCollection: function (t) {
            for (var e = [], n = 0; n < t._geometries.length; ++n) {
                var r = t._geometries[n], i = r.getGeometryType();
                e.push(bh[i].apply(this, [r]))
            }
            return {type: "GeometryCollection", geometries: e}
        }
    }, wh = function (t) {
        this.geometryFactory = t || new vh, this.precisionModel = this.geometryFactory.getPrecisionModel(), this.parser = new xh(this.geometryFactory)
    };
    wh.prototype.read = function (t) {
        var e = this.parser.read(t);
        return this.precisionModel.getType() === fh.FIXED && this.reducePrecision(e), e
    }, wh.prototype.reducePrecision = function (t) {
        var e, n;
        if (t.coordinate) this.precisionModel.makePrecise(t.coordinate); else if (t.points) for (e = 0, n = t.points.length; e < n; e++) this.precisionModel.makePrecise(t.points[e]); else if (t.geometries) for (e = 0, n = t.geometries.length; e < n; e++) this.reducePrecision(t.geometries[e])
    };
    var Ih = function () {
        this.parser = new xh(this.geometryFactory)
    };
    Ih.prototype.write = function (t) {
        return this.parser.write(t)
    };
    var Nh = function () {
    }, Sh = {ON: {configurable: !0}, LEFT: {configurable: !0}, RIGHT: {configurable: !0}};

    function Ch(t) {
        this.message = t || ""
    }

    function Ph() {
        this.array_ = []
    }

    Nh.prototype.interfaces_ = function () {
        return []
    }, Nh.prototype.getClass = function () {
        return Nh
    }, Nh.opposite = function (t) {
        return t === Nh.LEFT ? Nh.RIGHT : t === Nh.RIGHT ? Nh.LEFT : t
    }, Sh.ON.get = function () {
        return 0
    }, Sh.LEFT.get = function () {
        return 1
    }, Sh.RIGHT.get = function () {
        return 2
    }, Object.defineProperties(Nh, Sh), Ch.prototype = new Error, Ch.prototype.name = "EmptyStackException", Ph.prototype = new sc, Ph.prototype.add = function (t) {
        return this.array_.push(t), !0
    }, Ph.prototype.get = function (t) {
        if (t < 0 || t >= this.size()) throw new Error;
        return this.array_[t]
    }, Ph.prototype.push = function (t) {
        return this.array_.push(t), t
    }, Ph.prototype.pop = function (t) {
        if (0 === this.array_.length) throw new Ch;
        return this.array_.pop()
    }, Ph.prototype.peek = function () {
        if (0 === this.array_.length) throw new Ch;
        return this.array_[this.array_.length - 1]
    }, Ph.prototype.empty = function () {
        return 0 === this.array_.length
    }, Ph.prototype.isEmpty = function () {
        return this.empty()
    }, Ph.prototype.search = function (t) {
        return this.array_.indexOf(t)
    }, Ph.prototype.size = function () {
        return this.array_.length
    }, Ph.prototype.toArray = function () {
        for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
        return t
    };
    var Lh = function () {
        this._minIndex = -1, this._minCoord = null, this._minDe = null, this._orientedDe = null
    };
    Lh.prototype.getCoordinate = function () {
        return this._minCoord
    }, Lh.prototype.getRightmostSide = function (t, e) {
        var n = this.getRightmostSideOfSegment(t, e);
        return n < 0 && (n = this.getRightmostSideOfSegment(t, e - 1)), n < 0 && (this._minCoord = null, this.checkForRightmostCoordinate(t)), n
    }, Lh.prototype.findRightmostEdgeAtVertex = function () {
        var t = this._minDe.getEdge().getCoordinates();
        Gl.isTrue(this._minIndex > 0 && this._minIndex < t.length, "rightmost point expected to be interior vertex of edge");
        var e = t[this._minIndex - 1], n = t[this._minIndex + 1], r = Vl.computeOrientation(this._minCoord, n, e),
            i = !1;
        (e.y < this._minCoord.y && n.y < this._minCoord.y && r === Vl.COUNTERCLOCKWISE || e.y > this._minCoord.y && n.y > this._minCoord.y && r === Vl.CLOCKWISE) && (i = !0), i && (this._minIndex = this._minIndex - 1)
    }, Lh.prototype.getRightmostSideOfSegment = function (t, e) {
        var n = t.getEdge().getCoordinates();
        if (e < 0 || e + 1 >= n.length) return -1;
        if (n[e].y === n[e + 1].y) return -1;
        var r = Nh.LEFT;
        return n[e].y < n[e + 1].y && (r = Nh.RIGHT), r
    }, Lh.prototype.getEdge = function () {
        return this._orientedDe
    }, Lh.prototype.checkForRightmostCoordinate = function (t) {
        for (var e = this, n = t.getEdge().getCoordinates(), r = 0; r < n.length - 1; r++) (null === e._minCoord || n[r].x > e._minCoord.x) && (e._minDe = t, e._minIndex = r, e._minCoord = n[r])
    }, Lh.prototype.findRightmostEdgeAtNode = function () {
        var t = this._minDe.getNode().getEdges();
        this._minDe = t.getRightmostEdge(), this._minDe.isForward() || (this._minDe = this._minDe.getSym(), this._minIndex = this._minDe.getEdge().getCoordinates().length - 1)
    }, Lh.prototype.findEdge = function (t) {
        for (var e = t.iterator(); e.hasNext();) {
            var n = e.next();
            n.isForward() && this.checkForRightmostCoordinate(n)
        }
        Gl.isTrue(0 !== this._minIndex || this._minCoord.equals(this._minDe.getCoordinate()), "inconsistency in rightmost processing"), 0 === this._minIndex ? this.findRightmostEdgeAtNode() : this.findRightmostEdgeAtVertex(), this._orientedDe = this._minDe, this.getRightmostSide(this._minDe, this._minIndex) === Nh.LEFT && (this._orientedDe = this._minDe.getSym())
    }, Lh.prototype.interfaces_ = function () {
        return []
    }, Lh.prototype.getClass = function () {
        return Lh
    };
    var Mh = function (t) {
        function e(n, r) {
            t.call(this, e.msgWithCoord(n, r)), this.pt = r ? new al(r) : null, this.name = "TopologyException"
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getCoordinate = function () {
            return this.pt
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e.msgWithCoord = function (t, e) {
            return e ? t : t + " [ " + e + " ]"
        }, e
    }(Fl), Oh = function () {
        this.array_ = []
    };
    Oh.prototype.addLast = function (t) {
        this.array_.push(t)
    }, Oh.prototype.removeFirst = function () {
        return this.array_.shift()
    }, Oh.prototype.isEmpty = function () {
        return 0 === this.array_.length
    };
    var Rh = function () {
        this._finder = null, this._dirEdgeList = new uc, this._nodes = new uc, this._rightMostCoord = null, this._env = null, this._finder = new Lh
    };
    Rh.prototype.clearVisitedEdges = function () {
        for (var t = this._dirEdgeList.iterator(); t.hasNext();) {
            t.next().setVisited(!1)
        }
    }, Rh.prototype.getRightmostCoordinate = function () {
        return this._rightMostCoord
    }, Rh.prototype.computeNodeDepth = function (t) {
        for (var e = null, n = t.getEdges().iterator(); n.hasNext();) {
            var r = n.next();
            if (r.isVisited() || r.getSym().isVisited()) {
                e = r;
                break
            }
        }
        if (null === e) throw new Mh("unable to find edge to compute depths at " + t.getCoordinate());
        t.getEdges().computeDepths(e);
        for (var i = t.getEdges().iterator(); i.hasNext();) {
            var o = i.next();
            o.setVisited(!0), this.copySymDepths(o)
        }
    }, Rh.prototype.computeDepth = function (t) {
        this.clearVisitedEdges();
        var e = this._finder.getEdge();
        e.setEdgeDepths(Nh.RIGHT, t), this.copySymDepths(e), this.computeDepths(e)
    }, Rh.prototype.create = function (t) {
        this.addReachable(t), this._finder.findEdge(this._dirEdgeList), this._rightMostCoord = this._finder.getCoordinate()
    }, Rh.prototype.findResultEdges = function () {
        for (var t = this._dirEdgeList.iterator(); t.hasNext();) {
            var e = t.next();
            e.getDepth(Nh.RIGHT) >= 1 && e.getDepth(Nh.LEFT) <= 0 && !e.isInteriorAreaEdge() && e.setInResult(!0)
        }
    }, Rh.prototype.computeDepths = function (t) {
        var e = new mc, n = new Oh, r = t.getNode();
        for (n.addLast(r), e.add(r), t.setVisited(!0); !n.isEmpty();) {
            var i = n.removeFirst();
            e.add(i), this.computeNodeDepth(i);
            for (var o = i.getEdges().iterator(); o.hasNext();) {
                var s = o.next().getSym();
                if (!s.isVisited()) {
                    var a = s.getNode();
                    e.contains(a) || (n.addLast(a), e.add(a))
                }
            }
        }
    }, Rh.prototype.compareTo = function (t) {
        var e = t;
        return this._rightMostCoord.x < e._rightMostCoord.x ? -1 : this._rightMostCoord.x > e._rightMostCoord.x ? 1 : 0
    }, Rh.prototype.getEnvelope = function () {
        if (null === this._env) {
            for (var t = new Ll, e = this._dirEdgeList.iterator(); e.hasNext();) for (var n = e.next().getEdge().getCoordinates(), r = 0; r < n.length - 1; r++) t.expandToInclude(n[r]);
            this._env = t
        }
        return this._env
    }, Rh.prototype.addReachable = function (t) {
        var e = new Ph;
        for (e.add(t); !e.empty();) {
            var n = e.pop();
            this.add(n, e)
        }
    }, Rh.prototype.copySymDepths = function (t) {
        var e = t.getSym();
        e.setDepth(Nh.LEFT, t.getDepth(Nh.RIGHT)), e.setDepth(Nh.RIGHT, t.getDepth(Nh.LEFT))
    }, Rh.prototype.add = function (t, e) {
        t.setVisited(!0), this._nodes.add(t);
        for (var n = t.getEdges().iterator(); n.hasNext();) {
            var r = n.next();
            this._dirEdgeList.add(r);
            var i = r.getSym().getNode();
            i.isVisited() || e.push(i)
        }
    }, Rh.prototype.getNodes = function () {
        return this._nodes
    }, Rh.prototype.getDirectedEdges = function () {
        return this._dirEdgeList
    }, Rh.prototype.interfaces_ = function () {
        return [rl]
    }, Rh.prototype.getClass = function () {
        return Rh
    };
    var Th = function t() {
        var e = this;
        if (this.location = null, 1 === arguments.length) {
            if (arguments[0] instanceof Array) {
                var n = arguments[0];
                this.init(n.length)
            } else if (Number.isInteger(arguments[0])) {
                var r = arguments[0];
                this.init(1), this.location[Nh.ON] = r
            } else if (arguments[0] instanceof t) {
                var i = arguments[0];
                if (this.init(i.location.length), null !== i) for (var o = 0; o < this.location.length; o++) e.location[o] = i.location[o]
            }
        } else if (3 === arguments.length) {
            var s = arguments[0], a = arguments[1], u = arguments[2];
            this.init(3), this.location[Nh.ON] = s, this.location[Nh.LEFT] = a, this.location[Nh.RIGHT] = u
        }
    };
    Th.prototype.setAllLocations = function (t) {
        for (var e = 0; e < this.location.length; e++) this.location[e] = t
    }, Th.prototype.isNull = function () {
        for (var t = 0; t < this.location.length; t++) if (this.location[t] !== hl.NONE) return !1;
        return !0
    }, Th.prototype.setAllLocationsIfNull = function (t) {
        for (var e = 0; e < this.location.length; e++) this.location[e] === hl.NONE && (this.location[e] = t)
    }, Th.prototype.isLine = function () {
        return 1 === this.location.length
    }, Th.prototype.merge = function (t) {
        if (t.location.length > this.location.length) {
            var e = new Array(3).fill(null);
            e[Nh.ON] = this.location[Nh.ON], e[Nh.LEFT] = hl.NONE, e[Nh.RIGHT] = hl.NONE, this.location = e
        }
        for (var n = 0; n < this.location.length; n++) this.location[n] === hl.NONE && n < t.location.length && (this.location[n] = t.location[n])
    }, Th.prototype.getLocations = function () {
        return this.location
    }, Th.prototype.flip = function () {
        if (this.location.length <= 1) return null;
        var t = this.location[Nh.LEFT];
        this.location[Nh.LEFT] = this.location[Nh.RIGHT], this.location[Nh.RIGHT] = t
    }, Th.prototype.toString = function () {
        var t = new yl;
        return this.location.length > 1 && t.append(hl.toLocationSymbol(this.location[Nh.LEFT])), t.append(hl.toLocationSymbol(this.location[Nh.ON])), this.location.length > 1 && t.append(hl.toLocationSymbol(this.location[Nh.RIGHT])), t.toString()
    }, Th.prototype.setLocations = function (t, e, n) {
        this.location[Nh.ON] = t, this.location[Nh.LEFT] = e, this.location[Nh.RIGHT] = n
    }, Th.prototype.get = function (t) {
        return t < this.location.length ? this.location[t] : hl.NONE
    }, Th.prototype.isArea = function () {
        return this.location.length > 1
    }, Th.prototype.isAnyNull = function () {
        for (var t = 0; t < this.location.length; t++) if (this.location[t] === hl.NONE) return !0;
        return !1
    }, Th.prototype.setLocation = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.setLocation(Nh.ON, t)
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            this.location[e] = n
        }
    }, Th.prototype.init = function (t) {
        this.location = new Array(t).fill(null), this.setAllLocations(hl.NONE)
    }, Th.prototype.isEqualOnSide = function (t, e) {
        return this.location[e] === t.location[e]
    }, Th.prototype.allPositionsEqual = function (t) {
        for (var e = 0; e < this.location.length; e++) if (this.location[e] !== t) return !1;
        return !0
    }, Th.prototype.interfaces_ = function () {
        return []
    }, Th.prototype.getClass = function () {
        return Th
    };
    var Ah = function t() {
        if (this.elt = new Array(2).fill(null), 1 === arguments.length) {
            if (Number.isInteger(arguments[0])) {
                var e = arguments[0];
                this.elt[0] = new Th(e), this.elt[1] = new Th(e)
            } else if (arguments[0] instanceof t) {
                var n = arguments[0];
                this.elt[0] = new Th(n.elt[0]), this.elt[1] = new Th(n.elt[1])
            }
        } else if (2 === arguments.length) {
            var r = arguments[0], i = arguments[1];
            this.elt[0] = new Th(hl.NONE), this.elt[1] = new Th(hl.NONE), this.elt[r].setLocation(i)
        } else if (3 === arguments.length) {
            var o = arguments[0], s = arguments[1], a = arguments[2];
            this.elt[0] = new Th(o, s, a), this.elt[1] = new Th(o, s, a)
        } else if (4 === arguments.length) {
            var u = arguments[0], l = arguments[1], c = arguments[2], h = arguments[3];
            this.elt[0] = new Th(hl.NONE, hl.NONE, hl.NONE), this.elt[1] = new Th(hl.NONE, hl.NONE, hl.NONE), this.elt[u].setLocations(l, c, h)
        }
    };
    Ah.prototype.getGeometryCount = function () {
        var t = 0;
        return this.elt[0].isNull() || t++, this.elt[1].isNull() || t++, t
    }, Ah.prototype.setAllLocations = function (t, e) {
        this.elt[t].setAllLocations(e)
    }, Ah.prototype.isNull = function (t) {
        return this.elt[t].isNull()
    }, Ah.prototype.setAllLocationsIfNull = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.setAllLocationsIfNull(0, t), this.setAllLocationsIfNull(1, t)
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            this.elt[e].setAllLocationsIfNull(n)
        }
    }, Ah.prototype.isLine = function (t) {
        return this.elt[t].isLine()
    }, Ah.prototype.merge = function (t) {
        for (var e = this, n = 0; n < 2; n++) null === e.elt[n] && null !== t.elt[n] ? e.elt[n] = new Th(t.elt[n]) : e.elt[n].merge(t.elt[n])
    }, Ah.prototype.flip = function () {
        this.elt[0].flip(), this.elt[1].flip()
    }, Ah.prototype.getLocation = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return this.elt[t].get(Nh.ON)
        }
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            return this.elt[e].get(n)
        }
    }, Ah.prototype.toString = function () {
        var t = new yl;
        return null !== this.elt[0] && (t.append("A:"), t.append(this.elt[0].toString())), null !== this.elt[1] && (t.append(" B:"), t.append(this.elt[1].toString())), t.toString()
    }, Ah.prototype.isArea = function () {
        if (0 === arguments.length) return this.elt[0].isArea() || this.elt[1].isArea();
        if (1 === arguments.length) {
            var t = arguments[0];
            return this.elt[t].isArea()
        }
    }, Ah.prototype.isAnyNull = function (t) {
        return this.elt[t].isAnyNull()
    }, Ah.prototype.setLocation = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            this.elt[t].setLocation(Nh.ON, e)
        } else if (3 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = arguments[2];
            this.elt[n].setLocation(r, i)
        }
    }, Ah.prototype.isEqualOnSide = function (t, e) {
        return this.elt[0].isEqualOnSide(t.elt[0], e) && this.elt[1].isEqualOnSide(t.elt[1], e)
    }, Ah.prototype.allPositionsEqual = function (t, e) {
        return this.elt[t].allPositionsEqual(e)
    }, Ah.prototype.toLine = function (t) {
        this.elt[t].isArea() && (this.elt[t] = new Th(this.elt[t].location[0]))
    }, Ah.prototype.interfaces_ = function () {
        return []
    }, Ah.prototype.getClass = function () {
        return Ah
    }, Ah.toLineLabel = function (t) {
        for (var e = new Ah(hl.NONE), n = 0; n < 2; n++) e.setLocation(n, t.getLocation(n));
        return e
    };
    var Dh = function () {
        this._startDe = null, this._maxNodeDegree = -1, this._edges = new uc, this._pts = new uc, this._label = new Ah(hl.NONE), this._ring = null, this._isHole = null, this._shell = null, this._holes = new uc, this._geometryFactory = null;
        var t = arguments[0], e = arguments[1];
        this._geometryFactory = e, this.computePoints(t), this.computeRing()
    };
    Dh.prototype.computeRing = function () {
        if (null !== this._ring) return null;
        for (var t = new Array(this._pts.size()).fill(null), e = 0; e < this._pts.size(); e++) t[e] = this._pts.get(e);
        this._ring = this._geometryFactory.createLinearRing(t), this._isHole = Vl.isCCW(this._ring.getCoordinates())
    }, Dh.prototype.isIsolated = function () {
        return 1 === this._label.getGeometryCount()
    }, Dh.prototype.computePoints = function (t) {
        var e = this;
        this._startDe = t;
        var n = t, r = !0;
        do {
            if (null === n) throw new Mh("Found null DirectedEdge");
            if (n.getEdgeRing() === e) throw new Mh("Directed Edge visited twice during ring-building at " + n.getCoordinate());
            e._edges.add(n);
            var i = n.getLabel();
            Gl.isTrue(i.isArea()), e.mergeLabel(i), e.addPoints(n.getEdge(), n.isForward(), r), r = !1, e.setEdgeRing(n, e), n = e.getNext(n)
        } while (n !== this._startDe)
    }, Dh.prototype.getLinearRing = function () {
        return this._ring
    }, Dh.prototype.getCoordinate = function (t) {
        return this._pts.get(t)
    }, Dh.prototype.computeMaxNodeDegree = function () {
        var t = this;
        this._maxNodeDegree = 0;
        var e = this._startDe;
        do {
            var n = e.getNode().getEdges().getOutgoingDegree(t);
            n > t._maxNodeDegree && (t._maxNodeDegree = n), e = t.getNext(e)
        } while (e !== this._startDe);
        this._maxNodeDegree *= 2
    }, Dh.prototype.addPoints = function (t, e, n) {
        var r = t.getCoordinates();
        if (e) {
            var i = 1;
            n && (i = 0);
            for (var o = i; o < r.length; o++) this._pts.add(r[o])
        } else {
            var s = r.length - 2;
            n && (s = r.length - 1);
            for (var a = s; a >= 0; a--) this._pts.add(r[a])
        }
    }, Dh.prototype.isHole = function () {
        return this._isHole
    }, Dh.prototype.setInResult = function () {
        var t = this._startDe;
        do {
            t.getEdge().setInResult(!0), t = t.getNext()
        } while (t !== this._startDe)
    }, Dh.prototype.containsPoint = function (t) {
        var e = this.getLinearRing();
        if (!e.getEnvelopeInternal().contains(t)) return !1;
        if (!Vl.isPointInRing(t, e.getCoordinates())) return !1;
        for (var n = this._holes.iterator(); n.hasNext();) {
            if (n.next().containsPoint(t)) return !1
        }
        return !0
    }, Dh.prototype.addHole = function (t) {
        this._holes.add(t)
    }, Dh.prototype.isShell = function () {
        return null === this._shell
    }, Dh.prototype.getLabel = function () {
        return this._label
    }, Dh.prototype.getEdges = function () {
        return this._edges
    }, Dh.prototype.getMaxNodeDegree = function () {
        return this._maxNodeDegree < 0 && this.computeMaxNodeDegree(), this._maxNodeDegree
    }, Dh.prototype.getShell = function () {
        return this._shell
    }, Dh.prototype.mergeLabel = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.mergeLabel(t, 0), this.mergeLabel(t, 1)
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1], r = e.getLocation(n, Nh.RIGHT);
            if (r === hl.NONE) return null;
            if (this._label.getLocation(n) === hl.NONE) return this._label.setLocation(n, r), null
        }
    }, Dh.prototype.setShell = function (t) {
        this._shell = t, null !== t && t.addHole(this)
    }, Dh.prototype.toPolygon = function (t) {
        for (var e = new Array(this._holes.size()).fill(null), n = 0; n < this._holes.size(); n++) e[n] = this._holes.get(n).getLinearRing();
        return t.createPolygon(this.getLinearRing(), e)
    }, Dh.prototype.interfaces_ = function () {
        return []
    }, Dh.prototype.getClass = function () {
        return Dh
    };
    var Fh = function (t) {
        function e() {
            var e = arguments[0], n = arguments[1];
            t.call(this, e, n)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.setEdgeRing = function (t, e) {
            t.setMinEdgeRing(e)
        }, e.prototype.getNext = function (t) {
            return t.getNextMin()
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Dh), kh = function (t) {
        function e() {
            var e = arguments[0], n = arguments[1];
            t.call(this, e, n)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.buildMinimalRings = function () {
            var t = new uc, e = this._startDe;
            do {
                if (null === e.getMinEdgeRing()) {
                    var n = new Fh(e, this._geometryFactory);
                    t.add(n)
                }
                e = e.getNext()
            } while (e !== this._startDe);
            return t
        }, e.prototype.setEdgeRing = function (t, e) {
            t.setEdgeRing(e)
        }, e.prototype.linkDirectedEdgesForMinimalEdgeRings = function () {
            var t = this._startDe;
            do {
                t.getNode().getEdges().linkMinimalDirectedEdges(this), t = t.getNext()
            } while (t !== this._startDe)
        }, e.prototype.getNext = function (t) {
            return t.getNext()
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Dh), Gh = function () {
        if (this._label = null, this._isInResult = !1, this._isCovered = !1, this._isCoveredSet = !1, this._isVisited = !1, 0 === arguments.length) ; else if (1 === arguments.length) {
            var t = arguments[0];
            this._label = t
        }
    };
    Gh.prototype.setVisited = function (t) {
        this._isVisited = t
    }, Gh.prototype.setInResult = function (t) {
        this._isInResult = t
    }, Gh.prototype.isCovered = function () {
        return this._isCovered
    }, Gh.prototype.isCoveredSet = function () {
        return this._isCoveredSet
    }, Gh.prototype.setLabel = function (t) {
        this._label = t
    }, Gh.prototype.getLabel = function () {
        return this._label
    }, Gh.prototype.setCovered = function (t) {
        this._isCovered = t, this._isCoveredSet = !0
    }, Gh.prototype.updateIM = function (t) {
        Gl.isTrue(this._label.getGeometryCount() >= 2, "found partial label"), this.computeIM(t)
    }, Gh.prototype.isInResult = function () {
        return this._isInResult
    }, Gh.prototype.isVisited = function () {
        return this._isVisited
    }, Gh.prototype.interfaces_ = function () {
        return []
    }, Gh.prototype.getClass = function () {
        return Gh
    };
    var qh = function (t) {
        function e() {
            t.call(this), this._coord = null, this._edges = null;
            var e = arguments[0], n = arguments[1];
            this._coord = e, this._edges = n, this._label = new Ah(0, hl.NONE)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.isIncidentEdgeInResult = function () {
            for (var t = this.getEdges().getEdges().iterator(); t.hasNext();) {
                if (t.next().getEdge().isInResult()) return !0
            }
            return !1
        }, e.prototype.isIsolated = function () {
            return 1 === this._label.getGeometryCount()
        }, e.prototype.getCoordinate = function () {
            return this._coord
        }, e.prototype.print = function (t) {
            t.println("node " + this._coord + " lbl: " + this._label)
        }, e.prototype.computeIM = function (t) {
        }, e.prototype.computeMergedLocation = function (t, e) {
            var n = hl.NONE;
            if (n = this._label.getLocation(e), !t.isNull(e)) {
                var r = t.getLocation(e);
                n !== hl.BOUNDARY && (n = r)
            }
            return n
        }, e.prototype.setLabel = function () {
            if (2 !== arguments.length) return t.prototype.setLabel.apply(this, arguments);
            var e = arguments[0], n = arguments[1];
            null === this._label ? this._label = new Ah(e, n) : this._label.setLocation(e, n)
        }, e.prototype.getEdges = function () {
            return this._edges
        }, e.prototype.mergeLabel = function () {
            var t = this;
            if (arguments[0] instanceof e) {
                var n = arguments[0];
                this.mergeLabel(n._label)
            } else if (arguments[0] instanceof Ah) for (var r = arguments[0], i = 0; i < 2; i++) {
                var o = t.computeMergedLocation(r, i), s = t._label.getLocation(i);
                s === hl.NONE && t._label.setLocation(i, o)
            }
        }, e.prototype.add = function (t) {
            this._edges.insert(t), t.setNode(this)
        }, e.prototype.setLabelBoundary = function (t) {
            if (null === this._label) return null;
            var e = hl.NONE;
            null !== this._label && (e = this._label.getLocation(t));
            var n = null;
            switch (e) {
                case hl.BOUNDARY:
                    n = hl.INTERIOR;
                    break;
                case hl.INTERIOR:
                default:
                    n = hl.BOUNDARY
            }
            this._label.setLocation(t, n)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Gh), Bh = function () {
        this.nodeMap = new Sc, this.nodeFact = null;
        var t = arguments[0];
        this.nodeFact = t
    };
    Bh.prototype.find = function (t) {
        return this.nodeMap.get(t)
    }, Bh.prototype.addNode = function () {
        if (arguments[0] instanceof al) {
            var t = arguments[0], e = this.nodeMap.get(t);
            return null === e && (e = this.nodeFact.createNode(t), this.nodeMap.put(t, e)), e
        }
        if (arguments[0] instanceof qh) {
            var n = arguments[0], r = this.nodeMap.get(n.getCoordinate());
            return null === r ? (this.nodeMap.put(n.getCoordinate(), n), n) : (r.mergeLabel(n), r)
        }
    }, Bh.prototype.print = function (t) {
        for (var e = this.iterator(); e.hasNext();) {
            e.next().print(t)
        }
    }, Bh.prototype.iterator = function () {
        return this.nodeMap.values().iterator()
    }, Bh.prototype.values = function () {
        return this.nodeMap.values()
    }, Bh.prototype.getBoundaryNodes = function (t) {
        for (var e = new uc, n = this.iterator(); n.hasNext();) {
            var r = n.next();
            r.getLabel().getLocation(t) === hl.BOUNDARY && e.add(r)
        }
        return e
    }, Bh.prototype.add = function (t) {
        var e = t.getCoordinate();
        this.addNode(e).add(t)
    }, Bh.prototype.interfaces_ = function () {
        return []
    }, Bh.prototype.getClass = function () {
        return Bh
    };
    var zh = function () {
    }, jh = {NE: {configurable: !0}, NW: {configurable: !0}, SW: {configurable: !0}, SE: {configurable: !0}};
    zh.prototype.interfaces_ = function () {
        return []
    }, zh.prototype.getClass = function () {
        return zh
    }, zh.isNorthern = function (t) {
        return t === zh.NE || t === zh.NW
    }, zh.isOpposite = function (t, e) {
        return t !== e && 2 === (t - e + 4) % 4
    }, zh.commonHalfPlane = function (t, e) {
        if (t === e) return t;
        if (2 === (t - e + 4) % 4) return -1;
        var n = t < e ? t : e;
        return 0 === n && 3 === (t > e ? t : e) ? 3 : n
    }, zh.isInHalfPlane = function (t, e) {
        return e === zh.SE ? t === zh.SE || t === zh.SW : t === e || t === e + 1
    }, zh.quadrant = function () {
        if ("number" == typeof arguments[0] && "number" == typeof arguments[1]) {
            var t = arguments[0], e = arguments[1];
            if (0 === t && 0 === e) throw new tl("Cannot compute the quadrant for point ( " + t + ", " + e + " )");
            return t >= 0 ? e >= 0 ? zh.NE : zh.SE : e >= 0 ? zh.NW : zh.SW
        }
        if (arguments[0] instanceof al && arguments[1] instanceof al) {
            var n = arguments[0], r = arguments[1];
            if (r.x === n.x && r.y === n.y) throw new tl("Cannot compute the quadrant for two identical points " + n);
            return r.x >= n.x ? r.y >= n.y ? zh.NE : zh.SE : r.y >= n.y ? zh.NW : zh.SW
        }
    }, jh.NE.get = function () {
        return 0
    }, jh.NW.get = function () {
        return 1
    }, jh.SW.get = function () {
        return 2
    }, jh.SE.get = function () {
        return 3
    }, Object.defineProperties(zh, jh);
    var Uh = function () {
        if (this._edge = null, this._label = null, this._node = null, this._p0 = null, this._p1 = null, this._dx = null, this._dy = null, this._quadrant = null, 1 === arguments.length) {
            var t = arguments[0];
            this._edge = t
        } else if (3 === arguments.length) {
            var e = arguments[0], n = arguments[1], r = arguments[2], i = null;
            this._edge = e, this.init(n, r), this._label = i
        } else if (4 === arguments.length) {
            var o = arguments[0], s = arguments[1], a = arguments[2], u = arguments[3];
            this._edge = o, this.init(s, a), this._label = u
        }
    };
    Uh.prototype.compareDirection = function (t) {
        return this._dx === t._dx && this._dy === t._dy ? 0 : this._quadrant > t._quadrant ? 1 : this._quadrant < t._quadrant ? -1 : Vl.computeOrientation(t._p0, t._p1, this._p1)
    }, Uh.prototype.getDy = function () {
        return this._dy
    }, Uh.prototype.getCoordinate = function () {
        return this._p0
    }, Uh.prototype.setNode = function (t) {
        this._node = t
    }, Uh.prototype.print = function (t) {
        var e = Math.atan2(this._dy, this._dx), n = this.getClass().getName(), r = n.lastIndexOf("."),
            i = n.substring(r + 1);
        t.print("  " + i + ": " + this._p0 + " - " + this._p1 + " " + this._quadrant + ":" + e + "   " + this._label)
    }, Uh.prototype.compareTo = function (t) {
        var e = t;
        return this.compareDirection(e)
    }, Uh.prototype.getDirectedCoordinate = function () {
        return this._p1
    }, Uh.prototype.getDx = function () {
        return this._dx
    }, Uh.prototype.getLabel = function () {
        return this._label
    }, Uh.prototype.getEdge = function () {
        return this._edge
    }, Uh.prototype.getQuadrant = function () {
        return this._quadrant
    }, Uh.prototype.getNode = function () {
        return this._node
    }, Uh.prototype.toString = function () {
        var t = Math.atan2(this._dy, this._dx), e = this.getClass().getName(), n = e.lastIndexOf(".");
        return "  " + e.substring(n + 1) + ": " + this._p0 + " - " + this._p1 + " " + this._quadrant + ":" + t + "   " + this._label
    }, Uh.prototype.computeLabel = function (t) {
    }, Uh.prototype.init = function (t, e) {
        this._p0 = t, this._p1 = e, this._dx = e.x - t.x, this._dy = e.y - t.y, this._quadrant = zh.quadrant(this._dx, this._dy), Gl.isTrue(!(0 === this._dx && 0 === this._dy), "EdgeEnd with identical endpoints found")
    }, Uh.prototype.interfaces_ = function () {
        return [rl]
    }, Uh.prototype.getClass = function () {
        return Uh
    };
    var Vh = function (t) {
        function e() {
            var e = arguments[0], n = arguments[1];
            if (t.call(this, e), this._isForward = null, this._isInResult = !1, this._isVisited = !1, this._sym = null, this._next = null, this._nextMin = null, this._edgeRing = null, this._minEdgeRing = null, this._depth = [0, -999, -999], this._isForward = n, n) this.init(e.getCoordinate(0), e.getCoordinate(1)); else {
                var r = e.getNumPoints() - 1;
                this.init(e.getCoordinate(r), e.getCoordinate(r - 1))
            }
            this.computeDirectedLabel()
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getNextMin = function () {
            return this._nextMin
        }, e.prototype.getDepth = function (t) {
            return this._depth[t]
        }, e.prototype.setVisited = function (t) {
            this._isVisited = t
        }, e.prototype.computeDirectedLabel = function () {
            this._label = new Ah(this._edge.getLabel()), this._isForward || this._label.flip()
        }, e.prototype.getNext = function () {
            return this._next
        }, e.prototype.setDepth = function (t, e) {
            if (-999 !== this._depth[t] && this._depth[t] !== e) throw new Mh("assigned depths do not match", this.getCoordinate());
            this._depth[t] = e
        }, e.prototype.isInteriorAreaEdge = function () {
            for (var t = this, e = !0, n = 0; n < 2; n++) t._label.isArea(n) && t._label.getLocation(n, Nh.LEFT) === hl.INTERIOR && t._label.getLocation(n, Nh.RIGHT) === hl.INTERIOR || (e = !1);
            return e
        }, e.prototype.setNextMin = function (t) {
            this._nextMin = t
        }, e.prototype.print = function (e) {
            t.prototype.print.call(this, e), e.print(" " + this._depth[Nh.LEFT] + "/" + this._depth[Nh.RIGHT]), e.print(" (" + this.getDepthDelta() + ")"), this._isInResult && e.print(" inResult")
        }, e.prototype.setMinEdgeRing = function (t) {
            this._minEdgeRing = t
        }, e.prototype.isLineEdge = function () {
            var t = this._label.isLine(0) || this._label.isLine(1),
                e = !this._label.isArea(0) || this._label.allPositionsEqual(0, hl.EXTERIOR),
                n = !this._label.isArea(1) || this._label.allPositionsEqual(1, hl.EXTERIOR);
            return t && e && n
        }, e.prototype.setEdgeRing = function (t) {
            this._edgeRing = t
        }, e.prototype.getMinEdgeRing = function () {
            return this._minEdgeRing
        }, e.prototype.getDepthDelta = function () {
            var t = this._edge.getDepthDelta();
            return this._isForward || (t = -t), t
        }, e.prototype.setInResult = function (t) {
            this._isInResult = t
        }, e.prototype.getSym = function () {
            return this._sym
        }, e.prototype.isForward = function () {
            return this._isForward
        }, e.prototype.getEdge = function () {
            return this._edge
        }, e.prototype.printEdge = function (t) {
            this.print(t), t.print(" "), this._isForward ? this._edge.print(t) : this._edge.printReverse(t)
        }, e.prototype.setSym = function (t) {
            this._sym = t
        }, e.prototype.setVisitedEdge = function (t) {
            this.setVisited(t), this._sym.setVisited(t)
        }, e.prototype.setEdgeDepths = function (t, e) {
            var n = this.getEdge().getDepthDelta();
            this._isForward || (n = -n);
            var r = 1;
            t === Nh.LEFT && (r = -1);
            var i = Nh.opposite(t), o = e + n * r;
            this.setDepth(t, e), this.setDepth(i, o)
        }, e.prototype.getEdgeRing = function () {
            return this._edgeRing
        }, e.prototype.isInResult = function () {
            return this._isInResult
        }, e.prototype.setNext = function (t) {
            this._next = t
        }, e.prototype.isVisited = function () {
            return this._isVisited
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e.depthFactor = function (t, e) {
            return t === hl.EXTERIOR && e === hl.INTERIOR ? 1 : t === hl.INTERIOR && e === hl.EXTERIOR ? -1 : 0
        }, e
    }(Uh), Xh = function () {
    };
    Xh.prototype.createNode = function (t) {
        return new qh(t, null)
    }, Xh.prototype.interfaces_ = function () {
        return []
    }, Xh.prototype.getClass = function () {
        return Xh
    };
    var Yh = function () {
        if (this._edges = new uc, this._nodes = null, this._edgeEndList = new uc, 0 === arguments.length) this._nodes = new Bh(new Xh); else if (1 === arguments.length) {
            var t = arguments[0];
            this._nodes = new Bh(t)
        }
    };
    Yh.prototype.printEdges = function (t) {
        t.println("Edges:");
        for (var e = 0; e < this._edges.size(); e++) {
            t.println("edge " + e + ":");
            var n = this._edges.get(e);
            n.print(t), n.eiList.print(t)
        }
    }, Yh.prototype.find = function (t) {
        return this._nodes.find(t)
    }, Yh.prototype.addNode = function () {
        if (arguments[0] instanceof qh) {
            var t = arguments[0];
            return this._nodes.addNode(t)
        }
        if (arguments[0] instanceof al) {
            var e = arguments[0];
            return this._nodes.addNode(e)
        }
    }, Yh.prototype.getNodeIterator = function () {
        return this._nodes.iterator()
    }, Yh.prototype.linkResultDirectedEdges = function () {
        for (var t = this._nodes.iterator(); t.hasNext();) {
            t.next().getEdges().linkResultDirectedEdges()
        }
    }, Yh.prototype.debugPrintln = function (t) {
        Cl.out.println(t)
    }, Yh.prototype.isBoundaryNode = function (t, e) {
        var n = this._nodes.find(e);
        if (null === n) return !1;
        var r = n.getLabel();
        return null !== r && r.getLocation(t) === hl.BOUNDARY
    }, Yh.prototype.linkAllDirectedEdges = function () {
        for (var t = this._nodes.iterator(); t.hasNext();) {
            t.next().getEdges().linkAllDirectedEdges()
        }
    }, Yh.prototype.matchInSameDirection = function (t, e, n, r) {
        return !!t.equals(n) && (Vl.computeOrientation(t, e, r) === Vl.COLLINEAR && zh.quadrant(t, e) === zh.quadrant(n, r))
    }, Yh.prototype.getEdgeEnds = function () {
        return this._edgeEndList
    }, Yh.prototype.debugPrint = function (t) {
        Cl.out.print(t)
    }, Yh.prototype.getEdgeIterator = function () {
        return this._edges.iterator()
    }, Yh.prototype.findEdgeInSameDirection = function (t, e) {
        for (var n = this, r = 0; r < this._edges.size(); r++) {
            var i = n._edges.get(r), o = i.getCoordinates();
            if (n.matchInSameDirection(t, e, o[0], o[1])) return i;
            if (n.matchInSameDirection(t, e, o[o.length - 1], o[o.length - 2])) return i
        }
        return null
    }, Yh.prototype.insertEdge = function (t) {
        this._edges.add(t)
    }, Yh.prototype.findEdgeEnd = function (t) {
        for (var e = this.getEdgeEnds().iterator(); e.hasNext();) {
            var n = e.next();
            if (n.getEdge() === t) return n
        }
        return null
    }, Yh.prototype.addEdges = function (t) {
        for (var e = this, n = t.iterator(); n.hasNext();) {
            var r = n.next();
            e._edges.add(r);
            var i = new Vh(r, !0), o = new Vh(r, !1);
            i.setSym(o), o.setSym(i), e.add(i), e.add(o)
        }
    }, Yh.prototype.add = function (t) {
        this._nodes.add(t), this._edgeEndList.add(t)
    }, Yh.prototype.getNodes = function () {
        return this._nodes.values()
    }, Yh.prototype.findEdge = function (t, e) {
        for (var n = 0; n < this._edges.size(); n++) {
            var r = this._edges.get(n), i = r.getCoordinates();
            if (t.equals(i[0]) && e.equals(i[1])) return r
        }
        return null
    }, Yh.prototype.interfaces_ = function () {
        return []
    }, Yh.prototype.getClass = function () {
        return Yh
    }, Yh.linkResultDirectedEdges = function (t) {
        for (var e = t.iterator(); e.hasNext();) {
            e.next().getEdges().linkResultDirectedEdges()
        }
    };
    var Hh = function () {
        this._geometryFactory = null, this._shellList = new uc;
        var t = arguments[0];
        this._geometryFactory = t
    };
    Hh.prototype.sortShellsAndHoles = function (t, e, n) {
        for (var r = t.iterator(); r.hasNext();) {
            var i = r.next();
            i.isHole() ? n.add(i) : e.add(i)
        }
    }, Hh.prototype.computePolygons = function (t) {
        for (var e = new uc, n = t.iterator(); n.hasNext();) {
            var r = n.next().toPolygon(this._geometryFactory);
            e.add(r)
        }
        return e
    }, Hh.prototype.placeFreeHoles = function (t, e) {
        for (var n = e.iterator(); n.hasNext();) {
            var r = n.next();
            if (null === r.getShell()) {
                var i = this.findEdgeRingContaining(r, t);
                if (null === i) throw new Mh("unable to assign hole to a shell", r.getCoordinate(0));
                r.setShell(i)
            }
        }
    }, Hh.prototype.buildMinimalEdgeRings = function (t, e, n) {
        for (var r = new uc, i = t.iterator(); i.hasNext();) {
            var o = i.next();
            if (o.getMaxNodeDegree() > 2) {
                o.linkDirectedEdgesForMinimalEdgeRings();
                var s = o.buildMinimalRings(), a = this.findShell(s);
                null !== a ? (this.placePolygonHoles(a, s), e.add(a)) : n.addAll(s)
            } else r.add(o)
        }
        return r
    }, Hh.prototype.containsPoint = function (t) {
        for (var e = this._shellList.iterator(); e.hasNext();) {
            if (e.next().containsPoint(t)) return !0
        }
        return !1
    }, Hh.prototype.buildMaximalEdgeRings = function (t) {
        for (var e = new uc, n = t.iterator(); n.hasNext();) {
            var r = n.next();
            if (r.isInResult() && r.getLabel().isArea() && null === r.getEdgeRing()) {
                var i = new kh(r, this._geometryFactory);
                e.add(i), i.setInResult()
            }
        }
        return e
    }, Hh.prototype.placePolygonHoles = function (t, e) {
        for (var n = e.iterator(); n.hasNext();) {
            var r = n.next();
            r.isHole() && r.setShell(t)
        }
    }, Hh.prototype.getPolygons = function () {
        return this.computePolygons(this._shellList)
    }, Hh.prototype.findEdgeRingContaining = function (t, e) {
        for (var n = t.getLinearRing(), r = n.getEnvelopeInternal(), i = n.getCoordinateN(0), o = null, s = null, a = e.iterator(); a.hasNext();) {
            var u = a.next(), l = u.getLinearRing(), c = l.getEnvelopeInternal();
            null !== o && (s = o.getLinearRing().getEnvelopeInternal());
            var h = !1;
            c.contains(r) && Vl.isPointInRing(i, l.getCoordinates()) && (h = !0), h && (null === o || s.contains(c)) && (o = u)
        }
        return o
    }, Hh.prototype.findShell = function (t) {
        for (var e = 0, n = null, r = t.iterator(); r.hasNext();) {
            var i = r.next();
            i.isHole() || (n = i, e++)
        }
        return Gl.isTrue(e <= 1, "found two shells in MinimalEdgeRing list"), n
    }, Hh.prototype.add = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.add(t.getEdgeEnds(), t.getNodes())
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            Yh.linkResultDirectedEdges(n);
            var r = this.buildMaximalEdgeRings(e), i = new uc, o = this.buildMinimalEdgeRings(r, this._shellList, i);
            this.sortShellsAndHoles(o, this._shellList, i), this.placeFreeHoles(this._shellList, i)
        }
    }, Hh.prototype.interfaces_ = function () {
        return []
    }, Hh.prototype.getClass = function () {
        return Hh
    };
    var Wh = function () {
    };
    Wh.prototype.getBounds = function () {
    }, Wh.prototype.interfaces_ = function () {
        return []
    }, Wh.prototype.getClass = function () {
        return Wh
    };
    var Jh = function () {
        this._bounds = null, this._item = null;
        var t = arguments[0], e = arguments[1];
        this._bounds = t, this._item = e
    };
    Jh.prototype.getItem = function () {
        return this._item
    }, Jh.prototype.getBounds = function () {
        return this._bounds
    }, Jh.prototype.interfaces_ = function () {
        return [Wh, sl]
    }, Jh.prototype.getClass = function () {
        return Jh
    };
    var Zh = function () {
        this._size = null, this._items = null, this._size = 0, this._items = new uc, this._items.add(null)
    };
    Zh.prototype.poll = function () {
        if (this.isEmpty()) return null;
        var t = this._items.get(1);
        return this._items.set(1, this._items.get(this._size)), this._size -= 1, this.reorder(1), t
    }, Zh.prototype.size = function () {
        return this._size
    }, Zh.prototype.reorder = function (t) {
        for (var e = this, n = null, r = this._items.get(t); 2 * t <= this._size && ((n = 2 * t) !== e._size && e._items.get(n + 1).compareTo(e._items.get(n)) < 0 && n++, e._items.get(n).compareTo(r) < 0); t = n) e._items.set(t, e._items.get(n));
        this._items.set(t, r)
    }, Zh.prototype.clear = function () {
        this._size = 0, this._items.clear()
    }, Zh.prototype.isEmpty = function () {
        return 0 === this._size
    }, Zh.prototype.add = function (t) {
        this._items.add(null), this._size += 1;
        var e = this._size;
        for (this._items.set(0, t); t.compareTo(this._items.get(Math.trunc(e / 2))) < 0; e /= 2) this._items.set(e, this._items.get(Math.trunc(e / 2)));
        this._items.set(e, t)
    }, Zh.prototype.interfaces_ = function () {
        return []
    }, Zh.prototype.getClass = function () {
        return Zh
    };
    var Kh = function () {
    };
    Kh.prototype.visitItem = function (t) {
    }, Kh.prototype.interfaces_ = function () {
        return []
    }, Kh.prototype.getClass = function () {
        return Kh
    };
    var Qh = function () {
    };
    Qh.prototype.insert = function (t, e) {
    }, Qh.prototype.remove = function (t, e) {
    }, Qh.prototype.query = function () {
    }, Qh.prototype.interfaces_ = function () {
        return []
    }, Qh.prototype.getClass = function () {
        return Qh
    };
    var $h = function () {
        if (this._childBoundables = new uc, this._bounds = null, this._level = null, 0 === arguments.length) ; else if (1 === arguments.length) {
            var t = arguments[0];
            this._level = t
        }
    }, tp = {serialVersionUID: {configurable: !0}};
    $h.prototype.getLevel = function () {
        return this._level
    }, $h.prototype.size = function () {
        return this._childBoundables.size()
    }, $h.prototype.getChildBoundables = function () {
        return this._childBoundables
    }, $h.prototype.addChildBoundable = function (t) {
        Gl.isTrue(null === this._bounds), this._childBoundables.add(t)
    }, $h.prototype.isEmpty = function () {
        return this._childBoundables.isEmpty()
    }, $h.prototype.getBounds = function () {
        return null === this._bounds && (this._bounds = this.computeBounds()), this._bounds
    }, $h.prototype.interfaces_ = function () {
        return [Wh, sl]
    }, $h.prototype.getClass = function () {
        return $h
    }, tp.serialVersionUID.get = function () {
        return 0x5a1e55ec41369800
    }, Object.defineProperties($h, tp);
    var ep = function () {
    };
    ep.reverseOrder = function () {
        return {
            compare: function (t, e) {
                return e.compareTo(t)
            }
        }
    }, ep.min = function (t) {
        return ep.sort(t), t.get(0)
    }, ep.sort = function (t, e) {
        var n = t.toArray();
        e ? Oc.sort(n, e) : Oc.sort(n);
        for (var r = t.iterator(), i = 0, o = n.length; i < o; i++) r.next(), r.set(n[i])
    }, ep.singletonList = function (t) {
        var e = new uc;
        return e.add(t), e
    };
    var np = function () {
        this._boundable1 = null, this._boundable2 = null, this._distance = null, this._itemDistance = null;
        var t = arguments[0], e = arguments[1], n = arguments[2];
        this._boundable1 = t, this._boundable2 = e, this._itemDistance = n, this._distance = this.distance()
    };
    np.prototype.expandToQueue = function (t, e) {
        var n = np.isComposite(this._boundable1), r = np.isComposite(this._boundable2);
        if (n && r) return np.area(this._boundable1) > np.area(this._boundable2) ? (this.expand(this._boundable1, this._boundable2, t, e), null) : (this.expand(this._boundable2, this._boundable1, t, e), null);
        if (n) return this.expand(this._boundable1, this._boundable2, t, e), null;
        if (r) return this.expand(this._boundable2, this._boundable1, t, e), null;
        throw new tl("neither boundable is composite")
    }, np.prototype.isLeaves = function () {
        return !(np.isComposite(this._boundable1) || np.isComposite(this._boundable2))
    }, np.prototype.compareTo = function (t) {
        var e = t;
        return this._distance < e._distance ? -1 : this._distance > e._distance ? 1 : 0
    }, np.prototype.expand = function (t, e, n, r) {
        for (var i = t.getChildBoundables().iterator(); i.hasNext();) {
            var o = i.next(), s = new np(o, e, this._itemDistance);
            s.getDistance() < r && n.add(s)
        }
    }, np.prototype.getBoundable = function (t) {
        return 0 === t ? this._boundable1 : this._boundable2
    }, np.prototype.getDistance = function () {
        return this._distance
    }, np.prototype.distance = function () {
        return this.isLeaves() ? this._itemDistance.distance(this._boundable1, this._boundable2) : this._boundable1.getBounds().distance(this._boundable2.getBounds())
    }, np.prototype.interfaces_ = function () {
        return [rl]
    }, np.prototype.getClass = function () {
        return np
    }, np.area = function (t) {
        return t.getBounds().getArea()
    }, np.isComposite = function (t) {
        return t instanceof $h
    };
    var rp = function t() {
        if (this._root = null, this._built = !1, this._itemBoundables = new uc, this._nodeCapacity = null, 0 === arguments.length) {
            var e = t.DEFAULT_NODE_CAPACITY;
            this._nodeCapacity = e
        } else if (1 === arguments.length) {
            var n = arguments[0];
            Gl.isTrue(n > 1, "Node capacity must be greater than 1"), this._nodeCapacity = n
        }
    }, ip = {
        IntersectsOp: {configurable: !0},
        serialVersionUID: {configurable: !0},
        DEFAULT_NODE_CAPACITY: {configurable: !0}
    };
    rp.prototype.getNodeCapacity = function () {
        return this._nodeCapacity
    }, rp.prototype.lastNode = function (t) {
        return t.get(t.size() - 1)
    }, rp.prototype.size = function () {
        var t = this;
        if (0 === arguments.length) return this.isEmpty() ? 0 : (this.build(), this.size(this._root));
        if (1 === arguments.length) {
            for (var e = arguments[0], n = 0, r = e.getChildBoundables().iterator(); r.hasNext();) {
                var i = r.next();
                i instanceof $h ? n += t.size(i) : i instanceof Jh && (n += 1)
            }
            return n
        }
    }, rp.prototype.removeItem = function (t, e) {
        for (var n = null, r = t.getChildBoundables().iterator(); r.hasNext();) {
            var i = r.next();
            i instanceof Jh && i.getItem() === e && (n = i)
        }
        return null !== n && (t.getChildBoundables().remove(n), !0)
    }, rp.prototype.itemsTree = function () {
        var t = this;
        if (0 === arguments.length) {
            this.build();
            var e = this.itemsTree(this._root);
            return null === e ? new uc : e
        }
        if (1 === arguments.length) {
            for (var n = arguments[0], r = new uc, i = n.getChildBoundables().iterator(); i.hasNext();) {
                var o = i.next();
                if (o instanceof $h) {
                    var s = t.itemsTree(o);
                    null !== s && r.add(s)
                } else o instanceof Jh ? r.add(o.getItem()) : Gl.shouldNeverReachHere()
            }
            return r.size() <= 0 ? null : r
        }
    }, rp.prototype.insert = function (t, e) {
        Gl.isTrue(!this._built, "Cannot insert items into an STR packed R-tree after it has been built."), this._itemBoundables.add(new Jh(t, e))
    }, rp.prototype.boundablesAtLevel = function () {
        var t = this;
        if (1 === arguments.length) {
            var e = arguments[0], n = new uc;
            return this.boundablesAtLevel(e, this._root, n), n
        }
        if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2];
            if (Gl.isTrue(r > -2), i.getLevel() === r) return o.add(i), null;
            for (var s = i.getChildBoundables().iterator(); s.hasNext();) {
                var a = s.next();
                a instanceof $h ? t.boundablesAtLevel(r, a, o) : (Gl.isTrue(a instanceof Jh), -1 === r && o.add(a))
            }
            return null
        }
    }, rp.prototype.query = function () {
        var t = this;
        if (1 === arguments.length) {
            var e = arguments[0];
            this.build();
            var n = new uc;
            return this.isEmpty() || this.getIntersectsOp().intersects(this._root.getBounds(), e) && this.query(e, this._root, n), n
        }
        if (2 === arguments.length) {
            var r = arguments[0], i = arguments[1];
            if (this.build(), this.isEmpty()) return null;
            this.getIntersectsOp().intersects(this._root.getBounds(), r) && this.query(r, this._root, i)
        } else if (3 === arguments.length) if (fl(arguments[2], Kh) && arguments[0] instanceof Object && arguments[1] instanceof $h) for (var o = arguments[0], s = arguments[1], a = arguments[2], u = s.getChildBoundables(), l = 0; l < u.size(); l++) {
            var c = u.get(l);
            t.getIntersectsOp().intersects(c.getBounds(), o) && (c instanceof $h ? t.query(o, c, a) : c instanceof Jh ? a.visitItem(c.getItem()) : Gl.shouldNeverReachHere())
        } else if (fl(arguments[2], sc) && arguments[0] instanceof Object && arguments[1] instanceof $h) for (var h = arguments[0], p = arguments[1], f = arguments[2], g = p.getChildBoundables(), d = 0; d < g.size(); d++) {
            var y = g.get(d);
            t.getIntersectsOp().intersects(y.getBounds(), h) && (y instanceof $h ? t.query(h, y, f) : y instanceof Jh ? f.add(y.getItem()) : Gl.shouldNeverReachHere())
        }
    }, rp.prototype.build = function () {
        if (this._built) return null;
        this._root = this._itemBoundables.isEmpty() ? this.createNode(0) : this.createHigherLevels(this._itemBoundables, -1), this._itemBoundables = null, this._built = !0
    }, rp.prototype.getRoot = function () {
        return this.build(), this._root
    }, rp.prototype.remove = function () {
        var t = this;
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            return this.build(), !!this.getIntersectsOp().intersects(this._root.getBounds(), e) && this.remove(e, this._root, n)
        }
        if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2], s = this.removeItem(i, o);
            if (s) return !0;
            for (var a = null, u = i.getChildBoundables().iterator(); u.hasNext();) {
                var l = u.next();
                if (t.getIntersectsOp().intersects(l.getBounds(), r) && (l instanceof $h && (s = t.remove(r, l, o)))) {
                    a = l;
                    break
                }
            }
            return null !== a && a.getChildBoundables().isEmpty() && i.getChildBoundables().remove(a), s
        }
    }, rp.prototype.createHigherLevels = function (t, e) {
        Gl.isTrue(!t.isEmpty());
        var n = this.createParentBoundables(t, e + 1);
        return 1 === n.size() ? n.get(0) : this.createHigherLevels(n, e + 1)
    }, rp.prototype.depth = function () {
        var t = this;
        if (0 === arguments.length) return this.isEmpty() ? 0 : (this.build(), this.depth(this._root));
        if (1 === arguments.length) {
            for (var e = arguments[0], n = 0, r = e.getChildBoundables().iterator(); r.hasNext();) {
                var i = r.next();
                if (i instanceof $h) {
                    var o = t.depth(i);
                    o > n && (n = o)
                }
            }
            return n + 1
        }
    }, rp.prototype.createParentBoundables = function (t, e) {
        var n = this;
        Gl.isTrue(!t.isEmpty());
        var r = new uc;
        r.add(this.createNode(e));
        var i = new uc(t);
        ep.sort(i, this.getComparator());
        for (var o = i.iterator(); o.hasNext();) {
            var s = o.next();
            n.lastNode(r).getChildBoundables().size() === n.getNodeCapacity() && r.add(n.createNode(e)), n.lastNode(r).addChildBoundable(s)
        }
        return r
    }, rp.prototype.isEmpty = function () {
        return this._built ? this._root.isEmpty() : this._itemBoundables.isEmpty()
    }, rp.prototype.interfaces_ = function () {
        return [sl]
    }, rp.prototype.getClass = function () {
        return rp
    }, rp.compareDoubles = function (t, e) {
        return t > e ? 1 : t < e ? -1 : 0
    }, ip.IntersectsOp.get = function () {
        return op
    }, ip.serialVersionUID.get = function () {
        return -0x35ef64c82d4c5400
    }, ip.DEFAULT_NODE_CAPACITY.get = function () {
        return 10
    }, Object.defineProperties(rp, ip);
    var op = function () {
    }, sp = function () {
    };
    sp.prototype.distance = function (t, e) {
    }, sp.prototype.interfaces_ = function () {
        return []
    }, sp.prototype.getClass = function () {
        return sp
    };
    var ap = function (t) {
        function e(n) {
            n = n || e.DEFAULT_NODE_CAPACITY, t.call(this, n)
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {
            STRtreeNode: {configurable: !0},
            serialVersionUID: {configurable: !0},
            xComparator: {configurable: !0},
            yComparator: {configurable: !0},
            intersectsOp: {configurable: !0},
            DEFAULT_NODE_CAPACITY: {configurable: !0}
        };
        return e.prototype.createParentBoundablesFromVerticalSlices = function (t, e) {
            Gl.isTrue(t.length > 0);
            for (var n = new uc, r = 0; r < t.length; r++) n.addAll(this.createParentBoundablesFromVerticalSlice(t[r], e));
            return n
        }, e.prototype.createNode = function (t) {
            return new up(t)
        }, e.prototype.size = function () {
            return 0 === arguments.length ? t.prototype.size.call(this) : t.prototype.size.apply(this, arguments)
        }, e.prototype.insert = function () {
            if (2 !== arguments.length) return t.prototype.insert.apply(this, arguments);
            var e = arguments[0], n = arguments[1];
            if (e.isNull()) return null;
            t.prototype.insert.call(this, e, n)
        }, e.prototype.getIntersectsOp = function () {
            return e.intersectsOp
        }, e.prototype.verticalSlices = function (t, e) {
            for (var n = Math.trunc(Math.ceil(t.size() / e)), r = new Array(e).fill(null), i = t.iterator(), o = 0; o < e; o++) {
                r[o] = new uc;
                for (var s = 0; i.hasNext() && s < n;) {
                    var a = i.next();
                    r[o].add(a), s++
                }
            }
            return r
        }, e.prototype.query = function () {
            if (1 === arguments.length) {
                var e = arguments[0];
                return t.prototype.query.call(this, e)
            }
            if (2 === arguments.length) {
                var n = arguments[0], r = arguments[1];
                t.prototype.query.call(this, n, r)
            } else if (3 === arguments.length) if (fl(arguments[2], Kh) && arguments[0] instanceof Object && arguments[1] instanceof $h) {
                var i = arguments[0], o = arguments[1], s = arguments[2];
                t.prototype.query.call(this, i, o, s)
            } else if (fl(arguments[2], sc) && arguments[0] instanceof Object && arguments[1] instanceof $h) {
                var a = arguments[0], u = arguments[1], l = arguments[2];
                t.prototype.query.call(this, a, u, l)
            }
        }, e.prototype.getComparator = function () {
            return e.yComparator
        }, e.prototype.createParentBoundablesFromVerticalSlice = function (e, n) {
            return t.prototype.createParentBoundables.call(this, e, n)
        }, e.prototype.remove = function () {
            if (2 === arguments.length) {
                var e = arguments[0], n = arguments[1];
                return t.prototype.remove.call(this, e, n)
            }
            return t.prototype.remove.apply(this, arguments)
        }, e.prototype.depth = function () {
            return 0 === arguments.length ? t.prototype.depth.call(this) : t.prototype.depth.apply(this, arguments)
        }, e.prototype.createParentBoundables = function (t, n) {
            Gl.isTrue(!t.isEmpty());
            var r = Math.trunc(Math.ceil(t.size() / this.getNodeCapacity())), i = new uc(t);
            ep.sort(i, e.xComparator);
            var o = this.verticalSlices(i, Math.trunc(Math.ceil(Math.sqrt(r))));
            return this.createParentBoundablesFromVerticalSlices(o, n)
        }, e.prototype.nearestNeighbour = function () {
            if (1 === arguments.length) {
                if (fl(arguments[0], sp)) {
                    var t = arguments[0], n = new np(this.getRoot(), this.getRoot(), t);
                    return this.nearestNeighbour(n)
                }
                if (arguments[0] instanceof np) {
                    var r = arguments[0];
                    return this.nearestNeighbour(r, el.POSITIVE_INFINITY)
                }
            } else if (2 === arguments.length) {
                if (arguments[0] instanceof e && fl(arguments[1], sp)) {
                    var i = arguments[0], o = arguments[1], s = new np(this.getRoot(), i.getRoot(), o);
                    return this.nearestNeighbour(s)
                }
                if (arguments[0] instanceof np && "number" == typeof arguments[1]) {
                    var a = arguments[0], u = arguments[1], l = u, c = null, h = new Zh;
                    for (h.add(a); !h.isEmpty() && l > 0;) {
                        var p = h.poll(), f = p.getDistance();
                        if (f >= l) break;
                        p.isLeaves() ? (l = f, c = p) : p.expandToQueue(h, l)
                    }
                    return [c.getBoundable(0).getItem(), c.getBoundable(1).getItem()]
                }
            } else if (3 === arguments.length) {
                var g = arguments[0], d = arguments[1], y = arguments[2], v = new Jh(g, d),
                    _ = new np(this.getRoot(), v, y);
                return this.nearestNeighbour(_)[0]
            }
        }, e.prototype.interfaces_ = function () {
            return [Qh, sl]
        }, e.prototype.getClass = function () {
            return e
        }, e.centreX = function (t) {
            return e.avg(t.getMinX(), t.getMaxX())
        }, e.avg = function (t, e) {
            return (t + e) / 2
        }, e.centreY = function (t) {
            return e.avg(t.getMinY(), t.getMaxY())
        }, n.STRtreeNode.get = function () {
            return up
        }, n.serialVersionUID.get = function () {
            return 0x39920f7d5f261e0
        }, n.xComparator.get = function () {
            return {
                interfaces_: function () {
                    return [ol]
                }, compare: function (n, r) {
                    return t.compareDoubles(e.centreX(n.getBounds()), e.centreX(r.getBounds()))
                }
            }
        }, n.yComparator.get = function () {
            return {
                interfaces_: function () {
                    return [ol]
                }, compare: function (n, r) {
                    return t.compareDoubles(e.centreY(n.getBounds()), e.centreY(r.getBounds()))
                }
            }
        }, n.intersectsOp.get = function () {
            return {
                interfaces_: function () {
                    return [t.IntersectsOp]
                }, intersects: function (t, e) {
                    return t.intersects(e)
                }
            }
        }, n.DEFAULT_NODE_CAPACITY.get = function () {
            return 10
        }, Object.defineProperties(e, n), e
    }(rp), up = function (t) {
        function e() {
            var e = arguments[0];
            t.call(this, e)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.computeBounds = function () {
            for (var t = null, e = this.getChildBoundables().iterator(); e.hasNext();) {
                var n = e.next();
                null === t ? t = new Ll(n.getBounds()) : t.expandToInclude(n.getBounds())
            }
            return t
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }($h), lp = function () {
    };
    lp.prototype.interfaces_ = function () {
        return []
    }, lp.prototype.getClass = function () {
        return lp
    }, lp.relativeSign = function (t, e) {
        return t < e ? -1 : t > e ? 1 : 0
    }, lp.compare = function (t, e, n) {
        if (e.equals2D(n)) return 0;
        var r = lp.relativeSign(e.x, n.x), i = lp.relativeSign(e.y, n.y);
        switch (t) {
            case 0:
                return lp.compareValue(r, i);
            case 1:
                return lp.compareValue(i, r);
            case 2:
                return lp.compareValue(i, -r);
            case 3:
                return lp.compareValue(-r, i);
            case 4:
                return lp.compareValue(-r, -i);
            case 5:
                return lp.compareValue(-i, -r);
            case 6:
                return lp.compareValue(-i, r);
            case 7:
                return lp.compareValue(r, -i)
        }
        return Gl.shouldNeverReachHere("invalid octant value"), 0
    }, lp.compareValue = function (t, e) {
        return t < 0 ? -1 : t > 0 ? 1 : e < 0 ? -1 : e > 0 ? 1 : 0
    };
    var cp = function () {
        this._segString = null, this.coord = null, this.segmentIndex = null, this._segmentOctant = null, this._isInterior = null;
        var t = arguments[0], e = arguments[1], n = arguments[2], r = arguments[3];
        this._segString = t, this.coord = new al(e), this.segmentIndex = n, this._segmentOctant = r, this._isInterior = !e.equals2D(t.getCoordinate(n))
    };
    cp.prototype.getCoordinate = function () {
        return this.coord
    }, cp.prototype.print = function (t) {
        t.print(this.coord), t.print(" seg # = " + this.segmentIndex)
    }, cp.prototype.compareTo = function (t) {
        var e = t;
        return this.segmentIndex < e.segmentIndex ? -1 : this.segmentIndex > e.segmentIndex ? 1 : this.coord.equals2D(e.coord) ? 0 : lp.compare(this._segmentOctant, this.coord, e.coord)
    }, cp.prototype.isEndPoint = function (t) {
        return 0 === this.segmentIndex && !this._isInterior || this.segmentIndex === t
    }, cp.prototype.isInterior = function () {
        return this._isInterior
    }, cp.prototype.interfaces_ = function () {
        return [rl]
    }, cp.prototype.getClass = function () {
        return cp
    };
    var hp = function () {
        this._nodeMap = new Sc, this._edge = null;
        var t = arguments[0];
        this._edge = t
    };
    hp.prototype.getSplitCoordinates = function () {
        var t = new cc;
        this.addEndpoints();
        for (var e = this.iterator(), n = e.next(); e.hasNext();) {
            var r = e.next();
            this.addEdgeCoordinates(n, r, t), n = r
        }
        return t.toCoordinateArray()
    }, hp.prototype.addCollapsedNodes = function () {
        var t = new uc;
        this.findCollapsesFromInsertedNodes(t), this.findCollapsesFromExistingVertices(t);
        for (var e = t.iterator(); e.hasNext();) {
            var n = e.next().intValue();
            this.add(this._edge.getCoordinate(n), n)
        }
    }, hp.prototype.print = function (t) {
        t.println("Intersections:");
        for (var e = this.iterator(); e.hasNext();) {
            e.next().print(t)
        }
    }, hp.prototype.findCollapsesFromExistingVertices = function (t) {
        for (var e = 0; e < this._edge.size() - 2; e++) {
            var n = this._edge.getCoordinate(e), r = this._edge.getCoordinate(e + 2);
            n.equals2D(r) && t.add(new vl(e + 1))
        }
    }, hp.prototype.addEdgeCoordinates = function (t, e, n) {
        var r = this._edge.getCoordinate(e.segmentIndex), i = e.isInterior() || !e.coord.equals2D(r);
        n.add(new al(t.coord), !1);
        for (var o = t.segmentIndex + 1; o <= e.segmentIndex; o++) n.add(this._edge.getCoordinate(o));
        i && n.add(new al(e.coord))
    }, hp.prototype.iterator = function () {
        return this._nodeMap.values().iterator()
    }, hp.prototype.addSplitEdges = function (t) {
        this.addEndpoints(), this.addCollapsedNodes();
        for (var e = this.iterator(), n = e.next(); e.hasNext();) {
            var r = e.next(), i = this.createSplitEdge(n, r);
            t.add(i), n = r
        }
    }, hp.prototype.findCollapseIndex = function (t, e, n) {
        if (!t.coord.equals2D(e.coord)) return !1;
        var r = e.segmentIndex - t.segmentIndex;
        return e.isInterior() || r--, 1 === r && (n[0] = t.segmentIndex + 1, !0)
    }, hp.prototype.findCollapsesFromInsertedNodes = function (t) {
        for (var e = new Array(1).fill(null), n = this.iterator(), r = n.next(); n.hasNext();) {
            var i = n.next();
            this.findCollapseIndex(r, i, e) && t.add(new vl(e[0])), r = i
        }
    }, hp.prototype.getEdge = function () {
        return this._edge
    }, hp.prototype.addEndpoints = function () {
        var t = this._edge.size() - 1;
        this.add(this._edge.getCoordinate(0), 0), this.add(this._edge.getCoordinate(t), t)
    }, hp.prototype.createSplitEdge = function (t, e) {
        var n = e.segmentIndex - t.segmentIndex + 2, r = this._edge.getCoordinate(e.segmentIndex),
            i = e.isInterior() || !e.coord.equals2D(r);
        i || n--;
        var o = new Array(n).fill(null), s = 0;
        o[s++] = new al(t.coord);
        for (var a = t.segmentIndex + 1; a <= e.segmentIndex; a++) o[s++] = this._edge.getCoordinate(a);
        return i && (o[s] = new al(e.coord)), new dp(o, this._edge.getData())
    }, hp.prototype.add = function (t, e) {
        var n = new cp(this._edge, t, e, this._edge.getSegmentOctant(e)), r = this._nodeMap.get(n);
        return null !== r ? (Gl.isTrue(r.coord.equals2D(t), "Found equal nodes with different coordinates"), r) : (this._nodeMap.put(n, n), n)
    }, hp.prototype.checkSplitEdgesCorrectness = function (t) {
        var e = this._edge.getCoordinates(), n = t.get(0).getCoordinate(0);
        if (!n.equals2D(e[0])) throw new Fl("bad split edge start point at " + n);
        var r = t.get(t.size() - 1).getCoordinates(), i = r[r.length - 1];
        if (!i.equals2D(e[e.length - 1])) throw new Fl("bad split edge end point at " + i)
    }, hp.prototype.interfaces_ = function () {
        return []
    }, hp.prototype.getClass = function () {
        return hp
    };
    var pp = function () {
    };
    pp.prototype.interfaces_ = function () {
        return []
    }, pp.prototype.getClass = function () {
        return pp
    }, pp.octant = function () {
        if ("number" == typeof arguments[0] && "number" == typeof arguments[1]) {
            var t = arguments[0], e = arguments[1];
            if (0 === t && 0 === e) throw new tl("Cannot compute the octant for point ( " + t + ", " + e + " )");
            var n = Math.abs(t), r = Math.abs(e);
            return t >= 0 ? e >= 0 ? n >= r ? 0 : 1 : n >= r ? 7 : 6 : e >= 0 ? n >= r ? 3 : 2 : n >= r ? 4 : 5
        }
        if (arguments[0] instanceof al && arguments[1] instanceof al) {
            var i = arguments[0], o = arguments[1], s = o.x - i.x, a = o.y - i.y;
            if (0 === s && 0 === a) throw new tl("Cannot compute the octant for two identical points " + i);
            return pp.octant(s, a)
        }
    };
    var fp = function () {
    };
    fp.prototype.getCoordinates = function () {
    }, fp.prototype.size = function () {
    }, fp.prototype.getCoordinate = function (t) {
    }, fp.prototype.isClosed = function () {
    }, fp.prototype.setData = function (t) {
    }, fp.prototype.getData = function () {
    }, fp.prototype.interfaces_ = function () {
        return []
    }, fp.prototype.getClass = function () {
        return fp
    };
    var gp = function () {
    };
    gp.prototype.addIntersection = function (t, e) {
    }, gp.prototype.interfaces_ = function () {
        return [fp]
    }, gp.prototype.getClass = function () {
        return gp
    };
    var dp = function () {
        this._nodeList = new hp(this), this._pts = null, this._data = null;
        var t = arguments[0], e = arguments[1];
        this._pts = t, this._data = e
    };
    dp.prototype.getCoordinates = function () {
        return this._pts
    }, dp.prototype.size = function () {
        return this._pts.length
    }, dp.prototype.getCoordinate = function (t) {
        return this._pts[t]
    }, dp.prototype.isClosed = function () {
        return this._pts[0].equals(this._pts[this._pts.length - 1])
    }, dp.prototype.getSegmentOctant = function (t) {
        return t === this._pts.length - 1 ? -1 : this.safeOctant(this.getCoordinate(t), this.getCoordinate(t + 1))
    }, dp.prototype.setData = function (t) {
        this._data = t
    }, dp.prototype.safeOctant = function (t, e) {
        return t.equals2D(e) ? 0 : pp.octant(t, e)
    }, dp.prototype.getData = function () {
        return this._data
    }, dp.prototype.addIntersection = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            this.addIntersectionNode(t, e)
        } else if (4 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = arguments[3], o = new al(n.getIntersection(i));
            this.addIntersection(o, r)
        }
    }, dp.prototype.toString = function () {
        return Dl.toLineString(new uh(this._pts))
    }, dp.prototype.getNodeList = function () {
        return this._nodeList
    }, dp.prototype.addIntersectionNode = function (t, e) {
        var n = e, r = n + 1;
        if (r < this._pts.length) {
            var i = this._pts[r];
            t.equals2D(i) && (n = r)
        }
        return this._nodeList.add(t, n)
    }, dp.prototype.addIntersections = function (t, e, n) {
        for (var r = 0; r < t.getIntersectionNum(); r++) this.addIntersection(t, e, n, r)
    }, dp.prototype.interfaces_ = function () {
        return [gp]
    }, dp.prototype.getClass = function () {
        return dp
    }, dp.getNodedSubstrings = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = new uc;
            return dp.getNodedSubstrings(t, e), e
        }
        if (2 === arguments.length) for (var n = arguments[0], r = arguments[1], i = n.iterator(); i.hasNext();) {
            var o = i.next();
            o.getNodeList().addSplitEdges(r)
        }
    };
    var yp = function () {
        if (this.p0 = null, this.p1 = null, 0 === arguments.length) this.p0 = new al, this.p1 = new al; else if (1 === arguments.length) {
            var t = arguments[0];
            this.p0 = new al(t.p0), this.p1 = new al(t.p1)
        } else if (2 === arguments.length) this.p0 = arguments[0], this.p1 = arguments[1]; else if (4 === arguments.length) {
            var e = arguments[0], n = arguments[1], r = arguments[2], i = arguments[3];
            this.p0 = new al(e, n), this.p1 = new al(r, i)
        }
    }, vp = {serialVersionUID: {configurable: !0}};
    yp.prototype.minX = function () {
        return Math.min(this.p0.x, this.p1.x)
    }, yp.prototype.orientationIndex = function () {
        if (arguments[0] instanceof yp) {
            var t = arguments[0], e = Vl.orientationIndex(this.p0, this.p1, t.p0),
                n = Vl.orientationIndex(this.p0, this.p1, t.p1);
            return e >= 0 && n >= 0 || e <= 0 && n <= 0 ? Math.max(e, n) : 0
        }
        if (arguments[0] instanceof al) {
            var r = arguments[0];
            return Vl.orientationIndex(this.p0, this.p1, r)
        }
    }, yp.prototype.toGeometry = function (t) {
        return t.createLineString([this.p0, this.p1])
    }, yp.prototype.isVertical = function () {
        return this.p0.x === this.p1.x
    }, yp.prototype.equals = function (t) {
        if (!(t instanceof yp)) return !1;
        var e = t;
        return this.p0.equals(e.p0) && this.p1.equals(e.p1)
    }, yp.prototype.intersection = function (t) {
        var e = new zl;
        return e.computeIntersection(this.p0, this.p1, t.p0, t.p1), e.hasIntersection() ? e.getIntersection(0) : null
    }, yp.prototype.project = function () {
        if (arguments[0] instanceof al) {
            var t = arguments[0];
            if (t.equals(this.p0) || t.equals(this.p1)) return new al(t);
            var e = this.projectionFactor(t), n = new al;
            return n.x = this.p0.x + e * (this.p1.x - this.p0.x), n.y = this.p0.y + e * (this.p1.y - this.p0.y), n
        }
        if (arguments[0] instanceof yp) {
            var r = arguments[0], i = this.projectionFactor(r.p0), o = this.projectionFactor(r.p1);
            if (i >= 1 && o >= 1) return null;
            if (i <= 0 && o <= 0) return null;
            var s = this.project(r.p0);
            i < 0 && (s = this.p0), i > 1 && (s = this.p1);
            var a = this.project(r.p1);
            return o < 0 && (a = this.p0), o > 1 && (a = this.p1), new yp(s, a)
        }
    }, yp.prototype.normalize = function () {
        this.p1.compareTo(this.p0) < 0 && this.reverse()
    }, yp.prototype.angle = function () {
        return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x)
    }, yp.prototype.getCoordinate = function (t) {
        return 0 === t ? this.p0 : this.p1
    }, yp.prototype.distancePerpendicular = function (t) {
        return Vl.distancePointLinePerpendicular(t, this.p0, this.p1)
    }, yp.prototype.minY = function () {
        return Math.min(this.p0.y, this.p1.y)
    }, yp.prototype.midPoint = function () {
        return yp.midPoint(this.p0, this.p1)
    }, yp.prototype.projectionFactor = function (t) {
        if (t.equals(this.p0)) return 0;
        if (t.equals(this.p1)) return 1;
        var e = this.p1.x - this.p0.x, n = this.p1.y - this.p0.y, r = e * e + n * n;
        return r <= 0 ? el.NaN : ((t.x - this.p0.x) * e + (t.y - this.p0.y) * n) / r
    }, yp.prototype.closestPoints = function (t) {
        var e = this.intersection(t);
        if (null !== e) return [e, e];
        var n = new Array(2).fill(null), r = el.MAX_VALUE, i = null, o = this.closestPoint(t.p0);
        r = o.distance(t.p0), n[0] = o, n[1] = t.p0;
        var s = this.closestPoint(t.p1);
        (i = s.distance(t.p1)) < r && (r = i, n[0] = s, n[1] = t.p1);
        var a = t.closestPoint(this.p0);
        (i = a.distance(this.p0)) < r && (r = i, n[0] = this.p0, n[1] = a);
        var u = t.closestPoint(this.p1);
        return (i = u.distance(this.p1)) < r && (r = i, n[0] = this.p1, n[1] = u), n
    }, yp.prototype.closestPoint = function (t) {
        var e = this.projectionFactor(t);
        return e > 0 && e < 1 ? this.project(t) : this.p0.distance(t) < this.p1.distance(t) ? this.p0 : this.p1
    }, yp.prototype.maxX = function () {
        return Math.max(this.p0.x, this.p1.x)
    }, yp.prototype.getLength = function () {
        return this.p0.distance(this.p1)
    }, yp.prototype.compareTo = function (t) {
        var e = t, n = this.p0.compareTo(e.p0);
        return 0 !== n ? n : this.p1.compareTo(e.p1)
    }, yp.prototype.reverse = function () {
        var t = this.p0;
        this.p0 = this.p1, this.p1 = t
    }, yp.prototype.equalsTopo = function (t) {
        return this.p0.equals(t.p0) && (this.p1.equals(t.p1) || this.p0.equals(t.p1)) && this.p1.equals(t.p0)
    }, yp.prototype.lineIntersection = function (t) {
        try {
            return Pl.intersection(this.p0, this.p1, t.p0, t.p1)
        } catch (t) {
            if (!(t instanceof Sl)) throw t
        }
        return null
    }, yp.prototype.maxY = function () {
        return Math.max(this.p0.y, this.p1.y)
    }, yp.prototype.pointAlongOffset = function (t, e) {
        var n = this.p0.x + t * (this.p1.x - this.p0.x), r = this.p0.y + t * (this.p1.y - this.p0.y),
            i = this.p1.x - this.p0.x, o = this.p1.y - this.p0.y, s = Math.sqrt(i * i + o * o), a = 0, u = 0;
        if (0 !== e) {
            if (s <= 0) throw new Error("Cannot compute offset from zero-length line segment");
            a = e * i / s, u = e * o / s
        }
        return new al(n - u, r + a)
    }, yp.prototype.setCoordinates = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.setCoordinates(t.p0, t.p1)
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            this.p0.x = e.x, this.p0.y = e.y, this.p1.x = n.x, this.p1.y = n.y
        }
    }, yp.prototype.segmentFraction = function (t) {
        var e = this.projectionFactor(t);
        return e < 0 ? e = 0 : (e > 1 || el.isNaN(e)) && (e = 1), e
    }, yp.prototype.toString = function () {
        return "LINESTRING( " + this.p0.x + " " + this.p0.y + ", " + this.p1.x + " " + this.p1.y + ")"
    }, yp.prototype.isHorizontal = function () {
        return this.p0.y === this.p1.y
    }, yp.prototype.distance = function () {
        if (arguments[0] instanceof yp) {
            var t = arguments[0];
            return Vl.distanceLineLine(this.p0, this.p1, t.p0, t.p1)
        }
        if (arguments[0] instanceof al) {
            var e = arguments[0];
            return Vl.distancePointLine(e, this.p0, this.p1)
        }
    }, yp.prototype.pointAlong = function (t) {
        var e = new al;
        return e.x = this.p0.x + t * (this.p1.x - this.p0.x), e.y = this.p0.y + t * (this.p1.y - this.p0.y), e
    }, yp.prototype.hashCode = function () {
        var t = el.doubleToLongBits(this.p0.x);
        t ^= 31 * el.doubleToLongBits(this.p0.y);
        var e = Math.trunc(t) ^ Math.trunc(t >> 32), n = el.doubleToLongBits(this.p1.x);
        return n ^= 31 * el.doubleToLongBits(this.p1.y), e ^ (Math.trunc(n) ^ Math.trunc(n >> 32))
    }, yp.prototype.interfaces_ = function () {
        return [rl, sl]
    }, yp.prototype.getClass = function () {
        return yp
    }, yp.midPoint = function (t, e) {
        return new al((t.x + e.x) / 2, (t.y + e.y) / 2)
    }, vp.serialVersionUID.get = function () {
        return 0x2d2172135f411c00
    }, Object.defineProperties(yp, vp);
    var _p = function () {
        this.tempEnv1 = new Ll, this.tempEnv2 = new Ll, this._overlapSeg1 = new yp, this._overlapSeg2 = new yp
    };
    _p.prototype.overlap = function () {
        if (2 === arguments.length) ; else if (4 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = arguments[2], r = arguments[3];
            t.getLineSegment(e, this._overlapSeg1), n.getLineSegment(r, this._overlapSeg2), this.overlap(this._overlapSeg1, this._overlapSeg2)
        }
    }, _p.prototype.interfaces_ = function () {
        return []
    }, _p.prototype.getClass = function () {
        return _p
    };
    var mp = function () {
        this._pts = null, this._start = null, this._end = null, this._env = null, this._context = null, this._id = null;
        var t = arguments[0], e = arguments[1], n = arguments[2], r = arguments[3];
        this._pts = t, this._start = e, this._end = n, this._context = r
    };
    mp.prototype.getLineSegment = function (t, e) {
        e.p0 = this._pts[t], e.p1 = this._pts[t + 1]
    }, mp.prototype.computeSelect = function (t, e, n, r) {
        var i = this._pts[e], o = this._pts[n];
        if (r.tempEnv1.init(i, o), n - e == 1) return r.select(this, e), null;
        if (!t.intersects(r.tempEnv1)) return null;
        var s = Math.trunc((e + n) / 2);
        e < s && this.computeSelect(t, e, s, r), s < n && this.computeSelect(t, s, n, r)
    }, mp.prototype.getCoordinates = function () {
        for (var t = new Array(this._end - this._start + 1).fill(null), e = 0, n = this._start; n <= this._end; n++) t[e++] = this._pts[n];
        return t
    }, mp.prototype.computeOverlaps = function (t, e) {
        this.computeOverlapsInternal(this._start, this._end, t, t._start, t._end, e)
    }, mp.prototype.setId = function (t) {
        this._id = t
    }, mp.prototype.select = function (t, e) {
        this.computeSelect(t, this._start, this._end, e)
    }, mp.prototype.getEnvelope = function () {
        if (null === this._env) {
            var t = this._pts[this._start], e = this._pts[this._end];
            this._env = new Ll(t, e)
        }
        return this._env
    }, mp.prototype.getEndIndex = function () {
        return this._end
    }, mp.prototype.getStartIndex = function () {
        return this._start
    }, mp.prototype.getContext = function () {
        return this._context
    }, mp.prototype.getId = function () {
        return this._id
    }, mp.prototype.computeOverlapsInternal = function (t, e, n, r, i, o) {
        var s = this._pts[t], a = this._pts[e], u = n._pts[r], l = n._pts[i];
        if (e - t == 1 && i - r == 1) return o.overlap(this, t, n, r), null;
        if (o.tempEnv1.init(s, a), o.tempEnv2.init(u, l), !o.tempEnv1.intersects(o.tempEnv2)) return null;
        var c = Math.trunc((t + e) / 2), h = Math.trunc((r + i) / 2);
        t < c && (r < h && this.computeOverlapsInternal(t, c, n, r, h, o), h < i && this.computeOverlapsInternal(t, c, n, h, i, o)), c < e && (r < h && this.computeOverlapsInternal(c, e, n, r, h, o), h < i && this.computeOverlapsInternal(c, e, n, h, i, o))
    }, mp.prototype.interfaces_ = function () {
        return []
    }, mp.prototype.getClass = function () {
        return mp
    };
    var xp = function () {
    };
    xp.prototype.interfaces_ = function () {
        return []
    }, xp.prototype.getClass = function () {
        return xp
    }, xp.getChainStartIndices = function (t) {
        var e = 0, n = new uc;
        n.add(new vl(e));
        do {
            var r = xp.findChainEnd(t, e);
            n.add(new vl(r)), e = r
        } while (e < t.length - 1);
        return xp.toIntArray(n)
    }, xp.findChainEnd = function (t, e) {
        for (var n = e; n < t.length - 1 && t[n].equals2D(t[n + 1]);) n++;
        if (n >= t.length - 1) return t.length - 1;
        for (var r = zh.quadrant(t[n], t[n + 1]), i = e + 1; i < t.length;) {
            if (!t[i - 1].equals2D(t[i])) if (zh.quadrant(t[i - 1], t[i]) !== r) break;
            i++
        }
        return i - 1
    }, xp.getChains = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return xp.getChains(t, null)
        }
        if (2 === arguments.length) {
            for (var e = arguments[0], n = arguments[1], r = new uc, i = xp.getChainStartIndices(e), o = 0; o < i.length - 1; o++) {
                var s = new mp(e, i[o], i[o + 1], n);
                r.add(s)
            }
            return r
        }
    }, xp.toIntArray = function (t) {
        for (var e = new Array(t.size()).fill(null), n = 0; n < e.length; n++) e[n] = t.get(n).intValue();
        return e
    };
    var Ep = function () {
    };
    Ep.prototype.computeNodes = function (t) {
    }, Ep.prototype.getNodedSubstrings = function () {
    }, Ep.prototype.interfaces_ = function () {
        return []
    }, Ep.prototype.getClass = function () {
        return Ep
    };
    var bp = function () {
        if (this._segInt = null, 0 === arguments.length) ; else if (1 === arguments.length) {
            var t = arguments[0];
            this.setSegmentIntersector(t)
        }
    };
    bp.prototype.setSegmentIntersector = function (t) {
        this._segInt = t
    }, bp.prototype.interfaces_ = function () {
        return [Ep]
    }, bp.prototype.getClass = function () {
        return bp
    };
    var wp = function (t) {
        function e(e) {
            e ? t.call(this, e) : t.call(this), this._monoChains = new uc, this._index = new ap, this._idCounter = 0, this._nodedSegStrings = null, this._nOverlaps = 0
        }

        t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
        var n = {SegmentOverlapAction: {configurable: !0}};
        return e.prototype.getMonotoneChains = function () {
            return this._monoChains
        }, e.prototype.getNodedSubstrings = function () {
            return dp.getNodedSubstrings(this._nodedSegStrings)
        }, e.prototype.getIndex = function () {
            return this._index
        }, e.prototype.add = function (t) {
            for (var e = this, n = xp.getChains(t.getCoordinates(), t).iterator(); n.hasNext();) {
                var r = n.next();
                r.setId(e._idCounter++), e._index.insert(r.getEnvelope(), r), e._monoChains.add(r)
            }
        }, e.prototype.computeNodes = function (t) {
            this._nodedSegStrings = t;
            for (var e = t.iterator(); e.hasNext();) this.add(e.next());
            this.intersectChains()
        }, e.prototype.intersectChains = function () {
            for (var t = this, e = new Ip(this._segInt), n = this._monoChains.iterator(); n.hasNext();) for (var r = n.next(), i = t._index.query(r.getEnvelope()).iterator(); i.hasNext();) {
                var o = i.next();
                if (o.getId() > r.getId() && (r.computeOverlaps(o, e), t._nOverlaps++), t._segInt.isDone()) return null
            }
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, n.SegmentOverlapAction.get = function () {
            return Ip
        }, Object.defineProperties(e, n), e
    }(bp), Ip = function (t) {
        function e() {
            t.call(this), this._si = null;
            var e = arguments[0];
            this._si = e
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.overlap = function () {
            if (4 !== arguments.length) return t.prototype.overlap.apply(this, arguments);
            var e = arguments[0], n = arguments[1], r = arguments[2], i = arguments[3], o = e.getContext(),
                s = r.getContext();
            this._si.processIntersections(o, n, s, i)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(_p), Np = function t() {
        if (this._quadrantSegments = t.DEFAULT_QUADRANT_SEGMENTS, this._endCapStyle = t.CAP_ROUND, this._joinStyle = t.JOIN_ROUND, this._mitreLimit = t.DEFAULT_MITRE_LIMIT, this._isSingleSided = !1, this._simplifyFactor = t.DEFAULT_SIMPLIFY_FACTOR, 0 === arguments.length) ; else if (1 === arguments.length) {
            var e = arguments[0];
            this.setQuadrantSegments(e)
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1];
            this.setQuadrantSegments(n), this.setEndCapStyle(r)
        } else if (4 === arguments.length) {
            var i = arguments[0], o = arguments[1], s = arguments[2], a = arguments[3];
            this.setQuadrantSegments(i), this.setEndCapStyle(o), this.setJoinStyle(s), this.setMitreLimit(a)
        }
    }, Sp = {
        CAP_ROUND: {configurable: !0},
        CAP_FLAT: {configurable: !0},
        CAP_SQUARE: {configurable: !0},
        JOIN_ROUND: {configurable: !0},
        JOIN_MITRE: {configurable: !0},
        JOIN_BEVEL: {configurable: !0},
        DEFAULT_QUADRANT_SEGMENTS: {configurable: !0},
        DEFAULT_MITRE_LIMIT: {configurable: !0},
        DEFAULT_SIMPLIFY_FACTOR: {configurable: !0}
    };
    Np.prototype.getEndCapStyle = function () {
        return this._endCapStyle
    }, Np.prototype.isSingleSided = function () {
        return this._isSingleSided
    }, Np.prototype.setQuadrantSegments = function (t) {
        this._quadrantSegments = t, 0 === this._quadrantSegments && (this._joinStyle = Np.JOIN_BEVEL), this._quadrantSegments < 0 && (this._joinStyle = Np.JOIN_MITRE, this._mitreLimit = Math.abs(this._quadrantSegments)), t <= 0 && (this._quadrantSegments = 1), this._joinStyle !== Np.JOIN_ROUND && (this._quadrantSegments = Np.DEFAULT_QUADRANT_SEGMENTS)
    }, Np.prototype.getJoinStyle = function () {
        return this._joinStyle
    }, Np.prototype.setJoinStyle = function (t) {
        this._joinStyle = t
    }, Np.prototype.setSimplifyFactor = function (t) {
        this._simplifyFactor = t < 0 ? 0 : t
    }, Np.prototype.getSimplifyFactor = function () {
        return this._simplifyFactor
    }, Np.prototype.getQuadrantSegments = function () {
        return this._quadrantSegments
    }, Np.prototype.setEndCapStyle = function (t) {
        this._endCapStyle = t
    }, Np.prototype.getMitreLimit = function () {
        return this._mitreLimit
    }, Np.prototype.setMitreLimit = function (t) {
        this._mitreLimit = t
    }, Np.prototype.setSingleSided = function (t) {
        this._isSingleSided = t
    }, Np.prototype.interfaces_ = function () {
        return []
    }, Np.prototype.getClass = function () {
        return Np
    }, Np.bufferDistanceError = function (t) {
        var e = Math.PI / 2 / t;
        return 1 - Math.cos(e / 2)
    }, Sp.CAP_ROUND.get = function () {
        return 1
    }, Sp.CAP_FLAT.get = function () {
        return 2
    }, Sp.CAP_SQUARE.get = function () {
        return 3
    }, Sp.JOIN_ROUND.get = function () {
        return 1
    }, Sp.JOIN_MITRE.get = function () {
        return 2
    }, Sp.JOIN_BEVEL.get = function () {
        return 3
    }, Sp.DEFAULT_QUADRANT_SEGMENTS.get = function () {
        return 8
    }, Sp.DEFAULT_MITRE_LIMIT.get = function () {
        return 5
    }, Sp.DEFAULT_SIMPLIFY_FACTOR.get = function () {
        return .01
    }, Object.defineProperties(Np, Sp);
    var Cp = function (t) {
        this._distanceTol = null, this._isDeleted = null, this._angleOrientation = Vl.COUNTERCLOCKWISE, this._inputLine = t || null
    }, Pp = {
        INIT: {configurable: !0},
        DELETE: {configurable: !0},
        KEEP: {configurable: !0},
        NUM_PTS_TO_CHECK: {configurable: !0}
    };
    Cp.prototype.isDeletable = function (t, e, n, r) {
        var i = this._inputLine[t], o = this._inputLine[e], s = this._inputLine[n];
        return !!this.isConcave(i, o, s) && (!!this.isShallow(i, o, s, r) && this.isShallowSampled(i, o, t, n, r))
    }, Cp.prototype.deleteShallowConcavities = function () {
        for (var t = this, e = 1, n = this.findNextNonDeletedIndex(e), r = this.findNextNonDeletedIndex(n), i = !1; r < this._inputLine.length;) {
            var o = !1;
            t.isDeletable(e, n, r, t._distanceTol) && (t._isDeleted[n] = Cp.DELETE, o = !0, i = !0), e = o ? r : n, n = t.findNextNonDeletedIndex(e), r = t.findNextNonDeletedIndex(n)
        }
        return i
    }, Cp.prototype.isShallowConcavity = function (t, e, n, r) {
        return Vl.computeOrientation(t, e, n) === this._angleOrientation && Vl.distancePointLine(e, t, n) < r
    }, Cp.prototype.isShallowSampled = function (t, e, n, r, i) {
        var o = Math.trunc((r - n) / Cp.NUM_PTS_TO_CHECK);
        o <= 0 && (o = 1);
        for (var s = n; s < r; s += o) if (!this.isShallow(t, e, this._inputLine[s], i)) return !1;
        return !0
    }, Cp.prototype.isConcave = function (t, e, n) {
        var r = Vl.computeOrientation(t, e, n) === this._angleOrientation;
        return r
    }, Cp.prototype.simplify = function (t) {
        this._distanceTol = Math.abs(t), t < 0 && (this._angleOrientation = Vl.CLOCKWISE), this._isDeleted = new Array(this._inputLine.length).fill(null);
        var e = !1;
        do {
            e = this.deleteShallowConcavities()
        } while (e);
        return this.collapseLine()
    }, Cp.prototype.findNextNonDeletedIndex = function (t) {
        for (var e = t + 1; e < this._inputLine.length && this._isDeleted[e] === Cp.DELETE;) e++;
        return e
    }, Cp.prototype.isShallow = function (t, e, n, r) {
        return Vl.distancePointLine(e, t, n) < r
    }, Cp.prototype.collapseLine = function () {
        for (var t = new cc, e = 0; e < this._inputLine.length; e++) this._isDeleted[e] !== Cp.DELETE && t.add(this._inputLine[e]);
        return t.toCoordinateArray()
    }, Cp.prototype.interfaces_ = function () {
        return []
    }, Cp.prototype.getClass = function () {
        return Cp
    }, Cp.simplify = function (t, e) {
        return new Cp(t).simplify(e)
    }, Pp.INIT.get = function () {
        return 0
    }, Pp.DELETE.get = function () {
        return 1
    }, Pp.KEEP.get = function () {
        return 1
    }, Pp.NUM_PTS_TO_CHECK.get = function () {
        return 10
    }, Object.defineProperties(Cp, Pp);
    var Lp = function () {
        this._ptList = null, this._precisionModel = null, this._minimimVertexDistance = 0, this._ptList = new uc
    }, Mp = {COORDINATE_ARRAY_TYPE: {configurable: !0}};
    Lp.prototype.getCoordinates = function () {
        return this._ptList.toArray(Lp.COORDINATE_ARRAY_TYPE)
    }, Lp.prototype.setPrecisionModel = function (t) {
        this._precisionModel = t
    }, Lp.prototype.addPt = function (t) {
        var e = new al(t);
        if (this._precisionModel.makePrecise(e), this.isRedundant(e)) return null;
        this._ptList.add(e)
    }, Lp.prototype.revere = function () {
    }, Lp.prototype.addPts = function (t, e) {
        if (e) for (var n = 0; n < t.length; n++) this.addPt(t[n]); else for (var r = t.length - 1; r >= 0; r--) this.addPt(t[r])
    }, Lp.prototype.isRedundant = function (t) {
        if (this._ptList.size() < 1) return !1;
        var e = this._ptList.get(this._ptList.size() - 1);
        return t.distance(e) < this._minimimVertexDistance
    }, Lp.prototype.toString = function () {
        return (new vh).createLineString(this.getCoordinates()).toString()
    }, Lp.prototype.closeRing = function () {
        if (this._ptList.size() < 1) return null;
        var t = new al(this._ptList.get(0)), e = this._ptList.get(this._ptList.size() - 1);
        if (t.equals(e)) return null;
        this._ptList.add(t)
    }, Lp.prototype.setMinimumVertexDistance = function (t) {
        this._minimimVertexDistance = t
    }, Lp.prototype.interfaces_ = function () {
        return []
    }, Lp.prototype.getClass = function () {
        return Lp
    }, Mp.COORDINATE_ARRAY_TYPE.get = function () {
        return new Array(0).fill(null)
    }, Object.defineProperties(Lp, Mp);
    var Op = function () {
    }, Rp = {
        PI_TIMES_2: {configurable: !0},
        PI_OVER_2: {configurable: !0},
        PI_OVER_4: {configurable: !0},
        COUNTERCLOCKWISE: {configurable: !0},
        CLOCKWISE: {configurable: !0},
        NONE: {configurable: !0}
    };
    Op.prototype.interfaces_ = function () {
        return []
    }, Op.prototype.getClass = function () {
        return Op
    }, Op.toDegrees = function (t) {
        return 180 * t / Math.PI
    }, Op.normalize = function (t) {
        for (; t > Math.PI;) t -= Op.PI_TIMES_2;
        for (; t <= -Math.PI;) t += Op.PI_TIMES_2;
        return t
    }, Op.angle = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return Math.atan2(t.y, t.x)
        }
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1], r = n.x - e.x, i = n.y - e.y;
            return Math.atan2(i, r)
        }
    }, Op.isAcute = function (t, e, n) {
        var r = t.x - e.x, i = t.y - e.y;
        return r * (n.x - e.x) + i * (n.y - e.y) > 0
    }, Op.isObtuse = function (t, e, n) {
        var r = t.x - e.x, i = t.y - e.y;
        return r * (n.x - e.x) + i * (n.y - e.y) < 0
    }, Op.interiorAngle = function (t, e, n) {
        var r = Op.angle(e, t), i = Op.angle(e, n);
        return Math.abs(i - r)
    }, Op.normalizePositive = function (t) {
        if (t < 0) {
            for (; t < 0;) t += Op.PI_TIMES_2;
            t >= Op.PI_TIMES_2 && (t = 0)
        } else {
            for (; t >= Op.PI_TIMES_2;) t -= Op.PI_TIMES_2;
            t < 0 && (t = 0)
        }
        return t
    }, Op.angleBetween = function (t, e, n) {
        var r = Op.angle(e, t), i = Op.angle(e, n);
        return Op.diff(r, i)
    }, Op.diff = function (t, e) {
        var n = null;
        return (n = t < e ? e - t : t - e) > Math.PI && (n = 2 * Math.PI - n), n
    }, Op.toRadians = function (t) {
        return t * Math.PI / 180
    }, Op.getTurn = function (t, e) {
        var n = Math.sin(e - t);
        return n > 0 ? Op.COUNTERCLOCKWISE : n < 0 ? Op.CLOCKWISE : Op.NONE
    }, Op.angleBetweenOriented = function (t, e, n) {
        var r = Op.angle(e, t), i = Op.angle(e, n) - r;
        return i <= -Math.PI ? i + Op.PI_TIMES_2 : i > Math.PI ? i - Op.PI_TIMES_2 : i
    }, Rp.PI_TIMES_2.get = function () {
        return 2 * Math.PI
    }, Rp.PI_OVER_2.get = function () {
        return Math.PI / 2
    }, Rp.PI_OVER_4.get = function () {
        return Math.PI / 4
    }, Rp.COUNTERCLOCKWISE.get = function () {
        return Vl.COUNTERCLOCKWISE
    }, Rp.CLOCKWISE.get = function () {
        return Vl.CLOCKWISE
    }, Rp.NONE.get = function () {
        return Vl.COLLINEAR
    }, Object.defineProperties(Op, Rp);
    var Tp = function t() {
        this._maxCurveSegmentError = 0, this._filletAngleQuantum = null, this._closingSegLengthFactor = 1, this._segList = null, this._distance = 0, this._precisionModel = null, this._bufParams = null, this._li = null, this._s0 = null, this._s1 = null, this._s2 = null, this._seg0 = new yp, this._seg1 = new yp, this._offset0 = new yp, this._offset1 = new yp, this._side = 0, this._hasNarrowConcaveAngle = !1;
        var e = arguments[0], n = arguments[1], r = arguments[2];
        this._precisionModel = e, this._bufParams = n, this._li = new zl, this._filletAngleQuantum = Math.PI / 2 / n.getQuadrantSegments(), n.getQuadrantSegments() >= 8 && n.getJoinStyle() === Np.JOIN_ROUND && (this._closingSegLengthFactor = t.MAX_CLOSING_SEG_LEN_FACTOR), this.init(r)
    }, Ap = {
        OFFSET_SEGMENT_SEPARATION_FACTOR: {configurable: !0},
        INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR: {configurable: !0},
        CURVE_VERTEX_SNAP_DISTANCE_FACTOR: {configurable: !0},
        MAX_CLOSING_SEG_LEN_FACTOR: {configurable: !0}
    };
    Tp.prototype.addNextSegment = function (t, e) {
        if (this._s0 = this._s1, this._s1 = this._s2, this._s2 = t, this._seg0.setCoordinates(this._s0, this._s1), this.computeOffsetSegment(this._seg0, this._side, this._distance, this._offset0), this._seg1.setCoordinates(this._s1, this._s2), this.computeOffsetSegment(this._seg1, this._side, this._distance, this._offset1), this._s1.equals(this._s2)) return null;
        var n = Vl.computeOrientation(this._s0, this._s1, this._s2),
            r = n === Vl.CLOCKWISE && this._side === Nh.LEFT || n === Vl.COUNTERCLOCKWISE && this._side === Nh.RIGHT;
        0 === n ? this.addCollinear(e) : r ? this.addOutsideTurn(n, e) : this.addInsideTurn(n, e)
    }, Tp.prototype.addLineEndCap = function (t, e) {
        var n = new yp(t, e), r = new yp;
        this.computeOffsetSegment(n, Nh.LEFT, this._distance, r);
        var i = new yp;
        this.computeOffsetSegment(n, Nh.RIGHT, this._distance, i);
        var o = e.x - t.x, s = e.y - t.y, a = Math.atan2(s, o);
        switch (this._bufParams.getEndCapStyle()) {
            case Np.CAP_ROUND:
                this._segList.addPt(r.p1), this.addFilletArc(e, a + Math.PI / 2, a - Math.PI / 2, Vl.CLOCKWISE, this._distance), this._segList.addPt(i.p1);
                break;
            case Np.CAP_FLAT:
                this._segList.addPt(r.p1), this._segList.addPt(i.p1);
                break;
            case Np.CAP_SQUARE:
                var u = new al;
                u.x = Math.abs(this._distance) * Math.cos(a), u.y = Math.abs(this._distance) * Math.sin(a);
                var l = new al(r.p1.x + u.x, r.p1.y + u.y), c = new al(i.p1.x + u.x, i.p1.y + u.y);
                this._segList.addPt(l), this._segList.addPt(c)
        }
    }, Tp.prototype.getCoordinates = function () {
        return this._segList.getCoordinates()
    }, Tp.prototype.addMitreJoin = function (t, e, n, r) {
        var i = !0, o = null;
        try {
            o = Pl.intersection(e.p0, e.p1, n.p0, n.p1), (r <= 0 ? 1 : o.distance(t) / Math.abs(r)) > this._bufParams.getMitreLimit() && (i = !1)
        } catch (t) {
            if (!(t instanceof Sl)) throw t;
            o = new al(0, 0), i = !1
        }
        i ? this._segList.addPt(o) : this.addLimitedMitreJoin(e, n, r, this._bufParams.getMitreLimit())
    }, Tp.prototype.addFilletCorner = function (t, e, n, r, i) {
        var o = e.x - t.x, s = e.y - t.y, a = Math.atan2(s, o), u = n.x - t.x, l = n.y - t.y, c = Math.atan2(l, u);
        r === Vl.CLOCKWISE ? a <= c && (a += 2 * Math.PI) : a >= c && (a -= 2 * Math.PI), this._segList.addPt(e), this.addFilletArc(t, a, c, r, i), this._segList.addPt(n)
    }, Tp.prototype.addOutsideTurn = function (t, e) {
        if (this._offset0.p1.distance(this._offset1.p0) < this._distance * Tp.OFFSET_SEGMENT_SEPARATION_FACTOR) return this._segList.addPt(this._offset0.p1), null;
        this._bufParams.getJoinStyle() === Np.JOIN_MITRE ? this.addMitreJoin(this._s1, this._offset0, this._offset1, this._distance) : this._bufParams.getJoinStyle() === Np.JOIN_BEVEL ? this.addBevelJoin(this._offset0, this._offset1) : (e && this._segList.addPt(this._offset0.p1), this.addFilletCorner(this._s1, this._offset0.p1, this._offset1.p0, t, this._distance), this._segList.addPt(this._offset1.p0))
    }, Tp.prototype.createSquare = function (t) {
        this._segList.addPt(new al(t.x + this._distance, t.y + this._distance)), this._segList.addPt(new al(t.x + this._distance, t.y - this._distance)), this._segList.addPt(new al(t.x - this._distance, t.y - this._distance)), this._segList.addPt(new al(t.x - this._distance, t.y + this._distance)), this._segList.closeRing()
    }, Tp.prototype.addSegments = function (t, e) {
        this._segList.addPts(t, e)
    }, Tp.prototype.addFirstSegment = function () {
        this._segList.addPt(this._offset1.p0)
    }, Tp.prototype.addLastSegment = function () {
        this._segList.addPt(this._offset1.p1)
    }, Tp.prototype.initSideSegments = function (t, e, n) {
        this._s1 = t, this._s2 = e, this._side = n, this._seg1.setCoordinates(t, e), this.computeOffsetSegment(this._seg1, n, this._distance, this._offset1)
    }, Tp.prototype.addLimitedMitreJoin = function (t, e, n, r) {
        var i = this._seg0.p1, o = Op.angle(i, this._seg0.p0),
            s = Op.angleBetweenOriented(this._seg0.p0, i, this._seg1.p1) / 2, a = Op.normalize(o + s),
            u = Op.normalize(a + Math.PI), l = r * n, c = n - l * Math.abs(Math.sin(s)), h = i.x + l * Math.cos(u),
            p = i.y + l * Math.sin(u), f = new al(h, p), g = new yp(i, f), d = g.pointAlongOffset(1, c),
            y = g.pointAlongOffset(1, -c);
        this._side === Nh.LEFT ? (this._segList.addPt(d), this._segList.addPt(y)) : (this._segList.addPt(y), this._segList.addPt(d))
    }, Tp.prototype.computeOffsetSegment = function (t, e, n, r) {
        var i = e === Nh.LEFT ? 1 : -1, o = t.p1.x - t.p0.x, s = t.p1.y - t.p0.y, a = Math.sqrt(o * o + s * s),
            u = i * n * o / a, l = i * n * s / a;
        r.p0.x = t.p0.x - l, r.p0.y = t.p0.y + u, r.p1.x = t.p1.x - l, r.p1.y = t.p1.y + u
    }, Tp.prototype.addFilletArc = function (t, e, n, r, i) {
        var o = r === Vl.CLOCKWISE ? -1 : 1, s = Math.abs(e - n), a = Math.trunc(s / this._filletAngleQuantum + .5);
        if (a < 1) return null;
        for (var u = s / a, l = 0, c = new al; l < s;) {
            var h = e + o * l;
            c.x = t.x + i * Math.cos(h), c.y = t.y + i * Math.sin(h), this._segList.addPt(c), l += u
        }
    }, Tp.prototype.addInsideTurn = function (t, e) {
        if (this._li.computeIntersection(this._offset0.p0, this._offset0.p1, this._offset1.p0, this._offset1.p1), this._li.hasIntersection()) this._segList.addPt(this._li.getIntersection(0)); else if (this._hasNarrowConcaveAngle = !0, this._offset0.p1.distance(this._offset1.p0) < this._distance * Tp.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) this._segList.addPt(this._offset0.p1); else {
            if (this._segList.addPt(this._offset0.p1), this._closingSegLengthFactor > 0) {
                var n = new al((this._closingSegLengthFactor * this._offset0.p1.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset0.p1.y + this._s1.y) / (this._closingSegLengthFactor + 1));
                this._segList.addPt(n);
                var r = new al((this._closingSegLengthFactor * this._offset1.p0.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset1.p0.y + this._s1.y) / (this._closingSegLengthFactor + 1));
                this._segList.addPt(r)
            } else this._segList.addPt(this._s1);
            this._segList.addPt(this._offset1.p0)
        }
    }, Tp.prototype.createCircle = function (t) {
        var e = new al(t.x + this._distance, t.y);
        this._segList.addPt(e), this.addFilletArc(t, 0, 2 * Math.PI, -1, this._distance), this._segList.closeRing()
    }, Tp.prototype.addBevelJoin = function (t, e) {
        this._segList.addPt(t.p1), this._segList.addPt(e.p0)
    }, Tp.prototype.init = function (t) {
        this._distance = t, this._maxCurveSegmentError = t * (1 - Math.cos(this._filletAngleQuantum / 2)), this._segList = new Lp, this._segList.setPrecisionModel(this._precisionModel), this._segList.setMinimumVertexDistance(t * Tp.CURVE_VERTEX_SNAP_DISTANCE_FACTOR)
    }, Tp.prototype.addCollinear = function (t) {
        this._li.computeIntersection(this._s0, this._s1, this._s1, this._s2), this._li.getIntersectionNum() >= 2 && (this._bufParams.getJoinStyle() === Np.JOIN_BEVEL || this._bufParams.getJoinStyle() === Np.JOIN_MITRE ? (t && this._segList.addPt(this._offset0.p1), this._segList.addPt(this._offset1.p0)) : this.addFilletCorner(this._s1, this._offset0.p1, this._offset1.p0, Vl.CLOCKWISE, this._distance))
    }, Tp.prototype.closeRing = function () {
        this._segList.closeRing()
    }, Tp.prototype.hasNarrowConcaveAngle = function () {
        return this._hasNarrowConcaveAngle
    }, Tp.prototype.interfaces_ = function () {
        return []
    }, Tp.prototype.getClass = function () {
        return Tp
    }, Ap.OFFSET_SEGMENT_SEPARATION_FACTOR.get = function () {
        return .001
    }, Ap.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR.get = function () {
        return .001
    }, Ap.CURVE_VERTEX_SNAP_DISTANCE_FACTOR.get = function () {
        return 1e-6
    }, Ap.MAX_CLOSING_SEG_LEN_FACTOR.get = function () {
        return 80
    }, Object.defineProperties(Tp, Ap);
    var Dp = function () {
        this._distance = 0, this._precisionModel = null, this._bufParams = null;
        var t = arguments[0], e = arguments[1];
        this._precisionModel = t, this._bufParams = e
    };
    Dp.prototype.getOffsetCurve = function (t, e) {
        if (this._distance = e, 0 === e) return null;
        var n = e < 0, r = Math.abs(e), i = this.getSegGen(r);
        t.length <= 1 ? this.computePointCurve(t[0], i) : this.computeOffsetCurve(t, n, i);
        var o = i.getCoordinates();
        return n && hc.reverse(o), o
    }, Dp.prototype.computeSingleSidedBufferCurve = function (t, e, n) {
        var r = this.simplifyTolerance(this._distance);
        if (e) {
            n.addSegments(t, !0);
            var i = Cp.simplify(t, -r), o = i.length - 1;
            n.initSideSegments(i[o], i[o - 1], Nh.LEFT), n.addFirstSegment();
            for (var s = o - 2; s >= 0; s--) n.addNextSegment(i[s], !0)
        } else {
            n.addSegments(t, !1);
            var a = Cp.simplify(t, r), u = a.length - 1;
            n.initSideSegments(a[0], a[1], Nh.LEFT), n.addFirstSegment();
            for (var l = 2; l <= u; l++) n.addNextSegment(a[l], !0)
        }
        n.addLastSegment(), n.closeRing()
    }, Dp.prototype.computeRingBufferCurve = function (t, e, n) {
        var r = this.simplifyTolerance(this._distance);
        e === Nh.RIGHT && (r = -r);
        var i = Cp.simplify(t, r), o = i.length - 1;
        n.initSideSegments(i[o - 1], i[0], e);
        for (var s = 1; s <= o; s++) {
            var a = 1 !== s;
            n.addNextSegment(i[s], a)
        }
        n.closeRing()
    }, Dp.prototype.computeLineBufferCurve = function (t, e) {
        var n = this.simplifyTolerance(this._distance), r = Cp.simplify(t, n), i = r.length - 1;
        e.initSideSegments(r[0], r[1], Nh.LEFT);
        for (var o = 2; o <= i; o++) e.addNextSegment(r[o], !0);
        e.addLastSegment(), e.addLineEndCap(r[i - 1], r[i]);
        var s = Cp.simplify(t, -n), a = s.length - 1;
        e.initSideSegments(s[a], s[a - 1], Nh.LEFT);
        for (var u = a - 2; u >= 0; u--) e.addNextSegment(s[u], !0);
        e.addLastSegment(), e.addLineEndCap(s[1], s[0]), e.closeRing()
    }, Dp.prototype.computePointCurve = function (t, e) {
        switch (this._bufParams.getEndCapStyle()) {
            case Np.CAP_ROUND:
                e.createCircle(t);
                break;
            case Np.CAP_SQUARE:
                e.createSquare(t)
        }
    }, Dp.prototype.getLineCurve = function (t, e) {
        if (this._distance = e, e < 0 && !this._bufParams.isSingleSided()) return null;
        if (0 === e) return null;
        var n = Math.abs(e), r = this.getSegGen(n);
        if (t.length <= 1) this.computePointCurve(t[0], r); else if (this._bufParams.isSingleSided()) {
            var i = e < 0;
            this.computeSingleSidedBufferCurve(t, i, r)
        } else this.computeLineBufferCurve(t, r);
        return r.getCoordinates()
    }, Dp.prototype.getBufferParameters = function () {
        return this._bufParams
    }, Dp.prototype.simplifyTolerance = function (t) {
        return t * this._bufParams.getSimplifyFactor()
    }, Dp.prototype.getRingCurve = function (t, e, n) {
        if (this._distance = n, t.length <= 2) return this.getLineCurve(t, n);
        if (0 === n) return Dp.copyCoordinates(t);
        var r = this.getSegGen(n);
        return this.computeRingBufferCurve(t, e, r), r.getCoordinates()
    }, Dp.prototype.computeOffsetCurve = function (t, e, n) {
        var r = this.simplifyTolerance(this._distance);
        if (e) {
            var i = Cp.simplify(t, -r), o = i.length - 1;
            n.initSideSegments(i[o], i[o - 1], Nh.LEFT), n.addFirstSegment();
            for (var s = o - 2; s >= 0; s--) n.addNextSegment(i[s], !0)
        } else {
            var a = Cp.simplify(t, r), u = a.length - 1;
            n.initSideSegments(a[0], a[1], Nh.LEFT), n.addFirstSegment();
            for (var l = 2; l <= u; l++) n.addNextSegment(a[l], !0)
        }
        n.addLastSegment()
    }, Dp.prototype.getSegGen = function (t) {
        return new Tp(this._precisionModel, this._bufParams, t)
    }, Dp.prototype.interfaces_ = function () {
        return []
    }, Dp.prototype.getClass = function () {
        return Dp
    }, Dp.copyCoordinates = function (t) {
        for (var e = new Array(t.length).fill(null), n = 0; n < e.length; n++) e[n] = new al(t[n]);
        return e
    };
    var Fp = function () {
        this._subgraphs = null, this._seg = new yp, this._cga = new Vl;
        var t = arguments[0];
        this._subgraphs = t
    }, kp = {DepthSegment: {configurable: !0}};
    Fp.prototype.findStabbedSegments = function () {
        var t = this;
        if (1 === arguments.length) {
            for (var e = arguments[0], n = new uc, r = this._subgraphs.iterator(); r.hasNext();) {
                var i = r.next(), o = i.getEnvelope();
                e.y < o.getMinY() || e.y > o.getMaxY() || t.findStabbedSegments(e, i.getDirectedEdges(), n)
            }
            return n
        }
        if (3 === arguments.length) if (fl(arguments[2], sc) && arguments[0] instanceof al && arguments[1] instanceof Vh) for (var s = arguments[0], a = arguments[1], u = arguments[2], l = a.getEdge().getCoordinates(), c = 0; c < l.length - 1; c++) {
            t._seg.p0 = l[c], t._seg.p1 = l[c + 1], t._seg.p0.y > t._seg.p1.y && t._seg.reverse();
            var h = Math.max(t._seg.p0.x, t._seg.p1.x);
            if (!(h < s.x) && !(t._seg.isHorizontal() || s.y < t._seg.p0.y || s.y > t._seg.p1.y || Vl.computeOrientation(t._seg.p0, t._seg.p1, s) === Vl.RIGHT)) {
                var p = a.getDepth(Nh.LEFT);
                t._seg.p0.equals(l[c]) || (p = a.getDepth(Nh.RIGHT));
                var f = new Gp(t._seg, p);
                u.add(f)
            }
        } else if (fl(arguments[2], sc) && arguments[0] instanceof al && fl(arguments[1], sc)) for (var g = arguments[0], d = arguments[1], y = arguments[2], v = d.iterator(); v.hasNext();) {
            var _ = v.next();
            _.isForward() && t.findStabbedSegments(g, _, y)
        }
    }, Fp.prototype.getDepth = function (t) {
        var e = this.findStabbedSegments(t);
        return 0 === e.size() ? 0 : ep.min(e)._leftDepth
    }, Fp.prototype.interfaces_ = function () {
        return []
    }, Fp.prototype.getClass = function () {
        return Fp
    }, kp.DepthSegment.get = function () {
        return Gp
    }, Object.defineProperties(Fp, kp);
    var Gp = function () {
        this._upwardSeg = null, this._leftDepth = null;
        var t = arguments[0], e = arguments[1];
        this._upwardSeg = new yp(t), this._leftDepth = e
    };
    Gp.prototype.compareTo = function (t) {
        var e = t;
        if (this._upwardSeg.minX() >= e._upwardSeg.maxX()) return 1;
        if (this._upwardSeg.maxX() <= e._upwardSeg.minX()) return -1;
        var n = this._upwardSeg.orientationIndex(e._upwardSeg);
        return 0 !== n || 0 !== (n = -1 * e._upwardSeg.orientationIndex(this._upwardSeg)) ? n : this._upwardSeg.compareTo(e._upwardSeg)
    }, Gp.prototype.compareX = function (t, e) {
        var n = t.p0.compareTo(e.p0);
        return 0 !== n ? n : t.p1.compareTo(e.p1)
    }, Gp.prototype.toString = function () {
        return this._upwardSeg.toString()
    }, Gp.prototype.interfaces_ = function () {
        return [rl]
    }, Gp.prototype.getClass = function () {
        return Gp
    };
    var qp = function (t, e, n) {
        this.p0 = t || null, this.p1 = e || null, this.p2 = n || null
    };
    qp.prototype.area = function () {
        return qp.area(this.p0, this.p1, this.p2)
    }, qp.prototype.signedArea = function () {
        return qp.signedArea(this.p0, this.p1, this.p2)
    }, qp.prototype.interpolateZ = function (t) {
        if (null === t) throw new tl("Supplied point is null.");
        return qp.interpolateZ(t, this.p0, this.p1, this.p2)
    }, qp.prototype.longestSideLength = function () {
        return qp.longestSideLength(this.p0, this.p1, this.p2)
    }, qp.prototype.isAcute = function () {
        return qp.isAcute(this.p0, this.p1, this.p2)
    }, qp.prototype.circumcentre = function () {
        return qp.circumcentre(this.p0, this.p1, this.p2)
    }, qp.prototype.area3D = function () {
        return qp.area3D(this.p0, this.p1, this.p2)
    }, qp.prototype.centroid = function () {
        return qp.centroid(this.p0, this.p1, this.p2)
    }, qp.prototype.inCentre = function () {
        return qp.inCentre(this.p0, this.p1, this.p2)
    }, qp.prototype.interfaces_ = function () {
        return []
    }, qp.prototype.getClass = function () {
        return qp
    }, qp.area = function (t, e, n) {
        return Math.abs(((n.x - t.x) * (e.y - t.y) - (e.x - t.x) * (n.y - t.y)) / 2)
    }, qp.signedArea = function (t, e, n) {
        return ((n.x - t.x) * (e.y - t.y) - (e.x - t.x) * (n.y - t.y)) / 2
    }, qp.det = function (t, e, n, r) {
        return t * r - e * n
    }, qp.interpolateZ = function (t, e, n, r) {
        var i = e.x, o = e.y, s = n.x - i, a = r.x - i, u = n.y - o, l = r.y - o, c = s * l - a * u, h = t.x - i,
            p = t.y - o, f = (l * h - a * p) / c, g = (-u * h + s * p) / c;
        return e.z + f * (n.z - e.z) + g * (r.z - e.z)
    }, qp.longestSideLength = function (t, e, n) {
        var r = t.distance(e), i = e.distance(n), o = n.distance(t), s = r;
        return i > s && (s = i), o > s && (s = o), s
    }, qp.isAcute = function (t, e, n) {
        return !!Op.isAcute(t, e, n) && (!!Op.isAcute(e, n, t) && !!Op.isAcute(n, t, e))
    }, qp.circumcentre = function (t, e, n) {
        var r = n.x, i = n.y, o = t.x - r, s = t.y - i, a = e.x - r, u = e.y - i, l = 2 * qp.det(o, s, a, u),
            c = qp.det(s, o * o + s * s, u, a * a + u * u), h = qp.det(o, o * o + s * s, a, a * a + u * u);
        return new al(r - c / l, i + h / l)
    }, qp.perpendicularBisector = function (t, e) {
        var n = e.x - t.x, r = e.y - t.y, i = new Pl(t.x + n / 2, t.y + r / 2, 1),
            o = new Pl(t.x - r + n / 2, t.y + n + r / 2, 1);
        return new Pl(i, o)
    }, qp.angleBisector = function (t, e, n) {
        var r = e.distance(t), i = r / (r + e.distance(n)), o = n.x - t.x, s = n.y - t.y;
        return new al(t.x + i * o, t.y + i * s)
    }, qp.area3D = function (t, e, n) {
        var r = e.x - t.x, i = e.y - t.y, o = e.z - t.z, s = n.x - t.x, a = n.y - t.y, u = n.z - t.z, l = i * u - o * a,
            c = o * s - r * u, h = r * a - i * s, p = l * l + c * c + h * h, f = Math.sqrt(p) / 2;
        return f
    }, qp.centroid = function (t, e, n) {
        var r = (t.x + e.x + n.x) / 3, i = (t.y + e.y + n.y) / 3;
        return new al(r, i)
    }, qp.inCentre = function (t, e, n) {
        var r = e.distance(n), i = t.distance(n), o = t.distance(e), s = r + i + o,
            a = (r * t.x + i * e.x + o * n.x) / s, u = (r * t.y + i * e.y + o * n.y) / s;
        return new al(a, u)
    };
    var Bp = function () {
        this._inputGeom = null, this._distance = null, this._curveBuilder = null, this._curveList = new uc;
        var t = arguments[0], e = arguments[1], n = arguments[2];
        this._inputGeom = t, this._distance = e, this._curveBuilder = n
    };
    Bp.prototype.addPoint = function (t) {
        if (this._distance <= 0) return null;
        var e = t.getCoordinates(), n = this._curveBuilder.getLineCurve(e, this._distance);
        this.addCurve(n, hl.EXTERIOR, hl.INTERIOR)
    }, Bp.prototype.addPolygon = function (t) {
        var e = this, n = this._distance, r = Nh.LEFT;
        this._distance < 0 && (n = -this._distance, r = Nh.RIGHT);
        var i = t.getExteriorRing(), o = hc.removeRepeatedPoints(i.getCoordinates());
        if (this._distance < 0 && this.isErodedCompletely(i, this._distance)) return null;
        if (this._distance <= 0 && o.length < 3) return null;
        this.addPolygonRing(o, n, r, hl.EXTERIOR, hl.INTERIOR);
        for (var s = 0; s < t.getNumInteriorRing(); s++) {
            var a = t.getInteriorRingN(s), u = hc.removeRepeatedPoints(a.getCoordinates());
            e._distance > 0 && e.isErodedCompletely(a, -e._distance) || e.addPolygonRing(u, n, Nh.opposite(r), hl.INTERIOR, hl.EXTERIOR)
        }
    }, Bp.prototype.isTriangleErodedCompletely = function (t, e) {
        var n = new qp(t[0], t[1], t[2]), r = n.inCentre();
        return Vl.distancePointLine(r, n.p0, n.p1) < Math.abs(e)
    }, Bp.prototype.addLineString = function (t) {
        if (this._distance <= 0 && !this._curveBuilder.getBufferParameters().isSingleSided()) return null;
        var e = hc.removeRepeatedPoints(t.getCoordinates()), n = this._curveBuilder.getLineCurve(e, this._distance);
        this.addCurve(n, hl.EXTERIOR, hl.INTERIOR)
    }, Bp.prototype.addCurve = function (t, e, n) {
        if (null === t || t.length < 2) return null;
        var r = new dp(t, new Ah(0, hl.BOUNDARY, e, n));
        this._curveList.add(r)
    }, Bp.prototype.getCurves = function () {
        return this.add(this._inputGeom), this._curveList
    }, Bp.prototype.addPolygonRing = function (t, e, n, r, i) {
        if (0 === e && t.length < eh.MINIMUM_VALID_SIZE) return null;
        var o = r, s = i;
        t.length >= eh.MINIMUM_VALID_SIZE && Vl.isCCW(t) && (o = i, s = r, n = Nh.opposite(n));
        var a = this._curveBuilder.getRingCurve(t, n, e);
        this.addCurve(a, o, s)
    }, Bp.prototype.add = function (t) {
        if (t.isEmpty()) return null;
        t instanceof $c ? this.addPolygon(t) : t instanceof Jc ? this.addLineString(t) : t instanceof Kc ? this.addPoint(t) : (t instanceof th || t instanceof kc || t instanceof nh || t instanceof Fc) && this.addCollection(t)
    }, Bp.prototype.isErodedCompletely = function (t, e) {
        var n = t.getCoordinates();
        if (n.length < 4) return e < 0;
        if (4 === n.length) return this.isTriangleErodedCompletely(n, e);
        var r = t.getEnvelopeInternal(), i = Math.min(r.getHeight(), r.getWidth());
        return e < 0 && 2 * Math.abs(e) > i
    }, Bp.prototype.addCollection = function (t) {
        for (var e = 0; e < t.getNumGeometries(); e++) {
            var n = t.getGeometryN(e);
            this.add(n)
        }
    }, Bp.prototype.interfaces_ = function () {
        return []
    }, Bp.prototype.getClass = function () {
        return Bp
    };
    var zp = function () {
    };
    zp.prototype.locate = function (t) {
    }, zp.prototype.interfaces_ = function () {
        return []
    }, zp.prototype.getClass = function () {
        return zp
    };
    var jp = function () {
        this._parent = null, this._atStart = null, this._max = null, this._index = null, this._subcollectionIterator = null;
        var t = arguments[0];
        this._parent = t, this._atStart = !0, this._index = 0, this._max = t.getNumGeometries()
    };
    jp.prototype.next = function () {
        if (this._atStart) return this._atStart = !1, jp.isAtomic(this._parent) && this._index++, this._parent;
        if (null !== this._subcollectionIterator) {
            if (this._subcollectionIterator.hasNext()) return this._subcollectionIterator.next();
            this._subcollectionIterator = null
        }
        if (this._index >= this._max) throw new ac;
        var t = this._parent.getGeometryN(this._index++);
        return t instanceof Fc ? (this._subcollectionIterator = new jp(t), this._subcollectionIterator.next()) : t
    }, jp.prototype.remove = function () {
        throw new Error(this.getClass().getName())
    }, jp.prototype.hasNext = function () {
        if (this._atStart) return !0;
        if (null !== this._subcollectionIterator) {
            if (this._subcollectionIterator.hasNext()) return !0;
            this._subcollectionIterator = null
        }
        return !(this._index >= this._max)
    }, jp.prototype.interfaces_ = function () {
        return [oc]
    }, jp.prototype.getClass = function () {
        return jp
    }, jp.isAtomic = function (t) {
        return !(t instanceof Fc)
    };
    var Up = function () {
        this._geom = null;
        var t = arguments[0];
        this._geom = t
    };
    Up.prototype.locate = function (t) {
        return Up.locate(t, this._geom)
    }, Up.prototype.interfaces_ = function () {
        return [zp]
    }, Up.prototype.getClass = function () {
        return Up
    }, Up.isPointInRing = function (t, e) {
        return !!e.getEnvelopeInternal().intersects(t) && Vl.isPointInRing(t, e.getCoordinates())
    }, Up.containsPointInPolygon = function (t, e) {
        if (e.isEmpty()) return !1;
        var n = e.getExteriorRing();
        if (!Up.isPointInRing(t, n)) return !1;
        for (var r = 0; r < e.getNumInteriorRing(); r++) {
            var i = e.getInteriorRingN(r);
            if (Up.isPointInRing(t, i)) return !1
        }
        return !0
    }, Up.containsPoint = function (t, e) {
        if (e instanceof $c) return Up.containsPointInPolygon(t, e);
        if (e instanceof Fc) for (var n = new jp(e); n.hasNext();) {
            var r = n.next();
            if (r !== e && Up.containsPoint(t, r)) return !0
        }
        return !1
    }, Up.locate = function (t, e) {
        return e.isEmpty() ? hl.EXTERIOR : Up.containsPoint(t, e) ? hl.INTERIOR : hl.EXTERIOR
    };
    var Vp = function () {
        this._edgeMap = new Sc, this._edgeList = null, this._ptInAreaLocation = [hl.NONE, hl.NONE]
    };
    Vp.prototype.getNextCW = function (t) {
        this.getEdges();
        var e = this._edgeList.indexOf(t), n = e - 1;
        return 0 === e && (n = this._edgeList.size() - 1), this._edgeList.get(n)
    }, Vp.prototype.propagateSideLabels = function (t) {
        for (var e = hl.NONE, n = this.iterator(); n.hasNext();) {
            var r = n.next().getLabel();
            r.isArea(t) && r.getLocation(t, Nh.LEFT) !== hl.NONE && (e = r.getLocation(t, Nh.LEFT))
        }
        if (e === hl.NONE) return null;
        for (var i = e, o = this.iterator(); o.hasNext();) {
            var s = o.next(), a = s.getLabel();
            if (a.getLocation(t, Nh.ON) === hl.NONE && a.setLocation(t, Nh.ON, i), a.isArea(t)) {
                var u = a.getLocation(t, Nh.LEFT), l = a.getLocation(t, Nh.RIGHT);
                if (l !== hl.NONE) {
                    if (l !== i) throw new Mh("side location conflict", s.getCoordinate());
                    u === hl.NONE && Gl.shouldNeverReachHere("found single null side (at " + s.getCoordinate() + ")"), i = u
                } else Gl.isTrue(a.getLocation(t, Nh.LEFT) === hl.NONE, "found single null side"), a.setLocation(t, Nh.RIGHT, i), a.setLocation(t, Nh.LEFT, i)
            }
        }
    }, Vp.prototype.getCoordinate = function () {
        var t = this.iterator();
        return t.hasNext() ? t.next().getCoordinate() : null
    }, Vp.prototype.print = function (t) {
        Cl.out.println("EdgeEndStar:   " + this.getCoordinate());
        for (var e = this.iterator(); e.hasNext();) {
            e.next().print(t)
        }
    }, Vp.prototype.isAreaLabelsConsistent = function (t) {
        return this.computeEdgeEndLabels(t.getBoundaryNodeRule()), this.checkAreaLabelsConsistent(0)
    }, Vp.prototype.checkAreaLabelsConsistent = function (t) {
        var e = this.getEdges();
        if (e.size() <= 0) return !0;
        var n = e.size() - 1, r = e.get(n).getLabel().getLocation(t, Nh.LEFT);
        Gl.isTrue(r !== hl.NONE, "Found unlabelled area edge");
        for (var i = r, o = this.iterator(); o.hasNext();) {
            var s = o.next().getLabel();
            Gl.isTrue(s.isArea(t), "Found non-area edge");
            var a = s.getLocation(t, Nh.LEFT), u = s.getLocation(t, Nh.RIGHT);
            if (a === u) return !1;
            if (u !== i) return !1;
            i = a
        }
        return !0
    }, Vp.prototype.findIndex = function (t) {
        this.iterator();
        for (var e = 0; e < this._edgeList.size(); e++) {
            if (this._edgeList.get(e) === t) return e
        }
        return -1
    }, Vp.prototype.iterator = function () {
        return this.getEdges().iterator()
    }, Vp.prototype.getEdges = function () {
        return null === this._edgeList && (this._edgeList = new uc(this._edgeMap.values())), this._edgeList
    }, Vp.prototype.getLocation = function (t, e, n) {
        return this._ptInAreaLocation[t] === hl.NONE && (this._ptInAreaLocation[t] = Up.locate(e, n[t].getGeometry())), this._ptInAreaLocation[t]
    }, Vp.prototype.toString = function () {
        var t = new yl;
        t.append("EdgeEndStar:   " + this.getCoordinate()), t.append("\n");
        for (var e = this.iterator(); e.hasNext();) {
            var n = e.next();
            t.append(n), t.append("\n")
        }
        return t.toString()
    }, Vp.prototype.computeEdgeEndLabels = function (t) {
        for (var e = this.iterator(); e.hasNext();) {
            e.next().computeLabel(t)
        }
    }, Vp.prototype.computeLabelling = function (t) {
        this.computeEdgeEndLabels(t[0].getBoundaryNodeRule()), this.propagateSideLabels(0), this.propagateSideLabels(1);
        for (var e = [!1, !1], n = this.iterator(); n.hasNext();) for (var r = n.next().getLabel(), i = 0; i < 2; i++) r.isLine(i) && r.getLocation(i) === hl.BOUNDARY && (e[i] = !0);
        for (var o = this.iterator(); o.hasNext();) for (var s = o.next(), a = s.getLabel(), u = 0; u < 2; u++) if (a.isAnyNull(u)) {
            var l = hl.NONE;
            if (e[u]) l = hl.EXTERIOR; else {
                var c = s.getCoordinate();
                l = this.getLocation(u, c, t)
            }
            a.setAllLocationsIfNull(u, l)
        }
    }, Vp.prototype.getDegree = function () {
        return this._edgeMap.size()
    }, Vp.prototype.insertEdgeEnd = function (t, e) {
        this._edgeMap.put(t, e), this._edgeList = null
    }, Vp.prototype.interfaces_ = function () {
        return []
    }, Vp.prototype.getClass = function () {
        return Vp
    };
    var Xp = function (t) {
        function e() {
            t.call(this), this._resultAreaEdgeList = null, this._label = null, this._SCANNING_FOR_INCOMING = 1, this._LINKING_TO_OUTGOING = 2
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.linkResultDirectedEdges = function () {
            var t = this;
            this.getResultAreaEdges();
            for (var e = null, n = null, r = this._SCANNING_FOR_INCOMING, i = 0; i < this._resultAreaEdgeList.size(); i++) {
                var o = t._resultAreaEdgeList.get(i), s = o.getSym();
                if (o.getLabel().isArea()) switch (null === e && o.isInResult() && (e = o), r) {
                    case t._SCANNING_FOR_INCOMING:
                        if (!s.isInResult()) continue;
                        n = s, r = t._LINKING_TO_OUTGOING;
                        break;
                    case t._LINKING_TO_OUTGOING:
                        if (!o.isInResult()) continue;
                        n.setNext(o), r = t._SCANNING_FOR_INCOMING
                }
            }
            if (r === this._LINKING_TO_OUTGOING) {
                if (null === e) throw new Mh("no outgoing dirEdge found", this.getCoordinate());
                Gl.isTrue(e.isInResult(), "unable to link last incoming dirEdge"), n.setNext(e)
            }
        }, e.prototype.insert = function (t) {
            var e = t;
            this.insertEdgeEnd(e, e)
        }, e.prototype.getRightmostEdge = function () {
            var t = this.getEdges(), e = t.size();
            if (e < 1) return null;
            var n = t.get(0);
            if (1 === e) return n;
            var r = t.get(e - 1), i = n.getQuadrant(), o = r.getQuadrant();
            return zh.isNorthern(i) && zh.isNorthern(o) ? n : zh.isNorthern(i) || zh.isNorthern(o) ? 0 !== n.getDy() ? n : 0 !== r.getDy() ? r : (Gl.shouldNeverReachHere("found two horizontal edges incident on node"), null) : r
        }, e.prototype.print = function (t) {
            Cl.out.println("DirectedEdgeStar: " + this.getCoordinate());
            for (var e = this.iterator(); e.hasNext();) {
                var n = e.next();
                t.print("out "), n.print(t), t.println(), t.print("in "), n.getSym().print(t), t.println()
            }
        }, e.prototype.getResultAreaEdges = function () {
            if (null !== this._resultAreaEdgeList) return this._resultAreaEdgeList;
            this._resultAreaEdgeList = new uc;
            for (var t = this.iterator(); t.hasNext();) {
                var e = t.next();
                (e.isInResult() || e.getSym().isInResult()) && this._resultAreaEdgeList.add(e)
            }
            return this._resultAreaEdgeList
        }, e.prototype.updateLabelling = function (t) {
            for (var e = this.iterator(); e.hasNext();) {
                var n = e.next().getLabel();
                n.setAllLocationsIfNull(0, t.getLocation(0)), n.setAllLocationsIfNull(1, t.getLocation(1))
            }
        }, e.prototype.linkAllDirectedEdges = function () {
            this.getEdges();
            for (var t = null, e = null, n = this._edgeList.size() - 1; n >= 0; n--) {
                var r = this._edgeList.get(n), i = r.getSym();
                null === e && (e = i), null !== t && i.setNext(t), t = r
            }
            e.setNext(t)
        }, e.prototype.computeDepths = function () {
            var t = this;
            if (1 === arguments.length) {
                var e = arguments[0], n = this.findIndex(e), r = e.getDepth(Nh.LEFT), i = e.getDepth(Nh.RIGHT),
                    o = this.computeDepths(n + 1, this._edgeList.size(), r), s = this.computeDepths(0, n, o);
                if (s !== i) throw new Mh("depth mismatch at " + e.getCoordinate())
            } else if (3 === arguments.length) {
                for (var a = arguments[0], u = arguments[1], l = arguments[2], c = l, h = a; h < u; h++) {
                    var p = t._edgeList.get(h);
                    p.setEdgeDepths(Nh.RIGHT, c), c = p.getDepth(Nh.LEFT)
                }
                return c
            }
        }, e.prototype.mergeSymLabels = function () {
            for (var t = this.iterator(); t.hasNext();) {
                var e = t.next();
                e.getLabel().merge(e.getSym().getLabel())
            }
        }, e.prototype.linkMinimalDirectedEdges = function (t) {
            for (var e = this, n = null, r = null, i = this._SCANNING_FOR_INCOMING, o = this._resultAreaEdgeList.size() - 1; o >= 0; o--) {
                var s = e._resultAreaEdgeList.get(o), a = s.getSym();
                switch (null === n && s.getEdgeRing() === t && (n = s), i) {
                    case e._SCANNING_FOR_INCOMING:
                        if (a.getEdgeRing() !== t) continue;
                        r = a, i = e._LINKING_TO_OUTGOING;
                        break;
                    case e._LINKING_TO_OUTGOING:
                        if (s.getEdgeRing() !== t) continue;
                        r.setNextMin(s), i = e._SCANNING_FOR_INCOMING
                }
            }
            i === this._LINKING_TO_OUTGOING && (Gl.isTrue(null !== n, "found null for first outgoing dirEdge"), Gl.isTrue(n.getEdgeRing() === t, "unable to link last incoming dirEdge"), r.setNextMin(n))
        }, e.prototype.getOutgoingDegree = function () {
            if (0 === arguments.length) {
                for (var t = 0, e = this.iterator(); e.hasNext();) {
                    var n = e.next();
                    n.isInResult() && t++
                }
                return t
            }
            if (1 === arguments.length) {
                for (var r = arguments[0], i = 0, o = this.iterator(); o.hasNext();) {
                    var s = o.next();
                    s.getEdgeRing() === r && i++
                }
                return i
            }
        }, e.prototype.getLabel = function () {
            return this._label
        }, e.prototype.findCoveredLineEdges = function () {
            for (var t = hl.NONE, e = this.iterator(); e.hasNext();) {
                var n = e.next(), r = n.getSym();
                if (!n.isLineEdge()) {
                    if (n.isInResult()) {
                        t = hl.INTERIOR;
                        break
                    }
                    if (r.isInResult()) {
                        t = hl.EXTERIOR;
                        break
                    }
                }
            }
            if (t === hl.NONE) return null;
            for (var i = t, o = this.iterator(); o.hasNext();) {
                var s = o.next(), a = s.getSym();
                s.isLineEdge() ? s.getEdge().setCovered(i === hl.INTERIOR) : (s.isInResult() && (i = hl.EXTERIOR), a.isInResult() && (i = hl.INTERIOR))
            }
        }, e.prototype.computeLabelling = function (e) {
            t.prototype.computeLabelling.call(this, e), this._label = new Ah(hl.NONE);
            for (var n = this.iterator(); n.hasNext();) for (var r = n.next().getEdge().getLabel(), i = 0; i < 2; i++) {
                var o = r.getLocation(i);
                o !== hl.INTERIOR && o !== hl.BOUNDARY || this._label.setLocation(i, hl.INTERIOR)
            }
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Vp), Yp = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createNode = function (t) {
            return new qh(t, new Xp)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Xh), Hp = function t() {
        this._pts = null, this._orientation = null;
        var e = arguments[0];
        this._pts = e, this._orientation = t.orientation(e)
    };
    Hp.prototype.compareTo = function (t) {
        var e = t;
        return Hp.compareOriented(this._pts, this._orientation, e._pts, e._orientation)
    }, Hp.prototype.interfaces_ = function () {
        return [rl]
    }, Hp.prototype.getClass = function () {
        return Hp
    }, Hp.orientation = function (t) {
        return 1 === hc.increasingDirection(t)
    }, Hp.compareOriented = function (t, e, n, r) {
        for (var i = e ? 1 : -1, o = r ? 1 : -1, s = e ? t.length : -1, a = r ? n.length : -1, u = e ? 0 : t.length - 1, l = r ? 0 : n.length - 1; ;) {
            var c = t[u].compareTo(n[l]);
            if (0 !== c) return c;
            var h = (u += i) === s, p = (l += o) === a;
            if (h && !p) return -1;
            if (!h && p) return 1;
            if (h && p) return 0
        }
    };
    var Wp = function () {
        this._edges = new uc, this._ocaMap = new Sc
    };
    Wp.prototype.print = function (t) {
        t.print("MULTILINESTRING ( ");
        for (var e = 0; e < this._edges.size(); e++) {
            var n = this._edges.get(e);
            e > 0 && t.print(","), t.print("(");
            for (var r = n.getCoordinates(), i = 0; i < r.length; i++) i > 0 && t.print(","), t.print(r[i].x + " " + r[i].y);
            t.println(")")
        }
        t.print(")  ")
    }, Wp.prototype.addAll = function (t) {
        for (var e = t.iterator(); e.hasNext();) this.add(e.next())
    }, Wp.prototype.findEdgeIndex = function (t) {
        for (var e = 0; e < this._edges.size(); e++) if (this._edges.get(e).equals(t)) return e;
        return -1
    }, Wp.prototype.iterator = function () {
        return this._edges.iterator()
    }, Wp.prototype.getEdges = function () {
        return this._edges
    }, Wp.prototype.get = function (t) {
        return this._edges.get(t)
    }, Wp.prototype.findEqualEdge = function (t) {
        var e = new Hp(t.getCoordinates());
        return this._ocaMap.get(e)
    }, Wp.prototype.add = function (t) {
        this._edges.add(t);
        var e = new Hp(t.getCoordinates());
        this._ocaMap.put(e, t)
    }, Wp.prototype.interfaces_ = function () {
        return []
    }, Wp.prototype.getClass = function () {
        return Wp
    };
    var Jp = function () {
    };
    Jp.prototype.processIntersections = function (t, e, n, r) {
    }, Jp.prototype.isDone = function () {
    }, Jp.prototype.interfaces_ = function () {
        return []
    }, Jp.prototype.getClass = function () {
        return Jp
    };
    var Zp = function () {
        this._hasIntersection = !1, this._hasProper = !1, this._hasProperInterior = !1, this._hasInterior = !1, this._properIntersectionPoint = null, this._li = null, this._isSelfIntersection = null, this.numIntersections = 0, this.numInteriorIntersections = 0, this.numProperIntersections = 0, this.numTests = 0;
        var t = arguments[0];
        this._li = t
    };
    Zp.prototype.isTrivialIntersection = function (t, e, n, r) {
        if (t === n && 1 === this._li.getIntersectionNum()) {
            if (Zp.isAdjacentSegments(e, r)) return !0;
            if (t.isClosed()) {
                var i = t.size() - 1;
                if (0 === e && r === i || 0 === r && e === i) return !0
            }
        }
        return !1
    }, Zp.prototype.getProperIntersectionPoint = function () {
        return this._properIntersectionPoint
    }, Zp.prototype.hasProperInteriorIntersection = function () {
        return this._hasProperInterior
    }, Zp.prototype.getLineIntersector = function () {
        return this._li
    }, Zp.prototype.hasProperIntersection = function () {
        return this._hasProper
    }, Zp.prototype.processIntersections = function (t, e, n, r) {
        if (t === n && e === r) return null;
        this.numTests++;
        var i = t.getCoordinates()[e], o = t.getCoordinates()[e + 1], s = n.getCoordinates()[r],
            a = n.getCoordinates()[r + 1];
        this._li.computeIntersection(i, o, s, a), this._li.hasIntersection() && (this.numIntersections++, this._li.isInteriorIntersection() && (this.numInteriorIntersections++, this._hasInterior = !0), this.isTrivialIntersection(t, e, n, r) || (this._hasIntersection = !0, t.addIntersections(this._li, e, 0), n.addIntersections(this._li, r, 1), this._li.isProper() && (this.numProperIntersections++, this._hasProper = !0, this._hasProperInterior = !0)))
    }, Zp.prototype.hasIntersection = function () {
        return this._hasIntersection
    }, Zp.prototype.isDone = function () {
        return !1
    }, Zp.prototype.hasInteriorIntersection = function () {
        return this._hasInterior
    }, Zp.prototype.interfaces_ = function () {
        return [Jp]
    }, Zp.prototype.getClass = function () {
        return Zp
    }, Zp.isAdjacentSegments = function (t, e) {
        return 1 === Math.abs(t - e)
    };
    var Kp = function () {
        this.coord = null, this.segmentIndex = null, this.dist = null;
        var t = arguments[0], e = arguments[1], n = arguments[2];
        this.coord = new al(t), this.segmentIndex = e, this.dist = n
    };
    Kp.prototype.getSegmentIndex = function () {
        return this.segmentIndex
    }, Kp.prototype.getCoordinate = function () {
        return this.coord
    }, Kp.prototype.print = function (t) {
        t.print(this.coord), t.print(" seg # = " + this.segmentIndex), t.println(" dist = " + this.dist)
    }, Kp.prototype.compareTo = function (t) {
        var e = t;
        return this.compare(e.segmentIndex, e.dist)
    }, Kp.prototype.isEndPoint = function (t) {
        return 0 === this.segmentIndex && 0 === this.dist || this.segmentIndex === t
    }, Kp.prototype.toString = function () {
        return this.coord + " seg # = " + this.segmentIndex + " dist = " + this.dist
    }, Kp.prototype.getDistance = function () {
        return this.dist
    }, Kp.prototype.compare = function (t, e) {
        return this.segmentIndex < t ? -1 : this.segmentIndex > t ? 1 : this.dist < e ? -1 : this.dist > e ? 1 : 0
    }, Kp.prototype.interfaces_ = function () {
        return [rl]
    }, Kp.prototype.getClass = function () {
        return Kp
    };
    var Qp = function () {
        this._nodeMap = new Sc, this.edge = null;
        var t = arguments[0];
        this.edge = t
    };
    Qp.prototype.print = function (t) {
        t.println("Intersections:");
        for (var e = this.iterator(); e.hasNext();) {
            e.next().print(t)
        }
    }, Qp.prototype.iterator = function () {
        return this._nodeMap.values().iterator()
    }, Qp.prototype.addSplitEdges = function (t) {
        this.addEndpoints();
        for (var e = this.iterator(), n = e.next(); e.hasNext();) {
            var r = e.next(), i = this.createSplitEdge(n, r);
            t.add(i), n = r
        }
    }, Qp.prototype.addEndpoints = function () {
        var t = this.edge.pts.length - 1;
        this.add(this.edge.pts[0], 0, 0), this.add(this.edge.pts[t], t, 0)
    }, Qp.prototype.createSplitEdge = function (t, e) {
        var n = e.segmentIndex - t.segmentIndex + 2, r = this.edge.pts[e.segmentIndex],
            i = e.dist > 0 || !e.coord.equals2D(r);
        i || n--;
        var o = new Array(n).fill(null), s = 0;
        o[s++] = new al(t.coord);
        for (var a = t.segmentIndex + 1; a <= e.segmentIndex; a++) o[s++] = this.edge.pts[a];
        return i && (o[s] = e.coord), new rf(o, new Ah(this.edge._label))
    }, Qp.prototype.add = function (t, e, n) {
        var r = new Kp(t, e, n), i = this._nodeMap.get(r);
        return null !== i ? i : (this._nodeMap.put(r, r), r)
    }, Qp.prototype.isIntersection = function (t) {
        for (var e = this.iterator(); e.hasNext();) {
            if (e.next().coord.equals(t)) return !0
        }
        return !1
    }, Qp.prototype.interfaces_ = function () {
        return []
    }, Qp.prototype.getClass = function () {
        return Qp
    };
    var $p = function () {
    };
    $p.prototype.getChainStartIndices = function (t) {
        var e = 0, n = new uc;
        n.add(new vl(e));
        do {
            var r = this.findChainEnd(t, e);
            n.add(new vl(r)), e = r
        } while (e < t.length - 1);
        return $p.toIntArray(n)
    }, $p.prototype.findChainEnd = function (t, e) {
        for (var n = zh.quadrant(t[e], t[e + 1]), r = e + 1; r < t.length;) {
            if (zh.quadrant(t[r - 1], t[r]) !== n) break;
            r++
        }
        return r - 1
    }, $p.prototype.interfaces_ = function () {
        return []
    }, $p.prototype.getClass = function () {
        return $p
    }, $p.toIntArray = function (t) {
        for (var e = new Array(t.size()).fill(null), n = 0; n < e.length; n++) e[n] = t.get(n).intValue();
        return e
    };
    var tf = function () {
        this.e = null, this.pts = null, this.startIndex = null, this.env1 = new Ll, this.env2 = new Ll;
        var t = arguments[0];
        this.e = t, this.pts = t.getCoordinates();
        var e = new $p;
        this.startIndex = e.getChainStartIndices(this.pts)
    };
    tf.prototype.getCoordinates = function () {
        return this.pts
    }, tf.prototype.getMaxX = function (t) {
        var e = this.pts[this.startIndex[t]].x, n = this.pts[this.startIndex[t + 1]].x;
        return e > n ? e : n
    }, tf.prototype.getMinX = function (t) {
        var e = this.pts[this.startIndex[t]].x, n = this.pts[this.startIndex[t + 1]].x;
        return e < n ? e : n
    }, tf.prototype.computeIntersectsForChain = function () {
        if (4 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = arguments[2], r = arguments[3];
            this.computeIntersectsForChain(this.startIndex[t], this.startIndex[t + 1], e, e.startIndex[n], e.startIndex[n + 1], r)
        } else if (6 === arguments.length) {
            var i = arguments[0], o = arguments[1], s = arguments[2], a = arguments[3], u = arguments[4],
                l = arguments[5], c = this.pts[i], h = this.pts[o], p = s.pts[a], f = s.pts[u];
            if (o - i == 1 && u - a == 1) return l.addIntersections(this.e, i, s.e, a), null;
            if (this.env1.init(c, h), this.env2.init(p, f), !this.env1.intersects(this.env2)) return null;
            var g = Math.trunc((i + o) / 2), d = Math.trunc((a + u) / 2);
            i < g && (a < d && this.computeIntersectsForChain(i, g, s, a, d, l), d < u && this.computeIntersectsForChain(i, g, s, d, u, l)), g < o && (a < d && this.computeIntersectsForChain(g, o, s, a, d, l), d < u && this.computeIntersectsForChain(g, o, s, d, u, l))
        }
    }, tf.prototype.getStartIndexes = function () {
        return this.startIndex
    }, tf.prototype.computeIntersects = function (t, e) {
        for (var n = 0; n < this.startIndex.length - 1; n++) for (var r = 0; r < t.startIndex.length - 1; r++) this.computeIntersectsForChain(n, t, r, e)
    }, tf.prototype.interfaces_ = function () {
        return []
    }, tf.prototype.getClass = function () {
        return tf
    };
    var ef = function t() {
        this._depth = Array(2).fill().map((function () {
            return Array(3)
        }));
        for (var e = 0; e < 2; e++) for (var n = 0; n < 3; n++) this._depth[e][n] = t.NULL_VALUE
    }, nf = {NULL_VALUE: {configurable: !0}};
    ef.prototype.getDepth = function (t, e) {
        return this._depth[t][e]
    }, ef.prototype.setDepth = function (t, e, n) {
        this._depth[t][e] = n
    }, ef.prototype.isNull = function () {
        var t = this;
        if (0 === arguments.length) {
            for (var e = 0; e < 2; e++) for (var n = 0; n < 3; n++) if (t._depth[e][n] !== ef.NULL_VALUE) return !1;
            return !0
        }
        if (1 === arguments.length) {
            var r = arguments[0];
            return this._depth[r][1] === ef.NULL_VALUE
        }
        if (2 === arguments.length) {
            var i = arguments[0], o = arguments[1];
            return this._depth[i][o] === ef.NULL_VALUE
        }
    }, ef.prototype.normalize = function () {
        for (var t = this, e = 0; e < 2; e++) if (!t.isNull(e)) {
            var n = t._depth[e][1];
            t._depth[e][2] < n && (n = t._depth[e][2]), n < 0 && (n = 0);
            for (var r = 1; r < 3; r++) {
                var i = 0;
                t._depth[e][r] > n && (i = 1), t._depth[e][r] = i
            }
        }
    }, ef.prototype.getDelta = function (t) {
        return this._depth[t][Nh.RIGHT] - this._depth[t][Nh.LEFT]
    }, ef.prototype.getLocation = function (t, e) {
        return this._depth[t][e] <= 0 ? hl.EXTERIOR : hl.INTERIOR
    }, ef.prototype.toString = function () {
        return "A: " + this._depth[0][1] + "," + this._depth[0][2] + " B: " + this._depth[1][1] + "," + this._depth[1][2]
    }, ef.prototype.add = function () {
        var t = this;
        if (1 === arguments.length) for (var e = arguments[0], n = 0; n < 2; n++) for (var r = 1; r < 3; r++) {
            var i = e.getLocation(n, r);
            i !== hl.EXTERIOR && i !== hl.INTERIOR || (t.isNull(n, r) ? t._depth[n][r] = ef.depthAtLocation(i) : t._depth[n][r] += ef.depthAtLocation(i))
        } else if (3 === arguments.length) {
            var o = arguments[0], s = arguments[1], a = arguments[2];
            a === hl.INTERIOR && this._depth[o][s]++
        }
    }, ef.prototype.interfaces_ = function () {
        return []
    }, ef.prototype.getClass = function () {
        return ef
    }, ef.depthAtLocation = function (t) {
        return t === hl.EXTERIOR ? 0 : t === hl.INTERIOR ? 1 : ef.NULL_VALUE
    }, nf.NULL_VALUE.get = function () {
        return -1
    }, Object.defineProperties(ef, nf);
    var rf = function (t) {
        function e() {
            if (t.call(this), this.pts = null, this._env = null, this.eiList = new Qp(this), this._name = null, this._mce = null, this._isIsolated = !0, this._depth = new ef, this._depthDelta = 0, 1 === arguments.length) {
                var n = arguments[0];
                e.call(this, n, null)
            } else if (2 === arguments.length) {
                var r = arguments[0], i = arguments[1];
                this.pts = r, this._label = i
            }
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDepth = function () {
            return this._depth
        }, e.prototype.getCollapsedEdge = function () {
            var t = new Array(2).fill(null);
            return t[0] = this.pts[0], t[1] = this.pts[1], new e(t, Ah.toLineLabel(this._label))
        }, e.prototype.isIsolated = function () {
            return this._isIsolated
        }, e.prototype.getCoordinates = function () {
            return this.pts
        }, e.prototype.setIsolated = function (t) {
            this._isIsolated = t
        }, e.prototype.setName = function (t) {
            this._name = t
        }, e.prototype.equals = function (t) {
            if (!(t instanceof e)) return !1;
            var n = t;
            if (this.pts.length !== n.pts.length) return !1;
            for (var r = !0, i = !0, o = this.pts.length, s = 0; s < this.pts.length; s++) if (this.pts[s].equals2D(n.pts[s]) || (r = !1), this.pts[s].equals2D(n.pts[--o]) || (i = !1), !r && !i) return !1;
            return !0
        }, e.prototype.getCoordinate = function () {
            if (0 === arguments.length) return this.pts.length > 0 ? this.pts[0] : null;
            if (1 === arguments.length) {
                var t = arguments[0];
                return this.pts[t]
            }
        }, e.prototype.print = function (t) {
            t.print("edge " + this._name + ": "), t.print("LINESTRING (");
            for (var e = 0; e < this.pts.length; e++) e > 0 && t.print(","), t.print(this.pts[e].x + " " + this.pts[e].y);
            t.print(")  " + this._label + " " + this._depthDelta)
        }, e.prototype.computeIM = function (t) {
            e.updateIM(this._label, t)
        }, e.prototype.isCollapsed = function () {
            return !!this._label.isArea() && (3 === this.pts.length && !!this.pts[0].equals(this.pts[2]))
        }, e.prototype.isClosed = function () {
            return this.pts[0].equals(this.pts[this.pts.length - 1])
        }, e.prototype.getMaximumSegmentIndex = function () {
            return this.pts.length - 1
        }, e.prototype.getDepthDelta = function () {
            return this._depthDelta
        }, e.prototype.getNumPoints = function () {
            return this.pts.length
        }, e.prototype.printReverse = function (t) {
            t.print("edge " + this._name + ": ");
            for (var e = this.pts.length - 1; e >= 0; e--) t.print(this.pts[e] + " ");
            t.println("")
        }, e.prototype.getMonotoneChainEdge = function () {
            return null === this._mce && (this._mce = new tf(this)), this._mce
        }, e.prototype.getEnvelope = function () {
            if (null === this._env) {
                this._env = new Ll;
                for (var t = 0; t < this.pts.length; t++) this._env.expandToInclude(this.pts[t])
            }
            return this._env
        }, e.prototype.addIntersection = function (t, e, n, r) {
            var i = new al(t.getIntersection(r)), o = e, s = t.getEdgeDistance(n, r), a = o + 1;
            if (a < this.pts.length) {
                var u = this.pts[a];
                i.equals2D(u) && (o = a, s = 0)
            }
            this.eiList.add(i, o, s)
        }, e.prototype.toString = function () {
            var t = new yl;
            t.append("edge " + this._name + ": "), t.append("LINESTRING (");
            for (var e = 0; e < this.pts.length; e++) e > 0 && t.append(","), t.append(this.pts[e].x + " " + this.pts[e].y);
            return t.append(")  " + this._label + " " + this._depthDelta), t.toString()
        }, e.prototype.isPointwiseEqual = function (t) {
            if (this.pts.length !== t.pts.length) return !1;
            for (var e = 0; e < this.pts.length; e++) if (!this.pts[e].equals2D(t.pts[e])) return !1;
            return !0
        }, e.prototype.setDepthDelta = function (t) {
            this._depthDelta = t
        }, e.prototype.getEdgeIntersectionList = function () {
            return this.eiList
        }, e.prototype.addIntersections = function (t, e, n) {
            for (var r = 0; r < t.getIntersectionNum(); r++) this.addIntersection(t, e, n, r)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e.updateIM = function () {
            if (2 !== arguments.length) return t.prototype.updateIM.apply(this, arguments);
            var e = arguments[0], n = arguments[1];
            n.setAtLeastIfValid(e.getLocation(0, Nh.ON), e.getLocation(1, Nh.ON), 1), e.isArea() && (n.setAtLeastIfValid(e.getLocation(0, Nh.LEFT), e.getLocation(1, Nh.LEFT), 2), n.setAtLeastIfValid(e.getLocation(0, Nh.RIGHT), e.getLocation(1, Nh.RIGHT), 2))
        }, e
    }(Gh), of = function (t) {
        this._workingPrecisionModel = null, this._workingNoder = null, this._geomFact = null, this._graph = null, this._edgeList = new Wp, this._bufParams = t || null
    };
    of.prototype.setWorkingPrecisionModel = function (t) {
        this._workingPrecisionModel = t
    }, of.prototype.insertUniqueEdge = function (t) {
        var e = this._edgeList.findEqualEdge(t);
        if (null !== e) {
            var n = e.getLabel(), r = t.getLabel();
            e.isPointwiseEqual(t) || (r = new Ah(t.getLabel())).flip(), n.merge(r);
            var i = of.depthDelta(r), o = e.getDepthDelta() + i;
            e.setDepthDelta(o)
        } else this._edgeList.add(t), t.setDepthDelta(of.depthDelta(t.getLabel()))
    }, of.prototype.buildSubgraphs = function (t, e) {
        for (var n = new uc, r = t.iterator(); r.hasNext();) {
            var i = r.next(), o = i.getRightmostCoordinate(), s = new Fp(n).getDepth(o);
            i.computeDepth(s), i.findResultEdges(), n.add(i), e.add(i.getDirectedEdges(), i.getNodes())
        }
    }, of.prototype.createSubgraphs = function (t) {
        for (var e = new uc, n = t.getNodes().iterator(); n.hasNext();) {
            var r = n.next();
            if (!r.isVisited()) {
                var i = new Rh;
                i.create(r), e.add(i)
            }
        }
        return ep.sort(e, ep.reverseOrder()), e
    }, of.prototype.createEmptyResultGeometry = function () {
        return this._geomFact.createPolygon()
    }, of.prototype.getNoder = function (t) {
        if (null !== this._workingNoder) return this._workingNoder;
        var e = new wp, n = new zl;
        return n.setPrecisionModel(t), e.setSegmentIntersector(new Zp(n)), e
    }, of.prototype.buffer = function (t, e) {
        var n = this._workingPrecisionModel;
        null === n && (n = t.getPrecisionModel()), this._geomFact = t.getFactory();
        var r = new Dp(n, this._bufParams), i = new Bp(t, e, r).getCurves();
        if (i.size() <= 0) return this.createEmptyResultGeometry();
        this.computeNodedEdges(i, n), this._graph = new Yh(new Yp), this._graph.addEdges(this._edgeList.getEdges());
        var o = this.createSubgraphs(this._graph), s = new Hh(this._geomFact);
        this.buildSubgraphs(o, s);
        var a = s.getPolygons();
        return a.size() <= 0 ? this.createEmptyResultGeometry() : this._geomFact.buildGeometry(a)
    }, of.prototype.computeNodedEdges = function (t, e) {
        var n = this.getNoder(e);
        n.computeNodes(t);
        for (var r = n.getNodedSubstrings().iterator(); r.hasNext();) {
            var i = r.next(), o = i.getCoordinates();
            if (2 !== o.length || !o[0].equals2D(o[1])) {
                var s = i.getData(), a = new rf(i.getCoordinates(), new Ah(s));
                this.insertUniqueEdge(a)
            }
        }
    }, of.prototype.setNoder = function (t) {
        this._workingNoder = t
    }, of.prototype.interfaces_ = function () {
        return []
    }, of.prototype.getClass = function () {
        return of
    }, of.depthDelta = function (t) {
        var e = t.getLocation(0, Nh.LEFT), n = t.getLocation(0, Nh.RIGHT);
        return e === hl.INTERIOR && n === hl.EXTERIOR ? 1 : e === hl.EXTERIOR && n === hl.INTERIOR ? -1 : 0
    }, of.convertSegStrings = function (t) {
        for (var e = new vh, n = new uc; t.hasNext();) {
            var r = t.next(), i = e.createLineString(r.getCoordinates());
            n.add(i)
        }
        return e.buildGeometry(n)
    };
    var sf = function () {
        if (this._noder = null, this._scaleFactor = null, this._offsetX = null, this._offsetY = null, this._isScaled = !1, 2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            this._noder = t, this._scaleFactor = e, this._offsetX = 0, this._offsetY = 0, this._isScaled = !this.isIntegerPrecision()
        } else if (4 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = arguments[2], o = arguments[3];
            this._noder = n, this._scaleFactor = r, this._offsetX = i, this._offsetY = o, this._isScaled = !this.isIntegerPrecision()
        }
    };
    sf.prototype.rescale = function () {
        var t = this;
        if (fl(arguments[0], rc)) for (var e = arguments[0], n = e.iterator(); n.hasNext();) {
            var r = n.next();
            t.rescale(r.getCoordinates())
        } else if (arguments[0] instanceof Array) {
            for (var i = arguments[0], o = 0; o < i.length; o++) i[o].x = i[o].x / t._scaleFactor + t._offsetX, i[o].y = i[o].y / t._scaleFactor + t._offsetY;
            2 === i.length && i[0].equals2D(i[1]) && Cl.out.println(i)
        }
    }, sf.prototype.scale = function () {
        var t = this;
        if (fl(arguments[0], rc)) {
            for (var e = arguments[0], n = new uc, r = e.iterator(); r.hasNext();) {
                var i = r.next();
                n.add(new dp(t.scale(i.getCoordinates()), i.getData()))
            }
            return n
        }
        if (arguments[0] instanceof Array) {
            for (var o = arguments[0], s = new Array(o.length).fill(null), a = 0; a < o.length; a++) s[a] = new al(Math.round((o[a].x - t._offsetX) * t._scaleFactor), Math.round((o[a].y - t._offsetY) * t._scaleFactor), o[a].z);
            var u = hc.removeRepeatedPoints(s);
            return u
        }
    }, sf.prototype.isIntegerPrecision = function () {
        return 1 === this._scaleFactor
    }, sf.prototype.getNodedSubstrings = function () {
        var t = this._noder.getNodedSubstrings();
        return this._isScaled && this.rescale(t), t
    }, sf.prototype.computeNodes = function (t) {
        var e = t;
        this._isScaled && (e = this.scale(t)), this._noder.computeNodes(e)
    }, sf.prototype.interfaces_ = function () {
        return [Ep]
    }, sf.prototype.getClass = function () {
        return sf
    };
    var af = function () {
        this._li = new zl, this._segStrings = null;
        var t = arguments[0];
        this._segStrings = t
    }, uf = {fact: {configurable: !0}};
    af.prototype.checkEndPtVertexIntersections = function () {
        var t = this;
        if (0 === arguments.length) for (var e = this._segStrings.iterator(); e.hasNext();) {
            var n = e.next(), r = n.getCoordinates();
            t.checkEndPtVertexIntersections(r[0], t._segStrings), t.checkEndPtVertexIntersections(r[r.length - 1], t._segStrings)
        } else if (2 === arguments.length) for (var i = arguments[0], o = arguments[1], s = o.iterator(); s.hasNext();) for (var a = s.next(), u = a.getCoordinates(), l = 1; l < u.length - 1; l++) if (u[l].equals(i)) throw new Fl("found endpt/interior pt intersection at index " + l + " :pt " + i)
    }, af.prototype.checkInteriorIntersections = function () {
        var t = this;
        if (0 === arguments.length) for (var e = this._segStrings.iterator(); e.hasNext();) for (var n = e.next(), r = this._segStrings.iterator(); r.hasNext();) {
            var i = r.next();
            t.checkInteriorIntersections(n, i)
        } else if (2 === arguments.length) for (var o = arguments[0], s = arguments[1], a = o.getCoordinates(), u = s.getCoordinates(), l = 0; l < a.length - 1; l++) for (var c = 0; c < u.length - 1; c++) t.checkInteriorIntersections(o, l, s, c); else if (4 === arguments.length) {
            var h = arguments[0], p = arguments[1], f = arguments[2], g = arguments[3];
            if (h === f && p === g) return null;
            var d = h.getCoordinates()[p], y = h.getCoordinates()[p + 1], v = f.getCoordinates()[g],
                _ = f.getCoordinates()[g + 1];
            if (this._li.computeIntersection(d, y, v, _), this._li.hasIntersection() && (this._li.isProper() || this.hasInteriorIntersection(this._li, d, y) || this.hasInteriorIntersection(this._li, v, _))) throw new Fl("found non-noded intersection at " + d + "-" + y + " and " + v + "-" + _)
        }
    }, af.prototype.checkValid = function () {
        this.checkEndPtVertexIntersections(), this.checkInteriorIntersections(), this.checkCollapses()
    }, af.prototype.checkCollapses = function () {
        var t = this;
        if (0 === arguments.length) for (var e = this._segStrings.iterator(); e.hasNext();) {
            var n = e.next();
            t.checkCollapses(n)
        } else if (1 === arguments.length) for (var r = arguments[0], i = r.getCoordinates(), o = 0; o < i.length - 2; o++) t.checkCollapse(i[o], i[o + 1], i[o + 2])
    }, af.prototype.hasInteriorIntersection = function (t, e, n) {
        for (var r = 0; r < t.getIntersectionNum(); r++) {
            var i = t.getIntersection(r);
            if (!i.equals(e) && !i.equals(n)) return !0
        }
        return !1
    }, af.prototype.checkCollapse = function (t, e, n) {
        if (t.equals(n)) throw new Fl("found non-noded collapse at " + af.fact.createLineString([t, e, n]))
    }, af.prototype.interfaces_ = function () {
        return []
    }, af.prototype.getClass = function () {
        return af
    }, uf.fact.get = function () {
        return new vh
    }, Object.defineProperties(af, uf);
    var lf = function () {
        this._li = null, this._pt = null, this._originalPt = null, this._ptScaled = null, this._p0Scaled = null, this._p1Scaled = null, this._scaleFactor = null, this._minx = null, this._maxx = null, this._miny = null, this._maxy = null, this._corner = new Array(4).fill(null), this._safeEnv = null;
        var t = arguments[0], e = arguments[1], n = arguments[2];
        if (this._originalPt = t, this._pt = t, this._scaleFactor = e, this._li = n, e <= 0) throw new tl("Scale factor must be non-zero");
        1 !== e && (this._pt = new al(this.scale(t.x), this.scale(t.y)), this._p0Scaled = new al, this._p1Scaled = new al), this.initCorners(this._pt)
    }, cf = {SAFE_ENV_EXPANSION_FACTOR: {configurable: !0}};
    lf.prototype.intersectsScaled = function (t, e) {
        var n = Math.min(t.x, e.x), r = Math.max(t.x, e.x), i = Math.min(t.y, e.y), o = Math.max(t.y, e.y),
            s = this._maxx < n || this._minx > r || this._maxy < i || this._miny > o;
        if (s) return !1;
        var a = this.intersectsToleranceSquare(t, e);
        return Gl.isTrue(!(s && a), "Found bad envelope test"), a
    }, lf.prototype.initCorners = function (t) {
        var e = .5;
        this._minx = t.x - e, this._maxx = t.x + e, this._miny = t.y - e, this._maxy = t.y + e, this._corner[0] = new al(this._maxx, this._maxy), this._corner[1] = new al(this._minx, this._maxy), this._corner[2] = new al(this._minx, this._miny), this._corner[3] = new al(this._maxx, this._miny)
    }, lf.prototype.intersects = function (t, e) {
        return 1 === this._scaleFactor ? this.intersectsScaled(t, e) : (this.copyScaled(t, this._p0Scaled), this.copyScaled(e, this._p1Scaled), this.intersectsScaled(this._p0Scaled, this._p1Scaled))
    }, lf.prototype.scale = function (t) {
        return Math.round(t * this._scaleFactor)
    }, lf.prototype.getCoordinate = function () {
        return this._originalPt
    }, lf.prototype.copyScaled = function (t, e) {
        e.x = this.scale(t.x), e.y = this.scale(t.y)
    }, lf.prototype.getSafeEnvelope = function () {
        if (null === this._safeEnv) {
            var t = lf.SAFE_ENV_EXPANSION_FACTOR / this._scaleFactor;
            this._safeEnv = new Ll(this._originalPt.x - t, this._originalPt.x + t, this._originalPt.y - t, this._originalPt.y + t)
        }
        return this._safeEnv
    }, lf.prototype.intersectsPixelClosure = function (t, e) {
        return this._li.computeIntersection(t, e, this._corner[0], this._corner[1]), !!this._li.hasIntersection() || (this._li.computeIntersection(t, e, this._corner[1], this._corner[2]), !!this._li.hasIntersection() || (this._li.computeIntersection(t, e, this._corner[2], this._corner[3]), !!this._li.hasIntersection() || (this._li.computeIntersection(t, e, this._corner[3], this._corner[0]), !!this._li.hasIntersection())))
    }, lf.prototype.intersectsToleranceSquare = function (t, e) {
        var n = !1, r = !1;
        return this._li.computeIntersection(t, e, this._corner[0], this._corner[1]), !!this._li.isProper() || (this._li.computeIntersection(t, e, this._corner[1], this._corner[2]), !!this._li.isProper() || (this._li.hasIntersection() && (n = !0), this._li.computeIntersection(t, e, this._corner[2], this._corner[3]), !!this._li.isProper() || (this._li.hasIntersection() && (r = !0), this._li.computeIntersection(t, e, this._corner[3], this._corner[0]), !!this._li.isProper() || (!(!n || !r) || (!!t.equals(this._pt) || !!e.equals(this._pt))))))
    }, lf.prototype.addSnappedNode = function (t, e) {
        var n = t.getCoordinate(e), r = t.getCoordinate(e + 1);
        return !!this.intersects(n, r) && (t.addIntersection(this.getCoordinate(), e), !0)
    }, lf.prototype.interfaces_ = function () {
        return []
    }, lf.prototype.getClass = function () {
        return lf
    }, cf.SAFE_ENV_EXPANSION_FACTOR.get = function () {
        return .75
    }, Object.defineProperties(lf, cf);
    var hf = function () {
        this.tempEnv1 = new Ll, this.selectedSegment = new yp
    };
    hf.prototype.select = function () {
        if (1 === arguments.length) ; else if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            t.getLineSegment(e, this.selectedSegment), this.select(this.selectedSegment)
        }
    }, hf.prototype.interfaces_ = function () {
        return []
    }, hf.prototype.getClass = function () {
        return hf
    };
    var pf = function () {
        this._index = null;
        var t = arguments[0];
        this._index = t
    }, ff = {HotPixelSnapAction: {configurable: !0}};
    pf.prototype.snap = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return this.snap(t, null, -1)
        }
        if (3 === arguments.length) {
            var e = arguments[0], n = arguments[1], r = arguments[2], i = e.getSafeEnvelope(), o = new gf(e, n, r);
            return this._index.query(i, {
                interfaces_: function () {
                    return [Kh]
                }, visitItem: function (t) {
                    t.select(i, o)
                }
            }), o.isNodeAdded()
        }
    }, pf.prototype.interfaces_ = function () {
        return []
    }, pf.prototype.getClass = function () {
        return pf
    }, ff.HotPixelSnapAction.get = function () {
        return gf
    }, Object.defineProperties(pf, ff);
    var gf = function (t) {
        function e() {
            t.call(this), this._hotPixel = null, this._parentEdge = null, this._hotPixelVertexIndex = null, this._isNodeAdded = !1;
            var e = arguments[0], n = arguments[1], r = arguments[2];
            this._hotPixel = e, this._parentEdge = n, this._hotPixelVertexIndex = r
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.isNodeAdded = function () {
            return this._isNodeAdded
        }, e.prototype.select = function () {
            if (2 !== arguments.length) return t.prototype.select.apply(this, arguments);
            var e = arguments[0], n = arguments[1], r = e.getContext();
            if (null !== this._parentEdge && r === this._parentEdge && n === this._hotPixelVertexIndex) return null;
            this._isNodeAdded = this._hotPixel.addSnappedNode(r, n)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(hf), df = function () {
        this._li = null, this._interiorIntersections = null;
        var t = arguments[0];
        this._li = t, this._interiorIntersections = new uc
    };
    df.prototype.processIntersections = function (t, e, n, r) {
        if (t === n && e === r) return null;
        var i = t.getCoordinates()[e], o = t.getCoordinates()[e + 1], s = n.getCoordinates()[r],
            a = n.getCoordinates()[r + 1];
        if (this._li.computeIntersection(i, o, s, a), this._li.hasIntersection() && this._li.isInteriorIntersection()) {
            for (var u = 0; u < this._li.getIntersectionNum(); u++) this._interiorIntersections.add(this._li.getIntersection(u));
            t.addIntersections(this._li, e, 0), n.addIntersections(this._li, r, 1)
        }
    }, df.prototype.isDone = function () {
        return !1
    }, df.prototype.getInteriorIntersections = function () {
        return this._interiorIntersections
    }, df.prototype.interfaces_ = function () {
        return [Jp]
    }, df.prototype.getClass = function () {
        return df
    };
    var yf = function () {
        this._pm = null, this._li = null, this._scaleFactor = null, this._noder = null, this._pointSnapper = null, this._nodedSegStrings = null;
        var t = arguments[0];
        this._pm = t, this._li = new zl, this._li.setPrecisionModel(t), this._scaleFactor = t.getScale()
    };
    yf.prototype.checkCorrectness = function (t) {
        var e = dp.getNodedSubstrings(t), n = new af(e);
        try {
            n.checkValid()
        } catch (t) {
            if (!(t instanceof Nl)) throw t;
            t.printStackTrace()
        }
    }, yf.prototype.getNodedSubstrings = function () {
        return dp.getNodedSubstrings(this._nodedSegStrings)
    }, yf.prototype.snapRound = function (t, e) {
        var n = this.findInteriorIntersections(t, e);
        this.computeIntersectionSnaps(n), this.computeVertexSnaps(t)
    }, yf.prototype.findInteriorIntersections = function (t, e) {
        var n = new df(e);
        return this._noder.setSegmentIntersector(n), this._noder.computeNodes(t), n.getInteriorIntersections()
    }, yf.prototype.computeVertexSnaps = function () {
        var t = this;
        if (fl(arguments[0], rc)) for (var e = arguments[0], n = e.iterator(); n.hasNext();) {
            var r = n.next();
            t.computeVertexSnaps(r)
        } else if (arguments[0] instanceof dp) for (var i = arguments[0], o = i.getCoordinates(), s = 0; s < o.length; s++) {
            var a = new lf(o[s], t._scaleFactor, t._li), u = t._pointSnapper.snap(a, i, s);
            u && i.addIntersection(o[s], s)
        }
    }, yf.prototype.computeNodes = function (t) {
        this._nodedSegStrings = t, this._noder = new wp, this._pointSnapper = new pf(this._noder.getIndex()), this.snapRound(t, this._li)
    }, yf.prototype.computeIntersectionSnaps = function (t) {
        for (var e = this, n = t.iterator(); n.hasNext();) {
            var r = n.next(), i = new lf(r, e._scaleFactor, e._li);
            e._pointSnapper.snap(i)
        }
    }, yf.prototype.interfaces_ = function () {
        return [Ep]
    }, yf.prototype.getClass = function () {
        return yf
    };
    var vf = function () {
        if (this._argGeom = null, this._distance = null, this._bufParams = new Np, this._resultGeometry = null, this._saveException = null, 1 === arguments.length) {
            var t = arguments[0];
            this._argGeom = t
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            this._argGeom = e, this._bufParams = n
        }
    }, _f = {
        CAP_ROUND: {configurable: !0},
        CAP_BUTT: {configurable: !0},
        CAP_FLAT: {configurable: !0},
        CAP_SQUARE: {configurable: !0},
        MAX_PRECISION_DIGITS: {configurable: !0}
    };
    vf.prototype.bufferFixedPrecision = function (t) {
        var e = new sf(new yf(new fh(1)), t.getScale()), n = new of(this._bufParams);
        n.setWorkingPrecisionModel(t), n.setNoder(e), this._resultGeometry = n.buffer(this._argGeom, this._distance)
    }, vf.prototype.bufferReducedPrecision = function () {
        var t = this;
        if (0 === arguments.length) {
            for (var e = vf.MAX_PRECISION_DIGITS; e >= 0; e--) {
                try {
                    t.bufferReducedPrecision(e)
                } catch (e) {
                    if (!(e instanceof Mh)) throw e;
                    t._saveException = e
                }
                if (null !== t._resultGeometry) return null
            }
            throw this._saveException
        }
        if (1 === arguments.length) {
            var n = arguments[0], r = vf.precisionScaleFactor(this._argGeom, this._distance, n), i = new fh(r);
            this.bufferFixedPrecision(i)
        }
    }, vf.prototype.computeGeometry = function () {
        if (this.bufferOriginalPrecision(), null !== this._resultGeometry) return null;
        var t = this._argGeom.getFactory().getPrecisionModel();
        t.getType() === fh.FIXED ? this.bufferFixedPrecision(t) : this.bufferReducedPrecision()
    }, vf.prototype.setQuadrantSegments = function (t) {
        this._bufParams.setQuadrantSegments(t)
    }, vf.prototype.bufferOriginalPrecision = function () {
        try {
            var t = new of(this._bufParams);
            this._resultGeometry = t.buffer(this._argGeom, this._distance)
        } catch (t) {
            if (!(t instanceof Fl)) throw t;
            this._saveException = t
        }
    }, vf.prototype.getResultGeometry = function (t) {
        return this._distance = t, this.computeGeometry(), this._resultGeometry
    }, vf.prototype.setEndCapStyle = function (t) {
        this._bufParams.setEndCapStyle(t)
    }, vf.prototype.interfaces_ = function () {
        return []
    }, vf.prototype.getClass = function () {
        return vf
    }, vf.bufferOp = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = new vf(t), r = n.getResultGeometry(e);
            return r
        }
        if (3 === arguments.length) {
            if (Number.isInteger(arguments[2]) && arguments[0] instanceof Hl && "number" == typeof arguments[1]) {
                var i = arguments[0], o = arguments[1], s = arguments[2], a = new vf(i);
                a.setQuadrantSegments(s);
                var u = a.getResultGeometry(o);
                return u
            }
            if (arguments[2] instanceof Np && arguments[0] instanceof Hl && "number" == typeof arguments[1]) {
                var l = arguments[0], c = arguments[1], h = arguments[2], p = new vf(l, h), f = p.getResultGeometry(c);
                return f
            }
        } else if (4 === arguments.length) {
            var g = arguments[0], d = arguments[1], y = arguments[2], v = arguments[3], _ = new vf(g);
            _.setQuadrantSegments(y), _.setEndCapStyle(v);
            var m = _.getResultGeometry(d);
            return m
        }
    }, vf.precisionScaleFactor = function (t, e, n) {
        var r = t.getEnvelopeInternal(),
            i = gl.max(Math.abs(r.getMaxX()), Math.abs(r.getMaxY()), Math.abs(r.getMinX()), Math.abs(r.getMinY())) + 2 * (e > 0 ? e : 0),
            o = n - Math.trunc(Math.log(i) / Math.log(10) + 1);
        return Math.pow(10, o)
    }, _f.CAP_ROUND.get = function () {
        return Np.CAP_ROUND
    }, _f.CAP_BUTT.get = function () {
        return Np.CAP_FLAT
    }, _f.CAP_FLAT.get = function () {
        return Np.CAP_FLAT
    }, _f.CAP_SQUARE.get = function () {
        return Np.CAP_SQUARE
    }, _f.MAX_PRECISION_DIGITS.get = function () {
        return 12
    }, Object.defineProperties(vf, _f);
    var mf = function () {
        this._pt = [new al, new al], this._distance = el.NaN, this._isNull = !0
    };
    mf.prototype.getCoordinates = function () {
        return this._pt
    }, mf.prototype.getCoordinate = function (t) {
        return this._pt[t]
    }, mf.prototype.setMinimum = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.setMinimum(t._pt[0], t._pt[1])
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            if (this._isNull) return this.initialize(e, n), null;
            var r = e.distance(n);
            r < this._distance && this.initialize(e, n, r)
        }
    }, mf.prototype.initialize = function () {
        if (0 === arguments.length) this._isNull = !0; else if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            this._pt[0].setCoordinate(t), this._pt[1].setCoordinate(e), this._distance = t.distance(e), this._isNull = !1
        } else if (3 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = arguments[2];
            this._pt[0].setCoordinate(n), this._pt[1].setCoordinate(r), this._distance = i, this._isNull = !1
        }
    }, mf.prototype.getDistance = function () {
        return this._distance
    }, mf.prototype.setMaximum = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.setMaximum(t._pt[0], t._pt[1])
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            if (this._isNull) return this.initialize(e, n), null;
            var r = e.distance(n);
            r > this._distance && this.initialize(e, n, r)
        }
    }, mf.prototype.interfaces_ = function () {
        return []
    }, mf.prototype.getClass = function () {
        return mf
    };
    var xf = function () {
    };
    xf.prototype.interfaces_ = function () {
        return []
    }, xf.prototype.getClass = function () {
        return xf
    }, xf.computeDistance = function () {
        if (arguments[2] instanceof mf && arguments[0] instanceof Jc && arguments[1] instanceof al) for (var t = arguments[0], e = arguments[1], n = arguments[2], r = t.getCoordinates(), i = new yp, o = 0; o < r.length - 1; o++) {
            i.setCoordinates(r[o], r[o + 1]);
            var s = i.closestPoint(e);
            n.setMinimum(s, e)
        } else if (arguments[2] instanceof mf && arguments[0] instanceof $c && arguments[1] instanceof al) {
            var a = arguments[0], u = arguments[1], l = arguments[2];
            xf.computeDistance(a.getExteriorRing(), u, l);
            for (var c = 0; c < a.getNumInteriorRing(); c++) xf.computeDistance(a.getInteriorRingN(c), u, l)
        } else if (arguments[2] instanceof mf && arguments[0] instanceof Hl && arguments[1] instanceof al) {
            var h = arguments[0], p = arguments[1], f = arguments[2];
            if (h instanceof Jc) xf.computeDistance(h, p, f); else if (h instanceof $c) xf.computeDistance(h, p, f); else if (h instanceof Fc) for (var g = h, d = 0; d < g.getNumGeometries(); d++) {
                var y = g.getGeometryN(d);
                xf.computeDistance(y, p, f)
            } else f.setMinimum(h.getCoordinate(), p)
        } else if (arguments[2] instanceof mf && arguments[0] instanceof yp && arguments[1] instanceof al) {
            var v = arguments[0], _ = arguments[1], m = arguments[2], x = v.closestPoint(_);
            m.setMinimum(x, _)
        }
    };
    var Ef = function (t) {
        this._maxPtDist = new mf, this._inputGeom = t || null
    }, bf = {MaxPointDistanceFilter: {configurable: !0}, MaxMidpointDistanceFilter: {configurable: !0}};
    Ef.prototype.computeMaxMidpointDistance = function (t) {
        var e = new If(this._inputGeom);
        t.apply(e), this._maxPtDist.setMaximum(e.getMaxPointDistance())
    }, Ef.prototype.computeMaxVertexDistance = function (t) {
        var e = new wf(this._inputGeom);
        t.apply(e), this._maxPtDist.setMaximum(e.getMaxPointDistance())
    }, Ef.prototype.findDistance = function (t) {
        return this.computeMaxVertexDistance(t), this.computeMaxMidpointDistance(t), this._maxPtDist.getDistance()
    }, Ef.prototype.getDistancePoints = function () {
        return this._maxPtDist
    }, Ef.prototype.interfaces_ = function () {
        return []
    }, Ef.prototype.getClass = function () {
        return Ef
    }, bf.MaxPointDistanceFilter.get = function () {
        return wf
    }, bf.MaxMidpointDistanceFilter.get = function () {
        return If
    }, Object.defineProperties(Ef, bf);
    var wf = function (t) {
        this._maxPtDist = new mf, this._minPtDist = new mf, this._geom = t || null
    };
    wf.prototype.filter = function (t) {
        this._minPtDist.initialize(), xf.computeDistance(this._geom, t, this._minPtDist), this._maxPtDist.setMaximum(this._minPtDist)
    }, wf.prototype.getMaxPointDistance = function () {
        return this._maxPtDist
    }, wf.prototype.interfaces_ = function () {
        return [Zl]
    }, wf.prototype.getClass = function () {
        return wf
    };
    var If = function (t) {
        this._maxPtDist = new mf, this._minPtDist = new mf, this._geom = t || null
    };
    If.prototype.filter = function (t, e) {
        if (0 === e) return null;
        var n = t.getCoordinate(e - 1), r = t.getCoordinate(e), i = new al((n.x + r.x) / 2, (n.y + r.y) / 2);
        this._minPtDist.initialize(), xf.computeDistance(this._geom, i, this._minPtDist), this._maxPtDist.setMaximum(this._minPtDist)
    }, If.prototype.isDone = function () {
        return !1
    }, If.prototype.isGeometryChanged = function () {
        return !1
    }, If.prototype.getMaxPointDistance = function () {
        return this._maxPtDist
    }, If.prototype.interfaces_ = function () {
        return [Dc]
    }, If.prototype.getClass = function () {
        return If
    };
    var Nf = function (t) {
        this._comps = t || null
    };
    Nf.prototype.filter = function (t) {
        t instanceof $c && this._comps.add(t)
    }, Nf.prototype.interfaces_ = function () {
        return [Ac]
    }, Nf.prototype.getClass = function () {
        return Nf
    }, Nf.getPolygons = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return Nf.getPolygons(t, new uc)
        }
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            return e instanceof $c ? n.add(e) : e instanceof Fc && e.apply(new Nf(n)), n
        }
    };
    var Sf = function () {
        if (this._lines = null, this._isForcedToLineString = !1, 1 === arguments.length) {
            var t = arguments[0];
            this._lines = t
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            this._lines = e, this._isForcedToLineString = n
        }
    };
    Sf.prototype.filter = function (t) {
        if (this._isForcedToLineString && t instanceof eh) {
            var e = t.getFactory().createLineString(t.getCoordinateSequence());
            return this._lines.add(e), null
        }
        t instanceof Jc && this._lines.add(t)
    }, Sf.prototype.setForceToLineString = function (t) {
        this._isForcedToLineString = t
    }, Sf.prototype.interfaces_ = function () {
        return [Yl]
    }, Sf.prototype.getClass = function () {
        return Sf
    }, Sf.getGeometry = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return t.getFactory().buildGeometry(Sf.getLines(t))
        }
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            return e.getFactory().buildGeometry(Sf.getLines(e, n))
        }
    }, Sf.getLines = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return Sf.getLines(t, !1)
        }
        if (2 === arguments.length) {
            if (fl(arguments[0], rc) && fl(arguments[1], rc)) {
                for (var e = arguments[0], n = arguments[1], r = e.iterator(); r.hasNext();) {
                    var i = r.next();
                    Sf.getLines(i, n)
                }
                return n
            }
            if (arguments[0] instanceof Hl && "boolean" == typeof arguments[1]) {
                var o = arguments[0], s = arguments[1], a = new uc;
                return o.apply(new Sf(a, s)), a
            }
            if (arguments[0] instanceof Hl && fl(arguments[1], rc)) {
                var u = arguments[0], l = arguments[1];
                return u instanceof Jc ? l.add(u) : u.apply(new Sf(l)), l
            }
        } else if (3 === arguments.length) {
            if ("boolean" == typeof arguments[2] && fl(arguments[0], rc) && fl(arguments[1], rc)) {
                for (var c = arguments[0], h = arguments[1], p = arguments[2], f = c.iterator(); f.hasNext();) {
                    var g = f.next();
                    Sf.getLines(g, h, p)
                }
                return h
            }
            if ("boolean" == typeof arguments[2] && arguments[0] instanceof Hl && fl(arguments[1], rc)) {
                var d = arguments[0], y = arguments[1], v = arguments[2];
                return d.apply(new Sf(y, v)), y
            }
        }
    };
    var Cf = function () {
        if (this._boundaryRule = Kl.OGC_SFS_BOUNDARY_RULE, this._isIn = null, this._numBoundaries = null, 0 === arguments.length) ; else if (1 === arguments.length) {
            var t = arguments[0];
            if (null === t) throw new tl("Rule must be non-null");
            this._boundaryRule = t
        }
    };
    Cf.prototype.locateInternal = function () {
        var t = this;
        if (arguments[0] instanceof al && arguments[1] instanceof $c) {
            var e = arguments[0], n = arguments[1];
            if (n.isEmpty()) return hl.EXTERIOR;
            var r = n.getExteriorRing(), i = this.locateInPolygonRing(e, r);
            if (i === hl.EXTERIOR) return hl.EXTERIOR;
            if (i === hl.BOUNDARY) return hl.BOUNDARY;
            for (var o = 0; o < n.getNumInteriorRing(); o++) {
                var s = n.getInteriorRingN(o), a = t.locateInPolygonRing(e, s);
                if (a === hl.INTERIOR) return hl.EXTERIOR;
                if (a === hl.BOUNDARY) return hl.BOUNDARY
            }
            return hl.INTERIOR
        }
        if (arguments[0] instanceof al && arguments[1] instanceof Jc) {
            var u = arguments[0], l = arguments[1];
            if (!l.getEnvelopeInternal().intersects(u)) return hl.EXTERIOR;
            var c = l.getCoordinates();
            return l.isClosed() || !u.equals(c[0]) && !u.equals(c[c.length - 1]) ? Vl.isOnLine(u, c) ? hl.INTERIOR : hl.EXTERIOR : hl.BOUNDARY
        }
        if (arguments[0] instanceof al && arguments[1] instanceof Kc) {
            var h = arguments[0], p = arguments[1], f = p.getCoordinate();
            return f.equals2D(h) ? hl.INTERIOR : hl.EXTERIOR
        }
    }, Cf.prototype.locateInPolygonRing = function (t, e) {
        return e.getEnvelopeInternal().intersects(t) ? Vl.locatePointInRing(t, e.getCoordinates()) : hl.EXTERIOR
    }, Cf.prototype.intersects = function (t, e) {
        return this.locate(t, e) !== hl.EXTERIOR
    }, Cf.prototype.updateLocationInfo = function (t) {
        t === hl.INTERIOR && (this._isIn = !0), t === hl.BOUNDARY && this._numBoundaries++
    }, Cf.prototype.computeLocation = function (t, e) {
        var n = this;
        if (e instanceof Kc && this.updateLocationInfo(this.locateInternal(t, e)), e instanceof Jc) this.updateLocationInfo(this.locateInternal(t, e)); else if (e instanceof $c) this.updateLocationInfo(this.locateInternal(t, e)); else if (e instanceof kc) for (var r = e, i = 0; i < r.getNumGeometries(); i++) {
            var o = r.getGeometryN(i);
            n.updateLocationInfo(n.locateInternal(t, o))
        } else if (e instanceof nh) for (var s = e, a = 0; a < s.getNumGeometries(); a++) {
            var u = s.getGeometryN(a);
            n.updateLocationInfo(n.locateInternal(t, u))
        } else if (e instanceof Fc) for (var l = new jp(e); l.hasNext();) {
            var c = l.next();
            c !== e && n.computeLocation(t, c)
        }
    }, Cf.prototype.locate = function (t, e) {
        return e.isEmpty() ? hl.EXTERIOR : e instanceof Jc || e instanceof $c ? this.locateInternal(t, e) : (this._isIn = !1, this._numBoundaries = 0, this.computeLocation(t, e), this._boundaryRule.isInBoundary(this._numBoundaries) ? hl.BOUNDARY : this._numBoundaries > 0 || this._isIn ? hl.INTERIOR : hl.EXTERIOR)
    }, Cf.prototype.interfaces_ = function () {
        return []
    }, Cf.prototype.getClass = function () {
        return Cf
    };
    var Pf = function t() {
        if (this._component = null, this._segIndex = null, this._pt = null, 2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            t.call(this, e, t.INSIDE_AREA, n)
        } else if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2];
            this._component = r, this._segIndex = i, this._pt = o
        }
    }, Lf = {INSIDE_AREA: {configurable: !0}};
    Pf.prototype.isInsideArea = function () {
        return this._segIndex === Pf.INSIDE_AREA
    }, Pf.prototype.getCoordinate = function () {
        return this._pt
    }, Pf.prototype.getGeometryComponent = function () {
        return this._component
    }, Pf.prototype.getSegmentIndex = function () {
        return this._segIndex
    }, Pf.prototype.interfaces_ = function () {
        return []
    }, Pf.prototype.getClass = function () {
        return Pf
    }, Lf.INSIDE_AREA.get = function () {
        return -1
    }, Object.defineProperties(Pf, Lf);
    var Mf = function (t) {
        this._pts = t || null
    };
    Mf.prototype.filter = function (t) {
        t instanceof Kc && this._pts.add(t)
    }, Mf.prototype.interfaces_ = function () {
        return [Ac]
    }, Mf.prototype.getClass = function () {
        return Mf
    }, Mf.getPoints = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return t instanceof Kc ? ep.singletonList(t) : Mf.getPoints(t, new uc)
        }
        if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            return e instanceof Kc ? n.add(e) : e instanceof Fc && e.apply(new Mf(n)), n
        }
    };
    var Of = function () {
        this._locations = null;
        var t = arguments[0];
        this._locations = t
    };
    Of.prototype.filter = function (t) {
        (t instanceof Kc || t instanceof Jc || t instanceof $c) && this._locations.add(new Pf(t, 0, t.getCoordinate()))
    }, Of.prototype.interfaces_ = function () {
        return [Ac]
    }, Of.prototype.getClass = function () {
        return Of
    }, Of.getLocations = function (t) {
        var e = new uc;
        return t.apply(new Of(e)), e
    };
    var Rf = function () {
        if (this._geom = null, this._terminateDistance = 0, this._ptLocator = new Cf, this._minDistanceLocation = null, this._minDistance = el.MAX_VALUE, 2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            this._geom = [t, e], this._terminateDistance = 0
        } else if (3 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = arguments[2];
            this._geom = new Array(2).fill(null), this._geom[0] = n, this._geom[1] = r, this._terminateDistance = i
        }
    };
    Rf.prototype.computeContainmentDistance = function () {
        var t = this;
        if (0 === arguments.length) {
            var e = new Array(2).fill(null);
            if (this.computeContainmentDistance(0, e), this._minDistance <= this._terminateDistance) return null;
            this.computeContainmentDistance(1, e)
        } else if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = 1 - n, o = Nf.getPolygons(this._geom[n]);
            if (o.size() > 0) {
                var s = Of.getLocations(this._geom[i]);
                if (this.computeContainmentDistance(s, o, r), this._minDistance <= this._terminateDistance) return this._minDistanceLocation[i] = r[0], this._minDistanceLocation[n] = r[1], null
            }
        } else if (3 === arguments.length) if (arguments[2] instanceof Array && fl(arguments[0], sc) && fl(arguments[1], sc)) {
            for (var a = arguments[0], u = arguments[1], l = arguments[2], c = 0; c < a.size(); c++) for (var h = a.get(c), p = 0; p < u.size(); p++) if (t.computeContainmentDistance(h, u.get(p), l), t._minDistance <= t._terminateDistance) return null
        } else if (arguments[2] instanceof Array && arguments[0] instanceof Pf && arguments[1] instanceof $c) {
            var f = arguments[0], g = arguments[1], d = arguments[2], y = f.getCoordinate();
            if (hl.EXTERIOR !== this._ptLocator.locate(y, g)) return this._minDistance = 0, d[0] = f, d[1] = new Pf(g, y), null
        }
    }, Rf.prototype.computeMinDistanceLinesPoints = function (t, e, n) {
        for (var r = this, i = 0; i < t.size(); i++) for (var o = t.get(i), s = 0; s < e.size(); s++) {
            var a = e.get(s);
            if (r.computeMinDistance(o, a, n), r._minDistance <= r._terminateDistance) return null
        }
    }, Rf.prototype.computeFacetDistance = function () {
        var t = new Array(2).fill(null), e = Sf.getLines(this._geom[0]), n = Sf.getLines(this._geom[1]),
            r = Mf.getPoints(this._geom[0]), i = Mf.getPoints(this._geom[1]);
        return this.computeMinDistanceLines(e, n, t), this.updateMinDistance(t, !1), this._minDistance <= this._terminateDistance ? null : (t[0] = null, t[1] = null, this.computeMinDistanceLinesPoints(e, i, t), this.updateMinDistance(t, !1), this._minDistance <= this._terminateDistance ? null : (t[0] = null, t[1] = null, this.computeMinDistanceLinesPoints(n, r, t), this.updateMinDistance(t, !0), this._minDistance <= this._terminateDistance ? null : (t[0] = null, t[1] = null, this.computeMinDistancePoints(r, i, t), void this.updateMinDistance(t, !1))))
    }, Rf.prototype.nearestLocations = function () {
        return this.computeMinDistance(), this._minDistanceLocation
    }, Rf.prototype.updateMinDistance = function (t, e) {
        if (null === t[0]) return null;
        e ? (this._minDistanceLocation[0] = t[1], this._minDistanceLocation[1] = t[0]) : (this._minDistanceLocation[0] = t[0], this._minDistanceLocation[1] = t[1])
    }, Rf.prototype.nearestPoints = function () {
        return this.computeMinDistance(), [this._minDistanceLocation[0].getCoordinate(), this._minDistanceLocation[1].getCoordinate()]
    }, Rf.prototype.computeMinDistance = function () {
        var t = this;
        if (0 === arguments.length) {
            if (null !== this._minDistanceLocation) return null;
            if (this._minDistanceLocation = new Array(2).fill(null), this.computeContainmentDistance(), this._minDistance <= this._terminateDistance) return null;
            this.computeFacetDistance()
        } else if (3 === arguments.length) if (arguments[2] instanceof Array && arguments[0] instanceof Jc && arguments[1] instanceof Kc) {
            var e = arguments[0], n = arguments[1], r = arguments[2];
            if (e.getEnvelopeInternal().distance(n.getEnvelopeInternal()) > this._minDistance) return null;
            for (var i = e.getCoordinates(), o = n.getCoordinate(), s = 0; s < i.length - 1; s++) {
                var a = Vl.distancePointLine(o, i[s], i[s + 1]);
                if (a < t._minDistance) {
                    t._minDistance = a;
                    var u = new yp(i[s], i[s + 1]), l = u.closestPoint(o);
                    r[0] = new Pf(e, s, l), r[1] = new Pf(n, 0, o)
                }
                if (t._minDistance <= t._terminateDistance) return null
            }
        } else if (arguments[2] instanceof Array && arguments[0] instanceof Jc && arguments[1] instanceof Jc) {
            var c = arguments[0], h = arguments[1], p = arguments[2];
            if (c.getEnvelopeInternal().distance(h.getEnvelopeInternal()) > this._minDistance) return null;
            for (var f = c.getCoordinates(), g = h.getCoordinates(), d = 0; d < f.length - 1; d++) for (var y = 0; y < g.length - 1; y++) {
                var v = Vl.distanceLineLine(f[d], f[d + 1], g[y], g[y + 1]);
                if (v < t._minDistance) {
                    t._minDistance = v;
                    var _ = new yp(f[d], f[d + 1]), m = new yp(g[y], g[y + 1]), x = _.closestPoints(m);
                    p[0] = new Pf(c, d, x[0]), p[1] = new Pf(h, y, x[1])
                }
                if (t._minDistance <= t._terminateDistance) return null
            }
        }
    }, Rf.prototype.computeMinDistancePoints = function (t, e, n) {
        for (var r = this, i = 0; i < t.size(); i++) for (var o = t.get(i), s = 0; s < e.size(); s++) {
            var a = e.get(s), u = o.getCoordinate().distance(a.getCoordinate());
            if (u < r._minDistance && (r._minDistance = u, n[0] = new Pf(o, 0, o.getCoordinate()), n[1] = new Pf(a, 0, a.getCoordinate())), r._minDistance <= r._terminateDistance) return null
        }
    }, Rf.prototype.distance = function () {
        if (null === this._geom[0] || null === this._geom[1]) throw new tl("null geometries are not supported");
        return this._geom[0].isEmpty() || this._geom[1].isEmpty() ? 0 : (this.computeMinDistance(), this._minDistance)
    }, Rf.prototype.computeMinDistanceLines = function (t, e, n) {
        for (var r = this, i = 0; i < t.size(); i++) for (var o = t.get(i), s = 0; s < e.size(); s++) {
            var a = e.get(s);
            if (r.computeMinDistance(o, a, n), r._minDistance <= r._terminateDistance) return null
        }
    }, Rf.prototype.interfaces_ = function () {
        return []
    }, Rf.prototype.getClass = function () {
        return Rf
    }, Rf.distance = function (t, e) {
        return new Rf(t, e).distance()
    }, Rf.isWithinDistance = function (t, e, n) {
        return new Rf(t, e, n).distance() <= n
    }, Rf.nearestPoints = function (t, e) {
        return new Rf(t, e).nearestPoints()
    };
    var Tf = function () {
        this._pt = [new al, new al], this._distance = el.NaN, this._isNull = !0
    };
    Tf.prototype.getCoordinates = function () {
        return this._pt
    }, Tf.prototype.getCoordinate = function (t) {
        return this._pt[t]
    }, Tf.prototype.setMinimum = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.setMinimum(t._pt[0], t._pt[1])
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            if (this._isNull) return this.initialize(e, n), null;
            var r = e.distance(n);
            r < this._distance && this.initialize(e, n, r)
        }
    }, Tf.prototype.initialize = function () {
        if (0 === arguments.length) this._isNull = !0; else if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1];
            this._pt[0].setCoordinate(t), this._pt[1].setCoordinate(e), this._distance = t.distance(e), this._isNull = !1
        } else if (3 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = arguments[2];
            this._pt[0].setCoordinate(n), this._pt[1].setCoordinate(r), this._distance = i, this._isNull = !1
        }
    }, Tf.prototype.toString = function () {
        return Dl.toLineString(this._pt[0], this._pt[1])
    }, Tf.prototype.getDistance = function () {
        return this._distance
    }, Tf.prototype.setMaximum = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            this.setMaximum(t._pt[0], t._pt[1])
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            if (this._isNull) return this.initialize(e, n), null;
            var r = e.distance(n);
            r > this._distance && this.initialize(e, n, r)
        }
    }, Tf.prototype.interfaces_ = function () {
        return []
    }, Tf.prototype.getClass = function () {
        return Tf
    };
    var Af = function () {
    };
    Af.prototype.interfaces_ = function () {
        return []
    }, Af.prototype.getClass = function () {
        return Af
    }, Af.computeDistance = function () {
        if (arguments[2] instanceof Tf && arguments[0] instanceof Jc && arguments[1] instanceof al) for (var t = arguments[0], e = arguments[1], n = arguments[2], r = new yp, i = t.getCoordinates(), o = 0; o < i.length - 1; o++) {
            r.setCoordinates(i[o], i[o + 1]);
            var s = r.closestPoint(e);
            n.setMinimum(s, e)
        } else if (arguments[2] instanceof Tf && arguments[0] instanceof $c && arguments[1] instanceof al) {
            var a = arguments[0], u = arguments[1], l = arguments[2];
            Af.computeDistance(a.getExteriorRing(), u, l);
            for (var c = 0; c < a.getNumInteriorRing(); c++) Af.computeDistance(a.getInteriorRingN(c), u, l)
        } else if (arguments[2] instanceof Tf && arguments[0] instanceof Hl && arguments[1] instanceof al) {
            var h = arguments[0], p = arguments[1], f = arguments[2];
            if (h instanceof Jc) Af.computeDistance(h, p, f); else if (h instanceof $c) Af.computeDistance(h, p, f); else if (h instanceof Fc) for (var g = h, d = 0; d < g.getNumGeometries(); d++) {
                var y = g.getGeometryN(d);
                Af.computeDistance(y, p, f)
            } else f.setMinimum(h.getCoordinate(), p)
        } else if (arguments[2] instanceof Tf && arguments[0] instanceof yp && arguments[1] instanceof al) {
            var v = arguments[0], _ = arguments[1], m = arguments[2], x = v.closestPoint(_);
            m.setMinimum(x, _)
        }
    };
    var Df = function () {
        this._g0 = null, this._g1 = null, this._ptDist = new Tf, this._densifyFrac = 0;
        var t = arguments[0], e = arguments[1];
        this._g0 = t, this._g1 = e
    }, Ff = {MaxPointDistanceFilter: {configurable: !0}, MaxDensifiedByFractionDistanceFilter: {configurable: !0}};
    Df.prototype.getCoordinates = function () {
        return this._ptDist.getCoordinates()
    }, Df.prototype.setDensifyFraction = function (t) {
        if (t > 1 || t <= 0) throw new tl("Fraction is not in range (0.0 - 1.0]");
        this._densifyFrac = t
    }, Df.prototype.compute = function (t, e) {
        this.computeOrientedDistance(t, e, this._ptDist), this.computeOrientedDistance(e, t, this._ptDist)
    }, Df.prototype.distance = function () {
        return this.compute(this._g0, this._g1), this._ptDist.getDistance()
    }, Df.prototype.computeOrientedDistance = function (t, e, n) {
        var r = new kf(e);
        if (t.apply(r), n.setMaximum(r.getMaxPointDistance()), this._densifyFrac > 0) {
            var i = new Gf(e, this._densifyFrac);
            t.apply(i), n.setMaximum(i.getMaxPointDistance())
        }
    }, Df.prototype.orientedDistance = function () {
        return this.computeOrientedDistance(this._g0, this._g1, this._ptDist), this._ptDist.getDistance()
    }, Df.prototype.interfaces_ = function () {
        return []
    }, Df.prototype.getClass = function () {
        return Df
    }, Df.distance = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = new Df(t, e);
            return n.distance()
        }
        if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2], s = new Df(r, i);
            return s.setDensifyFraction(o), s.distance()
        }
    }, Ff.MaxPointDistanceFilter.get = function () {
        return kf
    }, Ff.MaxDensifiedByFractionDistanceFilter.get = function () {
        return Gf
    }, Object.defineProperties(Df, Ff);
    var kf = function () {
        this._maxPtDist = new Tf, this._minPtDist = new Tf, this._euclideanDist = new Af, this._geom = null;
        var t = arguments[0];
        this._geom = t
    };
    kf.prototype.filter = function (t) {
        this._minPtDist.initialize(), Af.computeDistance(this._geom, t, this._minPtDist), this._maxPtDist.setMaximum(this._minPtDist)
    }, kf.prototype.getMaxPointDistance = function () {
        return this._maxPtDist
    }, kf.prototype.interfaces_ = function () {
        return [Zl]
    }, kf.prototype.getClass = function () {
        return kf
    };
    var Gf = function () {
        this._maxPtDist = new Tf, this._minPtDist = new Tf, this._geom = null, this._numSubSegs = 0;
        var t = arguments[0], e = arguments[1];
        this._geom = t, this._numSubSegs = Math.trunc(Math.round(1 / e))
    };
    Gf.prototype.filter = function (t, e) {
        var n = this;
        if (0 === e) return null;
        for (var r = t.getCoordinate(e - 1), i = t.getCoordinate(e), o = (i.x - r.x) / this._numSubSegs, s = (i.y - r.y) / this._numSubSegs, a = 0; a < this._numSubSegs; a++) {
            var u = r.x + a * o, l = r.y + a * s, c = new al(u, l);
            n._minPtDist.initialize(), Af.computeDistance(n._geom, c, n._minPtDist), n._maxPtDist.setMaximum(n._minPtDist)
        }
    }, Gf.prototype.isDone = function () {
        return !1
    }, Gf.prototype.isGeometryChanged = function () {
        return !1
    }, Gf.prototype.getMaxPointDistance = function () {
        return this._maxPtDist
    }, Gf.prototype.interfaces_ = function () {
        return [Dc]
    }, Gf.prototype.getClass = function () {
        return Gf
    };
    var qf = function (t, e, n) {
        this._minValidDistance = null, this._maxValidDistance = null, this._minDistanceFound = null, this._maxDistanceFound = null, this._isValid = !0, this._errMsg = null, this._errorLocation = null, this._errorIndicator = null, this._input = t || null, this._bufDistance = e || null, this._result = n || null
    }, Bf = {VERBOSE: {configurable: !0}, MAX_DISTANCE_DIFF_FRAC: {configurable: !0}};
    qf.prototype.checkMaximumDistance = function (t, e, n) {
        var r = new Df(e, t);
        if (r.setDensifyFraction(.25), this._maxDistanceFound = r.orientedDistance(), this._maxDistanceFound > n) {
            this._isValid = !1;
            var i = r.getCoordinates();
            this._errorLocation = i[1], this._errorIndicator = t.getFactory().createLineString(i), this._errMsg = "Distance between buffer curve and input is too large (" + this._maxDistanceFound + " at " + Dl.toLineString(i[0], i[1]) + ")"
        }
    }, qf.prototype.isValid = function () {
        var t = Math.abs(this._bufDistance), e = qf.MAX_DISTANCE_DIFF_FRAC * t;
        return this._minValidDistance = t - e, this._maxValidDistance = t + e, !(!this._input.isEmpty() && !this._result.isEmpty()) || (this._bufDistance > 0 ? this.checkPositiveValid() : this.checkNegativeValid(), qf.VERBOSE && Cl.out.println("Min Dist= " + this._minDistanceFound + "  err= " + (1 - this._minDistanceFound / this._bufDistance) + "  Max Dist= " + this._maxDistanceFound + "  err= " + (this._maxDistanceFound / this._bufDistance - 1)), this._isValid)
    }, qf.prototype.checkNegativeValid = function () {
        if (!(this._input instanceof $c || this._input instanceof nh || this._input instanceof Fc)) return null;
        var t = this.getPolygonLines(this._input);
        if (this.checkMinimumDistance(t, this._result, this._minValidDistance), !this._isValid) return null;
        this.checkMaximumDistance(t, this._result, this._maxValidDistance)
    }, qf.prototype.getErrorIndicator = function () {
        return this._errorIndicator
    }, qf.prototype.checkMinimumDistance = function (t, e, n) {
        var r = new Rf(t, e, n);
        if (this._minDistanceFound = r.distance(), this._minDistanceFound < n) {
            this._isValid = !1;
            var i = r.nearestPoints();
            this._errorLocation = r.nearestPoints()[1], this._errorIndicator = t.getFactory().createLineString(i), this._errMsg = "Distance between buffer curve and input is too small (" + this._minDistanceFound + " at " + Dl.toLineString(i[0], i[1]) + " )"
        }
    }, qf.prototype.checkPositiveValid = function () {
        var t = this._result.getBoundary();
        if (this.checkMinimumDistance(this._input, t, this._minValidDistance), !this._isValid) return null;
        this.checkMaximumDistance(this._input, t, this._maxValidDistance)
    }, qf.prototype.getErrorLocation = function () {
        return this._errorLocation
    }, qf.prototype.getPolygonLines = function (t) {
        for (var e = new uc, n = new Sf(e), r = Nf.getPolygons(t).iterator(); r.hasNext();) {
            r.next().apply(n)
        }
        return t.getFactory().buildGeometry(e)
    }, qf.prototype.getErrorMessage = function () {
        return this._errMsg
    }, qf.prototype.interfaces_ = function () {
        return []
    }, qf.prototype.getClass = function () {
        return qf
    }, Bf.VERBOSE.get = function () {
        return !1
    }, Bf.MAX_DISTANCE_DIFF_FRAC.get = function () {
        return .012
    }, Object.defineProperties(qf, Bf);
    var zf = function (t, e, n) {
        this._isValid = !0, this._errorMsg = null, this._errorLocation = null, this._errorIndicator = null, this._input = t || null, this._distance = e || null, this._result = n || null
    }, jf = {VERBOSE: {configurable: !0}, MAX_ENV_DIFF_FRAC: {configurable: !0}};
    zf.prototype.isValid = function () {
        return this.checkPolygonal(), this._isValid ? (this.checkExpectedEmpty(), this._isValid ? (this.checkEnvelope(), this._isValid ? (this.checkArea(), this._isValid ? (this.checkDistance(), this._isValid) : this._isValid) : this._isValid) : this._isValid) : this._isValid
    }, zf.prototype.checkEnvelope = function () {
        if (this._distance < 0) return null;
        var t = this._distance * zf.MAX_ENV_DIFF_FRAC;
        0 === t && (t = .001);
        var e = new Ll(this._input.getEnvelopeInternal());
        e.expandBy(this._distance);
        var n = new Ll(this._result.getEnvelopeInternal());
        n.expandBy(t), n.contains(e) || (this._isValid = !1, this._errorMsg = "Buffer envelope is incorrect", this._errorIndicator = this._input.getFactory().toGeometry(n)), this.report("Envelope")
    }, zf.prototype.checkDistance = function () {
        var t = new qf(this._input, this._distance, this._result);
        t.isValid() || (this._isValid = !1, this._errorMsg = t.getErrorMessage(), this._errorLocation = t.getErrorLocation(), this._errorIndicator = t.getErrorIndicator()), this.report("Distance")
    }, zf.prototype.checkArea = function () {
        var t = this._input.getArea(), e = this._result.getArea();
        this._distance > 0 && t > e && (this._isValid = !1, this._errorMsg = "Area of positive buffer is smaller than input", this._errorIndicator = this._result), this._distance < 0 && t < e && (this._isValid = !1, this._errorMsg = "Area of negative buffer is larger than input", this._errorIndicator = this._result), this.report("Area")
    }, zf.prototype.checkPolygonal = function () {
        this._result instanceof $c || this._result instanceof nh || (this._isValid = !1), this._errorMsg = "Result is not polygonal", this._errorIndicator = this._result, this.report("Polygonal")
    }, zf.prototype.getErrorIndicator = function () {
        return this._errorIndicator
    }, zf.prototype.getErrorLocation = function () {
        return this._errorLocation
    }, zf.prototype.checkExpectedEmpty = function () {
        return this._input.getDimension() >= 2 || this._distance > 0 ? null : (this._result.isEmpty() || (this._isValid = !1, this._errorMsg = "Result is non-empty", this._errorIndicator = this._result), void this.report("ExpectedEmpty"))
    }, zf.prototype.report = function (t) {
        if (!zf.VERBOSE) return null;
        Cl.out.println("Check " + t + ": " + (this._isValid ? "passed" : "FAILED"))
    }, zf.prototype.getErrorMessage = function () {
        return this._errorMsg
    }, zf.prototype.interfaces_ = function () {
        return []
    }, zf.prototype.getClass = function () {
        return zf
    }, zf.isValidMsg = function (t, e, n) {
        var r = new zf(t, e, n);
        return r.isValid() ? null : r.getErrorMessage()
    }, zf.isValid = function (t, e, n) {
        return !!new zf(t, e, n).isValid()
    }, jf.VERBOSE.get = function () {
        return !1
    }, jf.MAX_ENV_DIFF_FRAC.get = function () {
        return .012
    }, Object.defineProperties(zf, jf);
    var Uf = function () {
        this._pts = null, this._data = null;
        var t = arguments[0], e = arguments[1];
        this._pts = t, this._data = e
    };
    Uf.prototype.getCoordinates = function () {
        return this._pts
    }, Uf.prototype.size = function () {
        return this._pts.length
    }, Uf.prototype.getCoordinate = function (t) {
        return this._pts[t]
    }, Uf.prototype.isClosed = function () {
        return this._pts[0].equals(this._pts[this._pts.length - 1])
    }, Uf.prototype.getSegmentOctant = function (t) {
        return t === this._pts.length - 1 ? -1 : pp.octant(this.getCoordinate(t), this.getCoordinate(t + 1))
    }, Uf.prototype.setData = function (t) {
        this._data = t
    }, Uf.prototype.getData = function () {
        return this._data
    }, Uf.prototype.toString = function () {
        return Dl.toLineString(new uh(this._pts))
    }, Uf.prototype.interfaces_ = function () {
        return [fp]
    }, Uf.prototype.getClass = function () {
        return Uf
    };
    var Vf = function () {
        this._findAllIntersections = !1, this._isCheckEndSegmentsOnly = !1, this._li = null, this._interiorIntersection = null, this._intSegments = null, this._intersections = new uc, this._intersectionCount = 0, this._keepIntersections = !0;
        var t = arguments[0];
        this._li = t, this._interiorIntersection = null
    };
    Vf.prototype.getInteriorIntersection = function () {
        return this._interiorIntersection
    }, Vf.prototype.setCheckEndSegmentsOnly = function (t) {
        this._isCheckEndSegmentsOnly = t
    }, Vf.prototype.getIntersectionSegments = function () {
        return this._intSegments
    }, Vf.prototype.count = function () {
        return this._intersectionCount
    }, Vf.prototype.getIntersections = function () {
        return this._intersections
    }, Vf.prototype.setFindAllIntersections = function (t) {
        this._findAllIntersections = t
    }, Vf.prototype.setKeepIntersections = function (t) {
        this._keepIntersections = t
    }, Vf.prototype.processIntersections = function (t, e, n, r) {
        if (!this._findAllIntersections && this.hasIntersection()) return null;
        if (t === n && e === r) return null;
        if (this._isCheckEndSegmentsOnly && !(this.isEndSegment(t, e) || this.isEndSegment(n, r))) return null;
        var i = t.getCoordinates()[e], o = t.getCoordinates()[e + 1], s = n.getCoordinates()[r],
            a = n.getCoordinates()[r + 1];
        this._li.computeIntersection(i, o, s, a), this._li.hasIntersection() && this._li.isInteriorIntersection() && (this._intSegments = new Array(4).fill(null), this._intSegments[0] = i, this._intSegments[1] = o, this._intSegments[2] = s, this._intSegments[3] = a, this._interiorIntersection = this._li.getIntersection(0), this._keepIntersections && this._intersections.add(this._interiorIntersection), this._intersectionCount++)
    }, Vf.prototype.isEndSegment = function (t, e) {
        return 0 === e || e >= t.size() - 2
    }, Vf.prototype.hasIntersection = function () {
        return null !== this._interiorIntersection
    }, Vf.prototype.isDone = function () {
        return !this._findAllIntersections && null !== this._interiorIntersection
    }, Vf.prototype.interfaces_ = function () {
        return [Jp]
    }, Vf.prototype.getClass = function () {
        return Vf
    }, Vf.createAllIntersectionsFinder = function (t) {
        var e = new Vf(t);
        return e.setFindAllIntersections(!0), e
    }, Vf.createAnyIntersectionFinder = function (t) {
        return new Vf(t)
    }, Vf.createIntersectionCounter = function (t) {
        var e = new Vf(t);
        return e.setFindAllIntersections(!0), e.setKeepIntersections(!1), e
    };
    var Xf = function () {
        this._li = new zl, this._segStrings = null, this._findAllIntersections = !1, this._segInt = null, this._isValid = !0;
        var t = arguments[0];
        this._segStrings = t
    };
    Xf.prototype.execute = function () {
        if (null !== this._segInt) return null;
        this.checkInteriorIntersections()
    }, Xf.prototype.getIntersections = function () {
        return this._segInt.getIntersections()
    }, Xf.prototype.isValid = function () {
        return this.execute(), this._isValid
    }, Xf.prototype.setFindAllIntersections = function (t) {
        this._findAllIntersections = t
    }, Xf.prototype.checkInteriorIntersections = function () {
        this._isValid = !0, this._segInt = new Vf(this._li), this._segInt.setFindAllIntersections(this._findAllIntersections);
        var t = new wp;
        if (t.setSegmentIntersector(this._segInt), t.computeNodes(this._segStrings), this._segInt.hasIntersection()) return this._isValid = !1, null
    }, Xf.prototype.checkValid = function () {
        if (this.execute(), !this._isValid) throw new Mh(this.getErrorMessage(), this._segInt.getInteriorIntersection())
    }, Xf.prototype.getErrorMessage = function () {
        if (this._isValid) return "no intersections found";
        var t = this._segInt.getIntersectionSegments();
        return "found non-noded intersection between " + Dl.toLineString(t[0], t[1]) + " and " + Dl.toLineString(t[2], t[3])
    }, Xf.prototype.interfaces_ = function () {
        return []
    }, Xf.prototype.getClass = function () {
        return Xf
    }, Xf.computeIntersections = function (t) {
        var e = new Xf(t);
        return e.setFindAllIntersections(!0), e.isValid(), e.getIntersections()
    };
    var Yf = function t() {
        this._nv = null;
        var e = arguments[0];
        this._nv = new Xf(t.toSegmentStrings(e))
    };
    Yf.prototype.checkValid = function () {
        this._nv.checkValid()
    }, Yf.prototype.interfaces_ = function () {
        return []
    }, Yf.prototype.getClass = function () {
        return Yf
    }, Yf.toSegmentStrings = function (t) {
        for (var e = new uc, n = t.iterator(); n.hasNext();) {
            var r = n.next();
            e.add(new Uf(r.getCoordinates(), r))
        }
        return e
    }, Yf.checkValid = function (t) {
        new Yf(t).checkValid()
    };
    var Hf = function (t) {
        this._mapOp = t
    };
    Hf.prototype.map = function (t) {
        for (var e = new uc, n = 0; n < t.getNumGeometries(); n++) {
            var r = this._mapOp.map(t.getGeometryN(n));
            r.isEmpty() || e.add(r)
        }
        return t.getFactory().createGeometryCollection(vh.toGeometryArray(e))
    }, Hf.prototype.interfaces_ = function () {
        return []
    }, Hf.prototype.getClass = function () {
        return Hf
    }, Hf.map = function (t, e) {
        return new Hf(e).map(t)
    };
    var Wf = function () {
        this._op = null, this._geometryFactory = null, this._ptLocator = null, this._lineEdgesList = new uc, this._resultLineList = new uc;
        var t = arguments[0], e = arguments[1], n = arguments[2];
        this._op = t, this._geometryFactory = e, this._ptLocator = n
    };
    Wf.prototype.collectLines = function (t) {
        for (var e = this, n = this._op.getGraph().getEdgeEnds().iterator(); n.hasNext();) {
            var r = n.next();
            e.collectLineEdge(r, t, e._lineEdgesList), e.collectBoundaryTouchEdge(r, t, e._lineEdgesList)
        }
    }, Wf.prototype.labelIsolatedLine = function (t, e) {
        var n = this._ptLocator.locate(t.getCoordinate(), this._op.getArgGeometry(e));
        t.getLabel().setLocation(e, n)
    }, Wf.prototype.build = function (t) {
        return this.findCoveredLineEdges(), this.collectLines(t), this.buildLines(t), this._resultLineList
    }, Wf.prototype.collectLineEdge = function (t, e, n) {
        var r = t.getLabel(), i = t.getEdge();
        t.isLineEdge() && (t.isVisited() || !Pg.isResultOfOp(r, e) || i.isCovered() || (n.add(i), t.setVisitedEdge(!0)))
    }, Wf.prototype.findCoveredLineEdges = function () {
        for (var t = this._op.getGraph().getNodes().iterator(); t.hasNext();) {
            t.next().getEdges().findCoveredLineEdges()
        }
        for (var e = this._op.getGraph().getEdgeEnds().iterator(); e.hasNext();) {
            var n = e.next(), r = n.getEdge();
            if (n.isLineEdge() && !r.isCoveredSet()) {
                var i = this._op.isCoveredByA(n.getCoordinate());
                r.setCovered(i)
            }
        }
    }, Wf.prototype.labelIsolatedLines = function (t) {
        for (var e = t.iterator(); e.hasNext();) {
            var n = e.next(), r = n.getLabel();
            n.isIsolated() && (r.isNull(0) ? this.labelIsolatedLine(n, 0) : this.labelIsolatedLine(n, 1))
        }
    }, Wf.prototype.buildLines = function (t) {
        for (var e = this._lineEdgesList.iterator(); e.hasNext();) {
            var n = e.next(), r = this._geometryFactory.createLineString(n.getCoordinates());
            this._resultLineList.add(r), n.setInResult(!0)
        }
    }, Wf.prototype.collectBoundaryTouchEdge = function (t, e, n) {
        var r = t.getLabel();
        return t.isLineEdge() || t.isVisited() || t.isInteriorAreaEdge() || t.getEdge().isInResult() ? null : (Gl.isTrue(!(t.isInResult() || t.getSym().isInResult()) || !t.getEdge().isInResult()), void (Pg.isResultOfOp(r, e) && e === Pg.INTERSECTION && (n.add(t.getEdge()), t.setVisitedEdge(!0))))
    }, Wf.prototype.interfaces_ = function () {
        return []
    }, Wf.prototype.getClass = function () {
        return Wf
    };
    var Jf = function () {
        this._op = null, this._geometryFactory = null, this._resultPointList = new uc;
        var t = arguments[0], e = arguments[1];
        this._op = t, this._geometryFactory = e
    };
    Jf.prototype.filterCoveredNodeToPoint = function (t) {
        var e = t.getCoordinate();
        if (!this._op.isCoveredByLA(e)) {
            var n = this._geometryFactory.createPoint(e);
            this._resultPointList.add(n)
        }
    }, Jf.prototype.extractNonCoveredResultNodes = function (t) {
        for (var e = this._op.getGraph().getNodes().iterator(); e.hasNext();) {
            var n = e.next();
            if (!n.isInResult() && (!n.isIncidentEdgeInResult() && (0 === n.getEdges().getDegree() || t === Pg.INTERSECTION))) {
                var r = n.getLabel();
                Pg.isResultOfOp(r, t) && this.filterCoveredNodeToPoint(n)
            }
        }
    }, Jf.prototype.build = function (t) {
        return this.extractNonCoveredResultNodes(t), this._resultPointList
    }, Jf.prototype.interfaces_ = function () {
        return []
    }, Jf.prototype.getClass = function () {
        return Jf
    };
    var Zf = function () {
        this._inputGeom = null, this._factory = null, this._pruneEmptyGeometry = !0, this._preserveGeometryCollectionType = !0, this._preserveCollections = !1, this._preserveType = !1
    };
    Zf.prototype.transformPoint = function (t, e) {
        return this._factory.createPoint(this.transformCoordinates(t.getCoordinateSequence(), t))
    }, Zf.prototype.transformPolygon = function (t, e) {
        var n = !0, r = this.transformLinearRing(t.getExteriorRing(), t);
        null !== r && r instanceof eh && !r.isEmpty() || (n = !1);
        for (var i = new uc, o = 0; o < t.getNumInteriorRing(); o++) {
            var s = this.transformLinearRing(t.getInteriorRingN(o), t);
            null === s || s.isEmpty() || (s instanceof eh || (n = !1), i.add(s))
        }
        if (n) return this._factory.createPolygon(r, i.toArray([]));
        var a = new uc;
        return null !== r && a.add(r), a.addAll(i), this._factory.buildGeometry(a)
    }, Zf.prototype.createCoordinateSequence = function (t) {
        return this._factory.getCoordinateSequenceFactory().create(t)
    }, Zf.prototype.getInputGeometry = function () {
        return this._inputGeom
    }, Zf.prototype.transformMultiLineString = function (t, e) {
        for (var n = new uc, r = 0; r < t.getNumGeometries(); r++) {
            var i = this.transformLineString(t.getGeometryN(r), t);
            null !== i && (i.isEmpty() || n.add(i))
        }
        return this._factory.buildGeometry(n)
    }, Zf.prototype.transformCoordinates = function (t, e) {
        return this.copy(t)
    }, Zf.prototype.transformLineString = function (t, e) {
        return this._factory.createLineString(this.transformCoordinates(t.getCoordinateSequence(), t))
    }, Zf.prototype.transformMultiPoint = function (t, e) {
        for (var n = new uc, r = 0; r < t.getNumGeometries(); r++) {
            var i = this.transformPoint(t.getGeometryN(r), t);
            null !== i && (i.isEmpty() || n.add(i))
        }
        return this._factory.buildGeometry(n)
    }, Zf.prototype.transformMultiPolygon = function (t, e) {
        for (var n = new uc, r = 0; r < t.getNumGeometries(); r++) {
            var i = this.transformPolygon(t.getGeometryN(r), t);
            null !== i && (i.isEmpty() || n.add(i))
        }
        return this._factory.buildGeometry(n)
    }, Zf.prototype.copy = function (t) {
        return t.copy()
    }, Zf.prototype.transformGeometryCollection = function (t, e) {
        for (var n = new uc, r = 0; r < t.getNumGeometries(); r++) {
            var i = this.transform(t.getGeometryN(r));
            null !== i && (this._pruneEmptyGeometry && i.isEmpty() || n.add(i))
        }
        return this._preserveGeometryCollectionType ? this._factory.createGeometryCollection(vh.toGeometryArray(n)) : this._factory.buildGeometry(n)
    }, Zf.prototype.transform = function (t) {
        if (this._inputGeom = t, this._factory = t.getFactory(), t instanceof Kc) return this.transformPoint(t, null);
        if (t instanceof th) return this.transformMultiPoint(t, null);
        if (t instanceof eh) return this.transformLinearRing(t, null);
        if (t instanceof Jc) return this.transformLineString(t, null);
        if (t instanceof kc) return this.transformMultiLineString(t, null);
        if (t instanceof $c) return this.transformPolygon(t, null);
        if (t instanceof nh) return this.transformMultiPolygon(t, null);
        if (t instanceof Fc) return this.transformGeometryCollection(t, null);
        throw new tl("Unknown Geometry subtype: " + t.getClass().getName())
    }, Zf.prototype.transformLinearRing = function (t, e) {
        var n = this.transformCoordinates(t.getCoordinateSequence(), t);
        if (null === n) return this._factory.createLinearRing(null);
        var r = n.size();
        return r > 0 && r < 4 && !this._preserveType ? this._factory.createLineString(n) : this._factory.createLinearRing(n)
    }, Zf.prototype.interfaces_ = function () {
        return []
    }, Zf.prototype.getClass = function () {
        return Zf
    };
    var Kf = function t() {
        if (this._snapTolerance = 0, this._srcPts = null, this._seg = new yp, this._allowSnappingToSourceVertices = !1, this._isClosed = !1, arguments[0] instanceof Jc && "number" == typeof arguments[1]) {
            var e = arguments[0], n = arguments[1];
            t.call(this, e.getCoordinates(), n)
        } else if (arguments[0] instanceof Array && "number" == typeof arguments[1]) {
            var r = arguments[0], i = arguments[1];
            this._srcPts = r, this._isClosed = t.isClosed(r), this._snapTolerance = i
        }
    };
    Kf.prototype.snapVertices = function (t, e) {
        for (var n = this._isClosed ? t.size() - 1 : t.size(), r = 0; r < n; r++) {
            var i = t.get(r), o = this.findSnapForVertex(i, e);
            null !== o && (t.set(r, new al(o)), 0 === r && this._isClosed && t.set(t.size() - 1, new al(o)))
        }
    }, Kf.prototype.findSnapForVertex = function (t, e) {
        for (var n = 0; n < e.length; n++) {
            if (t.equals2D(e[n])) return null;
            if (t.distance(e[n]) < this._snapTolerance) return e[n]
        }
        return null
    }, Kf.prototype.snapTo = function (t) {
        var e = new cc(this._srcPts);
        return this.snapVertices(e, t), this.snapSegments(e, t), e.toCoordinateArray()
    }, Kf.prototype.snapSegments = function (t, e) {
        if (0 === e.length) return null;
        var n = e.length;
        e[0].equals2D(e[e.length - 1]) && (n = e.length - 1);
        for (var r = 0; r < n; r++) {
            var i = e[r], o = this.findSegmentIndexToSnap(i, t);
            o >= 0 && t.add(o + 1, new al(i), !1)
        }
    }, Kf.prototype.findSegmentIndexToSnap = function (t, e) {
        for (var n = this, r = el.MAX_VALUE, i = -1, o = 0; o < e.size() - 1; o++) {
            if (n._seg.p0 = e.get(o), n._seg.p1 = e.get(o + 1), n._seg.p0.equals2D(t) || n._seg.p1.equals2D(t)) {
                if (n._allowSnappingToSourceVertices) continue;
                return -1
            }
            var s = n._seg.distance(t);
            s < n._snapTolerance && s < r && (r = s, i = o)
        }
        return i
    }, Kf.prototype.setAllowSnappingToSourceVertices = function (t) {
        this._allowSnappingToSourceVertices = t
    }, Kf.prototype.interfaces_ = function () {
        return []
    }, Kf.prototype.getClass = function () {
        return Kf
    }, Kf.isClosed = function (t) {
        return !(t.length <= 1) && t[0].equals2D(t[t.length - 1])
    };
    var Qf = function (t) {
        this._srcGeom = t || null
    }, $f = {SNAP_PRECISION_FACTOR: {configurable: !0}};
    Qf.prototype.snapTo = function (t, e) {
        var n = this.extractTargetCoordinates(t);
        return new tg(e, n).transform(this._srcGeom)
    }, Qf.prototype.snapToSelf = function (t, e) {
        var n = this.extractTargetCoordinates(this._srcGeom), r = new tg(t, n, !0).transform(this._srcGeom), i = r;
        return e && fl(i, Qc) && (i = r.buffer(0)), i
    }, Qf.prototype.computeSnapTolerance = function (t) {
        return this.computeMinimumSegmentLength(t) / 10
    }, Qf.prototype.extractTargetCoordinates = function (t) {
        for (var e = new Lc, n = t.getCoordinates(), r = 0; r < n.length; r++) e.add(n[r]);
        return e.toArray(new Array(0).fill(null))
    }, Qf.prototype.computeMinimumSegmentLength = function (t) {
        for (var e = el.MAX_VALUE, n = 0; n < t.length - 1; n++) {
            var r = t[n].distance(t[n + 1]);
            r < e && (e = r)
        }
        return e
    }, Qf.prototype.interfaces_ = function () {
        return []
    }, Qf.prototype.getClass = function () {
        return Qf
    }, Qf.snap = function (t, e, n) {
        var r = new Array(2).fill(null), i = new Qf(t);
        r[0] = i.snapTo(e, n);
        var o = new Qf(e);
        return r[1] = o.snapTo(r[0], n), r
    }, Qf.computeOverlaySnapTolerance = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = Qf.computeSizeBasedSnapTolerance(t), n = t.getPrecisionModel();
            if (n.getType() === fh.FIXED) {
                var r = 1 / n.getScale() * 2 / 1.415;
                r > e && (e = r)
            }
            return e
        }
        if (2 === arguments.length) {
            var i = arguments[0], o = arguments[1];
            return Math.min(Qf.computeOverlaySnapTolerance(i), Qf.computeOverlaySnapTolerance(o))
        }
    }, Qf.computeSizeBasedSnapTolerance = function (t) {
        var e = t.getEnvelopeInternal();
        return Math.min(e.getHeight(), e.getWidth()) * Qf.SNAP_PRECISION_FACTOR
    }, Qf.snapToSelf = function (t, e, n) {
        return new Qf(t).snapToSelf(e, n)
    }, $f.SNAP_PRECISION_FACTOR.get = function () {
        return 1e-9
    }, Object.defineProperties(Qf, $f);
    var tg = function (t) {
        function e(e, n, r) {
            t.call(this), this._snapTolerance = e || null, this._snapPts = n || null, this._isSelfSnap = void 0 !== r && r
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.snapLine = function (t, e) {
            var n = new Kf(t, this._snapTolerance);
            return n.setAllowSnappingToSourceVertices(this._isSelfSnap), n.snapTo(e)
        }, e.prototype.transformCoordinates = function (t, e) {
            var n = t.toCoordinateArray(), r = this.snapLine(n, this._snapPts);
            return this._factory.getCoordinateSequenceFactory().create(r)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Zf), eg = function () {
        this._isFirst = !0, this._commonMantissaBitsCount = 53, this._commonBits = 0, this._commonSignExp = null
    };
    eg.prototype.getCommon = function () {
        return el.longBitsToDouble(this._commonBits)
    }, eg.prototype.add = function (t) {
        var e = el.doubleToLongBits(t);
        return this._isFirst ? (this._commonBits = e, this._commonSignExp = eg.signExpBits(this._commonBits), this._isFirst = !1, null) : eg.signExpBits(e) !== this._commonSignExp ? (this._commonBits = 0, null) : (this._commonMantissaBitsCount = eg.numCommonMostSigMantissaBits(this._commonBits, e), void (this._commonBits = eg.zeroLowerBits(this._commonBits, 64 - (12 + this._commonMantissaBitsCount))))
    }, eg.prototype.toString = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = el.longBitsToDouble(t), n = el.toBinaryString(t),
                r = "0000000000000000000000000000000000000000000000000000000000000000" + n,
                i = r.substring(r.length - 64),
                o = i.substring(0, 1) + "  " + i.substring(1, 12) + "(exp) " + i.substring(12) + " [ " + e + " ]";
            return o
        }
    }, eg.prototype.interfaces_ = function () {
        return []
    }, eg.prototype.getClass = function () {
        return eg
    }, eg.getBit = function (t, e) {
        return 0 != (t & 1 << e) ? 1 : 0
    }, eg.signExpBits = function (t) {
        return t >> 52
    }, eg.zeroLowerBits = function (t, e) {
        return t & ~((1 << e) - 1)
    }, eg.numCommonMostSigMantissaBits = function (t, e) {
        for (var n = 0, r = 52; r >= 0; r--) {
            if (eg.getBit(t, r) !== eg.getBit(e, r)) return n;
            n++
        }
        return 52
    };
    var ng = function () {
        this._commonCoord = null, this._ccFilter = new ig
    }, rg = {CommonCoordinateFilter: {configurable: !0}, Translater: {configurable: !0}};
    ng.prototype.addCommonBits = function (t) {
        var e = new og(this._commonCoord);
        t.apply(e), t.geometryChanged()
    }, ng.prototype.removeCommonBits = function (t) {
        if (0 === this._commonCoord.x && 0 === this._commonCoord.y) return t;
        var e = new al(this._commonCoord);
        e.x = -e.x, e.y = -e.y;
        var n = new og(e);
        return t.apply(n), t.geometryChanged(), t
    }, ng.prototype.getCommonCoordinate = function () {
        return this._commonCoord
    }, ng.prototype.add = function (t) {
        t.apply(this._ccFilter), this._commonCoord = this._ccFilter.getCommonCoordinate()
    }, ng.prototype.interfaces_ = function () {
        return []
    }, ng.prototype.getClass = function () {
        return ng
    }, rg.CommonCoordinateFilter.get = function () {
        return ig
    }, rg.Translater.get = function () {
        return og
    }, Object.defineProperties(ng, rg);
    var ig = function () {
        this._commonBitsX = new eg, this._commonBitsY = new eg
    };
    ig.prototype.filter = function (t) {
        this._commonBitsX.add(t.x), this._commonBitsY.add(t.y)
    }, ig.prototype.getCommonCoordinate = function () {
        return new al(this._commonBitsX.getCommon(), this._commonBitsY.getCommon())
    }, ig.prototype.interfaces_ = function () {
        return [Zl]
    }, ig.prototype.getClass = function () {
        return ig
    };
    var og = function () {
        this.trans = null;
        var t = arguments[0];
        this.trans = t
    };
    og.prototype.filter = function (t, e) {
        var n = t.getOrdinate(e, 0) + this.trans.x, r = t.getOrdinate(e, 1) + this.trans.y;
        t.setOrdinate(e, 0, n), t.setOrdinate(e, 1, r)
    }, og.prototype.isDone = function () {
        return !1
    }, og.prototype.isGeometryChanged = function () {
        return !0
    }, og.prototype.interfaces_ = function () {
        return [Dc]
    }, og.prototype.getClass = function () {
        return og
    };
    var sg = function (t, e) {
        this._geom = new Array(2).fill(null), this._snapTolerance = null, this._cbr = null, this._geom[0] = t, this._geom[1] = e, this.computeSnapTolerance()
    };
    sg.prototype.selfSnap = function (t) {
        return new Qf(t).snapTo(t, this._snapTolerance)
    }, sg.prototype.removeCommonBits = function (t) {
        this._cbr = new ng, this._cbr.add(t[0]), this._cbr.add(t[1]);
        var e = new Array(2).fill(null);
        return e[0] = this._cbr.removeCommonBits(t[0].copy()), e[1] = this._cbr.removeCommonBits(t[1].copy()), e
    }, sg.prototype.prepareResult = function (t) {
        return this._cbr.addCommonBits(t), t
    }, sg.prototype.getResultGeometry = function (t) {
        var e = this.snap(this._geom), n = Pg.overlayOp(e[0], e[1], t);
        return this.prepareResult(n)
    }, sg.prototype.checkValid = function (t) {
        t.isValid() || Cl.out.println("Snapped geometry is invalid")
    }, sg.prototype.computeSnapTolerance = function () {
        this._snapTolerance = Qf.computeOverlaySnapTolerance(this._geom[0], this._geom[1])
    }, sg.prototype.snap = function (t) {
        var e = this.removeCommonBits(t);
        return Qf.snap(e[0], e[1], this._snapTolerance)
    }, sg.prototype.interfaces_ = function () {
        return []
    }, sg.prototype.getClass = function () {
        return sg
    }, sg.overlayOp = function (t, e, n) {
        return new sg(t, e).getResultGeometry(n)
    }, sg.union = function (t, e) {
        return sg.overlayOp(t, e, Pg.UNION)
    }, sg.intersection = function (t, e) {
        return sg.overlayOp(t, e, Pg.INTERSECTION)
    }, sg.symDifference = function (t, e) {
        return sg.overlayOp(t, e, Pg.SYMDIFFERENCE)
    }, sg.difference = function (t, e) {
        return sg.overlayOp(t, e, Pg.DIFFERENCE)
    };
    var ag = function (t, e) {
        this._geom = new Array(2).fill(null), this._geom[0] = t, this._geom[1] = e
    };
    ag.prototype.getResultGeometry = function (t) {
        var e = null, n = !1, r = null;
        try {
            e = Pg.overlayOp(this._geom[0], this._geom[1], t);
            n = !0
        } catch (t) {
            if (!(t instanceof Fl)) throw t;
            r = t
        }
        if (!n) try {
            e = sg.overlayOp(this._geom[0], this._geom[1], t)
        } catch (t) {
            throw t instanceof Fl ? r : t
        }
        return e
    }, ag.prototype.interfaces_ = function () {
        return []
    }, ag.prototype.getClass = function () {
        return ag
    }, ag.overlayOp = function (t, e, n) {
        return new ag(t, e).getResultGeometry(n)
    }, ag.union = function (t, e) {
        return ag.overlayOp(t, e, Pg.UNION)
    }, ag.intersection = function (t, e) {
        return ag.overlayOp(t, e, Pg.INTERSECTION)
    }, ag.symDifference = function (t, e) {
        return ag.overlayOp(t, e, Pg.SYMDIFFERENCE)
    }, ag.difference = function (t, e) {
        return ag.overlayOp(t, e, Pg.DIFFERENCE)
    };
    var ug = function () {
        this.mce = null, this.chainIndex = null;
        var t = arguments[0], e = arguments[1];
        this.mce = t, this.chainIndex = e
    };
    ug.prototype.computeIntersections = function (t, e) {
        this.mce.computeIntersectsForChain(this.chainIndex, t.mce, t.chainIndex, e)
    }, ug.prototype.interfaces_ = function () {
        return []
    }, ug.prototype.getClass = function () {
        return ug
    };
    var lg = function t() {
        if (this._label = null, this._xValue = null, this._eventType = null, this._insertEvent = null, this._deleteEventIndex = null, this._obj = null, 2 === arguments.length) {
            var e = arguments[0], n = arguments[1];
            this._eventType = t.DELETE, this._xValue = e, this._insertEvent = n
        } else if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2];
            this._eventType = t.INSERT, this._label = r, this._xValue = i, this._obj = o
        }
    }, cg = {INSERT: {configurable: !0}, DELETE: {configurable: !0}};
    lg.prototype.isDelete = function () {
        return this._eventType === lg.DELETE
    }, lg.prototype.setDeleteEventIndex = function (t) {
        this._deleteEventIndex = t
    }, lg.prototype.getObject = function () {
        return this._obj
    }, lg.prototype.compareTo = function (t) {
        var e = t;
        return this._xValue < e._xValue ? -1 : this._xValue > e._xValue ? 1 : this._eventType < e._eventType ? -1 : this._eventType > e._eventType ? 1 : 0
    }, lg.prototype.getInsertEvent = function () {
        return this._insertEvent
    }, lg.prototype.isInsert = function () {
        return this._eventType === lg.INSERT
    }, lg.prototype.isSameLabel = function (t) {
        return null !== this._label && this._label === t._label
    }, lg.prototype.getDeleteEventIndex = function () {
        return this._deleteEventIndex
    }, lg.prototype.interfaces_ = function () {
        return [rl]
    }, lg.prototype.getClass = function () {
        return lg
    }, cg.INSERT.get = function () {
        return 1
    }, cg.DELETE.get = function () {
        return 2
    }, Object.defineProperties(lg, cg);
    var hg = function () {
    };
    hg.prototype.interfaces_ = function () {
        return []
    }, hg.prototype.getClass = function () {
        return hg
    };
    var pg = function () {
        this._hasIntersection = !1, this._hasProper = !1, this._hasProperInterior = !1, this._properIntersectionPoint = null, this._li = null, this._includeProper = null, this._recordIsolated = null, this._isSelfIntersection = null, this._numIntersections = 0, this.numTests = 0, this._bdyNodes = null, this._isDone = !1, this._isDoneWhenProperInt = !1;
        var t = arguments[0], e = arguments[1], n = arguments[2];
        this._li = t, this._includeProper = e, this._recordIsolated = n
    };
    pg.prototype.isTrivialIntersection = function (t, e, n, r) {
        if (t === n && 1 === this._li.getIntersectionNum()) {
            if (pg.isAdjacentSegments(e, r)) return !0;
            if (t.isClosed()) {
                var i = t.getNumPoints() - 1;
                if (0 === e && r === i || 0 === r && e === i) return !0
            }
        }
        return !1
    }, pg.prototype.getProperIntersectionPoint = function () {
        return this._properIntersectionPoint
    }, pg.prototype.setIsDoneIfProperInt = function (t) {
        this._isDoneWhenProperInt = t
    }, pg.prototype.hasProperInteriorIntersection = function () {
        return this._hasProperInterior
    }, pg.prototype.isBoundaryPointInternal = function (t, e) {
        for (var n = e.iterator(); n.hasNext();) {
            var r = n.next().getCoordinate();
            if (t.isIntersection(r)) return !0
        }
        return !1
    }, pg.prototype.hasProperIntersection = function () {
        return this._hasProper
    }, pg.prototype.hasIntersection = function () {
        return this._hasIntersection
    }, pg.prototype.isDone = function () {
        return this._isDone
    }, pg.prototype.isBoundaryPoint = function (t, e) {
        return null !== e && (!!this.isBoundaryPointInternal(t, e[0]) || !!this.isBoundaryPointInternal(t, e[1]))
    }, pg.prototype.setBoundaryNodes = function (t, e) {
        this._bdyNodes = new Array(2).fill(null), this._bdyNodes[0] = t, this._bdyNodes[1] = e
    }, pg.prototype.addIntersections = function (t, e, n, r) {
        if (t === n && e === r) return null;
        this.numTests++;
        var i = t.getCoordinates()[e], o = t.getCoordinates()[e + 1], s = n.getCoordinates()[r],
            a = n.getCoordinates()[r + 1];
        this._li.computeIntersection(i, o, s, a), this._li.hasIntersection() && (this._recordIsolated && (t.setIsolated(!1), n.setIsolated(!1)), this._numIntersections++, this.isTrivialIntersection(t, e, n, r) || (this._hasIntersection = !0, !this._includeProper && this._li.isProper() || (t.addIntersections(this._li, e, 0), n.addIntersections(this._li, r, 1)), this._li.isProper() && (this._properIntersectionPoint = this._li.getIntersection(0).copy(), this._hasProper = !0, this._isDoneWhenProperInt && (this._isDone = !0), this.isBoundaryPoint(this._li, this._bdyNodes) || (this._hasProperInterior = !0))))
    }, pg.prototype.interfaces_ = function () {
        return []
    }, pg.prototype.getClass = function () {
        return pg
    }, pg.isAdjacentSegments = function (t, e) {
        return 1 === Math.abs(t - e)
    };
    var fg = function (t) {
        function e() {
            t.call(this), this.events = new uc, this.nOverlaps = null
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.prepareEvents = function () {
            ep.sort(this.events);
            for (var t = 0; t < this.events.size(); t++) {
                var e = this.events.get(t);
                e.isDelete() && e.getInsertEvent().setDeleteEventIndex(t)
            }
        }, e.prototype.computeIntersections = function () {
            var t = this;
            if (1 === arguments.length) {
                var e = arguments[0];
                this.nOverlaps = 0, this.prepareEvents();
                for (var n = 0; n < this.events.size(); n++) {
                    var r = t.events.get(n);
                    if (r.isInsert() && t.processOverlaps(n, r.getDeleteEventIndex(), r, e), e.isDone()) break
                }
            } else if (3 === arguments.length) if (arguments[2] instanceof pg && fl(arguments[0], sc) && fl(arguments[1], sc)) {
                var i = arguments[0], o = arguments[1], s = arguments[2];
                this.addEdges(i, i), this.addEdges(o, o), this.computeIntersections(s)
            } else if ("boolean" == typeof arguments[2] && fl(arguments[0], sc) && arguments[1] instanceof pg) {
                var a = arguments[0], u = arguments[1], l = arguments[2];
                l ? this.addEdges(a, null) : this.addEdges(a), this.computeIntersections(u)
            }
        }, e.prototype.addEdge = function (t, e) {
            for (var n = t.getMonotoneChainEdge(), r = n.getStartIndexes(), i = 0; i < r.length - 1; i++) {
                var o = new ug(n, i), s = new lg(e, n.getMinX(i), o);
                this.events.add(s), this.events.add(new lg(n.getMaxX(i), s))
            }
        }, e.prototype.processOverlaps = function (t, e, n, r) {
            for (var i = n.getObject(), o = t; o < e; o++) {
                var s = this.events.get(o);
                if (s.isInsert()) {
                    var a = s.getObject();
                    n.isSameLabel(s) || (i.computeIntersections(a, r), this.nOverlaps++)
                }
            }
        }, e.prototype.addEdges = function () {
            var t = this;
            if (1 === arguments.length) for (var e = arguments[0], n = e.iterator(); n.hasNext();) {
                var r = n.next();
                t.addEdge(r, r)
            } else if (2 === arguments.length) for (var i = arguments[0], o = arguments[1], s = i.iterator(); s.hasNext();) {
                var a = s.next();
                t.addEdge(a, o)
            }
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(hg), gg = function () {
        this._min = el.POSITIVE_INFINITY, this._max = el.NEGATIVE_INFINITY
    }, dg = {NodeComparator: {configurable: !0}};
    gg.prototype.getMin = function () {
        return this._min
    }, gg.prototype.intersects = function (t, e) {
        return !(this._min > e || this._max < t)
    }, gg.prototype.getMax = function () {
        return this._max
    }, gg.prototype.toString = function () {
        return Dl.toLineString(new al(this._min, 0), new al(this._max, 0))
    }, gg.prototype.interfaces_ = function () {
        return []
    }, gg.prototype.getClass = function () {
        return gg
    }, dg.NodeComparator.get = function () {
        return yg
    }, Object.defineProperties(gg, dg);
    var yg = function () {
    };
    yg.prototype.compare = function (t, e) {
        var n = t, r = e, i = (n._min + n._max) / 2, o = (r._min + r._max) / 2;
        return i < o ? -1 : i > o ? 1 : 0
    }, yg.prototype.interfaces_ = function () {
        return [ol]
    }, yg.prototype.getClass = function () {
        return yg
    };
    var vg = function (t) {
        function e() {
            t.call(this), this._item = null;
            var e = arguments[0], n = arguments[1], r = arguments[2];
            this._min = e, this._max = n, this._item = r
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.query = function (t, e, n) {
            if (!this.intersects(t, e)) return null;
            n.visitItem(this._item)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(gg), _g = function (t) {
        function e() {
            t.call(this), this._node1 = null, this._node2 = null;
            var e = arguments[0], n = arguments[1];
            this._node1 = e, this._node2 = n, this.buildExtent(this._node1, this._node2)
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.buildExtent = function (t, e) {
            this._min = Math.min(t._min, e._min), this._max = Math.max(t._max, e._max)
        }, e.prototype.query = function (t, e, n) {
            if (!this.intersects(t, e)) return null;
            null !== this._node1 && this._node1.query(t, e, n), null !== this._node2 && this._node2.query(t, e, n)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(gg), mg = function () {
        this._leaves = new uc, this._root = null, this._level = 0
    };
    mg.prototype.buildTree = function () {
        ep.sort(this._leaves, new gg.NodeComparator);
        for (var t = this._leaves, e = null, n = new uc; ;) {
            if (this.buildLevel(t, n), 1 === n.size()) return n.get(0);
            e = t, t = n, n = e
        }
    }, mg.prototype.insert = function (t, e, n) {
        if (null !== this._root) throw new Error("Index cannot be added to once it has been queried");
        this._leaves.add(new vg(t, e, n))
    }, mg.prototype.query = function (t, e, n) {
        this.init(), this._root.query(t, e, n)
    }, mg.prototype.buildRoot = function () {
        if (null !== this._root) return null;
        this._root = this.buildTree()
    }, mg.prototype.printNode = function (t) {
        Cl.out.println(Dl.toLineString(new al(t._min, this._level), new al(t._max, this._level)))
    }, mg.prototype.init = function () {
        if (null !== this._root) return null;
        this.buildRoot()
    }, mg.prototype.buildLevel = function (t, e) {
        this._level++, e.clear();
        for (var n = 0; n < t.size(); n += 2) {
            var r = t.get(n);
            if (null === (n + 1 < t.size() ? t.get(n) : null)) e.add(r); else {
                var i = new _g(t.get(n), t.get(n + 1));
                e.add(i)
            }
        }
    }, mg.prototype.interfaces_ = function () {
        return []
    }, mg.prototype.getClass = function () {
        return mg
    };
    var xg = function () {
        this._items = new uc
    };
    xg.prototype.visitItem = function (t) {
        this._items.add(t)
    }, xg.prototype.getItems = function () {
        return this._items
    }, xg.prototype.interfaces_ = function () {
        return [Kh]
    }, xg.prototype.getClass = function () {
        return xg
    };
    var Eg = function () {
        this._index = null;
        var t = arguments[0];
        if (!fl(t, Qc)) throw new tl("Argument must be Polygonal");
        this._index = new Ig(t)
    }, bg = {SegmentVisitor: {configurable: !0}, IntervalIndexedGeometry: {configurable: !0}};
    Eg.prototype.locate = function (t) {
        var e = new Ul(t), n = new wg(e);
        return this._index.query(t.y, t.y, n), e.getLocation()
    }, Eg.prototype.interfaces_ = function () {
        return [zp]
    }, Eg.prototype.getClass = function () {
        return Eg
    }, bg.SegmentVisitor.get = function () {
        return wg
    }, bg.IntervalIndexedGeometry.get = function () {
        return Ig
    }, Object.defineProperties(Eg, bg);
    var wg = function () {
        this._counter = null;
        var t = arguments[0];
        this._counter = t
    };
    wg.prototype.visitItem = function (t) {
        var e = t;
        this._counter.countSegment(e.getCoordinate(0), e.getCoordinate(1))
    }, wg.prototype.interfaces_ = function () {
        return [Kh]
    }, wg.prototype.getClass = function () {
        return wg
    };
    var Ig = function () {
        this._index = new mg;
        var t = arguments[0];
        this.init(t)
    };
    Ig.prototype.init = function (t) {
        for (var e = Sf.getLines(t).iterator(); e.hasNext();) {
            var n = e.next().getCoordinates();
            this.addLine(n)
        }
    }, Ig.prototype.addLine = function (t) {
        for (var e = 1; e < t.length; e++) {
            var n = new yp(t[e - 1], t[e]), r = Math.min(n.p0.y, n.p1.y), i = Math.max(n.p0.y, n.p1.y);
            this._index.insert(r, i, n)
        }
    }, Ig.prototype.query = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = new xg;
            return this._index.query(t, e, n), n.getItems()
        }
        if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2];
            this._index.query(r, i, o)
        }
    }, Ig.prototype.interfaces_ = function () {
        return []
    }, Ig.prototype.getClass = function () {
        return Ig
    };
    var Ng = function (t) {
        function e() {
            if (t.call(this), this._parentGeom = null, this._lineEdgeMap = new ph, this._boundaryNodeRule = null, this._useBoundaryDeterminationRule = !0, this._argIndex = null, this._boundaryNodes = null, this._hasTooFewPoints = !1, this._invalidPoint = null, this._areaPtLocator = null, this._ptLocator = new Cf, 2 === arguments.length) {
                var e = arguments[0], n = arguments[1], r = Kl.OGC_SFS_BOUNDARY_RULE;
                this._argIndex = e, this._parentGeom = n, this._boundaryNodeRule = r, null !== n && this.add(n)
            } else if (3 === arguments.length) {
                var i = arguments[0], o = arguments[1], s = arguments[2];
                this._argIndex = i, this._parentGeom = o, this._boundaryNodeRule = s, null !== o && this.add(o)
            }
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.insertBoundaryPoint = function (t, n) {
            var r = this._nodes.addNode(n).getLabel(), i = 1;
            r.getLocation(t, Nh.ON) === hl.BOUNDARY && i++;
            var o = e.determineBoundary(this._boundaryNodeRule, i);
            r.setLocation(t, o)
        }, e.prototype.computeSelfNodes = function () {
            if (2 === arguments.length) {
                var t = arguments[0], e = arguments[1];
                return this.computeSelfNodes(t, e, !1)
            }
            if (3 === arguments.length) {
                var n = arguments[0], r = arguments[1], i = arguments[2], o = new pg(n, !0, !1);
                o.setIsDoneIfProperInt(i);
                var s = this.createEdgeSetIntersector(),
                    a = this._parentGeom instanceof eh || this._parentGeom instanceof $c || this._parentGeom instanceof nh,
                    u = r || !a;
                return s.computeIntersections(this._edges, o, u), this.addSelfIntersectionNodes(this._argIndex), o
            }
        }, e.prototype.computeSplitEdges = function (t) {
            for (var e = this._edges.iterator(); e.hasNext();) {
                e.next().eiList.addSplitEdges(t)
            }
        }, e.prototype.computeEdgeIntersections = function (t, e, n) {
            var r = new pg(e, n, !0);
            return r.setBoundaryNodes(this.getBoundaryNodes(), t.getBoundaryNodes()), this.createEdgeSetIntersector().computeIntersections(this._edges, t._edges, r), r
        }, e.prototype.getGeometry = function () {
            return this._parentGeom
        }, e.prototype.getBoundaryNodeRule = function () {
            return this._boundaryNodeRule
        }, e.prototype.hasTooFewPoints = function () {
            return this._hasTooFewPoints
        }, e.prototype.addPoint = function () {
            if (arguments[0] instanceof Kc) {
                var t = arguments[0], e = t.getCoordinate();
                this.insertPoint(this._argIndex, e, hl.INTERIOR)
            } else if (arguments[0] instanceof al) {
                var n = arguments[0];
                this.insertPoint(this._argIndex, n, hl.INTERIOR)
            }
        }, e.prototype.addPolygon = function (t) {
            this.addPolygonRing(t.getExteriorRing(), hl.EXTERIOR, hl.INTERIOR);
            for (var e = 0; e < t.getNumInteriorRing(); e++) {
                var n = t.getInteriorRingN(e);
                this.addPolygonRing(n, hl.INTERIOR, hl.EXTERIOR)
            }
        }, e.prototype.addEdge = function (t) {
            this.insertEdge(t);
            var e = t.getCoordinates();
            this.insertPoint(this._argIndex, e[0], hl.BOUNDARY), this.insertPoint(this._argIndex, e[e.length - 1], hl.BOUNDARY)
        }, e.prototype.addLineString = function (t) {
            var e = hc.removeRepeatedPoints(t.getCoordinates());
            if (e.length < 2) return this._hasTooFewPoints = !0, this._invalidPoint = e[0], null;
            var n = new rf(e, new Ah(this._argIndex, hl.INTERIOR));
            this._lineEdgeMap.put(t, n), this.insertEdge(n), Gl.isTrue(e.length >= 2, "found LineString with single point"), this.insertBoundaryPoint(this._argIndex, e[0]), this.insertBoundaryPoint(this._argIndex, e[e.length - 1])
        }, e.prototype.getInvalidPoint = function () {
            return this._invalidPoint
        }, e.prototype.getBoundaryPoints = function () {
            for (var t = this.getBoundaryNodes(), e = new Array(t.size()).fill(null), n = 0, r = t.iterator(); r.hasNext();) {
                var i = r.next();
                e[n++] = i.getCoordinate().copy()
            }
            return e
        }, e.prototype.getBoundaryNodes = function () {
            return null === this._boundaryNodes && (this._boundaryNodes = this._nodes.getBoundaryNodes(this._argIndex)), this._boundaryNodes
        }, e.prototype.addSelfIntersectionNode = function (t, e, n) {
            if (this.isBoundaryNode(t, e)) return null;
            n === hl.BOUNDARY && this._useBoundaryDeterminationRule ? this.insertBoundaryPoint(t, e) : this.insertPoint(t, e, n)
        }, e.prototype.addPolygonRing = function (t, e, n) {
            if (t.isEmpty()) return null;
            var r = hc.removeRepeatedPoints(t.getCoordinates());
            if (r.length < 4) return this._hasTooFewPoints = !0, this._invalidPoint = r[0], null;
            var i = e, o = n;
            Vl.isCCW(r) && (i = n, o = e);
            var s = new rf(r, new Ah(this._argIndex, hl.BOUNDARY, i, o));
            this._lineEdgeMap.put(t, s), this.insertEdge(s), this.insertPoint(this._argIndex, r[0], hl.BOUNDARY)
        }, e.prototype.insertPoint = function (t, e, n) {
            var r = this._nodes.addNode(e), i = r.getLabel();
            null === i ? r._label = new Ah(t, n) : i.setLocation(t, n)
        }, e.prototype.createEdgeSetIntersector = function () {
            return new fg
        }, e.prototype.addSelfIntersectionNodes = function (t) {
            for (var e = this._edges.iterator(); e.hasNext();) for (var n = e.next(), r = n.getLabel().getLocation(t), i = n.eiList.iterator(); i.hasNext();) {
                var o = i.next();
                this.addSelfIntersectionNode(t, o.coord, r)
            }
        }, e.prototype.add = function () {
            if (1 !== arguments.length) return t.prototype.add.apply(this, arguments);
            var e = arguments[0];
            if (e.isEmpty()) return null;
            if (e instanceof nh && (this._useBoundaryDeterminationRule = !1), e instanceof $c) this.addPolygon(e); else if (e instanceof Jc) this.addLineString(e); else if (e instanceof Kc) this.addPoint(e); else if (e instanceof th) this.addCollection(e); else if (e instanceof kc) this.addCollection(e); else if (e instanceof nh) this.addCollection(e); else {
                if (!(e instanceof Fc)) throw new Error(e.getClass().getName());
                this.addCollection(e)
            }
        }, e.prototype.addCollection = function (t) {
            for (var e = 0; e < t.getNumGeometries(); e++) {
                var n = t.getGeometryN(e);
                this.add(n)
            }
        }, e.prototype.locate = function (t) {
            return fl(this._parentGeom, Qc) && this._parentGeom.getNumGeometries() > 50 ? (null === this._areaPtLocator && (this._areaPtLocator = new Eg(this._parentGeom)), this._areaPtLocator.locate(t)) : this._ptLocator.locate(t, this._parentGeom)
        }, e.prototype.findEdge = function () {
            if (1 === arguments.length) {
                var e = arguments[0];
                return this._lineEdgeMap.get(e)
            }
            return t.prototype.findEdge.apply(this, arguments)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e.determineBoundary = function (t, e) {
            return t.isInBoundary(e) ? hl.BOUNDARY : hl.INTERIOR
        }, e
    }(Yh), Sg = function () {
        if (this._li = new zl, this._resultPrecisionModel = null, this._arg = null, 1 === arguments.length) {
            var t = arguments[0];
            this.setComputationPrecision(t.getPrecisionModel()), this._arg = new Array(1).fill(null), this._arg[0] = new Ng(0, t)
        } else if (2 === arguments.length) {
            var e = arguments[0], n = arguments[1], r = Kl.OGC_SFS_BOUNDARY_RULE;
            e.getPrecisionModel().compareTo(n.getPrecisionModel()) >= 0 ? this.setComputationPrecision(e.getPrecisionModel()) : this.setComputationPrecision(n.getPrecisionModel()), this._arg = new Array(2).fill(null), this._arg[0] = new Ng(0, e, r), this._arg[1] = new Ng(1, n, r)
        } else if (3 === arguments.length) {
            var i = arguments[0], o = arguments[1], s = arguments[2];
            i.getPrecisionModel().compareTo(o.getPrecisionModel()) >= 0 ? this.setComputationPrecision(i.getPrecisionModel()) : this.setComputationPrecision(o.getPrecisionModel()), this._arg = new Array(2).fill(null), this._arg[0] = new Ng(0, i, s), this._arg[1] = new Ng(1, o, s)
        }
    };
    Sg.prototype.getArgGeometry = function (t) {
        return this._arg[t].getGeometry()
    }, Sg.prototype.setComputationPrecision = function (t) {
        this._resultPrecisionModel = t, this._li.setPrecisionModel(this._resultPrecisionModel)
    }, Sg.prototype.interfaces_ = function () {
        return []
    }, Sg.prototype.getClass = function () {
        return Sg
    };
    var Cg = function () {
    };
    Cg.prototype.interfaces_ = function () {
        return []
    }, Cg.prototype.getClass = function () {
        return Cg
    }, Cg.map = function () {
        if (arguments[0] instanceof Hl && fl(arguments[1], Cg.MapOp)) {
            for (var t = arguments[0], e = arguments[1], n = new uc, r = 0; r < t.getNumGeometries(); r++) {
                var i = e.map(t.getGeometryN(r));
                null !== i && n.add(i)
            }
            return t.getFactory().buildGeometry(n)
        }
        if (fl(arguments[0], rc) && fl(arguments[1], Cg.MapOp)) {
            for (var o = arguments[0], s = arguments[1], a = new uc, u = o.iterator(); u.hasNext();) {
                var l = u.next(), c = s.map(l);
                null !== c && a.add(c)
            }
            return a
        }
    }, Cg.MapOp = function () {
    };
    var Pg = function (t) {
        function e() {
            var e = arguments[0], n = arguments[1];
            t.call(this, e, n), this._ptLocator = new Cf, this._geomFact = null, this._resultGeom = null, this._graph = null, this._edgeList = new Wp, this._resultPolyList = new uc, this._resultLineList = new uc, this._resultPointList = new uc, this._graph = new Yh(new Yp), this._geomFact = e.getFactory()
        }

        return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.insertUniqueEdge = function (t) {
            var e = this._edgeList.findEqualEdge(t);
            if (null !== e) {
                var n = e.getLabel(), r = t.getLabel();
                e.isPointwiseEqual(t) || (r = new Ah(t.getLabel())).flip();
                var i = e.getDepth();
                i.isNull() && i.add(n), i.add(r), n.merge(r)
            } else this._edgeList.add(t)
        }, e.prototype.getGraph = function () {
            return this._graph
        }, e.prototype.cancelDuplicateResultEdges = function () {
            for (var t = this._graph.getEdgeEnds().iterator(); t.hasNext();) {
                var e = t.next(), n = e.getSym();
                e.isInResult() && n.isInResult() && (e.setInResult(!1), n.setInResult(!1))
            }
        }, e.prototype.isCoveredByLA = function (t) {
            return !!this.isCovered(t, this._resultLineList) || !!this.isCovered(t, this._resultPolyList)
        }, e.prototype.computeGeometry = function (t, n, r, i) {
            var o = new uc;
            return o.addAll(t), o.addAll(n), o.addAll(r), o.isEmpty() ? e.createEmptyResult(i, this._arg[0].getGeometry(), this._arg[1].getGeometry(), this._geomFact) : this._geomFact.buildGeometry(o)
        }, e.prototype.mergeSymLabels = function () {
            for (var t = this._graph.getNodes().iterator(); t.hasNext();) {
                t.next().getEdges().mergeSymLabels()
            }
        }, e.prototype.isCovered = function (t, e) {
            for (var n = e.iterator(); n.hasNext();) {
                var r = n.next();
                if (this._ptLocator.locate(t, r) !== hl.EXTERIOR) return !0
            }
            return !1
        }, e.prototype.replaceCollapsedEdges = function () {
            for (var t = new uc, e = this._edgeList.iterator(); e.hasNext();) {
                var n = e.next();
                n.isCollapsed() && (e.remove(), t.add(n.getCollapsedEdge()))
            }
            this._edgeList.addAll(t)
        }, e.prototype.updateNodeLabelling = function () {
            for (var t = this._graph.getNodes().iterator(); t.hasNext();) {
                var e = t.next(), n = e.getEdges().getLabel();
                e.getLabel().merge(n)
            }
        }, e.prototype.getResultGeometry = function (t) {
            return this.computeOverlay(t), this._resultGeom
        }, e.prototype.insertUniqueEdges = function (t) {
            for (var e = t.iterator(); e.hasNext();) {
                var n = e.next();
                this.insertUniqueEdge(n)
            }
        }, e.prototype.computeOverlay = function (t) {
            this.copyPoints(0), this.copyPoints(1), this._arg[0].computeSelfNodes(this._li, !1), this._arg[1].computeSelfNodes(this._li, !1), this._arg[0].computeEdgeIntersections(this._arg[1], this._li, !0);
            var e = new uc;
            this._arg[0].computeSplitEdges(e), this._arg[1].computeSplitEdges(e), this.insertUniqueEdges(e), this.computeLabelsFromDepths(), this.replaceCollapsedEdges(), Yf.checkValid(this._edgeList.getEdges()), this._graph.addEdges(this._edgeList.getEdges()), this.computeLabelling(), this.labelIncompleteNodes(), this.findResultAreaEdges(t), this.cancelDuplicateResultEdges();
            var n = new Hh(this._geomFact);
            n.add(this._graph), this._resultPolyList = n.getPolygons();
            var r = new Wf(this, this._geomFact, this._ptLocator);
            this._resultLineList = r.build(t);
            var i = new Jf(this, this._geomFact, this._ptLocator);
            this._resultPointList = i.build(t), this._resultGeom = this.computeGeometry(this._resultPointList, this._resultLineList, this._resultPolyList, t)
        }, e.prototype.labelIncompleteNode = function (t, e) {
            var n = this._ptLocator.locate(t.getCoordinate(), this._arg[e].getGeometry());
            t.getLabel().setLocation(e, n)
        }, e.prototype.copyPoints = function (t) {
            for (var e = this._arg[t].getNodeIterator(); e.hasNext();) {
                var n = e.next();
                this._graph.addNode(n.getCoordinate()).setLabel(t, n.getLabel().getLocation(t))
            }
        }, e.prototype.findResultAreaEdges = function (t) {
            for (var n = this._graph.getEdgeEnds().iterator(); n.hasNext();) {
                var r = n.next(), i = r.getLabel();
                i.isArea() && !r.isInteriorAreaEdge() && e.isResultOfOp(i.getLocation(0, Nh.RIGHT), i.getLocation(1, Nh.RIGHT), t) && r.setInResult(!0)
            }
        }, e.prototype.computeLabelsFromDepths = function () {
            for (var t = this._edgeList.iterator(); t.hasNext();) {
                var e = t.next(), n = e.getLabel(), r = e.getDepth();
                if (!r.isNull()) {
                    r.normalize();
                    for (var i = 0; i < 2; i++) n.isNull(i) || !n.isArea() || r.isNull(i) || (0 === r.getDelta(i) ? n.toLine(i) : (Gl.isTrue(!r.isNull(i, Nh.LEFT), "depth of LEFT side has not been initialized"), n.setLocation(i, Nh.LEFT, r.getLocation(i, Nh.LEFT)), Gl.isTrue(!r.isNull(i, Nh.RIGHT), "depth of RIGHT side has not been initialized"), n.setLocation(i, Nh.RIGHT, r.getLocation(i, Nh.RIGHT))))
                }
            }
        }, e.prototype.computeLabelling = function () {
            for (var t = this._graph.getNodes().iterator(); t.hasNext();) {
                t.next().getEdges().computeLabelling(this._arg)
            }
            this.mergeSymLabels(), this.updateNodeLabelling()
        }, e.prototype.labelIncompleteNodes = function () {
            for (var t = this._graph.getNodes().iterator(); t.hasNext();) {
                var e = t.next(), n = e.getLabel();
                e.isIsolated() && (n.isNull(0) ? this.labelIncompleteNode(e, 0) : this.labelIncompleteNode(e, 1)), e.getEdges().updateLabelling(n)
            }
        }, e.prototype.isCoveredByA = function (t) {
            return !!this.isCovered(t, this._resultPolyList)
        }, e.prototype.interfaces_ = function () {
            return []
        }, e.prototype.getClass = function () {
            return e
        }, e
    }(Sg);
    Pg.overlayOp = function (t, e, n) {
        return new Pg(t, e).getResultGeometry(n)
    }, Pg.intersection = function (t, e) {
        if (t.isEmpty() || e.isEmpty()) return Pg.createEmptyResult(Pg.INTERSECTION, t, e, t.getFactory());
        if (t.isGeometryCollection()) {
            var n = e;
            return Hf.map(t, {
                interfaces_: function () {
                    return [Cg.MapOp]
                }, map: function (t) {
                    return t.intersection(n)
                }
            })
        }
        return t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ag.overlayOp(t, e, Pg.INTERSECTION)
    }, Pg.symDifference = function (t, e) {
        if (t.isEmpty() || e.isEmpty()) {
            if (t.isEmpty() && e.isEmpty()) return Pg.createEmptyResult(Pg.SYMDIFFERENCE, t, e, t.getFactory());
            if (t.isEmpty()) return e.copy();
            if (e.isEmpty()) return t.copy()
        }
        return t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ag.overlayOp(t, e, Pg.SYMDIFFERENCE)
    }, Pg.resultDimension = function (t, e, n) {
        var r = e.getDimension(), i = n.getDimension(), o = -1;
        switch (t) {
            case Pg.INTERSECTION:
                o = Math.min(r, i);
                break;
            case Pg.UNION:
                o = Math.max(r, i);
                break;
            case Pg.DIFFERENCE:
                o = r;
                break;
            case Pg.SYMDIFFERENCE:
                o = Math.max(r, i)
        }
        return o
    }, Pg.createEmptyResult = function (t, e, n, r) {
        var i = null;
        switch (Pg.resultDimension(t, e, n)) {
            case-1:
                i = r.createGeometryCollection(new Array(0).fill(null));
                break;
            case 0:
                i = r.createPoint();
                break;
            case 1:
                i = r.createLineString();
                break;
            case 2:
                i = r.createPolygon()
        }
        return i
    }, Pg.difference = function (t, e) {
        return t.isEmpty() ? Pg.createEmptyResult(Pg.DIFFERENCE, t, e, t.getFactory()) : e.isEmpty() ? t.copy() : (t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ag.overlayOp(t, e, Pg.DIFFERENCE))
    }, Pg.isResultOfOp = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = t.getLocation(0), r = t.getLocation(1);
            return Pg.isResultOfOp(n, r, e)
        }
        if (3 === arguments.length) {
            var i = arguments[0], o = arguments[1], s = arguments[2];
            switch (i === hl.BOUNDARY && (i = hl.INTERIOR), o === hl.BOUNDARY && (o = hl.INTERIOR), s) {
                case Pg.INTERSECTION:
                    return i === hl.INTERIOR && o === hl.INTERIOR;
                case Pg.UNION:
                    return i === hl.INTERIOR || o === hl.INTERIOR;
                case Pg.DIFFERENCE:
                    return i === hl.INTERIOR && o !== hl.INTERIOR;
                case Pg.SYMDIFFERENCE:
                    return i === hl.INTERIOR && o !== hl.INTERIOR || i !== hl.INTERIOR && o === hl.INTERIOR
            }
            return !1
        }
    }, Pg.INTERSECTION = 1, Pg.UNION = 2, Pg.DIFFERENCE = 3, Pg.SYMDIFFERENCE = 4;
    var Lg = function () {
        this._g = null, this._boundaryDistanceTolerance = null, this._linework = null, this._ptLocator = new Cf, this._seg = new yp;
        var t = arguments[0], e = arguments[1];
        this._g = t, this._boundaryDistanceTolerance = e, this._linework = this.extractLinework(t)
    };
    Lg.prototype.isWithinToleranceOfBoundary = function (t) {
        for (var e = this, n = 0; n < this._linework.getNumGeometries(); n++) for (var r = e._linework.getGeometryN(n).getCoordinateSequence(), i = 0; i < r.size() - 1; i++) {
            if (r.getCoordinate(i, e._seg.p0), r.getCoordinate(i + 1, e._seg.p1), e._seg.distance(t) <= e._boundaryDistanceTolerance) return !0
        }
        return !1
    }, Lg.prototype.getLocation = function (t) {
        return this.isWithinToleranceOfBoundary(t) ? hl.BOUNDARY : this._ptLocator.locate(t, this._g)
    }, Lg.prototype.extractLinework = function (t) {
        var e = new Mg;
        t.apply(e);
        var n = e.getLinework(), r = vh.toLineStringArray(n);
        return t.getFactory().createMultiLineString(r)
    }, Lg.prototype.interfaces_ = function () {
        return []
    }, Lg.prototype.getClass = function () {
        return Lg
    };
    var Mg = function () {
        this._linework = null, this._linework = new uc
    };
    Mg.prototype.getLinework = function () {
        return this._linework
    }, Mg.prototype.filter = function (t) {
        if (t instanceof $c) {
            var e = t;
            this._linework.add(e.getExteriorRing());
            for (var n = 0; n < e.getNumInteriorRing(); n++) this._linework.add(e.getInteriorRingN(n))
        }
    }, Mg.prototype.interfaces_ = function () {
        return [Ac]
    }, Mg.prototype.getClass = function () {
        return Mg
    };
    var Og = function () {
        this._g = null, this._doLeft = !0, this._doRight = !0;
        var t = arguments[0];
        this._g = t
    };
    Og.prototype.extractPoints = function (t, e, n) {
        for (var r = t.getCoordinates(), i = 0; i < r.length - 1; i++) this.computeOffsetPoints(r[i], r[i + 1], e, n)
    }, Og.prototype.setSidesToGenerate = function (t, e) {
        this._doLeft = t, this._doRight = e
    }, Og.prototype.getPoints = function (t) {
        for (var e = new uc, n = Sf.getLines(this._g).iterator(); n.hasNext();) {
            var r = n.next();
            this.extractPoints(r, t, e)
        }
        return e
    }, Og.prototype.computeOffsetPoints = function (t, e, n, r) {
        var i = e.x - t.x, o = e.y - t.y, s = Math.sqrt(i * i + o * o), a = n * i / s, u = n * o / s,
            l = (e.x + t.x) / 2, c = (e.y + t.y) / 2;
        if (this._doLeft) {
            var h = new al(l - u, c + a);
            r.add(h)
        }
        if (this._doRight) {
            var p = new al(l + u, c - a);
            r.add(p)
        }
    }, Og.prototype.interfaces_ = function () {
        return []
    }, Og.prototype.getClass = function () {
        return Og
    };
    var Rg = function t() {
        this._geom = null, this._locFinder = null, this._location = new Array(3).fill(null), this._invalidLocation = null, this._boundaryDistanceTolerance = t.TOLERANCE, this._testCoords = new uc;
        var e = arguments[0], n = arguments[1], r = arguments[2];
        this._boundaryDistanceTolerance = t.computeBoundaryDistanceTolerance(e, n), this._geom = [e, n, r], this._locFinder = [new Lg(this._geom[0], this._boundaryDistanceTolerance), new Lg(this._geom[1], this._boundaryDistanceTolerance), new Lg(this._geom[2], this._boundaryDistanceTolerance)]
    }, Tg = {TOLERANCE: {configurable: !0}};
    Rg.prototype.reportResult = function (t, e, n) {
        Cl.out.println("Overlay result invalid - A:" + hl.toLocationSymbol(e[0]) + " B:" + hl.toLocationSymbol(e[1]) + " expected:" + (n ? "i" : "e") + " actual:" + hl.toLocationSymbol(e[2]))
    }, Rg.prototype.isValid = function (t) {
        this.addTestPts(this._geom[0]), this.addTestPts(this._geom[1]);
        var e = this.checkValid(t);
        return e
    }, Rg.prototype.checkValid = function () {
        var t = this;
        if (1 === arguments.length) {
            for (var e = arguments[0], n = 0; n < this._testCoords.size(); n++) {
                var r = t._testCoords.get(n);
                if (!t.checkValid(e, r)) return t._invalidLocation = r, !1
            }
            return !0
        }
        if (2 === arguments.length) {
            var i = arguments[0], o = arguments[1];
            return this._location[0] = this._locFinder[0].getLocation(o), this._location[1] = this._locFinder[1].getLocation(o), this._location[2] = this._locFinder[2].getLocation(o), !!Rg.hasLocation(this._location, hl.BOUNDARY) || this.isValidResult(i, this._location)
        }
    }, Rg.prototype.addTestPts = function (t) {
        var e = new Og(t);
        this._testCoords.addAll(e.getPoints(5 * this._boundaryDistanceTolerance))
    }, Rg.prototype.isValidResult = function (t, e) {
        var n = Pg.isResultOfOp(e[0], e[1], t), r = !(n ^ e[2] === hl.INTERIOR);
        return r || this.reportResult(t, e, n), r
    }, Rg.prototype.getInvalidLocation = function () {
        return this._invalidLocation
    }, Rg.prototype.interfaces_ = function () {
        return []
    }, Rg.prototype.getClass = function () {
        return Rg
    }, Rg.hasLocation = function (t, e) {
        for (var n = 0; n < 3; n++) if (t[n] === e) return !0;
        return !1
    }, Rg.computeBoundaryDistanceTolerance = function (t, e) {
        return Math.min(Qf.computeSizeBasedSnapTolerance(t), Qf.computeSizeBasedSnapTolerance(e))
    }, Rg.isValid = function (t, e, n, r) {
        return new Rg(t, e, r).isValid(n)
    }, Tg.TOLERANCE.get = function () {
        return 1e-6
    }, Object.defineProperties(Rg, Tg);
    var Ag = function t(e) {
        this._geomFactory = null, this._skipEmpty = !1, this._inputGeoms = null, this._geomFactory = t.extractFactory(e), this._inputGeoms = e
    };
    Ag.prototype.extractElements = function (t, e) {
        if (null === t) return null;
        for (var n = 0; n < t.getNumGeometries(); n++) {
            var r = t.getGeometryN(n);
            this._skipEmpty && r.isEmpty() || e.add(r)
        }
    }, Ag.prototype.combine = function () {
        for (var t = new uc, e = this._inputGeoms.iterator(); e.hasNext();) {
            var n = e.next();
            this.extractElements(n, t)
        }
        return 0 === t.size() ? null !== this._geomFactory ? this._geomFactory.createGeometryCollection(null) : null : this._geomFactory.buildGeometry(t)
    }, Ag.prototype.interfaces_ = function () {
        return []
    }, Ag.prototype.getClass = function () {
        return Ag
    }, Ag.combine = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = new Ag(t);
            return e.combine()
        }
        if (2 === arguments.length) {
            var n = arguments[0], r = arguments[1], i = new Ag(Ag.createList(n, r));
            return i.combine()
        }
        if (3 === arguments.length) {
            var o = arguments[0], s = arguments[1], a = arguments[2], u = new Ag(Ag.createList(o, s, a));
            return u.combine()
        }
    }, Ag.extractFactory = function (t) {
        return t.isEmpty() ? null : t.iterator().next().getFactory()
    }, Ag.createList = function () {
        if (2 === arguments.length) {
            var t = arguments[0], e = arguments[1], n = new uc;
            return n.add(t), n.add(e), n
        }
        if (3 === arguments.length) {
            var r = arguments[0], i = arguments[1], o = arguments[2], s = new uc;
            return s.add(r), s.add(i), s.add(o), s
        }
    };
    var Dg = function () {
        this._inputPolys = null, this._geomFactory = null;
        var t = arguments[0];
        this._inputPolys = t, null === this._inputPolys && (this._inputPolys = new uc)
    }, Fg = {STRTREE_NODE_CAPACITY: {configurable: !0}};
    Dg.prototype.reduceToGeometries = function (t) {
        for (var e = new uc, n = t.iterator(); n.hasNext();) {
            var r = n.next(), i = null;
            fl(r, sc) ? i = this.unionTree(r) : r instanceof Hl && (i = r), e.add(i)
        }
        return e
    }, Dg.prototype.extractByEnvelope = function (t, e, n) {
        for (var r = new uc, i = 0; i < e.getNumGeometries(); i++) {
            var o = e.getGeometryN(i);
            o.getEnvelopeInternal().intersects(t) ? r.add(o) : n.add(o)
        }
        return this._geomFactory.buildGeometry(r)
    }, Dg.prototype.unionOptimized = function (t, e) {
        var n = t.getEnvelopeInternal(), r = e.getEnvelopeInternal();
        if (!n.intersects(r)) return Ag.combine(t, e);
        if (t.getNumGeometries() <= 1 && e.getNumGeometries() <= 1) return this.unionActual(t, e);
        var i = n.intersection(r);
        return this.unionUsingEnvelopeIntersection(t, e, i)
    }, Dg.prototype.union = function () {
        if (null === this._inputPolys) throw new Error("union() method cannot be called twice");
        if (this._inputPolys.isEmpty()) return null;
        this._geomFactory = this._inputPolys.iterator().next().getFactory();
        for (var t = new ap(Dg.STRTREE_NODE_CAPACITY), e = this._inputPolys.iterator(); e.hasNext();) {
            var n = e.next();
            t.insert(n.getEnvelopeInternal(), n)
        }
        this._inputPolys = null;
        var r = t.itemsTree();
        return this.unionTree(r)
    }, Dg.prototype.binaryUnion = function () {
        if (1 === arguments.length) {
            var t = arguments[0];
            return this.binaryUnion(t, 0, t.size())
        }
        if (3 === arguments.length) {
            var e = arguments[0], n = arguments[1], r = arguments[2];
            if (r - n <= 1) {
                var i = Dg.getGeometry(e, n);
                return this.unionSafe(i, null)
            }
            if (r - n == 2) return this.unionSafe(Dg.getGeometry(e, n), Dg.getGeometry(e, n + 1));
            var o = Math.trunc((r + n) / 2), s = this.binaryUnion(e, n, o), a = this.binaryUnion(e, o, r);
            return this.unionSafe(s, a)
        }
    }, Dg.prototype.repeatedUnion = function (t) {
        for (var e = null, n = t.iterator(); n.hasNext();) {
            var r = n.next();
            e = null === e ? r.copy() : e.union(r)
        }
        return e
    }, Dg.prototype.unionSafe = function (t, e) {
        return null === t && null === e ? null : null === t ? e.copy() : null === e ? t.copy() : this.unionOptimized(t, e)
    }, Dg.prototype.unionActual = function (t, e) {
        return Dg.restrictToPolygons(t.union(e))
    }, Dg.prototype.unionTree = function (t) {
        var e = this.reduceToGeometries(t);
        return this.binaryUnion(e)
    }, Dg.prototype.unionUsingEnvelopeIntersection = function (t, e, n) {
        var r = new uc, i = this.extractByEnvelope(n, t, r), o = this.extractByEnvelope(n, e, r),
            s = this.unionActual(i, o);
        return r.add(s), Ag.combine(r)
    }, Dg.prototype.bufferUnion = function () {
        if (1 === arguments.length) {
            var t = arguments[0], e = t.get(0).getFactory(), n = e.buildGeometry(t), r = n.buffer(0);
            return r
        }
        if (2 === arguments.length) {
            var i = arguments[0], o = arguments[1], s = i.getFactory(), a = s.createGeometryCollection([i, o]),
                u = a.buffer(0);
            return u
        }
    }, Dg.prototype.interfaces_ = function () {
        return []
    }, Dg.prototype.getClass = function () {
        return Dg
    }, Dg.restrictToPolygons = function (t) {
        if (fl(t, Qc)) return t;
        var e = Nf.getPolygons(t);
        return 1 === e.size() ? e.get(0) : t.getFactory().createMultiPolygon(vh.toPolygonArray(e))
    }, Dg.getGeometry = function (t, e) {
        return e >= t.size() ? null : t.get(e)
    }, Dg.union = function (t) {
        return new Dg(t).union()
    }, Fg.STRTREE_NODE_CAPACITY.get = function () {
        return 4
    }, Object.defineProperties(Dg, Fg);
    var kg = function () {
    };

    function Gg() {
        return new qg
    }

    function qg() {
        this.reset()
    }

    kg.prototype.interfaces_ = function () {
        return []
    }, kg.prototype.getClass = function () {
        return kg
    }, kg.union = function (t, e) {
        if (t.isEmpty() || e.isEmpty()) {
            if (t.isEmpty() && e.isEmpty()) return Pg.createEmptyResult(Pg.UNION, t, e, t.getFactory());
            if (t.isEmpty()) return e.copy();
            if (e.isEmpty()) return t.copy()
        }
        return t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ag.overlayOp(t, e, Pg.UNION)
    }, qg.prototype = {
        constructor: qg, reset: function () {
            this.s = this.t = 0
        }, add: function (t) {
            zg(Bg, t, this.t), zg(this, Bg.s, this.s), this.s ? this.t += Bg.t : this.s = Bg.t
        }, valueOf: function () {
            return this.s
        }
    };
    var Bg = new qg;

    function zg(t, e, n) {
        var r = t.s = e + n, i = r - e, o = r - i;
        t.t = e - o + (n - i)
    }

    var jg = 1e-6, Ug = Math.PI, Vg = Ug / 2, Xg = Ug / 4, Yg = 2 * Ug, Hg = 180 / Ug, Wg = Ug / 180, Jg = Math.abs,
        Zg = Math.atan, Kg = Math.atan2, Qg = Math.cos, $g = Math.sin, td = Math.sqrt;

    function ed(t) {
        return t > 1 ? 0 : t < -1 ? Ug : Math.acos(t)
    }

    function nd(t) {
        return t > 1 ? Vg : t < -1 ? -Vg : Math.asin(t)
    }

    function rd() {
    }

    function id(t, e) {
        t && sd.hasOwnProperty(t.type) && sd[t.type](t, e)
    }

    var od = {
        Feature: function (t, e) {
            id(t.geometry, e)
        }, FeatureCollection: function (t, e) {
            for (var n = t.features, r = -1, i = n.length; ++r < i;) id(n[r].geometry, e)
        }
    }, sd = {
        Sphere: function (t, e) {
            e.sphere()
        }, Point: function (t, e) {
            t = t.coordinates, e.point(t[0], t[1], t[2])
        }, MultiPoint: function (t, e) {
            for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) t = n[r], e.point(t[0], t[1], t[2])
        }, LineString: function (t, e) {
            ad(t.coordinates, e, 0)
        }, MultiLineString: function (t, e) {
            for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) ad(n[r], e, 0)
        }, Polygon: function (t, e) {
            ud(t.coordinates, e)
        }, MultiPolygon: function (t, e) {
            for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) ud(n[r], e)
        }, GeometryCollection: function (t, e) {
            for (var n = t.geometries, r = -1, i = n.length; ++r < i;) id(n[r], e)
        }
    };

    function ad(t, e, n) {
        var r, i = -1, o = t.length - n;
        for (e.lineStart(); ++i < o;) r = t[i], e.point(r[0], r[1], r[2]);
        e.lineEnd()
    }

    function ud(t, e) {
        var n = -1, r = t.length;
        for (e.polygonStart(); ++n < r;) ad(t[n], e, 1);
        e.polygonEnd()
    }

    Gg(), Gg();

    function ld(t) {
        return [Kg(t[1], t[0]), nd(t[2])]
    }

    function cd(t) {
        var e = t[0], n = t[1], r = Qg(n);
        return [r * Qg(e), r * $g(e), $g(n)]
    }

    function hd(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    }

    function pd(t, e) {
        return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
    }

    function fd(t, e) {
        t[0] += e[0], t[1] += e[1], t[2] += e[2]
    }

    function gd(t, e) {
        return [t[0] * e, t[1] * e, t[2] * e]
    }

    function dd(t) {
        var e = td(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= e, t[1] /= e, t[2] /= e
    }

    Gg();

    function yd(t, e) {
        function n(n, r) {
            return n = t(n, r), e(n[0], n[1])
        }

        return t.invert && e.invert && (n.invert = function (n, r) {
            return (n = e.invert(n, r)) && t.invert(n[0], n[1])
        }), n
    }

    function vd(t, e) {
        return [t > Ug ? t - Yg : t < -Ug ? t + Yg : t, e]
    }

    function _d(t) {
        return function (e, n) {
            return [(e += t) > Ug ? e - Yg : e < -Ug ? e + Yg : e, n]
        }
    }

    function md(t) {
        var e = _d(t);
        return e.invert = _d(-t), e
    }

    function xd(t, e) {
        var n = Qg(t), r = $g(t), i = Qg(e), o = $g(e);

        function s(t, e) {
            var s = Qg(e), a = Qg(t) * s, u = $g(t) * s, l = $g(e), c = l * n + a * r;
            return [Kg(u * i - c * o, a * n - l * r), nd(c * i + u * o)]
        }

        return s.invert = function (t, e) {
            var s = Qg(e), a = Qg(t) * s, u = $g(t) * s, l = $g(e), c = l * i - u * o;
            return [Kg(u * i + l * o, a * n + c * r), nd(c * n - a * r)]
        }, s
    }

    function Ed(t, e) {
        (e = cd(e))[0] -= t, dd(e);
        var n = ed(-e[1]);
        return ((-e[2] < 0 ? -n : n) + Yg - jg) % Yg
    }

    function bd() {
        var t, e = [];
        return {
            point: function (e, n) {
                t.push([e, n])
            }, lineStart: function () {
                e.push(t = [])
            }, lineEnd: rd, rejoin: function () {
                e.length > 1 && e.push(e.pop().concat(e.shift()))
            }, result: function () {
                var n = e;
                return e = [], t = null, n
            }
        }
    }

    function wd(t, e) {
        return Jg(t[0] - e[0]) < jg && Jg(t[1] - e[1]) < jg
    }

    function Id(t, e, n, r) {
        this.x = t, this.z = e, this.o = n, this.e = r, this.v = !1, this.n = this.p = null
    }

    function Nd(t, e, n, r, i) {
        var o, s, a = [], u = [];
        if (t.forEach((function (t) {
            if (!((e = t.length - 1) <= 0)) {
                var e, n, r = t[0], s = t[e];
                if (wd(r, s)) {
                    for (i.lineStart(), o = 0; o < e; ++o) i.point((r = t[o])[0], r[1]);
                    i.lineEnd()
                } else a.push(n = new Id(r, t, null, !0)), u.push(n.o = new Id(r, null, n, !1)), a.push(n = new Id(s, t, null, !1)), u.push(n.o = new Id(s, null, n, !0))
            }
        })), a.length) {
            for (u.sort(e), Sd(a), Sd(u), o = 0, s = u.length; o < s; ++o) u[o].e = n = !n;
            for (var l, c, h = a[0]; ;) {
                for (var p = h, f = !0; p.v;) if ((p = p.n) === h) return;
                l = p.z, i.lineStart();
                do {
                    if (p.v = p.o.v = !0, p.e) {
                        if (f) for (o = 0, s = l.length; o < s; ++o) i.point((c = l[o])[0], c[1]); else r(p.x, p.n.x, 1, i);
                        p = p.n
                    } else {
                        if (f) for (l = p.p.z, o = l.length - 1; o >= 0; --o) i.point((c = l[o])[0], c[1]); else r(p.x, p.p.x, -1, i);
                        p = p.p
                    }
                    l = (p = p.o).z, f = !f
                } while (!p.v);
                i.lineEnd()
            }
        }
    }

    function Sd(t) {
        if (e = t.length) {
            for (var e, n, r = 0, i = t[0]; ++r < e;) i.n = n = t[r], n.p = i, i = n;
            i.n = n = t[0], n.p = i
        }
    }

    function Cd(t, e) {
        return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
    }

    vd.invert = vd;
    var Pd, Ld;
    1 === (Pd = Cd).length && (Ld = Pd, Pd = function (t, e) {
        return Cd(Ld(t), e)
    });

    function Md(t) {
        for (var e, n, r, i = t.length, o = -1, s = 0; ++o < i;) s += t[o].length;
        for (n = new Array(s); --i >= 0;) for (e = (r = t[i]).length; --e >= 0;) n[--s] = r[e];
        return n
    }

    var Od = 1e9, Rd = -Od;

    function Td(t, e, n, r) {
        function i(i, o) {
            return t <= i && i <= n && e <= o && o <= r
        }

        function o(i, o, a, l) {
            var c = 0, h = 0;
            if (null == i || (c = s(i, a)) !== (h = s(o, a)) || u(i, o) < 0 ^ a > 0) do {
                l.point(0 === c || 3 === c ? t : n, c > 1 ? r : e)
            } while ((c = (c + a + 4) % 4) !== h); else l.point(o[0], o[1])
        }

        function s(r, i) {
            return Jg(r[0] - t) < jg ? i > 0 ? 0 : 3 : Jg(r[0] - n) < jg ? i > 0 ? 2 : 1 : Jg(r[1] - e) < jg ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }

        function a(t, e) {
            return u(t.x, e.x)
        }

        function u(t, e) {
            var n = s(t, 1), r = s(e, 1);
            return n !== r ? n - r : 0 === n ? e[1] - t[1] : 1 === n ? t[0] - e[0] : 2 === n ? t[1] - e[1] : e[0] - t[0]
        }

        return function (s) {
            var u, l, c, h, p, f, g, d, y, v, _, m = s, x = bd(), E = {
                point: b, lineStart: function () {
                    E.point = w, l && l.push(c = []);
                    v = !0, y = !1, g = d = NaN
                }, lineEnd: function () {
                    u && (w(h, p), f && y && x.rejoin(), u.push(x.result()));
                    E.point = b, y && m.lineEnd()
                }, polygonStart: function () {
                    m = x, u = [], l = [], _ = !0
                }, polygonEnd: function () {
                    var e = function () {
                        for (var e = 0, n = 0, i = l.length; n < i; ++n) for (var o, s, a = l[n], u = 1, c = a.length, h = a[0], p = h[0], f = h[1]; u < c; ++u) o = p, s = f, p = (h = a[u])[0], f = h[1], s <= r ? f > r && (p - o) * (r - s) > (f - s) * (t - o) && ++e : f <= r && (p - o) * (r - s) < (f - s) * (t - o) && --e;
                        return e
                    }(), n = _ && e, i = (u = Md(u)).length;
                    (n || i) && (s.polygonStart(), n && (s.lineStart(), o(null, null, 1, s), s.lineEnd()), i && Nd(u, a, e, o, s), s.polygonEnd());
                    m = s, u = l = c = null
                }
            };

            function b(t, e) {
                i(t, e) && m.point(t, e)
            }

            function w(o, s) {
                var a = i(o, s);
                if (l && c.push([o, s]), v) h = o, p = s, f = a, v = !1, a && (m.lineStart(), m.point(o, s)); else if (a && y) m.point(o, s); else {
                    var u = [g = Math.max(Rd, Math.min(Od, g)), d = Math.max(Rd, Math.min(Od, d))],
                        x = [o = Math.max(Rd, Math.min(Od, o)), s = Math.max(Rd, Math.min(Od, s))];
                    !function (t, e, n, r, i, o) {
                        var s, a = t[0], u = t[1], l = 0, c = 1, h = e[0] - a, p = e[1] - u;
                        if (s = n - a, h || !(s > 0)) {
                            if (s /= h, h < 0) {
                                if (s < l) return;
                                s < c && (c = s)
                            } else if (h > 0) {
                                if (s > c) return;
                                s > l && (l = s)
                            }
                            if (s = i - a, h || !(s < 0)) {
                                if (s /= h, h < 0) {
                                    if (s > c) return;
                                    s > l && (l = s)
                                } else if (h > 0) {
                                    if (s < l) return;
                                    s < c && (c = s)
                                }
                                if (s = r - u, p || !(s > 0)) {
                                    if (s /= p, p < 0) {
                                        if (s < l) return;
                                        s < c && (c = s)
                                    } else if (p > 0) {
                                        if (s > c) return;
                                        s > l && (l = s)
                                    }
                                    if (s = o - u, p || !(s < 0)) {
                                        if (s /= p, p < 0) {
                                            if (s > c) return;
                                            s > l && (l = s)
                                        } else if (p > 0) {
                                            if (s < l) return;
                                            s < c && (c = s)
                                        }
                                        return l > 0 && (t[0] = a + l * h, t[1] = u + l * p), c < 1 && (e[0] = a + c * h, e[1] = u + c * p), !0
                                    }
                                }
                            }
                        }
                    }(u, x, t, e, n, r) ? a && (m.lineStart(), m.point(o, s), _ = !1) : (y || (m.lineStart(), m.point(u[0], u[1])), m.point(x[0], x[1]), a || m.lineEnd(), _ = !1)
                }
                g = o, d = s, y = a
            }

            return E
        }
    }

    var Ad = Gg();
    Gg();

    function Dd(t) {
        return t
    }

    Gg(), Gg();
    var Fd = 1 / 0, kd = Fd, Gd = -Fd, qd = Gd, Bd = {
        point: function (t, e) {
            t < Fd && (Fd = t);
            t > Gd && (Gd = t);
            e < kd && (kd = e);
            e > qd && (qd = e)
        }, lineStart: rd, lineEnd: rd, polygonStart: rd, polygonEnd: rd, result: function () {
            var t = [[Fd, kd], [Gd, qd]];
            return Gd = qd = -(kd = Fd = 1 / 0), t
        }
    };
    Gg();

    function zd(t, e, n, r) {
        return function (i, o) {
            var s, a, u, l = e(o), c = i.invert(r[0], r[1]), h = bd(), p = e(h), f = !1, g = {
                point: d, lineStart: v, lineEnd: _, polygonStart: function () {
                    g.point = m, g.lineStart = x, g.lineEnd = E, a = [], s = []
                }, polygonEnd: function () {
                    g.point = d, g.lineStart = v, g.lineEnd = _, a = Md(a);
                    var t = function (t, e) {
                        var n = e[0], r = e[1], i = [$g(n), -Qg(n), 0], o = 0, s = 0;
                        Ad.reset();
                        for (var a = 0, u = t.length; a < u; ++a) if (c = (l = t[a]).length) for (var l, c, h = l[c - 1], p = h[0], f = h[1] / 2 + Xg, g = $g(f), d = Qg(f), y = 0; y < c; ++y, p = _, g = x, d = E, h = v) {
                            var v = l[y], _ = v[0], m = v[1] / 2 + Xg, x = $g(m), E = Qg(m), b = _ - p,
                                w = b >= 0 ? 1 : -1, I = w * b, N = I > Ug, S = g * x;
                            if (Ad.add(Kg(S * w * $g(I), d * E + S * Qg(I))), o += N ? b + w * Yg : b, N ^ p >= n ^ _ >= n) {
                                var C = pd(cd(h), cd(v));
                                dd(C);
                                var P = pd(i, C);
                                dd(P);
                                var L = (N ^ b >= 0 ? -1 : 1) * nd(P[2]);
                                (r > L || r === L && (C[0] || C[1])) && (s += N ^ b >= 0 ? 1 : -1)
                            }
                        }
                        return (o < -1e-6 || o < jg && Ad < -1e-6) ^ 1 & s
                    }(s, c);
                    a.length ? (f || (o.polygonStart(), f = !0), Nd(a, Ud, t, n, o)) : t && (f || (o.polygonStart(), f = !0), o.lineStart(), n(null, null, 1, o), o.lineEnd()), f && (o.polygonEnd(), f = !1), a = s = null
                }, sphere: function () {
                    o.polygonStart(), o.lineStart(), n(null, null, 1, o), o.lineEnd(), o.polygonEnd()
                }
            };

            function d(e, n) {
                var r = i(e, n);
                t(e = r[0], n = r[1]) && o.point(e, n)
            }

            function y(t, e) {
                var n = i(t, e);
                l.point(n[0], n[1])
            }

            function v() {
                g.point = y, l.lineStart()
            }

            function _() {
                g.point = d, l.lineEnd()
            }

            function m(t, e) {
                u.push([t, e]);
                var n = i(t, e);
                p.point(n[0], n[1])
            }

            function x() {
                p.lineStart(), u = []
            }

            function E() {
                m(u[0][0], u[0][1]), p.lineEnd();
                var t, e, n, r, i = p.clean(), l = h.result(), c = l.length;
                if (u.pop(), s.push(u), u = null, c) if (1 & i) {
                    if ((e = (n = l[0]).length - 1) > 0) {
                        for (f || (o.polygonStart(), f = !0), o.lineStart(), t = 0; t < e; ++t) o.point((r = n[t])[0], r[1]);
                        o.lineEnd()
                    }
                } else c > 1 && 2 & i && l.push(l.pop().concat(l.shift())), a.push(l.filter(jd))
            }

            return g
        }
    }

    function jd(t) {
        return t.length > 1
    }

    function Ud(t, e) {
        return ((t = t.x)[0] < 0 ? t[1] - Vg - jg : Vg - t[1]) - ((e = e.x)[0] < 0 ? e[1] - Vg - jg : Vg - e[1])
    }

    var Vd = zd((function () {
        return !0
    }), (function (t) {
        var e, n = NaN, r = NaN, i = NaN;
        return {
            lineStart: function () {
                t.lineStart(), e = 1
            }, point: function (o, s) {
                var a = o > 0 ? Ug : -Ug, u = Jg(o - n);
                Jg(u - Ug) < jg ? (t.point(n, r = (r + s) / 2 > 0 ? Vg : -Vg), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), t.point(o, r), e = 0) : i !== a && u >= Ug && (Jg(n - i) < jg && (n -= i * jg), Jg(o - a) < jg && (o -= a * jg), r = function (t, e, n, r) {
                    var i, o, s = $g(t - n);
                    return Jg(s) > jg ? Zg(($g(e) * (o = Qg(r)) * $g(n) - $g(r) * (i = Qg(e)) * $g(t)) / (i * o * s)) : (e + r) / 2
                }(n, r, o, s), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), e = 0), t.point(n = o, r = s), i = a
            }, lineEnd: function () {
                t.lineEnd(), n = r = NaN
            }, clean: function () {
                return 2 - e
            }
        }
    }), (function (t, e, n, r) {
        var i;
        if (null == t) i = n * Vg, r.point(-Ug, i), r.point(0, i), r.point(Ug, i), r.point(Ug, 0), r.point(Ug, -i), r.point(0, -i), r.point(-Ug, -i), r.point(-Ug, 0), r.point(-Ug, i); else if (Jg(t[0] - e[0]) > jg) {
            var o = t[0] < e[0] ? Ug : -Ug;
            i = n * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
        } else r.point(e[0], e[1])
    }), [-Ug, -Vg]);

    function Xd(t, e) {
        var n = Qg(t), r = n > 0, i = Jg(n) > jg;

        function o(t, e) {
            return Qg(t) * Qg(e) > n
        }

        function s(t, e, r) {
            var i = [1, 0, 0], o = pd(cd(t), cd(e)), s = hd(o, o), a = o[0], u = s - a * a;
            if (!u) return !r && t;
            var l = n * s / u, c = -n * a / u, h = pd(i, o), p = gd(i, l);
            fd(p, gd(o, c));
            var f = h, g = hd(p, f), d = hd(f, f), y = g * g - d * (hd(p, p) - 1);
            if (!(y < 0)) {
                var v = td(y), _ = gd(f, (-g - v) / d);
                if (fd(_, p), _ = ld(_), !r) return _;
                var m, x = t[0], E = e[0], b = t[1], w = e[1];
                E < x && (m = x, x = E, E = m);
                var I = E - x, N = Jg(I - Ug) < jg;
                if (!N && w < b && (m = b, b = w, w = m), N || I < jg ? N ? b + w > 0 ^ _[1] < (Jg(_[0] - x) < jg ? b : w) : b <= _[1] && _[1] <= w : I > Ug ^ (x <= _[0] && _[0] <= E)) {
                    var S = gd(f, (-g + v) / d);
                    return fd(S, p), [_, ld(S)]
                }
            }
        }

        function a(e, n) {
            var i = r ? t : Ug - t, o = 0;
            return e < -i ? o |= 1 : e > i && (o |= 2), n < -i ? o |= 4 : n > i && (o |= 8), o
        }

        return zd(o, (function (t) {
            var e, n, u, l, c;
            return {
                lineStart: function () {
                    l = u = !1, c = 1
                }, point: function (h, p) {
                    var f, g = [h, p], d = o(h, p), y = r ? d ? 0 : a(h, p) : d ? a(h + (h < 0 ? Ug : -Ug), p) : 0;
                    if (!e && (l = u = d) && t.lineStart(), d !== u && (!(f = s(e, g)) || wd(e, f) || wd(g, f)) && (g[0] += jg, g[1] += jg, d = o(g[0], g[1])), d !== u) c = 0, d ? (t.lineStart(), f = s(g, e), t.point(f[0], f[1])) : (f = s(e, g), t.point(f[0], f[1]), t.lineEnd()), e = f; else if (i && e && r ^ d) {
                        var v;
                        y & n || !(v = s(g, e, !0)) || (c = 0, r ? (t.lineStart(), t.point(v[0][0], v[0][1]), t.point(v[1][0], v[1][1]), t.lineEnd()) : (t.point(v[1][0], v[1][1]), t.lineEnd(), t.lineStart(), t.point(v[0][0], v[0][1])))
                    }
                    !d || e && wd(e, g) || t.point(g[0], g[1]), e = g, u = d, n = y
                }, lineEnd: function () {
                    u && t.lineEnd(), e = null
                }, clean: function () {
                    return c | (l && u) << 1
                }
            }
        }), (function (n, r, i, o) {
            !function (t, e, n, r, i, o) {
                if (n) {
                    var s = Qg(e), a = $g(e), u = r * n;
                    null == i ? (i = e + r * Yg, o = e - u / 2) : (i = Ed(s, i), o = Ed(s, o), (r > 0 ? i < o : i > o) && (i += r * Yg));
                    for (var l, c = i; r > 0 ? c > o : c < o; c -= u) l = ld([s, -a * Qg(c), -a * $g(c)]), t.point(l[0], l[1])
                }
            }(o, t, e, i, n, r)
        }), r ? [0, -t] : [-Ug, t - Ug])
    }

    function Yd(t) {
        return function (e) {
            var n = new Hd;
            for (var r in t) n[r] = t[r];
            return n.stream = e, n
        }
    }

    function Hd() {
    }

    function Wd(t, e, n) {
        var r = e[1][0] - e[0][0], i = e[1][1] - e[0][1], o = t.clipExtent && t.clipExtent();
        t.scale(150).translate([0, 0]), null != o && t.clipExtent(null), function (t, e) {
            t && od.hasOwnProperty(t.type) ? od[t.type](t, e) : id(t, e)
        }(n, t.stream(Bd));
        var s = Bd.result(), a = Math.min(r / (s[1][0] - s[0][0]), i / (s[1][1] - s[0][1])),
            u = +e[0][0] + (r - a * (s[1][0] + s[0][0])) / 2, l = +e[0][1] + (i - a * (s[1][1] + s[0][1])) / 2;
        return null != o && t.clipExtent(o), t.scale(150 * a).translate([u, l])
    }

    Hd.prototype = {
        constructor: Hd, point: function (t, e) {
            this.stream.point(t, e)
        }, sphere: function () {
            this.stream.sphere()
        }, lineStart: function () {
            this.stream.lineStart()
        }, lineEnd: function () {
            this.stream.lineEnd()
        }, polygonStart: function () {
            this.stream.polygonStart()
        }, polygonEnd: function () {
            this.stream.polygonEnd()
        }
    };
    var Jd = Qg(30 * Wg);

    function Zd(t, e) {
        return +e ? function (t, e) {
            function n(r, i, o, s, a, u, l, c, h, p, f, g, d, y) {
                var v = l - r, _ = c - i, m = v * v + _ * _;
                if (m > 4 * e && d--) {
                    var x = s + p, E = a + f, b = u + g, w = td(x * x + E * E + b * b), I = nd(b /= w),
                        N = Jg(Jg(b) - 1) < jg || Jg(o - h) < jg ? (o + h) / 2 : Kg(E, x), S = t(N, I), C = S[0],
                        P = S[1], L = C - r, M = P - i, O = _ * L - v * M;
                    (O * O / m > e || Jg((v * L + _ * M) / m - .5) > .3 || s * p + a * f + u * g < Jd) && (n(r, i, o, s, a, u, C, P, N, x /= w, E /= w, b, d, y), y.point(C, P), n(C, P, N, x, E, b, l, c, h, p, f, g, d, y))
                }
            }

            return function (e) {
                var r, i, o, s, a, u, l, c, h, p, f, g, d = {
                    point: y, lineStart: v, lineEnd: m, polygonStart: function () {
                        e.polygonStart(), d.lineStart = x
                    }, polygonEnd: function () {
                        e.polygonEnd(), d.lineStart = v
                    }
                };

                function y(n, r) {
                    n = t(n, r), e.point(n[0], n[1])
                }

                function v() {
                    c = NaN, d.point = _, e.lineStart()
                }

                function _(r, i) {
                    var o = cd([r, i]), s = t(r, i);
                    n(c, h, l, p, f, g, c = s[0], h = s[1], l = r, p = o[0], f = o[1], g = o[2], 16, e), e.point(c, h)
                }

                function m() {
                    d.point = y, e.lineEnd()
                }

                function x() {
                    v(), d.point = E, d.lineEnd = b
                }

                function E(t, e) {
                    _(r = t, e), i = c, o = h, s = p, a = f, u = g, d.point = _
                }

                function b() {
                    n(c, h, l, p, f, g, i, o, r, s, a, u, 16, e), d.lineEnd = m, m()
                }

                return d
            }
        }(t, e) : function (t) {
            return Yd({
                point: function (e, n) {
                    e = t(e, n), this.stream.point(e[0], e[1])
                }
            })
        }(t)
    }

    var Kd = Yd({
        point: function (t, e) {
            this.stream.point(t * Wg, e * Wg)
        }
    });

    function Qd(t) {
        return function (t) {
            var e, n, r, i, o, s, a, u, l, c, h = 150, p = 480, f = 250, g = 0, d = 0, y = 0, v = 0, _ = 0, m = null,
                x = Vd, E = null, b = Dd, w = .5, I = Zd(C, w);

            function N(t) {
                return [(t = o(t[0] * Wg, t[1] * Wg))[0] * h + n, r - t[1] * h]
            }

            function S(t) {
                return (t = o.invert((t[0] - n) / h, (r - t[1]) / h)) && [t[0] * Hg, t[1] * Hg]
            }

            function C(t, i) {
                return [(t = e(t, i))[0] * h + n, r - t[1] * h]
            }

            function P() {
                o = yd(i = function (t, e, n) {
                    return (t %= Yg) ? e || n ? yd(md(t), xd(e, n)) : md(t) : e || n ? xd(e, n) : vd
                }(y, v, _), e);
                var t = e(g, d);
                return n = p - t[0] * h, r = f + t[1] * h, L()
            }

            function L() {
                return l = c = null, N
            }

            return N.stream = function (t) {
                return l && c === t ? l : l = Kd(x(i, I(b(c = t))))
            }, N.clipAngle = function (t) {
                return arguments.length ? (x = +t ? Xd(m = t * Wg, 6 * Wg) : (m = null, Vd), L()) : m * Hg
            }, N.clipExtent = function (t) {
                return arguments.length ? (b = null == t ? (E = s = a = u = null, Dd) : Td(E = +t[0][0], s = +t[0][1], a = +t[1][0], u = +t[1][1]), L()) : null == E ? null : [[E, s], [a, u]]
            }, N.scale = function (t) {
                return arguments.length ? (h = +t, P()) : h
            }, N.translate = function (t) {
                return arguments.length ? (p = +t[0], f = +t[1], P()) : [p, f]
            }, N.center = function (t) {
                return arguments.length ? (g = t[0] % 360 * Wg, d = t[1] % 360 * Wg, P()) : [g * Hg, d * Hg]
            }, N.rotate = function (t) {
                return arguments.length ? (y = t[0] % 360 * Wg, v = t[1] % 360 * Wg, _ = t.length > 2 ? t[2] % 360 * Wg : 0, P()) : [y * Hg, v * Hg, _ * Hg]
            }, N.precision = function (t) {
                return arguments.length ? (I = Zd(C, w = t * t), L()) : td(w)
            }, N.fitExtent = function (t, e) {
                return Wd(N, t, e)
            }, N.fitSize = function (t, e) {
                return function (t, e, n) {
                    return Wd(t, [[0, 0], e], n)
                }(N, t, e)
            }, function () {
                return e = t.apply(this, arguments), N.invert = e.invert && S, P()
            }
        }((function () {
            return t
        }))()
    }

    var $d = function (t) {
        return function (e, n) {
            var r = Qg(e), i = Qg(n), o = t(r * i);
            return [o * i * $g(e), o * $g(n)]
        }
    }((function (t) {
        return (t = ed(t)) && t / $g(t)
    }));

    function ty() {
        return Qd($d).scale(79.4188).clipAngle(179.999)
    }

    function ey(t, n, r, i) {
        var s = t.properties || {}, a = "Feature" === t.type ? t.geometry : t;
        if ("GeometryCollection" === a.type) {
            var u = [];
            return W(t, (function (t) {
                var e = ey(t, n, r, i);
                e && u.push(e)
            })), f(u)
        }
        var l = function (t) {
                var n = mn(t).geometry.coordinates, r = [-n[0], -n[1]];
                return ty().rotate(r).scale(e)
            }(a), c = {type: a.type, coordinates: ry(a.coordinates, l)}, h = (new wh).read(c), p = m(x(n, r), "meters"),
            g = vf.bufferOp(h, p, i);
        if (!ny((g = (new Ih).write(g)).coordinates)) return o({type: g.type, coordinates: iy(g.coordinates, l)}, s)
    }

    function ny(t) {
        return Array.isArray(t[0]) ? ny(t[0]) : isNaN(t[0])
    }

    function ry(t, e) {
        return "object" != typeof t[0] ? e(t) : t.map((function (t) {
            return ry(t, e)
        }))
    }

    function iy(t, e) {
        return "object" != typeof t[0] ? e.invert(t) : t.map((function (t) {
            return iy(t, e)
        }))
    }

    function oy(t, e, n) {
        void 0 === n && (n = {});
        var r = G(t), i = G(e), o = Zu(r.coordinates, i.coordinates);
        return 0 === o.length ? null : 1 === o.length ? l(o[0], n.properties) : y(o, n.properties)
    }

    function sy(t, e, n) {
        void 0 === n && (n = {});
        var r = G(t), i = G(e), o = Ku(r.coordinates, i.coordinates);
        return 0 === o.length ? null : 1 === o.length ? l(o[0], n.properties) : y(o, n.properties)
    }

    /**
     * @license get-closest https://github.com/cosmosio/get-closest
     *
     * The MIT License (MIT)
     *
     * Copyright (c) 2014-2017 Olivier Scherrer <pode.fr@gmail.com>
     */function ay(t, e) {
        return function (t, e, n) {
            var r, i;
            if (!Array.isArray(e)) throw new Error("Get closest expects an array as second argument");
            return e.forEach((function (e, o) {
                var s = n(e, t);
                s >= 0 && (void 0 === i || s < i) && (i = s, r = o)
            })), r
        }(t, e, (function (t, e) {
            return t - e
        }))
    }

    function uy(t, e) {
        return Mr(h(H(t)), h(H(e))).features.length > 0
    }

    function ly(t, e, n) {
        void 0 === n && (n = {});
        var r = JSON.stringify(n.properties || {}), i = t[0], o = t[1], s = t[2], a = t[3], u = (o + a) / 2,
            l = (i + s) / 2, c = 2 * e / me([i, u], [s, u], n) * (s - i), h = 2 * e / me([l, o], [l, a], n) * (a - o),
            p = c / 2, g = 2 * p, d = Math.sqrt(3) / 2 * h, y = s - i, v = a - o, _ = 3 / 4 * g, m = d,
            x = (y - g) / (g - p / 2), E = Math.floor(x), b = (E * _ - p / 2 - y) / 2 - p / 2 + _ / 2,
            w = Math.floor((v - d) / d), I = (v - w * d) / 2, N = w * d - v > d / 2;
        N && (I -= d / 4);
        for (var S = [], C = [], P = 0; P < 6; P++) {
            var L = 2 * Math.PI / 6 * P;
            S.push(Math.cos(L)), C.push(Math.sin(L))
        }
        for (var M = [], O = 0; O <= E; O++) for (var R = 0; R <= w; R++) {
            var T = O % 2 == 1;
            if ((0 !== R || !T) && (0 !== R || !N)) {
                var A = O * _ + i - b, D = R * m + o + I;
                if (T && (D -= d / 2), !0 === n.triangles) hy([A, D], c / 2, h / 2, JSON.parse(r), S, C).forEach((function (t) {
                    n.mask ? sy(n.mask, t) && M.push(t) : M.push(t)
                })); else {
                    var F = cy([A, D], c / 2, h / 2, JSON.parse(r), S, C);
                    n.mask ? sy(n.mask, F) && M.push(F) : M.push(F)
                }
            }
        }
        return f(M)
    }

    function cy(t, e, n, r, i, o) {
        for (var s = [], a = 0; a < 6; a++) {
            var u = t[0] + e * i[a], c = t[1] + n * o[a];
            s.push([u, c])
        }
        return s.push(s[0].slice()), l([s], r)
    }

    function hy(t, e, n, r, i, o) {
        for (var s = [], a = 0; a < 6; a++) {
            var u = [];
            u.push(t), u.push([t[0] + e * i[a], t[1] + n * o[a]]), u.push([t[0] + e * i[(a + 1) % 6], t[1] + n * o[(a + 1) % 6]]), u.push(t), s.push(l([u], r))
        }
        return s
    }

    function py(t) {
        if (t.features.length <= 1) return t;
        var e = function (t) {
            var e = Nt(), n = [];
            return Z(t, (function (t, e) {
                var r = ot(t);
                n.push({minX: r[0], minY: r[1], maxX: r[2], maxY: r[3], geojson: t, index: e})
            })), e.load(n), e
        }(t), n = [], r = {};
        return Z(t, (function (t, i) {
            if (r[i]) return !0;
            for (e.remove({index: i}, fy), r[i] = !0; ;) {
                var o = ot(t), s = e.search({minX: o[0], minY: o[1], maxX: o[2], maxY: o[3]});
                if (s.length > 0) for (var a = s.map((function (t) {
                    return r[t.index] = !0, e.remove({index: t.index}, fy), t.geojson
                })), u = 0, l = a.length; u < l; u++) t = oy(t, a[u]);
                if (0 === s.length) break
            }
            n.push(t)
        })), f(n)
    }

    function fy(t, e) {
        return t.index === e.index
    }

    function gy(t, e, n) {
        return void 0 === n && (n = {}), function (t, e, n, r) {
            void 0 === r && (r = {});
            for (var i = [], o = t[0], s = t[1], a = t[2], u = t[3], c = e / me([o, s], [a, s], r) * (a - o), h = n / me([o, s], [o, u], r) * (u - s), p = a - o, g = u - s, d = Math.floor(p / c), y = Math.floor(g / h), v = (g - y * h) / 2, _ = o + (p - d * c) / 2, m = 0; m < d; m++) {
                for (var x = s + v, E = 0; E < y; E++) {
                    var b = l([[[_, x], [_, x + h], [_ + c, x + h], [_ + c, x], [_, x]]], r.properties);
                    r.mask ? Ss(r.mask, b) && i.push(b) : i.push(b), x += h
                }
                _ += c
            }
            return f(i)
        }(t, e, e, n)
    }

    function dy(t, e, n) {
        void 0 === n && (n = {});
        for (var r = [], i = e / me([t[0], t[1]], [t[2], t[1]], n) * (t[2] - t[0]), o = e / me([t[0], t[1]], [t[0], t[3]], n) * (t[3] - t[1]), s = 0, a = t[0]; a <= t[2];) {
            for (var u = 0, c = t[1]; c <= t[3];) {
                var h = null, p = null;
                s % 2 == 0 && u % 2 == 0 ? (h = l([[[a, c], [a, c + o], [a + i, c], [a, c]]], n.properties), p = l([[[a, c + o], [a + i, c + o], [a + i, c], [a, c + o]]], n.properties)) : s % 2 == 0 && u % 2 == 1 ? (h = l([[[a, c], [a + i, c + o], [a + i, c], [a, c]]], n.properties), p = l([[[a, c], [a, c + o], [a + i, c + o], [a, c]]], n.properties)) : u % 2 == 0 && s % 2 == 1 ? (h = l([[[a, c], [a, c + o], [a + i, c + o], [a, c]]], n.properties), p = l([[[a, c], [a + i, c + o], [a + i, c], [a, c]]], n.properties)) : u % 2 == 1 && s % 2 == 1 && (h = l([[[a, c], [a, c + o], [a + i, c], [a, c]]], n.properties), p = l([[[a, c + o], [a + i, c + o], [a + i, c], [a, c + o]]], n.properties)), n.mask ? (sy(n.mask, h) && r.push(h), sy(n.mask, p) && r.push(p)) : (r.push(h), r.push(p)), c += o, u++
            }
            s++, a += i
        }
        return f(r)
    }

    $d.invert = function (t) {
        return function (e, n) {
            var r = td(e * e + n * n), i = t(r), o = $g(i), s = Qg(i);
            return [Kg(e * o, r * s), nd(r && n * o / r)]
        }
    }((function (t) {
        return t
    })), t.along = function (t, e, n) {
        void 0 === n && (n = {});
        for (var r = G(t).coordinates, i = 0, o = 0; o < r.length && !(e >= i && o === r.length - 1); o++) {
            if (i >= e) {
                var s = e - i;
                if (s) {
                    var u = _n(r[o], r[o - 1]) - 180;
                    return yn(r[o], s, u, n)
                }
                return a(r[o])
            }
            i += me(r[o], r[o + 1], n)
        }
        return a(r[r.length - 1])
    }, t.angle = function (t, e, n, r) {
        if (void 0 === r && (r = {}), !P(r)) throw new Error("options is invalid");
        if (!t) throw new Error("startPoint is required");
        if (!e) throw new Error("midPoint is required");
        if (!n) throw new Error("endPoint is required");
        var i = t, o = e, s = n, a = b(!0 !== r.mercator ? _n(i, o) : ki(i, o)),
            u = b(!0 !== r.mercator ? _n(s, o) : ki(s, o)), l = Math.abs(a - u);
        return !0 === r.explementary ? 360 - l : l
    }, t.applyFilter = ou, t.area = zr, t.areaFactors = i, t.bbox = ot, t.bboxClip = function (t, e) {
        var n = G(t), r = n.type, i = "Feature" === t.type ? t.properties : {}, o = n.coordinates;
        switch (r) {
            case"LineString":
            case"MultiLineString":
                var s = [];
                return "LineString" === r && (o = [o]), o.forEach((function (t) {
                    !function (t, e, n) {
                        var r, i, o, s, a, u = t.length, l = Li(t[0], e), c = [];
                        for (n || (n = []), r = 1; r < u; r++) {
                            for (i = t[r - 1], s = a = Li(o = t[r], e); ;) {
                                if (!(l | s)) {
                                    c.push(i), s !== a ? (c.push(o), r < u - 1 && (n.push(c), c = [])) : r === u - 1 && c.push(o);
                                    break
                                }
                                if (l & s) break;
                                l ? l = Li(i = Pi(i, o, l, e), e) : s = Li(o = Pi(i, o, s, e), e)
                            }
                            l = a
                        }
                        c.length && n.push(c)
                    }(t, e, s)
                })), 1 === s.length ? h(s[0], i) : g(s, i);
            case"Polygon":
                return l(Mi(o, e), i);
            case"MultiPolygon":
                return y(o.map((function (t) {
                    return Mi(t, e)
                })), i);
            default:
                throw new Error("geometry " + r + " not supported")
        }
    }, t.bboxPolygon = fn, t.bearing = _n, t.bearingToAngle = b, t.bearingToAzimuth = b, t.bezier = pn, t.bezierSpline = pn, t.booleanClockwise = Ui, t.booleanContains = function (t, e) {
        var n = G(t), r = G(e), i = n.type, o = r.type, s = n.coordinates, a = r.coordinates;
        switch (i) {
            case"Point":
                switch (o) {
                    case"Point":
                        return gs(s, a);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"MultiPoint":
                switch (o) {
                    case"Point":
                        return function (t, e) {
                            var n, r = !1;
                            for (n = 0; n < t.coordinates.length; n++) if (gs(t.coordinates[n], e.coordinates)) {
                                r = !0;
                                break
                            }
                            return r
                        }(n, r);
                    case"MultiPoint":
                        return function (t, e) {
                            for (var n = 0, r = e.coordinates; n < r.length; n++) {
                                for (var i = r[n], o = !1, s = 0, a = t.coordinates; s < a.length; s++) {
                                    if (gs(i, a[s])) {
                                        o = !0;
                                        break
                                    }
                                }
                                if (!o) return !1
                            }
                            return !0
                        }(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"LineString":
                switch (o) {
                    case"Point":
                        return Hr(r, n, {ignoreEndVertices: !0});
                    case"LineString":
                        return function (t, e) {
                            for (var n = !1, r = 0, i = e.coordinates; r < i.length; r++) {
                                var o = i[r];
                                if (Hr({
                                    type: "Point",
                                    coordinates: o
                                }, t, {ignoreEndVertices: !0}) && (n = !0), !Hr({
                                    type: "Point",
                                    coordinates: o
                                }, t, {ignoreEndVertices: !1})) return !1
                            }
                            return n
                        }(n, r);
                    case"MultiPoint":
                        return function (t, e) {
                            for (var n = !1, r = 0, i = e.coordinates; r < i.length; r++) {
                                var o = i[r];
                                if (Hr(o, t, {ignoreEndVertices: !0}) && (n = !0), !Hr(o, t)) return !1
                            }
                            if (n) return !0;
                            return !1
                        }(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"Polygon":
                switch (o) {
                    case"Point":
                        return ye(r, n, {ignoreBoundary: !0});
                    case"LineString":
                        return function (t, e) {
                            var n = !1, r = 0, i = ot(t), o = ot(e);
                            if (!fs(i, o)) return !1;
                            for (; r < e.coordinates.length - 1; r++) {
                                if (ye({
                                    type: "Point",
                                    coordinates: ds(e.coordinates[r], e.coordinates[r + 1])
                                }, t, {ignoreBoundary: !0})) {
                                    n = !0;
                                    break
                                }
                            }
                            return n
                        }(n, r);
                    case"Polygon":
                        return function (t, e) {
                            if ("Feature" === t.type && null === t.geometry) return !1;
                            if ("Feature" === e.type && null === e.geometry) return !1;
                            var n = ot(t), r = ot(e);
                            if (!fs(n, r)) return !1;
                            for (var i = G(e).coordinates, o = 0, s = i; o < s.length; o++) for (var a = 0, u = s[o]; a < u.length; a++) {
                                if (!ye(u[a], t)) return !1
                            }
                            return !0
                        }(n, r);
                    case"MultiPoint":
                        return function (t, e) {
                            for (var n = 0, r = e.coordinates; n < r.length; n++) {
                                if (!ye(r[n], t, {ignoreBoundary: !0})) return !1
                            }
                            return !0
                        }(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            default:
                throw new Error("feature1 " + i + " geometry not supported")
        }
    }, t.booleanCrosses = function (t, e) {
        var n = G(t), r = G(e), i = n.type, o = r.type;
        switch (i) {
            case"MultiPoint":
                switch (o) {
                    case"LineString":
                        return ys(n, r);
                    case"Polygon":
                        return _s(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"LineString":
                switch (o) {
                    case"MultiPoint":
                        return ys(r, n);
                    case"LineString":
                        return function (t, e) {
                            if (Mr(t, e).features.length > 0) for (var n = 0; n < t.coordinates.length - 1; n++) for (var r = 0; r < e.coordinates.length - 1; r++) {
                                var i = !0;
                                if (0 !== r && r !== e.coordinates.length - 2 || (i = !1), ms(t.coordinates[n], t.coordinates[n + 1], e.coordinates[r], i)) return !0
                            }
                            return !1
                        }(n, r);
                    case"Polygon":
                        return vs(n, r);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            case"Polygon":
                switch (o) {
                    case"MultiPoint":
                        return _s(r, n);
                    case"LineString":
                        return vs(r, n);
                    default:
                        throw new Error("feature2 " + o + " geometry not supported")
                }
            default:
                throw new Error("feature1 " + i + " geometry not supported")
        }
    }, t.booleanDisjoint = ls, t.booleanEqual = function (t, e) {
        return G(t).type === G(e).type && new Is({precision: 6}).compare($e(t), $e(e))
    }, t.booleanIntersects = Ss, t.booleanOverlap = Ns, t.booleanParallel = function (t, e) {
        if (!t) throw new Error("line1 is required");
        if (!e) throw new Error("line2 is required");
        if ("LineString" !== zs(t, "line1")) throw new Error("line1 must be a LineString");
        if ("LineString" !== zs(e, "line2")) throw new Error("line2 must be a LineString");
        for (var n = Jn($e(t)).features, r = Jn($e(e)).features, i = 0; i < n.length; i++) {
            var o = n[i].geometry.coordinates;
            if (!r[i]) break;
            if (!Bs(o, r[i].geometry.coordinates)) return !1
        }
        return !0
    }, t.booleanPointInPolygon = ye, t.booleanPointOnLine = Hr, t.booleanWithin = Jr, t.buffer = function (t, e, n) {
        var r = (n = n || {}).units || "kilometers", i = n.steps || 8;
        if (!t) throw new Error("geojson is required");
        if ("object" != typeof n) throw new Error("options must be an object");
        if ("number" != typeof i) throw new Error("steps must be an number");
        if (void 0 === e) throw new Error("radius is required");
        if (i <= 0) throw new Error("steps must be greater than 0");
        var o = [];
        switch (t.type) {
            case"GeometryCollection":
                return W(t, (function (t) {
                    var n = ey(t, e, r, i);
                    n && o.push(n)
                })), f(o);
            case"FeatureCollection":
                return X(t, (function (t) {
                    var n = ey(t, e, r, i);
                    n && X(n, (function (t) {
                        t && o.push(t)
                    }))
                })), f(o)
        }
        return ey(t, e, r, i)
    }, t.center = mn, t.centerMean = Aa, t.centerMedian = function (t, e) {
        if (void 0 === e && (e = {}), !P(e = e || {})) throw new Error("options is invalid");
        var n = e.counter || 10;
        if (!C(n)) throw new Error("counter must be a number");
        var r = e.weight, i = Aa(t, {weight: e.weight}), o = f([]);
        return X(t, (function (t) {
            o.features.push(xn(t, {properties: {weight: t.properties[r]}}))
        })), o.properties = {tolerance: e.tolerance, medianCandidates: []}, Da(i.geometry.coordinates, [0, 0], o, n)
    }, t.centerOfMass = function t(e, n) {
        switch (void 0 === n && (n = {}), q(e)) {
            case"Point":
                return a(R(e), n.properties);
            case"Polygon":
                var r = [];
                z(e, (function (t) {
                    r.push(t)
                }));
                var i, o, s, u, l, c, h, p, f = xn(e, {properties: n.properties}), g = f.geometry.coordinates, d = 0,
                    y = 0, v = 0, _ = r.map((function (t) {
                        return [t[0] - g[0], t[1] - g[1]]
                    }));
                for (i = 0; i < r.length - 1; i++) u = (o = _[i])[0], c = o[1], l = (s = _[i + 1])[0], v += p = u * (h = s[1]) - l * c, d += (u + l) * p, y += (c + h) * p;
                if (0 === v) return f;
                var m = 1 / (6 * (.5 * v));
                return a([g[0] + m * d, g[1] + m * y], n.properties);
            default:
                var x = de(e);
                return x ? t(x, {properties: n.properties}) : xn(e, {properties: n.properties})
        }
    }, t.centroid = xn, t.circle = vn, t.cleanCoords = $e, t.clone = Ie, t.clusterEach = nu, t.clusterReduce = ru, t.clusters = uu, t.clustersDbscan = function (t, e, n) {
        void 0 === n && (n = {}), !0 !== n.mutate && (t = Ie(t)), n.minPoints = n.minPoints || 3;
        var r = new Os.DBSCAN, i = r.run(H(t), N(e, n.units), n.minPoints, me), o = -1;
        return i.forEach((function (e) {
            o++, e.forEach((function (e) {
                var n = t.features[e];
                n.properties || (n.properties = {}), n.properties.cluster = o, n.properties.dbscan = "core"
            }))
        })), r.noise.forEach((function (e) {
            var n = t.features[e];
            n.properties || (n.properties = {}), n.properties.cluster ? n.properties.dbscan = "edge" : n.properties.dbscan = "noise"
        })), t
    }, t.clustersKmeans = function (t, e) {
        void 0 === e && (e = {});
        var n = t.features.length;
        e.numberOfClusters = e.numberOfClusters || Math.round(Math.sqrt(n / 2)), e.numberOfClusters > n && (e.numberOfClusters = n), !0 !== e.mutate && (t = Ie(t));
        var r = H(t), i = r.slice(0, e.numberOfClusters), o = qs(r, e.numberOfClusters, i), s = {};
        return o.centroids.forEach((function (t, e) {
            s[e] = t
        })), X(t, (function (t, e) {
            var n = o.idxs[e];
            t.properties.cluster = n, t.properties.centroid = s[n]
        })), t
    }, t.collect = function (t, e, n, r) {
        var i = Nt(6), o = e.features.map((function (t) {
            return {
                minX: t.geometry.coordinates[0],
                minY: t.geometry.coordinates[1],
                maxX: t.geometry.coordinates[0],
                maxY: t.geometry.coordinates[1],
                property: t.properties[n]
            }
        }));
        return i.load(o), t.features.forEach((function (t) {
            t.properties || (t.properties = {});
            var e = ot(t), n = i.search({minX: e[0], minY: e[1], maxX: e[2], maxY: e[3]}), o = [];
            n.forEach((function (e) {
                ye([e.minX, e.minY], t) && o.push(e.property)
            })), t.properties[r] = o
        })), t
    }, t.collectionOf = k, t.combine = function (t) {
        var e = {
            MultiPoint: {coordinates: [], properties: []},
            MultiLineString: {coordinates: [], properties: []},
            MultiPolygon: {coordinates: [], properties: []}
        }, n = Object.keys(e).reduce((function (t, e) {
            return t[e.replace("Multi", "")] = e, t
        }), {});

        function r(t, n, r) {
            r ? e[n].coordinates = e[n].coordinates.concat(t.geometry.coordinates) : e[n].coordinates.push(t.geometry.coordinates), e[n].properties.push(t.properties)
        }

        return X(t, (function (t) {
            t.geometry && (e[t.geometry.type] ? r(t, t.geometry.type, !0) : n[t.geometry.type] && r(t, n[t.geometry.type], !1))
        })), f(Object.keys(e).filter((function (t) {
            return e[t].coordinates.length
        })).sort().map((function (t) {
            return o({type: t, coordinates: e[t].coordinates}, {collectedProperties: e[t].properties})
        })))
    }, t.concave = function (t, e) {
        void 0 === e && (e = {});
        var n = e.maxEdge || 1 / 0, r = xe(function (t) {
            var e = [], n = {};
            return X(t, (function (t) {
                if (t.geometry) {
                    var r = t.geometry.coordinates.join("-");
                    n.hasOwnProperty(r) || (e.push(t), n[r] = !0)
                }
            })), f(e)
        }(t));
        if (r.features = r.features.filter((function (t) {
            var r = t.geometry.coordinates[0][0], i = t.geometry.coordinates[0][1], o = t.geometry.coordinates[0][2],
                s = me(r, i, e), a = me(i, o, e), u = me(r, o, e);
            return s <= n && a <= n && u <= n
        })), r.features.length < 1) return null;
        var i = Qe(r);
        return 1 === i.coordinates.length && (i.coordinates = i.coordinates[0], i.type = "Polygon"), o(i)
    }, t.containsNumber = A, t.convertArea = S, t.convertDistance = N, t.convertLength = N, t.convex = de, t.coordAll = H, t.coordEach = z, t.coordReduce = j, t.createBins = iu, t.degrees2radians = I, t.degreesToRadians = I, t.destination = yn, t.difference = function (t, e) {
        var n = G(t), r = G(e), i = t.properties || {}, o = Qu(n.coordinates, r.coordinates);
        return 0 === o.length ? null : 1 === o.length ? l(o[0], i) : y(o, i)
    }, t.dissolve = function (t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = e.propertyName;
        k(t, "Polygon", "dissolve");
        var r = Ie(t), i = r.features, o = [];
        i.forEach((function (t, e) {
            t.properties.origIndexPosition = e
        }));
        var s = Pr();
        for (var a in s.load(r), i) {
            var u = i[a], l = !1;
            if (s.search(u).features.forEach((function (t) {
                u = i[a];
                var e = t.properties.origIndexPosition;
                if (o.length > 0 && 0 !== e) if (e > o[o.length - 1]) e -= o.length; else {
                    var r = ay(e, o);
                    0 !== r && (e -= r)
                }
                if (e !== +a) {
                    var c = i[e];
                    c && u && (void 0 !== n && c.properties[n] !== u.properties[n] || Ns(u, c) && uy(u, c) && (i[a] = oy(u, c), o.push(t.properties.origIndexPosition), o.sort((function (t, e) {
                        return t - e
                    })), s.remove(t), i.splice(e, 1), u.properties.origIndexPosition = a, s.remove(u, (function (t, e) {
                        return t.properties.origIndexPosition === e.properties.origIndexPosition
                    })), l = !0))
                }
            })), l) {
                if (!u) continue;
                u.properties.origIndexPosition = a, s.insert(u), a--
            }
        }
        return i.forEach((function (t) {
            delete t.properties.origIndexPosition, delete t.bbox
        })), r
    }, t.distance = me, t.distanceToDegrees = E, t.distanceToRadians = x, t.distanceWeight = Ba, t.earthRadius = e, t.ellipse = Ra, t.envelope = gn, t.explode = En, t.factors = n, t.feature = o, t.featureCollection = f, t.featureEach = X, t.featureOf = F, t.featureReduce = Y, t.filterProperties = au, t.findPoint = rt, t.findSegment = nt, t.flatten = function (t) {
        if (!t) throw new Error("geojson is required");
        var e = [];
        return Z(t, (function (t) {
            e.push(t)
        })), f(e)
    }, t.flattenEach = Z, t.flattenReduce = K, t.flip = function (t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = e.mutate;
        if (!t) throw new Error("geojson is required");
        return !1 !== n && void 0 !== n || (t = Ie(t)), z(t, (function (t) {
            var e = t[0], n = t[1];
            t[0] = n, t[1] = e
        })), t
    }, t.geojsonType = D, t.geomEach = W, t.geomReduce = J, t.geometry = s, t.geometryCollection = v, t.getCluster = eu, t.getCoord = R, t.getCoords = T, t.getGeom = G, t.getType = q, t.greatCircle = function (t, e, n) {
        if ("object" != typeof (n = n || {})) throw new Error("options is invalid");
        var r = n.properties, i = n.npoints, o = n.offset;
        return t = R(t), e = R(e), r = r || {}, i = i || 100, o = o || 10, new gi({x: t[0], y: t[1]}, {
            x: e[0],
            y: e[1]
        }, r).Arc(i, {offset: o}).json()
    }, t.helpers = O, t.hexGrid = ly, t.inside = ye, t.interpolate = function (t, e, n) {
        if ("object" != typeof (n = n || {})) throw new Error("options is invalid");
        var r = n.gridType, i = n.property, o = n.weight;
        if (!t) throw new Error("points is required");
        if (k(t, "Point", "input must contain Points"), !e) throw new Error("cellSize is required");
        if (void 0 !== o && "number" != typeof o) throw new Error("weight must be a number");
        i = i || "elevation", r = r || "square", o = o || 1;
        var s, a = ot(t);
        switch (r) {
            case"point":
            case"points":
                s = $r(a, e, n);
                break;
            case"square":
            case"squares":
                s = gy(a, e, n);
                break;
            case"hex":
            case"hexes":
                s = ly(a, e, n);
                break;
            case"triangle":
            case"triangles":
                s = dy(a, e, n);
                break;
            default:
                throw new Error("invalid gridType")
        }
        var u = [];
        return X(s, (function (e) {
            var s = 0, a = 0;
            X(t, (function (t) {
                var u, l = me("point" === r ? e : xn(e), t, n);
                if (void 0 !== i && (u = t.properties[i]), void 0 === u && (u = t.geometry.coordinates[2]), void 0 === u) throw new Error("zValue is missing");
                0 === l && (s = u);
                var c = 1 / Math.pow(l, o);
                a += c, s += c * u
            }));
            var l = Ie(e);
            l.properties[i] = s / a, u.push(l)
        })), f(u)
    }, t.intersect = sy, t.invariant = B, t.isNumber = C, t.isObject = P, t.isobands = function (t, e, n) {
        if (!P(n = n || {})) throw new Error("options is invalid");
        var r = n.zProperty || "elevation", i = n.commonProperties || {}, o = n.breaksProperties || [];
        if (k(t, "Point", "Input must contain Points"), !e) throw new Error("breaks is required");
        if (!Array.isArray(e)) throw new Error("breaks is not an Array");
        if (!P(i)) throw new Error("commonProperties is not an Object");
        if (!Array.isArray(o)) throw new Error("breaksProperties is not an Array");
        var s = Hi(t, {zProperty: r, flip: !0}), a = function (t, e, n) {
            for (var r = [], i = 1; i < e.length; i++) {
                var o = +e[i - 1], s = +e[i], a = Ho(Yo(Zi(t, o, s - o))), u = {};
                u.groupedRings = a, u[n] = o + "-" + s, r.push(u)
            }
            return r
        }(s, e, r);
        return f((a = function (t, e, n) {
            var r = ot(n), i = r[2] - r[0], o = r[3] - r[1], s = r[0], a = r[1], u = e[0].length - 1, l = e.length - 1,
                c = i / u, h = o / l, p = function (t) {
                    t[0] = t[0] * c + s, t[1] = t[1] * h + a
                };
            return t.forEach((function (t) {
                t.groupedRings.forEach((function (t) {
                    t.forEach((function (t) {
                        t.forEach(p)
                    }))
                }))
            })), t
        }(a, s, t)).map((function (t, e) {
            if (o[e] && !P(o[e])) throw new Error("Each mappedProperty is required to be an Object");
            var n = ct({}, i, o[e]);
            return n[r] = t[r], y(t.groupedRings, n)
        })))
    }, t.isolines = function (t, e, n) {
        if (!P(n = n || {})) throw new Error("options is invalid");
        var r = n.zProperty || "elevation", i = n.commonProperties || {}, o = n.breaksProperties || [];
        if (k(t, "Point", "Input must contain Points"), !e) throw new Error("breaks is required");
        if (!Array.isArray(e)) throw new Error("breaks must be an Array");
        if (!P(i)) throw new Error("commonProperties must be an Object");
        if (!Array.isArray(o)) throw new Error("breaksProperties must be an Array");
        var s = _t(t, {zProperty: r, flip: !0});
        return f(function (t, e, n) {
            var r = ot(n), i = r[2] - r[0], o = r[3] - r[1], s = r[0], a = r[1], u = e[0].length - 1, l = e.length - 1,
                c = i / u, h = o / l, p = function (t) {
                    t[0] = t[0] * c + s, t[1] = t[1] * h + a
                };
            return t.forEach((function (t) {
                z(t, p)
            })), t
        }(function (t, e, n, r, i) {
            for (var o = [], s = 1; s < e.length; s++) {
                var a = +e[s], u = ct({}, r, i[s]);
                u[n] = a;
                var l = g(ft(t, a), u);
                o.push(l)
            }
            return o
        }(s, e, r, i, o), s, t))
    }, t.kinks = function (t) {
        var e, n, r = {type: "FeatureCollection", features: []};
        if ("LineString" === (n = "Feature" === t.type ? t.geometry : t).type) e = [n.coordinates]; else if ("MultiLineString" === n.type) e = n.coordinates; else if ("MultiPolygon" === n.type) e = [].concat.apply([], n.coordinates); else {
            if ("Polygon" !== n.type) throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");
            e = n.coordinates
        }
        return e.forEach((function (t) {
            e.forEach((function (e) {
                for (var n = 0; n < t.length - 1; n++) for (var i = n; i < e.length - 1; i++) {
                    if (t === e) {
                        if (1 === Math.abs(n - i)) continue;
                        if (0 === n && i === t.length - 2 && t[n][0] === t[t.length - 1][0] && t[n][1] === t[t.length - 1][1]) continue
                    }
                    var o = kr(t[n][0], t[n][1], t[n + 1][0], t[n + 1][1], e[i][0], e[i][1], e[i + 1][0], e[i + 1][1]);
                    o && r.features.push(a([o[0], o[1]]))
                }
            }))
        })), r
    }, t.length = Xr,t.lengthToDegrees = E,t.lengthToRadians = x,t.lineArc = mi,t.lineChunk = function (t, e, n) {
        if (!P(n = n || {})) throw new Error("options is invalid");
        var r = n.units, i = n.reverse;
        if (!t) throw new Error("geojson is required");
        if (e <= 0) throw new Error("segmentLength must be greater than 0");
        var o = [];
        return Z(t, (function (t) {
            i && (t.geometry.coordinates = t.geometry.coordinates.reverse()), function (t, e, n, r) {
                var i = Xr(t, {units: n});
                if (i <= e) return r(t);
                var o = i / e;
                Number.isInteger(o) || (o = Math.floor(o) + 1);
                for (var s = 0; s < o; s++) {
                    r(Yr(t, e * s, e * (s + 1), {units: n}), s)
                }
            }(t, e, r, (function (t) {
                o.push(t)
            }))
        })), f(o)
    },t.lineDistance = Xr,t.lineEach = tt,t.lineIntersect = Mr,t.lineOffset = function (t, e, n) {
        if (!P(n = n || {})) throw new Error("options is invalid");
        var r = n.units;
        if (!t) throw new Error("geojson is required");
        if (null == e || isNaN(e)) throw new Error("distance is required");
        var i = q(t), o = t.properties;
        switch (i) {
            case"LineString":
                return ns(t, e, r);
            case"MultiLineString":
                var s = [];
                return Z(t, (function (t) {
                    s.push(ns(t, e, r).geometry.coordinates)
                })), g(s, o);
            default:
                throw new Error("geometry " + i + " is not supported")
        }
    },t.lineOverlap = Ai,t.lineReduce = et,t.lineSegment = Jn,t.lineSlice = function (t, e, n) {
        var r = T(n);
        if ("LineString" !== q(n)) throw new Error("line must be a LineString");
        for (var i, o = Rr(n, t), s = Rr(n, e), a = [(i = o.properties.index <= s.properties.index ? [o, s] : [s, o])[0].geometry.coordinates], u = i[0].properties.index + 1; u < i[1].properties.index + 1; u++) a.push(r[u]);
        return a.push(i[1].geometry.coordinates), h(a, n.properties)
    },t.lineSliceAlong = Yr,t.lineSplit = function (t, e) {
        if (!t) throw new Error("line is required");
        if (!e) throw new Error("splitter is required");
        var n = q(t), r = q(e);
        if ("LineString" !== n) throw new Error("line must be LineString");
        if ("FeatureCollection" === r) throw new Error("splitter cannot be a FeatureCollection");
        if ("GeometryCollection" === r) throw new Error("splitter cannot be a GeometryCollection");
        var i = ti(e, {precision: 7});
        switch (r) {
            case"Point":
                return yi(t, i);
            case"MultiPoint":
                return di(t, i);
            case"LineString":
            case"MultiLineString":
            case"Polygon":
            case"MultiPolygon":
                return di(t, Mr(t, i))
        }
    },t.lineString = h,t.lineStringToPolygon = Ii,t.lineStrings = p,t.lineToPolygon = Ii,t.mask = function (t, e) {
        var n, r, i = function (t) {
            var e = [[[180, 90], [-180, 90], [-180, -90], [180, -90], [180, 90]]];
            return l(t && t.geometry.coordinates || e)
        }(e), o = (n = [], r = [], Z(t, (function (t) {
            var e = t.geometry.coordinates, i = e[0], o = e.slice(1);
            n.push(l([i])), o.forEach((function (t) {
                r.push(l([t]))
            }))
        })), [f(n), f(r)]), s = o[0], a = o[1];
        return function (t, e, n) {
            var r = [];
            return r.push(t.geometry.coordinates[0]), Z(e, (function (t) {
                r.push(t.geometry.coordinates[0])
            })), Z(n, (function (t) {
                r.push(t.geometry.coordinates[0])
            })), l(r)
        }(i, s = py(s), a = py(a))
    },t.meta = it,t.midpoint = function (t, e) {
        return yn(t, me(t, e) / 2, _n(t, e))
    },t.moranIndex = function (t, e) {
        var n = e.inputField, r = e.threshold || 1e5, i = e.p || 2, o = e.binary || !1,
            s = Ba(t, {alpha: e.alpha || -1, binary: o, p: i, standardization: e.standardization || !0, threshold: r}),
            a = [];
        X(t, (function (t) {
            var e = t.properties || {};
            a.push(e[n])
        }));
        for (var u = za(a), l = function (t) {
            for (var e = za(t), n = 0, r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                n += Math.pow(o - e, 2)
            }
            return n / t.length
        }(a), c = 0, h = 0, p = 0, f = 0, g = s.length, d = 0; d < g; d++) {
            for (var y = 0, v = 0; v < g; v++) c += s[d][v] * (a[d] - u) * (a[v] - u), h += s[d][v], p += Math.pow(s[d][v] + s[v][d], 2), y += s[d][v] + s[v][d];
            f += Math.pow(y, 2)
        }
        var _ = c / h / l, m = -1 / (g - 1),
            x = (g * g * (p *= .5) - g * f + h * h * 3) / ((g - 1) * (g + 1) * (h * h)) - m * m, E = Math.sqrt(x);
        return {expectedMoranIndex: m, moranIndex: _, stdNorm: E, zNorm: (_ - m) / E}
    },t.multiLineString = g,t.multiPoint = d,t.multiPolygon = y,t.nearest = Wn,t.nearestPoint = Wn,t.nearestPointOnLine = Rr,t.nearestPointToLine = function (t, e, n) {
        void 0 === n && (n = {});
        var r = n.units, i = n.properties || {}, o = function (t) {
            var e = [];
            switch (t.geometry ? t.geometry.type : t.type) {
                case"GeometryCollection":
                    return W(t, (function (t) {
                        "Point" === t.type && e.push({type: "Feature", properties: {}, geometry: t})
                    })), {type: "FeatureCollection", features: e};
                case"FeatureCollection":
                    return t.features = t.features.filter((function (t) {
                        return "Point" === t.geometry.type
                    })), t;
                default:
                    throw new Error("points must be a Point Collection")
            }
        }(t);
        if (!o.features.length) throw new Error("points must contain features");
        if (!e) throw new Error("line is required");
        if ("LineString" !== q(e)) throw new Error("line must be a LineString");
        var s = 1 / 0, a = null;
        return X(o, (function (t) {
            var n = Ar(t, e, {units: r});
            n < s && (s = n, a = t)
        })), a && (a.properties = ct({dist: s}, a.properties, i)), a
    },t.planepoint = function (t, e) {
        var n = R(t), r = G(e).coordinates[0];
        if (r.length < 4) throw new Error("OuterRing of a Polygon must have 4 or more Positions.");
        var i = e.properties || {}, o = i.a, s = i.b, a = i.c, u = n[0], l = n[1], c = r[0][0], h = r[0][1],
            p = void 0 !== o ? o : r[0][2], f = r[1][0], g = r[1][1], d = void 0 !== s ? s : r[1][2], y = r[2][0],
            v = r[2][1], _ = void 0 !== a ? a : r[2][2];
        return (_ * (u - c) * (l - g) + p * (u - f) * (l - v) + d * (u - y) * (l - h) - d * (u - c) * (l - v) - _ * (u - f) * (l - h) - p * (u - y) * (l - g)) / ((u - c) * (l - g) + (u - f) * (l - v) + (u - y) * (l - h) - (u - c) * (l - v) - (u - f) * (l - h) - (u - y) * (l - g))
    },t.point = a,t.pointGrid = $r,t.pointOnFeature = Gr,t.pointOnLine = Rr,t.pointOnSurface = Gr,t.pointToLineDistance = Ar,t.points = u,t.pointsWithinPolygon = _e,t.polygon = l,t.polygonSmooth = function (t, e) {
        var n = [], r = e.iterations || 1;
        if (!t) throw new Error("inputPolys is required");
        return W(t, (function (t, e, i) {
            var o, s, a;
            switch (t.type) {
                case"Polygon":
                    o = [[]];
                    for (var u = 0; u < r; u++) a = [[]], s = t, u > 0 && (s = l(o).geometry), ka(s, a), o = a.slice(0);
                    n.push(l(o, i));
                    break;
                case"MultiPolygon":
                    o = [[[]]];
                    for (var c = 0; c < r; c++) a = [[[]]], s = t, c > 0 && (s = y(o).geometry), Ga(s, a), o = a.slice(0);
                    n.push(y(o, i));
                    break;
                default:
                    throw new Error("geometry is invalid, must be Polygon or MultiPolygon")
            }
        })), f(n)
    },t.polygonTangents = function (t, e) {
        var n, r, i, o, s = T(t), u = T(e), l = ot(e), c = 0, h = null;
        switch (s[0] > l[0] && s[0] < l[2] && s[1] > l[1] && s[1] < l[3] && (c = (h = Wn(t, En(e))).properties.featureIndex), q(e)) {
            case"Polygon":
                n = u[0][c], r = u[0][0], null !== h && h.geometry.coordinates[1] < s[1] && (r = u[0][c]), o = ji(u[0][0], u[0][u[0].length - 1], s);
                var p = Bi(u[0], s, o, i, n, r);
                n = p[0], r = p[1];
                break;
            case"MultiPolygon":
                for (var g = 0, d = 0, y = 0, v = 0; v < u[0].length; v++) {
                    g = v;
                    for (var _ = !1, m = 0; m < u[0][v].length; m++) {
                        if (d = m, y === c) {
                            _ = !0;
                            break
                        }
                        y++
                    }
                    if (_) break
                }
                n = u[0][g][d], r = u[0][g][d], o = ji(u[0][0][0], u[0][0][u[0][0].length - 1], s), u.forEach((function (t) {
                    var e = Bi(t[0], s, o, i, n, r);
                    n = e[0], r = e[1]
                }))
        }
        return f([a(n), a(r)])
    },t.polygonToLine = Ei,t.polygonToLineString = Ei,t.polygonize = function (t) {
        var e = us.fromGeoJson(t);
        e.deleteDangles(), e.deleteCutEdges();
        var n = [], r = [];
        return e.getEdgeRings().filter((function (t) {
            return t.isValid()
        })).forEach((function (t) {
            t.isHole() ? n.push(t) : r.push(t)
        })), n.forEach((function (t) {
            as.findEdgeRingContaining(t, r) && r.push(t)
        })), f(r.map((function (t) {
            return t.toPolygon()
        })))
    },t.polygons = c,t.projection = Ha,t.propEach = U,t.propReduce = V,t.propertiesContainsFilter = su,t.radians2degrees = w,t.radiansToDegrees = w,t.radiansToDistance = m,t.radiansToLength = m,t.random = tu,t.randomLineString = Ka,t.randomPoint = Ja,t.randomPolygon = Za,t.randomPosition = Wa,t.rewind = function (t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = e.reverse || !1, r = e.mutate || !1;
        if (!t) throw new Error("<geojson> is required");
        if ("boolean" != typeof n) throw new Error("<reverse> must be a boolean");
        if ("boolean" != typeof r) throw new Error("<mutate> must be a boolean");
        !1 === r && (t = Ie(t));
        var i = [];
        switch (t.type) {
            case"GeometryCollection":
                return W(t, (function (t) {
                    Vi(t, n)
                })), t;
            case"FeatureCollection":
                return X(t, (function (t) {
                    X(Vi(t, n), (function (t) {
                        i.push(t)
                    }))
                })), f(i)
        }
        return Vi(t, n)
    },t.rhumbBearing = ki,t.rhumbDestination = qi,t.rhumbDistance = Tr,t.round = _,t.sample = function (t, e) {
        if (!t) throw new Error("featurecollection is required");
        if (null == e) throw new Error("num is required");
        if ("number" != typeof e) throw new Error("num must be a number");
        return f(function (t, e) {
            var n, r, i = t.slice(0), o = t.length, s = o - e;
            for (; o-- > s;) n = i[r = Math.floor((o + 1) * Math.random())], i[r] = i[o], i[o] = n;
            return i.slice(s)
        }(t.features, e))
    },t.sector = function (t, e, n, r, i) {
        if (!P(i = i || {})) throw new Error("options is invalid");
        var o = i.properties;
        if (!t) throw new Error("center is required");
        if (null == n) throw new Error("bearing1 is required");
        if (null == r) throw new Error("bearing2 is required");
        if (!e) throw new Error("radius is required");
        if ("object" != typeof i) throw new Error("options must be an object");
        if (Fi(n) === Fi(r)) return vn(t, e, i);
        var s = T(t), a = mi(t, e, n, r, i), u = [[s]];
        return z(a, (function (t) {
            u[0].push(t)
        })), u[0].push(s), l(u, o)
    },t.segmentEach = Q,t.segmentReduce = $,t.shortestPath = function (t, e, n) {
        if (!P(n = n || {})) throw new Error("options is invalid");
        var r = n.resolution, i = n.minDistance, s = n.obstacles || f([]);
        if (!t) throw new Error("start is required");
        if (!e) throw new Error("end is required");
        if (r && !C(r) || r <= 0) throw new Error("options.resolution must be a number, greater than 0");
        if (i) throw new Error("options.minDistance is not yet implemented");
        var u = R(t), l = R(e);
        switch (t = a(u), e = a(l), q(s)) {
            case"FeatureCollection":
                if (0 === s.features.length) return h([u, l]);
                break;
            case"Polygon":
                s = f([o(G(s))]);
                break;
            default:
                throw new Error("invalid obstacles")
        }
        var c = s;
        c.features.push(t), c.features.push(e);
        var p = ot(Ko(fn(ot(c)), 1.15));
        r || (r = me([p[0], p[1]], [p[2], p[1]], n) / 100), c.features.pop(), c.features.pop();
        for (var g = p[0], d = p[1], y = p[2], v = p[3], _ = r / me([g, d], [y, d], n) * (y - g), m = r / me([g, d], [g, v], n) * (v - d), x = y - g, E = v - d, b = Math.floor(x / _), w = Math.floor(E / m), I = (x - b * _) / 2, N = [], S = [], L = [], M = [], O = 1 / 0, T = 1 / 0, A = v - (E - w * m) / 2, D = 0; A >= d;) {
            for (var F = [], k = [], B = g + I, z = 0; B <= y;) {
                var j = a([B, A]), U = Hs(j, s);
                F.push(U ? 0 : 1), k.push(B + "|" + A);
                var V = me(j, t);
                !U && V < O && (O = V, L = {x: z, y: D});
                var X = me(j, e);
                !U && X < T && (T = X, M = {x: z, y: D}), B += _, z++
            }
            S.push(F), N.push(k), A -= m, D++
        }
        var Y = new Vs(S, {diagonal: !0}), H = Y.grid[L.y][L.x], W = Y.grid[M.y][M.x], J = Us.search(Y, H, W), Z = [u];
        return J.forEach((function (t) {
            var e = N[t.x][t.y].split("|");
            Z.push([+e[0], +e[1]])
        })), Z.push(l), $e(h(Z))
    },t.simplify = function (t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = void 0 !== e.tolerance ? e.tolerance : 1, r = e.highQuality || !1, i = e.mutate || !1;
        if (!t) throw new Error("geojson is required");
        if (n && n < 0) throw new Error("invalid tolerance");
        return !0 !== i && (t = Ie(t)), W(t, (function (t) {
            !function (t, e, n) {
                var r = t.type;
                if ("Point" === r || "MultiPoint" === r) return t;
                $e(t, !0);
                var i = t.coordinates;
                switch (r) {
                    case"LineString":
                        t.coordinates = un(i, e, n);
                        break;
                    case"MultiLineString":
                        t.coordinates = i.map((function (t) {
                            return un(t, e, n)
                        }));
                        break;
                    case"Polygon":
                        t.coordinates = ln(i, e, n);
                        break;
                    case"MultiPolygon":
                        t.coordinates = i.map((function (t) {
                            return ln(t, e, n)
                        }))
                }
            }(t, n, r)
        })), t
    },t.square = dn,t.squareGrid = gy,t.standardDeviationalEllipse = function (t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = e.steps || 64, r = e.weight, i = e.properties || {};
        if (!C(n)) throw new Error("steps must be a number");
        if (!P(i)) throw new Error("properties must be a number");
        var o = H(t).length, s = Aa(t, {weight: r}), a = 0, u = 0, l = 0;
        X(t, (function (t) {
            var e = t.properties[r] || 1, n = Fa(T(t), T(s));
            a += Math.pow(n.x, 2) * e, u += Math.pow(n.y, 2) * e, l += n.x * n.y * e
        }));
        var c = a - u, h = Math.sqrt(Math.pow(c, 2) + 4 * Math.pow(l, 2)), p = 2 * l, g = Math.atan((c + h) / p),
            d = 180 * g / Math.PI, y = 0, v = 0, _ = 0;
        X(t, (function (t) {
            var e = t.properties[r] || 1, n = Fa(T(t), T(s));
            y += Math.pow(n.x * Math.cos(g) - n.y * Math.sin(g), 2) * e, v += Math.pow(n.x * Math.sin(g) + n.y * Math.cos(g), 2) * e, _ += e
        }));
        var m = Math.sqrt(2 * y / _), x = Math.sqrt(2 * v / _),
            E = Ra(s, m, x, {units: "degrees", angle: d, steps: n, properties: i}), b = _e(t, f([E])), w = {
                meanCenterCoordinates: T(s),
                semiMajorAxis: m,
                semiMinorAxis: x,
                numberOfFeatures: o,
                angle: d,
                percentageWithinEllipse: 100 * H(b).length / o
            };
        return E.properties.standardDeviationalEllipse = w, E
    },t.tag = function (t, e, n, r) {
        return t = Ie(t), e = Ie(e), X(t, (function (t) {
            t.properties || (t.properties = {}), X(e, (function (e) {
                void 0 === t.properties[r] && ye(t, e) && (t.properties[r] = e.properties[n])
            }))
        })), t
    },t.tesselate = function (t) {
        if (!t.geometry || "Polygon" !== t.geometry.type && "MultiPolygon" !== t.geometry.type) throw new Error("input must be a Polygon or MultiPolygon");
        var e = {type: "FeatureCollection", features: []};
        return "Polygon" === t.geometry.type ? e.features = Hn(t.geometry.coordinates) : t.geometry.coordinates.forEach((function (t) {
            e.features = e.features.concat(Hn(t))
        })), e
    },t.tin = xe,t.toMercator = ja,t.toWgs84 = Ua,t.transformRotate = Zo,t.transformScale = Ko,t.transformTranslate = function (t, e, n, r) {
        if (!P(r = r || {})) throw new Error("options is invalid");
        var i = r.units, o = r.zTranslation, s = r.mutate;
        if (!t) throw new Error("geojson is required");
        if (null == e || isNaN(e)) throw new Error("distance is required");
        if (o && "number" != typeof o && isNaN(o)) throw new Error("zTranslation is not a number");
        if (o = void 0 !== o ? o : 0, 0 === e && 0 === o) return t;
        if (null == n || isNaN(n)) throw new Error("direction is required");
        return e < 0 && (e = -e, n += 180), !1 !== s && void 0 !== s || (t = Ie(t)), z(t, (function (t) {
            var r = T(qi(t, e, n, {units: i}));
            t[0] = r[0], t[1] = r[1], o && 3 === t.length && (t[2] += o)
        })), t
    },t.triangleGrid = dy,t.truncate = ti,t.union = oy,t.unitsFactors = r,t.unkinkPolygon = function (t) {
        var e = [];
        return Z(t, (function (t) {
            "Polygon" === t.geometry.type && X(function (t) {
                if ("Feature" != t.type) throw new Error("The input must a geojson object of type Feature");
                if (void 0 === t.geometry || null == t.geometry) throw new Error("The input must a geojson object with a non-empty geometry");
                if ("Polygon" != t.geometry.type) throw new Error("The input must be a geojson Polygon");
                for (var e = t.geometry.coordinates.length, n = [], r = 0; r < e; r++) {
                    var i = t.geometry.coordinates[r];
                    ai(i[0], i[i.length - 1]) || i.push(i[0]), n.push.apply(n, i.slice(0, i.length - 1))
                }
                if (!function (t) {
                    for (var e = {}, n = 1, r = 0, i = t.length; r < i; ++r) {
                        if (e.hasOwnProperty(t[r])) {
                            n = 0;
                            break
                        }
                        e[t[r]] = 1
                    }
                    return n
                }(n)) throw new Error("The input polygon may not have duplicate vertices (except for the first and last vertex of each ring)");
                var o = n.length, s = ei(t, (function (t, e, n, r, i, o, s, a, u, l, c, h) {
                    return [t, e, n, r, i, o, s, a, u, l, c, h]
                })), a = s.length;
                if (0 == a) {
                    var u = [];
                    for (r = 0; r < e; r++) u.push(l([t.geometry.coordinates[r]], {
                        parent: -1,
                        winding: si(t.geometry.coordinates[r])
                    }));
                    var c = f(u);
                    return G(), q(), c
                }
                var h = [], p = [];
                for (r = 0; r < e; r++) {
                    h.push([]);
                    for (var g = 0; g < t.geometry.coordinates[r].length - 1; g++) h[r].push([new ri(t.geometry.coordinates[r][ui(g + 1, t.geometry.coordinates[r].length - 1)], 1, [r, g], [r, ui(g + 1, t.geometry.coordinates[r].length - 1)], void 0)]), p.push(new ii(t.geometry.coordinates[r][g], [r, ui(g - 1, t.geometry.coordinates[r].length - 1)], [r, g], void 0, void 0, !1, !0))
                }
                for (r = 0; r < a; r++) h[s[r][1]][s[r][2]].push(new ri(s[r][0], s[r][5], [s[r][1], s[r][2]], [s[r][6], s[r][7]], void 0)), s[r][11] && p.push(new ii(s[r][0], [s[r][1], s[r][2]], [s[r][6], s[r][7]], void 0, void 0, !0, !0));
                var d = p.length;
                for (r = 0; r < h.length; r++) for (g = 0; g < h[r].length; g++) h[r][g].sort((function (t, e) {
                    return t.param < e.param ? -1 : 1
                }));
                var y = [];
                for (r = 0; r < d; r++) y.push({
                    minX: p[r].coord[0],
                    minY: p[r].coord[1],
                    maxX: p[r].coord[0],
                    maxY: p[r].coord[1],
                    index: r
                });
                var v = Nt();
                for (v.load(y), r = 0; r < h.length; r++) for (g = 0; g < h[r].length; g++) for (var _ = 0; _ < h[r][g].length; _++) {
                    x = _ == h[r][g].length - 1 ? h[r][ui(g + 1, t.geometry.coordinates[r].length - 1)][0].coord : h[r][g][_ + 1].coord;
                    var m = v.search({minX: x[0], minY: x[1], maxX: x[0], maxY: x[1]})[0];
                    h[r][g][_].nxtIsectAlongEdgeIn = m.index
                }
                for (r = 0; r < h.length; r++) for (g = 0; g < h[r].length; g++) for (_ = 0; _ < h[r][g].length; _++) {
                    var x = h[r][g][_].coord,
                        E = (m = v.search({minX: x[0], minY: x[1], maxX: x[0], maxY: x[1]})[0]).index;
                    E < o ? p[E].nxtIsectAlongRingAndEdge2 = h[r][g][_].nxtIsectAlongEdgeIn : ai(p[E].ringAndEdge1, h[r][g][_].ringAndEdgeIn) ? p[E].nxtIsectAlongRingAndEdge1 = h[r][g][_].nxtIsectAlongEdgeIn : p[E].nxtIsectAlongRingAndEdge2 = h[r][g][_].nxtIsectAlongEdgeIn
                }
                var b = [];
                for (r = 0, g = 0; g < e; g++) {
                    var w = r;
                    for (_ = 0; _ < t.geometry.coordinates[g].length - 1; _++) p[r].coord[0] < p[w].coord[0] && (w = r), r++;
                    var I = p[w].nxtIsectAlongRingAndEdge2;
                    for (_ = 0; _ < p.length; _++) if (p[_].nxtIsectAlongRingAndEdge1 == w || p[_].nxtIsectAlongRingAndEdge2 == w) {
                        var N = _;
                        break
                    }
                    var S = oi([p[N].coord, p[w].coord, p[I].coord], !0) ? 1 : -1;
                    b.push({isect: w, parent: -1, winding: S})
                }
                for (b.sort((function (t, e) {
                    return p[t.isect].coord > p[e.isect].coord ? -1 : 1
                })), u = []; b.length > 0;) {
                    var C = b.pop(), P = C.isect, L = C.parent, M = C.winding, O = u.length, R = [p[P].coord], T = P;
                    if (p[P].ringAndEdge1Walkable) var A = p[P].ringAndEdge1,
                        D = p[P].nxtIsectAlongRingAndEdge1; else A = p[P].ringAndEdge2, D = p[P].nxtIsectAlongRingAndEdge2;
                    for (; !ai(p[P].coord, p[D].coord);) {
                        R.push(p[D].coord);
                        var F = void 0;
                        for (r = 0; r < b.length; r++) if (b[r].isect == D) {
                            F = r;
                            break
                        }
                        if (null != F && b.splice(F, 1), ai(A, p[D].ringAndEdge1)) {
                            if (A = p[D].ringAndEdge2, p[D].ringAndEdge2Walkable = !1, p[D].ringAndEdge1Walkable) {
                                var k = {isect: D};
                                oi([p[T].coord, p[D].coord, p[p[D].nxtIsectAlongRingAndEdge2].coord], 1 == M) ? (k.parent = L, k.winding = -M) : (k.parent = O, k.winding = M), b.push(k)
                            }
                            T = D, D = p[D].nxtIsectAlongRingAndEdge2
                        } else A = p[D].ringAndEdge1, p[D].ringAndEdge1Walkable = !1, p[D].ringAndEdge2Walkable && (k = {isect: D}, oi([p[T].coord, p[D].coord, p[p[D].nxtIsectAlongRingAndEdge1].coord], 1 == M) ? (k.parent = L, k.winding = -M) : (k.parent = O, k.winding = M), b.push(k)), T = D, D = p[D].nxtIsectAlongRingAndEdge1
                    }
                    R.push(p[D].coord), u.push(l([R], {index: O, parent: L, winding: M, netWinding: void 0}))
                }

                function G() {
                    for (var t = [], e = 0; e < c.features.length; e++) -1 == c.features[e].properties.parent && t.push(e);
                    if (t.length > 1) for (e = 0; e < t.length; e++) {
                        for (var n = -1, r = 0; r < c.features.length; r++) t[e] != r && ye(c.features[t[e]].geometry.coordinates[0][0], c.features[r], {ignoreBoundary: !0}) && zr(c.features[r]) < 1 / 0 && (n = r);
                        c.features[t[e]].properties.parent = n
                    }
                }

                function q() {
                    for (var t = 0; t < c.features.length; t++) if (-1 == c.features[t].properties.parent) {
                        var e = c.features[t].properties.winding;
                        c.features[t].properties.netWinding = e, B(t, e)
                    }
                }

                function B(t, e) {
                    for (var n = 0; n < c.features.length; n++) if (c.features[n].properties.parent == t) {
                        var r = e + c.features[n].properties.winding;
                        c.features[n].properties.netWinding = r, B(n, r)
                    }
                }

                return c = f(u), G(), q(), c
            }(t), (function (n) {
                e.push(l(n.geometry.coordinates, t.properties))
            }))
        })), f(e)
    },t.validateBBox = L,t.validateId = M,t.voronoi = function (t, e) {
        if (!P(e = e || {})) throw new Error("options is invalid");
        var n = e.bbox || [-180, -85, 180, 85];
        if (!t) throw new Error("points is required");
        if (!Array.isArray(n)) throw new Error("bbox is invalid");
        return k(t, "Point", "points"), f(function () {
            var t = Js, e = Zs, n = null;

            function r(r) {
                return new Ma(r.map((function (n, i) {
                    var o = [Math.round(t(n, i, r) / Ca) * Ca, Math.round(e(n, i, r) / Ca) * Ca];
                    return o.index = i, o.data = n, o
                })), n)
            }

            return r.polygons = function (t) {
                return r(t).polygons()
            }, r.links = function (t) {
                return r(t).links()
            }, r.triangles = function (t) {
                return r(t).triangles()
            }, r.x = function (e) {
                return arguments.length ? (t = "function" == typeof e ? e : Ws(+e), r) : t
            }, r.y = function (t) {
                return arguments.length ? (e = "function" == typeof t ? t : Ws(+t), r) : e
            }, r.extent = function (t) {
                return arguments.length ? (n = null == t ? null : [[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]], r) : n && [[n[0][0], n[0][1]], [n[1][0], n[1][1]]]
            }, r.size = function (t) {
                return arguments.length ? (n = null == t ? null : [[0, 0], [+t[0], +t[1]]], r) : n && [n[1][0] - n[0][0], n[1][1] - n[0][1]]
            }, r
        }().x((function (t) {
            return t.geometry.coordinates[0]
        })).y((function (t) {
            return t.geometry.coordinates[1]
        })).extent([[n[0], n[1]], [n[2], n[3]]]).polygons(t.features).map(Oa))
    },t.within = _e,Object.defineProperty(t, "__esModule", {value: !0})
}));