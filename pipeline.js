// var buildings = new L.GeoJSON.AJAX("http://localhost:8000/testdata.geojson", {
//     style: function (feature) {
//         return {
//             color: "red",
//             weight: 2,
//             fill: false,
//             opacity: 1,
//             clickable: false
//         };
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindTooltip(feature.properties.BUILDINGID);
//     }
// });

var petrolpipes = L.geoJSON(petrolproduct_json, {
	weight: 1,
	color: "#808080",
	fillOpacity: 0.2,
	onEachFeature: function (feature, layer) {
         layer.bindTooltip("Operator: " + feature.properties.Opername +"<br>" + "Name: " + feature.properties.Pipename);},

})

var layers = {
        layer1: {
            layer: L.tileLayer('http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png') 
        },

        sat_layer: {
            layer: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}') 
        },
        layer2: {
            layer: L.geoJSON(reservations_json, {
					weight: 1,
					color: "#f6c071",
					fillOpacity: 0.7,
					onEachFeature: function (feature, layer) {
				         layer.bindTooltip(feature.properties.NAME + " Reservation");},
				}),
            legend: '<i style="background: orange; opacity: 0.5"></i><p><b>Reservations</b></p><br><b>Pipelines</b><br>'
        },
        layer3: {
            layer: L.geoJSON(crudeoil_json, {
					weight: 1,
					color: "#808080",
					fillOpacity: 0.3,
					onEachFeature: function (feature, layer) {
				         layer.bindTooltip("Operator: " + feature.properties.Opername +"<br>" + "Name: " + feature.properties.Pipename);},

				}),
            legend: '<i style="background: #808080; opacity: 1"></i><p><b>Operating</b></p><i style="background: #8b0000; opacity: 1"></i><p><b>In Development</b></p>'
        },


       layer4: {
            layer: L.geoJSON(newpipelines_json, {
					weight: 1,
					color: "#808080",
					onEachFeature: function (feature, layer) {
				         layer.bindTooltip("Name: " + feature.properties.Name +"<br>" + "Status: " + feature.properties.Status + "<br>" + "Commodity: " + feature.properties.Commodity);},
				    style: function(feature) {
						switch (feature.properties.Status) {
							case 'Operating': return {color: "#808080"};
							case 'Defeated': return {color: "#ff0000"};
							case 'Cancelled':   return {color: "#FD8D3C"};
							default:   return {color: "#8b0000"};
							// case 'II':   return {color: "#00ff00"};
							// case 'I':   return {color: "#00ff00"};

						}
					}

				}),
            legend: '<i style="background: #ff0000; opacity: 0.9"></i><p><b>Defeated</b></p><i style="background: #FD8D3C; opacity: 1"></i><p><b>Cancelled</b></p>'

        },
        layer5: {
        	layer: petrolpipes}
        
    };

var scenes = {
        scene1: {lat: 40.8797, lng: -115.3626, zoom: 4, layers: [layers.layer1, layers.layer2, layers.layer3, layers.layer4, layers.layer5], name: "Overview"},
        scene2: {lat: 48.1650979, lng: -103.6580808, zoom: 6, layers: [layers.layer1, layers.layer2, layers.layer3, layers.layer4, layers.layer5], name: "Bakken Oil Fields"},
        scene3: {lat: 48.1650979, lng: -103.6580808, zoom: 9, layers: [layers.layer1, layers.layer2, layers.layer3, layers.layer4, layers.layer5], name: "Williston"},
        reservations: {lat: 47.7286419, lng: -102.5201983, zoom: 11, layers: [layers.sat_layer, layers.layer3, layers.layer4, layers.layer5], name: "Fort Berthold"},
        athabascan: {lat: 52.6971949, lng: -111.488198, zoom: 6, layers: [layers.layer1, layers.layer3, layers.layer4, layers.layer5], name: "Athabascan Oil Sands"},
        scene4: {lat: 31.8876112, lng: -102.3251933, zoom: 6, layers: [layers.layer1, layers.layer2, layers.layer3, layers.layer4, layers.layer5], name: "Permian Basin"},
        scene5: {lat: 40.8797, lng: -115.3626, zoom: 4, layers: [layers.layer1, layers.layer2, layers.layer3, layers.layer4, layers.layer5], name: "Closing"},


    };


$('#storymap').storymap({
        scenes: scenes,
        baselayer: layers.layer1,
        navbar: true,
        legend: true,
        loader: true,
        flyto: true,
        credits:  "Created by Anjali Shrivastava",
        scalebar: true,
        scrolldown: true,
        progressline: true,
        navwidget: true,
        createMap: function () {
            var map = L.map($(".storymap-map")[0]).setView([40.8797,-95.3626], 4);
            basemap = this.baselayer.layer.addTo(map);
            return map;
        }
    });

// var map = L.map('the-map').setView([40.8797,-95.3626], 4);
// L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//   subdomains: 'abcd',
//   maxZoom: 19
// }).addTo(map);
// // var buildings 6= new L.GeoJSON.AJAX("http://localhost:8000/testdata.geojson");


