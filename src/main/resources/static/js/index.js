let map;
let carScene;
let seekbar;

$(() => initMap());

const initMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3Nzc3Nvb2IiLCJhIjoiY2txYWVodnJrMDQzYTJ2cWhtY3M5b3Z1cyJ9.uKGSe4xA1IMLmexsEf6VTQ';
    map = new mapboxgl.Map({
        container: 'map',
        style: "mapbox://styles/mapbox/streets-v11",
        center: [126.96973257820878, 37.55362298239548],
        zoom: 16,
        pitch: 45,
        bearing: -17.6,
        antialias: true
    });

    map.on("load", () => {
        // 이동 경로
        const route = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [126.96970224380492, 37.5537894793787], [126.96989536285399, 37.55277730341982],
                            [126.9696056842804, 37.55278580915741], [126.96950912475586, 37.55321960048787],
                            [126.9690155982971, 37.55324511754632], [126.96910142898558, 37.55518438842468]
                        ]
                    }
                }
            ]
        }

        map.on("click", (e) => console.log(e.lngLat.lng, e.lngLat.lat));
        map.addSource("route", {"type": "geojson", "data": route});
        map.addLayer({
            'id': 'route',
            'source': 'route',
            'type': 'line',
            'paint': {
                'line-width': 2,
                'line-color': '#007cbf'
            }
        });

        carScene = new CarScene(map, route);
    });
}


// Car Scene object
function CarScene(mapbox, route) {
    const _this = this;
    _this.map = mapbox;
    _this.step = 100;
    _this.route = route;
    _this.line = buildCurve(_this.route.features[0], _this.step);
    _this.origin = moveTo(..._this.line[0], 4.91, 3);
    _this.head = 0;
    _this.isStopped = false;
    _this.seekBar = new Seekbar.Seekbar({
        renderTo: "#seekbar-container-vertical-red",
        minValue: 0, maxValue: _this.line.length - 1,
        valueListener: function (value) {
            if (value >= _this.line.length - 1) return;
            const __this = this;
            _this.stop();
            _this.head = Math.round(value);
            __this.value = _this.head;
            const start = _this.line[_this.head >= _this.step ? _this.head - 1 : _this.head];
            const stops = _this.line[_this.head >= _this.step ? _this.head : _this.head + 1];
            const lngLat = _this.line[_this.head++];
            const rotate = turf.degrees2radians(180 - turf.bearing(turf.point(start), turf.point(stops)));
            _this.origin = moveTo(...lngLat, rotate, 3);
        },
        thumbColor: '#BBff0000',
        negativeColor: '#ff0000',
        positiveColor: '#CCC',
        value: 0
    });
    _this.play = () => {
        _this.isStopped = false;
        requestAnimationFrame(_this.scene);
    }
    _this.stop = () => {
        _this.isStopped = true;
    }
    _this.scene = () => {
        const start = _this.line[_this.head >= _this.step ? _this.head - 1 : _this.head];
        const stops = _this.line[_this.head >= _this.step ? _this.head : _this.head + 1];

        if (!_this.isStopped && start && stops && (_this.head <= _this.step)) {
            const lngLat = _this.line[_this.head++];
            const rotate = turf.degrees2radians(180 - turf.bearing(turf.point(start), turf.point(stops)));
            _this.origin = moveTo(...lngLat, rotate, 3);
            requestAnimationFrame(_this.scene);
        } else if (!stops) {
            _this.isStopped = true;
            _this.head = 0;
        }
    }
    _this.car = {
        id: "car",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map, gl) {
            const __this = this;
            __this.map = map;
            __this.camera = new THREE.Camera();
            __this.scene = new THREE.Scene();
            __this.scene.add(new THREE.AmbientLight(0xFFFFFF, 2));

            new THREE.GLTFLoader().load(
                "/model/Truck/truck.gltf", function (model) {
                    __this.scene.add(model.scene);
                }.bind(__this));

            __this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                context: gl,
                canvas: __this.map.getCanvas()
            });
            __this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            const __this = this;
            __this.camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix).multiply(new THREE.Matrix4()
                .makeTranslation(
                    _this.origin.translateX,
                    _this.origin.translateY,
                    _this.origin.translateZ
                )
                .scale(new THREE.Vector3(
                    _this.origin.scale,
                    -_this.origin.scale,
                    _this.origin.scale)
                )
                .multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), _this.origin.rotateX))
                .multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), _this.origin.rotateY))
                .multiply(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), _this.origin.rotateZ)));

            __this.renderer.state.reset();
            __this.renderer.render(__this.scene, __this.camera);
            __this.map.triggerRepaint();
        }
    };
    _this.map.addLayer(_this.car);
    return _this;
}

const buildCurve = (features, steps) => {

    const distance = turf.length(features);
    const coordinate = [];
    for (let i = 0; i < distance; i += distance / steps) {
        coordinate.push(turf.along(features, i).geometry.coordinates);
    }
    return coordinate;
}

const moveTo = (lng, lat, rotate, scale) => {

    const modelRotate = [Math.PI / 2, rotate, 0];
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat([lng, lat]);

    return {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * scale
    };
}