/// <reference path="../node_modules/@types/openlayers/index.d.ts" />

let source = new ol.source.Vector();
let layer = new ol.layer.Vector({
    source: source
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        layer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
});


const baseFeatureWkts = [
    'POINT(12.340822 47.853343)',
    'POINT(12.342882 47.856107)',
    'POINT(12.345715 47.85507)',
]

function convertFeature(wkt, sourceProjection) {
    const format = new ol.format.WKT();

    let feature = format.readFeature(wkt, {
        dataProjection: sourceProjection, // 'EPSG:4326',
        featureProjection: 'EPSG:3857',
    });
    return feature;
}

function setPreview(sourceProjection) {
    let features = baseFeatureWkts.map(wkt => convertFeature(wkt, sourceProjection));

    source.clear();
    source.addFeatures(features);

    map.getView().fit(source.getExtent(), {duration: 1000});
    // map.getView().animate({center: map.getView().getCenter(), zoom: map.getView().getZoom() - 2, duration: 1000})
    // setTimeout(() => {
    //     map.getView().fit(source.getExtent(), {duration: 2000});
    // }, 1000)
}