// L.geoJSON(reservations_json, {
// 	weight: 1,
// 	color: "#f6c071",
// 	fillOpacity: 0.7,
// 	onEachFeature: function (feature, layer) {
//          layer.bindPopup(feature.properties.NAME + " Reservation");},
// }).addTo(map);

// // L.geoJSON(newpipes, {
// // 	weight: 3,
// // 	color: "#808080"
// // }).addTo(map);

// oldpipes = L.geoJSON(crudeoil_json, {
// 	weight: 1,
// 	color: "#808080",
// 	fillOpacity: 0.3,
// 	onEachFeature: function (feature, layer) {
//          layer.bindPopup("Operator: " + feature.properties.Opername +"<br>" + "Name: " + feature.properties.Pipename);},

// }).addTo(map);



// petrolpipes = L.geoJSON(petrolproduct_json, {
// 	weight: 1,
// 	color: "#808080",
// 	fillOpacity: 0.2,
// 	onEachFeature: function (feature, layer) {
//          layer.bindPopup("Operator: " + feature.properties.Opername +"<br>" + "Name: " + feature.properties.Pipename);},

// }).addTo(map);

// // petrolpipes.eachLayer(function (layer) {
// // 	var popup = L.popup();
// // 	popup.setContent('text');

// // 	layer.bindPopup(popup);
// // 	layer.on('mouseover', function(e) {
// // 		var popup = e.target.getPopup();
// //     	popup.setLatLng(e.latlng).openOn(map);
// // 	});

// // 	layer.on('mouseout', function(e) {
// //      e.target.closePopup();
// //   });

// // 	layer.on('mousemove', function (e) {
// //     e.target.closePopup();
// //     var popup = e.target.getPopup();
// //     popup.setLatLng(e.latlng).openOn(map);
// //   });
// // });

// newpipes = L.geoJSON(newpipelines_json, {
// 	weight: 1,
// 	color: "#808080",
// 	onEachFeature: function (feature, layer) {
//          layer.bindTooltip("Name: " + feature.properties.Name +"<br>" + "Status: " + feature.properties.Status + "<br>" + "Commodity: " + feature.properties.Commodity);},
//     style: function(feature) {
// 		switch (feature.properties.Status) {
// 			case 'Operating': return {color: "#808080"};
// 			case 'Defeated': return {color: "#ff0000"};
// 			case 'Cancelled':   return {color: "#FD8D3C"};
// 			default:   return {color: "#8b0000"};
// 			// case 'II':   return {color: "#00ff00"};
// 			// case 'I':   return {color: "#00ff00"};

// 		}
// 	}

// }).addTo(map);

// hover = L.geoJSON(crudeoil_json, {
// 	weight: 5,
// 	opacity: 0,
// 	onEachFeature: function (feature, layer) {
//          layer.bindTooltip("Operator: " + feature.properties.Opername +"<br>" + "Name: " + feature.properties.Pipename);},

// }).addTo(map);    


// hover2 = L.geoJSON(newpipelines_json, {
// 	weight: 5,
// 	opacity: 0,
// 	onEachFeature: function (feature, layer) {
//          layer.bindTooltip("Name: " + feature.properties.Name +"<br>" + "Status: " + feature.properties.Status + "<br>" + "Commodity: " + feature.properties.Commodity);},
// }).addTo(map);

// hover3 = L.geoJSON(petrolproduct_json, {
// 	weight: 5,
// 	opacity: 0,
// 	onEachFeature: function (feature, layer) {
//          layer.bindTooltip("Operator: " + feature.properties.Opername +"<br>" + "Name: " + feature.properties.Pipename);},

// }).addTo(map);    

// //Legend

// var baseMaps = {};
// var overlayMaps = {
//     "Crude Oil Pipelines": oldpipes,
//     "Petroleum Product Pipelines": petrolpipes,
//     "New Pipelines (2017-19)": newpipes
// };

// L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

// var legend = L.control({position: 'bottomright'});

// function getColor(d) {
// 	return d == 'Operating' ? '#808080' :
// 	       d == 'Defeated'  ? '#ff0000' :
// 	       d == 'Cancelled'  ? '#FD8D3C' :
// 	       d == 'In Development'  ? '#8b0000' :
// 	       	'#FFEDA0';
// }

// legend.onAdd = function (map) {

// 	var div = L.DomUtil.create('div', 'info legend'),
// 		grades = ['Operating', 'Defeated', 'Cancelled', 'In Development'],
// 		labels = [];

// 	// loop through our density intervals and generate a label with a colored square for each interval
// 	for (var i = 0; i < grades.length; i++) {
// 		div.innerHTML +=
//             '<i style="background:' + getColor(grades[i]) + '"></i> ' +
//              (grades[i] ? grades[i] + '<br>' : '+');
//     }


// 	return div;
// };

// legend.addTo(map);


