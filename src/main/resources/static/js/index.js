let map;
const arr = [];

$(() => {
    initMap();
    $(".btn-start").on("click", () => arr.forEach(obj => obj.play()));
    $(".btn-stop").on("click", () => arr.forEach(obj => obj.stop()));
});

const initMap = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3Nzc3Nvb2IiLCJhIjoiY2txYWVodnJrMDQzYTJ2cWhtY3M5b3Z1cyJ9.uKGSe4xA1IMLmexsEf6VTQ';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [126.96973257820878, 37.55362298239548],
        zoom: 16,
        pitch: 45,
        bearing: -17.6,
        antialias: true
    });

    map.on("load", () => {

        map.on("click", (e) => console.log(e.lngLat.lng, e.lngLat.lat));

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

        const airportCateringTruck = new CarScene(map, route);
        airportCateringTruck.scale = 0.1;
        airportCateringTruck.render();
        arr.push(airportCateringTruck);

        const route2 = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [126.96348851064562, 37.55304802223429],
                            [126.96642223359868, 37.55377068602188],
                            [126.96739282209029, 37.55239487363866],
                            [126.96546446088502, 37.55193219265976],
                            [126.96438206516473, 37.5533183646442]
                        ]
                    }
                }
            ]
        }

        map.addSource("route2", {"type": "geojson", "data": route2});
        map.addLayer({
            'id': 'route2',
            'source': 'route2',
            'type': 'line',
            'paint': {
                'line-width': 2,
                'line-color': '#007cbf'
            }
        });

        const garbageTruck = new CarScene(map, route2, "/model/garbage_truck/scene.gltf");
        garbageTruck.scale = 0.1;
        garbageTruck.render();
        arr.push(garbageTruck);

        const route3 = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [126.96569463124843, 37.551014429617055],
                            [126.96912394222784, 37.55206623966964],
                        ]
                    }
                }
            ]
        }

        map.addSource("route3", {"type": "geojson", "data": route3});
        map.addLayer({
            'id': 'route3',
            'source': 'route3',
            'type': 'line',
            'paint': {
                'line-width': 2,
                'line-color': '#007cbf'
            }
        });

        const audiI8 = new CarScene(map, route3, "/model/AudiI8/scene.gltf");
        audiI8.scale = 0.1;
        audiI8.render();
        arr.push(audiI8);
    });

}


// Car Scene object
function CarScene(mapbox, route, modelUrl) {
    const _this = this;
    _this.map = mapbox;
    _this.route = route;
    _this.modelUrl = modelUrl || "/model/airport_catering_truck/scene.gltf";
    _this.step = 100;
    _this.line = buildCurve(_this.route.features[0], _this.step);
    _this.scale = 1;
    _this.origin = undefined;
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
            _this.origin = moveTo(...lngLat, rotate, _this.scale);
        },
        thumbColor: '#BBff0000',
        negativeColor: '#ff0000',
        positiveColor: '#CCC',
        value: 0
    });
    _this.changeRoute = (route) => {
        _this.route = route;
        _this.line = buildCurve(_this.route.features[0], _this.step);
        const rotate = turf.degrees2radians(180 - turf.bearing(turf.point(_this.line[0]), turf.point(_this.line[1])))
        _this.origin = moveTo(..._this.line[0], rotate, _this.scale);
    }
    _this.render = () => {
        const rotate = turf.degrees2radians(180 - turf.bearing(turf.point(_this.line[0]), turf.point(_this.line[1])))
        _this.origin = moveTo(..._this.line[0], rotate, _this.scale);
        _this.map.addLayer(_this.carLayer);
    };
    _this.remove = () => _this.map.removeLayer(_this.carLayer.id);

    _this.play = () => {
        _this.isStopped = false;
        requestAnimationFrame(_this.animate);
    }
    _this.stop = () => {
        _this.isStopped = true;
    }
    _this.animate = () => {
        const start = _this.line[_this.head >= _this.step ? _this.head - 1 : _this.head];
        const stops = _this.line[_this.head >= _this.step ? _this.head : _this.head + 1];

        if (!_this.isStopped && start && stops && (_this.head <= _this.step)) {
            const lngLat = _this.line[_this.head++];
            const rotate = turf.degrees2radians(180 - turf.bearing(turf.point(start), turf.point(stops)));
            _this.origin = moveTo(...lngLat, rotate, _this.scale);
            _this.seekBar.setValue(_this.head);
            requestAnimationFrame(_this.animate);
        } else if (!stops) {
            _this.isStopped = true;
            _this.head = 0;
        }
    }
    _this.carLayer = {
        id: "car" + Math.round(Math.random() * 1000000000000),
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();
            this.scene.add(new THREE.AmbientLight(0xFFFFFF, 2));

            // use the three.js GLTF loader to add the 3D model to the three.js scene
            var loader = new THREE.GLTFLoader();
            loader.load(
                _this.modelUrl,
                function (gltf) {
                    this.scene.add(gltf.scene);
                }.bind(this)
            );
            this.map = map;

            // use the Mapbox GL JS map canvas for three.js
            this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true
            });

            this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            this.camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix)
                .multiply(new THREE.Matrix4()
                    .makeTranslation(
                        _this.origin.translateX,
                        _this.origin.translateY,
                        _this.origin.translateZ
                    )
                    .scale(
                        new THREE.Vector3(
                            _this.origin.scale,
                            -_this.origin.scale,
                            _this.origin.scale
                        )
                    )
                    .multiply(new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(1, 0, 0),
                        _this.origin.rotateX
                    ))
                    .multiply(new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(0, 1, 0),
                        _this.origin.rotateY
                    ))
                    .multiply(new THREE.Matrix4().makeRotationAxis(
                        new THREE.Vector3(0, 0, 1),
                        _this.origin.rotateZ
                    )));
            this.renderer.resetState();
            this.renderer.render(this.scene, this.camera);
            this.map.triggerRepaint();
        }
    }
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
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat([lng, lat], 0);

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
